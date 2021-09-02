/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Flex, Box, Image, Text, useToast} from 'native-base';
import {ImageBackground, TouchableOpacity, Modal} from 'react-native';
import pxToDp from '../../../utils/PixelRatio';
import {FRIENDS_PERSONALINFO, BASE_URI} from '../../../api/pathMap';
import {get} from '../../../api';
import IconFont from '../../../public/IconFont';
import {useSelector} from 'react-redux';
import Swiper from 'react-native-swiper';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ImageViewer from 'react-native-image-zoom-viewer';
const Index = ({navigation, route}) => {
  const Toast = useToast();
  const {id} = route.params;
  const pagesize = 10;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [userDetail, setUserDetail] = useState({});
  // 当前用户的动态数组
  const [trends, setTrends] = useState([]);

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
    }
    getDataList();
  }, [page, pagesize, id]);
  return (
    <Flex>
      {userDetail.silder ? (
        <Flex>
          <ParallaxScrollView
            backgroundColor="blue"
            contentBackgroundColor="pink"
            parallaxHeaderHeight={300}
            renderForeground={() => (
              <Box
                style={{
                  height: 300,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>Hello World!</Text>
              </Box>
            )}>
            <Box style={{height: 500}}>
              <Text>Scroll me</Text>
            </Box>
          </ParallaxScrollView>
        </Flex>
      ) : (
        <></>
      )}
      <Text>想</Text>
    </Flex>
  );
};

export default Index;
