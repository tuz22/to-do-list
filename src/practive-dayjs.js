import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const runPracticeDayjs = () => {
  const hour = new Date().getHours();
  console.log('hour', hour);

  const now = dayjs("2022-11-04 16:01:30");
  // console.log("===== Practice Dayjs =====");
  // console.log(
  //   "1. set minute - hh",
  //   // 현재시간에서 분을, 5로 바꿔줘
  //   dayjs(now).set("minute", 5).format("YYYY.MM.DD hh:mm:ss a A") // hh - 12시간제, a/A -오전/오후
  // );
  // console.log(
  //   "2. set minute - HH",
  //   dayjs(now).set("minute", 5).format("YYYY.MM.DD HH:mm:ss") // HH - 24시간제
  // );
  // console.log(
  //   "3. set hour",
  //   dayjs(now).set("hour", 10).format("YYYY.MM.DD HH:mm:ss")
  // );
  // console.log("4. get year", dayjs(now).get("year")); // 현재시간의 년을 가져오기
  // console.log("5. get month", dayjs(now).get("month")); // 0~11(1월~12월)
  // console.log("6. get date", dayjs(now).get("date"));
  // console.log("7. get day", dayjs(now).get("day")); // 0:일 ~ 6:토
  // console.log("8. get second", dayjs(now).get("second"));
  // console.log(
  //   "9. add hour",
  //   dayjs(now).add(3, "hour").format("YYYY.MM.DD HH:mm:ss")
  // );
  // console.log(
  //   "10. subtract hour", // 3시간 빼기
  //   dayjs(now).subtract(3, "hour").format("YYYY.MM.DD HH:mm:ss")
  // );
  // console.log("11. startOf", dayjs(now).startOf("month").format("YYYY.MM.DD")); // 달의 첫 일 가져오기
  // console.log("12. endOf", dayjs(now).endOf("month").format("YYYY.MM.DD")); // 달의 마지막 일 가져오기

  // const aDate = dayjs("2022-10-29 15:00:20");
  // const bDate = dayjs("2022-10-29 16:00:00");
  // console.log("13. isSame month", dayjs(aDate).isSame(bDate, "month")); // 월 비교하기
  // console.log("14. isSame hour", dayjs(aDate).isSame(bDate, "hour")); // 시간 비교하기
  // console.log("15. isBefore", dayjs(aDate).isBefore(bDate)); // A가 B보다 빠르면 true
  // console.log("16. isBefore date", dayjs(aDate).isBefore(bDate, "date"));
  // console.log("17. isAfter a,b", dayjs(aDate).isAfter(bDate));
  // console.log("18. isAfter b,a", dayjs(bDate).isAfter(aDate));
  // console.log("19. isSameOrBefore", dayjs(aDate).isSameOrBefore(bDate, "date"));// A가 B와 같거나 빠르면 true
  // console.log("20. isSameOrAfter", dayjs(aDate).isSameOrAfter(bDate, "date"));
  // console.log(
  //   "21. isBetween",
  //   dayjs("2022-10-29 15:30:00").isBetween(aDate, bDate)
  // );
  // console.log(
  //   "22. isBetween date",
  //   dayjs("2022-10-29 15:30:00").isBetween(aDate, bDate, "date") // A B 일 사이에 있으면 true
  // );
  // console.log("23. diff minute a,b", dayjs(aDate).diff(bDate, "minute")); // A - B
  // console.log("24. diff minute b,a", dayjs(bDate).diff(aDate, "minute"));
};