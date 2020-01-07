import axios from 'axios';
import _ from 'lodash';
// 查询个人信息
// ------------------------------------------------------------
export default function playHistory(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = {
            pageNum: 1,
            pageSize: 30,
            pageCount: 0,
            totalCount: 0,
            videos: []
        };

        // 开始请求
        let reply = await axios({
            url: that.$domain + '/mkt/playHistory',
            method: 'post',
            headers: {
                token: that.store.state.session.token || '',
            },
            data:params
        });
        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body) && _.isArray(reply.data.body.videos)) {
            res = reply.data.body;
        }

        // 返回结果
        return res;
        // =============================================
        // reply.data.body 返回值
        // =============================================
        // reply.data.body.videos = [{
        //     alyId: "5f06c26ea9664b4fa8d9208cdd8e6d33",
        //     alyUrl: "http://oss-maijitv.maijimeng.com/c19afa54346141cb911bcda517d2541a.jpg",
        //     bundleId: "res.06dc99db9d794dbd8c595ffea81c6fb4",
        //     createTime: "2019-09-21",
        //     descript: "疯狂的麦咭",
        //     lastPlayTime: "2019-11-16 19:51",
        //     markSort: 6,
        //     playTime: 0,
        //     resId: "res.7a96fb5268014af1a187103f20cb8315",
        //     title: "第6季12期：夫妻实力闯关 携手同行",
        //     type: 0,
        // }]
    };
}
