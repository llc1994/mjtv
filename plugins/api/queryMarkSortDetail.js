import axios from "axios";
import _ from "lodash";
// 查询季播详情
// ------------------------------------------------------------
export default function queryMarkSortDetail(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = [];

        // 预定义参数
        params.seasonNumber = params.seasonNumber || 0;

        // 开始请求
        let reply = await axios({
            url: that.$domain + "/common/queryMarkSortDetail",
            method: "post",
            data: params
        });

        // 处理数据
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isArray(reply.data.body)) {
            // 让第n个季播高亮
            reply.data.body.forEach(function(item, index) {
                if (params.seasonNumber === 0) {
                    if (index === params.seasonNumber) {
                        item.active = true;
                    } else {
                        item.active = false;
                    }
                } else {
                    if (params.seasonNumber === item.markSort) {
                        item.active = true;
                    } else {
                        item.active = false;
                    }
                }
            });
            res = reply.data.body;
        }
        return res;

        // ==========================================
        // reply.data.body 值详情
        // ==========================================
        // reply.data.body = [
        //     { markSort: 3, active: true },
        //     { markSort: 2, active: false },
        //     { markSort: 1, active: false }
        // ]
    };
}
