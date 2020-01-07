<template>
    <div class="container">
        <!-- 顶部导航 -->
        <Toper :toperParams="toperParams" />
        <!-- 商品详情 -->
        <div class="goods-detail">
            <!-- <div class="wrap"> -->
            <div class="blank"></div>
            <div class="goods-content">
                <div class="wrap">
                    <ul class="step-case" id="step">
                        <li class="s-finish"><span>1.确认订单信息</span><b></b></li>
                        <li class="s-cur"><span>2.确认无误后付款</span><b class="b-1"></b><b class="b-2"></b></li>
                        <li class="s-cur-next"><span>3.确认收货</span><b class="b-1"></b><b class="b-2"></b></li>
                    </ul>
                </div>

                <div class="agree-text">
                    我已收到货,同意支付宝付款
                </div>
                <hr />
                <div class="order-info">
                    订单信息
                </div>
                <table cellspacing="0">
                    <thead>
                        <tr>
                            <th>宝贝</th>
                            <th>状态</th>
                            <th>单价(元)</th>
                            <th>数量</th>
                            <th>优惠</th>
                            <th>商品总价(元)</th>
                            <th>运费(元)</th>
                        </tr>
                    </thead>
                    <tbody v-if="orders.body != undefined">
                        <tr v-for="(item, index) in orders.body.goodsList" :key="index">
                            <td class="td-line2" style="padding:10px;">
                                <div style="-webkit-line-clamp:2;overflow:hidden;-webkit-box-orient: vertical;">
                                    <img :src="item.mallGoodsEspImg" style="float:left;height: 38px;margin-right:5px;" />
                                    <div style="text-align:left;width:100%;">{{ item.mallGoodsName }}</div>
                                </div>
                            </td>
                            <td>{{ orderState }}</td>
                            <td>{{ item.perPrice.toFixed(2) }}</td>
                            <td>{{ item.mallGoodsAmount }}</td>
                            <td>
                                {{ orders.body.userCoupon != null ? orders.body.userCoupon.couponInfo.name + ',' + orders.body.userCoupon.couponInfo.couponDesc : '' }}
                            </td>
                            <td>{{ (item.perPrice * item.mallGoodsAmount).toFixed(2) }}</td>
                            <td>{{ orders.body.expressFee.toFixed(2) }}</td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="orders.body != undefined" class="pay-tips">
                    实付款：<span class="highlight">{{ orders.body.payTotalPrice.toFixed(2) }}</span
                    >元
                </div>
                <hr />

                <div class="order-text">
                    <div>
                        订单编号：<span v-if="orders.body != undefined" class="order-text-inner">{{ orders.body.mallOrderId }}</span>
                    </div>
                    <div>
                        创建时间：<span v-if="orders.body != undefined" class="order-text-inner">{{ orders.body.createTime }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div style="height:15px;background-color:#f4f4f4;"></div>

        <div style="height:15px;background-color:#f4f4f4;"></div>
        <div class="bottom-wrap">
            <div class="bottom-code">
                <div class="text-tips">扫码支付</div>
                <div class="wxqrcode qrcode" ref="wxqrcode"></div>

                <div class="qrcode-tips">
                    <div></div>
                    <div>使用微信扫码支付</div>
                    <div></div>
                </div>

                <div class="aliqrcode qrcode" ref="aliqrcode"></div>

                <div class="qrcode-tips">
                    <div></div>
                    <div>使用支付宝扫码支付</div>
                    <div></div>
                </div>
            </div>
        </div>

        <div style="background-color:#f4f4f4;"></div>
        <!-- 底部 -->
        <Footer />
    </div>
</template>
<script>
import Toper from '~/components/Toper.vue';
import Footer from '~/components/Footer.vue';
import axios from 'axios';
import QRCode from 'qrcodejs2';
export default {
    data() {
        return {
            toperParams: {
                backgroundColor: 'white',
                category: 'maiji-shop',
            },
            orders: {},
            orderInfo: {},
            order: {},
        };
    },
    computed: {
        userData() {
            return this.$store.state.userData;
        },
        //订单状态 交易成功 SUCCESS 待发货 WAITDELIVER 待支付WAITPAY 待收货WAITTAKE 取消 CANCEL 退款REFUND 关闭 CLOSED
        orderState() {
            if (this.orders.body.orderStatus == 'WAITPAY') return '待支付';
            else if (this.orders.body.orderStatus == 'WAITDELIVER') return '待发货';
            else if (this.orders.body.orderStatus == 'SUCCESS') return '交易成功';
            else if (this.orders.body.orderStatus == 'WAITTAKE') return '待收货';
            else if (this.orders.body.orderStatus == 'CANCEL') return '取消';
            else if (this.orders.body.orderStatus == 'REFUND') return '退款';
            else if (this.orders.body.orderStatus == 'CLOSED') return '关闭';
            else return this.orders.body.orderStatus;
        },
    },
    components: {
        Toper,
        Footer,
    },

    mounted() {
        this.order = this.$route.params;
        this.orderInfo = JSON.parse(this.order.orderInfo);
        this.creatAliQrCode();
        this.creatWxQrCode();
        this.loadOrderInfoByMyCart();
    },
    methods: {
        async loadOrderInfoByMyCart() {
            let orders = await axios({
                url: this.$domain + '/mer/mall/getMyOrderDetail/v1',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || '',
                },
                data: {
                    mallOrderId: this.order.orderId,
                },
            });
            this.orders = orders.data;
            return this.orders.body.orderStatus;
        },

        async loadOrderInfoByBuyNow() {
            let orders = await axios({
                url: this.$domain + '/mer/mall/getMyOrderDetail/v1',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || '',
                },
                data: {
                    mallOrderId: this.order.orderId,
                },
            });
            this.orders = orders.data;
        },

        creatAliQrCode() {
            var aliqrcode = new QRCode(this.$refs.aliqrcode, {
                text: this.orderInfo.ALIPAY,
                width: 100,
                height: 100,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H,
            });
        },
        creatWxQrCode() {
            var wxqrcode = new QRCode(this.$refs.wxqrcode, {
                text: this.orderInfo.WECHATPAY,
                width: 100,
                height: 100,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H,
            });
        },

        checkOrderStatus() {},
    },
};
</script>
<style lang="scss" scoped>
.bottom-wrap {
    background-color: #f4f4f4;
    padding: 0 2rem;
    height: 200px;
}
.bottom-code {
    padding: 0.5rem;
    background-color: #fff;
    .text-tips {
        font-size: 24px;
    }
    display: table;
    min-width: 100%;
}

.qrcode {
    float: left;
    height: 100px;
}
.qrcode-tips {
    float: left;
    height: 100px;
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
hr {
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
        flex: 0 0 auto;
        font-size: 14px;
        color: #ce4031;
        background-color: #faefee;
        padding: 2px 4px;
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
</style>
