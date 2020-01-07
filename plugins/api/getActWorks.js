import axios from "axios";
import _ from "lodash";
// 获取萌娃秀视频
export default function getActWorks(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = {};

        // 开始请求
        let reply = await axios({
            url: that.$domain + "/act/actWorks/getActWorks",
            method: "post",
            headers: {
                token: that.store.state.session.token || ""
            },
            data: params
        });

        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body)) {
            res = reply.data.body;
        }

        // 返回结果
        return res;
        // VideoInfos.data.body = {
        //     worksId: "AW20190930002506",
        //     userName: "淘淘123",
        //     realName: "白旭东",
        //     magId: "006510",
        //     userIcon: "http://thirdqq.qlogo.cn/qqapp/101473528/4FEF9A16496D90A696661E26B4245E3E/100",
        //     likes: 435,
        //     resourceId: "a5bbc74cf10f4d0da4d7a7fb1ce10142",
        //     resourceUrl: "http://videomagee.geeksfin.com/image/cover/F85A1501A16647AEA93393E5F8A90F76-6-2.png",
        //     comments: 0,
        //     works_id: null,
        //     id: "AW20190930002506",
        //     content: "教你画“争做好少年”手抄报！",
        //     userId: "urm7effdcff09be4af88699661aada19983",
        //     likeStatus: 0,
        //     followStatus: 0,
        //     status: 1,
        //     shieldStatus: 0,
        //     result: false,
        //     note: 0,
        //     rank: 0,
        //     musicId: 0,
        //     musicAlyUrl: null,
        //     musicName: null,
        //     musicAuthor: null,
        //     musicThumbnail: null,
        //     isXsd: 0,
        //     goodsInfo: null,
        //     chantId: null,
        //     mallGoodsId: null,
        //     resourcePlayUrl: "http://videomagee.geeksfin.com/a5bbc74cf10f4d0da4d7a7fb1ce10142/d28fe6eccbaf4cba91da802984ed9cb2-d61f170945099c5e1d5254ab4acf58ca-hd.mp4"
        // };
    };
}
