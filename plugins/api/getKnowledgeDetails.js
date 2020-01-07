import axios from 'axios';
import _ from 'lodash';
// 查询视频详情
// ------------------------------------------------------------
export default function getKnowledgeDetails(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = {};

        // 开始请求
        let reply = await axios({
            url: that.$domain + '/mer/getKnowledgeDetails',
            method: 'post',
            data: params,
        });
        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body)) {
            res = reply.data.body;
        }
        // 返回结果
        return res;
        // =============================================
        // reply.data.body 返回值
        // =============================================
        // let _ = {
        //     knowledgeId: 'KN20180611160024001003',
        //     merId: 'MER1806111001',
        //     knowledgeColumn: '1',
        //     knowledgeName: '燕子姐姐讲故事',
        //     knowledgeDetail: '美好的童年，是从一个个优美动听的好故事开始的。孩子王燕子姐姐，带你闯入童话王国，用最温柔的声音！',
        //     playNum: 57185,
        //     takeNum: 5,
        //     startTime: null,
        //     endTime: null,
        //     needPay: 1,
        //     goodsId: 'KN20180611160024001003',
        //     lectuerId: 'LE1806110000000001',
        //     alreadyBuy: false,
        //     knowledgeType: 2,
        //     qualityRspDTOs: [
        //         {
        //             id: 'res.afe228707ccb42cebf4e50fdb942842c',
        //             upId: 'KN20180611160024001003',
        //             resId: '2E640960DC1EB70E9B2B107AD7D248D7',
        //             url: 'http://oss-maijitv.maijimeng.com/037a0b387a74443887d932dd40081c44.jpg',
        //             type: 3,
        //         },
        //         {
        //             id: 'res.18baa160ee304bc38eab74c4ff280944',
        //             upId: 'KN20180611160024001003',
        //             resId: 'res.18baa160ee304bc38eab74c4ff280944',
        //             url: '',
        //             type: 7,
        //         },
        //     ],
        //     merGoodsOfKnowledge: {
        //         id: 'KN20180611160024001003',
        //         merId: 'MER1806111001',
        //         type: 'COURSE_SCHOOL',
        //         salesPrice: 66,
        //         salesProm: null,
        //     },
        //     lectuerInfoOfKnowDetailRsp: {
        //         lectuerId: 'LE1806110000000001',
        //         lectuerName: '燕子姐姐',
        //         lectuerIntroduce: '湖南电视台金鹰卡通卫视金牌节目主持人小燕子姐姐，本名谭薇。',
        //         workIntroduce: '2004年开台至今加入“飞行家族”主持群，创造了很多王牌节目的收视神话，其活泼可爱，反应机敏',
        //         qualityRspDTOs: [
        //             {
        //                 id: 'res.afe228707ccb42cebf4e50fdb942842c',
        //                 upId: 'KN20180611160024001003',
        //                 resId: '2E640960DC1EB70E9B2B107AD7D248D7',
        //                 url: 'http://oss-maijitv.maijimeng.com/037a0b387a74443887d932dd40081c44.jpg',
        //                 type: 3,
        //             },
        //             {
        //                 id: 'res.18baa160ee304bc38eab74c4ff280944',
        //                 upId: 'KN20180611160024001003',
        //                 resId: 'res.18baa160ee304bc38eab74c4ff280944',
        //                 url: '',
        //                 type: 7,
        //             },
        //         ],
        //     },
        //     followNum: 234076,
        //     followStatus: 0,
        //     knowledgeColumnName: '独家放送',
        // };
    };
}
