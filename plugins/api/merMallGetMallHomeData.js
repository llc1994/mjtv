import axios from 'axios';
import _ from 'lodash';
// 获取商城首页数据
export default function merMallGetMallHomeData(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = {};

        // 开始请求
        let reply = await axios({
            url: that.$domain + '/mer/mall/getMallHomeData',
            method: 'post',
            data: params
        });

        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body)) {
            res = reply.data.body;
        }

        // 返回结果
        return res;
    };
}
