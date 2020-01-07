import axios from "axios";
import Cookie from "cookie";
import JSCookie from "js-cookie";
export const state = () => ({
    // 默认配置
    config: {
        // domain: "http://120.78.92.210:10000"
        domain: "https://mengdata.maijimaiji.cn",
        // domain: "http://47.107.63.102:10000",
        // domain: 'http://menguat.maijimaiji.cn'
    },
    // 登录数据
    loginData: {},
    // 个人数据
    userData: {},
    // 会话
    session: {
        token: "",
        userId: "",
        isLogin: false
    },
    // 商品订单详情 - 已生成订单
    goodsOrderDetail: {},
    // 商品购买详情 - 预生成订单
    goodsBuyDetail: {},
    // 商品购买规格
    goodsBuySpec: {},
    // 商品购买数量
    goodsBuyNumber: 0,
    // 从购物车购买
    // 购物车id组
    cartsId: '',
});

export const mutations = {
    // 通用保存
    save: function(state, params) {
        if (!params.path) return;
        // if (!params.data) return;
        var keyPath = params.path.split(".");
        var keyLength = keyPath.length;
        var keySave = state;
        var isPass = true;
        for (var i = 0; i < keyLength - 1; i++) {
            keySave = keySave[keyPath[i]];
            if (!keySave) {
                isPass = false;
                break;
            }
        }
        if (!isPass) return;
        var keyLast = keyPath[keyLength - 1];
        if (params.action) {
            if (params.action === "minus") keySave[keyLast] = keySave[keyLast] - params.data;
            if (params.action === "plus") keySave[keyLast] = keySave[keyLast] + params.data;
            return;
        }
        keySave[keyLast] = params.data;
    }
};

export const actions = {
    async nuxtServerInit(storeContext, {
        req
    }) {
        // ============================================
        // storeContext 参考
        // ============================================
        // storeContext = {
        //     //
        //     dispatch: "function",
        //     commit: "function",
        //     getters: {},
        //     state: { counter: 1000, config: { domain: "http://120.78.92.210:10000" }, userData: {}, session: {} },
        //     rootGetters: {},
        //     rootState: { counter: 1000, config: { domain: "http://120.78.92.210:10000" }, userData: {}, session: {} }
        // };
        // ============================================

        let cookieHash = Cookie.parse(req.headers.cookie || "");
        let token = cookieHash["mj_token"] || "";
        let userId = cookieHash["mj_userId"] || "";

        storeContext.commit("save", {
            path: "session",
            data: {
                token: token,
                userId: userId,
                isLogin: true
            }
        });
        // 判断是否登录
        let reply = await axios({
            url: storeContext.state.config.domain + "/urm/checkUserLoginStatus",
            method: "post",
            headers: {
                token: token
            }
        });
        if (reply.data.body && reply.data.body.loginStatus && reply.data.body.loginStatus === true) {
            // 已登录
        } else {
            // 清空登录数据
            storeContext.commit("save", {
                path: "loginData",
                data: {}
            });
            // 清空用户数据
            storeContext.commit("save", {
                path: "userData",
                data: {}
            });
            // 重置会话
            storeContext.commit("save", {
                path: "session",
                data: {
                    token: "",
                    userId: "",
                    isLogin: false
                }
            });
            JSCookie.remove("mj_token");
            JSCookie.remove("mj_userId");
        }
    }
};