/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState, useEffect} from 'react';
import {
  useToast,
  Flex,
  Text,
  FlatList,
  Image,
  Pressable,
  Modal,
  Box,
  Center,
} from 'native-base';
import {StyleSheet} from 'react-native';
import {get} from '../../../api';
import {
  QZ_TJDT,
  BASE_URI,
  QZ_DT_DZ,
  QZ_DT_XH,
  QZ_DT_BGXQ,
} from '../../../api/pathMap';
import pxToDp from '../../../utils/PixelRatio';
import date from '../../../utils/date';
import JMessage from '../../../utils/JMessage';
import {useSelector} from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import LinearGradient from 'react-native-linear-gradient';
import IconFont from '../../../public/IconFont';
import Validator from '../../../utils/validator';
import {EMOTIONS_DATA} from '../../../public/Emotion/datasource';
import {useNavigation} from '@react-navigation/core';
export default () => {
  const Toast = useToast();
  const users = useSelector(state => state.customer);
  const navigation = useNavigation();
  const [list, setList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(2);
  const pagesize = 3;
  useEffect(() => {
    return getData();
  }, [getData]);
  const getData = useCallback(
    async (isNew = false) => {
      console.log(pageNo);
      const params = {
        page: pageNo,
        pagesize,
      };
      const res = await get(QZ_TJDT, params);
      if (isNew) {
        setList([...res.data]);
      } else {
        setList([...list, ...res.data]);
      }
      setTotalPages(res.pages);
      setIsLoading(false);
    },
    [pageNo, pagesize],
  );

  //   滑动到底部
  const onEndReached = () => {
    if (pageNo >= totalPages || isLoading) {
      return;
    } else {
      setIsLoading(true);
      setPageNo(() => pageNo + 1);
      getData();
    }
  };
  // 渲染文字
  const rendeRichText = text => {
    const dataList = Validator.renderRichText(text);
    return dataList.map((v, i) => {
      if (v.text) {
        return (
          <Text style={{color: '#666'}} key={i}>
            {v.text}
          </Text>
        );
      } else if (v.image) {
        return (
          <Image
            style={{width: pxToDp(25), height: pxToDp(25)}}
            key={i}
            source={EMOTIONS_DATA[v.image]}
          />
        );
      } else {
        return <></>;
      }
    });
  };
  // 相册点击
  const [imgUrls, setImgUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAlbum, setShowAlbum] = useState(false);

  const handleShowAlbum = (index, ii) => {
    const img = list[index].images.map(v => ({
      url: BASE_URI + v.thum_img_path,
    }));
    setImgUrls([...img]);
    setCurrentIndex(ii);
    setShowAlbum(true);
  };
  //点赞
  const handleStar = async item => {
    const url = QZ_DT_DZ.replace(':id', item.tid);
    const res = await get(url);
    if (res.data.iscancelstar) {
      Toast.show({
        title: '取消成功',
      });
    } else {
      Toast.show({
        title: '点赞成功',
      });
      const tex = `${users.nick_name}点赞了你的动态`;
      const extras = {
        user: JSON.stringify(users),
      };
      JMessage.sendTextMessage(item.guid, tex, extras);
    }
    setPageNo(1);
    getData(true);
  };
  // 评论
  const goComment = item => {
    navigation.navigate('Comment', item);
  };
  // 收藏
  const handleLike = async item => {
    const url = QZ_DT_XH.replace(':id', item.tid);
    const res = await get(url);
    if (res.data.iscancelstar) {
      Toast.show({
        title: '取消喜欢',
      });
    } else {
      Toast.show({
        title: '喜欢成功',
      });
    }
    setPageNo(1);
    getData(true);
  };

  return (
    <>
      <FlatList
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        data={list}
        keyExtractor={v => v.tid + ''}
        renderItem={({item, index}) => (
          <Flex key={index} style={BaseStyles.wrap}>
            {/* 用户信息sta */}
            <Flex direction="row" alignItems="center">
              <Box style={{paddingRight: pxToDp(15)}}>
                <Image
                  source={{uri: BASE_URI + item.header}}
                  style={{
                    ...BaseStyles.img,
                  }}
                />
              </Box>
              <Flex justifyContent="space-around">
                <Flex alignItems="center" direction="row">
                  <Text style={{color: '#555'}}>{item.nick_name}</Text>
                  <IconFont
                    style={{
                      marginLeft: pxToDp(5),
                      marginRight: pxToDp(5),
                      fontSize: pxToDp(18),
                      color: item.gender === '女' ? '#b564bf' : 'red',
                    }}
                    name={
                      item.gender === '女' ? 'icontanhuanv' : 'icontanhuanan'
                    }
                  />
                  <Text style={{color: '#555'}}>{item.age}岁</Text>
                </Flex>
                <Flex style={{flexDirection: 'row'}}>
                  <Text style={{...BaseStyles.text}}>{item.marry}</Text>
                  <Text style={{...BaseStyles.text}}>|</Text>
                  <Text style={{...BaseStyles.text}}>{item.xueli}</Text>
                  <Text style={{...BaseStyles.text}}>|</Text>
                  <Text style={{...BaseStyles.text}}>
                    {item.agediff < 10 ? '年龄相仿' : '有点代沟'}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            {/* 用户信息end */}
            {/* 动态内容sta*/}
            <Flex
              alignItems="center"
              flexWrap="wrap"
              direction="row"
              style={{
                marginTop: pxToDp(8),
              }}>
              {rendeRichText(item.content)}
            </Flex>
            {/*  动态内容end */}
            {/* 相册sta */}
            <Flex
              flexWrap="wrap"
              direction="row"
              style={{
                paddingTop: pxToDp(5),
                paddingBottom: pxToDp(5),
              }}>
              {item.images.map((vv, ii) => (
                <Pressable onPress={() => handleShowAlbum(index, ii)} key={ii}>
                  <Image
                    style={{
                      width: pxToDp(70),
                      height: pxToDp(70),
                      marginRight: pxToDp(5),
                    }}
                    source={{uri: BASE_URI + vv.thum_img_path}}
                  />
                </Pressable>
              ))}
            </Flex>
            {/* 相册end */}
            {/* 相册点击弹框sta */}
            <Modal visible={showAlbum} transparent={true}>
              <ImageViewer
                onClick={() => setShowAlbum(false)}
                imageUrls={imgUrls}
                index={currentIndex}
              />
            </Modal>
            {/* 相册点击弹框end*/}
            {/* 距离时间sta */}
            <Flex
              flexWrap="wrap"
              direction="row"
              style={{
                paddingTop: pxToDp(5),
                paddingBottom: pxToDp(5),
              }}>
              <Box>
                <Text style={{color: '#666'}}>距离 {item.dist} m</Text>
              </Box>
              <Box>
                <Text style={{color: '#666', marginLeft: pxToDp(8)}}>
                  {date(item.create_time).fromNow()}
                </Text>
              </Box>
            </Flex>
            {/* 距离时间end */}
            {/* 图标sta */}
            <Flex direction="row" justifyContent="space-between">
              <Pressable
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => handleStar(item)}>
                <IconFont style={{color: '#666'}} name="icondianzan-o" />
                <Text style={{color: '#666'}}>{item.star_count}</Text>
              </Pressable>
              <Pressable
                onPress={() => goComment(item)}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <IconFont style={{color: '#666'}} name="iconpinglun" />
                <Text style={{color: '#666'}}>{item.comment_count}</Text>
              </Pressable>
              <Pressable
                onPress={() => handleLike(item)}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <IconFont style={{color: '#666'}} name="iconxihuan-o" />
                <Text style={{color: '#666'}}>{item.like_count}</Text>
              </Pressable>
            </Flex>
            {/* 图标end */}
            {/* 底部sta */}
            <Flex style={{marginTop: pxToDp(10)}}>
              {pageNo >= totalPages && index === list.length - 1 ? (
                <Center
                  style={{
                    height: pxToDp(60),
                    borderTopWidth: pxToDp(2),
                    borderTopColor: '#333',
                  }}>
                  <Text style={{color: '#333'}}>没有数据</Text>
                </Center>
              ) : (
                <></>
              )}
            </Flex>

            {/* 底部end */}
          </Flex>
        )}
      />
      <Pressable
        style={{position: 'absolute', right: '10%', bottom: '10%'}}
        onPress={() => navigation.navigate('Publish')}>
        <LinearGradient
          colors={['#da6c8b', '#9b65cc']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            width: pxToDp(80),
            height: pxToDp(80),
            borderRadius: pxToDp(40),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: pxToDp(22)}}>发布</Text>
        </LinearGradient>
      </Pressable>
    </>
  );
};
const BaseStyles = StyleSheet.create({
  wrap: {
    padding: pxToDp(10),
    borderBottomColor: '#ccc',
    borderBottomWidth: pxToDp(1),
    flex: 1,
  },
  img: {
    width: pxToDp(40),
    height: pxToDp(40),
    borderRadius: pxToDp(20),
  },
  text: {
    color: '#555',
    marginRight: pxToDp(5),
  },
});
