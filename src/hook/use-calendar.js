import dayjs from "dayjs";
import { useState } from 'react';

export const useCalendar = (now) => { // 2. 훅을 선언할 때도 now를 아규먼트로 받음
  const [selectedDate, setSelectedDate] = useState(now); // 1. 초기값을 now로 받고있으니까
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(dayjs(date)); // 밖에서 클릭했을 때랑 마찬가지로 모달에서도 클릭한 날짜가 선택되게
    hideDatePicker();
  };

  const subtract1Month = () => {
    const newSelectedDate = dayjs(selectedDate).subtract(1, 'month');
    setSelectedDate(newSelectedDate)
  }

  const add1Month = () => {
    const newSelectedDate = dayjs(selectedDate).add(1, 'month');
    setSelectedDate(newSelectedDate)
  }

  return {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
  }
}