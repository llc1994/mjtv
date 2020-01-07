<template>
    <div class="container">
        <!-- 顶部导航 -->
        <Toper :toperParams="toperParams" />
        <!-- 商品详情 -->
        <div class="goods-detail">
            <!-- <div class="wrap"> -->
            <div class="blank"></div>

            <!-- 商品内容 -->
            <div class="goods-content">
                <div class="wrap">
                    <ul class="step-case" id="step">
                        <li class="s-cur"><span>1.确认订单信息</span><b></b></li>
                        <li class="s-cur-next"><span>2.确认无误后付款</span><b class="b-1"></b><b class="b-2"></b></li>
                        <li class="s-cur-next"><span>3.确认收货</span><b class="b-1"></b><b class="b-1"></b></li>
                    </ul>
                </div>
                <div class="agree-text">
                    订单信息
                </div>
                <div class="line"></div>
                <div class="order-info">
                    订单信息
                </div>
                <div class="orders-list">
                    <div class="table">
                        <div class="thead">
                            <div class="th flex-percent-30">宝贝</div>
                            <div class="th flex-percent-10">状态</div>
                            <div class="th flex-percent-10">单价(元)</div>
                            <div class="th flex-percent-10">数量</div>
                            <div class="th flex-percent-20">优惠</div>
                            <div class="th flex-percent-10">商品总价(元)</div>
                            <div class="th flex-percent-10">运费(元)</div>
                        </div>
                        <div v-if="orders">
                            <!-- 循环商户 -->
                            <div v-for="(item, index) in orders.orderMerChantList" :key="index">
                                <!-- 商户信息 -->
                                <div class="chant-info">
                                    <div
                                        class="img background-contain"
                                        :style="{
                                            backgroundImage: 'url(' + item.logoImg + '?x-oss-process=image/resize,h_60/format,jpeg/quality,Q_90)',
                                        }"
                                    ></div>
                                    <div class="txt flex-center">
                                        {{ item.storeName }}
                                    </div>
                                </div>
                                <!-- 订单表格 -->
                                <div class="tbody fx">
                                    <!-- 遍历同一商户下的订单 -->
                                    <div class="tr fx" v-for="(item2, index2) in item.mallOrderGoodsList" :key="index2">
                                        <div class="td flex-percent-30 td-line2" style="padding:10px;">
                                            <div class="good-table-info">
                                                <img :src="item2.mallGoodsImg" />
                                                <div class="text">
                                                    {{ item2.mallGoodsName }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="td flex-percent-10">
                                            待支付
                                        </div>
                                        <div class="td flex-percent-10">
                                            {{ item2.perPrice }}
                                        </div>
                                        <div class="td flex-percent-10">
                                            {{ goodsBuyNumber }}
                                        </div>
                                        <div class="td flex-percent-20"></div>
                                        <div class="td flex-percent-10">
                                            {{ (item2.perPrice * goodsBuyNumber).toFixed(2) }}
                                        </div>
                                        <div class="td flex-percent-10">
                                            {{ item2.fareprice }}
                                        </div>
                                    </div>
                                </div>
                                <div class="pay-tips">
                                    合计金额：<span class="highlight">{{ item.mallGoodsAmt }}</span
                                    >元
                                </div>
                                <div class="line"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 选择收获地址 -->
        <div style="height:15px;background-color:#f4f4f4;"></div>
        <div class="bottom-wrap" v-if="confirmOrderStep === 1">
            <div class="bottom-address">
                <div class="text-tips">选择收货地址</div>
                <div class="line"></div>
                <div v-if="AddressList.list">
                    <div :class="isactive == index ? 'addressClass' : 'addressDiv'" @click="selectAddress(index)" v-for="(item, index) in AddressList.list.slice(0, forNum)" :key="index">
                        <div class="txt1">{{ item.region + item.name }}</div>
                        <div class="txt2">{{ item.address }}</div>
                        <div class="txt3">
                            电话：{{ item.mobileNum }}
                            <p class="modify" @click="ShowUpdAddress(item)">
                                修改
                            </p>
                        </div>
                    </div>
                </div>
                <div class="more" @click="moreAddress" v-if="AddressList.list.length > forNum">更多地址 &gt;</div>
            </div>
            <div class="submitOrder">
                <div class="button" @click="submit">提交订单</div>
            </div>

            <!-- 新增地址弹框 -->
            <div class="layer" v-show="isAddressPanelShow">
                <div class="form-add-address">
                    <div class="title">
                        <div class="text" v-show="popupType === 'insert'">
                            新增地址
                        </div>
                        <div class="text" v-show="popupType === 'update'">
                            编辑地址
                        </div>
                        <div class="close" @click="closeAddressPanel">
                            <img src="/close.png" />
                        </div>
                    </div>
                    <div class="line">
                        <div class="label">收货人</div>
                        <div class="value">
                            <input type="text" placeholder="请输入收货人" v-model="detail.name" />
                        </div>
                    </div>
                    <div class="line">
                        <div class="label">联系电话</div>
                        <div class="value">
                            <input type="text" placeholder="请输入联系电话" v-model="detail.mobileNum" />
                        </div>
                    </div>
                    <div class="line">
                        <div class="label">所在地区</div>
                        <div class="value">
                            <select id="s_province"></select>
                            <select id="s_city"> </select>
                            <select id="s_county"> </select>
                        </div>
                    </div>
                    <div class="line">
                        <div class="label">详细地址</div>
                        <div class="value">
                            <input type="text" placeholder="请输入详细地址" v-model="detail.address" />
                        </div>
                    </div>
                    <div class="line">
                        <div class="label">邮政编号</div>
                        <div class="value">
                            <input type="text" placeholder="（非必填）" />
                        </div>
                    </div>
                    <div class="button-group">
                        <div class="button" @click="InsAddress">确认</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 二维码 -->
        <div class="bottom-wrap" v-show="confirmOrderStep === 2">
            <div class="bottom-code">
                <div class="text-tips">扫码支付</div>
                <div class="wxqrcode qrcode" id="wxqrcode" ref="wxqrcode"></div>

                <div class="qrcode-tips">
                    <div></div>
                    <div>使用微信扫码支付</div>
                    <div></div>
                </div>

                <div class="aliqrcode qrcode" id="aliqrcode" ref="aliqrcode"></div>

                <div class="qrcode-tips">
                    <div></div>
                    <div>使用支付宝扫码支付</div>
                    <div></div>
                </div>
            </div>
        </div>

        <div style="height:30px;background-color:#f4f4f4;"></div>
        <!-- 底部 -->
        <Footer />
    </div>
</template>
<script>
import Toper from '~/components/Toper.vue';
import Footer from '~/components/Footer.vue';
import axios from 'axios';
// import QRCode from "qrcodejs2";
export default {
    data() {
        return {
            // 顶部参数
            toperParams: {
                backgroundColor: 'white',
                category: 'maiji-shop',
            },
            // 确认订单步骤
            confirmOrderStep: 1,
            // 订单信息
            orders: {},
            forNum: 4,
            addressClass: '',
            isactive: -1,
            // 是否显示地址面板
            isAddressPanelShow: false,
            popupType: 'insert',
            menu: {
                isActive: 'user-address',
            },
            // 地址列表
            AddressList: {},
            // 地址详情
            detail: {
                addrId: '',
                name: '',
                mobileNum: '',
                address: '',
                province: '',
                city: '',
                region: '',
            },
            chantGoodsList: [],
            userAdress: '',
            saleModule: 'HOTSELLING',
            cashType: 'WECHATPAY',
            userCouponId: '',
            memberDisCount: '',
            userName: '',
            userPhone: '',
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
        },
        // 购买详情
        goodsBuyDetail() {
            return MJStore.get('mj_goodsBuyDetail') || {};
        },
        // 购买数量
        goodsBuyNumber() {
            return MJStore.get('mj_goodsBuyNumber') || 0;
        },
        // 商品规格
        goodsBuySpec() {
            return MJStore.get('mj_goodsBuySpec') || {};
        },
    },
    async mounted() {
        var that = this;
        // 生成预订单信息
        let orders = await axios({
            url: this.$domain + '/mer/mall/confirmCreateOrder',
            method: 'post',
            headers: {
                token: this.$store.state.session.token || '',
            },
            data: {
                buyType: 'CASH',
                confirmtype: 0,
                skuimg: this.goodsBuySpec.skuimg,
                buyType: this.goodsBuyDetail.buyType,
                payType: 'PC',
                mallGoodsAmount: this.goodsBuyNumber, // 商品购买数据
                skuId: this.goodsBuySpec.skuId, // 规格id
                payTotalPrice: this.goodsBuyNumber * this.goodsBuyDetail.perPrice,
                mallGoodsId: this.goodsBuyDetail.mallGoodsId,
            },
        });
        if (orders.data && orders.data.msgCd === that.$msgCode.success && orders.data.body !== undefined) {
            // 存储订单信息
            MJStore.set('mj_goodsOrderDetail', orders.data.body);
            this.orders = orders.data.body;
        } else {
            this.orders = {};
        }

        // ------------
        // 返回信息参考
        // ===============================================
        // orderInfo.data.body = {
        //     userName: null,
        //     userPhone: null,
        //     userAdress: null,
        //     userId: "urm712bd239b17140f9a3f559bdc106b2fb",
        //     orderPrice: "26.00",
        //     orderMerChantList: [
        //         {
        //             storeName: "灵动创想",
        //             storeId: "MER1909023501",
        //             mallOrderGoodsList: [
        //                 {
        //                     mallGoodsId: "GOODS20190911023026",
        //                     mallGoodsName:
        //                         "儿童玩具恐龙蛋帮帮龙奇趣蛋迷你变形随机盲盒公仔",
        //                     skuId: null,
        //                     skuKey: null,
        //                     skuIdKeys: null,
        //                     mallGoodsAmount: "1",
        //                     oriPrice: "69.00",
        //                     perPrice: "26.00",
        //                     chantId: "MER1909023501",
        //                     mallGoodsType: "PHYSICAL",
        //                     mallGoodsBalance: "100",
        //                     skuTotal: null,
        //                     mallGoodsImg:
        //                         "http://oss-maijitv.maijimeng.com/f383b0430fb74c398fced79f3726eb3c.jpg",
        //                     skuSaleprice: null,
        //                     buyType: "CASH",
        //                     mallGoodsDes: null,
        //                     currentSeckill: null,
        //                     fareprice: null,
        //                     skuimg: null
        //                 }
        //             ],
        //             merExpressTempList: [],
        //             couponList: [],
        //             mallGoodsCount: "1",
        //             mallGoodsAmt: "26.00",
        //             fareprice: "0",
        //             logoImg:
        //                 "http://oss-maijitv.maijimeng.com/6acd90971eb543b8bf48c3cc69fbd034.png",
        //             isV: 1,
        //             vLevel: 1,
        //             vName: "企业官方认证店铺",
        //             vLogo:
        //                 "http://oss-maijitv.maijimeng.com/de9b9b6a52694e19b407c491c30394c4.png"
        //         }
        //     ]
        // };
        // ================================================

        //https://mengdata.maijimaiji.cn/urm/findAddressList
        //pageSize pageNum
        // 地址列表
        let AddressList = await axios({
            url: this.$domain + '/urm/findAddressList',
            method: 'post',
            headers: {
                token: this.$store.state.session.token || '',
            },
            data: {
                pageNum: 1,
                pageSize: 100,
            },
        });
        if (AddressList.data && AddressList.data.msgCd === that.$msgCode.success && AddressList.data.body !== undefined) {
            this.AddressList = AddressList.data.body;
        } else {
            this.AddressList = {};
        }

        // AddressList.data.body = {
        //     pageNum: 1,
        //     pageSize: 1,
        //     pageCount: 1,
        //     list: [
        //         {
        //             name: "张伟",
        //             mobileNum: "18675829412",
        //             region: "江西省 南昌市 东湖区",
        //             address: "圣爵菲斯大酒店欢城6楼",
        //             defaultFlag: 0,
        //             tag: null,
        //             addrId: "urme19499a24f454358a07eb96bae95013a"
        //         }
        //     ]
        // };
    },
    components: {
        Toper,
        Footer,
    },
    methods: {
        //提交订单
        async submit() {
            let that = this;
            // 如果没选择地址
            if (this.isactive == -1) {
                $.message({
                    message: '请选择收货地址',
                    type: 'info',
                });
                return;
            }
            if (this.orders.userId) {
                // 商户-商品-列表
                let chantGoodsList = [];
                this.orders.orderMerChantList.forEach(function(chant, index) {
                    // 商户-商品-单个组合
                    let chantGoodsItem = {
                        chantId: chant.storeId,
                    };
                    // 商品-列表
                    let goodsList = [];
                    chant.mallOrderGoodsList.forEach(function(goods) {
                        goodsList.push({
                            mallGoodsAmount: goods.mallGoodsAmount,
                            mallGoodsId: goods.mallGoodsId,
                            skuId: goods.skuId,
                        });
                    });
                    chantGoodsItem.goodsList = goodsList;
                    // 增加一个商户和此商户下的所有订单
                    chantGoodsList.push(chantGoodsItem);
                });
                this.chantGoodsList = chantGoodsList;

                //直接下单
                let reply = await axios({
                    url: this.$domain + '/mer/mall/createOrder',
                    method: 'post',
                    headers: {
                        token: this.$store.state.session.token || '',
                    },
                    data: {
                        buyType: 'CASH',
                        userAdress: this.userAdress,
                        payType: 'PC',
                        saleModule: 'HOTSELLING',
                        cashType: 'WECHATPAY',
                        userCouponId: '',
                        memberDisCount: '',
                        userName: this.userName,
                        userPhone: this.userPhone,
                        payTotalPrice: this.goodsBuyNumber * this.goodsBuyDetail.perPrice,
                        chantGoodsList: this.chantGoodsList,
                    },
                });
                // ------------------
                // 返回值参考
                // ------------------
                // reply.data.body = {
                //     orderId: 'MALL20191020011516',
                //     userId: null,
                //     allGoodsAmt: null,
                //     orderDepict: null,
                //     deliverAmt: null,
                //     orderAmt: null,
                //     realAmt: null,
                //     payFrom: null,
                //     orderType: null,
                //     orderInfo: '{"ALIPAY":"https://qr.alipay.com/bax070424gcvrjtk4b0z60a9","WECHATPAY":"weixin://wxpay/bizpayurl?pr=s0wKSdK"}',
                //     orderSts: null,
                // };

                if (reply.data && reply.data.msgCd === that.$msgCode.success && reply.data.body !== undefined) {
                    // 序列化订单信息
                    reply.data.body.orderInfo = JSON.parse(reply.data.body.orderInfo);
                    MJStore.set('mj_goodsOrderResult', reply.data.body);
                    this.$router.push('/maiji-shop-paying2');
                } else {
                    $.message({
                        message: reply.data.msgInfo,
                        type: 'error',
                    });
                }
            }
        },
        moreAddress() {
            this.forNum += 10;
        },
        // 显示更新地址弹框
        ShowUpdAddress(item) {
            this.isAddressPanelShow = true;
            this.popupType = 'update';
            this.detail = item;
        },
        // 关闭地址弹框
        closeAddressPanel() {
            this.isAddressPanelShow = false;
        },
        // 选择地址
        selectAddress: function(index) {
            this.isactive = index;
            this.userName = this.AddressList.list[index].name;
            this.userAdress = this.AddressList.list[index].region + ' ' + this.AddressList.list[index].address;
            this.userPhone = this.AddressList.list[index].mobileNum;
        },
        enter() {
            //alert("enter")
        },
        leave() {
            // alert("leave")
        },
        // 更新地址
        async UpdAddress(item) {},
        // 新增收货地址
        async InsAddress(item) {
            let that = this;
            // addrId 主键
            // name 收件人姓名
            // mobileNum 联系手机号
            // region 收货城市
            // address 收货详细地址
            // defaultFlag 0 非默认收货地址 1 是默认收货地址
            // tag 标签（如：公司、家等）
            let _province = document.getElementById('s_province').value;
            let _city = document.getElementById('s_city').value;
            let _county = document.getElementById('s_county').value;
            let reply = {};

            if (this.popupType === 'insert') {
                reply = await axios({
                    url: this.$domain + '/urm/addAddress',
                    method: 'post',
                    headers: {
                        token: this.$store.state.session.token || '',
                    },
                    data: {
                        name: this.detail.name,
                        mobileNum: this.detail.mobileNum,
                        address: this.detail.address,
                        region: _province + _city + _county,
                    },
                });
            }
            if (this.popupType === 'update') {
                reply = await axios({
                    url: this.$domain + '/urm/modifyAddress',
                    method: 'post',
                    headers: {
                        token: this.$store.state.session.token || '',
                    },
                    data: {
                        addrId: this.detail.addrId,
                        name: this.detail.name,
                        mobileNum: this.detail.mobileNum,
                        address: this.detail.address,
                        region: _province + _city + _county,
                    },
                });
            }

            if (reply.data.msgCd === this.$msgCode.success) {
                this.isAddressPanelShow = false;
                location.reload();
                $.message({
                    message: reply.data.msgInfo,
                    type: 'success',
                });
                location.reload();
            } else {
                $.message({
                    message: reply.data.msgInfo,
                    type: 'error',
                });
            }
        },
        // 设置默认地址
        async SetDefault(item) {
            let reply = await axios({
                url: this.$domain + '/urm/replaceDefaultAddress',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || '',
                },
                data: {
                    addrId: item.addrId,
                },
            });
            if (reply.data.msgCd === this.$msgCode.success) {
                location.reload();
                $.message({
                    message: reply.data.msgInfo,
                    type: 'success',
                });
            } else {
                $.message({
                    message: reply.data.msgInfo,
                    type: 'error',
                });
            }
        },
        // 删除地址
        async DelAddress(item) {
            let reply = await axios({
                url: this.$domain + '/urm/deleteAddress',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || '',
                },
                data: {
                    addrId: item.addrId,
                },
            });
            if (reply.data.msgCd === this.$msgCode.success) {
                location.reload();
                $.message({
                    message: reply.data.msgInfo,
                    type: 'success',
                });
            } else {
                $.message({
                    message: reply.data.msgInfo,
                    type: 'error',
                });
            }
        },
        // 新增地址弹框
        newAddress() {
            this.popupType = 'insert';
            this.isAddressPanelShow = true;
            this.detail = {
                addrId: '',
                name: '',
                mobileNum: '',
                address: '',
                province: '',
                city: '',
                region: '',
            };
        },
    },
};
</script>
<style lang="scss" scoped>
.thead {
    height: 40px;
    line-height: 40px;
    background-color: #00adef;
    color: #fff;
    display: flex;
    .th {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

// 商户头信息
.chant-info {
    height: 50px;
    display: flex;
    .img {
        flex: 0 0 50px;
    }
    .txt {
        flex: 0 0 auto;
        padding: 0 10px;
    }
}
// 商品表格显示，头部信息
.good-table-info {
    -webkit-line-clamp: 2;
    overflow: hidden;
    -webkit-box-orient: vertical;
    img {
        float: left;
        height: 38px;
        margin-right: 5px;
    }
    .text {
        text-align: left;
        width: 100%;
    }
}
.tbody {
    border: 1px solid #ddd;
    .tr {
        display: flex;
        .td:last-of-type {
            border-right: 0;
        }
    }
    .td {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border-right: 1px solid #ddd;
    }
}
.tableDiv {
    display: contents;
}
.goods-detail {
    background-color: #f4f4f4;
    padding: 0 2rem;
}
.top-tips {
    display: flex;
    height: 50px;
    align-items: center;
    color: red;
    .group {
        flex: 0 0 auto;
        display: flex;
        // align-items: center;
        line-height: 18px;
        margin-right: 40px;
        .img {
            flex: 0 0 20px;
            height: 20px;
            width: 20px;
            background-color: #ddd;
            margin-right: 4px;
        }
        .txt {
            height: 20px;
            flex: 0 0 auto;
        }
    }
}
.line {
    border: 1px solid #00adef;
    margin-top: 10px;
    margin-bottom: 10px;
}
table {
    width: 100%;
    border: 1px solid gray;
}
table thead tr {
    border: 1px solid gray;
    background-color: #00adef;
}
table td {
    border: 1px solid gray;
    text-align: center;
    vertical-align: middle;
}
.td-line2 {
    overflow: hidden;
    line-height: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    text-overflow: -o-ellipsis-lastline;
}

.pay-tips {
    text-align: right;
    font-size: 18px;
    margin-top: 10px;
    .highlight {
        color: red;
        font-size: 26px;
    }
}

.agree-text {
    font-size: 24px;
    margin: 10px;
}

.order-text {
    font-size: 18px;
    .order-text-inner {
        font-size: 18px;
        color: #999999;
    }
}

.goods-content {
    padding: 0.5rem;
    background-color: #fff;
    margin-top: 10px;
    .goods-main {
        .col {
            height: 8rem;
        }
        .goods-main_right {
            padding-left: 20px;
        }
        .goods-title {
            height: 1rem;
            line-height: 0.5rem;
            overflow: hidden;
            font-size: 30px;
        }
        .goods-action {
            display: flex;
            align-items: center;
            font-size: 20px;
            .group {
                display: flex;
                align-items: center;
                flex: 0 0 auto;
                margin-right: 20px;
            }
        }
    }
    .goods-cover {
        height: 7rem;
        background-color: #8ac;
    }
    .goods-thumbnail {
        height: 1rem;
        background-color: #998;
    }
}

.blank {
    height: 10px;
}

.order-info {
    font-size: 18px;
    margin: 10px;
}

ul {
    margin: 0px;
    padding: 0px;
    list-style: none;
}
.wrap {
    width: 100%;
    height: auto;
    line-height: 30px;
    margin: 0px auto 0;
    padding: 0px;
}
.step-case {
    height: 40px;
}
.step-case li {
    float: left;
    margin: 0px;
    width: 33.3%;
    position: relative;
}
.step-case li span {
    display: block;
    background-color: #ccc;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-weight: bold;
}
.step-case b {
    position: absolute;
    font-size: 0px;
    line-height: 0px;
    top: 0px;
}
.step-case .b-l {
    border-width: 2px 2px 2px 0;
    border-style: dashed solid dashed dashed;
    border-color: transparent #ccc transparent transparent;
    height: 36px;
    left: -2px;
}
.step-case .b-r {
    border-width: 2px 0 2px 2px;
    border-style: dashed dashed dashed solid;
    border-color: transparent transparent transparent #ccc;
    height: 36px;
    right: -2px;
}
.step-case .b-1 {
    border-width: 20px 0 20px 20px;
    border-style: solid dashed solid solid;
    border-color: #ccc transparent #ccc #ccc;
    left: -20px;
}
.step-case .b-2 {
    border-width: 20px 0 20px 20px;
    border-style: dashed dashed dashed solid;
    border-color: transparent transparent transparent #ccc;
    left: -21px;
}
/*当前状态*/
.step-case .s-cur span {
    background-color: #00adef;
}
.step-case .s-cur .b-l {
    border-right-color: #00adef;
}
.step-case .s-cur .b-r {
    border-left-color: #00adef;
}
.step-case .s-cur .b-1 {
    border-color: #00adef #00adef #00adef #00adef;
}
.step-case .s-cur .b-2 {
    border-left-color: #ffcd00;
}
/*当前状态后*/
.step-case .s-cur-next .b-2 {
    border-color: transparent transparent transparent#00ADEF;
}
/*完成的状态*/
.step-case .s-finish span {
    background-color: #ffcd00;
    color: #000;
}
.step-case .s-finish .b-l {
    border-right-color: #ffcd00;
}
.step-case .s-finish .b-r {
    border-left-color: #ffcd00;
}
.step-case .s-finish .b-1 {
    border-color: #ffcd00 #ffcd00 #ffcd00 #ffcd00;
}
.step-case .s-finish .b-2 {
    border-left-color: #ffcd00;
}

// hr{
//     border: 1px solid #00ADEF;
//     margin-top: 10px;
//     margin-bottom: 10px;
// }
.bottom-wrap {
    background-color: #f4f4f4;
    padding: 0 2rem;
}

.bottom-address {
    padding: 0.5rem;
    background-color: #fff;
    .text-tips {
        font-size: 24px;
    }
    display: table;
    min-width: 100%;
}
.submitOrder {
    background-color: #fff;
    height: 72px;
    margin-top: 10px;
    .button {
        float: right;
        margin-top: 10px;
        margin-right: 30px;
        align-items: center;
        flex: 0 0 30px;
        font-size: 24px;
        background-color: red;
        color: #fff;
        height: 46px;
        width: 120px;
        padding: 4px 10px;
        border-radius: 6px;
        display: flex;
        cursor: pointer;
    }
}
.addressClass {
    border: 2px solid #00adef;
    display: table-cell;
    background-color: white;
    width: 250px;
    height: 130px;
    float: left;
    margin-top: 10px;
    margin-right: 10px;
    padding: 10px;
    .txt1 {
        font-size: 18px;
    }
    .txt2 {
        font-size: 15px;
        color: #999999;
        margin-top: 8px;
        margin-bottom: 8px;
    }
    .txt3 {
        font-size: 16px;
        .modify {
            cursor: pointer;
            color: #999999;
            float: right;
            font-size: 13px;
            margin-top: 5px;
        }
    }
}

.addressDiv {
    display: table-cell;
    background-color: #eeeeee;
    width: 250px;
    height: 130px;
    float: left;
    margin-top: 10px;
    margin-right: 10px;
    padding: 10px;
    .txt1 {
        font-size: 18px;
    }
    .txt2 {
        font-size: 15px;
        color: #999999;
        margin-top: 8px;
        margin-bottom: 8px;
    }
    .txt3 {
        font-size: 16px;
        .modify {
            cursor: pointer;
            color: #999999;
            float: right;
            font-size: 13px;
            margin-top: 5px;
        }
    }
}

.more {
    clear: both;
    padding-top: 15px;
    cursor: pointer;
}

// 默认地址
.default {
    background-color: #fff;
    &.active {
        background-color: #00adef;
        color: #fff;
    }

    padding: 3px 8px;
    border-radius: 4px;
}
.form-add-address {
    width: 100%;
    max-width: 500px;
    background-color: #fff;
    padding: 0 10px;
    .title {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid #00adef;
        .text {
            flex: 0 0 auto;
            font-size: 20px;
            font-weight: bold;
        }
        .close {
            flex: 0 0 30px;
            height: 30px;
            cursor: pointer;
            img {
                height: 100%;
                width: 100%;
            }
        }
    }
    .line {
        display: flex;
        height: 50px;
        border-bottom: 1px solid #eee;
        .label {
            flex: 0 0 120px;
            display: flex;
            align-items: center;
            padding: 0 10px;
        }
        .value {
            display: flex;
            flex: 1 1 100%;
            input {
                flex: 1 1 100%;
                height: 100%;
                width: 100%;
            }
            select {
                flex: 1 1 100%;
            }
        }
    }
    .button-group {
        height: 60px;
        padding: 10px;
        display: flex;
        justify-content: center;
        .button {
            display: flex;
            align-items: center;
            height: 100%;
            flex: 0 0 auto;
            padding: 0 20px;
            border-radius: 10px;
            background-color: #00adef;
            color: #fff;
            cursor: pointer;
        }
    }
}
</style>
