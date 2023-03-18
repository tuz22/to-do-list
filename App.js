import dayjs from 'dayjs';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { runPracticeDayjs } from './src/practive-dayjs';
import { getCalendarColumns } from './src/util';

const columnSize = 30;

export default function App() {
  const now = dayjs(); // 현재시각
  const columns = getCalendarColumns(now); // 현재시각을 기준으로 캘린더에 담긴 컬럼들을 가져옴

  const renderItem = ({ item: date }) => { // item은 date
    const dateText = dayjs(date).get('date');
    const day = dayjs(date).get('day');
    const color = day === 0 ? "#e67639" : day === 6 ? "#5872d1" : "#2b2b2b";
    const isCurrentMonth = dayjs(date).isSame(now, 'month'); // item으로 오는 date가 now의 month와 같으면 숫자 진하게, 아니면 연하게
    
    return (
      <View style={{ width: columnSize, height: columnSize, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color, opacity: isCurrentMonth ? 1 : 0.4}}>{dateText}</Text>

      </View>
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
        numColumns='7' // 한줄에 몇개
        renderItem={renderItem} // renderItem: data로 받은 소스들 각각의 item들을 render 시켜주는 콜백함수
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
