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

                <!-- <div class="agree-text">
                    我已收到货,同意支付宝付款
                </div>
                <hr /> -->
                <div class="order-info">
                    查看物流信息
                </div>
                <div class="split-line"></div>
                <template v-if="complateOrderDetail.expressInfo && complateOrderDetail.expressInfo.data">
                <div class="express-line" v-for="(item,index) in complateOrderDetail.expressInfo.data" :key="index">
                    <div class="time">{{item.time}}</div>
                    <div class="context">{{item.context}}</div>
                </div>
                </template>
                <div class="split-line"></div>
                <div class="other-line">
                    <div class="label">运单号码:</div>
                    <div class="value">{{complateOrderDetail.mallOrderId}}</div>
                </div>
                <div class="other-line">
                    <div class="label">物流编号:</div>
                    <div class="value">{{complateOrderDetail.expressNumber}}</div>
                </div>
                <div class="other-line">
                    <div class="label">物流公司:</div>
                    <div class="value">{{complateOrderDetail.expressCompanyName}}</div>
                </div>
                <div class="other-line">
                    <div class="label">客服电话:</div>
                    <div class="value">{{complateOrderDetail.serviceNumber}}</div>
                </div>
                <div class="other-line">
                    <div class="label">卖家昵称:</div>
                    <div class="value" v-if="complateOrderDetail.shopInfo">{{complateOrderDetail.shopInfo.shopName}}</div>
                </div>
                <div class="other-line">
                    <div class="label">发货地址:</div>
                    <div class="value" v-if="complateOrderDetail.shopInfo">{{complateOrderDetail.shopInfo.shopName}}</div>
                </div>
                <div class="other-line">
                    <div class="label">收获地址:</div>
                    <div class="value">{{complateOrderDetail.userAdress}}</div>
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
import axios from 'axios';
import _ from 'lodash';
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
            // 支付类型
            payType: 'WECHATPAY',
            // 超时
            timer: null,
            // 购买开始时间
            buyGoodsTimeStart:Date.now(),
            // 购买结束时间
            buyGoodsTimeEnd:0,
            goodsOrderDetail:{},
            // 完整的订单信息
            complateOrderDetail:{}
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
    },
    components: {
        Toper,
        Footer,
    },
     mounted() {
         this.goodsOrderDetail = MJStore.session.get('goodsOrderDetail') || {};
         this.getExpressInfomation();
         this.getOrderDetail();
    },
    methods: {
        async getOrderDetail(){
            let reply = await axios({
                url:this.$domain + '/mer/mall/getMyOrderDetail/v1',
                method:'post',
                headers:{
                    token:this.$store.state.session.token || ''
                },
                data:{
                    mallOrderId:this.goodsOrderDetail.mallOrderId
                }
            })
            if(reply.data && reply.data.body && _.isObject(reply.data.body)){
                this.complateOrderDetail = reply.data.body;
            }else{
                this.complateOrderDetail = {};
            }

        },
        async getExpressInfomation(){

            let reply = await axios({
                url: this.$domain + '/mer/express/query',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || '',
                },
                data: {
                    com: this.goodsOrderDetail.expressCompanyName,
                    num: this.goodsOrderDetail.expressNumber,
                },
            });
        }


    },
};
</script>
<style lang="scss" scoped>
.express-line{
    display: flex;
    min-height:30px;
    line-height: 30px;
    font-size: 16px;
    .time{
        flex: 0 0 200px;
    }
    .content{
        flex:1 1 100%;
    }
}
.other-line{
    display: flex;
    height: 30px;
    .label{
        flex: 0 0 auto;
        min-width: 120px;
    }
    .value{
        flex: 1 1 100%;
    }
}
.tableDiv {
    display: contents;
}
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
.split-line{
    border-top: 1px solid #00adef;
    margin: 20px 0;
}
.sidtch-pay {
    height: 40px;
    display: flex;
    // align-items: center;
    margin-bottom: 10px;
    .tab {
        flex: 0 0 auto;
        border: 1px solid #eee;
        padding: 0 20px;
        margin-right: 10px;
        cursor: pointer;
    }
    .active {
        border: 1px solid #00adef;
    }
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
.qrcode {
    height: 100px;
}
.qrcode-tips {
    float: left;
    height: 100px;
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