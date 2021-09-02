/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Flex, Text} from 'native-base';
import {ImageBackground, StyleSheet, ScrollView, Image} from 'react-native';
import pxToDp from '../../../utils/PixelRatio';
import Nav from '../../../public/Nav';
import {BASE_URI} from '../../../api/pathMap';
import THButton from '../../../public/THButton';
const Index = ({navigation, route}) => {
  useEffect(() => {}, []);
  const {params} = route;
  return (
    <ImageBackground
      style={{flex: 1, width: '100%'}}
      source={require('../../../res/qabg.png')}>
      <Nav title="测试结果" />
      <ImageBackground
        style={{flex: 1, width: '100%', position: 'relative'}}
        resizeMode="stretch"
        source={require('../../../res/result.png')}>
        <Text style={baseStyles.text}>灵魂基因鉴定单</Text>
        {/* 用户名称sta */}
        <Flex direction="row" justify="space-between" style={baseStyles.wrap}>
          <Text style={baseStyles.wenzi}>[</Text>
          <Text style={baseStyles.wenzi}>{params.currentUser.nick_name}</Text>
          <Text style={baseStyles.wenzi}>]</Text>
        </Flex>
        {/* 用户名称end */}
        {/* 测试结果sta */}
        <ScrollView style={baseStyles.scrolls}>
          <Text style={{color: '#fff'}}>{params.content}</Text>
        </ScrollView>
        <Flex style={{position: 'absolute', left: '5%', top: '43%'}}>
          <Text style={{color: '#ffffff9a'}}>外向</Text>
          <Text style={{color: '#ffffff9a'}}>{params.extroversion}%</Text>
        </Flex>

        <Flex style={{position: 'absolute', left: '5%', top: '49%'}}>
          <Text style={{color: '#ffffff9a'}}>判断</Text>
          <Text style={{color: '#ffffff9a'}}>{params.judgment}%</Text>
        </Flex>

        <Flex style={{position: 'absolute', left: '5%', top: '56%'}}>
          <Text style={{color: '#ffffff9a'}}>抽象</Text>
          <Text style={{color: '#ffffff9a'}}>{params.abstract}%</Text>
        </Flex>

        <Flex style={{position: 'absolute', right: '5%', top: '43%'}}>
          <Text style={{color: '#ffffff9a'}}>理性</Text>
          <Text style={{color: '#ffffff9a'}}>{params.rational}%</Text>
        </Flex>
        {/* 结论 */}
        <Text style={baseStyles.results}>与你相似</Text>
        {/* 测试结果end */}

        <ScrollView
          horizontal={true}
          contentContainerStyle={{flexDirection: 'row', alignItems: 'center'}}
          style={baseStyles.hScroll}>
          <Image
            style={baseStyles.img}
            source={{uri: BASE_URI + params.currentUser.header}}
          />
          <Image
            style={baseStyles.img}
            source={{uri: BASE_URI + params.currentUser.header}}
          />
          <Image
            style={baseStyles.img}
            source={{uri: BASE_URI + params.currentUser.header}}
          />

          <Image
            style={baseStyles.img}
            source={{uri: BASE_URI + params.currentUser.header}}
          />
          <Image
            style={baseStyles.img}
            source={{uri: BASE_URI + params.currentUser.header}}
          />
          <Image
            style={baseStyles.img}
            source={{uri: BASE_URI + params.currentUser.header}}
          />
          <Image
            style={baseStyles.img}
            source={{uri: BASE_URI + params.currentUser.header}}
          />
          <Image
            style={baseStyles.img}
            source={{uri: BASE_URI + params.currentUser.header}}
          />
        </ScrollView>
        <Flex
          style={{
            width: '96%',
            height: pxToDp(40),
            position: 'absolute',
            top: '90%',
            alignSelf: 'center',
          }}>
          <THButton
            onPress={() => {
              navigation.navigate('TestSoul');
            }}>
            继续测试
          </THButton>
        </Flex>
      </ImageBackground>
    </ImageBackground>
  );
};
const baseStyles = StyleSheet.create({
  text: {
    position: 'absolute',
    top: '1%',
    left: '6%',
    color: '#ffffff9a',
    letterSpacing: pxToDp(7),
  },
  wrap: {
    width: '47%',
    position: 'absolute',
    top: '6%',
    right: '5%',
  },
  wenzi: {
    color: '#fff',
    fontSize: pxToDp(16),
  },
  scrolls: {
    width: '47%',
    position: 'absolute',
    right: '5%',
    top: '12%',
    height: '26%',
  },
  results: {
    color: '#ffffff9a',
    position: 'absolute',
    left: '5%',
    top: '69%',
  },
  hScroll: {
    position: 'absolute',
    width: '96%',
    height: '11%',
    left: '2%',
    top: '72%',
  },
  img: {
    marginLeft: pxToDp(5),
    width: pxToDp(50),
    height: pxToDp(50),
    borderRadius: pxToDp(25),
  },
  btn: {
    width: '96%',
    height: pxToDp(40),
    position: 'absolute',
    // top: '90%',
    top: '69%',
    alignSelf: 'center',
  },
});

export default Index;
