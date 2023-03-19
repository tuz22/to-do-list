import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { ITEM_WIDTH } from './util';
import { AntDesign } from '@expo/vector-icons';

export default ({
  value,
  onChangeText,
  placeholder,
  onPressAdd,
  onSubmitEditing,
  onFocus,
}) => {
  return (
    <View style={{
      width: ITEM_WIDTH,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
    }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: 5,
          color: '#595959',
        }}
        onSubmitEditing={onSubmitEditing} // 전송 시 함수 : +버튼 안누르고 추가되게
        blurOnSubmit={false} // 투두 추가 완료 후 키보드 안내려가게
        onFocus={onFocus}
      />
      <TouchableOpacity onPress={onPressAdd} style={{ padding: 5 }}>
        <AntDesign name='plus' size={18} color='#595959' />
      </TouchableOpacity>
    </View>
  )
}