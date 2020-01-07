import axios from 'axios';
import _ from 'lodash';
// 查询专辑
// ------------------------------------------------------------
export default function getPlayAddressList(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = {};

        // 开始请求
        let reply = await axios({
            url: that.$domain + '/aly/getPlayAddressList',
            method: 'post',
            data: params,
        });
        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body) && _.isArray(reply.data.body.playInfo)) {
            reply.data.body.playInfo.forEach(function(item){
                res[item.definition] = item.playURL
            })
        }
        // 返回结果
        return JSON.stringify(res);

        // =====================================================
        // reply.data.body 值详情
        // =====================================================
        // reply.data.body = [
        //     {
        //     jobId: 'e02329cb659c4b29a8a7ad1f1bb19bcd',
        //     height: '360',
        //     size: '24009239',
        //     definition: 'FD',
        //     duration: '220.6080',
        //     format: 'mp4',
        //     playURL: 'http://videomagee.maijimeng.com/af2dc-fd.mp4',
        //     width: '640',
        //     bitrate: '870.657',
        //     encrypt: '0',
        //     streamType: 'video',
        //     fps: '25',
        // }];
    };
}
