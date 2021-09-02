/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Flex, Text, Image, Box} from 'native-base';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {get, post} from '../../../api';
import {
  BASE_URI,
  FRIENDS_QUESTIONSECTION,
  FRIENDS_QUESTIONANS,
} from '../../../api/pathMap';
import pxToDp from '../../../utils/PixelRatio';
import Nav from '../../../public/Nav';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
const Index = ({navigation, route}) => {
  const user = useSelector(state => state.customer);
  const titles = {
    初级: require('../../../res/leve1.png'),
    中级: require('../../../res/leve2.png'),
    高级: require('../../../res/leve3.png'),
  };
  const [queryList, setqueryList] = useState([]);
  useEffect(() => {
    async function getInfos() {
      const url = FRIENDS_QUESTIONSECTION.replace(':id', route.params.qid);
      const res = await get(url);
      setqueryList(res.data);
    }
    getInfos();
  }, []);
  const routeData = route.params;
  const [ansList, setansList] = useState([]);
  const [currentIndex, setcurrentIndex] = useState(0);
  const chooseAns = async val => {
    setansList([...val]);
    if (currentIndex >= queryList.length - 1) {
      const url = FRIENDS_QUESTIONANS.replace(':id', route.params.qid);
      const answers = ansList.join(',');
      const res = await post(url, {answers});
      navigation.navigate('TestResult', res.data);
    } else {
      setcurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      {queryList[currentIndex] ? (
        <Flex style={{flex: 1, backgroundColor: '#fff'}}>
          <Nav title={routeData.title} />
          {/* 两侧sta */}
          <ImageBackground
            source={require('../../../res/qabg.png')}
            style={baseStyles.imgBg}>
            <Flex
              direction="row"
              justifyContent="space-between"
              style={{marginTop: pxToDp(60)}}>
              <ImageBackground
                style={baseStyles.contBg}
                source={require('../../../res/qatext.png')}>
                <Image
                  source={{uri: BASE_URI + user.header}}
                  style={{
                    width: pxToDp(50),
                    height: pxToDp(50),
                    borderRadius: pxToDp(25),
                  }}
                />
              </ImageBackground>
              <ImageBackground
                style={baseStyles.rightBg}
                source={titles[routeData.type]}
              />
            </Flex>
          </ImageBackground>
          {/* 两侧end */}
          {/* 测试题sta */}
          <Flex
            alignSelf="center"
            alignItems="center"
            style={{position: 'absolute', width: '80%', top: pxToDp(60)}}>
            <Box>
              <Text style={baseStyles.titleNo}>第{currentIndex + 1}题</Text>
              <Text style={baseStyles.titleCount}>
                ({currentIndex + 1}/{queryList.length})
              </Text>
              <Text style={baseStyles.title}>
                {queryList[currentIndex].question_title}
              </Text>
            </Box>

            {/* 答案sta */}
            <Box style={{width: '100%'}}>
              {queryList[currentIndex].answers.map((v, i) => (
                <TouchableOpacity
                  style={{marginTop: pxToDp(10)}}
                  key={i}
                  onPress={() => chooseAns(v.ans_No)}>
                  <LinearGradient
                    style={{
                      height: pxToDp(40),
                      borderRadius: pxToDp(6),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    colors={['#6f45f3', '#6f45f31a']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Text style={{color: '#fff'}}>{v.ans_title}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </Box>
            {/* 答案end */}
          </Flex>
          {/* 测试题end */}
        </Flex>
      ) : null}
    </>
  );
};
const baseStyles = StyleSheet.create({
  imgBg: {
    width: '100%',
    height: '100%',
  },
  bg: {
    width: pxToDp(66),
    height: pxToDp(52),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  contBg: {
    width: pxToDp(66),
    height: pxToDp(52),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rightBg: {
    width: pxToDp(66),
    height: pxToDp(52),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  titleNo: {
    color: '#fff',
    fontSize: pxToDp(26),
    fontWeight: 'bold',
  },
  titleCount: {
    color: '#ffffff9a',
    textAlign: 'center',
  },
  title: {
    marginTop: pxToDp(30),
    fontSize: pxToDp(14),
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default Index;
