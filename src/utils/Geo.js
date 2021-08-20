import React from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {init} from 'react-native-amap-geolocation';
import geolocation from '@react-native-community/geolocation';

import axios from 'axios';
const useGeo = () => {
  const initGeo = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await init({
          android: 'ff7505ca2b75c3d7ff0c418a66e72eaf',
          // ios: 'cc7d3bdcc6c391887c985616b8fef6d8',
        });
        return Promise.resolve();
      }
    }
  };
  const GetCurrentPosition = async () => {
    return new Promise((resolve, reject) => {
      geolocation.getCurrentPosition(({coords}) => {
        resolve(coords);
      }, reject);
    });
  };
  const getCityByLocation = async () => {
    const {longitude, latitude} = await GetCurrentPosition();
    const res = await axios.get('https://restapi.amap.com/v3/geocode/regeo', {
      // key  高德地图中第一个应用的key
      params: {
        location: `${longitude},${latitude}`,
        key: 'ac2c9c2f38e6d4df59ac5e4566720775',
      },
    });
    let result = res.data || res;
    return Promise.resolve(result);
  };
  return {initGeo, GetCurrentPosition, getCityByLocation};
};

export default useGeo();
