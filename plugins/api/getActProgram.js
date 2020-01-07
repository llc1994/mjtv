import axios from "axios";
import _ from "lodash";
// 查询专辑
// ------------------------------------------------------------
export default function getActProgram(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = {};

        // 开始请求
        let reply = await axios({
            url: that.$domain + "/act/actProgram/getActProgram",
            method: "post",
            data: params
        });

        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body)) {
            res = reply.data.body;
        }

        // 返回结果
        return res;

        // =====================================================
        // reply.data.body 值详情
        // =====================================================
        // reply.data.body = {
        //     id: null,
        //     programId: null,
        //     seasonName: null,
        //     seasonNo: null,
        //     newest: null,
        //     seasonPic: null,
        //     tvBundleId: "res.e23faa669ff64385b63f8f3fbe0b7acc",
        //     tvBundleUrl: null,
        //     type: 1,
        //     isCurrenProgram: null,
        //     name: "龙的传人",
        //     beginDate: null,
        //     endDate: null,
        //     logoUrl: null,
        //     newBackUrl: null,
        //     iconResourceUrl:
        //         "http://imgmagee.geeksfin.com/3f9675543d4541f086a043e82d2e8331.png",
        //     topImg: null,
        //     firstRecommentType: null,
        //     firstRecommentImg: null,
        //     firstRecommentPlayNum: 0,
        //     firstRecommentTxt: null,
        //     firstRecommentVal: null,
        //     firstPlayPeriod: null,
        //     firstPlayBeginTime: null,
        //     firstPlayEndTime: null,
        //     replayPeriod: null,
        //     replayBeginTime: null,
        //     replayEndTime: null,
        //     programLabel: null,
        //     introImg: null,
        //     tvMoreTxt: null,
        //     infMoreTxt: null,
        //     recommentType: null,
        //     recommentBeginDate: null,
        //     recommentEndDate: null,
        //     infImg: null,
        //     infType: null,
        //     infVal: null,
        //     espBeginDate: null,
        //     espEndDate: null,
        //     espBeginTime: null,
        //     espEndTime: null,
        //     espImg: null,
        //     espLink: null,
        //     espIsShare: null,
        //     espShareTxt: null,
        //     espShareImg: null,
        //     espOn: null,
        //     floatOn: null,
        //     floatImg: null,
        //     floatType: null,
        //     floatVal: null,
        //     floatBeginDate: null,
        //     floatEndDate: null,
        //     floatBeginTime: null,
        //     floatEndTime: null,
        //     status: 1,
        //     infIsShare: null,
        //     infShareImg: null,
        //     infShareTxt: null,
        //     infShareJs: null,
        //     floatIsShare: null,
        //     floatShareImg: null,
        //     floatShareTxt: null,
        //     floatShareJs: null,
        //     coustom: null,
        //     floatCueWords: null,
        //     collectCount: 469,
        //     intro:
        //         "全国首档亲子国学传承节目，节目首创动画提问形式，用动画呈现国学题目，在童趣娱乐中进行游戏闯关。",
        //     espJs: null,
        //     infSuperType: null,
        //     infSuperVal: null,
        //     infSubType: null,
        //     infSubVal: null,
        //     espSuperType: null,
        //     espSuperVal: null,
        //     espSubType: null,
        //     espSubVal: null,
        //     floatSuperType: null,
        //     floatSuperVal: null,
        //     floatSubType: null,
        //     floatSubVal: null,
        //     floatAnswerTrue: null,
        //     floatAnswerFalse: null,
        //     floatH5Js: null,
        //     floatBtnTxt: null,
        //     espH5Js: null,
        //     infH5Js: null,
        //     resId: null,
        //     iconStatus: null
        // };
    };
}
