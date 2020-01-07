import axios from 'axios';
import _ from 'lodash';
// 获取广告位数据
export default function mktGetAdvList(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = [];

        // 开始请求
        let reply = await axios({
            url: that.$domain + '/mkt/getAdvList',
            method: 'post',
            headers: {
                token: that.store.state.session.token || '',
            },
            data: params,
        });

        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body) && _.isArray(reply.data.body.allAdvList)) {
            reply.data.body.allAdvList.forEach(item  => {
            })
            res = reply.data.body.allAdvList;
        }

        // 返回结果
        return res;
        // 返回参考
        // VideoInfos.data.body = {
        //     pageNum: 1,
        //     pageCount: 38,
        //     list: [
        //         {
        //             worksId: 'AW20190912038549',
        //             userName: '铁甲贝尔',
        //             realName: null,
        //             magId: '002502',
        //             userIcon: 'http://oss-maijitv.maijimeng.com/D337D93F-93DB-4256-97BF-D8425CD98984.jpg',
        //             likes: 453,
        //             resourceId: 'f2e8cd287bac42c5aa21de5c6d4240d3',
        //             resourceUrl: 'http://videomagee.maijimeng.com/image/cover/B623C5C55F0645DF8833A08F338D6266-6-2.png',
        //             comments: 3,
        //             works_id: null,
        //             id: 'AW20190912038549',
        //             content: '新生儿拍照，怎么可以这么可爱！！！！',
        //             userId: null,
        //             likeStatus: 0,
        //             followStatus: 0,
        //             status: 0,
        //             shieldStatus: 0,
        //             result: false,
        //             note: 0,
        //             rank: 0,
        //             musicId: 0,
        //             musicAlyUrl: null,
        //             musicName: null,
        //             musicAuthor: null,
        //             musicThumbnail: null,
        //             isXsd: 0,
        //             goodsInfo: null,
        //             chantId: null,
        //             mallGoodsId: null,
        //             playNumber: null,
        //             resourcePlayUrl: null,
        //         },
        //     ],
        //     actId: 'AP20190826007001',
        //     pgroupId: 'APG20180712006001',
        //     actName: '家有二宝',
        //     musicId: 0,
        //     actContent: '你家有两个可爱的宝贝吗？或者你的爸爸妈妈仿佛两个“活宝”？快来分享你家逗趣横生的日常生活吧！！',
        //     pgroupIcon: 'http://oss-maijitv.maijimeng.com/b306c1a9e826412db3448bcd39e93c78.png',
        //     beginDate: '2019-08-26',
        //     endDate: '2021-08-26',
        //     online: 1,
        // };
    };
}
