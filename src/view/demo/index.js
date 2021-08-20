import React from 'react';
import {View, Text} from 'react-native';
import JMessage from 'jmessage-react-plugin';
class App extends React.Component {
  componentDidMount() {
    JMessage.init({
      appkey: 'edaf7be55aaed663a3c2d995',
      isOpenMessageRoaming: true,
      isProduction: false,
      channel: '',
    });

    JMessage.login(
      {
        username: '18665711956',
        password: '18665711956',
      },
      res => {
        console.log('登录成功');
        console.log(res);
      },
      err => {
        console.log('登录失败');
        console.log(err);
      },
    );
  }
  render() {
    return (
      <View>
        <Text>goods</Text>
      </View>
    );
  }
}
export default App;
