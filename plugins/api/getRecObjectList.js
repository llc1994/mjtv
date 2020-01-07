import axios from "axios";
import _ from "lodash";

// 标题分割函数
let splitFunc = function(item) {
    if(!item.title) return;
    item.my_title_one = '';
    item.my_title_two = item.title;
    if (item.title.indexOf('》') !== -1) {
        let res = item.title.split('》');
        if (res.length < 2) {
            item.my_title_one = '';
            item.my_title_two = res[0] + '》';
        } else {
            item.my_title_one = res[1].split('：')[0];
            item.my_title_two = res[0] + '》';
        }
    } else {
        item.my_title_one = '';
        item.my_title_two = item.title;
    }
    item.title = item.title.replace(/(《.+?》).+/g, '$1');
};
// 查询推荐位
// ------------------------------------------------------------
export default function getRecObjectList(context) {
    // 统一前后端书写
    let that = context.app;

    return async function(params) {
        // 初始化返回
        let res = {
            allAdvList: []
        };

        // 预定义参数
        params.pageNum = params.pageNum || 1;

        // 开始请求
        let reply = await axios({
            url:that.$domain + "/mkt/getRecObjectList",
            method:'post',
            data: params
        });
        // 数据处理
        if (reply.data && reply.data.msgCd === 'MJM-MKT00000' && _.isObject(reply.data.body)) {
            if (_.isArray(reply.data.body.allAdvList)) {
                reply.data.body.allAdvList.forEach(function(item) {
                    item.active = false;
                    item.to = that.$jumpParams[item.skipType] ? that.$jumpParams[item.skipType] + item.itemId : item.tag;
                    splitFunc(item);
                });
                res = reply.data.body;
            }
        }

        // 返回结果
        return res;
    };

    // =====================================================
    // reply.data.body 值详情
    // =====================================================
    // reply.data.body = {
    //     pageNum: 1,
    //     pageSize: 7,
    //     allAdvList: [
    //         {
    //             modifyTime: null,
    //             createTime: null,
    //             id: "64533402d05a4c41a5f87020c0b48558",
    //             recPosition: "0dd51ebcd0d1451dbdedcfb82f1b032f",
    //             title: "《翻开这一页》第2季01集",
    //             descript: "一定要争气",
    //             tag: "",
    //             skipType: "8b761d9f05584d9ebca72c84906dd333",
    //             resourceId: "",
    //             imgUrl: "",
    //             itemId: "res.8d69bf44176e4c00be7beb3f13c702be",
    //             customImgResid: "res.493d42572a204d6dac8319d0569f059b",
    //             customImgUrl: "http://imgmagee.geeksfin.com/ac3c181bf0d447acabff49c50c7c669b.png",
    //             upDate: "2019-09-27 12:30:53",
    //             downDate: "2021-09-27 12:30:55",
    //             sort: "0",
    //             positionCode: "PC_DMKT_DBBN",
    //             program: "顶部banner",
    //             skipCode: "MJTV_JM_SP",
    //             skipName: "指定节目视频",
    //             extendedField1: "PNG",
    //             extendedField2: null,
    //             extendedField3: null,
    //             extendedField4: null,
    //             extendedField5: null,
    //             platType: 2,
    //             active: false
    //         }
    //     ]
    // };
};
