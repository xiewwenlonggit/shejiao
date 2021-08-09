import React from 'react';
import Store from './src/redux/store';
import { View } from 'react-native';
import Nav from './src/router';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from "native-base";
const App = () => {
  return (
    <NativeBaseProvider>
      <View style={{ flex: 1 }}>
        <Provider store={Store}>
          <Nav />
        </Provider>
      </View>
    </NativeBaseProvider>

  );
};

export default App;
