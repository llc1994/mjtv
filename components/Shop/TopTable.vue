<template>
        <!-- 商品详情 -->
        <div class="goods-detail">
            <!-- <div class="wrap"> -->
             <div class="blank"></div>

                <!-- 商品内容 -->
                <div class="goods-content">

                <div class="wrap">
                    <ul class="step-case" id="step">
                        <!-- <li class="s-finish"><span>1.确认订单信息</span><b class="b-l"></b></li>
                        <li class="s-finish"><span>2.确认无误后付款</span><b class="b-1"></b><b class="b-2"></b></li>
                        <li class="s-cur"> <span>3.确认收货</span><b class="b-1"></b><b class="b-2"></b></li> -->
                        <li :class="calcNaviClass1"><span>1.确认订单信息</span><b></b></li>
                        <li :class="calcNaviClass2"><span>2.确认无误后付款</span><b class="b-1"></b><b class="b-2"></b></li>
                        <li :class="calcNaviClass3"> <span>3.确认收货</span><b class="b-1"></b><b id="triangle" class="b-2"></b></li>
                    </ul>
                </div>

                <div class="agree-text">
                    我已收到货,同意支付宝付款
                </div>
                <hr>
                <div class="order-info">
                    订单信息
                </div>
                <table cellspacing = "0">
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
                    <tbody>

                        <tr v-for="(item, index) in Orders.body.goodsList" :key="index">
                            <td class="td-line2" style="padding:10px;">
                                <div style="-webkit-line-clamp:2;overflow:hidden;-webkit-box-orient: vertical;">
                                <img :src="item.mallGoodsEspImg" style="float:left;height: 38px;margin-right:5px;">
                               <div style="text-align:left;width:100%;"> {{item.mallGoodsName}}</div>
                                </div></td>
                            <td>{{orderState}}</td>
                            <td>{{item.perPrice.toFixed(2)}}</td>
                            <td>{{item.mallGoodsAmount}}</td>
                            <td>
                            {{Orders.body.userCoupon!=null?Orders.body.userCoupon.couponInfo.name+","+Orders.body.userCoupon.couponInfo.couponDesc:""}}
                            </td>
                            <td>{{(item.perPrice*item.mallGoodsAmount).toFixed(2)}}</td>
                            <td>{{Orders.body.expressFee.toFixed(2)}}</td>
                        </tr>
                    </tbody>

                </table>
                <div class="pay-tips">实付款：<span class="highlight">{{Orders.body.payTotalPrice.toFixed(2)}}</span>元</div>
                <hr>

                <div class="order-text">
                    <div>订单编号：<span class="order-text-inner">{{Orders.body.mallOrderId}}</span></div>
                    <div>创建时间：<span class="order-text-inner">{{Orders.body.createTime}}</span></div>
                </div>

                </div>


        </div>

</template>
<script>
import axios from "axios";
export default {
    props: ["Orders"],
    data() {
        return {
            toperParams: {
                backgroundColor: "white",
                category: "meng-bao-video"
            }

        };
    },
    computed: {
        //订单状态 交易成功 SUCCESS 待发货 WAITDELIVER 待支付WAITPAY 待收货WAITTAKE 取消 CANCEL 退款REFUND 关闭 CLOSED
        orderState() {
            if(this.Orders.body.orderStatus == 'WAITPAY')
            return '待支付';
            else if (this.Orders.body.orderStatus == 'WAITDELIVER')
            return '待发货';
            else if (this.Orders.body.orderStatus == 'SUCCESS')
            return '交易成功';
            else if (this.Orders.body.orderStatus == 'WAITTAKE')
            return '待收货';
            else if (this.Orders.body.orderStatus == 'CANCEL')
            return '取消';
            else if (this.Orders.body.orderStatus == 'REFUND')
            return '退款';
            else if (this.Orders.body.orderStatus == 'CLOSED')
            return '关闭';
            else return this.Orders.body.orderStatus;
        },
        calcNaviClass1(){
            if(this.Orders.navi=="1"){
                return 's-cur'
            }else{
                return 's-finish'
            }
        },
        calcNaviClass2(){
            if(this.Orders.navi=="1"){
                return 's-cur-next'
            }else if(this.Orders.navi=="2"){
                return 's-cur'
            }else{
                return 's-finish'
            }
        },
        calcNaviClass3(){
            if(this.Orders.navi=="1"){

                return 's-cur-next'
            }else if(this.Orders.navi=="2"){
                return 's-cur-next'
            }else{
                return 's-cur'
            }
        }


    },
    components: {
    },

    mounted() {
        if(this.Orders.navi=="1"){
            var angle = document.getElementById("triangle")
            angle.removeAttribute('class')
            angle.setAttribute("class","b-1")
        }

        // var step = document.getElementById("step"),li = step.getElementsByTagName("li");
        // for(var i = 0;i<li.length;i++){
        //  //(function(i){
        //      li[i].index = i;
        //      li[i].onclick = function(){
        //          var i = this.index;
        //          for(var j = 0;j<i;j++){
        //              li[j].className = "s-finish";
        //          }
        //          for(var j = li.length;j>i;){
        //              li[--j].className = "";
        //              if(j==i+1){
        //                  li[j].className = "s-cur-next";
        //              }
        //          }
        //          this.className = "s-cur";
        //      }

        //  //})(i);
        // }

    },
    methods: {}
};
</script>
<style lang="scss" scoped>
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
hr{
    border: 1px solid #00ADEF;
    margin-top:10px;
    margin-bottom: 10px;
}
table{
    width: 100%;
    border: 1px solid gray;
}
table thead tr{
    border: 1px solid gray;
    background-color: #00ADEF;
}
table td{
    border: 1px solid gray;
    text-align:center;
    vertical-align:middle;
}
.td-line2{
        overflow: hidden;
        line-height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        text-overflow: -o-ellipsis-lastline;
}

.pay-tips{
    text-align: right;
    font-size:18px;
    margin-top:10px;
    .highlight{
        color:red;
        font-size: 26px;
    }
}


.agree-text{
    font-size: 24px;
    margin:10px;
}

.order-text{
    font-size:18px;
    .order-text-inner{
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

.blank{
    height: 10px;
}

.order-info{
    font-size: 18px;
    margin:10px;
}

ul{margin:0px; padding:0px; list-style:none;}
    .wrap{width:100%; height:auto; line-height:30px; margin:0px auto 0;padding:0px}
    .step-case{height:40px;}
        .step-case li{ float:left; margin:0px; width:33.3%;position:relative; }
        .step-case li span{display:block; background-color:#ccc;  height:40px; line-height:40px;  text-align:center; color:#fff; font-weight:bold;}
        .step-case b{position:absolute; font-size:0px; line-height:0px; top:0px;}
        .step-case .b-l{border-width:2px 2px 2px 0; border-style:dashed solid dashed dashed; border-color:transparent #ccc transparent transparent; height:36px; left:-2px;}
        .step-case .b-r{border-width:2px 0 2px 2px; border-style:dashed dashed dashed solid; border-color:transparent transparent transparent #ccc; height:36px; right:-2px;}
        .step-case .b-1{border-width:20px 0 20px 20px; border-style:solid dashed solid solid; border-color:#ccc transparent #ccc #ccc; left:-20px;}
        .step-case .b-2{border-width:20px 0 20px 20px; border-style:dashed dashed dashed solid; border-color:transparent transparent transparent #ccc; left:-21px;}
        /*当前状态*/
        .step-case .s-cur span{background-color:#00ADEF;}
        .step-case .s-cur .b-l{border-right-color:#00ADEF;}
        .step-case .s-cur .b-r{border-left-color:#00ADEF;}
        .step-case .s-cur .b-1{border-color:#00ADEF #00ADEF #00ADEF #00ADEF;}
        .step-case .s-cur .b-2{border-left-color:#FFCD00;}
        /*当前状态后*/
        .step-case .s-cur-next .b-2{border-color:transparent transparent transparent#00ADEF;}
        /*完成的状态*/
        .step-case .s-finish span{background-color:#FFCD00; color:#000;}
        .step-case .s-finish .b-l{border-right-color:#FFCD00;}
        .step-case .s-finish .b-r{border-left-color:#FFCD00;}
        .step-case .s-finish .b-1{border-color:#FFCD00 #FFCD00 #FFCD00 #FFCD00;}
        .step-case .s-finish .b-2{border-left-color:#FFCD00;}

</style>