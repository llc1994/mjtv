<template>
    <div class="container">
        <Toper :toperParams="toperParams" />

        <!-- 轮播图 -->
        <Slide :AlbumRank="AlbumRank" :Play="Play" />

        <!-- 精选推荐 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <div to="parent-child" class="title">精选推荐</div>
                            <div class="pinyin">jīng xuǎn tuī jiàn</div>
                        </div>
                        <nuxt-link target="_blank" to="video-filter" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>

                <!-- 精选推荐 -->
                <div v-swiper:res1Swiper="swiperOption">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in res1.allAdvList" :key="index">
                            <nuxt-link target="_blank" :to="'/play-cartoon/' + item.itemId" class="media-type-1">
                                <div class="inner-wrap">
                                    <div
                                        class="cover cover222"
                                        :class="{ active222: cover222 }"
                                        :style="{
                                            backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    >
                                        <div class="tips">
                                            {{ item.my_title_one }}
                                        </div>
                                    </div>
                                    <div class="name">
                                        {{ item.descript }}
                                    </div>
                                    <div class="summary">
                                        {{ item.title }}
                                    </div>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 特色专辑 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <div to="parent-child" class="title">特色专辑</div>
                            <div class="pinyin">tè sè zhuān jí</div>
                        </div>
                        <nuxt-link target="_blank" to="video-filter" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div v-swiper:res2Swiper="swiperOption2">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in res2.allAdvList" :key="index">
                            <nuxt-link target="_blank" :to="'/play-cartoon/' + item.itemId" class="media-type-1">
                                <div class="inner-wrap">
                                    <div
                                        class="cover cover222"
                                        :class="{ active222: cover222 }"
                                        :style="{
                                            backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    >
                                        <div class="tips">
                                            {{ item.my_title_one }}
                                        </div>
                                    </div>
                                    <div class="name">
                                        {{ item.title }}
                                    </div>
                                    <div class="summary">
                                        {{ item.descript }}
                                    </div>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 无名 -->
        <div class="media-area" style="margin-top: 10px;">
            <div class="wrap row">
                <nuxt-link target="_blank" :to="'/play-cartoon/' + item.itemId" class="media-type-4 media-type-4-space-right col col-pc-6 col-pad-6 col-mobile-12" :class="index % 2 !== 0 ? 'media-type-4-space-left' : ''" v-for="(item, index) in HotActive.allAdvList" :key="index">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(' + item.customImgUrl + ')'
                            }"
                        ></div>
                    </div>
                </nuxt-link>
            </div>
        </div>

        <!-- 最新上新 -->
        <div class="media-area gg4" style="margin-top:20px;">
            <div class="wrap row" style="margin-right:-18px;">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <div to="parent-child" class="title">最新上新</div>
                            <div class="pinyin">zuì xīn shàng xīn</div>
                        </div>
                        <nuxt-link target="_blank" to="video-filter" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <nuxt-link target="_blank" :to="'/play-cartoon/' + item.itemId" class="media-type-3 col col-pc-3 col-pad-4 col-mobile-6" :class="'xx' + (index + 1)" v-for="(item, index) in res3.allAdvList" :key="index">
                    <div class="inner-wrap">
                        <div
                            class="cover cover222"
                            :class="{ active222: cover222 }"
                            :style="{
                                backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_480/format,jpeg/quality,Q_90)'
                            }"
                        ></div>
                        <div class="name">
                            {{ item.descript }}
                        </div>
                        <div class="summary">
                            {{ item.title }}
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>

        <!-- 动画电影 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <div to="parent-child" class="title">动画电影</div>
                            <div class="pinyin">dòng huà diàn yǐng</div>
                        </div>
                        <nuxt-link target="_blank" to="video-filter" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div v-swiper:res3Swiper="swiperOption2">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in res4.allAdvList" :key="index">
                            <nuxt-link target="_blank" :to="'/play-cartoon/' + item.itemId" class="media-type-1">
                                <div class="inner-wrap">
                                    <div
                                        class="cover cover222"
                                        :class="{ active222: cover222 }"
                                        :style="{
                                            backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    >
                                        <div class="tips">
                                            {{ item.my_title_one }}
                                        </div>
                                    </div>
                                    <div class="name">
                                        {{ item.descript }}
                                    </div>
                                    <div class="summary">
                                        {{ item.title }}
                                    </div>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 网络优质 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <div to="parent-child" class="title">网络优质</div>
                            <div class="pinyin">wǎng luò yōu zhì</div>
                        </div>
                        <nuxt-link target="_blank" to="video-filter" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div v-swiper:res4Swiper="swiperOption2">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in res5.allAdvList" :key="index">
                            <nuxt-link target="_blank" :to="'/play-cartoon/' + item.itemId" class="media-type-1">
                                <div class="inner-wrap">
                                    <div
                                        class="cover cover222"
                                        :class="{ active222: cover222 }"
                                        :style="{
                                            backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    >
                                        <div class="tips">
                                            {{ item.my_title_one }}
                                        </div>
                                    </div>
                                    <div class="name">
                                        {{ item.descript }}
                                    </div>
                                    <div class="summary">
                                        {{ item.title }}
                                    </div>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 热播排行榜 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <div to="parent-child" class="title">
                                热播排行榜
                            </div>
                            <div class="pinyin">rè bō pái háng bǎng</div>
                        </div>
                        <nuxt-link target="_blank" to="video-filter" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div v-swiper:res5Swiper="swiperOption2">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in res6.allAdvList" :key="index">
                            <nuxt-link target="_blank" :to="'/play-cartoon/' + item.itemId" class="media-type-1">
                                <div class="inner-wrap">
                                    <div
                                        class="cover cover222"
                                        :class="{ active222: cover222 }"
                                        :style="{
                                            backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    >
                                        <div class="tips">
                                            {{ item.my_title_one }}
                                        </div>
                                    </div>
                                    <div class="name">
                                        {{ item.descript }}
                                    </div>
                                    <div class="summary">
                                        {{ item.title }}
                                    </div>
                                </div>
                            </nuxt-link>
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
import axios from 'axios';
export default {
    data() {
        return {
            cover222: false,
            isNav: 'anime-cartoon',
            toperParams: {
                backgroundColor: 'white',
                category: 'anime-cartoon'
            },
            swiperOption: {
                slidesPerView: '8',
                slidesPerColumn: '2',
                slidesPerColumnFill: 'row',
                spaceBetween: 18,
                observer: true,
                observeParents: true,
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 2
                    },
                    1080: {
                        slidesPerView: 4
                    },
                    1200: {
                        slidesPerView: 6
                    },
                    1440: {
                        slidesPerView: 8
                    }
                }
            },
            swiperOption2: {
                slidesPerView: '8',
                slidesPerColumn: '1',
                spaceBetween: 18,
                observer: true,
                observeParents: true,
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 2
                    },
                    1080: {
                        slidesPerView: 4
                    },
                    1200: {
                        slidesPerView: 6
                    },
                    1440: {
                        slidesPerView: 8
                    }
                }
            },
            Play: 'play-cartoon'
        };
    },
    components: {
        Toper,
        Slide,
        Subject,
        Footer
    },
    async asyncData(context) {
        // 初始变量
        let that = context.app;
        let res = {};

        // 排行榜
        res.AlbumRank = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: '0dd51ebcd0d1451dbdedcfb82f1b032f'
        });

        // 精选推荐
        res.res1 = await that.$getRecObjectList({
            pageSize: 20,
            pageNum: 1,
            recPosition: '752536e8f9e547aeb9ec1db365a42176'
        });

        // 特色专辑
        res.res2 = await that.$getRecObjectList({
            pageSize: 20,
            pageNum: 1,
            recPosition: 'f2c1f9c6414a431ab489db95aa7c3a74'
        });

        // 最新上新
        res.res3 = await that.$getRecObjectList({
            pageSize: 20,
            pageNum: 1,
            recPosition: '44a8fe01c88d42dbac94c6ea7663d33a'
        });

        // 动画电影
        res.res4 = await that.$getRecObjectList({
            pageSize: 20,
            pageNum: 1,
            recPosition: '3d3db5ec8eda40c3afb3e66d2e16cf0b'
        });

        // 网络优质
        res.res5 = await that.$getRecObjectList({
            pageSize: 20,
            pageNum: 1,
            recPosition: 'c8968902972048169a9396329b3efc09'
        });

        // 热播排行
        res.res6 = await that.$getRecObjectList({
            pageSize: 20,
            pageNum: 1,
            recPosition: 'a2e28feb8ff74feda1588cfa6bb688da'
        });

        // 热门活动
        res.HotActive = await that.$getRecObjectList({
            pageSize: 2,
            pageNum: 1,
            recPosition: '2c6ac2ddaba9427d8d4d3357c93afb46'
        });

        // 最新上新
        res.ProgramInteraction = await that.$getRecObjectList({
            pageSize: 4,
            pageNum: 1,
            recPosition: 'e8f127f56ce54c62aa4702a9a30dbf99'
        });

        return res;
    },
    mounted() {
        // 大图闪现处理
        setTimeout(() => {
            this.cover222 = true;
        }, 300);
    }
};
</script>
