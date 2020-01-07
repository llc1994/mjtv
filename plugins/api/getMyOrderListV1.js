import axios from "axios";
import _ from "lodash";
// 获取我的订单 - 我的课程等
export default function getOrderLists(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = {
            pageNum:1,
            pageCount:4,
            list:[]
        };

        // 预定义参数
        params.pageNum = params.pageNum || 1;
        params.pageSize = params.pageSize || 30;

        // 开始请求
        let reply = await axios({
            url: that.$domain + "/mer/mall/getMyOrderList/v1",
            method: "post",
            headers: {
                token: that.store.state.session.token || ""
            },
            data: params
        });

        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body) && _.isArray(reply.data.body.list)) {
            res = reply.data.body;
        }

        // 返回结果
        return res;
    };
}
