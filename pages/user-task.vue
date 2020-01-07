<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <div class="user-center">
            <div class="wrap">
                <!-- 用户左侧面板 -->
                <UserMenu ref="UserMenu" :menu="menu" v-on:signSuccessEmit="signSuccessEmitAction" />
                <div class="main">
                    <div class="user-task">
                        <div class="big-title">任务中心</div>
                        <div class="big-tips">加入我们的第一步，快来挑战</div>
                    </div>
                    <div class="list-area">
                        <div class="list" v-for="(item, index) in TaskLists.body.list" :key="index">
                            <template v-if="item.taskId != '1-6'">
                                <div class="left">
                                    <div class="img">
                                        <img :src="item.taskIcon" />
                                    </div>
                                    <div class="txt">{{ item.taskDepict }}</div>
                                </div>
                                <div class="right">
                                    <div class="dou"><img src="/dou.png" />X{{ item.taskIntegral }}</div>
                                    <div class="status yes" v-if="item.finished" @click="handleTask(item)">
                                        已完成
                                    </div>
                                    <div class="status no" @click="handleTask(item)" v-else>
                                        去完成
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 绑定手机面板 -->
        <div class="phone-popup" v-show="isBandingPhonePopup">
            <div class="phone-area">
                <div class="phone-main">
                    <div class="title">
                        <div class="logo">
                            <img src="/maiji-logo-blue.png" />
                            <div class="line"></div>
                            绑定手机
                        </div>

                        <div class="close" @click="closeBandingPhonePopup">
                            <img src="/qiandao-popup-close-grey.png" />
                        </div>
                    </div>

                    <div class="line">
                        <div class="value">
                            <input type="text" placeholder="请输入注册手机号" v-model="bindingPhone" />
                        </div>
                    </div>

                    <div class="line">
                        <div class="value">
                            <input type="text" placeholder="请输入验证码" v-model="authCode" />
                        </div>
                        <div v-show="isAuthCodeError" class="error">验证码输入有误</div>
                        <div v-show="sendAuthCode" class="code" @click="getPhoneCode">获取验证码</div>
                        <div v-show="!sendAuthCode" class="code">{{ authTime }}秒</div>
                    </div>
                    <div class="line">
                        <div class="button" @click="confirmBindingPhone">确定</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 完善个人信息 -->
        <div class="information-popup" v-show="isCompleteInformationPopup">
            <div class="information-area">
                <div class="information-main">
                    <div class="title">
                        <div class="logo">
                            <img src="/maiji-logo-blue.png" />
                            <div class="line"></div>
                            完善用户资料
                        </div>

                        <div class="close" @click="closeCompleteInformationPopup">
                            <img src="/qiandao-popup-close-grey.png" />
                        </div>
                    </div>

                    <div class="line">
                        <div class="label">用户真实姓名</div>
                        <div class="value">
                            <input type="text" placeholder="请输入真实姓名" v-model="userInfo.realName" />
                        </div>
                    </div>

                    <div class="line">
                        <div class="label">宝贝姓名</div>
                        <div class="value">
                            <input type="text" placeholder="请输入宝贝姓名" v-model="userInfo.babyName" />
                        </div>
                    </div>

                    <div class="line">
                        <div class="label">与宝贝的关系</div>
                        <div class="value">
                            <select v-model="userInfo.babyRelation">
                                <option value="6">父母</option>
                                <option value="5">其他</option>
                            </select>
                        </div>
                    </div>

                    <div class="line">
                        <div class="label">宝贝生日</div>
                        <div class="value">
                            <input type="text" placeholder="" ref="babyBirthday" />
                        </div>
                    </div>

                    <!-- <div class="line">
                               <div class="label">微信号</div>
                            <div class="value">
                                <input
                                    type="text"
                                    placeholder="请输入微信号"
                                    v-model="userInfo.wxInfo"
                                />
                            </div>
                         </div>

                          <div class="line">
                               <div class="label">QQ号</div>
                            <div class="value">
                                <input
                                    type="text"
                                    placeholder="请输入QQ号"
                                    v-model="userInfo.qqInfo"
                                />
                            </div>
                         </div> -->

                    <div class="line">
                        <div class="label">星座</div>
                        <div class="value">
                            <select v-model="userInfo.solar">
                                <option v-for="item in solarList" :value="item" :key="item" name="solar">{{ item }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="line">
                        <div class="value">
                            <select v-model="userInfo.provinceId" @change="changeProvince()">
                                <option v-for="(item, index) in provinceList" :value="item.provinceid" name="provinceId" :key="index">{{ item.province }}</option>
                            </select>
                            <select v-model="userInfo.cityId" @change="changeCity()">
                                <option v-for="(item, index) in cityList" :value="item.cityid" name="cityId" :key="index">{{ item.city }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="line" style="height:60px;padding:5px 0;cursor:pointer;font-size:16px;">
                        <div class="button" @click="completeUserInfo">确定</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部 -->
        <Footer />
        <!-- 登录注册 -->
    </div>
</template>
<script>
import Toper from '~/components/Toper.vue';
import Footer from '~/components/Footer.vue';
import Slide from '~/components/Slide.vue';
import Subject from '~/components/Subject.vue';
import UserMenu from '~/components/UserMenu.vue';
import axios from 'axios';
export default {
    middleware: 'auth',
    data() {
        return {
            toperParams: {
                backgroundColor: 'white',
                category: '',
            },
            menu: {
                isActive: 'user-task',
            },
            userInfo: {
                babyBirthday: '',
                babyName: '',
                babyRealName: '',
                babyRelation: 0,
                cityId: '',
                cityName: '',
                provinceId: '',
                provinceName: '',
                realName: '',
                sex: '',
                sign: '',
                solar: '',
                userIcon: '',
                userNick: '',
                zodiac: '',
            },
            isBandingPhonePopup: false,
            isCompleteInformationPopup: false,
            authTime: 0,
            sendAuthCode: true,
            isAuthCodeError: false,
            bindingPhone: '',
            authCode: '',
            solarList: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '魔羯座', '水瓶座', '双鱼座'],
            provinceList: [],
            cityList: [],
        };
    },
    components: {
        Toper,
        Slide,
        Subject,
        Footer,
        UserMenu,
    },
    methods: {
        // 监听签到结果状态
        signSuccessEmitAction () {
            if (this.TaskLists && this.TaskLists.body && this.TaskLists.body.list && this.TaskLists.body.list.length > 0) {
                let myThis = this;
                this.TaskLists.body.list.some(function (item, index) {
                    if (item.taskId === '1-5') {
                        item.finished = myThis.$refs.UserMenu.isSign;
                        return true;
                    }
                });
            }
        },
        async handleTask(item) {
            if (!item.finished) {
                let taskId = item.taskId;
                let that = this;
                if (taskId === '1-1') {
                    //上传真实头像
                } else if (taskId === '1-2') {
                    //绑定手机号
                    this.isBandingPhonePopup = true;
                } else if (taskId === '1-3') {
                    //个人信息完善
                    this.userInfo = await this.$getUserInfo();
                    this.provinceList = await this.$getProvinces();
                    this.cityList = await this.$getCities({
                        provinceid: this.userInfo.provinceId,
                    });
                    // await this.getUserInfo();
                    // await this.getProvinceList();
                    this.isCompleteInformationPopup = true;
                    layui.laydate.render({
                        elem: that.$refs.babyBirthday,
                        value: that.userInfo.babyBirthday,
                        done: function(value, date, endDate) {
                            that.userInfo.babyBirthday = value;
                        },
                    });
                } else if (taskId === '1-4') {
                    //补全收货信息
                    this.$router.push({
                        path: '/user-address/',
                    });
                } else if (taskId === '1-5') {
                    //签到
                    this.$refs.UserMenu.openQiandaoPopup();
                }
            }
        },
        // 关闭弹框
        closeBandingPhonePopup() {
            this.isBandingPhonePopup = false;
        },
        closeCompleteInformationPopup() {
            this.isCompleteInformationPopup = false;
        },
        async getProvinceList() {
            let reply = await axios({
                url: this.$domain + '/common/getProvinces',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || '',
                },
            });
            this.provinceList = reply.data.body;
        },
        async getCityList() {
            let reply = await axios({
                url: this.$domain + '/common/getCities',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || '',
                },
                data: {
                    provinceid: this.userInfo.provinceId,
                },
            });

            this.cityList = reply.data.body;
        },
        async getUserInfo(context) {
            // 个人信息
            this.userInfo = await this.$getUserInfo();
        },
        // 选择省
        async changeProvince() {
            this.userInfo.provinceId = this.userInfo.provinceId;
            let hash = {};
            this.provinceList.forEach(function(item) {
                hash[item.provinceid] = item;
            });

            this.userInfo.provinceName = hash[this.userInfo.provinceId].province;
            this.cityList = await this.$getCities({
                provinceid: this.userInfo.provinceId,
            });
            if (this.cityList.length > 0) {
                this.userInfo.cityId = this.cityList[0].cityid;
                this.userInfo.cityName = this.cityList[0].city;
            }
        },
        // 选择市
        async changeCity() {
            this.userInfo.cityId = this.userInfo.cityId;
            let hash = {};
            this.cityList.forEach(function(item) {
                hash[item.cityId] = item;
            });
            this.userInfo.cityName = hash[this.userInfo.cityId];
        },
        //提交用户资料
        async completeUserInfo() {
            let reply = await axios({
                url: this.$domain + '/urm/completeUserInfo',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || '',
                },
                data: {
                    babyRealName: this.userInfo.babyBirthday,
                    sex: this.userInfo.sex,
                    sign: this.userInfo.sign,
                    userIcon: this.userInfo.userIcon,
                    userNick: this.userInfo.userNick,
                    zodiac: this.userInfo.zodiac,
                    realName: this.userInfo.realName,
                    babyName: this.userInfo.babyName,
                    babyRelation: this.userInfo.babyRelation,
                    babyBirthday: this.userInfo.babyBirthday,
                    //wxInfo: this.userInfo.wxInfo,
                    // qqInfo: this.userInfo.qqInfo,
                    solar: this.userInfo.solar,
                    provinceId: this.userInfo.provinceId,
                    provinceName: this.userInfo.provinceName,
                    cityId: this.userInfo.cityId,
                    cityName: this.userInfo.cityName,
                },
            });

            if (reply.data.msgCd === this.$msgCode.success) {
                this.isCompleteInformationPopup = false;
                $.message({
                    message: reply.data.msgInfo,
                    type: 'success',
                });
            } else {
                $.message({
                    message: reply.data.msgInfo,
                    type: 'error',
                });
            }
        },

        async confirmBindingPhone() {
            let authcodeReg = /^\d{6}$/;
            if (!authcodeReg.test(this.authCode)) {
                $.message({
                    message: '验证码格式错误',
                    type: 'error',
                });
                return;
            }

            let reply = await axios({
                url: this.$domain + '/urm/bindingUserMobile',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || '',
                },
                data: {
                    smsCode: this.authCode,
                    mobile: this.bindingPhone,
                    userId: this.$store.state.session.userId,
                    smsTempCode: 'SMS0002',
                },
            });
            if (reply.data.msgCd === this.$msgCode.success) {
                $.message({
                    message: reply.data.msgInfo,
                    type: 'success',
                });
                location.reload();
            } else {
                this.isAuthCodeError = true;
            }
        },
        async getPhoneCode() {
            let mobileReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if (!mobileReg.test(this.bindingPhone)) {
                $.message({
                    message: '手机号格式错误',
                    type: 'error',
                });
                return;
            }

            this.isAuthCodeError = false;
            //验证手机号是否已注册
            let isRegiste = await axios({
                url: this.$domain + '/urm/checkMobileRegisteredStatus',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || '',
                },
                data: {
                    mobile: this.bindingPhone,
                },
            });

            if (isRegiste.data.msgCd === this.$msgCode.success) {
                //发送验证码
                let reply = await axios({
                    url: this.$domain + '/common/sendSmsCode',
                    method: 'post',
                    headers: {
                        token: this.$store.state.session.token || '',
                    },
                    data: {
                        mobile: this.bindingPhone,
                        smsTempCode: 'SMS0002',
                    },
                });

                if (reply.data.msgCd === this.$msgCode.success) {
                    $.message({
                        message: reply.data.msgInfo,
                        type: 'success',
                    });
                    this.sendAuthCode = false;
                    this.authTime = 60;
                    var auth_timetimer = setInterval(() => {
                        this.authTime--;
                        if (this.authTime <= 0) {
                            this.sendAuthCode = true;
                            clearInterval(auth_timetimer);
                        }
                    }, 1000);
                } else {
                    $.message({
                        message: isRegiste.data.msgInfo,
                        type: 'error',
                    });
                }
            } else {
                $.message({
                    message: isRegiste.data.msgInfo,
                    type: 'error',
                });

                return;
            }
        },
    },
    async asyncData(context) {
        let res = {};

        // 任务列表
        let TaskLists = await axios({
            url: context.app.$domain + '/mes/mesTaskInfoList',
            method: 'post',
            headers: {
                token: context.store.state.session.token || '',
            },
            data: {
                pageNum: 1,
                pageSize: 10,
                taskType: 2,
            },
        });
        // _ = {
        //     taskId: "1-1",
        //     taskType: 1,
        //     taskDepict: "上传真实头像",
        //     taskIntegral: 10,
        //     integralFlag: 1,
        //     toplimitType: 2,
        //     taskToplimit: 0,
        //     finished: false,
        //     taskIcon:
        //         "https://magee-bucket.oss-cn-shenzhen.aliyuncs.com/mageemedal/mytask6.png"
        // };
        // 签到状态
        let SignState = await axios({
            url: context.app.$domain + '/mes/checkTodaySignState',
            method: 'post',
            headers: {
                token: context.store.state.session.token || '',
            }
        });
        if (TaskLists.data.body && TaskLists.data.body.list && TaskLists.data.body.list.length > 0) {
            TaskLists.data.body.list.some(function (item) {
                if (item.taskId === '1-5') {
                    item.finished = SignState.data.body.sign;
                    return true;
                }
            });
        }
        res.TaskLists = TaskLists.data;
        return res;
    },
    created() {
        // if (!this.$store.state.userData.userId) {
        //     this.$router.push("/");
        // }
    },
};
</script>
<style lang="scss" scoped>
.big-title {
    font-size: 30px;
}
.big-tips {
    font-size: 14px;
    color: #999;
}

.list-area {
    border-top: 1px solid #eee;
    margin-top: 30px;
    .list {
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        .left {
            flex: 0 0 auto;
            display: flex;
            .img {
                height: 20px;
                // width: 20px;
                background-color: #eee;
                flex: 0 0 auto;
                vertical-align: middle;
                margin-right: 6px;
                img {
                    height: 100%;
                }
            }
            .txt {
                flex: 0 0 auto;
                line-height: 20px;
            }
        }
        .right {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            .dou {
                flex: 0 0 auto;
                margin-right: 100px;
                img {
                    height: 20px;
                    margin-right: 6px;
                    vertical-align: middle;
                }
            }
            .status {
                display: flex;
                align-items: center;
                flex: 0 0 auto;
                height: 30px;
                padding: 2px 6px;
                border-radius: 4px;

                color: #fff;
                &.yes {
                    background-color: #00adef;
                }
                &.no {
                    background-color: #fdd000;
                    cursor: pointer;
                }
            }
        }
    }
}

.phone-popup {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    .phone-area {
        position: relative;
        width: 30%;
        // width: 70%;
        // max-width: 700px;
        min-height: 230px;

        .phone-main {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            padding: 20px;
            background-color: white;
            .title {
                height: 40px;
                display: flex;
                justify-content: space-between;
                .logo {
                    display: flex;
                    align-items: center;
                    font-size: 20px;
                    margin-left: 8px;
                    // border-left: 1px solid #fff;
                    color: black;
                    .line {
                        border-right: 1px solid black;
                        margin: 0 10px;
                        height: 30px;
                    }
                    img {
                        height: 100%;
                    }
                }
                .close {
                    flex: 0 0 24px;
                    height: 24px;
                    width: 24px;
                    // background-color: #999;
                    cursor: pointer;
                    img {
                        height: 100%;
                        width: 100%;
                    }
                }
            }

            .button {
                margin-left: 35px;
                align-items: center;
                text-align: center;
                font-size: 24px;
                background-color: #00adef;
                color: black;
                height: 46px;
                width: 80%;
                padding: 4px 10px;
                border-radius: 30px;
            }

            .line {
                display: flex;
                height: 50px;
                border-bottom: 1px solid #eee;
                .label {
                    flex: 0 0 120px;
                    display: flex;
                    align-items: center;
                    padding: 0 10px;
                }
                .value {
                    display: flex;
                    flex: 1 1 100%;
                    input {
                        flex: 1 1 100%;
                        height: 100%;
                        width: 100%;
                    }
                    select {
                        flex: 1 1 100%;
                    }
                }
                .error {
                    color: red;
                    font-size: 12px;
                    width: 200px;
                    padding: 12px;
                }
                .code {
                    color: #00adef;
                    font-size: 12px;
                    width: 164px;
                    padding: 12px;
                }
            }
        }
    }
}

.information-popup {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    .information-area {
        position: relative;
        width: 35%;
        // width: 70%;
        // max-width: 700px;
        min-height: 450px;

        .information-main {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            padding: 20px;
            background-color: white;
            .title {
                height: 40px;
                display: flex;
                justify-content: space-between;
                .logo {
                    display: flex;
                    align-items: center;
                    font-size: 20px;
                    margin-left: 8px;
                    // border-left: 1px solid #fff;
                    color: black;
                    .line {
                        border-right: 1px solid black;
                        margin: 0 10px;
                        height: 30px;
                    }
                    img {
                        height: 100%;
                    }
                }
                .close {
                    flex: 0 0 24px;
                    height: 24px;
                    width: 24px;
                    // background-color: #999;
                    cursor: pointer;
                    img {
                        height: 100%;
                        width: 100%;
                    }
                }
            }

            .button {
                margin-left: 35px;
                align-items: center;
                text-align: center;
                font-size: 24px;
                background-color: #00adef;
                color: black;
                height: 46px;
                width: 80%;
                padding: 4px 10px;
                border-radius: 30px;
            }

            .line {
                display: flex;
                height: 50px;
                border-bottom: 1px solid #eee;
                .label {
                    flex: 0 0 120px;
                    display: flex;
                    align-items: center;
                    padding: 0 10px;
                }
                .value {
                    display: flex;
                    flex: 1 1 100%;
                    input {
                        flex: 1 1 100%;
                        height: 100%;
                        width: 100%;
                    }
                    select {
                        flex: 1 1 100%;
                    }
                }
                .error {
                    color: red;
                    font-size: 12px;
                    width: 200px;
                    padding: 12px;
                }
                .code {
                    color: #00adef;
                    font-size: 12px;
                    width: 164px;
                    padding: 12px;
                }
            }
        }
    }
}
</style>
