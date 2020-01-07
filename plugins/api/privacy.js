import axios from "axios";
import _ from "lodash";
// 查询隐私
// ------------------------------------------------------------
export default function privacy(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = {};

        // 发起请求
        let reply = await axios({
            url: "https://www.maijimeng.com/home/privacy",
            method: "get"
        });
        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body)) {
            res = reply.data.body;
        }

        // 返回结果
        return res;
    };
}
