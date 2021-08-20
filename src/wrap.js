/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {useToast, Flex} from 'native-base';
import {ActivityIndicator, View} from 'react-native';
import {getLocalStorage} from './utils';
import {setUserInfo} from './redux/actions/user';
import {useDispatch} from 'react-redux';
import JMessage from './utils/JMessage';
const UseWrap = props => {
  const dispatch = useDispatch();
  const Toast = useToast();
  const storeInfos = useSelector(state => state.loading);
  const toastId = useRef();
  useEffect(() => {
    if (storeInfos) {
      toastId.current = Toast.show({
        render: () => {
          return (
            <Flex
              flex={1}
              justify="center"
              align="center"
              style={{backgroundColor: '#000'}}
              w={20}
              h={20}>
              <ActivityIndicator size="large" color="white" />
            </Flex>
          );
        },
        placement: 'top',
        duration: 30000,
      });
    } else {
      Toast.close(toastId.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeInfos]);
  useEffect(() => {
    async function getData() {
      const userInfo = (await getLocalStorage('userInfo', true)) || {};
      if (userInfo.token) {
        dispatch(setUserInfo({...userInfo}));
        JMessage.init();
      }
    }
    getData();
  });
  return <View style={{flex: 1}}>{props.children}</View>;
};
export default UseWrap;
