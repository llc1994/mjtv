<template>
    <div class="container maiji-shop">
        <!-- 头部 -->
        <Toper :toperParams="toperParams" />

        <!-- 分类导航 -->
        <div class="category-navigation">
            <div class="wrap">
                <!-- 左侧栏目列表 -->
                <div class="category-list">
                    <div class="big-title flex-center">热门分类</div>
                    <div class="list-box">
                        <div class="list" v-for="(item, index) in mallCategory" :key="index" @mouseenter="EnterCategory(item)" @mouseleave="LeaveCategory(item)">
                            <div v-if="item.smallCategoryList.length > 0">
                                <div class="title">{{ item.name }}</div>
                                <!-- <div class="sub-category">
                                {{ item.my_name }}
                                </div>-->
                                <span class="sub-category" v-for="(item2, index2) in item.smallCategoryList" :key="index2" @click="toSearchGoods(item2.name, item2.id)">{{ item2.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 右侧栏目主要区域 -->
                <div class="category-main">
                    <div class="search">
                        <img src="../static/shop/cart-info-text.png" alt="商城保证" />
                        <!--                        <div class="text">-->
                        <!--                            <div class="group">品质保障</div>-->
                        <!--                            <div class="group">假一赔十</div>-->
                        <!--                            <div class="group">售后无忧</div>-->
                        <!--                        </div>-->
                        <!-- 搜索盒子 -->
                        <div class="search-box">
                            <div class="input">
                                <input type="input" v-model="shopSearchGoodsName" placeholder="麦咭智能" @keyup.enter="shopSearchGoodsResultToName" />
                            </div>
                            <div class="button" @click="shopSearchGoodsResultToName">
                                <span class="iconfont icon-search"></span>
                            </div>
                        </div>
                    </div>
                    <div class="img" v-swiper:BannerSwiper="BannerSwiperOption">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide background-cover" v-for="(item, index) in mallBannerLists.allAdvList" :key="index">
                                <a target="_blank" :href="item.to" class style="width:100%;height:100%;">
                                    <img :src="item.customImgUrl" style="width:100%;height:100%; " />
                                </a>
                            </div>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 麦咭秒杀 -->
        <div class="maiji-seckill" v-if="SecKillLists.length > 0">
            <div class="wrap">
                <div class="panel">
                    <div class="index-title">
                        <div class="wrap-title">
                            <div class="section">
                                <div class="section">
                                    <div class="special-image">
                                        <img src="/shop/1.png" />
                                    </div>
                                    <div class="pinyin">xiàn shí miǎo shā</div>
                                    <div class="tag active">全部</div>
                                    <div class="tag">13:00即将开抢</div>
                                    <div class="tag">15:00</div>
                                    <div class="tag">17:00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="media-area row">
                        <div v-for="(item, index) in SecKillLists" :key="index">
                            <nuxt-link target="_blank" class="media-type-8 col col-pc-1-5 col-pad-4 col-mobile-6" :to="'/goods-detail/' + item2.goodsId" v-for="(item2, index2) in item.seckillRspDTOs" :key="index2">
                                <div class="box">
                                    <div
                                        class="cover background-center"
                                        :style="{
                                            backgroundImage: 'url(' + item2.seckillImg + '?x-oss-process=image/resize,h_320/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="title">{{ item2.name }}</div>
                                    <div class="price">
                                        <div class="new-price">￥{{ item2.seckillPrice }}</div>
                                        <div class="old-price">原价:￥{{ item2.oriPrice }}</div>
                                    </div>
                                    <div class="process-area">
                                        <div class="process">
                                            <div
                                                class="value"
                                                :style="{
                                                    width: item2.spikeProgress + '%'
                                                }"
                                            ></div>
                                        </div>
                                        <div class="number">已售{{ item2.spikeProgress }}%</div>
                                    </div>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 精选好店 -->
        <div class="maiji-seckill fx" id="jingpindianpu" v-if="HomeData.chantInfoRspList.length > 0">
            <div class="wrap">
                <div class="panel fx">
                    <div class="index-title">
                        <div class="wrap-title">
                            <!-- <nuxt-link target="_blank" to="parent-child" class="title"
                                >精选好店</nuxt-link
                            >-->
                            <div class="section">
                                <div class="section">
                                    <div class="special-image">
                                        <img src="/shop/2.png" />
                                    </div>
                                    <div class="pinyin">jīn rì hǎo diàn</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="maiji-shop-area" v-for="(item, index) in HomeData.chantInfoRspList" :key="index">
                        <div class="shop-title">
                            <!-- <div
                                class="img background-contain"
                                :style="{
                                    backgroundImage: 'url(' + item.logoImg + ')'
                                }"
                            ></div>
                            <div class="name">{{ item.name }}</div>
                            <div class="tips">{{ item.vName }}</div>-->
                            <nuxt-link
                                target="_blank"
                                :to="'/mall-storeHome/' + item.id"
                                class="img background-contain"
                                :style="{
                                    backgroundImage: 'url(' + item.logoImg + ')'
                                }"
                            ></nuxt-link>
                            <nuxt-link target="_blank" class="name" :to="'/mall-storeHome/' + item.id">{{ item.name }}</nuxt-link>
                            <nuxt-link target="_blank" class="tips" :to="'/mall-storeHome/' + item.id" v-if="item.tagLabel && item.tagLabel.length > 0">{{ item.tagLabel }}</nuxt-link>
                            <nuxt-link class="enter-shop" :to="'/mall-storeHome/' + item.id">进入店铺</nuxt-link>
                        </div>
                        <div class="media-area row">
                            <nuxt-link target="_blank" class="media-type-2 col col2-pc-8 col-pad-4 col-mobile-6" :to="'/goods-detail/' + item.mallGoodsId" v-for="(item, index) in item.chantGoodsResDTOList" v-show="index < 3" :key="index">
                                <div class="inner-wrap">
                                    <div
                                        class="cover background-contain"
                                        :style="{
                                            backgroundImage: 'url(' + item.mallGoodsEspImg + '?x-oss-process=image/resize,h_320/format,jpeg/quality,Q_90)'
                                        }"
                                    >
                                        <!-- <div class="tips">第一季 08期</div> -->
                                    </div>
                                    <div class="name">{{ item.mallGoodsName }}</div>
                                    <div class="sale">
                                        <div class="price">
                                            <strong>￥{{ item.perPrice }}</strong>
                                        </div>
                                        <div class="number">
                                            <span class="color-blue"> {{ item.mallGoodsShowAmount || 0 }}人 </span>已购
                                        </div>
                                    </div>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 新品推荐 -->
        <div class="maiji-seckill">
            <div class="wrap">
                <div class="panel">
                    <div class="index-title">
                        <div class="wrap-title">
                            <!-- <nuxt-link target="_blank" to="parent-child" class="title"
                                >热卖单品</nuxt-link
                            >-->
                            <div class="section">
                                <div class="section">
                                    <div class="special-image">
                                        <img src="/shop/3.png" />
                                    </div>
                                    <div class="pinyin">xīn pǐn tuī jiàn</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="media-type-9 row lll">
                        <!-- <div
                            class="col col2-pc-8 col2-pad-8 col2-mobile-8"
                            v-for="(item, index) in newProductRecommend.body
                                .allAdvList"
                            :key="index"
                        >-->

                        <nuxt-link target="_blank" class="col col2-pc-8 col2-pad-12 col-mobile-8" :to="'/goods-detail/' + item.itemId" v-for="(item, index) in newProductRecommend.allAdvList" v-show="index < 3" :key="index">
                            <div class="inner-wrap">
                                <div
                                    class="cover background-contain"
                                    :style="{
                                        backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_320/format,jpeg/quality,Q_90)'
                                    }"
                                ></div>
                                <div class="infos">
                                    <div class="title">{{ item.title }}</div>
                                    <div class="summary">{{ item.descript }}</div>
                                    <div class="sale">
                                        <div class="price">
                                            <strong> ￥{{ item.extendedField3 }} </strong>
                                        </div>
                                        <div class="number">原价￥{{ item.extendedField2 }}</div>
                                    </div>
                                </div>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- 当季热销 -->
        <div class="maiji-seckill" id="shangchengremai" v-for="(item, index) in HomeData.mallGoodsSectionResDTO" :key="index">
            <div class="wrap">
                <div class="panel">
                    <div class="index-title">
                        <div class="wrap-title">
                            <!-- <nuxt-link target="_blank" to="parent-child" class="title"
                                >猜你喜欢</nuxt-link
                            >-->
                            <div class="section">
                                <div class="section">
                                    <div class="title">{{ item.name }}</div>
                                    <div class="pinyin">dāng jì rè xiāo</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="media-area row" v-if="item.mallGoodsResDTOList.length > 0">
                        <nuxt-link target="_blank" :to="'/goods-detail/' + item.mallGoodsId" class="media-type-2 col col2-pc-4 col-pad-4 col-mobile-6" v-for="(item, index) in item.mallGoodsResDTOList" :key="index">
                            <div class="inner-wrap">
                                <div
                                    class="cover background-contain"
                                    :style="{
                                        backgroundImage: 'url(' + item.mallGoodsEspImg + '?x-oss-process=image/resize,h_320/format,jpeg/quality,Q_90)'
                                    }"
                                >
                                    <!-- <div class="tips">第一季 08期</div> -->
                                </div>
                                <div class="name">{{ item.mallGoodsName }}</div>
                                <div class="sale">
                                    <div class="price">
                                        <strong>￥{{ item.perPrice }}</strong>
                                    </div>
                                    <div class="number line-thought">原价￥{{ item.oriPrice }}</div>
                                </div>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- 猜你喜欢 -->
        <div class="maiji-seckill" v-if="mallRecommendGoods.length > 0">
            <div class="wrap">
                <div class="panel">
                    <div class="index-title">
                        <div class="wrap-title">
                            <div class="section">
                                <div class="section">
                                    <div class="special-image">
                                        <img src="/shop/5.png" />
                                    </div>
                                    <div class="pinyin">cāi nǐ xǐ huān</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="media-area row">
                        <nuxt-link target="_blank" :to="'/goods-detail/' + item.mallGoodsId" class="media-type-2 col col2-pc-4 col-pad-4 col-mobile-6" v-for="(item, index) in mallRecommendGoods" :key="index">
                            <div class="inner-wrap">
                                <div
                                    class="cover background-contain"
                                    :style="{
                                        backgroundImage: 'url(' + item.mallGoodsEspImg + '?x-oss-process=image/resize,h_320/format,jpeg/quality,Q_90)'
                                    }"
                                ></div>
                                <div class="name">{{ item.mallGoodsName }}</div>
                                <div class="sale">
                                    <div class="price">
                                        <strong>￥{{ item.perPrice }}</strong>
                                    </div>
                                    <div class="number line-thought">原价￥{{ item.oriPrice }}</div>
                                </div>
                            </div>
                        </nuxt-link>
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
            BannerSwiperOption: {
                speed:300,
                loop: true,
                autoplay: {
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            },
            currentCategory: 0,
            timer: null,
            shopSearchGoodsName: '麦咭智能'
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

        // 商城目录
        res.mallCategory = await that.$getChantMallCategoryList({
            pageNum: 1,
            pageSize: 7
        });

        // 轮播图
        res.mallBannerLists = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: 'c66058694c484e0695a39887fa6bcc07 '
        });


        // let mallBanner = await axios({
        //     url: context.app.$domain + '/mkt/getAdvList',
        //     method: 'post',
        //     headers: {
        //         token: context.store.state.session.token || ''
        //     },
        //     data: {
        //         pageNum: 1,
        //         pageSize: 3,
        //         program: 'HOME_TOPE',
        //         recPage: 'MAGEE_SHOP',
        //         status: 1
        //     }
        // });
        // console.log('ddd')
        // console.dir(mallBanner.data)
        // res.mallBanner = mallBanner.data;

        // 麦咭秒杀
        res.SecKillLists = await that.$activityList({
            pageNum: 1,
            pageSize: 10,
            type: 0
        });

        // --------------------------------------------
        // 新品推荐
        res.newProductRecommend = await that.$getRecObjectList({
            pageSize: 3,
            pageNum: 1,
            recPosition: 'be5294656a3848aeab6cbdef73ad06e5'
        });

        // --------------------------------------------
        // 热卖单品
        // res.hotSaleSingle = await that.$getRecObjectList({
        //     pageSize: 12,
        //     pageNum: 1,
        //     recPosition: '7f379a808f1941afab52cfee297e626f'
        // });

        // 猜你喜欢
        res.mallRecommendGoods = await that.$getPersonRecommendGoodsList({
            pageNum: 1,
            pageSize: 1
        });

        // 首页数据
        res.HomeData = await that.$merMallGetMallHomeData({});

        return res;
    },
    methods: {
        // 通过名称搜索商品
        shopSearchGoodsResultToName() {
            if (this.shopSearchGoodsName && this.shopSearchGoodsName.length > 0) {
                this.$router.push({
                    name: 'mall-searchgoods',
                    query: {
                        name: this.shopSearchGoodsName
                    }
                });
            } else {
                $.message({
                    message: '请输入搜索内容',
                    type: 'info'
                });
            }
        },
        // 进入栏目
        EnterCategory(item) {
            this.currentCategory = item.id;
            // 每次进入栏目，清除掉定时器
            // 以免移入菜单栏时右侧面板任然自动消失
            clearTimeout(this.timer);
        },
        // 离开栏目
        LeaveCategory(item) {
            let that = this;
            clearTimeout(that.timer);
            that.timer = setTimeout(function() {
                that.currentCategory = 0;
            }, 500);
        },
        // 进入面板
        EnterPanel() {
            clearTimeout(this.timer);
        },
        // 离开面板
        LeavePanel() {
            let that = this;
            clearTimeout(that.timer);
            that.timer = setTimeout(function() {
                that.currentCategory = 0;
            }, 500);
        },
        // 搜索商品
        toSearchGoods(parm, categoryId) {
            this.$router.push({
                name: 'mall-searchgoods',
                query: {
                    name: parm,
                    smallCategory: categoryId
                }
            });
        }
    },
    mounted() {
        var hash = location.hash;
        // jingpindianpu(精品店铺) shangchengremai(商城热卖)
        if (hash === '#jingpindianpu' || hash === '#shangchengremai') {
            if ($(hash).offset()) {
                $('html, body').animate({ scrollTop: $(hash).offset().top - 80 }, 1000);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.lll{
    .col:nth-of-type(2){
        border-left: 1px solid #eee;
        border-right: 1px solid #eee;
    }
}
</style>
