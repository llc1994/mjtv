import axios from 'axios';
import _ from 'lodash';
// 获取麦咭秒杀
export default function activityList(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = [];

        // 开始请求
        let reply = await axios({
            url: that.$domain + '/mer/activity/list',
            method: 'post',
            headers: {
                token: that.store.state.session.token || '',
            },
            data: params,
        });
        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body) && _.isArray(reply.data.body.seckillActivityRspDTOs)) {
            res = reply.data.body.seckillActivityRspDTOs;
        }

        // 返回结果
        return res;
        // VideoInfos.data.body = {
        //     seckillActivityRspDTOs: [
        //         {
        //             id: 86,
        //             name: '11月9日11:00-13:00',
        //             state: 1,
        //             startTime: '2019-11-09 11:00:00',
        //             endTime: '2019-11-09 13:00:00',
        //             createTime: '2019-10-29 21:30:27',
        //             modifyTime: null,
        //             count: 186,
        //             creator: 'df999e2da842485d8d3454eec7dc2bf2',
        //             seckillRspDTOs: [
        //                 {
        //                     seckillId: 210,
        //                     activityId: 86,
        //                     speckillMemberId: null,
        //                     goodsId: 'GOODS20190925001519',
        //                     name: '亮妆纯棉条纹毛巾家用1条装（颜色随机）',
        //                     tag: '包邮',
        //                     totalNum: 500,
        //                     stockNum: 500,
        //                     limitNum: 2,
        //                     seckillPrice: 11.11,
        //                     createTime: '2019-11-01 11:16:55',
        //                     modifyTime: '2019-10-31 16:20:57',
        //                     startTime: '2019-11-09 11:00:00',
        //                     endTime: '2019-11-09 13:00:00',
        //                     sort: 1,
        //                     state: 1,
        //                     spikeProgress: 0,
        //                     seckillImg: 'http://oss-maijitv.maijimeng.com/8a7f3368c0d94b23b1fc0a3d6acb9597.jpg',
        //                     type: null,
        //                     lowPrice: null,
        //                     cutcount: null,
        //                     saleNum: 0,
        //                     cutNum: null,
        //                     cutRecordVOList: null,
        //                     oriPrice: 15.6,
        //                     hascut: null,
        //                     merSpeckillId: null,
        //                     cutAmted: null,
        //                 },
        //             ],
        //             type: null,
        //         },
        //     ],
        //     pageCount: 9,
        // };
    };
}
