import axios from "axios";
import _ from "lodash";
// 查询用户协议
// ------------------------------------------------------------
export default function search(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = {};

        // 请求参数
        params.pageNum = params.pageNum || 1;
        params.pageSize = params.pageSize || 20;

        // 发起请求
        let reply = await axios({
            url: that.$domain + "/mkt/search",
            method: "post",
            data: params
        });
        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body)) {
            res = reply.data.body;
        }

        // 返回结果
        return res;

        // 返回值详情
        // reply.data.body = {
        //     pageNum: 1,
        //     pageSize: 20,
        //     pageCount: 8,
        //     totalCount: 144,
        //     videoCount: 617,
        //     programs: [ [Object], [Object], [Object], [Object] ],
        //     videos: [
        //       [Object], [Object],
        //       [Object], [Object],
        //       [Object], [Object],
        //       [Object], [Object],
        //       [Object], [Object],
        //       [Object], [Object],
        //       [Object], [Object],
        //       [Object], [Object]
        //     ]
        // };
    };
}
