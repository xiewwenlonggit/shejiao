/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Flex, Text, Image, useToast} from 'native-base';
import Swiper from 'react-native-swiper';
import {ImageBackground, StyleSheet} from 'react-native';
import {get, post} from '../../../api';
import {FRIENDS_CARDS, BASE_URI, FRIENDS_LIKE} from '../../../api/pathMap';
import IconFont from '../../../public/IconFont';
import Nav from '../../../public/Nav';
import pxToDp from '../../../utils/PixelRatio';
import {TouchableOpacity} from 'react-native';
export default function Index() {
  const Toast = useToast();
  const param = {
    pagesize: 5,
  };
  const [currentIndex, setCurrentIndex] = useState(2);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(5);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    async function getFriendsCards() {
      const res = await get(FRIENDS_CARDS, {page, pagesize: param.pagesize});
      setTotalPage(res.pages);
      setCards([...cards, ...res.data]);
    }
    getFriendsCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  const onMomentumScrollEnd = (e, state, context) => {
    console.log(e, state, context);
    if (state.index === cards.length - 1) {
      if (page >= totalPage) {
        Toast.show({title: '没有下一页数据', status: 'error'});
      } else {
        setPage(() => page + 1);
      }
    }
  };
  /**
  //  * 喜欢或不喜欢
   * @param {string} type enum {like,dislike}
   */
  const setLike = type => {
    sendLike(type);
    if (type === 'dislike') {
      setCurrentIndex(() => currentIndex - 1);
    } else {
      setCurrentIndex(() => currentIndex + 1);
    }
  };
  const sendLike = async type => {
    const id = cards[currentIndex].id;
    const url = FRIENDS_LIKE.replace(':id', id).replace(':type', type);
    const res = await get(url);
    Toast.show({
      title: res.data,
    });
  };
  return (
    <Flex style={{backgroundColor: '#fff', flex: 1}}>
      <Nav title="探花" />
      <ImageBackground
        style={{height: '60%'}}
        imageStyle={{height: '100%'}}
        source={require('../../../res/testsoul_bg.png')}>
        {cards && cards.length ? (
          <Swiper
            showsButtons={true}
            index={currentIndex}
            buttonWrapperStyle={{top: pxToDp(120)}}
            onIndexChanged={setCurrentIndex}
            onMomentumScrollEnd={onMomentumScrollEnd}
            style={{backgroundColor: 'transparent'}}>
            {cards.map((v, i) => (
              <Flex style={Styles.card} key={i}>
                <Image
                  source={{uri: BASE_URI + v.header}}
                  style={{width: '100%', height: '80%'}}
                />
                {/* 网友信息sta */}
                <Flex alignItems="center" justifyContent="space-around">
                  <Flex direction="row" alignItems="center">
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
                    <Text style={{color: '#555'}}>{v.age}</Text>
                  </Flex>
                  <Flex direction="row">
                    <Text style={{color: '#555'}}>{v.marry}</Text>
                    <Text style={{color: '#555'}}>|</Text>
                    <Text style={{color: '#555'}}>{v.xueli}</Text>
                    <Text style={{color: '#555'}}>|</Text>
                    <Text style={{color: '#555'}}>
                      {v.agediff < 10 ? '年龄相仿' : '有点代沟'}
                    </Text>
                  </Flex>
                </Flex>
                {/* 网友信息end */}
              </Flex>
            ))}
          </Swiper>
        ) : null}
      </ImageBackground>
      <Flex style={Styles.icon}>
        <TouchableOpacity
          onPress={() => {
            setLike('disLike');
          }}
          style={Styles.btn}>
          <IconFont
            style={{fontSize: pxToDp(30), color: '#fff'}}
            name="iconbuxihuan"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setLike('like');
          }}
          style={Styles.btn}>
          <IconFont
            style={{fontSize: pxToDp(30), color: '#fff'}}
            name="iconxihuan"
          />
        </TouchableOpacity>
      </Flex>
    </Flex>
  );
}
const Styles = StyleSheet.create({
  card: {
    height: '60%',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    alignSelf: 'center',
    marginTop: pxToDp(40),
  },
  btn: {
    backgroundColor: '#ebc869',
    width: pxToDp(60),
    height: pxToDp(60),
    borderRadius: pxToDp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
