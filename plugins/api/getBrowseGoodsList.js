import axios from "axios";
import _ from "lodash";
// 获取商品浏览记录
export default function getBrowseGoodsList(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = {};

        // 预定义参数
        params.pageNum = params.pageNum || 1;
        params.pageSize = params.pageSize || 30;

        // 开始请求
        let reply = await axios({
            url: that.$domain + "/mer/mall/getBrowseGoodsList",
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

        // 返回值参考
        // reply.data.body = {
        //     pageNum: 1,
        //     pageCount: 1410,
        //     data: null,
        //     list: [
        //         {
        //             mallGoodsId: "GOODS20190926002501",
        //             strategyPrice: 59.9,
        //             mallGoodsName: "迪士尼（Disney）儿童保温杯 Q版不锈钢大容量600ML真空保温水杯 一杯双盖杯套便携保温水壶",
        //             mallGoodsDes: "一杯双盖600ML大容量 304不锈钢材质",
        //             bigCategory: 128,
        //             smallCategory: 132,
        //             categoryName: null,
        //             sellType: null,
        //             chantId: "MER1909034002",
        //             isCoupon: "TRUE",
        //             couponExplain: null,
        //             isMemberDiscount: "TRUE",
        //             mallGoodsType: null,
        //             buyType: "CASH",
        //             beansPrice: null,
        //             mallGoodsAmount: 1600,
        //             mallGoodsBalance: 1600,
        //             mallGoodsShowAmount: 0,
        //             userBuyLimit: null,
        //             oriPrice: 118,
        //             perPrice: 59.9,
        //             beginTime: null,
        //             endTime: null,
        //             afterSaleDes: "迪士尼正品 七天无理由退换货",
        //             shareTitle: "迪士尼儿童保温杯 秋冬季儿童小学生保温杯",
        //             shareTxt: "迪士尼（Disney）保温杯 304不锈钢 600ml大容量 带Q版杯套",
        //             mallGoodsShareImg: "http://oss-maijitv.maijimeng.com/02172fe895434619bea8b7b890490f6b.jpg",
        //             mallGoodsStatus: "PUTAWAY",
        //             mallGoodsDetails: "富文本内容",
        //             mallGoodsListImg: null,
        //             mallGoodsEspImg: "http://oss-maijitv.maijimeng.com/7826af0ac204474d8f25b6d6da9d2a93.jpg",
        //             goodsSoldAmount: null,
        //             periodEndTime: null,
        //             qualityRspDTO: [],
        //             currentSeckill: null,
        //             futureSeckill: null,
        //             chantCoupons: [],
        //             goodsCoupons: [],
        //             estimateAvgLevel: null,
        //             goodsSkuList: [],
        //             appSpecOptRspDtos: null,
        //             mallGoodsLabel: null,
        //             sendAddress: null,
        //             groupid: 208,
        //             groupName: null,
        //             sellpoint: "【迪士尼正品】七天无理由退换货 迪士尼儿童保温杯 秋冬季304不锈钢材质 一杯双盖600ml",
        //             fareid: "pres20190905001501",
        //             fareprice: null,
        //             costprice: 53,
        //             totalsales: null,
        //             viewtotal: null,
        //             browtotal: null,
        //             serviceNumber: null,
        //             estimateNum: null,
        //             imageUrl: null,
        //             videoUrl: null,
        //             jumpType: null,
        //             jumpId: null,
        //             newFlag: false,
        //             recomLevel: null,
        //             videoId: null
        //         }
        //     ]
        // };
    };
}
