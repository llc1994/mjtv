import axios from 'axios';
import _ from 'lodash';
// 查询购物车商品列表
// ------------------------------------------------------------
export default function itemCartV1(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = [];

        // 开始请求
        let reply = await axios({
            url: that.$domain + '/mer/mall/itemCart/v1',
            method: 'post',
            headers: {
                token: that.store.state.session.token || '',
            },
        });
        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body) && reply.data.body.storeList && _.isArray(reply.data.body.storeList)) {
            res = reply.data.body.storeList.filter(function(item){
                let invalidItem = item.storeId !== 'MER1901044502' && _.isArray(item.carList) && item.carList.length > 0;
                if (invalidItem) {
                    item.shopSelect = false; // 初始未选中店铺
                    item.carList.forEach(function(goodsItem) {
                        goodsItem.goodsSelect = false; // 初始未选中商品
                    });
                }
                return invalidItem;
            })
        }

        // 返回结果
        return res;
        // =============================================
        // reply.data.body 返回值
        // =============================================
        // reply.data.body = {
        //     storeList: [
        //         //
        //         {
        //             storeName: '灵动创想',
        //             storeId: 'MER1909023501',
        //             isCoupon: null,
        //             cartsId: null,
        //             carList: [
        //                 //
        //                 {
        //                     cartsId: 'cart20191020012028',
        //                     mallGoodsId: 'GOODS20190929004501',
        //                     mallGoodsName: '灵动创想奥特曼泡泡棒泡泡水儿童户外玩具',
        //                     mallGoodsDes: '灵动创想奥特曼泡泡棒泡泡水儿童户外玩具',
        //                     chantId: null,
        //                     skuId: 'SKU20190929004505',
        //                     skuKeys: '适合人群:儿童',
        //                     skuSaleprice: '39.00',
        //                     skuIdkeys: '144:1198',
        //                     skuTotal: '100',
        //                     skuimg: null,
        //                     mallGoodsLabel: null,
        //                     mallGoodsAmount: '2',
        //                     mallGoodsBalance: 100,
        //                     mallGoodsSmallImg: 'http://oss-maijitv.maijimeng.com/efb73dd4dfb942e488fadd05fa5f2d83.jpg',
        //                     oriPrice: 39.0,
        //                     strategyPrice: 29.0,
        //                     perPrice: 29.0,
        //                     mallGoodsStatus: 'PUTAWAY',
        //                     skuCostprice: '0.00',
        //                 },
        //             ],
        //             couponList: null,
        //             logoImg: 'http://oss-maijitv.maijimeng.com/6acd90971eb543b8bf48c3cc69fbd034.png',
        //             isV: 1,
        //             vLevel: 1,
        //             vName: '企业官方认证店铺',
        //             vLogo: 'http://oss-maijitv.maijimeng.com/de9b9b6a52694e19b407c491c30394c4.png',
        //         },
        //     ],
        //     cartSize: null,
        // };
    };
}
