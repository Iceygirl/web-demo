// 公用的方法

import { removeLocalStorage } from './dom'
// 深拷贝一个Object
export function cloneObj(obj) {
  if (null == obj || "object" != typeof obj) return obj;

  if (obj instanceof Date) {

    var copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  if (obj instanceof Array) {
    var copy = [];
    for (var i = 0, len = obj.length; i < len; ++i) {
      copy[i] = cloneObj(obj[i]);
    }
    return copy;
  }

  if (obj instanceof Object) {
    var copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = cloneObj(obj[attr]);
    }
    return copy;
  } 

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

// 毫秒转时分秒
export function formatSeconds(value, seconds) {
  var nDate = new Date(value);
  var seperator1 = "-";
  var year = nDate.getFullYear();
  var month = nDate.getMonth() + 1;
  var strDate = nDate.getDate();
  var hour = nDate.getHours();
  var time = nDate.getMinutes();
  var second = nDate.getSeconds();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (hour >= 0 && hour <= 9) {
    hour = "0" + hour;
  }
  if (time >= 0 && time <= 9) {
    time = "0" + time;
  }
  if (second >= 0 && second <= 9) {
    second = "0" + second;
  }
  var currentdate = ''
  var curDate = year + seperator1 + month + seperator1 + strDate + ' ' + hour + ':' + time;
  var curDateSecond = year + seperator1 + month + seperator1 + strDate + ' ' + hour + ':' + time + ':' + second
  currentdate = (seconds === true) ? curDateSecond : curDate;
  return currentdate;
} 

// 登录信息过期
export function backToLogin(code) {
  if (code === '1003' || code === '1004') {
    removeLocalStorage('userinfo')
    setTimeout(() => {
      window.location.href = location.pathname;
    }, 500);
  }
}

// 清空对象数据
export function clearObjdata(obj) {
  let objdata = cloneObj(obj)
  for (var key in objdata) {
    objdata[key] = ""
  }
  return objdata
}