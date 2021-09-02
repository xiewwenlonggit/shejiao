/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Flex, Image} from 'native-base';
import {ImageBackground} from 'react-native';
import Nav from '../../../public/Nav';
import {get} from '../../../api';
import {FRIENDS_QUESTIONS, BASE_URI} from '../../../api/pathMap';
import Swiper from 'react-native-swiper';
import THButton from '../../../public/THButton';
import pxToDp from '../../../utils/PixelRatio';
import {useNavigation} from '@react-navigation/core';
export default function Index() {
  const nativetor = useNavigation();
  // 获取数据
  const [queryList, setqueryList] = useState([]);

  useEffect(() => {
    async function getInfos() {
      const res = await get(FRIENDS_QUESTIONS);
      setqueryList(res.data);
    }
    getInfos();
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const goPage = () => {
    nativetor.navigate('TestQA', queryList[currentIndex]);
  };
  return (
    <Flex style={{backgroundColor: '#fff', flex: 1}}>
      <Nav title="测灵魂" />
      <ImageBackground
        source={require('../../../res/testsoul_bg.png')}
        style={{
          width: '100%',
          height: '60%',
        }}
        imageStyle={{height: '100%'}}>
        {queryList.length ? (
          <Swiper
            index={currentIndex}
            style={{backgroundColor: 'transparent'}}
            onIndexChanged={setCurrentIndex}>
            {queryList.map((el, i) => (
              <Flex
                key={i}
                justifyContent="center"
                style={{
                  height: '80%',
                  borderRadius: 4,
                  borderColor: '#E8E8E8',
                  backgroundColor: 'white',
                }}>
                <Image
                  source={{uri: BASE_URI + el.imgpath}}
                  style={{width: '100%', height: '100%'}}
                />
              </Flex>
            ))}
          </Swiper>
        ) : (
          <></>
        )}
      </ImageBackground>
      <THButton
        onPress={goPage}
        style={{
          position: 'absolute',
          width: '80%',
          height: pxToDp(40),
          bottom: pxToDp(20),
          alignSelf: 'center',
        }}>
        开始测试
      </THButton>
    </Flex>
  );
}
