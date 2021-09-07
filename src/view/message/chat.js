/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {Flex, Text} from 'native-base';
import {GiftedChat} from 'react-native-gifted-chat';
import initialMessages from './infos';
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from './InputToolbar';
import {
  renderAvatar,
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
  renderCustomView,
} from './MessageContainer';
import {TouchableOpacity} from 'react-native';
import {audio, img, smile, camera} from '../../res/fonts/iconSvg';
import SvgUri from 'react-native-svg-uri';
import pxToDp from '../../utils/PixelRatio';
const Chats = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  // 控制底部按钮显示影藏
  const [isVisitor, setIsVisitor] = useState(false);

  useEffect(() => {
    setMessages(initialMessages.reverse());
  }, []);

  const onSend = (newMessages = []) => {
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
  };

  return (
    <Flex style={{flex: 1}}>
      <GiftedChat
        setIsVisitor={setIsVisitor}
        isVisitor={isVisitor}
        messages={messages}
        text={text}
        onInputTextChanged={setText}
        onSend={onSend}
        user={{
          _id: 1,
          name: 'Aaron',
          avatar: 'https://placeimg.com/150/150/any',
        }}
        isCustomViewBottom={true}
        alignTop
        alwaysShowSend
        scrollToBottom
        // showUserAvatar
        renderAvatarOnTop
        renderUsernameOnMessage
        bottomOffset={26}
        onPressAvatar={console.log}
        renderInputToolbar={renderInputToolbar}
        // renderActions={renderActions}
        renderComposer={renderComposer}
        renderSend={renderSend}
        renderAvatar={renderAvatar}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        renderMessage={renderMessage}
        renderMessageText={renderMessageText}
        // renderMessageImage
        renderCustomView={renderCustomView}
        messagesContainerStyle={{backgroundColor: 'indigo'}}
        parsePatterns={linkStyle => [
          {
            pattern: /#(\w+)/,
            style: linkStyle,
            onPress: tag => console.log(`Pressed on hashtag: ${tag}`),
          },
        ]}
      />
      {/* 底部操作按钮 sta*/}
      {isVisitor ? (
        <Flex
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          style={{
            height: pxToDp(60),
            padding: pxToDp(10),
            backgroundColor: '#f6f8fa',
          }}>
          <TouchableOpacity>
            <SvgUri width="36" height="36" svgXmlData={audio} fill="#495057" />
          </TouchableOpacity>
          <TouchableOpacity>
            <SvgUri width="36" height="36" svgXmlData={img} fill="#495057" />
          </TouchableOpacity>
          <TouchableOpacity>
            <SvgUri width="36" height="36" svgXmlData={smile} fill="#495057" />
          </TouchableOpacity>
          <TouchableOpacity>
            <SvgUri width="36" height="36" svgXmlData={camera} fill="#495057" />
          </TouchableOpacity>
        </Flex>
      ) : (
        <></>
      )}
      {/* 底部操作按钮 end*/}
    </Flex>
  );
};

export default Chats;
