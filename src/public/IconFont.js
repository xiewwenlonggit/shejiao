/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import IconMap from '../res/fonts/icon';
const Index = props => (
  <Text
    onPress={props.onPress}
    style={{fontFamily: 'iconfont', ...props.style}}>
    {IconMap[props.name]}
  </Text>
);
export default Index;
