import dayjs from "dayjs";
import { useState } from 'react'

const defaultTodoList = [
  {
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
  },
]


export const useTodoList = (selectedDate) => {
  const [todoList, setTodoList] = useState(defaultTodoList)
  const [input, setInput] = useState("") // 투두 입력란

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
    setTodoList(newTodoList)
  }

  /* 투두 삭제 */
  const removeTodo = (todoId) => {
    const newTodoList = todoList.filter(todo => todo.id !== todoId); // 삭제하려는 투두의 id만 빼고 나머지만 새 투두리스트에 넣음
    setTodoList(newTodoList)
  }

  /* 투두 성공/성공x */
  const toggleTodo = (todoId) => {
    const newTodoList = todoList.map(todo => {
      if (todo.id !== todoId) return todo; // todo id가 아규먼트로 넘은 todoId와 같지않으면 기존의 todo 반환
      return {
        ...todo,
        isSuccess: !todo.isSuccess,
      }
    });
    setTodoList(newTodoList);
  }
  return {}
}