import React, {useRef, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useToast, Flex} from 'native-base';
import {ActivityIndicator} from 'react-native';
import {getLocalStorage} from '../utils';
import {setUserInfo} from '../redux/actions/user';
import JMessage from '../utils/JMessage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../view/login';
import Demo from '../view/demo';
import UserInfo from '../view/user';
import Home from '../view/home';
import TanHua from '../view/myFriend/tanhua';
import Search from '../view/myFriend/search';
import TestSoul from '../view/myFriend/testSoul';
import TestQA from '../view/myFriend/testSoul/testQA';
import TestResult from '../view/myFriend/testSoul/testResult';
import Detail from '../view/myFriend/detail';

// import TestResult from "./pages/friend/testSoul/testResult";
// import Detail from "./pages/friend/detail";
// import Chat from "./pages/message/chat";
// import Comment from "./pages/group/home/recommend/comment";
// import Publish from "./pages/group/home/recommend/publish";
// import Follow from "./pages/my/follow";
// import Trends from "./pages/my/trends";
// import Visitors from "./pages/my/visitors";
// import UserUpdate from "./pages/my/userUpdate";
// import Settings from "./pages/my/settings";

// import {inject, observer} from 'mobx-react';
const Stack = createStackNavigator();

// @inject('RootStore')
// @observer
const Nav = () => {
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
              backgroundColor="#000"
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
  const [token, setToken] = useState(false);
  useEffect(() => {
    async function getData() {
      const userInfo = (await getLocalStorage('userInfo', true)) || {};
      if (userInfo.token) {
        setToken(true);
        dispatch(setUserInfo({...userInfo}));
        JMessage.init();
      }
    }
    getData();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="Home">
        {token ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="Demo" component={Demo} />
        <Stack.Screen name="TanHua" component={TanHua} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="TestSoul" component={TestSoul} />
        <Stack.Screen name="TestQA" component={TestQA} />
        <Stack.Screen name="TestResult" component={TestResult} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// class Nav extends React.Component {
//   //   constructor(props) {
//   //     super(props);
//   //     this.state = {
//   //       initialRouteName: this.props.RootStore.token ? 'Tabbar' : 'Login',
//   //     };
//   //   }
//   render() {
//     // const {initialRouteName} = this.state;
//     return (
//       <NavigationContainer>
//         <Stack.Navigator headerMode="none" initialRouteName={Login}>
//           {/* <Stack.Screen name="Settings" component={Settings} />
//           <Stack.Screen name="UserUpdate" component={UserUpdate} />
//           <Stack.Screen name="Visitors" component={Visitors} />
//           <Stack.Screen name="Trends" component={Trends} />
//           <Stack.Screen name="Follow" component={Follow} />
//           <Stack.Screen name="Publish" component={Publish} />
//           <Stack.Screen name="Comment" component={Comment} />
//           <Stack.Screen name="Chat" component={Chat} />
//           <Stack.Screen name="Detail" component={Detail} />
//           <Stack.Screen name="TestResult" component={TestResult} />
//           <Stack.Screen name="TestQA" component={TestQA} />
//           <Stack.Screen name="TestSoul" component={TestSoul} />
//           <Stack.Screen name="Search" component={Search} />
//           <Stack.Screen name="TanHua" component={TanHua} />
//           <Stack.Screen name="Tabbar" component={Tabbar} />
//           <Stack.Screen name="UserInfo" component={UserInfo} /> */}
//           <Stack.Screen name="Demo" component={Demo} />
//           <Stack.Screen name="Login" component={Login} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }
// }

export default Nav;
