import dayjs from "dayjs";
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultTodoList = [
  /* {
    id: 1,
    content: '운동하기',
    date: dayjs(),
    isSuccess: true,
  },
  {
    id: 2,
    content: '아침먹기',
    date: dayjs(),
    isSuccess: false,
  },
  {
    id: 3,
    content: '공부하기',
    date: dayjs(),
    isSuccess: true,
  }, */
]

const TODO_LIST_KEY = 'TODO_LIST_KEY';

export const useTodoList = (selectedDate) => {
  const [todoList, setTodoList] = useState(defaultTodoList)
  const [input, setInput] = useState("") // 투두 입력란

  const saveTodoList = (newTodoList) => {
    setTodoList(newTodoList);
    AsyncStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodoList));
  }

  /* 투두 추가 */
  const addTodo = () => {
    const len = todoList.length; // 3
    const lastId = len === 0 ? 0 : todoList[len - 1].id;

    const newTodoList = [
      ...todoList,
      {
        id: lastId +  1,
        content: input, // 투두 입력 input 값을 그대로 사용
        date: selectedDate,
        isSuccess: false,
      }
    ]
    saveTodoList(newTodoList);
    
  }

  /* 투두 삭제 */
  const removeTodo = (todoId) => {
    const newTodoList = todoList.filter(todo => todo.id !== todoId); // 삭제하려는 투두의 id만 빼고 나머지만 새 투두리스트에 넣음
    saveTodoList(newTodoList);
  }

  /* 투두 추가 후 input박스 리셋 */
  const resetInput = () => setInput('');

  /* 투두 성공/성공x */
  const toggleTodo = (todoId) => {
    const newTodoList = todoList.map(todo => {
      if (todo.id !== todoId) return todo; // todo id가 아규먼트로 넘은 todoId와 같지않으면 기존의 todo 반환
      return {
        ...todo,
        isSuccess: !todo.isSuccess,
      }
    });
    saveTodoList(newTodoList);
  }

  /* 날짜별 투두 필터 */
  const filteredTodoList = todoList.filter(todo => {
    const isSameDate = dayjs(todo.date).isSame(selectedDate, 'date');
    return isSameDate;
  })

  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    const result = await AsyncStorage.getItem(TODO_LIST_KEY);
    console.log('result', typeof result, result);
    if (result) {
      const newTodoList = JSON.parse(result);
      console.log('newTodoList', typeof newTodoList, newTodoList)
      setTodoList(newTodoList)
    }
  }

  return {
    todoList,
    filteredTodoList,
    addTodo,
    removeTodo,
    toggleTodo,
    input,
    setInput,
    resetInput,
  }
}