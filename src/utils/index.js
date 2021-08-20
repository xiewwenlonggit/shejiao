import AsyncStorage from '@react-native-async-storage/async-storage';
// 存储
const setLocalStorage = async (key, value, isJSON = false) => {
  if (isJSON) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      throw new Error(e);
    }
  } else {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      throw new Error(e);
    }
  }
};
// 获取locaStorage
const getLocalStorage = async (key, isJSON = false) => {
  if (isJSON) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      throw new Error(e);
    }
  } else {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      throw new Error(e);
    }
  }
};
// 移除key
const removeValue = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    throw new Error(e);
  }
};
//清除所有
const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    throw new Error(e);
  }

  console.log('Done.');
};
export {setLocalStorage, getLocalStorage, removeValue, clearAll};
