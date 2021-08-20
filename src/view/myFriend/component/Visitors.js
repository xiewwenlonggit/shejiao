/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import pxToDp from '../../../utils/PixelRatio';
import {get} from '../../../api';
import {FRIENDS_VISITORS, BASE_URI} from '../../../api/pathMap';
const Visitors = () => {
  const [visitors, setVisitors] = useState([]);
  useEffect(() => {
    async function getInfos() {
      const res = await get(FRIENDS_VISITORS);
      setVisitors([...res.data]);
    }
    getInfos();
  }, []);
  return (
    <View style={styles.main}>
      <Text styles={styles.title}>
        最近有{visitors.length}人来访，快去查看....
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        {visitors.map((v, i) => (
          <Image
            key={i}
            style={{
              width: pxToDp(30),
              height: pxToDp(30),
              borderRadius: pxToDp(15),
            }}
            source={{uri: BASE_URI + v.header}}
          />
        ))}
        <Text style={{fontSize: pxToDp(20), color: '#777'}}>&gt;</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    paddingLeft: pxToDp(5),
    paddingRight: pxToDp(5),
    flexDirection: 'row',
    marginTop: pxToDp(20),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    color: '#777777',
    fontSize: pxToDp(15),
  },
});
export default Visitors;
