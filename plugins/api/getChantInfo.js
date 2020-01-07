import axios from 'axios';
import _ from 'lodash';
// 获取商户信息
// ------------------------------------------------------------
export default function getChantInfo(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = {
            shopInfo: {},
            searchInfo: {},
        };

        // 开始请求
        let reply = await axios({
            url: that.$domain + '/mer/getChantInfo',
            method: 'post',
            headers: {
                token: that.store.state.session.token || '',
            },
            data: params,
        });
        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body)) {
            if (!_.isObject(reply.data.body.shopInfo)) reply.data.body.shopInfo = {};
            if (!_.isObject(reply.data.body.searchInfo)) reply.data.body.searchInfo = {};
            res = reply.data.body;
        }

        // 返回结果
        return res;
        // =============================================
        // reply.data.body 返回值
        // =============================================
        // reply.data.body = {
        //     shopInfo: {
        //         serviceNumber: '18024032180',
        //         vName: '企业官方认证店铺',
        //         logoUrl: 'http://oss-maijitv.maijimeng.com/6acd90971eb543b8bf48c3cc69fbd034.png',
        //         followCount: 2,
        //         tabText: null,
        //         shopDes: '灵动创想用动漫IP陪伴孩子成长，给孩子一个快乐趣味童年！',
        //         shopName: '灵动创想',
        //         signUrl: 'http://oss-maijitv.maijimeng.com/1265483b67a14e2c8af7cb55f9cca4ed.jpg',
        //         followed: false,
        //         isV: 1,
        //         vLogo: 'http://oss-maijitv.maijimeng.com/de9b9b6a52694e19b407c491c30394c4.png',
        //         vLevel: 1,
        //         chantId: 'MER1909023501',
        //     },
        //     searchInfo: { title: '麦咭智能', searchItems: [] },
        // };
    };
}
