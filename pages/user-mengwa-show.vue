<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <div class="user-center">
            <div class="wrap">
                <!-- 用户左侧面板 -->
                <UserMenu :menu="menu" />
                <div class="main">
                    <div class="user-mengwa-show">
                        <div class="big-title">
                            <!-- <img src="/home.png" /> -->
                            我的萌娃秀
                            <!-- （获赞30） -->
                        </div>

                        <!-- 切换 -->
                        <div class="switch">
                            <div class="tab" :class="{ active: isTab === 'tab1' }" @click="switchTab('tab1')">
                                我的作品
                                <!-- {{ MyMengwaLists.body.pageCount }} -->
                            </div>
                            <div class="tab" :class="{ active: isTab === 'tab2' }" @click="switchTab('tab2')">
                                喜欢
                                <!-- {{
                                MyFocusMengwaLists.body.size +
                                MyFocusLists.body.pageCount
                                }}-->
                            </div>
                            <div class="tab" :class="{ active: isTab === 'tab3' }" @click="switchTab('tab3')">
                                粉丝
                                <!-- {{ MyFansLists.body.size }} -->
                            </div>
                        </div>

                        <!-- 媒体区域 - 我的作品 -->
                        <div class="panel" v-show="isTab === 'tab1'">
                            <div class="media-area">
                                <div class="index-title">
                                    <div class="wrap-title">
                                        <div class="title2">我发布的视频</div>
                                        <div class="more MengWaShowSwiper">
                                            <div class="more-arrow prev" style="cursor:pointer"></div>
                                            <div class="more-arrow next" style="cursor:pointer"></div>
                                        </div>
                                    </div>
                                </div>
                                <div v-swiper:MengBaoVideoSwiper="MengWaShowSwiperOption">
                                    <div class="swiper-wrapper">
                                        <template v-if="!MyMengwaLists.body.list.length">
                                            <img src="/list-holder.jpg" style="display: block;margin: auto; margin-top: 100px;" />
                                        </template>
                                        <div class="swiper-slide" v-for="(item, index) in MyMengwaLists.body.list" :key="index">
                                            <nuxt-link target="_blank" class="media-type-5" :to="'/play-meng/' + item.worksId">
                                                <div class="inner-wrap">
                                                    <div
                                                        class="cover"
                                                        :style="{
                                                            backgroundImage: 'url(' + item.resourceUrl + '?x-oss-process=image/resize,h_480/format,jpeg/quality,Q_90)'
                                                        }"
                                                    >
                                                        <div class="tips" style="color:#fff;">
                                                            <span class="like"></span>
                                                            {{ item.likes }}
                                                        </div>
                                                    </div>
                                                    <!-- <div class="info">
                                                        <div
                                                            class="head"
                                                            :style="{
                                                                backgroundImage:
                                                                    'url(' +
                                                                    (item.userIcon || '/default-head-thumbnail.png') +
                                                                    ')'
                                                            }"
                                                        ></div>
                                                        <div class="name">{{ item.userName }}</div>
                                                    </div>-->
                                                    <!-- <div class="summary">{{ item.describe }}</div> -->
                                                </div>
                                            </nuxt-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 媒体区域 - 喜欢 -->
                        <div class="panel" v-show="isTab === 'tab2'">
                            <!-- 我关注的视频 -->
                            <div class="media-area">
                                <div class="index-title">
                                    <div class="wrap-title">
                                        <div class="title2">我喜欢的视频</div>
                                        <div class="more MengWaShowFocusSwiper">
                                            <div class="more-arrow prev" style="cursor:pointer"></div>
                                            <div class="more-arrow next" style="cursor:pointer"></div>
                                        </div>
                                    </div>
                                </div>
                                <div v-swiper:MengBaoVideoFocusSwiper="MengWaShowFocusSwiperOption">
                                    <div class="swiper-wrapper">
                                        <template v-if="!MyFocusLists.body.list.length">
                                            <img src="/list-holder.jpg" style="display: block;margin: auto; margin-top: 100px;" />
                                        </template>
                                        <div class="swiper-slide" v-for="(item, index) in MyFocusLists.body.list" :key="index">
                                            <nuxt-link target="_blank" class="media-type-5" :to="'/play-meng/' + item.worksId">
                                                <div class="inner-wrap">
                                                    <div
                                                        class="cover"
                                                        :style="{
                                                            backgroundImage: 'url(' + item.resourceUrl + '?x-oss-process=image/resize,h_480/format,jpeg/quality,Q_90)'
                                                        }"
                                                    >
                                                        <div class="tips" style="color:#fff;">
                                                            <span class="like"></span>
                                                            {{ item.likes }}
                                                        </div>
                                                    </div>
                                                    <div class="info">
                                                        <div
                                                            class="head"
                                                            :style="{
                                                                backgroundImage: 'url(' + (item.userIcon || '/default-head-thumbnail.png') + ')'
                                                            }"
                                                        ></div>
                                                        <div class="name">{{ item.userName }}</div>
                                                    </div>
                                                    <div class="summary">{{ item.describe }}</div>
                                                </div>
                                            </nuxt-link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 我关注的人 -->
                            <div class="media-area">
                                <div class="index-title">
                                    <div class="wrap-title">
                                        <div class="title2">我关注的人</div>
                                        <div class="more MengWaShowSwiper2">
                                            <div class="more-arrow prev" style="cursor:pointer"></div>
                                            <div class="more-arrow next" style="cursor:pointer"></div>
                                        </div>
                                    </div>
                                </div>
                                <div v-swiper:MengBaoVideoFocusPeopleSwiper="MengWaShowFocusPeopleSwiperOption">
                                    <div class="swiper-wrapper">
                                        <template v-if="!MyFocusMengwaLists.body.list.length">
                                            <img src="/list-holder.jpg" style="display: block;margin: auto; margin-top: 100px;" />
                                        </template>
                                        <div class="swiper-slide focus-people" v-for="(item, index) in MyFocusMengwaLists.body.list" :key="index">
                                            <div class="inner-wrap">
                                                <div class="img">
                                                    <img :src="item.icon || '/default-head-thumbnail.png'" />
                                                </div>
                                                <div class="name">{{ item.babyName }}</div>
                                                <div class="status">已关注</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="row focus-people">
                                    <div
                                        class="col col2-pc-4"
                                        v-for="(item,
                                        index) in MyFocusMengwaLists.body.list"
                                        :key="index"
                                    >
                                        <div class="inner-wrap">
                                            <div class="img">
                                                <img :src="item.icon" />
                                            </div>
                                            <div class="name">
                                                {{ item.babyName }}
                                            </div>
                                            <div class="status">已关注</div>
                                        </div>
                                    </div>
                                </div>-->
                            </div>
                        </div>

                        <!-- 媒体区域 - 粉丝 -->
                        <div class="panel" v-show="isTab === 'tab3'">
                            <div class="media-area">
                                <div class="index-title">
                                    <div class="wrap-title">
                                        <div class="title2">我的粉丝</div>
                                    </div>
                                </div>
                                <div class="row focus-people">
                                    <template v-if="!MyFansLists.body.list.length">
                                        <img src="/list-holder.jpg" style="display: block;margin: auto; margin-top: 100px;" />
                                    </template>
                                    <div class="col col2-pc-4" v-for="(item, index) in MyFansLists.body.list" :key="index">
                                        <div class="inner-wrap">
                                            <div class="img">
                                                <img :src="item.icon || '/default-head-thumbnail.png'" />
                                            </div>
                                            <div class="name">{{ item.babyName }}</div>
                                            <div class="status">已关注</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                category: ''
            },
            menu: {
                isActive: 'user-mengwa-show'
            },
            // 当前tab值
            isTab: 'tab2',
            // 公用swiper参数
            swiperOption: {
                slidesPerView: '6',
                slidesPerColumn: '2',
                spaceBetween: 20,
                // slidesPerColumnFill: "row",
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true
                },
                breakpoints: {
                    //当宽度大于等于320
                    // 320: {
                    //     slidesPerView: 1
                    // },
                    //当宽度大于等于480
                    // 768: {
                    //     slidesPerView: 2
                    // },
                    //当宽度大于等于640
                    // 1080: {
                    //     slidesPerView: 4
                    // },
                    //当宽度大于等于640
                    // 1200: {
                    //     slidesPerView: 6
                    // },
                    // 1440: {
                    //     slidesPerView: 8
                    // }
                }
            }
        };
    },
    computed: {
        // 萌娃秀 - 滑动参数
        MengWaShowSwiperOption() {
            let json = JSON.parse(JSON.stringify(this.swiperOption));
            json.spaceBetween = 10;
            json.navigation = {
                nextEl: '.MengWaShowSwiper .next',
                prevEl: '.MengWaShowSwiper .prev'
            };

            return json;
        },
        MengWaShowFocusSwiperOption() {
            let json = JSON.parse(JSON.stringify(this.swiperOption));
            json.spaceBetween = 10;
            json.navigation = {
                nextEl: '.MengWaShowFocusSwiper .next',
                prevEl: '.MengWaShowFocusSwiper .prev'
            };

            return json;
        },
        // 萌娃秀 - 滑动参数
        MengWaShowFocusPeopleSwiperOption() {
            let json = JSON.parse(JSON.stringify(this.swiperOption));
            json.spaceBetween = 10;
            json.slidesPerColumn = 1;
            json.navigation = {
                nextEl: '.MengWaShowSwiper2 .next',
                prevEl: '.MengWaShowSwiper2 .prev'
            };

            return json;
        }
    },
    components: {
        Toper,
        Slide,
        Subject,
        Footer,
        UserMenu
    },
    async asyncData(context) {
        let res = {};
        // 萌娃秀
        let MengBaoVideo = await axios({
            url: context.app.$domain + '/mkt/getChoiceWorks',
            method: 'post',
            headers: {
                token: context.store.state.session.token || ''
            },
            data: {
                pageNum: 1,
                pageSize: 20,
                userId: context.store.state.session.userId
            }
        });
        res.MengBaoVideo = MengBaoVideo.data;

        // 萌娃秀2
        let MengBaoVideo2 = await axios({
            url: context.app.$domain + '/mkt/getChoiceWorks',
            method: 'post',
            headers: {
                token: context.store.state.session.token || ''
            },
            data: {
                pageNum: 1,
                pageSize: 20,
                userId: context.store.state.session.userId
            }
        });
        res.MengBaoVideo2 = MengBaoVideo2.data;

        // 我关注的萌娃秀
        let MyFocusLists = await axios({
            url: context.app.$domain + '/act/actWorks/getFocusWorksList',
            method: 'post',
            headers: {
                token: context.store.state.session.token || ''
            },
            data: {
                pageNum: 1,
                pageSize: 20,
                userId: context.store.state.session.userId
            }
        });
        // pageCount
        res.MyFocusLists = MyFocusLists.data;

        // 我的萌娃秀
        let MyMengwaLists = await axios({
            url: context.app.$domain + '/act/actWorks/getMyWorksList',
            method: 'post',
            headers: {
                token: context.store.state.session.token || ''
            },
            data: {
                pageNum: 1,
                pageSize: 20,
                order: 1,
                type: 1,
                userId: context.store.state.session.userId
            }
        });
        res.MyMengwaLists = MyMengwaLists.data;

        // 我的粉丝
        let MyFansLists = await axios({
            url: context.app.$domain + '/urm/getFansList',
            method: 'post',
            headers: {
                token: context.store.state.session.token || ''
            },
            data: {
                pageNum: 1,
                pageSize: 20,
                userId: context.store.state.session.userId
            }
        });
        res.MyFansLists = MyFansLists.data;

        // 我关注的人
        let MyFocusMengwaLists = await axios({
            url: context.app.$domain + '/urm/getFollowList',
            method: 'post',
            headers: {
                token: context.store.state.session.token || ''
            },
            data: {
                pageNum: 1,
                pageSize: 20,
                userId: context.store.state.session.userId
            }
        });
        res.MyFocusMengwaLists = MyFocusMengwaLists.data;
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
        }
    }
};
</script>
<style lang="scss" scoped>
// 标题2
.title2 {
    font-size: 20px;
}
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

// 切换
.switch {
    display: flex;
    margin: 30px 0;
    font-size: 24px;
    align-items: center;
    .tab {
        flex: 0 0 auto;
        padding: 0 10px;
        margin-right: 20px;
        padding-bottom: 6px;
        cursor: pointer;
        &.active {
            border-bottom: 4px solid #00adef;
        }
    }
}

// 我关注的人
.focus-people {
    // .col {
    //     height: 4rem;
    //     padding: 10px;
    .col {
        margin-right: 20px;
        margin-bottom: 20px;
    }
    .inner-wrap {
        display: flex;
        height: 4rem;
        padding: 20px;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        // height: 100%;
        background-color: #eee;
        .img {
            height: 1rem;
            width: 1rem;
            background-color: #ddd;
            border-radius: 50%;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .name {
            height: 40px;
            line-height: 20px;
            overflow: hidden;
        }
        .status {
            height: 24px;
            line-height: 24px;
            border-radius: 6px;
            padding: 0 10px;
            color: #fff;
            background-color: #00adef;
        }
    }
    // }
}
</style>
