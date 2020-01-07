<template>
    <div class="container mall-storeHome">
        <!-- 头部 -->
        <Toper :toperParams="toperParams" ref="ToperComponent" />

        <!--        顶部店铺信息-->
        <div class="top-info-storeinfo-bg" v-if="!!storeInfoData">
            <div class="wrap">
                <div class="top-info-storeinfo-content-bg">
                    <div class="storeinfo-logo-name-bg">
                        <div class="storeinfo-logo-bg">
                            <img :src="storeInfoData.logoUrl" class="top-info-store-logo-img" alt="店铺logo" v-if="storeInfoData.logoUrl && storeInfoData.logoUrl.length > 0" />
                            <img src="../../static/default-placeholder-img.png" class="top-info-store-logo-img" alt="店铺logo" v-else />
                        </div>
                        <div class="storeinfo-name-bg">
                            <p class="store-name">
                                {{ storeInfoData.shopName }}&nbsp;<span class="store-tag" v-if="storeInfoData.tabText && storeInfoData.tabText.length > 0">{{ storeInfoData.tabText }}</span>
                            </p>
                            <p>
                                关注人数：<span>{{ storeInfoData.followCountVal }}</span>
                            </p>
                        </div>
                    </div>
                    <nuxt-link target="_blank" to="" class="storeinfo-follow-btn-bg" @click.native="followOrCancelFollowStore">
                        <p :class="storeInfoData.followed ? 'active' : ''">{{ storeInfoData.followed ? '已关注' : '加关注' }}</p>
                    </nuxt-link>
                </div>
            </div>
        </div>

        <!--        店铺商品信息-->
        <div class="store-allgoods-bg">
            <div class="wrap">
                <div class="store-allgoods-content-bg">
                    <!--                    热卖商品-->
                    <div class="store-allgoods-content-item-bg row" v-if="storeHotGoodsList.length > 0">
                        <div class="allgoods-content-title-bg">
                            <p>热卖商品</p>
                        </div>
                        <div class="allgoods-content-item-bg col col-pc-2 col-pad-12 col-mobile-12" v-for="(item, index) in storeHotGoodsList" :key="index">
                            <nuxt-link target="_blank" :to="'/goods-detail/' + item.mallGoodsId" class="item-goods-content-bg">
                                <div
                                    class="goods-logo-img-bg"
                                    :style="{
                                        backgroundImage: 'url(' + item.mallGoodsEspImg + ')'
                                    }"
                                ></div>
                                <div class="goods-title-price-bg">
                                    <p class="goods-title">
                                        {{ item.mallGoodsName }}
                                    </p>
                                    <div class="goods-price-bg">
                                        <p class="goods-current-price">￥{{ item.perPrice }}</p>
                                        <p class="goods-orgin-price">￥{{ item.oriPrice }}</p>
                                    </div>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    <!--                    商品橱窗-->
                    <div class="store-allgoods-content-item-bg row" v-if="storeGoodsWindowList.length > 0">
                        <div class="allgoods-content-title-bg">
                            <p>商品橱窗</p>
                        </div>
                        <div class="allgoods-content-item-bg col col-pc-2 col-pad-12 col-mobile-12" v-for="(item, index) in storeGoodsWindowList" :key="index">
                            <nuxt-link target="_blank" :to="'/play-meng/' + item.videoId" class="item-goods-content-bg">
                                <div class="goods-logo-img-bg" :style="{ backgroundImage: 'url(' + item.mallGoodsEspImg + ')' }">
                                    <div class="goods-logo-bigplay-img-bg">
                                        <img src="../../static/shop/mall-goods-big-watchvideo.png" class="goods-logo-bigplay-img" alt="大播放图片" />
                                    </div>
                                </div>
                                <div class="goods-title-price-bg">
                                    <p class="goods-title">
                                        {{ item.mallGoodsName }}
                                    </p>
                                    <div class="goods-price-row-bg">
                                        <p class="video-goods-current-price">￥{{ item.perPrice }}</p>
                                        <div class="watch-video-text-bg">
                                            <img src="../../static/shop/mall-goods-watchvideo.png" class="goods-watch-video-img" alt="商品橱窗看视频" />
                                            <p>看视频</p>
                                        </div>
                                    </div>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    <!--                    优惠活动-->
                    <div class="store-allgoods-content-item-bg row" v-if="storeActivityGoodsList.length > 0">
                        <div class="allgoods-content-title-bg">
                            <p>优惠活动</p>
                        </div>
                        <div class="allgoods-content-item-bg col col-pc-2 col-pad-12 col-mobile-12" v-for="(item, index) in storeActivityGoodsList" :key="index">
                            <nuxt-link target="_blank" :to="'/goods-detail/' + item.mallGoodsId" class="item-goods-content-bg">
                                <div
                                    class="goods-logo-img-bg"
                                    :style="{
                                        backgroundImage: 'url(' + item.mallGoodsEspImg + ')'
                                    }"
                                ></div>
                                <div class="goods-title-price-bg">
                                    {{'ddd:' + item.mallGoodsEspImg}}
                                    <p class="goods-title">
                                        {{ item.mallGoodsName }}
                                    </p>
                                    <div class="goods-price-bg">
                                        <p class="goods-current-price">￥{{ item.perPrice }}</p>
                                        <p class="goods-orgin-price">￥{{ item.oriPrice }}</p>
                                    </div>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    <!--                    全部商品-->
                    <div class="store-allgoods-content-item-bg row" v-if="storeAllGoodsList.length > 0">
                        <div class="allgoods-content-title-bg">
                            <p>全部商品</p>
                        </div>
                        <div class="allgoods-content-item-bg col col-pc-2 col-pad-12 col-mobile-12" v-for="(item, index) in storeAllGoodsList" :key="index">
                            <nuxt-link target="_blank" :to="'/goods-detail/' + item.mallGoodsId" class="item-goods-content-bg">
                                <div
                                    class="goods-logo-img-bg"
                                    :style="{
                                        backgroundImage: 'url(' + item.mallGoodsEspImg + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                    }"
                                ></div>
                                <div class="goods-title-price-bg" >
                                    <p class="goods-title">
                                        {{ item.mallGoodsName }}
                                    </p>
                                    <div class="goods-price-bg">
                                        <p class="goods-current-price">￥{{ item.perPrice }}</p>
                                        <p class="goods-orgin-price">￥{{ item.oriPrice }}</p>
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
            toperParams: {
                backgroundColor: 'white',
                category: 'maiji-shop'
            },
            storeId: '',
            storeInfoData: null,
            storeHotGoodsList: [],
            storeGoodsWindowList: [],
            storeActivityGoodsList: [],
            storeAllGoodsList: []
        };
    },
    computed: {},
    created() {
        this.storeId = this.$route.params.id;
        if (this.storeId && this.storeId.length > 0) {
            this.pageInitRequestData();
        }
    },
    beforeMount() {},
    activated() {},
    mounted() {},
    components: {
        Toper,
        Slide,
        Subject,
        Footer
    },
    methods: {
        async pageInitRequestData() {
            let resultData = await axios({
                url: this.$domain + '/mer/getChantInfo',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                },
                data: {
                    chantId: this.storeId
                }
            });
            if (resultData && resultData.data && resultData.data.body && resultData.data.body.shopInfo) {
                let storeInfoData = resultData.data.body.shopInfo;
                this.storeInfoData = storeInfoData;
                this.updateStoreFollowCount(storeInfoData.followCount);
            }

            this.pageInitRequestStoreHomeData();
            this.pageInitRequestStoreActivityGoodsData();
            this.pageInitRequestStoreAllGoodsData();
        },
        updateStoreFollowCount(followCount) {
            if (Number(followCount) > 10000.0) {
                this.storeInfoData.followCountVal = (Number(followCount) / 10000.0).toFixed(1) + '万';
            } else {
                this.storeInfoData.followCountVal = followCount;
            }
        },
        async followOrCancelFollowStore() {
            let requestToken = this.$store.state.session.token;
            if (requestToken && requestToken.length > 0) {
                let resultData = await axios({
                    url: this.$domain + '/mer/followChant',
                    method: 'post',
                    headers: {
                        token: this.$store.state.session.token || ''
                    },
                    data: {
                        chantId: this.storeId
                    }
                });
                if (resultData && resultData.data && resultData.data.body && resultData.data.body.code && resultData.data.body.code === '0') {
                    this.storeInfoData.followed = resultData.data.body.follow;
                    let followCount = this.storeInfoData.followed ? ++this.storeInfoData.followCount : --this.storeInfoData.followCount;
                    this.updateStoreFollowCount(followCount);
                    $.message({
                        message: resultData.data.body.msg,
                        type: 'success'
                    });
                } else {
                    $.message({
                        message: resultData.data.msgInfo,
                        type: 'error'
                    });
                }
            } else {
                let ToperComponent = this.$refs['ToperComponent'];
                ToperComponent.loginAndRegisterParams.isShow = true;
            }
        },
        async pageInitRequestStoreHomeData() {
            let resultData = await axios({
                url: this.$domain + '/mer/getChantHome',
                method: 'post',
                data: {
                    chantId: this.storeId
                }
            });
            if (resultData && resultData.data && resultData.data.body) {
                if (resultData.data.body.hotGoodsList && resultData.data.body.hotGoodsList.length > 0) {
                    this.storeHotGoodsList = resultData.data.body.hotGoodsList;
                }
                if (resultData.data.body.goodsWindowList && resultData.data.body.goodsWindowList.length > 0) {
                    this.storeGoodsWindowList = resultData.data.body.goodsWindowList;
                }
            }
        },
        async pageInitRequestStoreActivityGoodsData() {
            let resultData = await axios({
                url: this.$domain + '/mer/getChantFullReductionActivity',
                method: 'post',
                data: {
                    chantId: this.storeId
                }
            });
            if (resultData && resultData.data && resultData.data.body && resultData.data.body.activityData && resultData.data.body.activityData.list && resultData.data.body.activityData.list.length > 0) {
                this.storeActivityGoodsList = resultData.data.body.activityData.list;
            }
        },
        async pageInitRequestStoreAllGoodsData() {
            let resultData = await axios({
                url: this.$domain + '/mer/getChantGoods',
                method: 'post',
                data: {
                    chantId: this.storeId,
                    sort: '0',
                    pageNum: '1',
                    pageSize: '10000'
                }
            });
            if (resultData && resultData.data && resultData.data.body && resultData.data.body.list && resultData.data.body.list.length > 0) {
                this.storeAllGoodsList = resultData.data.body.list;
            }
        }
    },
    destroyed() {}
};
</script>
