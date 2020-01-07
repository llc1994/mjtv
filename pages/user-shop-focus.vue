<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <div class="user-center">
            <div class="wrap">
                <!-- 用户左侧面板 -->
                <UserMenu :menu="menu" />
                <div class="main">
                    <template v-if="ShopFocusLists.length <= 0">
                        <img src="/list-holder.shop.png" style="display: block;margin: auto; margin-top: 100px;" />
                    </template>
                    <!-- <div class="title">今天</div> -->
                    <div class="media-area row">
                        <nuxt-link target="_blank" :to="'/mall-storeHome/' + item.chantId" class="media-type-1 shop-follow-swiper col col-pc-2 col-pad-3 col-mobile-6" v-for="(item, index) in ShopFocusLists" :key="index">
                            <div class="inner-wrap">
                                <div
                                    class="cover shop-follow-cover"
                                    :style="{
                                        backgroundImage: 'url(' + (item.logoUrl || '/default-placeholder-img.png') + ')'
                                    }"
                                ></div>
                                <div class="name shop-name">{{ item.shopName }}</div>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <Footer />
        <!-- 登录注册 -->
    </div>
</template>
<script>
import Toper from '~/components/Toper.vue';
import Footer from '~/components/Footer.vue';
import Slide from '~/components/Slide.vue';
import Subject from '~/components/Subject.vue';
import UserMenu from '~/components/UserMenu.vue';
import axios from 'axios';
export default {
    middleware: 'auth',
    data() {
        return {
            // 顶部参数
            toperParams: {
                backgroundColor: 'white',
                category: ''
            },
            // 菜单聚焦
            menu: {
                isActive: 'user-shop-focus'
            }
        };
    },
    components: {
        Toper,
        Slide,
        Subject,
        Footer,
        UserMenu
    },
    async asyncData(context) {
        let that = context.app;
        let res = {};

        // 店铺关注
        res.ShopFocusLists = await that.$followChantList({
            pageNum: 1,
            pageSize: 20
        });
        return res;
    },
    created() {
        // if (!this.$store.state.userData.userId) {
        //     this.$router.push("/");
        // }
    }
};
</script>
