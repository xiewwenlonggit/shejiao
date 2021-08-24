/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {Flex, Text, StatusBar} from 'native-base';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import pxToDp from '../utils/PixelRatio';
import IconFont from '../public/IconFont';
export default function Nav(props) {
  const nativetor = useNavigation();
  return (
    <Flex>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ImageBackground source={require('../res/headbg.png')} style={Styles.bg}>
        <TouchableOpacity onPress={() => nativetor.goBack()} style={Styles.btn}>
          <IconFont style={{color: '#fff'}} name="iconfanhui" />
          <Text style={{color: '#fff'}}>返回</Text>
        </TouchableOpacity>
        <Text style={Styles.content}>{props.title}</Text>
        <Text
          onPress={props.onRightPress || function () {}}
          style={Styles.rightContent}>
          {props.rightText}
        </Text>
      </ImageBackground>
    </Flex>
  );
}
const Styles = StyleSheet.create({
  bg: {
    height: pxToDp(60),
    paddingTop: pxToDp(12),
    flexDirection: 'row',
    paddingLeft: pxToDp(10),
    paddingRight: pxToDp(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    width: pxToDp(80),
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    color: '#fff',
    fontSize: pxToDp(20),
    fontWeight: 'bold',
  },
  rightContent: {
    width: pxToDp(80),
    color: '#fff',
    textAlign: 'right',
  },
});
