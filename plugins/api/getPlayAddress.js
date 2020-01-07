import axios from "axios";
import _ from "lodash";
// 查询专辑
// ------------------------------------------------------------
export default function getPlayAddress(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = {};

        // 开始请求
        let reply = await axios({
            url: that.$domain + "/aly/getPlayAddress",
            method: "post",
            data: params
        });

        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success) {
            res = reply.data.body;
        }

        // 返回结果
        return res;

        // =====================================================
        // reply.data.body 值详情
        // =====================================================
        // reply.data.body = 'xxxxx';
    };
}
