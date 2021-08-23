/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Flex} from 'native-base';
import {View} from 'react-native';
import {BASE_URI, FRIENDS_TODAYBEST} from '../../../api/pathMap';
// import IconFont from '../../../public/IconFont';
import {get} from '../../../api';
export default function PerfectGirl() {
  const [infos, setInfos] = useState({});
  useEffect(() => {
    async function getInfos() {
      const res = await get(FRIENDS_TODAYBEST);
      setInfos(res.data[0]);
    }
    getInfos();
  }, []);
  return <Flex flexDirection="row" />;
}
