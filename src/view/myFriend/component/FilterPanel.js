/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Flex} from 'native-base';
import pxToDp from '../../../utils/PixelRatio';
import {TouchableOpacity} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {male, female} from '../../../res/fonts/iconSvg';
import IconFont from '../../../public/IconFont';
import Picker from 'react-native-picker';
import {Slider} from 'react-native-elements';
import CityJson from '../../../res/citys.json';
import THButton from '../../../public/THButton';
const FilterPanel = props => {
  const [gender, setGender] = useState('');
  const [lastLogin, setLastLogin] = useState('15分钟');
  // 选择最近登陆时间
  const chooseLastLogin = () => {
    Picker.init({
      pickerData: ['15分钟', '1天', '1小时', '不限制'],
      selectedValue: [lastLogin],
      wheelFlex: [1, 0, 0], // 显示省和市
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择近期登录时间',
      onPickerConfirm: data => {
        setLastLogin(data[0]);
      },
    });
    Picker.show();
  };
  const [distance, setDistance] = useState(0);
  // 选择城市
  const [city, setCity] = useState('');
  const onChooseCity = () => {
    Picker.init({
      pickerData: CityJson,
      selectedValue: ['北京', '北京'],
      wheelFlex: [1, 1, 0], // 显示省和市
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择城市',
      onPickerConfirm: data => {
        // data =  [广东，广州，天河]
        setCity(data[1]);
      },
    });
    Picker.show();
  };
  // 选择学历
  const [education, setEducation] = useState('其他');
  const handSubmit = () => {
    props.onClose();
    props.onSubmitFilter({
      gender,
      lastLogin,
      distance,
      city,
      education,
    });
  };
  const onChooseEducation = () => {
    Picker.init({
      pickerData: [
        '博士后',
        '博士',
        '硕士',
        '本科',
        '大专',
        '高中',
        '留学',
        '其他',
      ],
      selectedValue: ['其他'],
      wheelFlex: [1, 0, 0], // 显示省和市
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择城市',
      onPickerConfirm: data => {
        // data =  [广东，广州，天河]
        setEducation(data[0]);
      },
    });
    Picker.show();
  };
  return (
    <View>
      {/* 标题 */}
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        height={pxToDp(40)}>
        <Text />
        <Text
          style={{
            color: '#999',
            fontSize: pxToDp(28),
            fontWeight: 'bold',
          }}>
          筛选
        </Text>
        <IconFont
          onPress={props.onClose}
          style={{fontSize: pxToDp(30)}}
          name="iconshibai"
        />
      </Flex>
      <Flex flexDirection="row" alignItems="center" marginTop={pxToDp(10)}>
        <Text
          style={{
            color: '#999',
            fontSize: pxToDp(28),
            fontWeight: 'bold',
          }}>
          性别：
        </Text>
        {/* 性别图标sta */}
        <Flex
          justifyContent="space-around"
          width="50%"
          flexDirection="row"
          alignSelf="center">
          <TouchableOpacity
            onPress={() => setGender('男')}
            style={{
              ...Styles.selectGender,
              backgroundColor: gender === '男' ? 'red' : '#eee',
            }}>
            <SvgUri svgXmlData={male} width="36" height="36" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...Styles.selectGender,
              backgroundColor: gender === '女' ? 'red' : '#eee',
            }}
            onPress={() => setGender('女')}>
            <SvgUri svgXmlData={female} width="36" height="36" />
          </TouchableOpacity>
        </Flex>
      </Flex>
      {/* 性别图标end */}
      {/* 近期登录时间sta */}
      <Flex flexDirection="row" alignItems="center" marginTop={pxToDp(10)}>
        <Text style={Styles.title}>近期登陆时间:</Text>
        <Text onPress={chooseLastLogin} style={Styles.content}>
          {lastLogin || '请选择'}
        </Text>
      </Flex>
      {/* 近期登录时间end */}
      {/* 距离sta */}
      <Flex marginTop={pxToDp(10)}>
        <Text
          style={{
            color: '#777',
            fontSize: pxToDp(18),
          }}>
          距离：{distance || 0}KM
        </Text>

        <Slider
          value={distance}
          minimumValue={0}
          maximumValue={10}
          step={0.5}
          onValueChange={setDistance}
        />
      </Flex>
      {/* 距离end */}
      {/* 居住地 sta */}
      <Flex flexDirection="row" alignItems="center" marginTop={pxToDp(10)}>
        <Text style={Styles.title}>居住地：</Text>
        <Text onPress={onChooseCity} style={Styles.content}>
          {city || '请选择'}
        </Text>
      </Flex>
      {/* 居住地 end */}
      {/* 学历 sta */}
      <Flex flexDirection="row" alignItems="center" marginTop={pxToDp(10)}>
        <Text style={Styles.title}>学历：</Text>
        <Text onPress={onChooseEducation} style={Styles.content}>
          {education || '请选择'}
        </Text>
      </Flex>
      {/* 学历 end */}
      {/* 确认sta */}
      <THButton
        style={{height: pxToDp(40), width: '100%', marginTop: pxToDp(10)}}
        onPress={handSubmit}>
        确认
      </THButton>
      {/* 确认end */}
    </View>
  );
};
const Styles = StyleSheet.create({
  selectGender: {
    width: pxToDp(60),
    height: pxToDp(60),
    borderRadius: pxToDp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#777',
    fontSize: pxToDp(18),
    width: pxToDp(100),
  },
  content: {
    color: '#777',
    fontSize: pxToDp(18),
  },
});
export default FilterPanel;
