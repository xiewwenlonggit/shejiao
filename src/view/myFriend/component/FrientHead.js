/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {tanhua, near, testSoul} from '../../../res/fonts/iconSvg';
import pxToDp from '../../../utils/PixelRatio';
import {useNavigation} from '@react-navigation/core';
const FriendHead = () => {
  const navigator = useNavigation();
  const goPage = page => {
    navigator.navigate(page);
  };
  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            goPage('TanHua');
          }}
          style={{alignItems: 'center'}}>
          <View style={{...Styles.SVgWrap, backgroundColor: 'red'}}>
            <SvgUri width="40" height="40" fill="#fff" svgXmlData={tanhua} />
          </View>
          <Text style={Styles.TextWrap}>探花</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => goPage('Search')}
          style={{alignItems: 'center'}}>
          <View style={{...Styles.SVgWrap, backgroundColor: '#2db3f8'}}>
            <SvgUri width="40" height="40" fill="#fff" svgXmlData={near} />
          </View>
          <Text style={Styles.TextWrap}>搜附近</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => goPage('TestSoul')}
          style={{alignItems: 'center'}}>
          <View style={{...Styles.SVgWrap, backgroundColor: '#ecc768'}}>
            <SvgUri width="40" height="40" fill="#fff" svgXmlData={testSoul} />
          </View>
          <Text style={Styles.TextWrap}>测灵魂</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const Styles = StyleSheet.create({
  SVgWrap: {
    width: pxToDp(70),
    height: pxToDp(70),
    borderRadius: pxToDp(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextWrap: {
    fontSize: pxToDp(18),
    marginTop: pxToDp(4),
    color: '#ffffff9a',
  },
});
export default FriendHead;
