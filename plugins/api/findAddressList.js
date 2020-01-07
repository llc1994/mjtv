import axios from 'axios';
import _ from 'lodash';
// 查询区域列表
// ------------------------------------------------------------
export default function findAddressList(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = {
            pageNum: 1,
            pageSize: 0,
            pageCount: 0,
            list:[]
        };

        // 开始请求
        let reply = await axios({
            url: that.$domain + '/urm/findAddressList',
            method: 'post',
            headers: {
                token: that.store.state.session.token || '',
            },
            data: params,
        });
        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body) && _.isArray(reply.data.body.list)) {
            res = reply.data.body;
        }

        // 返回结果
        return res;
        // =============================================
        // reply.data.body 返回值
        // =============================================
        // reply.data.body = {
        //     pageNum: 1,
        //     pageSize: 2,
        //     pageCount: 1,
        //     list: [
        //         //
        //         {
        //             name: '王彬',
        //             mobileNum: '17363791523',
        //             region: '湖南省长沙市岳麓区',
        //             address: '枫林三路弘德好莱城9栋',
        //             defaultFlag: 1,
        //             tag: null,
        //             addrId: 'urme60b70fe377a4fb9b401440472296a5a',
        //         },
        //         {
        //             name: '王小二',
        //             mobileNum: '17665781248',
        //             region: '湖南省长沙市芙蓉区',
        //             address: '桐梓林3栋9层',
        //             defaultFlag: 0,
        //             tag: null,
        //             addrId: 'urm8468e0301d5048fbbbe8d4056807b122',
        //         },
        //     ],
        // };
    };
}
