/**
 * @format
 */

import {LogBox} from 'react-native';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// 启用network
// eslint-disable-next-line no-undef
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
// console.ignoredYellowBox = [
//   'Warning: BackAndroid is deprecated. Please use BackHandler instead.',
//   'source.uri should not be an empty string',
//   'Invalid props.style key',
// ];
// console.disableYellowBox = true; // 关闭全部黄色警告co
LogBox.ignoreAllLogs(true);
AppRegistry.registerComponent(appName, () => App);
