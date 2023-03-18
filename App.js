import dayjs from 'dayjs';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Margin from './src/Margin';
import { runPracticeDayjs } from './src/practive-dayjs';
import { getCalendarColumns, getDayText, getDayColor } from './src/util';
import { SimpleLineIcons } from '@expo/vector-icons'; 

const columnSize = 35;

const Column = ({text, color, opacity, disabled, onPress}) => {
  return(
    <TouchableOpacity 
      disabled={disabled} // 요일은 터치되면 안되니까
      onPress={onPress}
      style={{ 
        width: columnSize, 
        height: columnSize, 
        justifyContent: 'center', 
        alignItems: 'center'
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
  const columns = getCalendarColumns(now); // 현재시각을 기준으로 캘린더에 담긴 컬럼들을 가져옴

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(now).format('YYYY.MM.DD.');

    return (
      <View>
        {/* YYYY.MM.DD */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <ArrowButton iconName='arrow-left' onPress={() => {}} />

          <TouchableOpacity>
            <Text style={{ fontSize: 20, color: '#404040' }}>{currentDateText}</Text>
          </TouchableOpacity>

          <ArrowButton iconName='arrow-right' onPress={() => {}} />
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
    const isCurrentMonth = dayjs(date).isSame(now, 'month'); // item으로 오는 date가 now의 month와 같으면 숫자 진하게, 아니면 연하게
    return (
      <Column text={dateText} color={color} opacity={isCurrentMonth ? 1 : 0.4} />
    )
  }

  useEffect(() => {
    runPracticeDayjs();

    console.log('columns', columns);
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={columns} // data: 만들고자 하는 리스트의 source를 담는 prop
        keyExtractor={(_, index) => `column-${index}`}
        numColumns='7' // 한줄에 몇개
        renderItem={renderItem} // renderItem: data로 받은 소스들 각각의 item들을 render 시켜주는 콜백함수
        ListHeaderComponent={ListHeaderComponent}
      />
    </SafeAreaView>
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
