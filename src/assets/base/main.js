import axios from "axios";
import md5 from "js-md5";
import urls from "./url";
import {
  Loading,
  Notification
} from "element-ui";
import vue from "vue";
import router from "../../router";

let v = new vue();
let loading

// 服务器状态值拦截
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
export default {
  // 公共方法
  objKeySort(obj) { //排序的函数
    var newkey = Object.keys(obj).sort();
    var newObj = {};
    for (var i = 0; i < newkey.length; i++) {
      newObj[newkey[i]] = obj[newkey[i]];
    }
    return newObj;
  },

  //生成20位随机字符串
  randomWord(randomFlag, min, max) {
    var str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
      var pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  },

  request(url, data, Fun, method = "GET", linkData = {}, lazloding = true, isrest = false) {
    if (lazloding == true) {
      loading = Loading.service({
        // lock: true,
        text: "加载中……",
        background: "rgba(0, 0, 0, 0.5)"
      });
    }

    let [link, sing, responseData] = ["", "", ""]; // 页面参数拼接 sing签名 页面参数转字符串
    var nonce = this.randomWord(false, 20);
    var timestamp = new Date().getTime();

    if (localStorage.getItem('d_timestamp')) { //计算前后端时间戳差值
      timestamp = timestamp + Number(localStorage.getItem('d_timestamp'));
    }


    if (Object.keys(linkData).length != 0) {
      linkData.nonce = nonce;
      linkData = this.objKeySort(linkData);
      for (let key in linkData) {
        responseData += key + linkData[key];
        if (key != 'nonce') {
          link += "&" + key + "=" + linkData[key];
        }
      }
    } else {
      responseData = responseData + "nonce" + nonce;
    }

    if (Object.keys(data).length == 0) {
      sing = md5(urls.md5key + responseData + timestamp);
    } else {
      sing = md5(urls.md5key + responseData + timestamp + JSON.stringify(data));
    }

    axios({
        url: url + "?sign=" + sing + link + "&nonce=" + nonce,
        method: method,
        data: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "MidOffice-Authorization": localStorage.getItem("token") == null ? '' : localStorage.getItem("token"),
          'X-BB-Timestamp': timestamp,
          'v': '1.1'
        }
      })
      .then(res => {
        if (lazloding == true) {
          setTimeout(() => {
            loading.close();
          }, 200);
        }

        var timestamp1 = new Date().getTime();
        if (Math.abs(res.data.now - timestamp1) > 60000) {
          localStorage.setItem('d_timestamp', res.data.now - timestamp1)
        } else {
          if (localStorage.getItem('d_timestamp')) {
            localStorage.removeItem('d_timestamp')
          }
        }

        if (Number(res.data.code) == 100001) {
          Notification.closeAll();
          v.$notify.error({
            title: "错误",
            message: "登录超时，请重新登录"
          });
        } else {
          Notification.closeAll();
          v.$notify.error({
            title: '错误',
            message: res.data.message
          });
          if (loading) {
            loading.close()
          }
        }
      })
      .catch(() => {
        if (loading) {
          loading.close()
        }
      });
  },
  // 图片文件
  file(url, data, Fun, method = "GET") {
    loading = Loading.service({
      lock: true,
      text: "加载中……",
      background: "rgba(0, 0, 0, 0.5)"
    })

    axios({
        url: url,
        method: method,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          "MidOffice-Authorization": localStorage.getItem("token")
        }
      })
      .then(res => {
        if (res.data.code != 100031 && res.data.code != 100043 && res.data.code != 300000) {
          setTimeout(() => {
            loading.close();
          }, 200);
          Fun(res.data);
        } else {
          localStorage.setItem("token", "");
          router.push({
            path: '/login'
          })
        }
      })
      .catch(() => {});
  }

};