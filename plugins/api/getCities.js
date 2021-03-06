import axios from "axios";
import _ from "lodash";
// 查询省级列表
// ------------------------------------------------------------
export default function getCities(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = [];

        // 开始请求
        let reply = await axios({
            url: that.$domain + "/common/getCities",
            method: "post",
            // headers: {
            //    token: that.store.state.session.token || ""
            // },
            data:params
        });
        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success) {
            res = reply.data.body;
        }

        // 返回结果
        return res;
        // =============================================
        // reply.data.body 返回值
        // =============================================
        // reply.data.body = [{
            // city: "市辖区"
            // cityid: "120100"
            // createTime: null
            // id: 2
            // modifyTime: null
            // provinceid: "120000"
        // }]
    };
}
