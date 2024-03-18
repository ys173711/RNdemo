import AsyncStorage from '@react-native-async-storage/async-storage';

// 定义存储数据常量key
export enum STORAGE_KEY {
  USER = 'user',
}
export interface User {
  id: string;
  type: string;
  name: string;
  account: string;
  pwd: string;
}
interface StorageTyp {
  [STORAGE_KEY.USER]: User;
}

export const setStorage = async (
  key: STORAGE_KEY,
  value: StorageTyp[STORAGE_KEY][],
) => {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const getStorage = async (
  key: STORAGE_KEY,
): Promise<StorageTyp[STORAGE_KEY][] | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const removeStorage = async (key: STORAGE_KEY) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
