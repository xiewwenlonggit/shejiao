import React, {memo} from 'react';
import {Text} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustormerBar from './custormerBar';
import recommend from './recommend';
export default () => {
  const CusBar = memo(CustormerBar);
  const Rec = memo(recommend);
  return (
    <ScrollableTabView initialPage={0} renderTabBar={() => <CusBar />}>
      {/* <Text tabLabel="Tab #1">My</Text>
       */}
      <Rec tabLabel="推荐" />
      <Text tabLabel="Tab #2">favorite</Text>
      <Text tabLabel="Tab #3">project</Text>
    </ScrollableTabView>
  );
};
