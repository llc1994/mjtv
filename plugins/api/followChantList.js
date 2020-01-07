import axios from "axios";
import _ from "lodash";
// 查询我关注的店铺
// ------------------------------------------------------------
export default function followChantList(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = [];

        // 开始请求
        let reply = await axios({
            url: that.$domain + "/mer/followChantList",
            method: "post",
            headers: {
                token: that.store.state.session.token || '',
            },
            data: params
        });

        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body) && _.isArray(reply.data.body.merChantFollowRspDTOs)) {
            res = reply.data.body.merChantFollowRspDTOs;
        }

        // 返回结果
        return res;
    };
}
