<template>
  <div class="isFixed login-header">
    <div class="pc-header">
      <img class="homelogo" src="../assets/image/homelogo.png"  alt />
      <div class="imagebanner">
        <div class="menu">
          <ul>
            <li>
              <router-link :to="{path:'/'}">
                <P :class="[activeLink==0?'selected':'']">首页</P>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="loginBtn-con">
          <span class="loginBtn" @click="gotologin()" v-if="phoneNum.length==0">登录中台</span>
          <el-dropdown placement="bottom" v-else>
            <div class="logined">
              <span class="iconfont icon-gerenzhongxin userheader"></span>
              <span class="userPhone">{{ phoneNum }}</span>
              <span class="el-icon-arrow-down"></span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="gotohome" v-if="!gozt">进入中台</el-dropdown-item>
              <el-dropdown-item @click.native="signout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "indexheader",
  data() {
    return {
      onplatform: false,
      activeLink: 0,
      phoneNum: "",
      gozt: false, //icp登录了 然后去中台按钮隐藏，，true隐藏
      activeIndex: "1"
    };
  },
  props: [""],
  created() {
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("token").indexOf("ICPTOKEN-") != -1) {
        this.gozt = true;
      } else {
        this.gozt = false;
      }
    }
    this.createActiveLink();
    this.getStatus();
  },
  mounted() {
    window.addEventListener('scroll', this.handleTabFix, true)
  },
  methods: {
    createActiveLink() {
      let json = {
        "/solutionpage": 1,
        "/homepage": 0,
        "/": 0,
        "/aboutuspage": 3,
        "/teampage": 3,
        "/channelpage": 2,
        "/downloadcenter": 4
      };
      this.activeLink = json[this.$route.path];
    },

    getStatus() {
      if (
        localStorage.getItem("token") != "" &&
        localStorage.getItem("token") != null &&
        localStorage.getItem("token") != undefined
      ) {
        this.phoneNum = localStorage.getItem("phoneNum");
      } else {
        this.phoneNum = "";
      }
    },

    gotologin() {
      this.$router.push({ path: "login" });
    },

    gotohome() {
      this.$router.push({ path: "/home" });
    },

    signout() {
      this.main.request(this.url.signout, {}, res => {
        localStorage.setItem("token", "");
        this.getStatus();
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login-header {
  background-color: #ffffff;
  min-width: 1200px;
  .pc-header {
    margin: 0 auto;
    width: 1200px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .homelogo{
      width: 150px;
    }
    .imagebanner {
      width: 920px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .menu ul {
        list-style: none; 
        margin: 0px; 
        padding: 0px;
        width: 600px;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }

      .menu ul li a,
      .menu ul li a:visited {
        color: #dde4ec; 
        display: block;
        padding: 8px 20px;
        text-decoration: none;
        white-space: nowrap;

        p {
          color: #666666;
          text-align: center;
          font-size: 14px;
        }

        .selected {
          color: #1489cd;
        }
      
      }
    }

    .loginBtn-con {
      display: flex;
      align-items: center;
      padding-left: 5px;
      .registerBtn{
        padding: 4px 10px;
        color: #666666;
        font-size: 14px;
        border: 1px solid #ffffff;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 10px;
      }

      .loginBtn {
        padding: 5px 10px;
        background-color: #1489cd;
        border-radius: 3px;
        border: 1px solid #1489cd;
        color: #ffffff;
        cursor: pointer;
        font-size: 14px;
        margin-left: 10px;
      }

      .logined {
        padding: 5px 10px 5px 15px;
        display: flex;
        align-items: center;
        cursor: pointer;
        .userheader {
          color: #999999;
          font-size: 20px;
          padding-right: 2px;
        }

        .userPhone {
          padding-right: 2px;
          font-size: 14px;
        }
      }
    }
  }
}
.isFixed{
  position:fixed;
  top: 0;
  z-index:999;
  width: 100%;
  box-shadow: 0px 8px 14px 0px rgba(10, 18, 29, 0.1);
}
</style>
<style lang="less">
.pc-dom{
  padding-top: 61px!important;
}
</style>
