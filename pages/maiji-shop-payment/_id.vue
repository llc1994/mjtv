<template>
    <div class="container">
        <!-- 顶部导航 -->
        <Toper :toperParams="toperParams" />
        <TopTable :Orders = "orders"/>
        <div style="height:15px;background-color:#f4f4f4;"></div>
        <BottomConfirm :mallOrderId = "mallOrderId"/>
        <div style="height:30px;background-color:#f4f4f4;"></div>
        <!-- 底部 -->
        <Footer />
    </div>
</template>
<script>
import Toper from "~/components/Toper.vue";
import SubToper from "~/components/SubToper.vue";
import Footer from "~/components/Footer.vue";
import Slide from "~/components/Slide.vue";
import Subject from "~/components/Subject.vue";
import TopTable from "~/components/Shop/TopTable.vue";
import BottomConfirm from "~/components/Shop/BottomConfirm.vue";
import axios from "axios";
export default {
    data() {
        return {
            toperParams: {
                backgroundColor: "white",
                category: "maiji-shop"
            },
            // 播放器实例
            player: null,
            // 当前季
            currentSeason: 0,
            // 下一季
            nextSeason: 0,
            // 当前集
            currentJi: 0,
            // 萌娃评论
            mengwaComment: ""
        };
    },
    computed: {
        userData() {
            return this.$store.state.userData;
        }
    },
    components: {
        Toper,
        SubToper,
        Subject,
        Footer,
        TopTable,
        BottomConfirm
    },
    async asyncData(context) {
        var that = this;
        let res = {};

        let mallOrderId = context.params.id;
        let orders = await axios({
            url:
                context.app.$domain +
                "/mer/mall/getMyOrderDetail/v1",
            method: "post",
            headers: {
                token: context.store.state.session.token || ""
                //token: "token.244c9a777b924042b62aa4c636dd1366"
            },
            data: {
               //mallOrderId:"MALL20191009001013"
               mallOrderId: mallOrderId || "MALL20191009001013"
            }
        });

        res.orders = orders.data;
        res.orders.navi = "3";
        res.mallOrderId = mallOrderId;
        return res;
    },
    mounted() {


    },
    methods: {}
};
</script>
<style lang="scss" scoped>

</style>