/* eslint-disable react-native/no-inline-styles */
// 用户注册
import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import {Input, useToast} from 'native-base';
import {Overlay} from 'react-native-elements';
import pxToDp from '../../utils/PixelRatio';
import SvgUrl from 'react-native-svg-uri';
import {male, female} from '../../res/fonts/iconSvg';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import THButton from '../../public/THButton';
import Picker from 'react-native-picker';
import CityJson from '../../res/citys.json';
import Geo from '../../utils/Geo';
import ImagePicker from 'react-native-image-crop-picker';
import {post} from '../../api';
import {useSelector} from 'react-redux';
import {ACCOUNT_CHECKHEADIMAGE, ACCOUNT_REGINFO} from '../../api/pathMap';
import JMessage from '../../utils/JMessage';
const USer = props => {
  const Toast = useToast();
  const currentDate = moment(new Date()).format('YYYY-MM-DD');
  // 获取redux的值
  const reduxData = useSelector(state => {
    return state;
  });
  const [gender, setGender] = useState('男');
  const chooseGender = el => {
    setGender(el);
  };
  const [nickName, setNickName] = useState('');
  const [birthday, setBirthday] = useState('');
  const changeDate = e => {
    setBirthday(e);
  };
  // 城市
  const [city, setCity] = useState('');
  const [lng, setLng] = useState('');
  const [lat, setLat] = useState('');
  const [address, setAddress] = useState('');
  useEffect(() => {
    async function getLocation() {
      Toast.show({title: '获取地理位置'});
      const res = await Geo.getCityByLocation();
      console.log('res', res);
      const address1 = res.regeocode.formatted_address;
      const city1 = res.regeocode.addressComponent.district;
      const lng1 =
        res.regeocode.addressComponent.streetNumber.location.split(',')[0];
      const lat1 =
        res.regeocode.addressComponent.streetNumber.location.split(',')[1];
      setCity(city1);
      setAddress(address1);
      setLat(lat1);
      setLng(lng1);
    }
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 城市选择
  const showCityPicker = () => {
    Picker.init({
      pickerData: CityJson,
      // 默认选择哪个数据
      selectedValue: ['北京', '北京'],
      wheelFlex: [1, 1, 0], // 显示省和市
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择城市',
      onPickerConfirm: data => {
        setCity(data[1]);
      },
    });
    Picker.show();
  };
  // 头像选择
  const [isvisiable, setIsvisiable] = useState(false);
  const [image, setImage] = useState({});
  const chooseHeadImg = async () => {
    if (!nickName || !birthday || !city) {
      Toast.show({
        title: '警告',
        status: 'error',
        description: '昵称或者生日或者城市不合法',
      });
      return;
    }
    const res = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    });
    setImage(res);
    setIsvisiable(true);
    const res0 = await uploadHeadImg(res);
    if (res0.code !== '10000') {
      return Toast.show({title: '上传头像失败'});
    }
    const header = res0.data.headImgPath;
    const params = {
      nickName,
      gender,
      birthday,
      city,
      lng,
      lat,
      address,
      header,
    };
    const res1 = await post(ACCOUNT_REGINFO, params);
    if (res1.code !== '10000') {
      return Toast.show({title: '完善个人信息失败'});
    }
    const {
      user: {id, phoneNumber},
    } = reduxData;
    await jgBusiness(id, phoneNumber);
    setIsvisiable(false);
    Toast.show({
      description: '恭喜操作成功！',
      status: 'success',
      duration: 2000,
    });
    setTimeout(() => {
      props.navigation.reset({
        routes: [{name: 'Home'}],
      });
      // 准备跳转
    }, 2000);
  };
  const uploadHeadImg = img => {
    let formData = new FormData();
    formData.append('headPhoto', {
      // 本地图片的地址
      uri: img.path,
      // 图片的类型
      type: img.mime,
      // 图片的名称 file:///store/com/pic/dsf/d343.jpg
      name: img.path.split('/').pop(),
    });
    const result = post(ACCOUNT_CHECKHEADIMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return result;
  };
  // 执行极光注册
  const jgBusiness = (username, password) => {
    // 在 App 里面 进行极光的初始化
    return JMessage.register(username, password);
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1, padding: pxToDp(20)}}>
      {/* 标题sta */}
      <Text style={styles.title}>填写资料</Text>
      <Text style={styles.title}>提升我的魅力</Text>
      {/* 标题end */}
      {/* 性别sta */}
      <View style={{marginTop: pxToDp(20)}}>
        <View style={styles.gender}>
          <TouchableOpacity
            onPress={() => chooseGender('男')}
            style={{
              width: pxToDp(60),
              height: pxToDp(60),
              borderRadius: pxToDp(30),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: gender === '男' ? 'red' : '#eee',
            }}>
            <SvgUrl svgXmlData={male} width="36" height="36" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => chooseGender('女')}
            style={{
              width: pxToDp(60),
              height: pxToDp(60),
              borderRadius: pxToDp(30),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: gender === '女' ? 'red' : '#eee',
            }}>
            <SvgUrl svgXmlData={female} width="36" height="36" />
          </TouchableOpacity>
        </View>
      </View>
      {/* 性别end */}
      {/* 昵称sta */}
      <View>
        <Input
          value={nickName}
          placeholder="设置昵称"
          // eslint-disable-next-line no-shadow
          onChangeText={nickName => setNickName(nickName)}
        />
      </View>
      {/* 昵称end */}
      {/* 出生日期选择sta */}
      <View>
        <DatePicker
          androidMode="spinner"
          style={{width: '100%'}}
          date={birthday}
          mode="date"
          placeholder="设置生日"
          format="YYYY-MM-DD"
          minDate="1900-01-01"
          maxDate={currentDate}
          confirmBtnText="确定"
          cancelBtnText="取消"
          customStyles={{
            dateIcon: {
              display: 'none',
            },
            dateInput: {
              marginLeft: pxToDp(10),
              borderWidth: 0,
              borderBottomWidth: pxToDp(1.1),
              alignItems: 'flex-start',
              paddingLeft: pxToDp(4),
            },
            placeholderText: {
              fontSize: pxToDp(18),
              color: '#afafaf',
            },
          }}
          onDateChange={changeDate}
        />
      </View>
      {/* 出生日期选择end */}
      <View style={{marginTop: pxToDp(20)}}>
        <TouchableOpacity onPress={showCityPicker}>
          <Input
            value={'当前定位：' + city}
            style={{color: '#666'}}
            isDisabled={true}
          />
        </TouchableOpacity>
      </View>
      {/* 选择头像sta */}
      <View style={{marginTop: pxToDp(20)}}>
        <THButton
          onPress={chooseHeadImg}
          style={{
            height: pxToDp(40),
            borderRadius: pxToDp(20),
            alignSelf: 'center',
          }}
          children="设置头像"
        />
      </View>
      {/* 选择头像end */}
      <Overlay isVisible={isvisiable}>
        <View
          style={{
            marginTop: pxToDp(30),
            alignSelf: 'center',
            width: pxToDp(334),
            height: pxToDp(334),
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 100,
            }}
            source={require('../../res/scan.gif')}
          />
          {image.path ? (
            <Image
              source={{uri: image.path}}
              style={{width: '60%', height: '60%'}}
            />
          ) : (
            <></>
          )}
        </View>
      </Overlay>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: pxToDp(20),
    fontWeight: 'bold',
    color: '#666',
  },
  gender: {
    justifyContent: 'space-around',
    width: '60%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
export default USer;
