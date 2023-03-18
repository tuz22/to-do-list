import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import dayjs from 'dayjs';
import { StatusBar } from 'expo-status-bar';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { SimpleLineIcons } from '@expo/vector-icons';

import Margin from './src/Margin';
import { runPracticeDayjs } from './src/practive-dayjs';
import { getCalendarColumns, getDayText, getDayColor } from './src/util';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useCalendar } from './src/hook/use-calendar';
import { useTodoList } from './src/hook/use-todo-list';

const statusBarHeight = getStatusBarHeight(true);

const columnSize = 35;

const Column = ({text, color, opacity, disabled, onPress, isSelected}) => {
  return(
    <TouchableOpacity 
      disabled={disabled} // 요일은 터치되면 안되니까
      onPress={onPress}
      style={{ 
        width: columnSize, 
        height: columnSize, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: isSelected ? '#c2c2c2' : 'transparent',
        borderRadius: columnSize / 2,
      }}
    >
      <Text style={{ color, opacity }}>{text}</Text>
    </TouchableOpacity>
  )
}

const ArrowButton = ({onPress, iconName}) => {
  return(
    <TouchableOpacity onPress={ onPress } style={{paddingHorizontal: 20, paddingVertical: 15}}>
      <SimpleLineIcons name={ iconName } size={15} color='#404040' />
    </TouchableOpacity>
  )
}

export default function App() {
  const now = dayjs(); // 현재시각
  const { 
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
  } = useCalendar(now);

  const {} = useTodoList(selectedDate)
  
  const columns = getCalendarColumns(selectedDate); // 현재시각을 기준으로 캘린더에 담긴 컬럼들을 가져옴

  const onPressLeftArrow = subtract1Month
  const onPressRightArrow = add1Month

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format('YYYY.MM.DD.');

    return (
      <View>
        {/* YYYY.MM.DD */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <ArrowButton iconName='arrow-left' onPress={onPressLeftArrow} />

          <TouchableOpacity onPress={showDatePicker}>
            <Text style={{ fontSize: 20, color: '#404040' }}>{currentDateText}</Text>
          </TouchableOpacity>

          <ArrowButton iconName='arrow-right' onPress={onPressRightArrow} />
        </View>
        
        {/* 요일 */}
        <View style={{ flexDirection: 'row'}}>
          {[0, 1, 2, 3, 4, 5, 6].map(day => {
            const dayText = getDayText(day);
            const color = getDayColor(day);
            return (
              <Column 
                key={`day${day}`} 
                text={dayText} 
                color={color} 
                opacity={1}
                disabled={true}
              />
            )
          })}
        </View>
      </View>
    )
  }

  /* 캘린더의 숫자 */
  const renderItem = ({ item: date }) => { // item은 date
    const dateText = dayjs(date).get('date');
    const day = dayjs(date).get('day');
    const color = getDayColor(day)
    const isCurrentMonth = dayjs(date).isSame(selectedDate, 'month'); // item으로 오는 date가 now의 month와 같으면 숫자 진하게, 아니면 연하게
    const onPress = () => {
      setSelectedDate(date);
    }
    const isSelected = dayjs(date).isSame(selectedDate, 'date');
    return (
      <Column 
        text={dateText} 
        color={color} 
        opacity={isCurrentMonth ? 1 : 0.4} 
        onPress={onPress} 
        isSelected={isSelected}
      />
    )
  }

  useEffect(() => {
    runPracticeDayjs();

    // console.log('columns', columns);
  }, [])

  // useEffect(() => {
  //   console.log('selectedDate값 변경:', dayjs(selectedDate). format('YYYY.MM.DD'));
  // }, [selectedDate])

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c",
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      />
      <FlatList 
        data={columns} // data: 만들고자 하는 리스트의 source를 담는 prop
        contentContainerStyle={{ paddingTop: statusBarHeight }}
        keyExtractor={(_, index) => `column-${index}`}
        numColumns='7' // 한줄에 몇개
        renderItem={renderItem} // renderItem: data로 받은 소스들 각각의 item들을 render 시켜주는 콜백함수
        ListHeaderComponent={ListHeaderComponent}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
