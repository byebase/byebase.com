// import Vue from "vue";
import VueRouter from "vue-router";
import homepage from "./views/website/homepage.vue";

// Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // 首页new
    {
      path: "/",
      name: "首页",
      component: homepage
    },
    // 登陆页
    {
      path: "/login",
      name: "登陆",
      component:  () => import("./views/website/login.vue"),
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.matched.length ===0 && to.path != '/Robots') { //如果未匹配到路由
    from.name ? next({ name:from.name }) : next('/');//如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    next(); //如果匹配到正确跳转
  }
});

router.afterEach(() => {
  window.scrollTo(0, 0)
});

router.onError((err) =>{
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = err.message.match(pattern);
  if (isChunkLoadFailed) {
    let chunkBool = sessionStorage.getItem('chunkError');
    let nowTimes = Date.now();
    if (chunkBool === null || chunkBool && nowTimes - parseInt(chunkBool) > 60000) {//路由跳转报错,href手动跳转
      sessionStorage.setItem('chunkError', 'reload');
      const targetPath = routers.history.pending.fullPath;
      window.location.href = window.location.origin + targetPath;
    }else if(chunkBool === 'reload'){ //手动跳转后依然报错,强制刷新
      sessionStorage.setItem('chunkError', Date.now());
      window.location.reload(true);
    }
  }
})

export default router;
