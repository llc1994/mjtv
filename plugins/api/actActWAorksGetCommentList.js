import axios from "axios";
import _ from "lodash";
// 获取萌娃视频评论
export default function actActWAorksGetCommentList(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回

        let res = {};

        // 预定义参数
        params.pageNum = params.pageNum || 1;
        params.pageSize = params.pageSize || 20;

        // 开始请求
        let reply = await axios({
            url: that.$domain + "/act/actWAorks/getCommentList",
            method: "post",
            headers: {
                token: that.store.state.session.token || ""
            },
            data: params
        });
        console.log('ddd')
        console.log(reply.data)
        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body)) {
            if (_.isArray(reply.data.body.list)) {
                res = reply.data.body;
            }
        }
        return res;

        // 评论详情
        // reply.data.body = {
        //     pageNum: 1,
        //     pageCount: 1,
        //     list: [
        //         {
        //             id: "AC20190817031035",
        //             programSeasonId: null,
        //             userIcon: "https://thirdwx.qlogo.cn/mmopen/vi_32.png",
        //             userId: "wx9cd22f866a37420fb7d4d249d04c8ff1",
        //             userName: "萌宝qq62",
        //             content: "太棒了！",
        //             replyId: null,
        //             replyAuthor: null,
        //             replyContent: null,
        //             addTime: "2019-08-17 19:57:39",
        //             like: 1,
        //             likeStatus: 1
        //         }
        //     ],
        //     commentCount: 1
        // };
    };
}
