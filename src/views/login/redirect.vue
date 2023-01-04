<template></template>


<script>
import { gitlabCallback } from "@/apis/loginApis";
import { request } from "@/libs/requests";

export default {
  name: "qqCallback",
  mounted() {
    gitlabCallback({
      code: this.$route.query.code,
      state: this.$route.query.state,
    }).then((res) => {
      request.defaults.headers.common["Authorization"] =
        "Bearer " + res.data.payload.token;

      localStorage.setItem("jwt", "Bearer " + res.data.payload.token);
      localStorage.setItem("user", res.data.payload.user);
      localStorage.setItem("auth", res.data.payload.permissions);
      localStorage.setItem("real_name", res.data.payload.real_name);

      let auth = res.data.payload.permissions;
      if (auth === "guest") {
        localStorage.setItem("access", "1");
      } else if (auth === "admin" || auth === "perform") {
        localStorage.setItem("access", "2");
      } else if (auth === "super") {
        localStorage.setItem("access", "3");
      }

      this.$router.push({ name: "home_index" });
    });
  },
};
</script>
