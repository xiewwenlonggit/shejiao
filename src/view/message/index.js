/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, ImageBackground, Image, StatusBar} from 'react-native';
import {Flex, Text, Box} from 'native-base';
import pxToDp from '../../utils/PixelRatio';
import {TouchableOpacity} from 'react-native';
import IconFont from '../../public/IconFont';
import JMessage from '../../utils/JMessage';
import {FRIENDS_PERSONALINFO_GUID, BASE_URI} from '../../api/pathMap';
import {get} from '../../api';
import date from '../../utils/date';
import {useNavigation} from '@react-navigation/core';
const Index = () => {
  const navigation = useNavigation();
  const [list, setList] = useState([]);
  useEffect(() => {
    async function getData() {
      const res = await JMessage.getConversations();
      if (res.length) {
        const idArr = res.map(item => item.target.username);
        const url = FRIENDS_PERSONALINFO_GUID.replace(':ids', idArr.join(','));
        const users = await get(url);
        const newArr = res.map((el, i) => {
          return {...el, user: users.data[i]};
        });
        setList([...newArr]);
      }
    }
    getData();
  }, []);
  return (
    <Flex style={{flex: 1}}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <ImageBackground
        source={require('../../res/headbg.png')}
        style={baseStyles.bmg}>
        <Text style={baseStyles.title}>消息</Text>
        <TouchableOpacity>
          <IconFont
            name="icontongxunlu"
            style={{color: '#fff', fontSize: pxToDp(20)}}
          />
        </TouchableOpacity>
      </ImageBackground>
      <Flex
        direction="row"
        justifyContent="space-between"
        style={{...baseStyles.xia}}>
        <TouchableOpacity style={{alignItems: 'center'}}>
          <Flex
            alignItems="center"
            justifyContent="center"
            style={{...baseStyles.left, backgroundColor: '#ebc969'}}>
            <IconFont
              name="icongonggao"
              style={{color: '#fff', fontSize: pxToDp(24)}}
            />
          </Flex>
          <Text style={{color: '#666'}}>全部</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{alignItems: 'center'}}>
          <Flex
            alignItems="center"
            justifyContent="center"
            style={{...baseStyles.left, backgroundColor: '#ff5314'}}>
            <IconFont
              name="icondianzan-o"
              style={{color: '#fff', fontSize: pxToDp(24)}}
            />
          </Flex>
          <Text style={{color: '#666'}}>点赞</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{alignItems: 'center'}}>
          <Flex
            alignItems="center"
            justifyContent="center"
            style={{...baseStyles.left, backgroundColor: '#2fb4f9'}}>
            <IconFont
              name="icongonggao"
              style={{color: '#fff', fontSize: pxToDp(24)}}
            />
          </Flex>
          <Text style={{color: '#666'}}>评论</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{alignItems: 'center'}}>
          <Flex
            alignItems="center"
            justifyContent="center"
            style={{...baseStyles.left, backgroundColor: '#1adbde'}}>
            <IconFont
              name="icongonggao"
              style={{color: '#fff', fontSize: pxToDp(24)}}
            />
          </Flex>
          <Text style={{color: '#666'}}>喜欢</Text>
        </TouchableOpacity>
      </Flex>
      <Box>
        {list.map((v, i) => (
          <TouchableOpacity
            key={i}
            style={baseStyles.list}
            onPress={() => navigation.navigate('Chat', v.user)}>
            <Flex>
              <Image
                source={{uri: BASE_URI + v.user.header}}
                style={{
                  width: pxToDp(54),
                  height: pxToDp(54),
                  borderRadius: pxToDp(27),
                }}
              />
            </Flex>
            <Flex
              style={{justifyContent: 'space-evenly', paddingLeft: pxToDp(15)}}>
              <Text style={{color: '#666'}}>{v.user.nick_name}</Text>
              <Text style={{color: '#666'}}>{v.latestMessage.text}</Text>
            </Flex>
            <Flex
              style={{
                justifyContent: 'space-evenly',
                flex: 1,
                alignItems: 'flex-end',
              }}>
              <Text style={{color: '#666'}}>
                {date(v.latestMessage.createTime).fromNow()}
              </Text>
              <Flex
                style={{
                  width: pxToDp(20),
                  height: pxToDp(20),
                  borderRadius: pxToDp(10),
                  backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#fff'}}>{v.unreadCount}</Text>
              </Flex>
            </Flex>
          </TouchableOpacity>
        ))}
      </Box>
    </Flex>
  );
};
const baseStyles = StyleSheet.create({
  bmg: {
    height: pxToDp(60),
    paddingTop: pxToDp(12),
    flexDirection: 'row',
    paddingLeft: pxToDp(10),
    paddingRight: pxToDp(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: pxToDp(20),
    fontWeight: 'bold',
  },
  xia: {
    paddingTop: pxToDp(10),
    paddingBottom: pxToDp(10),
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(30),
    borderBottomWidth: pxToDp(3),
    borderBottomColor: '#dce2e5',
  },
  left: {
    width: pxToDp(60),
    height: pxToDp(60),
    borderRadius: pxToDp(30),
  },
  list: {
    padding: pxToDp(15),
    flexDirection: 'row',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#ccc',
  },
});

export default Index;
