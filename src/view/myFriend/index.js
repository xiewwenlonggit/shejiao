/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {ImageHeaderScrollView} from 'react-native-image-header-scroll-view';
import pxToDp from '../../utils/PixelRatio';
import FriendHead from './component/FrientHead';
const MyFriend = () => {
  return (
    <View>
      <ImageHeaderScrollView
        maxHeight={pxToDp(130)}
        minHeight={pxToDp(44)}
        headerImage={require('../../res/headfriend.png')}
        renderForeground={() => (
          <View
            style={{
              height: pxToDp(130),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FriendHead />
          </View>
        )}>
        <View>
          <Text>交友2</Text>
        </View>
      </ImageHeaderScrollView>
    </View>
  );
};

export default MyFriend;
