<template>
    <div class="container">
        <!-- 顶部导航 -->
        <Toper :toperParams="toperParams" ref="ToperComponent" />

        <!-- 商品详情 -->
        <div class="goods-detail">
            <!-- 包围圈 -->
            <div class="wrap">
                <!-- 顶部提示 -->
                <div class="top-tips">
                    <img src="../../static/shop/cart-info-text.png" alt="商城保证" />
                    <!--                    <div class="group">-->
                    <!--                        <div class="img">-->
                    <!--                            <img src="" />-->
                    <!--                        </div>-->
                    <!--                        <div class="txt">品质保障</div>-->
                    <!--                    </div>-->
                    <!--                    <div class="group">-->
                    <!--                        <div class="img"></div>-->
                    <!--                        <div class="txt">假一赔十</div>-->
                    <!--                    </div>-->
                    <!--                    <div class="group">-->
                    <!--                        <div class="img"></div>-->
                    <!--                        <div class="txt">售后无忧</div>-->
                    <!--                    </div>-->
                </div>

                <!-- 店铺信息 -->
                <nuxt-link target="_blank" :to="'/mall-storeHome/' + ChantInfo.shopInfo.chantId" class="shop-info">
                    <div
                        class="img background-contain"
                        :style="{
                            backgroundImage: 'url(' + ChantInfo.shopInfo.logoUrl + '?x-oss-process=image/resize,h_80/format,jpeg/quality,Q_90)'
                        }"
                    ></div>
                    <div class="name">
                        {{ ChantInfo.shopInfo.shopName }}
                    </div>

                    <div class="tips" v-if="ChantInfo.shopInfo.tabText && ChantInfo.shopInfo.tabText.length > 0">{{ ChantInfo.shopInfo.tabText }}</div>
                </nuxt-link>

                <!-- 商品内容 -->
                <div class="goods-content">
                    <!-- 货物主区域 -->
                    <div class="goods-main row">
                        <!-- 左侧图片 -->
                        <div style="width:30%;float:left;">
                            <!-- 商品封面 -->
                            <!--                            <div class="goods-cover">-->
                            <!--                                <img :src="GoodsDetail.mallGoodsEspImg" />-->
                            <!--                            </div>-->
                            <!--                            &lt;!&ndash; 商品缩略图 &ndash;&gt;-->
                            <!--                            <div class="goods-thumbnail"></div>-->
                            <div class="goods-cover-bg" v-swiper:BannerSwiper="BannerSwiperOption">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide background-cover" v-for="(item, index) in GoodsDetail.qualityRspDTO" :key="index">
                                        <img :src="item.url" style="width:100%;" />
                                    </div>
                                </div>
                                <div class="swiper-pagination"></div>
                            </div>
                        </div>

                        <!-- 右侧规格 -->
                        <div style="width:70%;float:left;padding-left:20px;">
                            <!-- 商品标题 -->
                            <div class="goods-title">
                                {{ GoodsDetail.mallGoodsName }}
                            </div>
                            <!-- 商品动作 -->
                            <div class="goods-action">
                                <div class="group">
                                    <div class="label" style="color:#999;">
                                        已售
                                    </div>
                                    <div class="value" style="color:#EA4149;">
                                        {{ GoodsDetail.mallGoodsShowAmount }}
                                    </div>
                                </div>
                                <div class="group">
                                    <div class="label" style="color:#999;">
                                        累计评价
                                    </div>
                                    <div class="value" style="color:#EA4149;">
                                        {{ GoodsDetail.estimateNum }}
                                    </div>
                                </div>
                                <nuxt-link target="_blank" to="" class="group" @click.native="collectGoods(GoodsDetail)">
                                    <img src="../../static/shop/goodsdetail-collect-red.png" class="collect-img" alt="商品收藏图片" v-if="GoodsCollectedData && GoodsCollectedData.collect" />
                                    <img src="../../static/shop/goodsdetail-collect-gray.png" class="collect-img" alt="商品收藏图片" v-else />
                                    <div class="collect-text">{{ GoodsCollectedData && GoodsCollectedData.collect ? '已收藏' : '收藏' }}</div>
                                </nuxt-link>
                            </div>
                            <!-- 售价 -->
                            <div class="now-price line">
                                <div class="label">售价：</div>
                                <div class="value" style="color:#EF1923;font-size:38px;font-weight:bold;">￥{{ specItem.skuSaleprice || GoodsDetail.perPrice }}</div>
                            </div>
                            <!-- 原价 -->
                            <div class="old-price line">
                                <div class="label">原价：</div>
                                <div class="value" style="font-size:26px;text-decoration:line-through;color:#999;">￥{{ GoodsDetail.oriPrice }}</div>
                            </div>
                            <!-- 规格 -->
                            <div class="specification line">
                                <div class="sku-label">规格：</div>
                                <div>
                                    <div class="sku-content-bg" v-for="(item, index) in GoodsDetail.appSpecOptRspDtos" :key="index">
                                        <p>{{ item.speKey }}</p>
                                        <div class="specification-list row">
                                            <span
                                                class="specification-box"
                                                :class="{
                                                    active: skuItem.active === true
                                                }"
                                                v-for="(skuItem, skuIndex) in item.optionList"
                                                :key="skuIndex"
                                                @click="chooseSpec(item, skuIndex)"
                                                ><img :src="skuItem.optimg" alt="规格图片" v-if="!!skuItem.optimg" />{{ skuItem.optdes || skuItem.optName }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="number line">
                                <div class="label">数量：</div>
                                <div class="value num-input">
                                    <span class="minus" @click="minus">-</span>
                                    <span class="input"><input v-model="buyNumber" type="tel" :maxlength="specItem.skuTotal ? specItem.skuTotal.toString().length : GoodsDetail.mallGoodsAmount.toString().length" @input="buyNumberChange"/></span>
                                    <span class="plus" @click="plus">+</span>
                                    <span class="text" v-if="specItem.skuTotal">库存 {{ specItem.skuTotal }} 件</span>
                                </div>
                            </div>
                            <!-- <div class="freight line">
                                <div class="label">运费</div>
                                <div class="value" style="color:#999;">
                                    从
                                    <span style="color:#EF1923;">美国</span> 到
                                    <span class="select" style="color:#EF1923;"
                                        >国美</span
                                    >
                                    运费 <span>0</span> 元
                                </div>
                            </div> -->
                            <div class="buttons">
                                <div class="button joinCart" @click="AddGoodsCar">
                                    加入购物车
                                </div>
                                <div class="button buyGoods" @click="buyNow2">
                                    立即购买
                                </div>
                                <!-- <button class="button buyGoods" @click="buyNow">
                                    立即购买
                                </button> -->
                            </div>
                        </div>
                    </div>
                    <div class="goods-intro">
                        <div class="goods-list">
                            <div class="goods-recommend" v-if="YouLikeGoods && YouLikeGoods.list">
                                <nuxt-link target="_blank" :to="'/goods-detail/' + item.mallGoodsId" class="goods-recommend-box" v-for="(item, index) in YouLikeGoods.list" :key="index">
                                    <div class="cover background-contain">
                                        <img :src="item.mallGoodsEspImg + '?x-oss-process=image/resize,h_140/format,jpeg/quality,Q_90'" />
                                    </div>
                                    <div class="title">
                                        {{ item.mallGoodsName }}
                                    </div>
                                    <div class="price-area">
                                        <span class="price now">￥{{ item.perPrice }}</span>
                                        <span class="price old">原价 ￥{{ item.oriPrice }}</span>
                                    </div>
                                </nuxt-link>
                            </div>
                        </div>
                        <div class="goods-detail2">
                            <div class="goods-detail-content" v-html="GoodsDetail.mallGoodsDetails"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部 -->
        <Footer />
        <div class="float-buttons" ref="floatButtons" style="display:none;">
            <div class="buttons">
                <div class="button comment">
                    累计评论&nbsp;<span style="color:red;font-size:20px;">{{ GoodsDetail.estimateNum }}</span
                    >次
                </div>
                <div class="button joinCart" @click="AddGoodsCar">
                    加入购物车
                </div>
                <div class="button buyGoods" @click="buyNow2">
                    立即购买
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Toper from '~/components/Toper.vue';
import SubToper from '~/components/SubToper.vue';
import Footer from '~/components/Footer.vue';
import Slide from '~/components/Slide.vue';
import Subject from '~/components/Subject.vue';
import axios from 'axios';
import _ from 'lodash';
export default {
    data() {
        return {
            // 顶部参数
            toperParams: {
                backgroundColor: 'white',
                category: 'maiji-shop'
            },
            BannerSwiperOption: {
                loop: true,
                autoplay: {
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
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
            mengwaComment: '',
            // 购买数量
            buyNumber: 1,
            // 规格对象
            specItem: {}
        };
    },
    computed: {
        loginData() {
            return this.$store.state.loginData;
        },
        userData() {
            return this.$store.state.userData;
        },
        session() {
            return this.$store.state.session;
        }
    },
    components: {
        Toper,
        SubToper,
        Subject,
        Footer
    },
    async asyncData(context) {
        let that = context.app;
        let res = {};
        // 参数前缀
        // ------------------------------------------------------------
        let prefixParams = context.params.id.substring(0, 2);

        // 商品详情
        let GoodsDetail = await that.$getGoodsDetails({
            mallGoodsId: context.params.id
        });
        let skuKeysVal = '';
        if (_.isArray(GoodsDetail.appSpecOptRspDtos)) {
            GoodsDetail.appSpecOptRspDtos.forEach(function(item, index) {
                item.selectedIndex = 0;
                item.optionList.forEach(function(skuItem, skuIndex) {
                    if (skuIndex === 0) {
                        skuItem.active = true;
                        skuKeysVal = skuKeysVal + (skuKeysVal.length > 0 ? ',' : '') + item.speId + ':' + skuItem.optId;
                    } else {
                        skuItem.active = false;
                    }
                });
            });
        }
        if (_.isArray(GoodsDetail.goodsSkuList)) {
            GoodsDetail.goodsSkuList.some(function(item, index) {
                if (item.skuIdkeys === skuKeysVal) {
                    res.specItem = item;
                    return true;
                }
            });
        }

        res.GoodsDetail = GoodsDetail;

        if (res.GoodsDetail.mallGoodsId) {
            res.ChantInfo = await that.$getChantInfo({
                chantId: res.GoodsDetail.chantId
            });
        } else {
            res.ChantInfo = {
                shopInfo: {},
                searchInfo: {}
            };
        }
        res.GoodsCollectedData = await that.$checkCollectStatus({
            associatedId: context.params.id
        });

        // 猜你喜欢
        res.YouLikeGoods = await that.$getSimilarGoodsList({
            mallGoodsId: context.params.id,
            mallGoodsName: res.GoodsDetail.mallGoodsName || '',
            pageNum: 1,
            pageSize: 20
        });
        return res;
    },
    mounted() {
        window.addEventListener('scroll', this.getScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.getScroll);
    },
    methods: {
        getScroll() {
            this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (document.documentElement.scrollTop > 600) {
                this.$refs.floatButtons.style.display = 'block';
            } else {
                this.$refs.floatButtons.style.display = 'none';
            }
        },

        // 监听购买输入值
        buyNumberChange() {
            if (isNaN(Number(this.buyNumber)) || (this.buyNumber && Number(this.buyNumber) <= 0)) {
                this.buyNumber = 1;
            } else if (Number(this.buyNumber) > this.specItem.skuTotal) {
                this.buyNumber = this.specItem.skuTotal;
            }
        },
        // 减少购买数量
        minus() {
            if (this.buyNumber > 1) {
                this.buyNumber--;
            }
        },
        // 增加购买数量
        plus() {
            if (this.buyNumber < this.specItem.skuTotal) {
                this.buyNumber++;
            }
        },
        updateChooseSkuData() {
            let skuKeysVal = '';
            this.GoodsDetail.appSpecOptRspDtos.forEach(function(item, index) {
                item.optionList.forEach(function(skuItem, skuIndex) {
                    if (skuIndex === item.selectedIndex) {
                        skuItem.active = true;
                        skuKeysVal = skuKeysVal + (skuKeysVal.length > 0 ? ',' : '') + item.speId + ':' + skuItem.optId;
                    } else {
                        skuItem.active = false;
                    }
                });
            });
            let myThis = this;
            this.GoodsDetail.goodsSkuList.some(function(item, index) {
                if (item.skuIdkeys === skuKeysVal) {
                    myThis.specItem = item;
                    return true;
                }
            });
        },
        // 选择规格
        chooseSpec(item, skuIndex) {
            if (item.selectedIndex !== skuIndex) {
                item.selectedIndex = skuIndex;
                this.updateChooseSkuData();
            }
        },
        // 立即购买
        buyNow() {
            let requestToken = this.$store.state.session.token;
            if (requestToken && requestToken.length > 0) {
                if (isNaN(Number(this.buyNumber)) || Number(this.buyNumber) <= 0) {
                    this.buyNumber = 1;
                }
                this.$router.push({
                    name: 'maiji-shop-confirm-order',
                    params: {
                        type: 'buyNow',
                        goodsDetail: this.GoodsDetail
                    }
                });
            } else {
                let ToperComponent = this.$refs['ToperComponent'];
                ToperComponent.loginAndRegisterParams.isShow = true;
            }
        },
        // 购买方式2
        buyNow2() {
            let requestToken = this.$store.state.session.token;
            if (requestToken && requestToken.length > 0) {
                if (isNaN(Number(this.buyNumber)) || Number(this.buyNumber) <= 0) {
                    this.buyNumber = 1;
                }
                // 如果库存不足
                if (this.specItem.skuTotal < this.buyNumber) {
                    $.message({
                        message: '商品库存不足',
                        type: 'info'
                    });
                    return;
                }
                // 缓存商品详细信息
                this.$store.commit('save', {
                    path: 'goodsBuyDetail',
                    data: this.GoodsDetail
                });
                MJStore.set('mj_goodsBuyDetail', this.GoodsDetail);

                // 缓存商品规则信息
                this.$store.commit('save', {
                    path: 'goodsBuySpec',
                    data: this.specItem
                });
                MJStore.set('mj_goodsBuySpec', this.specItem);

                // 缓存商品购买数量
                this.$store.commit('save', {
                    path: 'goodsBuyNumber',
                    data: this.buyNumber
                });
                MJStore.set('mj_goodsBuyNumber', this.buyNumber);

                // 跳转页面
                this.$router.push('/maiji-shop-confirm-order2');
            } else {
                let ToperComponent = this.$refs['ToperComponent'];
                ToperComponent.loginAndRegisterParams.isShow = true;
            }
        },
        // 添加到购物车
        async AddGoodsCar() {
            let requestToken = this.$store.state.session.token;
            if (requestToken && requestToken.length > 0) {
                if (isNaN(Number(this.buyNumber)) || Number(this.buyNumber) <= 0) {
                    this.buyNumber = 1;
                }
                let that = this;
                if (!this.specItem.skuId) {
                    $.message({
                        message: '请选择规格',
                        type: 'error'
                    });
                    return;
                }
                // 添加到购物车
                let reply = await axios({
                    url: this.$domain + '/mer/mall/addCart',
                    method: 'post',
                    headers: {
                        token: requestToken
                    },
                    data: {
                        mallGoodsId: this.GoodsDetail.mallGoodsId,
                        mallGoodsAmount: this.buyNumber,
                        skuId: this.specItem.skuId
                    }
                });
                if (reply.data && reply.data.msgCd === that.$msgCode.success && reply.data.body !== undefined) {
                    $.message({
                        message: '添加到购物车成功！',
                        type: 'success'
                    });
                } else {
                    $.message({
                        message: reply.data.msgInfo,
                        type: 'error'
                    });
                }
            } else {
                let ToperComponent = this.$refs['ToperComponent'];
                ToperComponent.loginAndRegisterParams.isShow = true;
            }
        },
        async collectGoods(goodsItem) {
            let requestToken = this.$store.state.session.token;
            if (requestToken && requestToken.length > 0) {
                let resultData = await axios({
                    url: this.$domain + '/urm/collectOption',
                    method: 'post',
                    headers: {
                        token: this.$store.state.session.token || ''
                    },
                    data: {
                        enable: this.GoodsCollectedData.collect ? '0' : '1',
                        associatedId: goodsItem.mallGoodsId,
                        title: goodsItem.mallGoodsName,
                        descript: goodsItem.mallGoodsDes,
                        resUrl: goodsItem.mallGoodsEspImg,
                        colType: '6'
                    }
                });
                if (resultData.data && resultData.data.msgCd === this.$msgCode.success && resultData.data.body) {
                    let enable = !!resultData.data.body.enable;
                    this.GoodsCollectedData.collect = enable;
                    $.message({
                        message: enable ? '收藏成功！' : '取消收藏成功',
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
        }
    }
};
</script>
<style lang="scss">
.goods-detail-content {
    img {
        max-width: 100%;
    }
}
</style>
<style lang="scss" scoped>
.goods-detail {
    background-color: #f4f4f4;
    padding: 0 2rem;
    padding-bottom: 60px;
}
.top-tips {
    display: flex;
    height: 50px;
    align-items: center;
    color: #ea4940;
    .group {
        flex: 0 0 auto;
        display: flex;
        // align-items: center;
        line-height: 18px;
        margin-right: 40px;
        .img {
            flex: 0 0 20px;
            height: 10px;
            /*width: 20px;*/
            background-color: #ddd;
            margin-right: 4px;
        }
        .txt {
            height: 20px;
            flex: 0 0 auto;
        }
    }
}
.shop-info {
    height: 70px;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 0 0.5rem;
    .img {
        flex: 0 0 50px;
        height: 50px;
        background-color: #eee;
        border-radius: 50%;
        overflow: hidden;
    }
    .name {
        flex: 0 0 auto;
        padding: 0 20px;
        font-size: 20px;
    }
    .tips {
        background-color: #faefee;
        padding: 0 5px;
        border-radius: 4px;
        color: #ce4031;
        font-size: 14px;
    }
}
.goods-content {
    padding: 0.5rem;
    // min-height: 500px;
    background-color: #fff;
    margin-top: 10px;
    .goods-main {
        .col {
            /*height: 7rem;*/
        }
        // .goods-main_right {
        padding-left: 20px;
        .goods-action {
            display: flex;
            align-items: center;
            font-size: 20px;
            .group {
                /*background-color: #c4a31d;*/
                display: flex;
                align-items: center;
                flex: 0 0 auto;
                margin-right: 20px;
                .label {
                    margin-right: 20px;
                }
                .collect-img {
                    margin-right: 5px;
                    height: 20px;
                }
                .collect-text {
                    color: #5c5c5c;
                }
            }
        }
        .buttons {
            display: flex;
            justify-content: space-around;
            margin-top: 50px;
            .button {
                display: flex;
                justify-content: center;
                align-items: center;
                flex: 0 0 36%;
                height: 60px;
                border: 1px solid #ddd;
                font-size: 24px;
                font-weight: 500;
                color: #fff;
                border-radius: 4px;
                cursor: pointer;
            }
            .joinCart {
                background-color: #00adef;
            }
            .buyGoods {
                background-color: #ef1923;
            }
        }
        // }
        .goods-title {
            /*background-color: #c4a31d;*/
            /*height: 1rem;*/
            /*line-height: 0.5rem;*/
            font-size: 30px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .line {
            display: flex;
            margin-top: 30px;
            .sku-label {
                flex: 0 0 auto;
                color: #999;
            }
            .sku-content-bg {
                p {
                    margin-bottom: 10px;
                    color: #333;
                    font-size: 20px;
                }
            }
            .label {
                display: flex;
                align-items: center;
                flex: 0 0 auto;
                color: #999;
            }
            .value {
                flex: 0 0 auto;
            }
            .specification-box {
                // height: 24px;
                margin-bottom: 10px;
                border: 1px solid #999;
                color: #999;
                padding: 3px 10px;
                border-radius: 4px;
                cursor: pointer;
                margin-right: 10px;
                &.active {
                    background-color: #00adef;
                    color: #fff;
                }
                img {
                    border-radius: 4px;
                    height: 25px;
                    vertical-align: middle;
                    overflow: hidden;
                    margin-right: 5px;
                }
            }
        }
        .number {
            .minus,
            .plus {
                cursor: pointer;
            }
            .minus,
            .input,
            .plus {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                height: 30px;
                min-width: 30px;
                border: 1px solid #ddd;
                margin-right: 10px;
            }
            .text {
                color: #999;
            }
            input {
                width: 50px;
                float: left;
                text-align: center;
            }
            .num-input {
                display: flex;
                align-items: center;
            }
        }
    }
    .goods-cover-bg {
        /*background-color: #c4a31d;*/
        overflow: hidden;
    }
    .goods-cover {
        height: 6rem;
        max-height: 6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        // background-color: #8ac;
        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
    .goods-thumbnail {
        height: 1.5rem;
        background-color: #eee;
    }
}
.vip-discount {
    padding: 0.5rem;
    background-color: #fff;
    margin-top: 10px;
    border-bottom: solid 1px #f4f4f4;
}
.goods-intro {
    margin-top: 100px;
    border-top: 1px solid #eee;
    display: flex;
    .goods-list {
        width: 280px;
        flex: 0 0 280px;
        // height: 80px;
        border-right: 1px solid #eee;
        .seller-info {
            display: flex;
            margin-top: 20px;
            padding: 0 20px;
            .img {
                flex: 0 0 60px;
                height: 60px;
                background-color: #00adef;
            }
            .info {
                flex: 1 1 100%;
                .name {
                    font-size: 20px;
                    height: 30px;
                    text-align: center;
                    span {
                        font-size: 14px;
                        color: #ce4031;
                        background-color: #faefee;
                        padding: 2px 6px;
                    }
                }
                .kefu {
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    button {
                        height: 100%;
                        padding: 0 20px;
                        font-size: 18px;
                        background-color: #00adef;
                        color: #fff;
                        border-radius: 4px;
                    }
                }
            }
        }
    }
    .goods-recommend {
        margin-top: 20px;
        padding: 0 20px;
        .goods-recommend-box {
            flex: 0 0 200px;
            margin-top: 20px;
            width: 100%;
            .cover {
                height: 240px;
                // background-color: #9ac;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    max-height: 100%;
                    max-width: 100%;
                }
            }
            .title {
                font-size: 16px;
                font-weight: bold;
                line-height: 30px;
                max-height: 60px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .price-area {
                display: flex;
                justify-content: space-between;
                .now {
                    font-size: 18px;
                    font-weight: bold;
                    color: #ef1923;
                }
                .old {
                    font-size: 14px;
                    color: #999;
                    text-decoration: line-through;
                }
            }
        }
    }
    .goods-detail2 {
        flex: 1 1 100%;
        padding: 20px;
        .goods-detail-content {
            // background: #f5f5f5;
            height: 100%;
            width: 100%;
        }
    }
}

.float-buttons {
    bottom: 0px;
    overflow: hidden;
    position: fixed;
    width: 100%;
    z-index: 999;

    .buttons {
        background-color: gainsboro;
        display: flex;
        justify-content: flex-end;
        .button {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 47px;
            border: 1px solid #ddd;
            font-size: 24px;
            font-weight: 500;
            color: #fff;
            border-radius: 4px;
            cursor: pointer;
            width: 160px;
        }
        .comment {
            font-size: 13px;
            color: #5c5c5c;
        }
        .joinCart {
            background-color: #00adef;
            margin-right: 10px;
        }
        .buyGoods {
            background-color: #ef1923;
            margin-right: 3rem;
        }
    }
}
</style>
