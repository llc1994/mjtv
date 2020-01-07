<template>
    <div class="container mall-shoppingcart">
        <!-- 头部 -->
        <Toper :toperParams="toperParams" />

        <!-- 顶部信息-->
        <div class="top-info-text-content-bg">
            <div class="top-info-content-bg">
                <div class="wrap">
                    <div class="top-info-content">
                        <img src="../static/shop/cart-info-text.png" class="top-info-img" alt="购物车顶部信息" />
                    </div>
                </div>
            </div>
            <div class="wrap">
                <div class="top-info-text-bg">
                    <p>全部商品</p>
                    <div class="horizontal-line"></div>
                </div>
            </div>
        </div>

        <div :class="topTitleContentFixed === true ? 'top-fixed-content' : ''"></div>

        <!-- 顶部固定标题-->
        <div class="top-title-content-bg" id="topTitleContent" :class="topTitleContentFixed === true ? 'top-title-fixed' : ''">
            <div class="wrap">
                <div class="top-title-content">
                    <!--<p>全部商品</p>-->
                    <!--<div class="horizontal-line top-title-content-line"></div>-->
                    <div class="cart-title-content-bg">
                        <p class="title-text1">商品名称</p>
                        <p class="title-text2">单价</p>
                        <p class="title-text3">数量</p>
                        <p class="title-text4">操作</p>
                    </div>
                </div>
            </div>
        </div>

        <!--        购物车商品-->
        <div class="cart-white-content-bg" id="cartWhiteContent">
            <div class="wrap">
                <div class="cart-white-content-bg">
                    <div class="cart-shop-goods-bg" v-for="(shopItem, index) in storeList" :key="index">
                        <nuxt-link target="_blank" :to="'/mall-storeHome/' + shopItem.storeId" class="cart-shop-bg">
                            <nuxt-link target="_blank" to="" class="shop-selectimg-bg" @click.native="selectAddShopAllGoodsToCart(shopItem)">
                                <img src="../static/shop/cart-quan-selected.png" class="selected-img" alt="选中图片" v-if="shopItem.shopSelect" />
                                <img src="../static/shop/cart-quan-select.png" class="selected-img" alt="选中图片" v-else />
                            </nuxt-link>
                            <img :src="shopItem.logoImg" class="shop-logo-img" alt="店铺图片" />
                            <p>{{ shopItem.storeName }}</p>
                        </nuxt-link>
                        <div class="cart-goods-line-bg" v-for="(goodsItem, index) in shopItem.carList" :key="index">
                            <nuxt-link target="_blank" :to="'/goods-detail/' + goodsItem.mallGoodsId" class="cart-goods-bg">
                                <div class="cart-goods-logo-name-bg">
                                    <div class="goods-selectimg-logo-bg">
                                        <nuxt-link target="_blank" to="" class="goods-selectimg-bg" @click.native="selectAddShopOneGoodsToCart(shopItem, goodsItem)">
                                            <img src="../static/shop/cart-quan-selected.png" class="selected-img" alt="选中图片" v-if="goodsItem.goodsSelect" />
                                            <img src="../static/shop/cart-quan-select.png" class="selected-img" alt="选中图片" v-else />
                                        </nuxt-link>
                                        <img :src="goodsItem.mallGoodsSmallImg" class="goods-logo-img" alt="商品图片" />
                                    </div>
                                    <div class="goods-title-sku-desc-bg">
                                        <div class="goods-title-desc-bg">
                                            <p class="goods-title-text">
                                                {{ goodsItem.mallGoodsName }}
                                            </p>
                                            <p>{{ goodsItem.mallGoodsDes }}</p>
                                        </div>
                                        <div class="goods-sku-info">
                                            <p>{{ goodsItem.skuKeys }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="cart-goods-price-text-bg">
                                    <p class="cart-goods-price-text">￥{{ goodsItem.skuSaleprice || goodsItem.perPrice }}</p>
                                    <p>库存：{{ goodsItem.skuTotal }}</p>
                                </div>
                                <div class="cart-goods-addgoods-bg">
                                    <nuxt-link target="_blank" to="" class="goods-reduce-increase-img-bg goods-reduce-img-bg" @click.native.stop="increaseReduceGoodsCount(false, goodsItem)">
                                        <img src="../static/shop/cart-goods-reduce.png" class="goods-reduce-increase-img" alt="减少商品图片" />
                                    </nuxt-link>
                                    <p class="addgoods-goods-count-text">
                                        {{ goodsItem.mallGoodsAmount }}
                                    </p>
                                    <nuxt-link target="_blank" to="" class="goods-reduce-increase-img-bg goods-increase-img-bg" @click.native.stop="increaseReduceGoodsCount(true, goodsItem)">
                                        <img src="../static/shop/cart-goods-increase.png" class="goods-reduce-increase-img" alt="增加商品图片" />
                                    </nuxt-link>
                                </div>
                                <div class="cart-delete-goods-text-bg">
                                    <nuxt-link target="_blank" to="" class="cart-delete-goods-text" @click.native.stop="deleteCartOneGoods(shopItem, goodsItem.cartsId)">删除</nuxt-link>
                                </div>
                            </nuxt-link>
                            <div class="horizontal-line"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--结算内容-->
        <div class="bottom-cart-settlement-content-bg" id="bottomCartSettlementContent" :class="bottomCartSettlementContentFixed === true ? 'bottom-cart-settlement-fixed' : ''">
            <div class="wrap">
                <div class="bottom-cart-settlement-bg">
                    <div class="cart-settlement-allselect-delete-bg">
                        <nuxt-link target="_blank" to="" class="cart-settlement-allselect-bg" @click.native="cartAllSelectShopGoods">
                            <img src="../static/shop/cart-quan-selected.png" class="selected-img" alt="灰色选中图片" v-if="cartAllSelect" />
                            <img src="../static/shop/cart-grayquan-select.png" class="selected-img" alt="灰色选中图片" v-else />
                            <p>全选</p>
                        </nuxt-link>
                        <nuxt-link target="_blank" to="" class="cart-alldelete-text" @click.native="deleteCartAllGoods">删除</nuxt-link>
                    </div>
                    <div class="cart-settlement-goodscount-price-bg">
                        <p>
                            已选商品：<span>{{ cartGoodsCount }}</span
                            >&nbsp;件
                        </p>
                        <p class="cart-settlement-price-text">
                            合计：<span class="cart-settlement-price">￥{{ cartGoodsTotalPrice }}</span>
                        </p>
                        <nuxt-link target="_blank" to="" class="cart-settlement-btn" @click.native="confirmCartSettlement">结算</nuxt-link>
                    </div>
                </div>
            </div>
        </div>

        <div :class="bottomCartSettlementContentFixed === true ? 'bottom-fixed-content' : ''"></div>

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
            // 顶部固定
            topTitleContentFixed: false,
            // 底部固定
            bottomCartSettlementContentFixed: false,
            // 是否全选
            cartAllSelect: false,
            // 总数
            cartGoodsCount: 0,
            // 总价
            cartGoodsTotalPrice: '0.00',
            // 货物列表
            storeList: [],
            // 选择的购物车列表
            selectedCartsIdList: []
        };
    },
    computed: {
        // cartAllSelect: {
        //     get () {
        //         return this.value;
        //     },
        //     set (value) {
        //     }
        // }
    },
    created() {
        this.pageInitRequestData();
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    components: {
        Toper,
        Slide,
        Subject,
        Footer
    },
    methods: {
        // 初始化请求数据
        async pageInitRequestData() {
            let cartData = await axios({
                url: this.$domain + '/mer/mall/itemCart/v1',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                }
            });
            if (cartData && cartData.data && cartData.data.body && cartData.data.body.storeList && cartData.data.body.storeList.length > 0) {
                cartData = cartData.data.body.storeList.filter(function(item) {
                    let invalidItem = item.storeId !== 'MER1901044502' && !!item.carList && item.carList.length > 0;
                    if (invalidItem) {
                        item.shopSelect = false; // 初始未选中店铺
                        item.carList.forEach(function(goodsItem) {
                            goodsItem.goodsSelect = false; // 初始未选中商品
                        });
                    }
                    return invalidItem;
                });
                this.storeList = cartData;

                this.updateBottomCartSettlementContentFixed();
            }
        },
        updateBottomCartSettlementContentFixed() {
            let fixedTotalGoodsCount = 0;
            this.storeList.forEach(function(shopItem) {
                fixedTotalGoodsCount += shopItem.carList.length;
            });
            fixedTotalGoodsCount > 4 ? (this.bottomCartSettlementContentFixed = true) : (this.bottomCartSettlementContentFixed = false);

            if (this.storeList.length === 0) {
                this.cartAllSelect = false;
            }
        },
        selectAddShopAllGoodsToCart(shopItem) {
            shopItem.shopSelect = !shopItem.shopSelect;
            let goodsCount = shopItem.carList.length;
            let cartGoodsPrice = Number(this.cartGoodsTotalPrice);
            let myThis = this;
            shopItem.carList.forEach(function(goodsItem) {
                if (shopItem.shopSelect) {
                    if (goodsItem.goodsSelect) {
                        goodsCount--;
                    } else {
                        cartGoodsPrice += myThis.calculateCartGoodsPrice(goodsItem, true);
                    }
                } else {
                    if (!goodsItem.goodsSelect) {
                        goodsCount--;
                    } else {
                        cartGoodsPrice -= myThis.calculateCartGoodsPrice(goodsItem, true);
                    }
                }
                goodsItem.goodsSelect = shopItem.shopSelect;
            });
            if (shopItem.shopSelect) {
                this.cartGoodsCount += goodsCount;
            } else {
                this.cartGoodsCount -= goodsCount;
            }
            if (cartGoodsPrice < 0.0) {
                cartGoodsPrice = 0.0;
            }
            this.cartGoodsTotalPrice = cartGoodsPrice.toFixed(2);

            this.judgeCartAllSelect();
        },
        selectAddShopOneGoodsToCart(shopItem, goodsItem) {
            goodsItem.goodsSelect = !goodsItem.goodsSelect;
            let allSelect = true;
            shopItem.carList.some(function(item) {
                if (!item.goodsSelect) {
                    allSelect = false;
                    return true;
                }
            });
            shopItem.shopSelect = allSelect;
            let cartGoodsPrice = Number(this.cartGoodsTotalPrice);
            if (goodsItem.goodsSelect) {
                this.cartGoodsCount += 1;
                cartGoodsPrice += this.calculateCartGoodsPrice(goodsItem, true);
            } else {
                this.cartGoodsCount -= 1;
                cartGoodsPrice -= this.calculateCartGoodsPrice(goodsItem, true);
            }
            if (cartGoodsPrice < 0.0) {
                cartGoodsPrice = 0.0;
            }
            this.cartGoodsTotalPrice = cartGoodsPrice.toFixed(2);

            this.judgeCartAllSelect();
        },
        cartAllSelectShopGoods() {
            if (this.storeList.length > 0) {
                this.cartAllSelect = !this.cartAllSelect;
                let allSelect = this.cartAllSelect;
                let allGoodsCount = 0;
                let allGoodsPrice = 0;
                let myThis = this;
                this.storeList.forEach(function(item) {
                    item.shopSelect = allSelect;
                    item.carList.forEach(function(goodsItem) {
                        goodsItem.goodsSelect = allSelect;
                        if (allSelect) {
                            allGoodsPrice += myThis.calculateCartGoodsPrice(goodsItem, true);
                        }
                    });
                    allGoodsCount += item.carList.length;
                });
                if (allSelect) {
                    this.cartGoodsCount = allGoodsCount;
                    if (allGoodsPrice < 0.0) {
                        allGoodsPrice = 0.0;
                    }
                    this.cartGoodsTotalPrice = allGoodsPrice.toFixed(2);
                } else {
                    this.cartGoodsCount = 0;
                    this.cartGoodsTotalPrice = '0.00';
                }
            } else {
                $.message({
                    message: '没有商品哦！',
                    type: 'info'
                });
            }
        },
        increaseReduceGoodsCount(increaseGoods, goodsItem) {
            if (increaseGoods) {
                // 加
                if (goodsItem.mallGoodsAmount >= Number(goodsItem.skuTotal)) {
                    $.message({
                        message: '亲，已超出库存了哦！',
                        type: 'info'
                    });
                } else {
                    goodsItem.mallGoodsAmount++;
                    if (goodsItem.goodsSelect) {
                        let cartGoodsPrice = Number(this.cartGoodsTotalPrice);
                        cartGoodsPrice += this.calculateCartGoodsPrice(goodsItem, false);
                        if (cartGoodsPrice < 0.0) {
                            cartGoodsPrice = 0.0;
                        }
                        this.cartGoodsTotalPrice = cartGoodsPrice.toFixed(2);
                    }
                    this.updateCartGoodsCountReqeust(goodsItem);
                }
            } else {
                // 减
                if (goodsItem.mallGoodsAmount > 1) {
                    goodsItem.mallGoodsAmount--;
                    if (goodsItem.goodsSelect) {
                        let cartGoodsPrice = Number(this.cartGoodsTotalPrice);
                        cartGoodsPrice -= this.calculateCartGoodsPrice(goodsItem, false);
                        if (cartGoodsPrice < 0.0) {
                            cartGoodsPrice = 0.0;
                        }
                        this.cartGoodsTotalPrice = cartGoodsPrice.toFixed(2);
                    }
                    this.updateCartGoodsCountReqeust(goodsItem);
                }
            }
        },
        judgeCartAllSelect() {
            let allSelect = true;
            this.storeList.some(function(item) {
                if (!item.shopSelect) {
                    allSelect = false;
                    return true;
                }
                item.carList.some(function(goodsItem) {
                    if (!goodsItem.goodsSelect) {
                        allSelect = false;
                        return true;
                    }
                });
                if (!allSelect) {
                    return true;
                }
            });
            this.cartAllSelect = allSelect;
        },
        calculateCartGoodsPrice(goodsItem, needAmout) {
            if (needAmout) {
                return (Number(goodsItem.skuSaleprice) || Number(goodsItem.perPrice)) * Number(goodsItem.mallGoodsAmount);
            }
            return Number(goodsItem.skuSaleprice) || Number(goodsItem.perPrice);
        },
        updateSelectCartsIdList() {
            this.selectedCartsIdList.length = 0;
            let myThis = this;
            this.storeList.forEach(function(shopItem) {
                shopItem.carList.forEach(function(goodsItem) {
                    if (goodsItem.goodsSelect) {
                        myThis.selectedCartsIdList.push(goodsItem.cartsId);
                    }
                });
            });
        },
        deleteCartOneGoods(shopItem, cartsIdVal) {
            this.deleteCartGoodsReqeust(false, shopItem, cartsIdVal);
            // this.updateDeleteCartOneGoods(shopItem, cartsIdVal);
        },
        deleteCartAllGoods() {
            if (this.storeList.length > 0) {
                this.updateSelectCartsIdList();
                if (this.selectedCartsIdList.length === 0) {
                    $.message({
                        message: '请选择需要删除的商品!',
                        type: 'info'
                    });
                } else {
                    let deleteCartsIdStr = this.selectedCartsIdList.join(',');
                    this.deleteCartGoodsReqeust(true, null, deleteCartsIdStr);
                    // this.updateDeleteCartAllGoods();
                }
            } else {
                $.message({
                    message: '没有商品哦！',
                    type: 'info'
                });
            }
        },
        async deleteCartGoodsReqeust(deleteAll, shopItem, cartsIdVal) {
            let resultData = await axios({
                url: this.$domain + '/mer/mall/deleteCart',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                },
                data: {
                    cartIds: cartsIdVal
                }
            });
            if (resultData.data.msgCd === this.$msgCode.success) {
                if (deleteAll) {
                    this.updateDeleteCartAllGoods();
                } else {
                    this.updateDeleteCartOneGoods(shopItem, cartsIdVal);
                }
                $.message({
                    message: resultData.data.msgInfo,
                    type: 'success'
                });
            } else {
                $.message({
                    message: resultData.data.msgInfo,
                    type: 'error'
                });
            }
        },
        updateDeleteCartOneGoods(shopItem, cartsIdVal) {
            let goodsItem = null;
            shopItem.carList.some((item, index) => {
                if (item.cartsId === cartsIdVal) {
                    goodsItem = item;
                    shopItem.carList.splice(index, 1);
                    return true;
                }
            });
            if (shopItem.carList.length === 0) {
                this.storeList.some((item, index) => {
                    if (item.storeId === shopItem.storeId) {
                        this.storeList.splice(index, 1);
                        return true;
                    }
                });
            }
            if (goodsItem) {
                let cartGoodsPrice = Number(this.cartGoodsTotalPrice);
                if (goodsItem.goodsSelect) {
                    this.cartGoodsCount -= 1;
                    cartGoodsPrice -= this.calculateCartGoodsPrice(goodsItem, true);
                }
                if (cartGoodsPrice < 0.0) {
                    cartGoodsPrice = 0.0;
                }
                this.cartGoodsTotalPrice = cartGoodsPrice.toFixed(2);
            }

            this.updateBottomCartSettlementContentFixed();
        },
        updateDeleteCartAllGoods() {
            let myThis = this;
            this.selectedCartsIdList.some(function(deleteCartsId) {
                myThis.storeList.some(function(shopItem, index) {
                    let sameCartsId = false;
                    shopItem.carList = shopItem.carList.filter(function(item) {
                        sameCartsId = item.cartsId === deleteCartsId;
                        return !sameCartsId;
                    });
                    if (sameCartsId) {
                        myThis.cartGoodsCount = 0;
                        myThis.cartGoodsTotalPrice = '0.00';

                        if (shopItem.carList.length === 0) {
                            myThis.storeList.splice(index, 1);
                        }
                        return true;
                    }
                });
            });

            this.updateBottomCartSettlementContentFixed();
        },
        async updateCartGoodsCountReqeust(goodsItem) {
            await axios({
                url: this.$domain + '/mer/mall/updateCart',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                },
                data: {
                    mallGoodsAmount: goodsItem.mallGoodsAmount,
                    cartsId: goodsItem.cartsId,
                    skuId: goodsItem.skuId,
                    skuimg: goodsItem.skuimg
                }
            });
        },
        confirmCartSettlement() {
            if (this.storeList.length > 0) {
                this.updateSelectCartsIdList();
                if (this.selectedCartsIdList.length === 0) {
                    $.message({
                        message: '请选择对应的商品!',
                        type: 'info'
                    });
                } else {
                    let cartsIdStr = this.selectedCartsIdList.join(',');
                    // this.confirmCartSettlementReqeust(cartsIdStr);
                    this.$router.push({
                        name: 'maiji-shop-confirm-order',
                        params: {
                            type: 'myCart',
                            carIds: cartsIdStr
                        }
                    });
                }
            } else {
                $.message({
                    message: '没有商品哦！',
                    type: 'info'
                });
            }
        },
        async confirmCartSettlementReqeust(cartsIdStr) {
            let carOrderDetail = await axios({
                url: this.$domain + '/mer/mall/comfirmOrderFromCar',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                },
                data: {
                    payType: 'PC',
                    carIds: cartsIdStr
                }
            });
        },
        handleScroll() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let offsetTop = document.querySelector('#topTitleContent').offsetTop - 50.0;
            scrollTop > offsetTop && scrollTop > 56.0 ? (this.topTitleContentFixed = true) : (this.topTitleContentFixed = false);

            // let offsetBottom = document.querySelector('#cartWhiteContent').offsetHeight - document.querySelector('#cartWhiteContent').offsetTop;
            // (scrollTop > offsetBottom) ? this.bottomCartSettlementContentFixed = false : this.bottomCartSettlementContentFixed = true;
            let offsetBottom1 = document.documentElement.scrollHeight - scrollTop;
            let offsetBottom2 = document.documentElement.clientHeight + 361.0;
            offsetBottom1 < offsetBottom2 ? (this.bottomCartSettlementContentFixed = false) : (this.bottomCartSettlementContentFixed = true);
        }
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    }
};
</script>
