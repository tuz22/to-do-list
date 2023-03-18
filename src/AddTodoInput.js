import React from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { bottomSpace, ITEM_WIDTH } from './util';
import { AntDesign } from '@expo/vector-icons';

export default ({
  value,
  onChangeText,
  placeholder,
  onPressAdd,
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
      />
      <TouchableOpacity onPress={onPressAdd} style={{ padding: 5 }}>
        <AntDesign name='plus' size={18} color='#595959' />
      </TouchableOpacity>
    </View>
  )
}