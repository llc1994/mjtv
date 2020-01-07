<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <!-- 轮播图 -->
        <Slide :AlbumRank="AlbumRank" :Play="Play" />

        <!-- 萌娃秀 -->
        <div class="media-area" id="mengWaShow">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <nuxt-link target="_blank" to="parent-child" class="title">萌娃秀</nuxt-link>
                        <div class="section">
                            <div class="section">
                                <div class="pinyin">méng wá xiù</div>
                                <div
                                    class="tag"
                                    :class="{
                                        active: index === MengWaShowSwitch.index
                                    }"
                                    v-for="(item, index) in MengWaShowSwitch.list"
                                    :key="index"
                                    @click="TabSwitchOfMengWaShow(item, index)"
                                >
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                        <div class="more MengWaShowSwiper">
                            <div class="more-arrow prev"></div>
                            <div class="more-arrow next"></div>
                        </div>
                    </div>
                </div>
                <div v-swiper:MengBaoVideoSwiper="MengWaShowSwiperOption" v-show="MengWaShow.length > 0">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in MengWaShow" :key="index">
                            <div class="media-type-5" >
                                <div class="inner-wrap">
                                    <nuxt-link
                                        class="cover cover222"
                                         target="_blank"
                                        :class="{active222:cover222}"
                                        :to="'/play-meng/' + item.worksId"
                                        :style="{
                                            backgroundImage: 'url(' + item.resourceUrl + '?x-oss-process=image/resize,h_480/format,jpeg/quality,Q_90)'
                                        }"
                                    >
                                        <div class="tips" style="color:#fff;">
                                            <span class="like"></span>
                                            {{ item.likes }}
                                        </div>
                                    </nuxt-link>
                                    <nuxt-link class="info" :to="{path:'/user-info',query:{associatedId:item.userId}}">
                                        <div
                                            class="head"
                                            :style="{
                                                backgroundImage: 'url(' + item.userIcon + ')'
                                            }"
                                        ></div>
                                        <div class="name">{{ item.userName }}</div>
                                    </nuxt-link>
                                    <div class="summary">{{ item.describe }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="no-data" v-show="MengWaShow.length <= 0">暂无视频</div>
            </div>
        </div>

        <!-- 萌娃购 -->
        <div class="media-area" id="mengWaGou">
            <div class="wrap">
                <div class="index-title">
                    <div class="wrap-title">
                        <nuxt-link target="_blank" to="parent-child" class="title">萌娃购</nuxt-link>
                        <div class="section">
                            <div class="section">
                                <div class="pinyin">méng wá gòu</div>
                            </div>
                        </div>
                        <div class="more MengWaGoSwiper">
                            <div class="more-arrow prev"></div>
                            <div class="more-arrow next"></div>
                        </div>
                    </div>
                </div>
                <div v-swiper:MengBaoVideo2Swiper="MengWaGoSwiperOption">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in MengWaGou" :key="index">
                            <div class="media-type-5" >
                                <div class="inner-wrap">
                                    <nuxt-link
                                        class="cover cover222"
                                         target="_blank"
                                        :class="{active222:cover222}"
                                        :to="'/play-meng/' + item.worksId"
                                        :style="{
                                            backgroundImage: 'url(' + item.resourceUrl + ')'
                                        }"
                                    >
                                        <div class="tips" style="color:#fff;">
                                            {{ item.likes }}
                                        </div>
                                    </nuxt-link>
                                    <nuxt-link class="info" :to="{path:'/user-info',query:{associatedId:item.userId}}">
                                        <div class="head" :style="{
                                            backgroundImage: 'url(' + item.userIcon + ')'
                                        }">
                                        </div>
                                        <div class="name">
                                            {{ item.userName }}
                                        </div>
                                    </nuxt-link>
                                    <div class="summary">
                                        {{ item.describe }}
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
import Slide2 from '~/components/Slide2.vue';
import Subject from '~/components/Subject.vue';
import axios from 'axios';
export default {
    data() {
        return {
            cover222:false,
            isNav: 'meng-bao-video',
            Play: 'meng-act',
            toperParams: {
                backgroundColor: 'white',
                category: 'meng-bao-video'
            },
            swiperOption: {
                slidesPerView: '8',
                slidesPerColumn: '2',
                spaceBetween: 18,
                slidesPerColumnFill: 'row',
                observer: true,
                observeParents: true,
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true
                },
                breakpoints: {
                    //当宽度大于等于320
                    320: {
                        slidesPerView: 1
                    },
                    //当宽度大于等于480
                    768: {
                        slidesPerView: 2
                    },
                    //当宽度大于等于640
                    1080: {
                        slidesPerView: 4
                    },
                    //当宽度大于等于640
                    1200: {
                        slidesPerView: 6
                    },
                    1440: {
                        slidesPerView: 8
                    }
                }
            },
            // 萌娃秀 - tab切换
            MengWaShowSwitch: {
                index: 0,
                list: [
                    {
                        name: '精选',
                        token: ''
                    },
                    {
                        name: '最新',
                        token: ''
                    }
                ]
            },
            // 萌娃购 - tab切换
            MengWaGoSwitch: {
                index: 0,
                list: [
                    {
                        name: '全部',
                        token: ''
                    },
                    {
                        name: '最新',
                        token: ''
                    },
                    {
                        name: '最热',
                        token: ''
                    }
                ]
            }
        };
    },
    computed: {
        // 萌娃秀 - 滑动参数
        MengWaShowSwiperOption() {
            let json = JSON.parse(JSON.stringify(this.swiperOption));
            json.spaceBetween = 18;
            json.navigation = {
                nextEl: '.MengWaShowSwiper .next',
                prevEl: '.MengWaShowSwiper .prev'
            };

            return json;
        },
        // 萌娃购 - 滑动参数
        MengWaGoSwiperOption() {
            let json = JSON.parse(JSON.stringify(this.swiperOption));
            json.navigation = {
                nextEl: '.MengWaGoSwiper .next',
                prevEl: '.MengWaGoSwiper .prev'
            };

            return json;
        }
    },
    components: {
        Toper,
        Slide,
        Slide2,
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
            recPosition: 'a7dbee3ddcdf4d5cb24b1f38cc500b91'
        });

        // 萌娃秀
        res.MengWaShow = await that.$mktGetChoiceWorks({
            pageNum: 1,
            pageSize: 20,
            userId: context.store.state.session.userId
        });

        // 萌娃购
        res.MengWaGou = await that.$mktGetChoiceWorks({
            pageNum: 1,
            pageSize: 20,
            type:4,
            userId: context.store.state.session.userId
        });
        return res;
    },

    methods: {
        // 萌娃秀
        async TabSwitchOfMengWaShow(item, index) {
            this.MengWaShowSwitch.index = index;

            // 精选
            if (index === 0) {
                this.MengWaShow = await that.$mktGetChoiceWorks({
                    pageNum: 1,
                    pageSize: 20,
                });
                return;
            }

            // 最新
            if (index === 1) {
                this.MengWaShow = await that.getNewWorksList({
                    pageNum: 1,
                    pageSize: 20
                });
                return;
            }

            // 默认
            this.MengWaShow = []
        },
        async TabSwitchOfMengWaGo(item, index) {
            this.MengWaGoSwitch.index = index;
            if (index === 0) {
                this.MengWaGou = await that.$mktGetChoiceWorks({
                    pageNum: 1,
                    pageSize: 20,
                });
            } else {
                this.MengWaGou = []
            }
        }
    },
    mounted(){
        var hash = location.hash;
        // mengWaShow(萌娃秀) mengWaGou(萌娃购)
        if(hash === '#mengWaShow'){
            if($(hash).offset()){
                $('html, body').animate({scrollTop: $(hash).offset().top - 80}, 1000)
            }
        }
        setTimeout(() => {
            if(hash === '#mengWaGou'){
                if($(hash).offset()){
                    $('html, body').animate({scrollTop: $(hash).offset().top - 80}, 500)
                }
            }
        },500)

        setTimeout(() => {
            this.cover222 = true
        },300)
    }
};
</script>
