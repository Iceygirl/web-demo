// 存储的方法

import storage from 'good-storage';

//获取 和 设置本地存储
export function getLocalStorage(name, val) {
    if (val) {
      return storage.set(name, val);
    }
    return storage.get(name);
  }
  
//删除本地存储
export function removeLocalStorage(name) {
  return storage.remove(name);
}