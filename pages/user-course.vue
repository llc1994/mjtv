<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <div class="user-center">
            <div class="wrap">
                <!-- 用户左侧面板 -->
                <UserMenu :menu="menu" />
                <div class="main">
                    <template v-if="!MyCourseLists.myOrderRspDTOs.length">
                        <img
                            src="/list-holder.lesson.png"
                            style="display: block;margin: auto; margin-top: 100px;"
                        />
                    </template>
                    <div class="user-course" v-if="MyCourseLists.myOrderRspDTOs">
                        <!-- 一年级 -->
                        <div
                            class="media-area row"
                            v-for="(item,
                            index) in MyCourseLists.myOrderRspDTOs"
                            :key="index"
                        >
                            <!-- <div class="wrap row"> -->
                            <div class="index-title">
                                <div class="wrap-title">
                                    <nuxt-link
                                        to="/course-directory"
                                        class="title"
                                        target="_blank"
                                    >{{ item.orderDepict }}</nuxt-link>
                                </div>
                            </div>
                            <div
                                class="course-box col col2-pc-6 col2-pad-6 col2-mobile-12"
                                v-for="(item,
                                index) in item.myOrderGoodsRspDTOs"
                                :key="index"
                                target="_blank"
                            >
                                <div class="inner-wrap">
                                    <div
                                        class="cover background-cover"
                                        :style="{
                                            backgroundImage:
                                                'url(' +
                                                item.my_cover_url +
                                                '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="title2">{{ item.orderTitle }}{{ item.name }}</div>
                                    <div class="summary">{{ item.goodsDepict }}</div>
                                </div>
                            </div>
                            <!-- </div> -->
                        </div>
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
                toperParams: {
                    backgroundColor: 'white',
                    category: ''
                },
                menu: {
                    isActive: 'user-course'
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
            res.number2press = {
                1: '外研版',
                2: '人教版',
                3: '苏教版',
                4: '北大师版',
                5: '牛津版',
                6: '中考专题',
                7: '高考专题',
                8: '知识重点',
                9: '全部'
            };

            // 我的课程
            res.MyCourseLists = await that.$getOrderLists({
                pageSize: 10
            });
            res.MyCourseLists.myOrderRspDTOs.filter(function(item) {
                return item.orderType === 'COURSE';
            });
            res.MyCourseLists.myOrderRspDTOs.forEach(function(myOrderRspDTOs) {
                myOrderRspDTOs.myOrderGoodsRspDTOs.forEach(function(myOrderGoodsRspDTOs) {
                    myOrderGoodsRspDTOs.qualityRspDTOs.forEach(function(qualityRspDTOs) {
                        if (qualityRspDTOs.url) myOrderGoodsRspDTOs.my_cover_url = qualityRspDTOs.url;
                    });
                });
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
<style lang="scss" scoped>
    .course-box {
        // height:240px;
        padding: 10px;
        .inner-wrap {
            height: 100%;
            width: 100%;
        }
        .cover {
            height: 200px;
            background-color: #eee;
        }
        .title2 {
            height: 30px;
            line-height: 30px;
            font-size: 18px;
            overflow: hidden;
        }
        .summary {
            height: 44px;
            line-height: 22px;
            overflow: hidden;
            font-size: 16px;
            color: #666;
        }
    }
</style>