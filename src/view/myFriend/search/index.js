/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Flex, Text, Box, Center, Image} from 'native-base';
import {Overlay} from 'react-native-elements';
import {
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import pxToDp from '../../../utils/PixelRatio';
import IconFont from '../../../public/IconFont';
import FilterPanel from './filterPanel';
import {get} from '../../../api';
import {FRIENDS_SEARCH, BASE_URI} from '../../../api/pathMap';
export default function Index() {
  useEffect(() => {
    (async function getInfos() {
      const res = await get(FRIENDS_SEARCH, {gender: '男', distance: 10000});
      setList(res.data);
    })();
  }, []);
  const [isVisible, setIsVisible] = useState(false);
  // 点击筛选显示弹框
  const handleFilterShow = () => {
    setIsVisible(true);
  };
  const [list, setList] = useState([]);
  // 筛选条件提交
  const onSubmitFilter = async filterParams => {
    const res = await get(FRIENDS_SEARCH, filterParams);
    setList(res.data);
  };
  const WHMap = {
    wh1: {width: pxToDp(70), height: pxToDp(100)},
    wh2: {width: pxToDp(60), height: pxToDp(90)},
    wh3: {width: pxToDp(50), height: pxToDp(80)},
    wh4: {width: pxToDp(40), height: pxToDp(70)},
    wh5: {width: pxToDp(30), height: pxToDp(60)},
    wh6: {width: pxToDp(20), height: pxToDp(50)},
  };
  // 根据 dist来返回对应的宽度的档次
  const getWidthHeight = dist => {
    if (dist < 200) {
      return 'wh1';
    }
    if (dist < 400) {
      return 'wh2';
    }
    if (dist < 600) {
      return 'wh3';
    }
    if (dist < 1000) {
      return 'wh4';
    }
    if (dist < 1500) {
      return 'wh5';
    }
    return 'wh6';
  };
  /**
   * 屏幕的宽度
   */
  const screenWidth = Dimensions.get('window').width;
  /**
   * 屏幕的高度
   */
  const screenHeight = Dimensions.get('window').height;
  return (
    <ImageBackground
      style={{flex: 1, position: 'relative'}}
      source={require('../../../res/search.gif')}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <TouchableOpacity style={Styles.btn} onPress={handleFilterShow}>
        <IconFont
          style={{
            color: '#912375',
            fontSize: pxToDp(30),
          }}
          name="iconshaixuan"
        />
      </TouchableOpacity>
      {list.map((v, i) => {
        const whMap = WHMap[getWidthHeight(v.dist)];
        const tx = Math.random() * (screenWidth - whMap.width);
        const ty = Math.random() * (screenHeight - whMap.height);
        return (
          <TouchableOpacity
            key={i}
            style={{position: 'absolute', left: tx, top: ty}}>
            <ImageBackground
              source={require('../../../res/showfirend.png')}
              resizeMode="stretch"
              style={{...whMap, position: 'relative', alignItems: 'center'}}>
              <Text
                numberOfLines={1}
                style={{
                  color: '#ffffff9a',
                  position: 'absolute',
                  top: -pxToDp(20),
                }}>
                {v.nick_name}
              </Text>
              <Image
                style={{
                  width: whMap.width,
                  height: whMap.width,
                  borderRadius: whMap.width / 2,
                }}
                source={{uri: BASE_URI + v.header}}
              />
            </ImageBackground>
          </TouchableOpacity>
        );
      })}
      <Flex
        style={{position: 'absolute', bottom: pxToDp(50), width: '100%'}}
        alignItems="center">
        <Text style={{color: '#fff'}}>
          你附近有
          <Text style={{color: 'red', fontSize: pxToDp(20)}}>
            {list.length}
          </Text>
          个好友
        </Text>
        <Text style={{color: '#fff'}}>选择聊聊</Text>
      </Flex>
      {/* 筛选弹框 sta*/}
      <Overlay isVisible={isVisible} style={Styles.wrap}>
        {/* 筛选组件 */}
        <FilterPanel
          onSubmitFilter={onSubmitFilter}
          onClose={() => setIsVisible(false)}
        />
      </Overlay>
      {/* 筛选弹框 end*/}
    </ImageBackground>
  );
}
const Styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    width: '100%',
    height: '70%',
    left: 0,
    bottom: 0,
    backgroundColor: '#fff',
    paddingLeft: pxToDp(10),
    paddingRight: pxToDp(10),
  },
  btn: {
    backgroundColor: '#fff',
    position: 'absolute',
    right: '10%',
    top: '10%',
    width: pxToDp(55),
    height: pxToDp(55),
    borderRadius: pxToDp(27.5),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});
