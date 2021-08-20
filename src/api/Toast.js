import React from "react";
import { ActivityIndicator } from "react-native";
import { useToast } from "native-base";

let customKey = null;
let alertLoading = {};
alertLoading.showLoading = (text) => {
  let toast = useToast();
  if (customKey) return;
  customKey = toast.show({
    // text,
    // icon: <ActivityIndicator size='large' color={Theme.toastIconTintColor} />,
    // position: 'center',
    // duration: 100000,
    title: "加载中----"
  });
}

alertLoading.hideLoading = () => {
  let toast = useToast();
  if (!customKey) return;
  toast.close(customKey);
  customKey = null;
}

export default alertLoading;
