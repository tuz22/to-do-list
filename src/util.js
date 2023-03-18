import dayjs from "dayjs";

/* 달력의 공백일 채우기 */
export const fillEmptyColumns = (columns, start, end) => {
  const filledColumns = columns.slice(0);

  // 1. 첫날 이전 공백 채우기
  const startDay = dayjs(start).get("day"); // 달의 첫날이 시작하는 column의 index
  // ex) 3/1(수)의 index는 3 (일(0) - 월(1) - 화(2) - 수(3))
  for (let i = 1; i <= startDay; i += 1) {
    const date = dayjs(start).subtract(i, "day"); // 공백을 채워주기 위해 1일 전날 계산
    filledColumns.unshift(date); // unshift(값): 값을 해당 배열의 제일 앞에 넣어줌
  }
  // 2. 마지막날 이후 공백 채우기
  const endDay = dayjs(end).get("day");
  /**
    0 -> 6
    1 -> 5
    2 -> 4
    endDay + ? = 6
   */
  for (let i = 1; i <= 6 - endDay; i += 1) {
    const date = dayjs(end).add(i, "day");
    filledColumns.push(date);
  }

  return filledColumns;
};

/* 달력의 일 가져오기 */
export const getCalendarColumns = (now) => {
  const start = dayjs(now).startOf("month"); // 달의 첫날
  const end = dayjs(now).endOf("month"); // 달의 마지막날
  const endDate = dayjs(end).get("date"); // 밑에서 배열로 돌려야해서 길이 필요 -> 마지막 일 가져오기

  const columns = [];
  for (let i = 0; i < endDate; i += 1) {
    const date = dayjs(start).add(i, "day"); // 달의 첫날부터 1일씩 더해서
    columns.push(date); // 컬럼에 추가하기
  }
  console.log('columns-3월', columns)

  /* fillEmptyColumns: 달력에서 빈칸이 되는부분을 채워줌(첫날 이전의 공백, 마지막날 이후의 공백) */
  const filledColumns = fillEmptyColumns(columns, start, end);
  return filledColumns;
};


/* 달력의 헤더 - 요일 가져오기 */
/**
 * @param day 0 ~ 6
 * @return 일 ~ 월
 */
const dayTexts = ['일', '월', '화', '수', '목', '금', '토']
export const getDayText = (day) => {
  /* Ex 1 */
  return dayTexts[day];

  /* Ex 2 */
  // switch (day) {
  //   case 0: return '일';
  //   case 1: return '월';
  //   case 2: return '화';
  //   case 3: return '수';
  //   case 4: return '목';
  //   case 5: return '금';
  //   case 6: return '토';
  //   default: return '';
  // }
}

export const getDayColor = (day) => {
  return day === 0 ? "#e67639" : day === 6 ? "#5872d1" : "#2b2b2b";
}