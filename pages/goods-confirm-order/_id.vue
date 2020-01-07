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
                        <li class="s-cur">
                            <span>1.确认订单信息</span><b></b>
                        </li>
                        <li class="s-cur-next">
                            <span>2.确认无误后付款</span><b class="b-1"></b
                            ><b class="b-2"></b>
                        </li>
                        <li class="s-cur-next">
                            <span>3.确认收货</span><b class="b-1"></b
                            ><b class="b-1"></b>
                        </li>
                    </ul>
                </div>

                <div class="agree-text">
                    确认订单信息
                </div>
                <div class="line"></div>
                <div class="order-info">
                    订单信息
                </div>
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
                    <div v-if="orders.body">
                        <div
                            class="tbody fx"
                            v-for="(item, index) in orders.body
                                .orderMerChantList"
                            :key="index"
                        >
                            <div
                                class="tr fx"
                                v-for="(item2,
                                index2) in item.mallOrderGoodsList"
                                :key="index2"
                            >
                                <div
                                    class="td flex-percent-30 td-line2"
                                    style="padding:10px;"
                                >
                                    <div
                                        style="-webkit-line-clamp:2;overflow:hidden;-webkit-box-orient: vertical;"
                                    >
                                        <img
                                            :src="item2.mallGoodsImg"
                                            style="float:left;height: 38px;margin-right:5px;"
                                        />
                                        <div
                                            style="text-align:left;width:100%;"
                                        >
                                            {{ item2.mallGoodsName }}
                                        </div>
                                    </div>
                                </div>
                                <div class="td flex-percent-10">待支付</div>
                                <div class="td flex-percent-10">
                                    {{ item2.perPrice }}
                                </div>
                                <div class="td flex-percent-10">
                                    {{ goodsBuyNumber }}
                                </div>
                                <div class="td flex-percent-20"></div>
                                <div class="td flex-percent-10">
                                    {{
                                        (
                                            item2.perPrice *
                                            goodsBuyNumber
                                        ).toFixed(2)
                                    }}
                                </div>
                                <div class="td flex-percent-10">
                                    {{ item2.fareprice }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="orders.body != undefined" class="pay-tips">
                    实付款：<span class="highlight">{{
                        orders.body.orderPrice
                    }}</span
                    >元
                </div>
                <div class="line"></div>
            </div>
        </div>

        <!-- 选择收获地址 -->
        <div style="height:15px;background-color:#f4f4f4;"></div>
        <div class="bottom-wrap" v-if="confirmOrderStep === 1">
            <div class="bottom-address">
                <div class="text-tips">选择收货地址</div>
                <div class="line"></div>
                <div
                    v-if="
                        AddressList.body &&
                            AddressList.body.list &&
                            AddressList.body.list.length > 0
                    "
                >
                    <div
                        :class="
                            isactive == index ? 'addressClass' : 'addressDiv'
                        "
                        @click="selectAddress(index)"
                        v-for="(item, index) in AddressList.body.list.slice(
                            0,
                            forNum
                        )"
                        :key="index"
                    >
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
                <div class="more" @click="moreAddress">更多地址 &gt;</div>
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
                            <input
                                type="text"
                                placeholder="请输入收货人"
                                v-model="detail.name"
                            />
                        </div>
                    </div>
                    <div class="line">
                        <div class="label">联系电话</div>
                        <div class="value">
                            <input
                                type="text"
                                placeholder="请输入联系电话"
                                v-model="detail.mobileNum"
                            />
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
                            <input
                                type="text"
                                placeholder="请输入详细地址"
                                v-model="detail.address"
                            />
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

                <div
                    class="aliqrcode qrcode"
                    id="aliqrcode"
                    ref="aliqrcode"
                ></div>

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
import Toper from "~/components/Toper.vue";
import Footer from "~/components/Footer.vue";
import axios from "axios";
// import QRCode from "qrcodejs2";
export default {
    data() {
        return {
            // 顶部参数
            toperParams: {
                backgroundColor: "white",
                category: "maiji-shop"
            },
            // 确认订单步骤
            confirmOrderStep: 1,
            orders: {},
            forNum: 4,
            addressClass: "",
            isactive: -1,
            isAddressPanelShow: false,
            popupType: "insert",
            menu: {
                isActive: "user-address"
            },
            // 地址详情
            detail: {
                addrId: "",
                name: "",
                mobileNum: "",
                address: "",
                province: "",
                city: "",
                region: ""
            },
            chantGoodsList: [],
            userAdress: "",
            saleModule: "HOTSELLING",
            cashType: "WECHATPAY",
            userCouponId: "",
            memberDisCount: "",
            userName: "",
            userPhone: ""
        };
    },
    computed: {
        loginData(){
            return this.$store.state.loginData;
        },
        userData(){
            return this.$store.state.userData;
        },
        session(){
            return this.$store.state.session;
        },
        // 购买详情
        goodsBuyDetail(){
            return this.$store.state.goodsBuyDetail;
        },
        // 购买数量
        goodsBuyNumber(){
            return this.$store.state.goodsBuyNumber;
        },
        // 商品规格
        goodsBuySpec(){
            return this.$store.state.goodsBuySpec;
        }
    },
    async created() {
        var that = this;

        // 商品详情
        // let GoodsDetail = await axios({
        //     url: this.$domain + "/mer/mall/getGoodsDetails",
        //     method: "post",
        //     data: {
        //         mallGoodsId: this.$router.params.id
        //     }
        // });

        if (goodsBuyDetail.data.body.type == "myCart") {
            let orderInfo = await axios({
                url: this.$domain + "/mer/mall/comfirmOrderFromCar", //https://mengdata.maijimaiji.cn
                method: "post",
                headers: {
                    token: this.$store.state.session.token || ""
                    //token: "token.244c9a777b924042b62aa4c636dd1366"
                },
                data: {
                    payType: "PC",
                    carIds: goodsBuyDetail.body.carIds
                }
            });
            this.orders = orderInfo.data;
        } else {
            let orderInfo2 = await axios({
                url: this.$domain + "/mer/mall/confirmCreateOrder",
                method: "post",
                headers: {
                    token: this.$store.state.session.token || ""
                },
                data: {
                    skuimg: goodsBuySpec.skuimg,
                    buyType: goodsBuyDetail.body.buyType,
                    payType: "PC",
                    mallGoodsAmount: goodsBuyDetail.body.mallGoodsAmount,
                    skuId: goodsBuySpec.skuimg,
                    payTotalPrice:
                        this.goodsBuyNumber *
                        goodsBuyDetail.body.perPrice,
                    mallGoodsId: goodsBuyDetail.body.mallGoodsId
                }
            });
            this.orders = orderInfo2.data;
            // ===============================================
            // orderInfo2.data.body = {
            //     userName: null,
            //     userPhone: null,
            //     userAdress: null,
            //     userId: "user.3b9f0dc7b5f146179e334563754f12ab",
            //     orderPrice: "9900.00",
            //     orderMerChantList: [
            //         {
            //             storeName: "灵动创想",
            //             storeId: "MER1909023501",
            //             mallOrderGoodsList: [Array],
            //             merExpressTempList: [],
            //             couponList: [],
            //             mallGoodsCount: "1",
            //             mallGoodsAmt: "9900.00",
            //             fareprice: "0",
            //             logoImg:
            //                 "http://imgmagee.geeksfin.com/6acd90971eb543b8bf48c3cc69fbd034.png",
            //             isV: 1,
            //             vLevel: 1,
            //             vName: "企业官方认证店铺",
            //             vLogo:
            //                 "http://imgmagee.geeksfin.com/de9b9b6a52694e19b407c491c30394c4.png"
            //         }
            //     ],
            //     carIds: null,
            //     seckillId: null,
            //     speckillMemberId: null
            // };
            // ================================================
        }

        //https://mengdata.maijimaiji.cn/urm/findAddressList
        //pageSize pageNum
        // 地址列表
        let AddressList = await axios({
            url: this.$domain + "/urm/findAddressList",
            method: "post",
            headers: {
                token: this.$store.state.session.token || ""
            },
            data: {
                pageNum: 1,
                pageSize: 100
            }
        });
        this.AddressList = AddressList.data;
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
    mounted() {
        // _init_area();
    },
    components: {
        Toper,
        Footer
    },
    methods: {
        //提交订单
        async submit() {
            if (this.isactive == -1) {
                $.message({
                    message: "请选择收货地址",
                    type: "info"
                });
                return;
            }

            for (
                var i = 0;
                i < this.orders.body.orderMerChantList.length;
                i++
            ) {
                var chantGood = {};
                chantGood.chantId = this.orders.body.orderMerChantList[
                    i
                ].storeId;
                var goodsList = [];
                for (
                    var j = 0;
                    j <
                    this.orders.body.orderMerChantList[i].mallOrderGoodsList
                        .length;
                    j++
                ) {
                    var goodObj = {};
                    goodObj.mallGoodsId = this.orders.body.orderMerChantList[
                        i
                    ].mallOrderGoodsList[j].mallGoodsId;
                    goodObj.mallGoodsAmount = this.orders.body.orderMerChantList[
                        i
                    ].mallOrderGoodsList[j].mallGoodsAmount;
                    goodObj.skuId = this.orders.body.orderMerChantList[
                        i
                    ].mallOrderGoodsList[j].skuId;
                    goodObj.skuimg = this.orders.body.orderMerChantList[
                        i
                    ].mallOrderGoodsList[j].skuimg;
                    goodsList.push(goodObj);
                }
                chantGood.goodsList = goodsList;
                chantGood.couponId = "";
                this.chantGoodsList.push(chantGood);
            }

            if (this.orders.body.carIds != undefined) {
                //购物车
                let reply = await axios({
                    url: this.$domain + "/mer/mall/createOrderInCart/v1",
                    method: "post",
                    headers: {
                        token: this.$store.state.session.token || ""
                    },
                    data: {
                        carIds: this.orders.body.carIds,
                        buyType: "CASH",
                        userAdress: this.userAdress,
                        payType: "PC",
                        saleModule: "HOTSELLING",
                        cashType: "WECHATPAY",
                        userCouponId: "",
                        memberDisCount: "",
                        userName: this.userName,
                        userPhone: this.userPhone,
                        chantGoodsList: this.chantGoodsList
                    }
                });

                if (reply.data.msgCd === this.$msgCode.success) {
                    this.$router.push({
                        name: "maiji-shop-paying",
                        params: {
                            orderId: reply.data.body.orderId,
                            orderInfo: reply.data.body.orderInfo,
                            type: "myCart"
                        }
                    });
                } else {
                    $.message({
                        message: reply.data.msgInfo,
                        type: "error"
                    });
                }
            } else {
                //直接下单
                let reply2 = await axios({
                    url: this.$domain + "/mer/mall/createOrder",
                    method: "post",
                    headers: {
                        token: this.$store.state.session.token || ""
                    },
                    data: {
                        buyType: "CASH",
                        userAdress: this.userAdress,
                        payType: "PC",
                        saleModule: "HOTSELLING",
                        cashType: "WECHATPAY",
                        userCouponId: "",
                        memberDisCount: "",
                        userName: this.userName,
                        userPhone: this.userPhone,
                        chantGoodsList: this.chantGoodsList
                    }
                });

                if (reply2.data.msgCd === this.$msgCode.success) {
                    // 修改当前步骤
                    this.confirmOrderStep = 2;

                    // 序列化订单信息
                    let orderPayInfos = JSON.parse(reply2.data.body.orderInfo);

                    // 支付宝二维码
                    // var aliqrcode = new QRCode(this.$refs.aliqrcode, {
                    //     text: orderPayInfos.ALIPAY,
                    //     width: 100,
                    //     height: 100,
                    //     colorDark: "#000000",
                    //     colorLight: "#ffffff",
                    //     correctLevel: QRCode.CorrectLevel.H
                    // });

                    // 微信二维码
                    var wxqrcode = new QRCode(
                        document.getElementById("wxqrcode"),
                        {
                            text: "orderPayInfos.WECHATPAY",
                            width: 100,
                            height: 100,
                            colorDark: "#000000",
                            colorLight: "#ffffff",
                            correctLevel: QRCode.CorrectLevel.H
                        }
                    );
                } else {
                    $.message({
                        message: reply2.data.msgInfo,
                        type: "error"
                    });
                }

                // =============================================
                // 下单参考信息
                // =============================================
                // reply2.data.body = {
                //     orderId: "MALL20191013000005",
                //     userId: null,
                //     allGoodsAmt: null,
                //     orderDepict: null,
                //     deliverAmt: null,
                //     orderAmt: null,
                //     realAmt: null,
                //     payFrom: null,
                //     orderType: null,
                //     orderInfo: {
                //         appid: "wx71cb74d5b560d39c",
                //         mch_id: "1503420391",
                //         nonce_str: "fB5JFQYUWrKxTRhg9ElQ28vNJKO1rcu9",
                //         package: "Sign=WXPay",
                //         prepay_id: "wx13145529012315264876efb31387530400",
                //         result_code: "SUCCESS",
                //         return_code: "SUCCESS",
                //         return_msg: "OK",
                //         sign: "1891CF568A460D0F35E9C99DE48E4E53",
                //         timestamp: "1570949729053",
                //         trade_type: "APP"
                //     },
                //     orderSts: null
                // };
            }
        },
        moreAddress() {
            this.forNum += 10;
        },
        // 显示更新地址弹框
        ShowUpdAddress(item) {
            this.isAddressPanelShow = true;
            this.popupType = "update";
            this.detail = item;
        },
        // 关闭地址弹框
        closeAddressPanel() {
            this.isAddressPanelShow = false;
        },
        selectAddress: function(index) {
            this.isactive = index;
            this.userName = this.AddressList.body.list[index].name;
            this.userAdress =
                this.AddressList.body.list[index].region +
                " " +
                this.AddressList.body.list[index].address;
            this.userPhone = this.AddressList.body.list[index].mobileNum;
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
            let _province = document.getElementById("s_province").value;
            let _city = document.getElementById("s_city").value;
            let _county = document.getElementById("s_county").value;
            let reply = {};

            if (this.popupType === "insert") {
                reply = await axios({
                    url: this.$domain + "/urm/addAddress",
                    method: "post",
                    headers: {
                        token: this.$store.state.session.token || ""
                    },
                    data: {
                        name: this.detail.name,
                        mobileNum: this.detail.mobileNum,
                        address: this.detail.address,
                        region: _province + _city + _county
                    }
                });
            }
            if (this.popupType === "update") {
                reply = await axios({
                    url: this.$domain + "/urm/modifyAddress",
                    method: "post",
                    headers: {
                        token: this.$store.state.session.token || ""
                    },
                    data: {
                        addrId: this.detail.addrId,
                        name: this.detail.name,
                        mobileNum: this.detail.mobileNum,
                        address: this.detail.address,
                        region: _province + _city + _county
                    }
                });
            }

            if (reply.data.msgCd === this.$msgCode.success) {
                this.isAddressPanelShow = false;
                location.reload();
                $.message({
                    message: reply.data.msgInfo,
                    type: "success"
                });
                location.reload();
            } else {
                $.message({
                    message: reply.data.msgInfo,
                    type: "error"
                });
            }
        },
        // 设置默认地址
        async SetDefault(item) {
            let reply = await axios({
                url: this.$domain + "/urm/replaceDefaultAddress",
                method: "post",
                headers: {
                    token: this.$store.state.session.token || ""
                },
                data: {
                    addrId: item.addrId
                }
            });
            if (reply.data.msgCd === this.$msgCode.success) {
                location.reload();
                $.message({
                    message: reply.data.msgInfo,
                    type: "success"
                });
            } else {
                $.message({
                    message: reply.data.msgInfo,
                    type: "error"
                });
            }
        },
        // 删除地址
        async DelAddress(item) {
            let reply = await axios({
                url: this.$domain + "/urm/deleteAddress",
                method: "post",
                headers: {
                    token: this.$store.state.session.token || ""
                },
                data: {
                    addrId: item.addrId
                }
            });
            if (reply.data.msgCd === this.$msgCode.success) {
                location.reload();
                $.message({
                    message: reply.data.msgInfo,
                    type: "success"
                });
            } else {
                $.message({
                    message: reply.data.msgInfo,
                    type: "error"
                });
            }
        },
        // 新增地址弹框
        newAddress() {
            this.popupType = "insert";
            this.isAddressPanelShow = true;
            this.detail = {
                addrId: "",
                name: "",
                mobileNum: "",
                address: "",
                province: "",
                city: "",
                region: ""
            };
        }
    }
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
.tbody {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
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
