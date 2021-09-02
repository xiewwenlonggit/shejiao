/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {ImageHeaderScrollView} from 'react-native-image-header-scroll-view';
import pxToDp from '../../utils/PixelRatio';
import FriendHead from './component/FrientHead';
import Visitors from './component/Visitors';
import IconFont from '../../public/IconFont';
import {get} from '../../api';
import {FRIENDS_RECOMMEND, BASE_URI} from '../../api/pathMap';
import {Overlay} from 'react-native-elements';
import FilterPanel from './component/FilterPanel';
import PerfectGirl from './component/PerfectGirl';
import {useNavigation} from '@react-navigation/core';
const MyFriend = () => {
  const navigation = useNavigation();
  // 接口要的数据
  const params = {
    page: 1,
    pagesize: 100,
    gender: '男',
    distance: 2,
    lastLogin: '',
    city: '',
    education: '',
  };
  const [isVisible, setIsVisible] = useState(false);
  // 字体图标点击
  const recommendFilterShow = () => {
    setIsVisible(true);
  };
  // 推荐朋友 数组
  const [recommends, setRecommends] = useState([]);

  useEffect(() => {
    async function getRecommends(filterParams = {}) {
      const res = await get(FRIENDS_RECOMMEND, {
        ...params,
        ...filterParams,
      });
      setRecommends(res.data);
    }
    getRecommends();
  }, []);
  const close = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  const submit = async (filterParams = {}) => {
    const res = await get(FRIENDS_RECOMMEND, {
      ...params,
      ...filterParams,
    });
    res.data;
  };
  return (
    <View style={{flex: 1}}>
      <ImageHeaderScrollView
        maxHeight={pxToDp(130)}
        minHeight={pxToDp(44)}
        headerImage={require('../../res/headfriend.png')}
        renderForeground={() => (
          <View
            style={{
              height: pxToDp(130),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FriendHead />
          </View>
        )}>
        <View>
          {/* 访客sta */}
          <Visitors />
          {/* 访客end */}
          <View
            style={{
              marginTop: pxToDp(4),
              height: pxToDp(3),
              backgroundColor: '#ccc',
            }}
          />
          <PerfectGirl />
          {/* 推荐朋友sta */}
          <View>
            <View style={Styles.tuijian}>
              <Text style={{color: '#666'}}>推荐</Text>
              <IconFont
                onPress={recommendFilterShow}
                style={{
                  color: '#666',
                }}
                name="iconshaixuan"
              />
            </View>
          </View>
          {/* 推荐朋友end */}
          {/* 列表内容sta */}
          <View>
            {recommends && recommends.length
              ? recommends.map((v, i) => (
                  <TouchableOpacity
                    key={i}
                    style={Styles.recommends}
                    onPress={() => navigation.navigate('Detail', {id: v.id})}>
                    <View
                      style={{
                        paddingLeft: pxToDp(15),
                        paddingRight: pxToDp(15),
                      }}>
                      <Image
                        style={{
                          width: pxToDp(50),
                          height: pxToDp(50),
                          borderRadius: pxToDp(25),
                        }}
                        source={{
                          uri: BASE_URI + v.header,
                        }}
                      />
                    </View>
                    {/* 名称 */}
                    <View style={{flex: 2, justifyContent: 'space-around'}}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: '#555'}}>{v.nick_name}</Text>
                        <IconFont
                          style={{
                            fontSize: pxToDp(18),
                            color: v.gender === '女' ? '#b564bf' : 'red',
                          }}
                          name={
                            v.gender === '女' ? 'icontanhuanv' : 'icontanhuanan'
                          }
                        />
                        <Text style={{color: '#555'}}>{v.age}岁</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={Styles.infos}>{v.marry}</Text>
                        <Text style={Styles.infos}>|</Text>
                        <Text style={Styles.infos}>{v.xueli}</Text>
                        <Text style={Styles.infos}>|</Text>
                        <Text style={Styles.infos}>
                          {v.agediff < 10 ? '年龄相仿' : '有点代沟'}
                        </Text>
                      </View>
                    </View>
                    {/* 缘分值 */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: pxToDp(100),
                        justifyContent: 'center',
                      }}>
                      <IconFont
                        name="iconxihuan"
                        style={{
                          color: 'red',
                          fontSize: pxToDp(30),
                        }}
                      />
                      <Text style={{color: '#666'}}>{v.fateValue}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              : null}
          </View>
          {/* 列表内容end */}
        </View>
      </ImageHeaderScrollView>
      <Overlay
        overlayStyle={{
          position: 'absolute',
          width: '100%',
          height: '70%',
          left: 0,
          bottom: 0,
          backgroundColor: '#fff',
          paddingLeft: pxToDp(10),
          paddingRight: pxToDp(10),
        }}
        isVisible={isVisible}>
        <FilterPanel onClose={close} onSubmitFilter={submit} />
      </Overlay>
    </View>
  );
};
const Styles = StyleSheet.create({
  tuijian: {
    height: pxToDp(40),
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: pxToDp(10),
    paddingRight: pxToDp(10),
    alignItems: 'center',
  },
  recommends: {
    flexDirection: 'row',
    paddingTop: pxToDp(15),
    paddingBottom: pxToDp(15),
    borderBottomWidth: pxToDp(1),
    borderColor: '#ccc',
  },
  infos: {color: '#555'},
});
export default MyFriend;
