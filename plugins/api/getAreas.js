import axios from "axios";
import _ from "lodash";
// 查询区域列表
// ------------------------------------------------------------
export default function getAreas(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = [];

        // 开始请求
        let reply = await axios({
            url: that.$domain + "/common/getAreas",
            method: "post",
            //headers: {
            //    token: that.store.state.session.token || ""
            //},
            data:params
        });
        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isArray(reply.data.body)) {
            res = reply.data.body;
        }

        // 返回结果
        return res;
        // 请求
        // {cityid:'xxx'}
        // =============================================
        // reply.data.body 返回值
        // =============================================
        // reply.data.body = [{
            // "area": "string",
            // "areaid": "string",
            // "cityid": "string",
            // "createTime": "2019-10-20T11:06:46.879Z",
            // "id": 0,
            // "modifyTime": "2019-10-20T11:06:46.879Z"
        // }]
    };
}
