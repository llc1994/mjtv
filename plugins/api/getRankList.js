import axios from "axios";
import _ from "lodash";
// 查询推荐位
// ------------------------------------------------------------
export default function getRankList(context) {
    // 统一前后端书写
    let that = context.app;

    return async function(params) {
        // 初始化返回
        let res = {
            content: []
        };

        // 预定义参数
        params.pageNum = params.pageNum || 1;
        params.pageSize = params.pageSize || 10;

        // 开始请求
        let reply = await axios({
            url:that.$domain + "/mkt/getRankList",
            method:'post',
            data: params
        });
        // 数据处理
        if (reply.data && reply.data.msgCd === '00000' && _.isObject(reply.data.body)) {
            if (_.isArray(reply.data.body.content)) {
                res = reply.data.body;
            }
        }

        // 返回结果
        return res;
    };
    // {
    // playId: 'res.2064970d467644b283f7e042b960ae89',
    // name: '元气勇者',
    // playNum: 16853
    // },
};
