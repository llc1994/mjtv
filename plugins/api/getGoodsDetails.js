import axios from "axios";
import _ from "lodash";
// 查询视频详情
// ------------------------------------------------------------
export default function getGoodsDetails(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = {};

        // 开始请求
        let reply = await axios({
            url: that.$domain + "/mer/mall/getGoodsDetails",
            method: "post",
            data: params
        });
        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body)) {
            res = reply.data.body;
        }
        // 返回结果
        return res;
        // =============================================
        // 商品详情
        // GoodsDetail.data.body = {
        //     mallGoodsId: "GOODS20190911023026",
        //     strategyPrice: 26,
        //     mallGoodsName: "儿童玩具恐龙蛋帮帮龙奇趣蛋迷你变形随机盲盒公仔",
        //     mallGoodsDes: "帮帮龙盲盒，开蛋有惊喜！",
        //     bigCategory: 2,
        //     smallCategory: 26,
        //     categoryName: null,
        //     sellType: null,
        //     chantId: "MER1909023501",
        //     isCoupon: "TRUE",
        //     couponExplain: null,
        //     isMemberDiscount: "TRUE",
        //     mallGoodsType: null,
        //     buyType: "CASH",
        //     beansPrice: null,
        //     mallGoodsAmount: 100,
        //     mallGoodsBalance: 100,
        //     mallGoodsShowAmount: 82,
        //     userBuyLimit: null,
        //     oriPrice: 69,
        //     perPrice: 26,
        //     beginTime: null,
        //     endTime: null,
        //     afterSaleDes: "不影响二次销售，可支持7天无理由退换货，运费自付",
        //     shareTitle: "儿童玩具恐龙蛋帮帮龙奇趣蛋迷你变形盲盒",
        //     shareTxt: "帮帮龙盲盒，开蛋有惊喜！",
        //     mallGoodsShareImg:
        //         "http://oss-maijitv.maijimeng.com/5986a2a14cd14eb6b6a94a0735fd1160.jpg",
        //     mallGoodsStatus: "PUTAWAY",
        //     mallGoodsDetails:
        //         '<p><img src="http://oss-maijitv.maijimeng.com/1fc24125fb8e42d093bf1aa29363aa33.jpg" alt="" />',
        //     mallGoodsListImg: null,
        //     mallGoodsEspImg:
        //         "http://oss-maijitv.maijimeng.com/f383b0430fb74c398fced79f3726eb3c.jpg",
        //     goodsSoldAmount: 82,
        //     periodEndTime: null,
        //     商品相关图片
        //     qualityRspDTO: [
        //         {
        //             id: "res.dd8530daec0049b492a02538c30823e4",
        //             upId: "GOODS20190911023026",
        //             resId: "159ADD71AB588AFC253E46DDCA6687B0",
        //             url:
        //                 "http://oss-maijitv.maijimeng.com/7fb1fdc1c74d4f2e95a403566da6ceaa.jpg",
        //             type: 10
        //         }
        //     ],
        //     currentSeckill: null,
        //     futureSeckill: null,
        //     chantCoupons: [],
        //     goodsCoupons: [],
        //     estimateAvgLevel: 0,
        //     goodsSkuList: [
        //         {
        //             skuId: "SKU20190911020122",
        //             skuTotal: 100,
        //             skuSaleprice: 26,
        //             skuIdkeys: "137:494,156:542",
        //             skuKeys: "适合人群:儿童,尺寸:小号,",
        //             skuSaltotal: 0,
        //             skuCostprice: 0,
        //             skuCode: "5961",
        //             skuimg: null,
        //             skudes: null
        //         }
        //     ],
        //     appSpecOptRspDtos: [
        //         {
        //             speId: "137",
        //             speKey: "适合人群",
        //             optionList: [
        //                 {
        //                     optId: "494",
        //                     optName: "儿童",
        //                     optimg: null,
        //                     optdes: null
        //                 }
        //             ]
        //         }
        //     ],
        //     mallGoodsLabel: null,
        //     sendAddress: null,
        //     groupid: 239,
        //     groupName: null,
        //     sellpoint: "帮帮龙盲盒公仔，开蛋有惊喜！内含1个迷你帮帮龙。",
        //     fareid: "",
        //     fareprice: 0,
        //     costprice: 0,
        //     totalsales: null,
        //     viewtotal: null,
        //     browtotal: null,
        //     serviceNumber: "18024032180",
        //     estimateNum: 0,
        //     imageUrl: null,
        //     videoUrl: null,
        //     jumpType: null,
        //     jumpId: null,
        //     newFlag: false,
        //     recomLevel: null,
        //     videoId: null
        // };
    };
}
