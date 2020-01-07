import axios from "axios";
import _ from "lodash";
// 获取我的订单 - 我的课程等
export default function getOrderLists(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = {};

        // 预定义参数
        params.pageNum = params.pageNum || 1;
        params.pageSize = params.pageSize || 10;

        // 开始请求
        let reply = await axios({
            url: that.$domain + "/mer/getOrderLists",
            method: "post",
            headers: {
                token: that.store.state.session.token || ""
            },
            data: params
        });

        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body)) {
            res = reply.data.body;
        }

        // 返回结果
        return res;
        // reply.data.body = {
        //     myOrderRspDTOs: [
        //         {
        //             orderId: "ORD20190414032001007001",
        //             userId: "urm712bd239b17140f9a3f559bdc106b2fb",
        //             userName: "18675829412",
        //             allGoodsAmt: 1.0,
        //             deliverAmt: 0.0,
        //             orderAmt: 1.0,
        //             realAmt: 1.0,
        //             payId: "ORD20190414032001007001",
        //             payFrom: 0,
        //             orderType: "COURSE",
        //             orderDepict: "知识付费商品:童趣小小调查员",
        //             payTime: "2019-04-14T03:20:02.522",
        //             createTime: "2019-04-14T03:20:01.717",
        //             myOrderGoodsRspDTOs: [
        //                 //
        //                 {
        //                     id: "SORD20190414032001007001",
        //                     userId: "urm712bd239b17140f9a3f559bdc106b2fb",
        //                     orderId: "ORD20190414032001007001",
        //                     goodsId: "KN20180611172339000509",
        //                     type: "COURSE_SCHOOL",
        //                     name: "童趣小小调查员",
        //                     goodsNum: 1,
        //                     goodsPrice: 1.0,
        //                     salesProm: null,
        //                     realAmt: 1.0,
        //                     merId: "MER1806111001",
        //                     goodsSpec: 0,
        //                     expressCompany: null,
        //                     expressId: null,
        //                     provincesId: "999999",
        //                     citiesId: "999999",
        //                     areaId: null,
        //                     shippingAddress: null,
        //                     deliveryStatus: 0,
        //                     orderTitle: "【独家放送】",
        //                     goodsDepict: "飞行家族成员带着小冒险员们一起，对五花八门、千奇百怪的主题任务进行搞笑又严肃的调查",
        //                     enable: "1",
        //                     qualityRspDTOs: [
        //                         //
        //                         {
        //                             id: "res.7ba45cd9160045b9baeea6a45ffa992e",
        //                             upId: "KN20180611172339000509",
        //                             resId: "D92180B845E97CBD131153FE9BC1B353",
        //                             url: "http://oss-maijitv.maijimeng.com/274be7fd81ac42e8916f16761b5d4457.png",
        //                             type: 3
        //                         },
        //                         {
        //                             id: "res.293eea2b6c3a47a6a97f3170d5b73536",
        //                             upId: "KN20180611172339000509",
        //                             resId: "res.293eea2b6c3a47a6a97f3170d5b73536",
        //                             url: "",
        //                             type: 7
        //                         }
        //                     ]
        //                 }
        //             ]
        //         }
        //     ],
        //     pageCount: 2
        // };
    };
}
