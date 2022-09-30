/*
* @author iskeeping
* */
import {saveAs} from 'file-saver'

function getScrollbarWidth() {
  let odiv = document.createElement('div'),//创建一个div
    styles = {
      position: 'absolute',
      top: 0,
      left: '9999px',
      width: '100px',
      height: '100px',
      overflowY: 'scroll'//让他有滚动条
    }, i, scrollbarWidth
  for (i in styles) odiv.style[i] = styles[i]
  document.body.appendChild(odiv)//把div添加到body中
  scrollbarWidth = odiv.offsetWidth - odiv.clientWidth//相减
  odiv.remove()//移除创建的div
  return scrollbarWidth//返回滚动条宽度
}

function cutdown({count = 60, gap = 1000, onStart, onGoing, onFinish}) {
  //倒计时
  if (typeof onStart === 'function') {
    onStart(count)
  }
  let timer = setInterval(() => {
    count--
    if (typeof onGoing === 'function') {
      onGoing(count, timer)
    }
    if (count == 0) {
      clearInterval(timer)
      if (typeof onFinish === 'function') {
        onFinish()
      }
    }
  }, gap)
}

function isEmpty(field) {
  //判断值是否为空
  if (
    typeof field == 'undefined' ||
    ('' + field).trim() == ''
  ) {
    return true
  }
  return false
}

function isPhone(phone) {
  // 手机号校验
  let reg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/
  return reg.test(phone)
}

function _bZero(d) {
  if (d < 10) {
    return '0' + d
  }
  return d
}

function createYMDHMS(timestamp) {
  // 根据时间戳获取年月日 如果没有时间戳 则获取当前的时间戳
  let dateO
  if (isNaN(timestamp)) {
    dateO = new Date()
  } else {
    dateO = new Date(timestamp)
  }
  let year = dateO.getFullYear()
  let month = _bZero(dateO.getMonth() + 1)
  let date = _bZero(dateO.getDate())
  let hour = _bZero(dateO.getHours())
  let minute = _bZero(dateO.getMinutes())
  let second = _bZero(dateO.getSeconds())
  return {
    year,
    month,
    date,
    hour,
    minute,
    second
  }
}

function clone(jsonObj) {
  // 深度克隆
  try {
    return JSON.parse(JSON.stringify(jsonObj))
  } catch (e) {
    return {}
  }
}

function isChinese(str) {
  //是否是中文
  let reg = /^[\u4e00-\u9fa5]+$/
  return reg.test(str)
}

function isIncludeChinese(str) {
  let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
  return reg.test(str)
}

function isPassword(str) {
  let reg = /[0-9a-zA-Z]{6,20}/
  return reg.test(str)
}

function isValidIP(ip) {
  let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip)
}

function digitToPercent(d, bit = 0) {
  let num = new Number(d * 100)
  return num.toFixed(bit) + '%'
}

function getImageInfo(url) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function () {
      reject()
    }
    img.src = url
  })
}
/**
 * 时间戳转日期， 年月日 时分秒
 * @param {Number} timestamp 时间戳
 * @param {String} dateConnector 日期连接符
 * @param {String} timeConnector 时间连接符
 */
function timestampToDateTime(timestamp, dateConnector = "-", timeConnector = ":") {
  if (isNaN(timestamp) || timestamp <= 0) return "";
  const date = new Date(timestamp);
  let [year, month, day, hour, minute, second] = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];

  month += 1;
  month = padLeft(month, 2, "0");
  day = padLeft(day, 2, "0");
  hour = padLeft(hour, 2, "0");
  minute = padLeft(minute, 2, "0");
  second = padLeft(second, 2, "0");
  const dateStr = [year, month, day].join(dateConnector);
  const timeStr = [hour, minute, second].join(timeConnector);
  return `${dateStr} ${timeStr}`;
}
/**
 * 时间戳转 年 月 日
 * @param {Number} timestamp 时间戳 
 * @param {String} connector 连接符
 */
function timestampToDate(timestamp, connector = "-") {
  const dateStr = timestampToDateTime(timestamp, connector);
  if (!dateStr) return "";
  return dateStr.slice(0, 10);
}
/**
 * 左补齐字符串到指定长度
 * @param {String} str 要补齐的字符串
 * @param {Number} len 希望到的长度，正整数
 * @param {String} char 不足的时候用来补齐的字符
 */
function padLeft(str, len, char) {
  if (isNaN(len) || len <= 0 || (len%1 !== 0) || !char) {
    return str;
  }
  str += "";
  if (str.length < len) {
    str = new Array(len - str.length + 1).join(char) + str;
  }
  return str;
}

export {
  getScrollbarWidth,
  cutdown,
  isEmpty,
  isPhone,
  createYMDHMS,
  clone,
  isChinese,
  isIncludeChinese,
  isPassword,
  isValidIP,
  digitToPercent,
  getImageInfo,
  timestampToDateTime,
  timestampToDate,
  padLeft
}
