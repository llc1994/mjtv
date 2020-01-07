import axios from "axios";
import _ from "lodash";
// 获取商品收藏状态
// ------------------------------------------------------------
export default function checkCollectStatus(context) {
    // 统一前后端书写
    let that = context.app;
    return async function(params) {
        // 初始化返回
        let res = {};

        // 开始请求
        let reply = await axios({
            url: that.$domain + "/urm/checkCollectStatus",
            method: "post",
            headers: {
                token: that.store.state.session.token || ""
            },
            data:params
        });

        // 返回结果
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body)) {
            res = reply.data.body;
        }
        return res;
        // =============================================
        // reply.data.body 返回值
        // =============================================
        // reply.data.body = {
        //     accessKeyId: "STS.NNTcmzRVB2uDr4AVXRf7is63M",
        //     accessKeySecret: "EzfLpwZVjr2MdAr8VcQRkr8nm4oucnwhxRew3Xg7bDAo",
        //     akExpiration: "2019-10-19T09:49:59Z",
        //     babyBirthday: "1990-3-1",
        //     babyName: "Mr.Z",
        //     babyRealName: "麦咭宝贝",
        //     babyRelation: null,
        //     cityId: "430100",
        //     cityName: "长沙市",
        //     clientType: 0,
        //     createTime: "20180719191128",
        //     magId: "010140",
        //     phone: "18675829412",
        //     provinceId: "430000",
        //     provinceName: "湖南省",
        //     qqInfo: null,
        //     realName: "张伟",
        //     securityToken: "CAISgQJ1q6Ft5B2y",
        //     sex: null,
        //     sign: "啦啦啦德玛西亚",
        //     solar: "",
        //     status: 0,
        //     token: "token.066222c4d0274c2599dd9f49e69c5dce",
        //     userIcon: "http://oss-maijitv.maijimeng.com/CB0C7E96-7409-4A78-AFDB-DC5E7015478A.png",
        //     userId: "urm712bd239b17140f9a3f559bdc106b2fb",
        //     userName: "18675829412",
        //     userNick: "Mr.Z",
        //     wxInfo: null,
        //     zodiac: "马",
        // }
    };
}
