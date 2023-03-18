import { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, Text, View, Image, KeyboardAvoidingView, Pressable, Keyboard, Alert } from 'react-native';
import dayjs from 'dayjs';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { Ionicons } from '@expo/vector-icons'; 

import { runPracticeDayjs } from './src/practive-dayjs';
import { getCalendarColumns, getDayText, getDayColor, statusBarHeight, ITEM_WIDTH, bottomSpace } from './src/util';
import { useCalendar } from './src/hook/use-calendar';
import { useTodoList } from './src/hook/use-todo-list';
import Calendar from './src/Calendar';
import Margin from './src/Margin';
import AddTodoInput from './src/AddTodoInput';

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

  const {
    todoList,
    filteredTodoList, // 필터된 todoList 사용해야함
    input,
    setInput,
    toggleTodo,
    removeTodo,
    addTodo,
    resetInput,
  } = useTodoList(selectedDate)
  
  const columns = getCalendarColumns(selectedDate); // 현재시각을 기준으로 캘린더에 담긴 컬럼들을 가져옴

  const flatListRef = useRef(null);


  const onPressLeftArrow = subtract1Month
  const onPressHeaderDate = showDatePicker
  const onPressRightArrow = add1Month
  const onPressDate = setSelectedDate;

  const ListHeaderComponent = () => (
    <View>
      <Calendar 
        todoList={todoList}
        columns={columns}
        selectedDate={selectedDate}
        onPressLeftArrow={onPressLeftArrow}
        onPressHeaderDate={onPressHeaderDate}
        onPressRightArrow={onPressRightArrow}
        onPressDate={onPressDate}
      />
    <View
      style={{
        width: 4,
        height: 4,
        borderRadius: 4 / 2,
        backgroundColor: '#a3a3a3',
        alignSelf: 'center',
      }}
    />
    <Margin height={10} />
    </View>
  )
  
  const renderItem = ({item: todo}) => {
    const isSuccess = todo.isSuccess;
    const onPress = () => toggleTodo(todo.id);
    const onLongPress = () => {
      Alert.alert('삭제하시겠어요?', '', [
        {
          style: 'cancel',
          text: '아니오',
        },
        {
          text: '네',
          onPress: () => removeTodo(todo.id),
        }
      ])
    }

    return (
      <Pressable 
        onPress={onPress}
        onLongPress={onLongPress}
        style={{ 
          flexDirection: 'row',
          width: ITEM_WIDTH, 
          // backgroundColor: todo.id % 2 === 0 ? 'pink' : 'lightblue',
          alignSelf: 'center',
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderBottomWidth: 0.2,
          borderColor: '#a6a6a6',

        }}>
        <Text style={{ flex: 1, fontSize: 14, color: '#595959'}}>{todo.content}</Text>
        <Ionicons 
          name='ios-checkmark' 
          sizee={17}
          color={isSuccess ? '#595959' : '#bfbfbf'}/>
      </Pressable>
    )
  }

  /* 스크롤 맨 아래로 */
  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd();
    }, 200)
  }

  /* + 버튼 누르면 투두 추가 */
  const onPressAdd = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  }

  /* 키보드의 전송버튼을 눌러도 투두 추가 */
  const onSubmitEditing = () => {
    addTodo();
    resetInput();
  }

  const onFocus = () => {
    scrollToEnd();
  }

  useEffect(() => {
    runPracticeDayjs();

    // console.log('columns', columns);
  }, [])

  // useEffect(() => {
  //   console.log('selectedDate값 변경:', dayjs(selectedDate). format('YYYY.MM.DD'));
  // }, [selectedDate])

/* Pressable = TouchableOpacity activeOpacity={1} */
  return (
    <Pressable 
      style={styles.container} 
      onPress={Keyboard.dismiss}> 
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
      

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <>
          <FlatList
            ref={flatListRef}
            data={filteredTodoList}
            contentContainerStyle={{ paddingTop: statusBarHeight + 30 }}
            ListHeaderComponent={ListHeaderComponent} 
            renderItem={renderItem}
            showsVerticalScrollIndicator={false} // 스크롤바 안보이게
          />

          <AddTodoInput 
            value={input}
            onChangeText={setInput}
            placeholder={`${dayjs(selectedDate).format('M.D')}에 추가할 투두`}
            onPressAdd={onPressAdd}
            onSubmitEditing={onSubmitEditing}
            onFocus={onFocus}
          />
        </>
      </KeyboardAvoidingView>

      <Margin height={bottomSpace} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
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
