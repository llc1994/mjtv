import axios from "axios";
import _ from "lodash";
// 查询用户协议
// ------------------------------------------------------------
export default function queryResItems(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = {};

        // 请求参数
        params.pageNum = params.pageNum || 1;
        params.pageSize = params.pageSize || 100;
        params.cateGory = params.cateGory || "OFFICIAL"; // PRE_NOTICE 预告、EASTER_EGG 花絮、OFFICIAL正片
        params.isDownSort = false;

        // 发起请求
        let reply = await axios({
            url: that.$domain + "/common/queryResItems",
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
        //     total: 1,
        //     pageNum: 1,
        //     pageSize: 100,
        //     resItems: [
        //         {
        //             id: "res.869e9102f6c94219b662937ce893ceba",
        //             bundleId: "res.e23faa669ff64385b63f8f3fbe0b7acc",
        //             title: "《龙的传人》第3季 全新起航！",
        //             descript: "《龙的传人》第3季 全新起航！",
        //             resId: "res.8f1945e780624eb0a58e5fb23bbfe955",
        //             alyId: "919801d24a8c47f0bc11265f5ff005ad",
        //             alyUrl:
        //                 "http://imgmagee.geeksfin.com/075cbceb40f9412ba6d9d3a9c760472a.png",
        //             cateGory: "OFFICIAL",
        //             markSort: 3,
        //             sort: 0,
        //             alonePlay: 0,
        //             enable: 1,
        //             state: 1,
        //             year: "2019",
        //             limitDate: "2019-07-05",
        //             limitTime: null,
        //             freeScope: "UNFREE",
        //             playNumber: 7587,
        //             duration: "30.3147",
        //             businessKey: "APG20180614002501",
        //             businessName: null,
        //             cmNumber: 0,
        //             episode: null,
        //             type: "VIDEO",
        //             modifyTime: "2019-07-05T16:08:37.397",
        //             createTime: "2019-07-05T16:08:37.397"
        //         }
        //     ]
        // };
    };
}
