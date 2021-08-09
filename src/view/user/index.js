// 用户注册
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Input } from 'native-base';
import pxToDp from '../../utils/PixelRatio'
import SvgUrl from 'react-native-svg-uri';
import { male, female } from "../../res/fonts/iconSvg";
import moment from 'moment';
import DatePicker from "react-native-datepicker";
const USer = () => {
    const currentDate = moment(new Date()).format("YYYY-MM-DD")
    const [gender, setGender] = useState('男');
    const chooseGender = (el) => {
        setGender(el)
    }
    const [nickName, setNickName] = useState("");
    const [birthday, setBirthday] = useState("");
    changeDate = (e) => {
        setBirthday(e)
    }
    return (<View style={{ backgroundColor: "#fff", flex: 1, padding: pxToDp(20) }}>
        {/* 标题sta */}
        <Text style={styles.title}>
            填写资料
        </Text>
        <Text style={styles.title}>
            提升我的魅力
        </Text>
        {/* 标题end */}

        {/* 性别sta */}
        <View style={{ marginTop: pxToDp(20) }}>
            <View style={styles.gender}>
                <TouchableOpacity onPress={() => chooseGender('男')}
                    style={{
                        width: pxToDp(60),
                        height: pxToDp(60),
                        borderRadius: pxToDp(30),
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: gender === '男' ? "red" : "#eee"
                    }}
                >
                    <SvgUrl svgXmlData={male}
                        width="36" height='36' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => chooseGender('女')}
                    style={{
                        width: pxToDp(60),
                        height: pxToDp(60),
                        borderRadius: pxToDp(30),
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: gender === '女' ? "red" : "#eee"
                    }}
                >
                    <SvgUrl svgXmlData={female}
                        width="36" height='36' />
                </TouchableOpacity>

            </View>

        </View>
        {/* 性别end */}
        {/* 昵称sta */}
        <View>
            <Input value={nickName}
                placeholder="设置昵称"
                onChangeText={(nickName) => setNickName(nickName)}
            >
            </Input>
        </View>
        {/* 昵称end */}
        {/* 出生日期选择sta */}

        <View>
            <DatePicker
                androidMode="spinner"
                style={{ width: "100%" }}
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
                        display: "none"
                    },
                    dateInput: {
                        marginLeft: pxToDp(10),
                        borderWidth: 0,
                        borderBottomWidth: pxToDp(1.1),
                        alignItems: "flex-start",
                        paddingLeft: pxToDp(4)
                    },
                    placeholderText: {
                        fontSize: pxToDp(18),
                        color: "#afafaf"
                    }

                }}
                onDateChange={changeDate}
            />
        </View>
        {/* 出生日期选择end */}
    </View >)
};
const styles = StyleSheet.create({
    title: {
        fontSize: pxToDp(20),
        fontWeight: "bold",
        color: "#666"
    },
    gender: {
        justifyContent: "space-around",
        width: "60%",
        flexDirection: "row",
        alignSelf: "center"

    }
})
export default USer;

