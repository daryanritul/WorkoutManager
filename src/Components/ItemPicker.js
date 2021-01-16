import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Form, Item, Label, Input, Picker, Icon} from 'native-base';
import {Colors} from '../Constants/Color';

import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const ItemPicker = ({placeHolder, data, selectedValue, setSelectedValue}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: '#c1c1c1',
      }}>
      <Text
        style={{
          width: '50%',
          fontSize: responsiveFontSize(1.7),
          color: '#454545',
        }}>
        {placeHolder}
      </Text>
      <Picker
        note
        mode="dropdown"
        style={{
          width: '50%',
        }}
        selectedValue={selectedValue}
        itemStyle={{}}
        textStyle={{
          fontSize: responsiveFontSize(1.7),
        }}
        onValueChange={(value) => {
          setSelectedValue(value);
        }}>
        {data.map((itemData, index) => (
          <Picker.Item
            key={index}
            label={itemData.label}
            value={itemData.value}
          />
        ))}
      </Picker>
    </View>
  );
};

export default ItemPicker;

const styles = StyleSheet.create({});
