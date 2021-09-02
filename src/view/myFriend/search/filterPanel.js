/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Flex, Text, Box} from 'native-base';
import {TouchableOpacity} from 'react-native';
import IconFont from '../../../public/IconFont';
import SvgUri from 'react-native-svg-uri';
import {male, female} from '../../../res/fonts/iconSvg';
import {Slider} from 'react-native-elements/dist/slider/Slider';
import THButton from '../../../public/THButton';
import pxToDp from '../../../utils/PixelRatio';
const Index = props => {
  const [gender, setGender] = useState('男');
  const [distance, setDistance] = useState(10000);
  //   提交过滤体条件
  const handleSubmitFilter = () => {
    props.onSubmitFilter({gender, distance});
    props.onClose();
  };
  return (
    <Box>
      {/* 标题 sta */}
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        style={{
          height: pxToDp(50),
        }}>
        <Text />
        <Text style={{color: '#999', fontSize: pxToDp(28), fontWeight: 'bold'}}>
          筛选
        </Text>
        <IconFont style={{fontSize: pxToDp(30)}} name="iconshibai" />
      </Flex>
      {/* 标题 end */}
      {/* 性别sta */}
      <Flex direction="row" alignItems="center" style={{marginTop: pxToDp(10)}}>
        <Text style={{color: '#777', fontSize: pxToDp(18), width: pxToDp(80)}}>
          性别：
        </Text>
        {/* 性别 图标 开始 */}
        <Flex
          style={{
            justifyContent: 'space-around',
            width: '50%',
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setGender('男')}
            style={{
              width: pxToDp(60),
              height: pxToDp(60),
              borderRadius: pxToDp(30),
              backgroundColor: gender === '男' ? 'red' : '#eee',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SvgUri svgXmlData={male} width="36" height="36" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGender('女')}
            style={{
              width: pxToDp(60),
              height: pxToDp(60),
              borderRadius: pxToDp(30),
              backgroundColor: gender === '女' ? 'red' : '#eee',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SvgUri svgXmlData={female} width="36" height="36" />
          </TouchableOpacity>
        </Flex>
      </Flex>
      {/* 性别end */}
      {/* 距离 sta */}
      <Flex style={{marginTop: pxToDp(10)}}>
        <Text style={{color: '#777', fontSize: pxToDp(18)}}>
          距离:{distance || 0} M
        </Text>
        <Slider
          value={distance}
          minimumValue={0}
          maximumValue={100000}
          step={1}
          onValueChange={setDistance}
        />
      </Flex>
      {/* 4.0 距离 结束 */}
      <THButton
        onPress={handleSubmitFilter}
        style={{width: '100%', height: pxToDp(40), marginTop: pxToDp(10)}}>
        确认
      </THButton>
      {/* 距离 end */}
    </Box>
  );
};

export default Index;
