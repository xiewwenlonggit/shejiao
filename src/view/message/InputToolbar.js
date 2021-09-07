/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {InputToolbar, Actions, Composer, Send} from 'react-native-gifted-chat';
import SvgUri from 'react-native-svg-uri';
import {jia} from '../../res/fonts/iconSvg';
export const renderInputToolbar = props => (
  <InputToolbar
    {...props}
    containerStyle={{
      paddingLeft: 20,
      paddingBottom: 6,
      backgroundColor: '#222B45',
      paddingTop: 6,
    }}
    primaryStyle={{alignItems: 'center'}}
  />
);

export const renderActions = props => (
  <Actions
    {...props}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 0,
    }}
    icon={() => (
      <Image
        style={{width: 32, height: 32}}
        source={{
          uri: 'https://placeimg.com/32/32/any',
        }}
      />
    )}
    options={{
      'Choose From Library': () => {
        console.log('Choose From Library');
      },
      Cancel: () => {
        console.log('Cancel');
      },
    }}
    optionTintColor="#222B45"
  />
);

export const renderComposer = props => (
  <Composer
    {...props}
    placeholder=""
    textInputStyle={{
      color: '#222B45',
      backgroundColor: '#EDF1F7',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#E4E9F2',
      paddingTop: 8.5,
      paddingHorizontal: 12,
      marginLeft: 0,
    }}
  />
);

export const renderSend = props => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
    }}>
    <TouchableOpacity onPress={() => props.setIsVisitor(!props.isVisitor)}>
      <SvgUri svgXmlData={jia} width="28" height="28" fill="#fff" />
    </TouchableOpacity>

    {/* <Image
      style={{width: 32, height: 32}}
      source={{
        uri: 'https://placeimg.com/32/32/any',
      }}
    /> */}
  </Send>
);
