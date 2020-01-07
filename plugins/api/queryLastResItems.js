import axios from "axios";
import _ from "lodash";
// 查询推荐视频
// ------------------------------------------------------------
export default function queryLastResItems(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = {};

        // 开始请求
        let reply = await axios({
            url: that.$domain + "/common/queryLastResItems",
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
        // reply.data.body 返回值
        // =============================================
        // let _ = {
        //     id: 'res.b7c8fdc837ec416f91f11c5af76cb498',
        //     bundleId: 'res.e23faa669ff64385b63f8f3fbe0b7acc',
        //     title: '第2季02期：国学小将青梅煮酒论英雄 0706',
        //     descript: '创作才女蹒跚学诗',
        //     resId: 'res.a2aea63637c0439bb66bc2fe6112552a',
        //     alyId: '21b8c95b95824c55977cb4c7691ccb5d',
        //     alyUrl:
        //     'http://imgmagee.geeksfin.com/e08181e894ba4e298d50fe0cdaee1282.jpg',
        //     cateGory: 'OFFICIAL',
        //     markSort: 2,
        //     sort: 0,
        //     alonePlay: 1,
        //     enable: 1,
        //     state: 1,
        //     year: '2018',
        //     limitDate: '2018-07-06',
        //     limitTime: '1970-01-01T15:46:00',
        //     freeScope: 'UNFREE',
        //     playNumber: 5600,
        //     duration: null,
        //     businessKey: 'APG20180614002501',
        //     businessName: null,
        //     cmNumber: 0,
        //     episode: null,
        //     type: null,
        //     modifyTime: '2018-12-27T18:47:23.051',
        //     createTime: '2018-07-09T16:12:02.184'
        // }
    };
}
