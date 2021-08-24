/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Flex, Text, Image} from 'native-base';
import {StyleSheet} from 'react-native';
import {BASE_URI, FRIENDS_TODAYBEST} from '../../../api/pathMap';
import pxToDp from '../../../utils/PixelRatio';
import IconFont from '../../../public/IconFont';
import {get} from '../../../api';
export default function PerfectGirl() {
  const [infos, setInfos] = useState({});
  useEffect(() => {
    async function getInfos() {
      const res = await get(FRIENDS_TODAYBEST);
      console.log(res);
      setInfos(res.data[0]);
    }
    getInfos();
  }, []);
  return (
    <Flex flexDirection="row">
      {/* 左边图片区sta */}
      <Flex position="relative">
        <Image
          style={{width: pxToDp(120), height: pxToDp(120)}}
          source={{
            uri: BASE_URI + infos.header,
          }}
        />
        <Flex style={Styles.tex}>
          <Text color="#ffff" fontSize={pxToDp(16)}>
            今日佳人
          </Text>
        </Flex>
      </Flex>
      {/* 左边图片区end */}
      {/* 右边内容sta */}
      <Flex flexDirection="row">
        <Flex justifyContent="space-around">
          <Flex flexDirection="row" alignItems="center">
            <Text style={{color: 'red'}}>{infos.nick_name}</Text>
            <IconFont
              style={{
                fontSize: pxToDp(18),
                color: infos.gender === '女' ? '#b564bf' : 'red',
              }}
              name={infos.gender === '女' ? 'icontanhuanv' : 'icontanhuanan'}
            />
            <Text style={{color: 'red'}}>{infos.age}岁</Text>
          </Flex>

          <Flex direction="row">
            <Text style={{color: 'red'}}>{infos.marry}</Text>
            <Text style={{color: 'red'}}>|</Text>
            <Text style={{color: 'red'}}>{infos.xueli}</Text>
            <Text style={{color: 'red'}}>|</Text>
            <Text style={{color: 'red'}}>
              {infos.agediff < 10 ? '年龄相仿' : '有点代购'}
            </Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center" direction="row">
            <Flex
              position="relative"
              alignItems="center"
              justifyContent="center">
              <IconFont
                name="iconxihuan"
                style={{color: 'red', fontSize: pxToDp(28)}}
              />
              <Text style={Styles.content}>{infos.fateValue}</Text>
            </Flex>
            <Text style={{color: 'red', fontSize: pxToDp(13)}}>缘分值</Text>
          </Flex>
        </Flex>
      </Flex>
      {/* 右边内容end */}
    </Flex>
  );
}
const Styles = StyleSheet.create({
  tex: {
    width: pxToDp(80),
    height: pxToDp(30),
    backgroundColor: '#b564bf',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: pxToDp(10),
    position: 'absolute',
    left: 0,
    bottom: pxToDp(10),
  },
  content: {
    position: 'absolute',
    color: '#fff',
    fontSize: pxToDp(13),
    fontWeight: 'bold',
  },
});
