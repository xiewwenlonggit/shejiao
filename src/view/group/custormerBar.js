/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Tabs, Text} from 'native-base';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import pxToDp from '../../utils/PixelRatio';

const Index = props => {
  const {goToPage, tabs, activeTab} = props;
  useEffect(() => {
    async function getData() {}
    getData();
  }, []);
  return (
    <ImageBackground
      style={baseStyles.bmg}
      source={require('../../res/rectanglecopy.png')}>
      {tabs.map((v, i) => (
        <TouchableOpacity
          style={{
            ...baseStyles.btn,
            borderBottomWidth: activeTab === i ? pxToDp(3) : 0,
          }}
          onPress={() => goToPage(i)}
          key={i}>
          <Text
            style={{
              color: '#fff',
              fontSize: activeTab === i ? pxToDp(26) : pxToDp(20),
            }}>
            {v}
          </Text>
        </TouchableOpacity>
      ))}
    </ImageBackground>
  );
};
const baseStyles = StyleSheet.create({
  bmg: {
    height: pxToDp(60),
    flexDirection: 'row',
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
    justifyContent: 'space-evenly',
  },
  btn: {
    justifyContent: 'center',
    borderBottomColor: '#fff',
  },
});
export default Index;
