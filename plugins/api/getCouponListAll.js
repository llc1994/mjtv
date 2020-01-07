import axios from 'axios';
import _ from 'lodash';
// 获取优惠券列表
export default function getCouponListAll(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = [];

        // 预定义参数
        params.pageNum = params.pageNum || 1;
        params.pageSize = params.pageSize || 10;

        // 开始请求
        let reply = await axios({
            url: that.$domain + '/mer/coupon/list/all',
            method: 'post',
            headers: {
                token: that.store.state.session.token || '',
            },
            data: params,
        });
        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body) && _.isArray(reply.data.body.userCouponRspDTOs)) {
            res = reply.data.body.userCouponRspDTOs;
        }

        // 返回结果
        return res;
        // res.data.body = {
        //     userCouponRspDTOs: [
        //         //
        //         {
        //             zid: 'COUU20191011161548001005',
        //             userId: 'user.d5b234d7afa44ed9b7e9ac8c06292867',
        //             couponId: 'COUN20190911203200001502',
        //             orderId: null,
        //             status: 1,
        //             couponInfo: {
        //                 couponId: 'COUN20190911203200001502',
        //                 name: '满339-20',
        //                 goodsId: null,
        //                 startTime: '2019-09-11 00:04:00',
        //                 endTime: '2019-11-11 00:00:00',
        //                 createTime: null,
        //                 amount: 20,
        //                 limitNum: 1,
        //                 chantType: 1,
        //                 couponType: 1,
        //                 moneyLimit: 339,
        //                 flag: 0,
        //                 couponDesc: '',
        //                 totalNum: 6551,
        //                 stockNum: 6549,
        //                 creator: null,
        //                 chantId: 'MER1909053503',
        //                 chantName: '原道旗舰店',
        //                 chantLogo: 'http://oss-maijitv.maijimeng.com/e0c17b206cc149ebb7ba5bcc3d476f29.jpg',
        //                 channelId: '-1',
        //                 status: 1,
        //                 haveFlag: null,
        //                 couponGoodsList: null,
        //             },
        //         },
        //     ],
        //     pageCount: 1,
        // };
    };
}
