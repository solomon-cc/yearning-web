<style lang="less" scoped>
@import "styles/main.less";
</style>
<template>
  <div id="main" class="main">
    <div
      class="sidebar-menu-con"
      style="width: 200px; background: #ffffff; z-index: 1"
    >
      <sidebar-menu :menuList="menuList" :iconSize="18" />
    </div>
    <div class="main-header-con">
      <div class="main-header">
        <div class="main-breadcrumb">
          <breadcrumb-nav></breadcrumb-nav>
        </div>
        <div class="header-avator-con">
          <!-- <Dropdown trigger="click" @on-click="handleClickUserDropdown">
            <a href="javascript:void(0)">
              获得赞助版本/帮助
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="sponsor">获取赞助版</DropdownItem>
              <DropdownItem
                ><a href="https://guide.yearning.io/" target="_Blank">{{
                  $t("banner.guide")
                }}</a></DropdownItem
              >
            </DropdownMenu>
          </Dropdown> -->
          <div
            @click="lockScreen"
            class="lock-screen-btn-con"
            style="margin-left: 55%"
          >
            <Tooltip :content="$t('dash.lock')" placement="bottom">
              <Icon type="md-log-out" :size="20"> </Icon>
              <span class="layout-text">退出</span>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
    <div class="single-page-con" style="padding-left: 200px">
      <div class="single-page">
        <transition name="fade" mode="out-in" appear>
          <router-view> </router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import sidebarMenu from "./components/sidebarMenu.vue";
import breadcrumbNav from "@/components/breadcrumbNav.vue";
import { Component, Mixins } from "vue-property-decorator";
import module_general from "@/store/modules/general";
import module_init_args from "@/store/modules/init_args";
import { DashPutApi } from "@/apis/dashApis";
import Basic from "@/mixins/basic";

@Component({ components: { sidebarMenu, breadcrumbNav } })
export default class main_farm extends Mixins(Basic) {
  userName = localStorage.getItem("user");
  isFullScreen = false;
  // lockScreenSize = 0;
  colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
  color = "";

  get stmt() {
    return module_general.stmt;
  }

  set stmt(val) {
    module_general.changed_stmt_status(val);
  }

  get menuList() {
    return module_general.menuList;
  }

  set menuList(vl) {
    module_general.changed_menuList(vl);
  }

  handleClickUserDropdown(vl: string) {
    if (vl === "sponsor") {
      this.is_open = true;
    }
  }

  handleChange() {
    let i = this.$config.random(0, 3);
    this.color = this.colorList[i];
  }

  // 锁屏
  lockScreen() {
    // let lockScreenBack: any = document.getElementById("lock_screen_back");
    // lockScreenBack.style.transition = "all 3s";
    // lockScreenBack.style.zIndex = 10000;
    // lockScreenBack.style.boxShadow =
    //   "0 0 0 " + this.lockScreenSize + "px #667aa6 inset";
    // this.$store.commit("lock");
    // let page_name: any = this.$route.name;
    // sessionStorage.setItem("last_page_name", page_name); // 本地存储锁屏之前打开的页面以便解锁后打开
    // setTimeout(() => {
    // lockScreenBack.style.transition = "all 0s";
    sessionStorage.clear();
    localStorage.clear();
    this.$router.push({
      name: "login",
    });
    window.location.reload();
    // }, 800);
  }

  init() {
    // 全屏相关
    document.addEventListener("fullscreenchange", () => {
      this.isFullScreen = !this.isFullScreen;
    });
    document.addEventListener("mozfullscreenchange", () => {
      this.isFullScreen = !this.isFullScreen;
    });
    document.addEventListener("webkitfullscreenchange", () => {
      this.isFullScreen = !this.isFullScreen;
    });
    document.addEventListener("msfullscreenchange", () => {
      this.isFullScreen = !this.isFullScreen;
    });
    // 锁屏相关
    // let lockScreenBack: any = document.getElementById("lock_screen_back");
    // let x = document.body.clientWidth;
    // let y = document.body.clientHeight;
    // let size = Math.sqrt(x * x + y * y);
    // this.lockScreenSize = size;
    // window.addEventListener("resize", () => {
    //   let x = document.body.clientWidth;
    //   let y = document.body.clientHeight;
    //   let size = Math.sqrt(x * x + y * y);
    //   this.lockScreenSize = size;
    //   lockScreenBack.style.transition = "all 0s";
    //   lockScreenBack.style.width = lockScreenBack.style.height = size + "px";
    // });
    // lockScreenBack.style.width = lockScreenBack.style.height = size + "px";
    // 问候信息相关
    if (!localStorage.getItem("hasGreet")) {
      let now = new Date();
      let hour = now.getHours();
      let greetingWord = {
        title: "",
        words: "",
      };
      let userName = this.userName;
      if (hour < 6) {
        greetingWord = {
          title: "凌晨好~" + userName,
          words: "早起的鸟儿有虫吃~",
        };
      } else if (hour >= 6 && hour < 9) {
        greetingWord = {
          title: "早上好~" + userName,
          words: "来一杯咖啡开启美好的一天~",
        };
      } else if (hour >= 9 && hour < 12) {
        greetingWord = {
          title: "上午好~" + userName,
          words: "工作要加油哦~",
        };
      } else if (hour >= 12 && hour < 14) {
        greetingWord = {
          title: "中午好~" + userName,
          words: "午饭要吃饱~",
        };
      } else if (hour >= 14 && hour < 17) {
        greetingWord = {
          title: "下午好~" + userName,
          words: "下午也要活力满满哦~",
        };
      } else if (hour >= 17 && hour < 19) {
        greetingWord = {
          title: "傍晚好~" + userName,
          words: "下班没事问候下爸妈吧~",
        };
      } else if (hour >= 19 && hour < 21) {
        greetingWord = {
          title: "晚上好~" + userName,
          words: "工作之余品一品书香吧~",
        };
      } else {
        greetingWord = {
          title: "深夜好~" + userName,
          words: "夜深了，注意休息哦~",
        };
      }
      this.$Notice.config({
        top: 130,
      });
      this.$Notice.info({
        title: greetingWord.title,
        desc: greetingWord.words,
        duration: 4,
        name: "greeting",
      });
      localStorage.setItem("hasGreet", "1");
    }
  }

  agreement() {
    DashPutApi("stmt");
  }

  beforeunloadFn() {
    module_general.snippetTagToJson();
    let root = {
      order_item: module_init_args.order_item,
    };
    localStorage.setItem("root", JSON.stringify(root));
  }

  mounted() {
    this.handleChange();
    module_general.breadcrumb_set(this.$route.matched[1].name);
    module_general.changed_currentPageName(this.$route.matched[1].name);
    this.init();
  }

  created() {
    // 权限菜单过滤相关
    module_general.sidebar_filter();
    module_general.snippetTagFromJson();
    window.addEventListener("beforeunload", () => this.beforeunloadFn());
    if (localStorage.getItem("root") !== null) {
      let root = JSON.parse(localStorage.getItem("root") as string);
      module_init_args.fetch_order_item(root.order_item);
    }
  }

  destroyed() {
    window.removeEventListener("beforeunload", () => this.beforeunloadFn());
  }
}
</script>
