// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Subnet from './framework.vue'
import iView from 'view-design'
import VueRouter from 'vue-router'
import { MainRoute } from './router'
import store from '@/store'
import './styles/theme.less'
import config from './libs/libs'
import particles from 'particles.js/particles'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { LoadingBar } from 'view-design'
import i18n from "@/language";
import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.config.productionTip = false;
Vue.prototype.$config = config;
Vue.use(iView)
Vue.use(SlideVerify)
Vue.use(particles);
Vue.use(VueRouter);
Vue.use(mavonEditor);
/* eslint-disable no-new */
const RouterConfig = {
    mode: "history",
    routes: MainRoute
};

export default RouterConfig
// @ts-ignore

export const router = new VueRouter(RouterConfig);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: import("vue-router").RawLocation) {
    // @ts-ignore
    return originalPush.call(this as any, location).catch((err: any) => err)
}



router.beforeEach((to, from, next) => {
    LoadingBar.start();
    config.title(to.meta!.title);
    if (!localStorage.getItem('user') && to.name !== 'login' && to.name !== "gitlab-redirect") { // 判断是否已经登录且前往的页面不是登录页
        next(false);
        router.replace({ name: 'login' }).then(() => {
        }).catch(() => {
            LoadingBar.finish()
        })
    } else {
        next()
    }
});

router.afterEach(() => {
    LoadingBar.finish();
    window.scrollTo(0, 0)
});

new Vue({
    el: '#Subnet',
    template: '<Subnet/>',
    components: { Subnet },
    store: store,
    router: router,
    i18n
});

