<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <div class="user-center">
            <div class="wrap">
                <!-- 用户左侧面板 -->
                <UserMenu :menu="menu" />
                <div class="main">
                    <div class="user-message">
                        <div class="big-title">我的订单</div>

                        <!-- 切换 -->
                        <div class="switch">
                            <div class="tab" :class="{ active: isTab === 'tab1' }" @click="switchTab('tab1')">全部</div>
                            <div class="tab" :class="{ active: isTab === 'tab2' }" @click="switchTab('tab2')">待付款</div>
                            <div class="tab" :class="{ active: isTab === 'tab3' }" @click="switchTab('tab3')">待收货</div>
                            <div class="tab" :class="{ active: isTab === 'tab4' }" @click="switchTab('tab4')">待评价</div>
                        </div>

                        <!-- 赞 -->
                        <div class="panel">
                            <!-- 标题 -->
                            <div class="th">
                                <div class="td name">商品名称</div>
                                <div class="td price">单价</div>
                                <div class="td amount">数量</div>
                                <div class="td total">订单金额</div>
                                <div class="td status">交易状态</div>
                                <div class="td action">交易操作</div>
                            </div>

                            <!-- 订单详情，包括店铺和商品 -->
                            <template v-if="!OrderLists.body.list.length">
                                <img src="/list-holder.jpg" style="display: block;margin: auto; margin-top: 100px;" />
                            </template>
                            <div class="order-detail" v-for="(item, index) in OrderLists.body.list" :key="index">
                                <!-- 订单店铺 -->
                                <div class="order-shop">
                                    <nuxt-link target="_blank" :to="'/mall-storeHome/' + item.chantId" class="img">
                                        <img :src="item.shopInfo.logoUrl" />
                                    </nuxt-link>
                                    <nuxt-link target="_blank" :to="'/mall-storeHome/' + item.chantId" class="name">{{ item.shopInfo.shopName }}</nuxt-link>
                                    <div class="number">订单号：{{ item.mallOrderId }}</div>
                                    <div class="kefu"></div>
                                </div>
                                <!-- 订单列表 -->
                                <div class="order-list">
                                    <div class="tr" v-for="(item2, index2) in item.goodsList" :key="index2">
                                        <div class="td name">
                                            <div class="img">
                                                <img :src="item2.mallGoodsEspImg + '?x-oss-process=image/resize,h_120/format,jpeg/quality,Q_90'" />
                                            </div>
                                            <div class="info">
                                                <div class="title2">{{ item2.mallGoodsName }}</div>
                                                <div class="summary">{{ item2.mallGoodsDes }}</div>
                                            </div>
                                        </div>
                                        <div class="td price">￥{{ item2.skuSaleprice }}</div>
                                        <div class="td amount">{{ item2.mallGoodsAmount }}</div>
                                        <div class="td total">
                                            <div class="number">￥{{ item.payTotalPrice }}</div>
                                        </div>

                                        <!-- 交易成功 -->
                                        <div class="td status" v-if="item.orderStatus === 'SUCCESS'">
                                            <div class="value">交易成功</div>
                                            <div class="where" @click="gotoExpress(item)">查看物流</div>
                                        </div>
                                        <div class="td action" v-if="item.orderStatus === 'SUCCESS'">
                                            <div class="tips" @click="gotoOrderDetail(item)">详情</div>
                                            <div class="tips" @click="evaluate(item)">评价</div>
                                            <div class="tips" style="cursor:pointer;" @click="deleteMyOrder(item, index)">删除订单</div>
                                        </div>

                                        <!-- 待发货 -->
                                        <div class="td status" v-if="item.orderStatus === 'WAITDELIVER'">
                                            <div class="value">买家已付款</div>
                                            <div class="where" @click="gotoExpress(item)">查看物流</div>
                                        </div>
                                        <div class="td action" v-if="item.orderStatus === 'WAITDELIVER'">
                                            <div class="button">确认收货</div>
                                            <div class="tips" @click="gotoOrderDetail(item)">详情</div>
                                            <div class="tips" @click="evaluate(item)">评价</div>
                                        </div>

                                        <!-- 待支付 -->
                                        <div class="td status" v-if="item.orderStatus === 'WAITPAY'">
                                            <div class="value">买家未付款</div>
                                        </div>
                                        <div class="td action" v-if="item.orderStatus === 'WAITPAY'">
                                            <div class="button" @click="PayNow(item)">立即支付</div>
                                            <div class="tips" style="cursor:pointer;" @click="cancelMyOrder(item, index)">取消订单</div>
                                        </div>

                                        <!-- 待收货 -->
                                        <div class="td status" v-if="item.orderStatus === 'WAITTAKE'">
                                            <div class="value">买家已付款</div>
                                            <div class="where" @click="gotoExpress(item)">查看物流</div>
                                        </div>
                                        <div class="td action" v-if="item.orderStatus === 'WAITTAKE'">
                                            <nuxt-link target="_blank" :key="index" :to="'/maiji-shop-payment/' + item.mallOrderId">
                                                <div class="button">确认收货</div>
                                            </nuxt-link>
                                            <div class="tips" @click="gotoOrderDetail(item)">详情</div>
                                            <div class="tips" @click="evaluate(item)">评价</div>
                                        </div>

                                        <!-- 取消 -->
                                        <div class="td status" v-if="item.orderStatus === 'CANCEL'">
                                            <div class="value">订单已取消</div>
                                        </div>
                                        <div class="td action" v-if="item.orderStatus === 'CANCEL'">

                                            <div class="tips" @click="gotoOrderDetail(item)">详情</div>
                                            <div class="tips" style="cursor:pointer;" @click="deleteMyOrder(item, index)">删除订单</div>
                                        </div>

                                        <!-- 退款 -->
                                        <div class="td status" v-if="item.orderStatus === 'REFUND'">
                                            <div class="value">已退款</div>
                                            <div class="where" @click="gotoExpress(item)">查看物流</div>
                                        </div>
                                        <div class="td action" v-if="item.orderStatus === 'REFUND'">
                                            <div class="tips" @click="gotoOrderDetail(item)">详情</div>
                                        </div>

                                        <!-- 关闭 -->
                                        <div class="td status" v-if="item.orderStatus === 'CLOSED'">
                                            <div class="type">交易关闭</div>
                                        </div>
                                        <div class="td action" v-if="item.orderStatus === 'CLOSED'">
                                        </div>
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
import Subject from '~/components/Subject.vue';
import UserMenu from '~/components/UserMenu.vue';
import axios from 'axios';
export default {
    middleware: 'auth',
    data() {
        return {
            toperParams: {
                backgroundColor: 'white',
                category: '',
            },
            menu: {
                //isActive: "user-message"
            },
            // 当前tab值
            isTab: 'tab1',
            // 预支付订单信息
            mallPayOrder:{}
        };
    },
    components: {
        Toper,
        Slide,
        Subject,
        Footer,
        UserMenu,
    },
    async asyncData(context) {
        let res = {};

        // 订单列表
        let OrderLists = await axios({
            url: context.app.$domain + '/mer/mall/getMyOrderList/v1',
            method: 'post',
            headers: {
                token: context.store.state.session.token || '',
            },
            data: {
                pageNum: 1,
                pageSize: 100,
            },
        });
        res.OrderLists = OrderLists.data;

        // 待发货 -> 交易完成
        // 待收货 -> 确认收货
        // 交易关闭 -> 再次购买
        // 未付款 -> 立即付款
        // 退款成功 -> 交易关闭
        // 已退款 -> 删除订单/查看信息
        return res;
    },
    created() {
        // if (!this.$store.state.userData.userId) {
        //     this.$router.push("/");
        // }
    },
    methods: {
        // 评价
        evaluate(item) {
            MJStore.set('mj_evaluteGoodsDetail',item);
            this.$router.push('/order-evalute');
        },
        // 跳转到订单详情
        gotoOrderDetail(item){
            MJStore.set('mj_cancelGoodsOrderDetail',item);
            this.$router.push('/order-cancel');
        },
        // 跳转到物流
        gotoExpress(item){
            MJStore.session.set('goodsOrderDetail',item);
            this.$router.push('/order-express');
        },
        // 立即购买
        async PayNow(item) {
            let that = this;
            // 存储订单信息
            this.mallPayOrder = await this.$merMallPayOrder({
                // cashType: "WECHATPAY",
                mallOrderId: item.mallOrderId,
                payType: 'PC',
            });
            this.mallPayOrder.orderId = item.mallOrderId;
            this.mallPayOrder.orderInfo = JSON.parse(this.mallPayOrder.orderInfo);
            MJStore.set('mj_goodsOrderDetail',item);
            MJStore.set('mj_goodsOrderResult', this.mallPayOrder);
            this.$router.push('/maiji-shop-paying2');
        },
        // 切换订单类型
        switchTab(tab) {
            this.isTab = tab;
            if (tab == 'tab2') {
                this.switchData('WAITPAY');
            } else if (tab == 'tab3') {
                this.switchData('WAITTAKE');
            } else if (tab == 'tab4') {
                this.switchData('SUCCESS', true);
            } else if (tab == 'tab1') {
                this.switchData();
            }
        },
        // 订单列表
        async switchData(param, estimate) {
            let OrderLists = await axios({
                url: this.$domain + '/mer/mall/getMyOrderList/v1',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || '',
                },
                data: {
                    pageNum: 1,
                    pageSize: 10,
                    orderStatus: param,
                    isEstimate: estimate,
                },
            });
            this.OrderLists = OrderLists.data;
        },
        // 取消订单
        async cancelMyOrder(item) {
            if (confirm('确定要取消吗？')) {
                let reply = await axios({
                    url: this.$domain + '/mer/mall/modifyMyOrderStatus',
                    method: 'post',
                    headers: {
                        token: this.$store.state.session.token || '',
                    },
                    data: {
                        mallOrderId: item.mallOrderId,
                        orderStatus: 'CANCEL',
                    },
                });

                if (reply.data.msgCd === this.$msgCode.success) {
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
            }
        },
        // 删除订单
        async deleteMyOrder(item, index) {
            if (confirm('确定要删除吗？')) {
                let reply = await axios({
                    url: this.$domain + '/mer/mall/modifyMyOrderStatus',
                    method: 'post',
                    headers: {
                        token: this.$store.state.session.token || '',
                    },
                    data: {
                        mallOrderId: item.mallOrderId,
                        orderStatus: 'DELETE',
                    },
                });

                if (reply.data.msgCd === this.$msgCode.success) {
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
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.big-title {
    display: flex;
    align-items: center;
    height: 40px;
    // line-height: 40px;
    font-size: 30px;
    img {
        height: 24px;
        margin-right: 4px;
        vertical-align: middle;
    }
}

// 切换
.switch {
    display: flex;
    margin: 30px 0;
    font-size: 16px;
    align-items: center;
    .tab {
        flex: 0 0 auto;
        padding: 0 10px;
        margin-right: 20px;
        padding-bottom: 6px;
        cursor: pointer;
        &.active {
            border-bottom: 4px solid #00adef;
        }
    }
}
.th {
    display: flex;
    height: 60px;
    background-color: #e7f6fc;
    color: #00adef;
}
.tr {
    display: flex;
    height: 120px;
    .name {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .img {
            height: 80px;
            width: 80px;
            flex: 0 0 80px;
            background-color: #ddd;
            img {
                height: 100%;
                width: 100%;
            }
        }

        .info {
            display: flex;
            float: 0 0 auto;
            flex-direction: column;
            margin-left: 20px;
            .title2 {
                height: 60px;
                line-height: 30px;
                font-size: 18px;
                overflow: hidden;
                text-overflow: ellipsis;
                // white-space: nowrap;
            }
            .summary {
                height: 40px;
                line-height: 20px;
                overflow: hidden;
                font-size: 14px;
                color: #999;
            }
        }
    }
    .price {
        font-size: 18px;
        font-weight: bold;
    }
    .total {
        display: flex;
        flex-direction: column;
        color: #e33;
        .number {
            flex: 0 0 auto;
            font-size: 24px;
            font-weight: bold;
        }
        .process {
            flex: 0 0 auto;
            font-size: 14px;
        }
    }
    .status {
        display: flex;
        flex-direction: column;
        .value {
            flex: 0 0 auto;
            font-size: 18px;
            font-weight: bold;
            word-break: keep-all;
        }
        .type {
            flex: 0 0 auto;
            font-size: 14px;
            color: #666;
        }
        .where {
            flex: 0 0 auto;
            font-size: 14px;
            color: #00adef;
            cursor: pointer;
        }
    }
    .action {
        display: flex;
        flex-direction: column;
        align-items: center;
        .button {
            display: flex;
            align-items: center;
            flex: 0 0 30px;
            font-size: 18px;
            background-color: #00adef;
            color: #fff;
            padding: 4px 10px;
            border-radius: 6px;
            cursor: pointer;
        }
        .tips {
            flex: 0 0 20px;
            font-size: 14px;
            margin-top: 6px;
            cursor: pointer;
        }
    }
}
.td {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &.name {
        flex: 0 0 40%;
        max-width: 40%;
        overflow: hidden;
    }
    &.amount {
        flex: 0 0 10%;
        max-width: 10%;
        overflow: hidden;
    }
    &.price {
        flex: 0 0 10%;
        max-width: 10%;
    }
    &.total {
        flex: 0 0 10%;
        max-width: 10%;
    }
    &.status {
        flex: 0 0 auto;
        max-width: auto;
        padding-left: 10px;
    }
    &.action {
        flex: 0 0 20%;
        max-width: 20%;
    }
}

.order-shop {
    height: 60px;
    display: flex;
    align-items: center;
    background-color: #eee;
    margin-top: 20px;
    padding: 0 10px;
    .img {
        height: 40px;
        float: 0 0 40px;
        width: 40px;
        background-color: #eee;
        margin-right: 10px;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .name {
        font-size: 20px;
        margin-right: 10px;
    }
    .number {
        font-size: 16px;
        margin-right: 10px;
    }
}
</style>