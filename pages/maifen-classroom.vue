<template>
    <div class="container">
        <Toper :toperParams="toperParams" />

        <!-- 轮播图 -->
        <Slide :AlbumRank="AlbumRank" />

        <!-- 独家放送 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="parent-child" class="title">独家放送</nuxt-link>
                            <div class="pinyin">dú jiā fàng sòng</div>
                        </div>
                        <nuxt-link target="_blank" to="video-filter" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div v-swiper:Swiper1="swiperOption1">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide cursor" v-for="(item, index) in res1.allAdvList" :key="index" @click="play(item)">
                            <div class="media-type-3 media-type-3-nopadding">
                                <div class="inner-wrap">
                                    <div
                                        class="cover cover222"
                                        :class="{ active222: cover222 }"
                                        :style="{
                                            backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_480/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="name-text">
                                        {{ item.title }}
                                    </div>
                                    <div class="summary-text">
                                        {{ item.descript }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 当季主打 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="parent-child" class="title">当季主打</nuxt-link>
                            <div class="pinyin">dāng jì zhǔ dǎ</div>
                        </div>
                        <nuxt-link target="_blank" to="video-filter" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div v-swiper:Swiper2="swiperOption1">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in res2.allAdvList" :key="index" @click="play(item)">
                            <div :to="'/play/' + item.itemId" class="media-type-3 cursor" style="width:100%;padding:0;">
                                <div class="inner-wrap">
                                    <div
                                        class="cover cover222"
                                        :class="{ active222: cover222 }"
                                        :style="{
                                            backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_480/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="name-text">
                                        {{ item.title }}
                                    </div>
                                    <div class="summary-text">
                                        {{ item.descript }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 儿童故事 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="title">儿童故事</div>
                        <div class="section">
                            <div class="pinyin">ér tóng gù shì</div>
                        </div>
                        <div class="more res3Swiper">
                            <div class="more-arrow prev"></div>
                            <div class="more-arrow next"></div>
                        </div>
                    </div>
                </div>
                <div v-swiper:res3Swiper="res3Option" v-show="res3.allAdvList.length > 0">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in res3.allAdvList" :key="index" @click="play(item)">
                            <div class="media-type-1 cursor">
                                <div class="inner-wrap">
                                    <div
                                        class="cover cover222"
                                        :class="{ active222: cover222 }"
                                        :style="{
                                            backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="name">{{ item.title }}</div>
                                    <div class="summary">{{ item.descript }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="no-data" v-show="res3.allAdvList.length <= 0">
                    暂无数据
                </div>
            </div>
        </div>

        <!-- 国学经典 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="title">国学经典</div>
                        <div class="section">
                            <div class="pinyin">guó xué jīng diǎn</div>
                        </div>
                        <div class="more res4Swiper">
                            <div class="more-arrow prev"></div>
                            <div class="more-arrow next"></div>
                        </div>
                    </div>
                </div>
                <div v-swiper:res4Swiper="res4Option" v-show="res4.allAdvList.length > 0">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in res4.allAdvList" :key="index" @click="play(item)">
                            <div class="media-type-1 cursor">
                                <div class="inner-wrap">
                                    <div
                                        class="cover cover222"
                                        :class="{ active222: cover222 }"
                                        :style="{
                                            backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="name">{{ item.title }}</div>
                                    <div class="summary">{{ item.descript }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="no-data" v-show="res4.allAdvList.length <= 0">
                    暂无数据
                </div>
            </div>
        </div>

        <!-- 百科知识 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="title">百科知识</div>
                        <div class="section">
                            <div class="pinyin">bǎi kē zhī shí</div>
                        </div>
                        <div class="more res5Swiper">
                            <div class="more-arrow prev"></div>
                            <div class="more-arrow next"></div>
                        </div>
                    </div>
                </div>
                <div v-swiper:res5Swiper="res5Option" v-show="res5.allAdvList.length > 0">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in res5.allAdvList" :key="index" @click="play(item)">
                            <div class="media-type-1 cursor">
                                <div class="inner-wrap">
                                    <div
                                        class="cover cover222"
                                        :class="{ active222: cover222 }"
                                        :style="{
                                            backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="name">{{ item.title }}</div>
                                    <div class="summary">{{ item.descript }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="no-data" v-show="res5.allAdvList.length <= 0">
                    暂无数据
                </div>
            </div>
        </div>

        <!-- 音乐教室 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="title">音乐教室</div>
                        <div class="section">
                            <div class="pinyin">yīn yuè jiào shì</div>
                        </div>
                        <div class="more res6Swiper">
                            <div class="more-arrow prev"></div>
                            <div class="more-arrow next"></div>
                        </div>
                    </div>
                </div>
                <div v-swiper:res6Swiper="res6Option" v-show="res6.allAdvList.length > 0">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in res6.allAdvList" :key="index" @click="play(item)">
                            <div class="media-type-1 cursor">
                                <div class="inner-wrap">
                                    <div
                                        class="cover cover222"
                                        :class="{ active222: cover222 }"
                                        :style="{
                                            backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="name">{{ item.title }}</div>
                                    <div class="summary">{{ item.descript }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="no-data" v-show="res6.allAdvList.length <= 0">
                    暂无数据
                </div>
            </div>
        </div>

        <!-- 更多发现 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="parent-child" class="title">更多发现</nuxt-link>
                            <div class="pinyin">gèng duō fā xiàn</div>
                        </div>
                        <nuxt-link target="_blank" to="video-filter" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div v-swiper:res7Swiper="res7Option">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in res7.allAdvList" :key="index" @click="play(item)">
                            <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="media-type-3 media-type-3-content" style="padding:0;">
                                <div class="inner-wrap">
                                    <div
                                        class="cover cover222"
                                        :class="{ active222: cover222 }"
                                        :style="{
                                            backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_480/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="name-text">
                                        {{ item.title }}
                                    </div>
                                    <div class="summary-text">
                                        {{ item.descript }}
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
            // 大图闪现处理
            cover222: false,
            // 高亮导航
            isNav: 'maifen-classroom',
            // 顶部参数
            toperParams: {
                backgroundColor: 'white',
                category: 'maiji-classroom'
            },
            swiperOption1: {
                slidesPerView: '4',
                spaceBetween: 18
            },
            res7Option: {
                slidesPerView: '4',
                spaceBetween: 18
            },
            swiperOption: {
                slidesPerView: '8',
                slidesPerColumn: '1',
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
            }
        };
    },
    components: {
        Toper,
        Slide,
        Subject,
        Footer
    },
    async asyncData(context) {
        // 初始化变量
        let that = context.app;
        let res = {};

        // 排行榜
        res.AlbumRank = await that.$getRecObjectList({
            pageNum: 1,
            pageSize: 8,
            recPosition: 'fd53dd59ec564f1a9dd5f0a1dddc664b'
        });

        // 独家放送
        res.res1 = await that.$getRecObjectList({
            pageSize: 7,
            pageNum: 1,
            recPosition: '0d06df0b1ae54afbb62b64611db38af9'
        });

        // 当季主打
        res.res2 = await that.$getRecObjectList({
            pageNum: 1,
            pageSize: 7,
            recPosition: '96b22432df7e4ad38291136f5e84aabf'
        });

        // 儿童故事
        res.res3 = await that.$getRecObjectList({
            pageNum: 1,
            pageSize: 20,
            recPosition: '51a9f229693b485982b99b8225808a92'
        });

        // 国学经典
        res.res4 = await that.$getRecObjectList({
            pageNum: 1,
            pageSize: 20,
            recPosition: '96164683fba5481c83f5144b4137f1c0'
        });

        // 百科知识
        res.res5 = await that.$getRecObjectList({
            pageNum: 1,
            pageSize: 20,
            recPosition: '7959996d6e484208a43350c254a82656'
        });

        // 音乐教室
        res.res6 = await that.$getRecObjectList({
            pageNum: 1,
            pageSize: 20,
            recPosition: '6d168df541504cccbeaae4bdd559b4e8'
        });

        // 更多发现
        res.res7 = await that.$getRecObjectList({
            pageNum: 1,
            pageSize: 20,
            recPosition: 'ad707167dc0f4a2cae5a388a506ba063'
        });

        return res;
    },
    computed: {
        res3Option() {
            let json = JSON.parse(JSON.stringify(this.swiperOption));
            json.navigation = {
                nextEl: '.res3Swiper .next',
                prevEl: '.res3Swiper .prev'
            };

            return json;
        },
        res4Option() {
            let json = JSON.parse(JSON.stringify(this.swiperOption));
            json.navigation = {
                nextEl: '.res4Swiper .next',
                prevEl: '.res4Swiper .prev'
            };

            return json;
        },
        res5Option() {
            let json = JSON.parse(JSON.stringify(this.swiperOption));
            json.navigation = {
                nextEl: '.res5Swiper .next',
                prevEl: '.res5Swiper .prev'
            };

            return json;
        },
        res6Option() {
            let json = JSON.parse(JSON.stringify(this.swiperOption));
            json.navigation = {
                nextEl: '.res6Swiper .next',
                prevEl: '.res6Swiper .prev'
            };

            return json;
        }
    },
    methods: {
        play(item) {
            this.$router.push('/play-course/' + item.itemId);
        }
    },
    mounted() {
        setTimeout(() => {
            this.cover222 = true;
        }, 300);
    }
};
</script>
