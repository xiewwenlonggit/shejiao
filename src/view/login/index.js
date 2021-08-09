import React, { useState, useMemo } from 'react';
import { Text, View, StatusBar, Image, StyleSheet } from 'react-native';
import { useToast } from 'native-base';
import pxToDp from '../../utils/PixelRatio';
import { Input } from 'react-native-elements';
import THButton from '../../public/THButton';
import validator from '../../utils/validator'
import { post } from '../../api'
import { ACCOUNT_VALIDATEVCODE, ACCOUNT_LOGIN } from "../../api/pathMap";
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/actions/user';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';
// 手机号码输入
const RenLogin = (props) => {
  const { phoneNumber, phoneValid, setPhoneNumber, setPhonerVaild, setShowLogin, countDown, setBtnText
  } = props;
  // 设置电话号码
  const phoneChangeText = (value) => {
    setPhoneNumber(value)
  };
  // 输入完成后提交
  const phoneNumberSubmitEditing = async () => {
    const phoneValidator = validator.validatePhone(phoneNumber);

    // 校验手机号码是否合法
    if (!phoneValidator) {
      // 没通过展示错误信息
      setPhonerVaild(phoneValidator)
      return;
    }
    const res = await post(ACCOUNT_LOGIN, {
      phone: phoneNumber
    })
    if (res.code === '10000') {
      setShowLogin(false);
      setBtnText("确定");
      countDown()
    }
  }


  return (
    <View >
      <Text style={{ fontSize: pxToDp(25), color: '#888', fontWeight: 'bold' }}>
        手机号登录注册
      </Text>
      <View style={{ marginTop: pxToDp(25) }}>
        <Input
          placeholder="请输入手机号码"
          maxLength={11}
          keyboardType="phone-pad"
          value={phoneNumber}
          inputStyle={{ color: '#333' }}
          onChangeText={phoneChangeText}
          errorMessage={phoneValid ? "" : '手机号码不正确'}
          onSubmitEditing={phoneNumberSubmitEditing}
          leftIcon={{ type: 'font-awesome', name: 'phone', color: "#ccc", size: pxToDp(20) }}
        />
      </View>
      {/* 渐变按钮  */}
      <View>
        <THButton onPress={phoneNumberSubmitEditing} style={{ width: "85%", alignSelf: "center", height: pxToDp(40), borderRadius: pxToDp(20) }}>获取验证码</THButton>
      </View>
    </View>
  )
}



/**
 * 
 * 
 * 
 * 
 * 
 * 
 * **手机验证码输入页面
 * 
 * 
 * 
 * ******* */
// 获取验证码
const RenCode = (props) => {
  const dispatch = useDispatch();
  const Toast = useToast()
  const { vcodeTxt, setVcodeTxt, btnText, isCountDowning, phoneNumber, countDown, navigation } = props;
  // 输入验证码
  const onVcodeChangeText = (val) => {
    setVcodeTxt(val)
  }
  // 提交验证码
  const onVcodeSubmitEditing = async () => {
    if (vcodeTxt.length != 6) {
      Toast.show({ title: "验证码不正确" });
      return;
    }
    const res = await post(ACCOUNT_VALIDATEVCODE, {
      phone: phoneNumber,
      vcode: vcodeTxt
    })
    if (res.code !== '10000') {
      return;
    }
    countDown();
    const { token, id, isNew } = res.data;
    dispatch(setUserInfo({
      phoneNumber,
      token,
      id
    }))
    // 如果是新用户跳转修改信息页面
    if (isNew) {
      navigation.navigate("UserInfo");
    }

  }

  return (
    <View>
      {/*  */}
      <View>
        <Text style={{ fontSize: pxToDp(25), color: "#888", fontWeight: "bold" }}>
          输入验证码
        </Text>
      </View>
      {/* 号码 */}
      <View style={{ marginTop: pxToDp(10) }}>
        <Text>
          已发送：+86{phoneNumber}
        </Text>
      </View>
      {/* 验证码 */}
      <View>
        <CodeField
          value={vcodeTxt}
          onChangeText={onVcodeChangeText}
          onSubmitEditing={onVcodeSubmitEditing}
          cellCount={6}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          renderCell={({ index, symbol, isFocused }) => (
            <Text key={index} style={[styles.cell, isFocused && styles.focusCell]} >{symbol || (isFocused ? <Cursor /> : null)}</Text>
          )}
        />
        {/* 底部按钮 */}
        <View style={{ marginTop: pxToDp(10) }}>
          <THButton disabled={isCountDowning} onPress={onVcodeSubmitEditing} style={{ width: "85%", alignSelf: "center", height: pxToDp(40), borderRadius: pxToDp(20) }}>{btnText}
          </THButton>
        </View>
      </View>
    </View>
  )
}



const Login = (props) => {
  // 手机号码 
  const [phoneNumber1, setPhoneNumber] = useState('');
  //电话号码合法性
  const [phoneValid1, setPhonerVaild] = useState(true);
  // 是否显示登录页面 
  const [showLogin1, setShowLogin] = useState(true);
  // 验证码输入框的值
  const [vcodeTxt1, setVcodeTxt] = useState("");
  // 倒计时按钮的文本
  const [btnText1, setBtnText] = useState("获取验证码")
  // 是否在倒计时中
  const [isCountDowning1, setIsCountDowning] = useState(false)


  const phoneNumber = useMemo(() => phoneNumber1, [phoneNumber1]);
  const phoneValid = useMemo(() => phoneValid1, [phoneValid1]);
  const showLogin = useMemo(() => showLogin1, [showLogin1]);
  const vcodeTxt = useMemo(() => vcodeTxt1, [vcodeTxt1]);
  const btnText = useMemo(() => btnText1, [btnText1]);
  const isCountDowning = useMemo(() => isCountDowning1, [isCountDowning1]);




  // 开启获取验证码的定时器
  const countDown = () => {
    if (isCountDowning) {
      return;
    }

    setIsCountDowning(true);
    let seconds = 5;
    // 重新获取(5s)
    setBtnText(`重新获取(${seconds}s)`)
    let timeId = setInterval(() => {
      seconds--;
      setBtnText(`重新获取(${seconds}s)`)
      if (seconds === 0) {
        clearInterval(timeId);
        setBtnText(`重新获取`);
        setIsCountDowning(false);
      }
    }, 1000);
  }





  return (
    <View>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Image
        style={{
          width: "100%",
          height: pxToDp(220),
        }}
        source={
          require("../../res/profileBackground.jpg")
        }
      />
      <View style={{ padding: pxToDp(20) }}>
        {
          showLogin ? <RenLogin setPhoneNumber={setPhoneNumber}
            setPhonerVaild={setPhonerVaild}
            setShowLogin={setShowLogin}
            phoneNumber={phoneNumber}
            showLogin={showLogin}
            phoneValid={phoneValid}
            isCountDowning={isCountDowning}
            setIsCountDowning={setIsCountDowning}
            countDown={countDown}
            setBtnText={setBtnText}
          /> : <RenCode
            setVcodeTxt={setVcodeTxt}
            setBtnText={setBtnText}
            vcodeTxt={vcodeTxt}
            btnText={btnText}
            isCountDowning={isCountDowning}
            setIsCountDowning={setIsCountDowning}
            phoneNumber={phoneNumber}
            countDown={countDown}
            navigation={props.navigation}
          />
        }
      </View>
    </View >
  );
};
const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFiledRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    color: "#7d53ea"
  },
  focusCell: {
    borderColor: '#7d53ea'
  },
});
export default Login;
