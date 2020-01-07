<template>
    <div class="toper-area">
        <div class="toper" :class="toperParams.backgroundColor">
            <div class="wrap">
                <!-- logo区域 -->
                <nuxt-link target="_blank" class="logo-area" to="/">
                    <img v-if="toperParams.backgroundColor === 'black'" class="logo" src="~/assets/images/maiji-logo.png" />
                    <img v-if="toperParams.backgroundColor === 'white'" class="logo" src="/footer-logo.png" />
                </nuxt-link>
                <!-- 搜索区域 -->
                <div class="search-area">
                    <div class="other-enter white">
                        <!-- 外链跳转 -->
                        <nuxt-link target="_blank"
                            to="/parent-child"
                            class="other-link"
                            :class="{
                                active: toperParams.category === 'parent-child'
                            }"
                            >亲子节目</nuxt-link
                        >
                        <nuxt-link target="_blank"
                            to="/program-interaction"
                            class="other-link"
                            :class="{
                                active: toperParams.category === 'program-interaction'
                            }"
                            >节目互动</nuxt-link
                        >
                        <nuxt-link target="_blank"
                            to="/anime-cartoon"
                            class="other-link"
                            :class="{
                                active: toperParams.category === 'anime-cartoon'
                            }"
                            >动漫卡通</nuxt-link
                        >
                        <nuxt-link target="_blank"
                            to="/meng-bao-video"
                            class="other-link"
                            :class="{
                                active: toperParams.category === 'meng-bao-video'
                            }"
                            >萌宝视频</nuxt-link
                        >
                        <nuxt-link target="_blank"
                            to="/maifen-classroom"
                            class="other-link"
                            :class="{
                                active: toperParams.category === 'maiji-classroom'
                            }"
                            >麦粉学堂</nuxt-link
                        >
                        <!-- <div
                            to="/maiji-shop"
                            @click="pleaseWait"
                            class="other-link"
                            :class="{
                                active: toperParams.category === 'maiji-shop'
                            }"
                        >
                            麦咭商城
                        </div>-->
                        <nuxt-link target="_blank"
                            to="/maiji-shop"
                            class="other-link"
                            :class="{
                                active: toperParams.category === 'maiji-shop'
                            }"
                            >麦咭商城</nuxt-link
                        >
                    </div>
                    <!-- 搜索盒子 -->
                    <form id="frmTopSearch" v-on:submit="doSearch">
                        <div class="search-box" v-if="toperParams.category !== 'maiji-shop'">
                            <div class="input">
                                <input type="input" :placeholder="keyword" />
                            </div>
                            <button class="button" type="submit">
                                <span class="iconfont icon-search"></span>
                            </button>
                        </div>
                    </form>
                    <!-- 其他入口 -->
                    <div class="other-enter black">
                        <!-- 外链跳转 -->
                        <nuxt-link target="_blank" to="/parent-child" class="other-link">亲子节目</nuxt-link>
                        <div class="separate"></div>
                        <nuxt-link target="_blank" to="/anime-cartoon" class="other-link">动漫卡通</nuxt-link>
                        <div class="separate"></div>
                        <nuxt-link target="_blank" to="/meng-bao-video" class="other-link">萌宝视频</nuxt-link>
                        <div class="separate"></div>
                        <nuxt-link target="_blank" to="/maifen-classroom" class="other-link">麦粉学堂</nuxt-link>
                    </div>
                </div>
                <!-- 快速入口区域 -->
                <div class="quick-area">
                    <!-- 会员 -->
                    <div class="img search"></div>
                    <nuxt-link target="_blank" to="/mall-shoppingcart" class="img mallcart" v-if="toperParams.category === 'maiji-shop' && session.isLogin === true"></nuxt-link>
                    <div class="img mallcart" @click="ShowLoginAndRegister" v-else-if="toperParams.category === 'maiji-shop'"></div>
                    <!-- 会员 -->
                    <a class="img vip" href="/user-vip" v-if="session.isLogin === true"></a>
                    <div class="img vip" @click="ShowLoginAndRegister" v-if="session.isLogin === false"></div>
                    <!-- 历史记录 -->
                    <div class="img history pc" @click="goWatchHistory"></div>
                    <a href="https://www.maijimeng.com/app" class="img history mobile2"></a>
                    <!-- 上传 -->
                    <!-- <a class="img upload" target="_blank" href="https://www.maijimeng.com/app" v-if="session.isLogin === true"></a> -->
                    <!-- <div class="img upload" @click="ShowLoginAndRegister" v-if="session.isLogin === false"></div> -->
                    <!-- 手机 -->
                    <a class="img mobile" target="_blank" href="https://www.maijimeng.com/app"  style="transform: rotate(-90deg);"></a>
                    <a class="img mobile" target="_blank" href="https://www.maijimeng.com/app"></a>

                    <!-- 用户 -->
                    <div
                        class="img user has-login pc"
                        v-if="session.isLogin === true"
                        :style="{
                            backgroundImage: 'url(' + (userData.userIcon || '/default-head-thumbnail.png') + ')'
                        }"
                        @click="jumpToUserCenter"
                        @mouseenter="enterUserCenter"
                        @mouseleave="leaveUserCenter"
                    ></div>
                    <div
                        class="img user has-login mobile2"
                        v-if="session.isLogin === true"
                        :style="{
                            backgroundImage: 'url(' + (userData.userIcon || '/default-head-thumbnail.png') + ')'
                        }"
                        @click="jumpToDownload"
                    ></div>
                    <div class="img user not-login" @click="ShowLoginAndRegister" v-else></div>
                </div>
            </div>
        </div>
        <div class="toper-space"></div>
        <div class="mobile-category-navigation" ref="wrapper">
            <div class="content">
                <div class="nav">亲子节目</div>
                <div class="nav">常规节目</div>
                <div class="nav">季播节目</div>
                <div class="nav">节目互动</div>
                <div class="nav">答题互动</div>
                <div class="nav">节目参与</div>
                <div class="nav">动漫卡通</div>
                <div class="nav">卡通自制</div>
                <div class="nav">热播推荐</div>
                <div class="nav">萌宝视频</div>
                <div class="nav">萌娃秀</div>
                <div class="nav">萌娃购</div>
                <div class="nav">麦粉学堂</div>
                <div class="nav">知识学堂</div>
                <div class="nav">在线课堂</div>
                <div class="nav">麦咭商城</div>
                <div class="nav">商城热卖</div>
                <div class="nav">精品店铺</div>
            </div>
        </div>

        <!-- 个人入口弹框 -->
        <div class="user-entry-popup" v-show="isUserEntryPopupShow" @mouseenter="enterUserEntryPopup" @mouseleave="leaveUserEntryPopup">
            <div class="my-infos">
                <div class="head-area">
                    <div
                        class="img"
                        :style="{
                            backgroundImage: 'url(' + (userData.userIcon || '/default-head-thumbnail.png') + ')'
                        }"
                    ></div>
                    <div class="txt" @click="exitLogin">退出登录</div>
                </div>
                <div class="info-area">
                    <div class="name">{{ userData.babyName }}</div>
                    <div class="sign">{{ userData.sign }}</div>
                    <div class="bi">
                        麦咭豆：
                        <span class="number">{{ userData.mesBeans }}</span>
                    </div>
                </div>
            </div>
            <div class="badge-area">
                <div class="box">
                    <div
                        class="img"
                        :style="{
                            backgroundImage: 'url(/user-equity/1.png)'
                        }"
                    ></div>
                    <div class="txt">充值奖励</div>
                </div>
                <div class="box">
                    <div
                        class="img"
                        :style="{
                            backgroundImage: 'url(/user-equity/2.png)'
                        }"
                    ></div>
                    <div class="txt">秀圈达人</div>
                </div>
                <div class="box">
                    <div
                        class="img"
                        :style="{
                            backgroundImage: 'url(/user-equity/3.png)'
                        }"
                    ></div>
                    <div class="txt">互动之星</div>
                </div>
                <div class="box">
                    <div
                        class="img"
                        :style="{
                            backgroundImage: 'url(/user-equity/4.png)'
                        }"
                    ></div>
                    <div class="txt">优惠大礼</div>
                </div>
                <div class="box">
                    <div
                        class="img"
                        :style="{
                            backgroundImage: 'url(/user-equity/5.png)'
                        }"
                    ></div>
                    <div class="txt">新人礼包</div>
                </div>
            </div>
        </div>

        <!-- 登录 - 注册 - 面板 -->
        <div class="layer" v-show="loginAndRegisterParams.isShow">
            <!-- 登录面板 -->
            <div class="form login" v-if="loginAndRegisterParams.panelName === 'login'">
                <div class="login-and-register">
                    <div class="login-panel">
                        <div class="top">
                            <div class="logo">
                                <img class="img" src="/footer-logo.png" />
                            </div>
                            <div class="close" @click="closeLayer"></div>
                        </div>
                        <div class="main">
                            <div class="group">
                                <div class="label user"></div>
                                <div class="input">
                                    <input type="text" placeholder="请输入账号" v-model="phone" />
                                </div>
                            </div>
                            <div class="group">
                                <div class="label password"></div>
                                <div class="input">
                                    <input type="password" placeholder="请输入密码" v-model="password" />
                                </div>
                            </div>
                            <div class="register-and-forget-password">
                                <div class="register" @click="gotoRegister">注册</div>
                                <div class="forget-password" @click="gotoForgetPassword">忘记密码</div>
                            </div>
                            <div class="main-button login" @click="loginStep">登&nbsp;&nbsp;&nbsp;&nbsp;录</div>
                            <div class="protocol">
                                <div class="row fx" style="width:100%;text-align:center;">
                                    <div class="col col-pc-3 col-pad-3 col-mobile-12">登录即代表同意</div>
                                    <div class="col col-pc-4 col-pad-4 col-mobile-5">
                                        <a class="link" target="_blank" href="https://www.maijimeng.com/home/useragreement">《用户协议》</a>
                                    </div>
                                    <div class="col col-pc-1 col-pad-1 col-mobile-2">和</div>
                                    <div class="col col-pc-4 col-pad-4 col-mobile-5">
                                        <a class="link" target="_blank" href="https://www.maijimeng.com/home/privacy">《隐私协议》</a>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="direct-login-tips">
                                无需注册一键登录
                            </div>
                            <div class="direct-login">
                                <div class="img qq"></div>
                                <div class="seprate"></div>
                                <div class="img weixin"></div>
                            </div>-->
                        </div>
                    </div>
                </div>
            </div>

            <!-- 注册面板 -->
            <div class="form register" v-if="loginAndRegisterParams.panelName === 'register'">
                <div class="login-and-register">
                    <div class="login-panel">
                        <div class="top">
                            <div class="logo">
                                <img class="img" src="/footer-logo.png" />
                                <span class="text">手机注册</span>
                            </div>
                            <div class="close" @click="closeLayer"></div>
                        </div>
                        <div class="main">
                            <div class="group">
                                <div class="input">
                                    <input type="text" placeholder="请输入注册手机号" v-model="phone" />
                                </div>
                            </div>
                            <div class="group">
                                <div class="input">
                                    <input type="text" placeholder="请输入验证码" v-model="verifyCode" />
                                </div>
                                <div class="getVerifyCode" @click="getVerifyCode">{{verifyString}}</div>
                            </div>
                            <div class="group">
                                <div class="input">
                                    <input type="password" placeholder="请输入不低于6位数的登录密码" v-model="password" />
                                </div>
                            </div>
                            <div class="group">
                                <div class="input">
                                    <input type="text" placeholder="好友邀请码（非必填）" v-model="inviteCode" />
                                </div>
                            </div>

                            <div class="main-button login" @click="nextStep">下&nbsp;&nbsp;&nbsp;&nbsp;一&nbsp;&nbsp;&nbsp;&nbsp;步</div>
                            <div class="protocol">
                                注册即代表您同意
                                <a class="link" target="_blank" href="https://www.maijimeng.com/home/useragreement">《麦咭TV用户协议》</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 忘记密码面板 -->
            <div class="form forget-password" v-if="loginAndRegisterParams.panelName === 'forget-password'">
                <div class="login-and-register">
                    <div class="login-panel">
                        <div class="top">
                            <div class="logo">
                                <img class="img" src="/footer-logo.png" />
                                <span class="text">忘记密码</span>
                            </div>
                            <div class="close" @click="closeLayer"></div>
                        </div>
                        <div class="main">
                            <div class="group">
                                <div class="input">
                                    <input type="text" placeholder="请输入手机号" v-model="phone" />
                                </div>
                            </div>
                            <div class="group">
                                <div class="input">
                                    <input type="text" placeholder="请输入验证码" v-model="verifyCode" />
                                </div>
                                <div class="getVerifyCode" @click="getVerifyCode">{{verifyString}}</div>
                            </div>
                            <div class="group">
                                <div class="input">
                                    <input type="password" placeholder="请输入新密码" v-model="newPassword" />
                                </div>
                            </div>

                            <div class="main-button login" @click="updatePassword">确&nbsp;&nbsp;&nbsp;&nbsp;认</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 提示面板 -->
            <div class="form tips" v-if="loginAndRegisterParams.panelName === 'register-success'">
                <div class="login-and-register">
                    <div class="login-panel">
                        <div class="top">
                            <div class="logo">
                                <img class="img" src="/footer-logo.png" />
                                <span class="text">手机注册</span>
                            </div>
                            <div class="close" @click="closeLayer"></div>
                        </div>
                        <div class="main">
                            <div class="tips-box">
                                <img class="register-success-image" src="/layer-form-register-success.png" style="max-width:50%;" />
                                <div class="register-success-text">恭喜你！注册成功</div>
                            </div>
                        </div>
                        <div class="main-button login" @click="gotoLogin">去&nbsp;&nbsp;登&nbsp;&nbsp;录</div>
                    </div>
                </div>
            </div>

            <!-- 提示面板 - 重置密码成功 -->
            <div class="form tips" v-if="loginAndRegisterParams.panelName === 'reset-password-success'">
                <div class="login-and-register">
                    <div class="login-panel">
                        <div class="top">
                            <div class="logo">
                                <img class="img" src="/footer-logo.png" />
                                <span class="text">忘记密码</span>
                            </div>
                            <div class="close" @click="closeLayer"></div>
                        </div>
                        <div class="main">
                            <div class="tips-box">
                                <img class="register-success-image" src="/layer-form-register-success.png" style="max-width:50%;" />
                                <div class="register-success-text">重置密码成功！</div>
                            </div>
                        </div>
                        <div class="main-button login" @click="gotoLogin">去&nbsp;&nbsp;登&nbsp;&nbsp;录</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import axios from 'axios';
import JSCookie from 'js-cookie';
export default {
    data() {
        return {
            loginAndRegisterParams: {
                panelName: 'login',
                isShow: false
            },
            isUserEntryPopupShow: false,
            timer: null,
            phone: '',
            password: '',
            newPassword: '',
            verifyCode: '',
            inviteCode: '',
            verifyString:'获取验证码',
            verifySecond:60,
        };
    },
    props: ['toperParams', 'keyword'],
    computed: {
        loginData() {
            return this.$store.state.loginData;
        },
        userData() {
            return this.$store.state.userData;
        },
        session() {
            return this.$store.state.session;
        }
    },
    created() {},
    mounted() {
        this.$nextTick(() => {
            let bs = new BScroll(this.$refs.wrapper, {
                scrollX: true
            });
        });
    },
    beforeRouteLeave(to,from,next){
        clearTimeout(this.timer)
        clearInterval(this.timerSecond)
        next();
    },
    methods: {
        // 敬请期待
        pleaseWait() {
            this.$pleaseWait();
        },
        jumpToUserCenter() {
            this.$router.push('/user-vip');
        },
        // 跳转到下载页
        jumpToDownload() {
            location.href = 'https://www.maijimeng.com/app';
        },
        // 跳转到历史记录页
        goWatchHistory() {
            if (this.session.isLogin === true) {
                this.$router.push('/user-watch-history');
            } else {
                this.loginAndRegisterParams = {
                    panelName: 'login',
                    isShow: true
                };
            }
        },
        // 离开用户中心
        leaveUserCenter() {
            var that = this;
            this.timer = setTimeout(function() {
                that.isUserEntryPopupShow = false;
            }, 500);
        },
        // 进入用户中心
        enterUserCenter() {
            this.isUserEntryPopupShow = true;
        },
        enterUserEntryPopup() {
            clearTimeout(this.timer);
        },
        leaveUserEntryPopup() {
            var that = this;
            setTimeout(function() {
                that.isUserEntryPopupShow = false;
            }, 500);
        },

        async ShowLoginAndRegister() {
            this.loginAndRegisterParams = {
                panelName: 'login',
                isShow: true
            };
            // let reply = await this.$privacy();
        },
        // 显示用户协议
        showUserProtocol() {},
        // 显示隐私协议
        showPrivateProtocol() {},
        // ----------------------------------------------------a
        // 跳转到注册
        gotoRegister() {
            this.loginAndRegisterParams.panelName = 'register';
        },
        // 跳转到忘记密码a
        gotoForgetPassword() {
            this.loginAndRegisterParams.panelName = 'forget-password';
        },
        // 跳转到登录
        gotoLogin() {
            this.loginAndRegisterParams.panelName = 'login';
        },
        // 关闭弹框
        closeLayer() {
            this.loginAndRegisterParams.isShow = false;
            this.phone = '';
            this.password = '';
            this.verifyCode = '';
            this.inviteCode = '';
            this.verifyString = '发送验证码'
            this.verifySecond = 60;
            clearInterval(this.timerSecond)
        },
        doSearch(evt) {
            let keyword = $('#frmTopSearch')
                .find('input')
                .val();
            if (keyword) {
                window.location.href = '/search-video/' + encodeURIComponent(keyword);
            }
            evt.preventDefault();
            return false;
        },
        // 退出登录
        async exitLogin() {
            let reply = await axios.post(this.$domain + '/urm/loginOut');
            if (reply.data.msgCd === this.$msgCode.success) {
                MJStore.remove('mj_loginData');
                MJStore.remove('mj_userData');
                JSCookie.remove('mj_token');
                JSCookie.remove('mj_userId');
                this.$store.commit('save', { path: 'loginData', data: {} });
                this.$store.commit('save', { path: 'userData', data: {} });
                this.$store.commit('save', {
                    path: 'session',
                    data: {
                        token: '',
                        userId: '',
                        isLogin: false
                    }
                });
                this.isUserEntryPopupShow = false;
                this.$router.push('/');
                $.message({
                    message: reply.data.msgInfo,
                    type: 'success'
                });
            } else {
                $.message({
                    message: reply.data.msgInfo,
                    type: 'error'
                });
            }
        },
        // 开始登录
        async loginStep() {
            // 发起登录
            let reply = await axios.post(this.$domain + '/urm/login', {
                clientType: '0',
                userName: this.phone,
                userPwd: CryptoJS.MD5(this.password).toString()
            });

            if (reply.data.msgCd === this.$msgCode.success) {
                this.loginAndRegisterParams.isShow = false;
                this.phone = '';
                this.password = '';
                this.verifyCode = '';
                this.inviteCode = '';
                this.$store.commit('save', {
                    path: 'loginData',
                    data: reply.data.body
                });
                this.$store.commit('save', {
                    path: 'session',
                    data: {
                        token: reply.data.body.token,
                        userId: reply.data.body.userId,
                        isLogin: true
                    }
                });
                MJStore.set('mj_loginData', reply.data.body);
                JSCookie.set('mj_token', reply.data.body.token, {
                    expires: 365
                });
                JSCookie.set('mj_userId', reply.data.body.userId, {
                    expires: 365
                });
                // 查找用户信息
                let replyUserData = await axios({
                    url: this.$domain + '/mes/queryMesUserInfo',
                    method: 'post',
                    headers: {
                        token: reply.data.body.token || ''
                    }
                });
                if (replyUserData.data.msgCd === this.$msgCode.success) {
                    this.$store.commit('save', {
                        path: 'userData',
                        data: replyUserData.data.body
                    });
                    MJStore.set('mj_userData', replyUserData.data.body);
                }
                // this.loginAndRegisterParams.panelName = "register-success";
                popup({
                    type: 'success',
                    msg: reply.data.msgInfo,
                    delay: 1000,
                    callBack: function() {}
                });
            } else {
                $.message({
                    message: reply.data.msgInfo,
                    type: 'error'
                });
            }
        },
        // 下一步 - 注册
        async nextStep() {
            // this.loginAndRegisterParams.panelName = "register-success";
            // 开始注册
            let replyRegister = await axios.post(this.$domain + '/urm/regist', {
                clientType: '0',
                smsCode: this.verifyCode,
                smsTempCode: 'SMS0000',
                userName: this.phone,
                userPwd: CryptoJS.MD5(this.password).toString()
            });
            if (replyRegister.data.msgCd === '00000') {
                this.loginAndRegisterParams.panelName = 'register-success';
            } else {
                $.message({
                    message: replyRegister.data.msgInfo,
                    type: 'error'
                });
            }
        },
        async updatePassword() {
            // 开始修改
            let reply = await axios.post(this.$domain + '/urm/resetPwd', {
                clientType: '0',
                smsCode: this.verifyCode,
                smsTempCode: 'SMS0000',
                userName: this.phone,
                newPwd: CryptoJS.MD5(this.newPassword).toString()
            });
            if (reply.data.msgCd === '00000') {
                this.loginAndRegisterParams.panelName = 'reset-password-success';
            } else {
                $.message({
                    message: reply.data.msgInfo,
                    type: 'error'
                });
            }
        },
        async getVerifyCode() {
            if(this.verifySecond < 60) {
                $.message({
                    message: '请等待' + this.verifySecond + '秒后再次发送',
                    type: 'info'
                });
                return;
            };

            // 发送验证码
            let replyVerify = await axios.post(this.$domain + '/common/sendSmsCode', {
                mobile: this.phone,
                smsTempCode: 'SMS0000'
            });
            if (replyVerify.data.msgCd === '00000') {
                $.message({
                    message: replyVerify.data.msgInfo,
                    type: 'success'
                });
                this.timerSecond = setInterval(() => {
                    if(this.verifySecond > 0){
                        this.verifyString = this.verifySecond-- + 's'
                    }else{
                        this.verifySecond = 60;
                        this.verifyString = '发送验证码'
                        clearInterval(this.timerSecond)
                    }

                },1000)
            } else {
                $.message({
                    message: replyVerify.data.msgInfo,
                    type: 'error'
                });
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.user-entry-popup {
    position: fixed;
    top: 80px;
    right: 30px;
    // height: 200px;
    width: 500px;
    z-index: 9999;
    background-color: #fff;
    border: 1px solid #ddd;
    .my-infos {
        // height: 120px;
        display: flex;
        padding: 20px 10px;
        .head-area {
            flex: 0 0 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .img {
                height: 80px;
                width: 80px;
                flex: 0 0 80px;
                background-color: #8ac;
                background-repeat: no-repeat;
                background-position: center center;
                background-size: contain;
                border-radius: 50%;
            }
            .txt {
                height: 30px;
                flex: 0 0 30px;
                line-height: 30px;
                cursor: pointer;
            }
        }
        .info-area {
            display: flex;
            flex-direction: column;
            flex: 1 1 100%;
            .name {
                height: 40px;
                line-height: 40px;
                font-size: 28px;
                font-weight: bold;
            }
            .sign {
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                color: #333;
            }
            .bi {
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                .number {
                    font-size: 28px;
                    color: #1fb3f0;
                    font-weight: bold;
                }
            }
        }
    }
    .badge-area {
        padding: 20px 20px;
        display: flex;
        .box {
            flex: 0 0 20%;
            // height: 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .img {
                height: 60px;
                width: 60px;
                flex: 0 0 60px;
                background-repeat: no-repeat;
                background-position: center center;
                background-size: contain;
            }
            .txt {
                height: 30px;
                line-height: 30px;
                text-align: center;
                flex: 0 0 30px;
            }
        }
    }
}
</style>
