<template>
    <div>
        <nuxt />
    </div>
</template>
<script>
export default {
    middleware: "global",
    mounted(context) {
        // if (!JSCookie.get("mj_token") || !JSCookie.get("mj_userId")) {
        if (this.$store.state.session.isLogin !== true) {
            MJStore.remove("mj_loginData");
            MJStore.remove("mj_userData");
        } else {
            // 登录数据
            this.$store.commit("save", {
                path: "loginData",
                data: MJStore.get("mj_loginData") || {}
            });
            // 用户数据
            this.$store.commit("save", {
                path: "userData",
                data: MJStore.get("mj_userData") || {}
            });
        }
    }
};
</script>
