/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Flex} from 'native-base';
import pxToDp from '../../../utils/PixelRatio';
import {TouchableOpacity} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {male, female} from '../../../res/fonts/iconSvg';
const FilterPanel = () => {
  const [gender, setGender] = useState('');
  return (
    <View>
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        height={pxToDp(50)}>
        <Text />
        <Text
          style={{
            color: '#999',
            fontSize: pxToDp(28),
            fontWeight: 'bold',
          }}>
          性别：
        </Text>
        {/* 性别图标sta */}
        <Flex
          justifyContent="space-around"
          width="50%"
          flexDirection="row"
          alignSelf="center">
          <TouchableOpacity
            onPress={() => setGender('男')}
            style={{
              ...Styles.selectGender,
              backgroundColor: gender === '男' ? 'red' : '#eee',
            }}>
            <SvgUri svgXmlData={male} width="36" height="36" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...Styles.selectGender,
              backgroundColor: gender === '女' ? 'red' : '#eee',
            }}
            onPress={() => setGender('女')}>
            <SvgUri svgXmlData={female} width="36" height="36" />
          </TouchableOpacity>
        </Flex>
        {/* 性别图标end */}
        {/* 近期登录时间sta */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: pxToDp(10),
          }}>
          <Text
            style={{
              color: '#777',
              fontSize: pxToDp(18),
              width: pxToDp(140),
            }}>
            近期登陆时间:
          </Text>
          <Text>{1111}</Text>
        </View>
        {/* 近期登录时间end */}
      </Flex>
    </View>
  );
};
const Styles = StyleSheet.create({
  selectGender: {
    width: pxToDp(60),
    height: pxToDp(60),
    borderRadius: pxToDp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default FilterPanel;
