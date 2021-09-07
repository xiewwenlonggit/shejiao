/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Flex, Box, Image, Text, useToast, StatusBar, Center} from 'native-base';
import {StyleSheet, TouchableOpacity, Modal} from 'react-native';
import pxToDp from '../../../utils/PixelRatio';
import {FRIENDS_PERSONALINFO, BASE_URI} from '../../../api/pathMap';
import {get} from '../../../api';
import IconFont from '../../../public/IconFont';
import {useSelector} from 'react-redux';
import Swiper from 'react-native-swiper';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ImageViewer from 'react-native-image-zoom-viewer';
import LinearGradient from 'react-native-linear-gradient';
import JMessage from '../../../utils/JMessage';
const Index = ({navigation, route}) => {
  const user = useSelector(state => state.customer);
  const Toast = useToast();
  const {id} = route.params;
  const pagesize = 10;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userDetail, setUserDetail] = useState({});
  // 当前用户的动态数组
  const [trends, setTrends] = useState([]);
  const [showAlbum, setShowAlbum] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgUrls, setImgUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getDataList() {
      const url = FRIENDS_PERSONALINFO.replace(':id', id);
      const res = await get(url, {page, pagesize});
      const {
        pages,
        data,
        data: {trends: value},
      } = res;
      setTotalPages(pages);
      setUserDetail(data);
      setTrends([...trends, ...value]);
      setIsLoading(false);
    }
    getDataList();
  }, [page, pagesize, id]);
  // 点击聊天
  const goChart = () => {
    navigation.navigate('Chat', userDetail);
  };
  // 喜欢
  const sendLike = async () => {
    const {guid} = userDetail;

    const text = user.nick_name + ' 喜欢了你';
    const extras = {user: JSON.stringify(userDetail)};
    try {
      await JMessage.sendTextMessage(guid, text, extras);
    } catch (error) {
      throw new Error(error);
    }
    Toast.show({
      status: 'success',
      duration: 2000,
      render: () => {
        return (
          <Center bg="teal.500" px={4} py={3} rounded="md" mb={5}>
            操作成功 😊
          </Center>
        );
      },
    });
  };
  const handleShowAlbum = (i, index) => {
    const imgurl = userDetail.trends[i].album.map(v => ({
      url: BASE_URI + v.thum_img_path,
    }));
    setCurrentIndex(index);
    setShowAlbum(true);
    setImgUrls(imgurl);
  };

  const scroll = ({nativeEvent}) => {
    // 1. `nativeEvent.contentSize.height`  列表内容的高度
    // 2. `nativeEvent.layoutMeasurement.height` 可视区域的高度
    // 3. `nativeEvent.contentOffset.y` 滚动条距离顶部的高度
    // 滚动条触底
    const isReachBottom =
      nativeEvent.contentSize.height -
        nativeEvent.layoutMeasurement.height -
        nativeEvent.contentOffset.y <
      10;
    const hasMore = page < totalPages;
    if (isReachBottom && hasMore && !isLoading) {
      setPage(page + 1);
      setIsLoading(true);
    }
  };
  return (
    <>
      <StatusBar translucent={true} backgroundColor="transparent" />
      {userDetail.silder ? (
        <ParallaxScrollView
          backgroundColor="#ffffff"
          parallaxHeaderHeight={pxToDp(220)}
          minHeight={pxToDp(40)}
          scrollEvent={scroll}
          renderForeground={() => (
            <Swiper>
              {userDetail.silder.map((v, i) => (
                <Box
                  key={i}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{uri: BASE_URI + v.thum_img_path}}
                    style={{width: '100%', height: pxToDp(220)}}
                  />
                </Box>
              ))}
            </Swiper>
          )}>
          <Box>
            {/*  用户信息sta*/}
            <Flex direction="row" style={{...baseStyle.infos}}>
              <Flex justifyContent="space-around">
                <Flex direction="row" alignItems="center">
                  <Text style={{...baseStyle.text}}>
                    {userDetail.nick_name}
                  </Text>
                  <IconFont
                    style={{
                      marginLeft: pxToDp(5),
                      marginRight: pxToDp(5),
                      fontSize: pxToDp(18),
                      color: userDetail.gender === '女' ? '#b564bf' : 'red',
                    }}
                    name={
                      userDetail.gender === '女'
                        ? 'icontanhuanv'
                        : 'icontanhuanan'
                    }
                  />
                  <Text style={{...baseStyle.text}}>{userDetail.age}岁</Text>
                </Flex>

                <Flex direction="row" alignItems="center">
                  <Text style={{...baseStyle.textinfos}}>
                    {userDetail.marry}
                  </Text>
                  <Text style={{...baseStyle.textinfos}}>|</Text>
                  <Text style={{...baseStyle.textinfos}}>
                    {userDetail.xueli}
                  </Text>
                  <Text style={{...baseStyle.textinfos}}>|</Text>
                  <Text style={{...baseStyle.textinfos}}>
                    {userDetail.agediff < 10 ? '年龄相仿' : '有点代沟'}
                  </Text>
                </Flex>
              </Flex>
              <Center>
                <Center style={{position: 'relative'}}>
                  <IconFont
                    name="iconxihuan"
                    style={{fontSize: pxToDp(50), color: 'red'}}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      color: '#fff',
                      fontSize: pxToDp(13),
                      fontWeight: 'bold',
                    }}>
                    {userDetail.fateValue}
                  </Text>
                </Center>
                <Text style={{color: 'red', fontSize: pxToDp(13)}}>缘分值</Text>
              </Center>
            </Flex>
            {/*  用户信息end*/}
            {/*动态sta */}
            <Box>
              {/* 标题sta */}
              <Flex
                justifyContent="space-between"
                direction="row"
                style={{...baseStyle.infos, padding: pxToDp(10)}}>
                <Center>
                  <Text style={{color: '#666'}}>动态</Text>
                  <Flex style={baseStyle.dt}>
                    <Text style={{color: '#fff'}}>{trends.length}</Text>
                  </Flex>
                </Center>
                <Flex direction="row">
                  <TouchableOpacity
                    style={{marginRight: pxToDp(8)}}
                    onPress={goChart}>
                    <LinearGradient
                      colors={['#f2ab5a', '#ec7c50']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={baseStyle.line}>
                      <IconFont style={{color: '#fff'}} name="iconliaotian" />
                      <Text style={{color: '#fff'}}>聊一下</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginRight: pxToDp(8)}}
                    onPress={sendLike}>
                    <LinearGradient
                      colors={['#6d47f8', '#e56b7f']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{
                        ...baseStyle.line,
                      }}>
                      <IconFont style={{color: '#fff'}} name="iconxihuan-o" />
                      <Text style={{color: '#fff'}}>喜欢</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </Flex>
              </Flex>
              {/* 标题end */}
              {/* 列表sta */}
              <Box>
                {trends.map((v, i) => (
                  <Flex key={i} style={baseStyle.list}>
                    {/* 用户信息·2sta */}
                    <Flex direction="row">
                      <Box style={{paddingRight: pxToDp(15)}}>
                        <Image
                          style={{
                            width: pxToDp(40),
                            height: pxToDp(40),
                            borderRadius: pxToDp(20),
                          }}
                          source={{uri: BASE_URI + userDetail.header}}
                        />
                      </Box>
                      <Box style={{flex: 2, justifyContent: 'space-around'}}>
                        <Box
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text style={{color: '#555'}}>
                            {userDetail.nick_name}
                          </Text>
                          <IconFont
                            style={{
                              marginLeft: pxToDp(5),
                              marginRight: pxToDp(5),
                              fontSize: pxToDp(18),
                              color:
                                userDetail.gender === '女' ? '#b564bf' : 'red',
                            }}
                            name={
                              userDetail.gender === '女'
                                ? 'icontanhuanv'
                                : 'icontanhuanan'
                            }
                          />
                          <Text style={{color: '#555'}}>
                            {userDetail.age}岁
                          </Text>
                        </Box>
                        <Box style={{flexDirection: 'row'}}>
                          <Text style={baseStyle.textinfos}>
                            {userDetail.marry}
                          </Text>
                          <Text style={baseStyle.textinfos}>|</Text>
                          <Text style={baseStyle.textinfos}>
                            {userDetail.xueli}
                          </Text>
                          <Text style={baseStyle.textinfos}>|</Text>
                          <Text style={baseStyle.textinfos}>
                            {userDetail.agediff < 10 ? '年龄相仿' : '有点代沟'}
                          </Text>
                        </Box>
                      </Box>
                    </Flex>
                    {/* 用户信息·2end */}
                    {/*动态内容sta */}
                    <Flex style={{marginTop: pxToDp(8)}}>
                      <Text style={{color: '#666'}}>{v.content}</Text>
                    </Flex>
                    {/* 动态内容 end */}
                    {/* 相册sta */}
                    <Flex style={baseStyle.ce} direction="row" flexWrap="wrap">
                      {v.album.map((el, ind) => (
                        <TouchableOpacity
                          key={ind}
                          onPress={() => handleShowAlbum(i, ind)}>
                          <Image
                            style={baseStyle.img}
                            source={{uri: BASE_URI + el.thum_img_path}}
                          />
                        </TouchableOpacity>
                      ))}
                    </Flex>
                    {/*相册end */}
                  </Flex>
                ))}
              </Box>
              {/* 列表end */}
              {page >= totalPages ? (
                <Center style={{height: pxToDp(80)}}>
                  <Text style={{color: '#666'}}>没有更多数据了</Text>
                </Center>
              ) : (
                <></>
              )}
            </Box>
            {/*动态end */}
            <Modal
              visible={showAlbum}
              transparent={true}
              statusBarTranslucent={true}
              onRequestClose={() => {
                setShowAlbum(false);
              }}>
              <ImageViewer
                onClick={() => setShowAlbum(false)}
                imageUrls={imgUrls}
                index={currentIndex}
              />
            </Modal>
          </Box>
        </ParallaxScrollView>
      ) : (
        <></>
      )}
    </>
  );
};
const baseStyle = StyleSheet.create({
  infos: {
    padding: pxToDp(5),
    borderBottomWidth: pxToDp(1),
    borderColor: '#ccc',
  },
  text: {
    color: '#555',
  },
  textinfos: {
    color: '#555',
    marginRight: pxToDp(5),
  },
  dt: {
    backgroundColor: 'red',
    width: pxToDp(16),
    height: pxToDp(16),
    borderRadius: pxToDp(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: pxToDp(5),
  },
  line: {
    width: pxToDp(100),
    height: pxToDp(30),
    borderRadius: pxToDp(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  list: {
    padding: pxToDp(10),
    borderBottomColor: '#ccc',
    borderBottomWidth: pxToDp(1),
  },
  ce: {
    paddingTop: pxToDp(5),
    paddingBottom: pxToDp(5),
  },
  img: {
    width: pxToDp(70),
    height: pxToDp(70),
    marginRight: pxToDp(5),
  },
});
export default Index;
