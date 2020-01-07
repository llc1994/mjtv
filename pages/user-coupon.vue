<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <div class="user-center">
            <div class="wrap">
                <!-- 用户左侧面板 -->
                <UserMenu :menu="menu" />
                <div class="main">
                    <div class="user-coupon">
                        <div class="big-title">我的优惠券</div>

                        <div class="row coupon-area">
                            <template v-if="couponList.length <= 0">
                                <img src="/list-holder.jpg" style="display: block;margin: auto; margin-top: 100px;" />
                            </template>
                            <template v-else>
                                <div class="col col-pc-3" v-for="(item, index) in couponList" :key="index">
                                    <div class="inner-wrap">
                                        <div class="left">
                                            <div class="number">￥{{item.couponInfo.amount}}</div>
                                            <div class="summary">{{item.couponInfo.name}}</div>
                                            <div class="date">有效期至：{{item.couponInfo.endTime}}</div>
                                        </div>
                                        <div class="right">
                                            <div class="status" v-if="item.couponInfo.status === 1">已使用</div>
                                            <div class="status" v-if="item.couponInfo.status === 0">未使用</div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部 -->
        <Footer />
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
            toperParams: {
                backgroundColor: 'white',
                category: '',
            },
            menu: {
                isActive: '',
            },
            // 当前tab值
            isTab: 'tab2',
        };
    },
    components: {
        Toper,
        Slide,
        Subject,
        Footer,
        UserMenu,
    },
    async asyncData(context) {
        let that = context.app;
        let res = {};

        // 福利券
        res.couponList = await that.$getCouponListAll({
            pageNum: 1,
            pageSize: 10,
        });
        return res;
    },
    created() {
        // if (!this.$store.state.userData.userId) {
        //     this.$router.push("/");
        // }
    },
    methods: {
        switchTab(tab) {
            this.isTab = tab;
        },
    },
};
</script>
<style lang="scss" scoped>
.big-title {
    display: flex;
    align-items: center;
    height: 40px;
    // line-height: 40px;
    font-size: 30px;
    img {
        height: 24px;
        margin-right: 4px;
        vertical-align: middle;
    }
}

.coupon-area {
    .col {
        height: 160px;
        padding: 10px;
        .inner-wrap {
            display: flex;
            height: 100%;
            width: 100%;
            background-color: #00adef;
            color: #fff;
            .left {
                flex: 1 1 100%;
                padding-left: 10px;
                .number {
                    font-size: 50px;
                    font-weight: bold;
                }
                .summary {
                    font-size: 14px;
                }
                .date {
                    font-size: 14px;
                }
            }
            .right {
                display: flex;
                justify-content: center;
                align-items: center;
                flex: 0 0 auto;
                padding: 0 10px;
                .status {
                    height: 26px;
                    display: flex;
                    align-items: center;
                    padding: 3px 6px;
                    border-radius: 12px;
                    border: 1px solid #fff;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>