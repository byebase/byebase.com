<template>
  <div class="login">
    <div class="login-header">
      <img @click="gohome" src="../../assets/image/logo.png" alt>
      <div class="backview" @click="gohome">
        <span>返回首页</span>
      </div>
    </div>
    <div class="login-content">
      <div class="login-main">
        <div class="login-left"></div>
        <div class="login-right" v-if="loginType == false">
          <div class="header">
            <div class="header-left">
              <span>账号密码登录</span>
            </div>
            <div class="header-right" v-on:click="type(true)">
              <span>动态验证码登录</span>
            </div>
          </div>
          <div class="info">
            <input placeholder="请输入用户名" v-model="params.username" type="text" :maxlength="11">
          </div>
          <div class="info">
            <input placeholder="请输入密码" v-model="params.password" maxlength="20" type="password" @keyup.enter="passlogin">
          </div>
          <div class="checkbox">
            <el-checkbox v-model="params.rememberme">7天免登录</el-checkbox>
            <span class="forgetpassword" @click="$router.push({path:'/resetpsd'})">忘记密码?</span>
          </div>
          <div class="info" v-on:click="passlogin">
            <el-button type="primary">登录</el-button>
          </div>
        </div>
        <div class="login-right" v-if="loginType == true">
          <div class="header">
            <div class="header-right" v-on:click="type(false)">
              <span>账号密码登录</span>
            </div>
            <div class="header-left">
              <span>动态验证码登录</span>
            </div>
          </div>
          <div class="info">
            <input placeholder="请输入手机号码" v-model="Vcode.phone" type="text" :maxlength="11">
          </div>
          <div class="piccode">
            <input type="password" style="display:none">
            <input placeholder="请输入图形验证码" v-model="Vcode.imgcode" maxlength="10" type="text">
            <div>
              <img :src="imgcode" alt>
              <span v-on:click="type(true)" class="el-icon-refresh"></span>
            </div>
          </div>
          <div class="piccode">
            <input placeholder="请输入短信验证码" v-model="Vcode.smscode" type="text" maxlength="10">
            <button :disabled="isdisabled" v-on:click="getcodebtn">{{getcode}}</button>
          </div>
          <div class="info" v-on:click="codelogin">
            <el-button>登录</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
      <p>
        
      </p>
      <p>Copyright © 2022 - Byebase</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      isdisabled: false, // 获取验证码禁用
      checked: false,
      loginType: false,
      getcode: "获取验证码", //
      params: {
        username: "", // 用户名
        password: "", // 密码
        rememberme: true // 记住我
      },
      imgcode: "", // 图片
      Vcode: {
        imgcode: "", // 图片内容
        imgcodekey: "", //图片id
        smscode: "", //短信验证码
        phone: "" // 手机号码
      }
    };
  },
  created() {
    this.session();
    this.params.username = localStorage.getItem("phoneNum");
  },
  mounted() {},
  methods: {
    gohome() {
      this.$router.push({ path: "/" });
    },
    // 判断本地session
    session() {
      if (
        localStorage.getItem("token") != "" &&
        localStorage.getItem("token") != null &&
        localStorage.getItem("token") != undefined
      ) {
        this.$router.push({ path: "/home" }); // 跳转至首页
      }
    },
    //切换登录方式
    type(type) {
      this.loginType = type;
      if (type == true) {
        this.main.request(
          this.url.getauthcodeimage,
          {},
          res => {
            if (res.code == 0) {
              this.Vcode.imgcodekey = res.data.key;
              this.imgcode = res.data.imagestr;
            }
          },
          "GET",
          "",
          false
        );
      }
    },
    // 密码登录
    passlogin() {
      this.main.closeAllNotification();
      var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (this.params.username == "" || !reg.test(this.params.username)) {
        this.$notify.warning({
          title: "错误",
          message: "手机号错误，无法登录"
        });
        return;
      }

      if (this.params.password == "") {
        this.$notify.warning({
          title: "错误",
          message: "密码未填写，无法登录"
        });
        return;
      }
      this.main.request(
        this.url.login,
        this.params,
        res => {
          if (res.code == 0) {
            this.$message({
              message: "登录成功",
              type: "success"
            });
            localStorage.setItem("token", res.data); // 设置本地缓存
            localStorage.setItem("phoneNum", this.params.username);
            this.sysuseritemuser();//登录成功后先判断是否是平台权限，中台权限直接跳中台home，平台权限先拿菜单栏信息 看有没有dashboard  有的话就跳 dashboard页 没有 就跳平台home
          } else {
            this.$notify.error({
              title: "错误",
              message: res.message
            });
          }
        },
        "POST",
        ""
      );
    },
    // 获取用户登录信息
    sysuseritemuser() {
      this.main.request(this.url.sysuseritemuser,{},res => {
          if (res.code == 0) {
            if( res.data.onplatform==true){
              this.getlist()
            }else{
              this.$router.push({ path: "/home" }); // 跳转至首页
            }
          } else {
            this.$notify.error({
              title: "错误",
              message: res.message
            });
          }
        },"GET");
    },
     // 获取列表
    getlist(){
      this.main.request(this.url.menu,{},res => {
          if (res.code == 0) {
            this.$router.push({ path: "/home" }); // 跳转至首页
          }
        },
        "GET",false
      );
    },
    // 获取短信验证码
    getcodebtn() {
      this.main.closeAllNotification();
      var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (this.Vcode.phone == "" || !reg.test(this.Vcode.phone)) {
        this.$notify.warning({
          title: "错误",
          message: "手机号错误，无法获取"
        });
        return;
      }

      if (this.Vcode.imgcode == "") {
        this.$notify.warning({
          title: "错误",
          message: "图形验证码未填写，无法获取"
        });
        return;
      }

      this.main.request(
        this.url.sendsmscode,
        {},
        ret => {
          if (ret.code == 0) {
            this.$message({
              message: "验证码发送成功",
              type: "success"
            });
            this.isdisabled = true;
            this.main.interval(61, res => {
              if (res == "重新获取") {
                this.isdisabled = false;
              }
              this.getcode = res;
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: ret.message
            });
          }
        },
        "GET",
        {
          phone: this.Vcode.phone,
          imgcodekey: this.Vcode.imgcodekey,
          imgcode: this.Vcode.imgcode
        },
        false
      );
    },
    // 验证码登录
    codelogin() {
      this.main.closeAllNotification();
      var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (this.Vcode.phone == "" || !reg.test(this.Vcode.phone)) {
        this.$notify.warning({
          title: "错误",
          message: "手机号未填写，无法登录"
        });
        return;
      }

      if (this.Vcode.imgcode == "") {
        this.$notify.warning({
          title: "错误",
          message: "图形验证码未填写，无法登录"
        });
        return;
      }

      if (this.Vcode.smscode == "") {
        this.$notify.warning({
          title: "错误",
          message: "短信证码未填写，无法登录"
        });
        return;
      }

      this.main.request(
        this.url.signinwithsmscode,
        this.Vcode,
        res => {
          if (res.code == 0) {
            localStorage.setItem("token", res.data); // 设置本地缓存
            localStorage.setItem("phoneNum", this.Vcode.phone);
            this.$router.push({ path: "/home" }); // 跳转至首页
          } else {
            this.$notify.error({
              title: "错误",
              message: res.message
            });
          }
        },
        "POST",
        {},
        false
      );
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  position: relative;
  height: 100%;
  min-height: 650px;
  background-color: #fff;
  .login-header {
    // width: 1200px;
    margin: 0px auto;
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    img {
      cursor: pointer;
      height: 32px;
      vertical-align: top;
    }

    .backview {
      cursor: pointer;
      width: 100px;
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        color: #1489cd;
        border: 1px solid #1489cd;
        padding: 5px 15px;
        border-radius: 15px;
      }
    }
  }

  .login-content {
    width: 100%;
    // height: 600px;
    // background: url("../../assets/image/login.png") center center no-repeat;
    background-color: #00c1de;
    .login-main {
      height: 500px;
      width: 1200px;
      margin: 0px auto;
      display: flex;
      align-items: center;
      .login-left {
        width: 800px;
      }
      .login-right {
        width: 350px;
        height: 360px;
        background: #fff;
        border-radius: 5px;
        padding: 30px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        .logintype {
          position: absolute;
          top: 0px;
          right: 0px;
          height: 50px;
          width: 50px;
          cursor: pointer;
          text-align: center;
          line-height: 50px;
        }

        .header {
          display: flex;
          padding-bottom: 15px;
          border-bottom: 1px solid #e3e3e3;
          .header-left {
            width: 175px;
            text-align: center;
            span {
              padding-bottom: 15px;
              border-bottom: 3px solid #1489cd;
              font-size: 12px;
            }
          }
          .header-right {
            width: 175px;
            text-align: center;
            span {
              font-size: 12px;
            }
          }
        }

        .info {
          margin-top: 20px;
          > button {
            width: 100%;
            background: -webkit-linear-gradient(right, #2dbbe8, #1489cd);
            background: -o-linear-gradient(right, #2dbbe8, #1489cd);
            background: -moz-linear-gradient(right, #2dbbe8, #1489cd);
            background: linear-gradient(to right, #2dbbe8, #1489cd);
            color: white;
          }
          input {
            font-size: 14px;
            border: none;
            outline: none;
            width: 100%;
            padding-top: 10px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e3e3e3;
          }
        }

        .piccode {
          margin-top: 20px;
          display: flex;
          > div {
            position: relative;
            > img {
              width: 100%;
              height: 100%;
            }
            > span {
              display: none;
              height: 100%;
              width: 100%;
              background: rgba(255, 255, 255, 0.5);
              position: absolute;
              top: 0px;
              left: 0px;
              font-size: 20px;
              color: #000;
              line-height: 100%;
              align-items: center;
              justify-content: center;
            }
          }
          > div:hover {
            > span {
              display: flex;
            }
          }
          > div:first-child {
            width: 60%;
          }
          > div:last-child {
            flex: 1;
            margin-left: 10px;
            height: 38px;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            color: #606266;
            font-size: 14px;
            line-height: 38px;
            text-align: center;
            cursor: pointer;
          }
          > button {
            flex: 1;
            margin-left: 10px;
            height: 38px;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            color: #606266;
            font-size: 14px;
            line-height: 38px;
            text-align: center;
            cursor: pointer;
            outline: none;
            margin-top: 10px;
            background-color: #fff;
          }

          input {
            border: none;
            outline: none;
            width: 200px;
            padding-top: 10px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e3e3e3;
            font-size: 14px;
          }
        }

        .logintype::after {
          content: "";
          width: 100px;
          height: 2px;
          background: #e4e4e4;
          position: absolute;
          transform: rotate(45deg);
          top: 35px;
          right: -15px;
        }
        > h3 {
          height: 50px;
          line-height: 50px;
          text-align: left;
          font-size: 1em;
        }
        .account {
          text-align: right;
          font-size: 14px;
          color: #606266;
          margin-top: 20px;
          font-weight: 500;
        }
        .checkbox {
          margin-top: 20px;
          font-size: 14px;
          color: #606266;
          font-weight: 500;
          display: flex;
          justify-content: space-between;
        }
        .piccode {
          margin-top: 20px;
          display: flex;
          > div {
            position: relative;
            > img {
              width: 100%;
              height: 100%;
            }
            > span {
              display: none;
              height: 100%;
              width: 100%;
              background: rgba(255, 255, 255, 0.5);
              position: absolute;
              top: 0px;
              left: 0px;
              font-size: 20px;
              color: #000;
              line-height: 100%;
              align-items: center;
              justify-content: center;
            }
          }
          > div:hover {
            > span {
              display: flex;
            }
          }
          > div:first-child {
            width: 60%;
          }
          > div:last-child {
            flex: 1;
            margin-left: 10px;
            height: 38px;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            color: #606266;
            font-size: 14px;
            line-height: 38px;
            text-align: center;
            cursor: pointer;
          }
          > button {
            flex: 1;
            margin-left: 10px;
            height: 38px;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            color: #606266;
            font-size: 14px;
            line-height: 38px;
            text-align: center;
            cursor: pointer;
            outline: none;
            background-color: #fff;
          }
        }
        .info {
          margin-top: 20px;
          > button {
            width: 100%;
          }
        }
      }
    }
  }
  .login-foot {
    width: 1200px;
    margin: 40px auto 0;
    .link {
      border-top: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      height: 45px;
      line-height: 45px;
      color: #999;
      > a {
        font-size: 13px;
        cursor: pointer;
      }
      > span {
        margin: 0px 5px;
        font-size: 13px;
      }
    }
  }

  .copyright {
    position: absolute;
    bottom: 15px;
    width: 100%;
    margin: 40px auto 0;
    p {
      text-align: center;
      font-size: 14px;
      color: #333333;
      span {
        padding-left: 10px;
      }
    }
  }
}

.forgetpassword {
  color: #00c1de;
  cursor: pointer;
  font-size: 14px;
}
</style>

