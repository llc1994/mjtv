<template>
    <div class="menu">
        <div class="info">
            <div class="head-thumbnail">
                <div
                    class="img"
                    :style="{
                        backgroundImage: 'url(' + (userData.userIcon || '/default-head-thumbnail.png') + ')'
                    }"
                ></div>
            </div>
            <div class="name" @click="openUpdatePersonalInfoPopup">
                {{ userData.babyName }}
                <img :src="userData.levIcon" />
            </div>
            <div class="qiandao enable" @click="openQiandaoPopup" v-if="!isSign"><img src="/user-menu-qiandao.png" />签到领奖</div>
            <div class="qiandao disable" @click="openQiandaoPopup" v-else><img src="/user-menu-qiandao.png" />已签到</div>
            <div class="sign">{{ userData.sign }}</div>
            <div class="money">
                <div class="maiji-bi">
                    <div class="number">
                        {{ userData.androidBal }}
                    </div>
                    <div class="text">麦咭币</div>
                </div>
                <!-- 分隔线 -->
                <div class="separate"></div>
                <div class="maiji-dou">
                    <div class="number">{{ userData.mesBeans }}</div>
                    <div class="text">麦咭豆</div>
                </div>
            </div>
        </div>
        <div class="enter">
            <nuxt-link class="group" to="/user-order">
                <div class="img" style="background-image:url('/user-order.png');"></div>
                <div class="txt">我的订单</div>
            </nuxt-link>
            <nuxt-link class="group" to="/user-coupon">
                <div class="img" style="background-image:url('/user-order2.png');"></div>
                <div class="txt">我的优惠券</div>
            </nuxt-link>
            <div class="group" @click="openWalletPopup">
                <div class="img" style="background-image:url('/user-order3.png');"></div>
                <div class="txt">我的钱包</div>
            </div>
        </div>
        <div class="nav-list">
            <nuxt-link to="/user-vip" class="list user-vip" :class="{ active: menu.isActive === 'user-vip' }">
                <span class="img"></span>会员中心
            </nuxt-link>
            <nuxt-link to="/user-collection" class="list user-collection" :class="{ active: menu.isActive === 'user-collection' }">
                <span class="img"></span>我的收藏
            </nuxt-link>
            <nuxt-link to="/user-watch-history" class="list user-watch-history" :class="{ active: menu.isActive === 'user-watch-history' }">
                <span class="img"></span>观看历史
            </nuxt-link>
            <nuxt-link to="/user-goods-browsed" class="list user-goods-browsed" :class="{ active: menu.isActive === 'user-goods-browsed' }">
                <span class="img"></span>我浏览过的商品
            </nuxt-link>
            <nuxt-link to="/user-join" class="list user-join" :class="{ active: menu.isActive === 'user-join' }">
                <span class="img"></span>我的参与
            </nuxt-link>
            <nuxt-link to="/user-mengwa-show" class="list user-mengwa-show" :class="{ active: menu.isActive === 'user-mengwa-show' }">
                <span class="img"></span>我的萌娃秀
            </nuxt-link>
            <nuxt-link to="/user-course" class="list user-course" :class="{ active: menu.isActive === 'user-course' }">
                <span class="img"></span>我的课程
            </nuxt-link>
            <nuxt-link to="/user-task" class="list user-task" :class="{ active: menu.isActive === 'user-task' }">
                <span class="img"></span>任务中心
            </nuxt-link>
            <nuxt-link to="/user-message" class="list user-message" :class="{ active: menu.isActive === 'user-message' }">
                <span class="img"></span>消息中心
            </nuxt-link>
            <nuxt-link to="/user-shop-focus" class="list user-shop-focus" :class="{ active: menu.isActive === 'user-shop-focus' }">
                <span class="img"></span>店铺关注
            </nuxt-link>
            <nuxt-link to="/user-address" class="list user-address" :class="{ active: menu.isActive === 'user-address' }">
                <span class="img"></span>收货地址
            </nuxt-link>
            <!-- <nuxt-link target="_blank"
                to="/user-setup"
                class="list user-setup"
                :class="{ active: menu.isActive === 'user-setup' }"
                @click="exitLogin"
                ><span class="img"></span>设置</nuxt-link
            > -->
        </div>

        <!-- 签到面板 -->
        <div class="qiandao-popup" v-show="isQianDaoPopupShow">
            <div class="qiandao-area">
                <img class="qiandao-back" src="/qiandao-popup-background-image.png" />
                <div class="qiandao-main">
                    <div class="title">
                        <div class="logo">
                            <img src="/maiji-logo.png" />
                            <div class="line"></div>
                            签到领奖
                        </div>

                        <div class="close" @click="closeQiandaoPopup">
                            <img src="/qiandao-popup-close.png" />
                        </div>
                    </div>
                    <div class="qiandao-content">
                        <div class="left">
                            <!-- 周一 -->
                            <div
                                class="box"
                                :class="{
                                    active: signList[0].isSign == 0 && signList[0].type !== 'future'
                                }"
                                v-if="signList[0]"
                            >
                                <div class="title">周一</div>
                                <div class="number">
                                    {{ signList[0].rewardNum }}
                                </div>
                                <div class="dou"><img src="/dou.png" /></div>
                                <div class="status">
                                    <!-- 补签 -->
                                    <div class="button past" v-if="signList[0].isSign == 0 && signList[0].day === 'past'">
                                        补签
                                    </div>
                                    <!-- 未签到 -->
                                    <div class="button today" @click="UserSign" v-if="signList[0].isSign == 0 && signList[0].day === 'today'">
                                        未签到
                                    </div>
                                    <!-- 已签到 -->
                                    <div class="button" v-if="signList[0].isSign == 1">
                                        已签到
                                    </div>
                                    <!-- 待签到 -->
                                    <div class="button" v-if="signList[0].isSign == 0 && signList[0].day === 'future'">
                                        待签到
                                    </div>
                                </div>
                            </div>

                            <!-- 周二 -->
                            <div
                                class="box"
                                :class="{
                                    active: signList[1].isSign == 0 && signList[1].type !== 'future'
                                }"
                                v-if="signList[1]"
                            >
                                <div class="title">周二</div>
                                <div class="number">
                                    {{ signList[1].rewardNum }}
                                </div>
                                <div class="dou"><img src="/dou.png" /></div>
                                <div class="status">
                                    <!-- 补签 -->
                                    <div class="button past" v-if="signList[1].isSign == 0 && signList[1].day === 'past'">
                                        补签
                                    </div>
                                    <!-- 未签到 -->
                                    <div class="button today" @click="UserSign" v-if="signList[1].isSign == 0 && signList[1].day === 'today'">
                                        未签到
                                    </div>
                                    <!-- 已签到 -->
                                    <div class="button" v-if="signList[1].isSign == 1">
                                        已签到
                                    </div>
                                    <!-- 待签到 -->
                                    <div class="button" v-if="signList[1].isSign == 0 && signList[1].day === 'future'">
                                        待签到
                                    </div>
                                </div>
                            </div>

                            <!-- 周三 -->
                            <div
                                class="box"
                                :class="{
                                    active: signList[2].isSign == 0 && signList[2].type !== 'future'
                                }"
                                v-if="signList[2]"
                            >
                                <div class="title">周三</div>
                                <div class="number">
                                    {{ signList[2].rewardNum }}
                                </div>
                                <div class="dou"><img src="/dou.png" /></div>
                                <div class="status">
                                    <!-- 补签 -->
                                    <div class="button past" v-if="signList[2].isSign == 0 && signList[2].day === 'past'">
                                        补签
                                    </div>
                                    <!-- 未签到 -->
                                    <div class="button today" @click="UserSign" v-if="signList[2].isSign == 0 && signList[2].day === 'today'">
                                        未签到
                                    </div>
                                    <!-- 已签到 -->
                                    <div class="button" v-if="signList[2].isSign == 1">
                                        已签到
                                    </div>
                                    <!-- 待签到 -->
                                    <div class="button" v-if="signList[2].isSign == 0 && signList[2].day === 'future'">
                                        待签到
                                    </div>
                                </div>
                            </div>

                            <!-- 周四 -->
                            <div
                                class="box"
                                :class="{
                                    active: signList[3].isSign == 0 && signList[3].type !== 'future'
                                }"
                                v-if="signList[3]"
                            >
                                <div class="title">周四</div>
                                <div class="number">
                                    {{ signList[3].rewardNum }}
                                </div>
                                <div class="dou"><img src="/dou.png" /></div>
                                <div class="status">
                                    <!-- 补签 -->
                                    <div class="button past" v-if="signList[3].isSign == 0 && signList[3].day === 'past'">
                                        补签
                                    </div>
                                    <!-- 未签到 -->
                                    <div class="button today" @click="UserSign" v-if="signList[3].isSign == 0 && signList[3].day === 'today'">
                                        未签到
                                    </div>
                                    <!-- 已签到 -->
                                    <div class="button" v-if="signList[3].isSign == 1">
                                        已签到
                                    </div>
                                    <!-- 待签到 -->
                                    <div class="button" v-if="signList[3].isSign == 0 && signList[3].day === 'future'">
                                        待签到
                                    </div>
                                </div>
                            </div>

                            <!-- 周五 -->
                            <div
                                class="box"
                                :class="{
                                    active: signList[4].isSign == 0 && signList[4].type !== 'future'
                                }"
                                v-if="signList[4]"
                            >
                                <div class="title">周五</div>
                                <div class="number">
                                    {{ signList[4].rewardNum }}
                                </div>
                                <div class="dou"><img src="/dou.png" /></div>
                                <div class="status">
                                    <!-- 补签 -->
                                    <div class="button past" v-if="signList[4].isSign == 0 && signList[4].day === 'past'">
                                        补签
                                    </div>
                                    <!-- 未签到 -->
                                    <div class="button today" @click="UserSign" v-if="signList[4].isSign == 0 && signList[4].day === 'today'">
                                        未签到
                                    </div>
                                    <!-- 已签到 -->
                                    <div class="button" v-if="signList[4].isSign == 1">
                                        已签到
                                    </div>
                                    <!-- 待签到 -->
                                    <div class="button" v-if="signList[4].isSign == 0 && signList[4].day === 'future'">
                                        待签到
                                    </div>
                                </div>
                            </div>

                            <!-- 周六 -->
                            <div
                                class="box"
                                :class="{
                                    active: signList[5].isSign == 0 && signList[5].type !== 'future'
                                }"
                                v-if="signList[5]"
                            >
                                <div class="title">周六</div>
                                <div class="number">
                                    {{ signList[5].rewardNum }}
                                </div>
                                <div class="dou"><img src="/dou.png" /></div>
                                <div class="status">
                                    <!-- 补签 -->
                                    <div class="button past" v-if="signList[5].isSign == 0 && signList[5].day === 'past'">
                                        补签
                                    </div>
                                    <!-- 未签到 -->
                                    <div class="button today" @click="UserSign" v-if="signList[5].isSign == 0 && signList[5].day === 'today'">
                                        未签到
                                    </div>
                                    <!-- 已签到 -->
                                    <div class="button" v-if="signList[5].isSign == 1">
                                        已签到
                                    </div>
                                    <!-- 待签到 -->
                                    <div class="button" v-if="signList[5].isSign == 0 && signList[5].day === 'future'">
                                        待签到
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="right">
                            <div
                                class="box"
                                :class="{
                                    active: signList[5].isSign == 0 && signList[5].type !== 'future'
                                }"
                                v-if="signList[6]"
                            >
                                <div class="title">周日</div>
                                <div class="number">
                                    {{ signList[6].rewardNum }}
                                </div>
                                <div class="dou"><img src="/dou.png" /></div>
                                <div class="status">
                                    <!-- 补签 -->
                                    <div class="button past" v-if="signList[6].isSign == 0 && signList[6].day === 'past'">
                                        补签
                                    </div>
                                    <!-- 未签到 -->
                                    <div class="button today" @click="UserSign" v-if="signList[6].isSign == 0 && signList[6].day === 'today'">
                                        未签到
                                    </div>
                                    <!-- 已签到 -->
                                    <div class="button" v-if="signList[6].isSign == 1">
                                        已签到
                                    </div>
                                    <!-- 待签到 -->
                                    <div class="button" v-if="signList[6].isSign == 0 && signList[6].day === 'future'">
                                        待签到
                                    </div>
                                </div>
                            </div>
                            <div class="img"></div>
                        </div>
                    </div>
                    <div class="qiandao-footer">
                        <div class="rule-a">
                            说明：1.每次补签，消耗麦咭豆X15
                        </div>
                        <div class="rule-b">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.连续一周签到，额外奖励麦咭豆X30
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 钱包面板 -->
        <div class="wallet-popup" v-show="isWalletPopupShow">
            <div class="wallet-area">
                <!-- 标题 -->
                <div class="title">
                    <div class="wallet-info">
                        <div class="head-image">
                            <div class="img">
                                <img v-if="UserInfo.userIcon" :src="UserInfo.userIcon" />
                            </div>

                            <!-- <div class="text">切换账号</div> -->
                        </div>

                        <div class="head-info">
                            <div class="name">{{ loginData.babyName }}</div>
                            <div class="sign">{{ loginData.sign }}</div>
                            <div class="bi">
                                麦咭币：<span class="number">{{ userData.appleBal + userData.androidBal }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="close" @click="closeWalletPopup">
                        <img src="/layer-close.png" />
                    </div>
                </div>
                <!-- 充值提示 -->
                <div class="recharge-tips-text">
                    请选择充值金额
                </div>
                <!-- 充值选择 -->
                <div class="recharge-area">
                    <div class="recharge-box" :class="{ active: index === currentRechargeIndex }" v-for="(item, index) in RechargeLists.body.list" :key="index" @click="chooseRechargeItem(item, index)">
                        <div class="recharge-main">
                            <div class="coin">
                                <img src="/order_coin.png" />
                            </div>
                            <div class="bi">{{ item.rechargeAmt }}麦咭币</div>
                            <div class="plus-price" v-show="item.giveMjb !== 0">+{{ item.giveMjb }}麦咭币</div>
                            <div class="plus-price" v-show="item.giveMjb === 0"></div>
                            <div class="price">￥{{ item.rechargeAmt }}.00</div>
                        </div>
                    </div>
                </div>
                <!-- 二维码区域 -->
                <div class="switch-paytype">
                    <div class="tab weixin" :class="{ active: rechargeType === 'WECHATPAY' }" @click="changeRechargeType('WECHATPAY')">微信支付</div>
                    <div class="space"></div>
                    <div class="tab alipay" :class="{ active: rechargeType === 'ALIPAY' }" @click="changeRechargeType('ALIPAY')">支付宝支付</div>
                </div>
                <div class="qrcode-area">
                    <div class="img">
                        <div id="id-qrcode"></div>
                    </div>
                    <div class="text-area">
                        <div class="saoma">扫码支付</div>
                        <div class="price">￥{{ currentRechargeItem.rechargeAmt }}.00</div>
                        <div class="account">充值账号：<span class="strong">麦咭麦咭</span></div>
                    </div>
                </div>
                <!-- 底部提示 -->
                <div class="tips">
                    注意：1、安卓平台内充值的麦咭币不可用于苹果设备。2、麦咭币充值成功后无法退款，不可提现 。3、查看常见问题
                </div>
            </div>
        </div>

        <!-- 修改个人信息面板 -->
        <div class="layer" v-show="isUpdatePersonalInfoShow === true">
            <div class="form-add-address">
                <div class="title">
                    <div class="image"></div>
                    <div class="text">修改个人信息</div>
                    <div class="close" @click="closeUpdatePersonalInfoPanel">
                        <img src="/close.png" />
                    </div>
                </div>
                <div class="line">
                    <div class="label">昵称</div>
                    <div class="value">
                        <input type="text" placeholder="请输入昵称" v-model="detail.userNick" />
                    </div>
                </div>
                <div class="line">
                    <div class="label">姓名</div>
                    <div class="value">
                        <input type="text" placeholder="请输入姓名" v-model="detail.realName" />
                    </div>
                </div>
                <div class="line">
                    <div class="label">手机号</div>
                    <div class="value">
                        <input type="text" placeholder="请输入手机号" v-model="detail.phone" />
                    </div>
                </div>
                <div class="line">
                    <div class="label">所在地</div>
                    <div class="value">
                        <select id="province" style="margin-right:20px;" @change="changeProvince()" v-model="detail.provinceId">
                            <option v-for="(item, index) in provinceList" :key="index" :value="item.provinceid">{{ item.province }}</option>
                        </select>
                        <select id="city" v-model="detail.cityName" @change="changeCity()">
                            <option v-for="(item, index) in cityList" :key="index" :value="item.city">
                                {{ item.city }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="line">
                    <div class="label">个性签名</div>
                    <div class="value">
                        <input type="text" placeholder="请输入个性签名" v-model="detail.sign" />
                    </div>
                </div>
                <div class="line">
                    <div class="label">宝宝姓名</div>
                    <div class="value">
                        <input type="text" placeholder="请输入宝宝姓名" v-model="detail.babyName" />
                    </div>
                </div>
                <div class="line">
                    <div class="label">宝宝性别</div>
                    <div class="value" style="display:flex;align-items:center;">
                        <select v-model="detail.sex">
                            <option class="">男</option>
                            <option class="">女</option>
                        </select>
                    </div>
                </div>
                <div class="line">
                    <div class="label">宝宝生肖</div>
                    <div class="value" style="display:flex;align-items:center;">
                        <select v-model="detail.zodiac">
                            <option v-for="(item, index) in shengxiaoLists" :key="index" :value="item">{{ item }}</option>
                        </select>
                    </div>
                </div>
                <div class="line">
                    <div class="label">宝宝生日</div>
                    <div class="value" style="display:flex;align-items:center;justify-content:space-between;">
                        <input type="text" id="test1" ref="babyBirthday" />
                        <!-- <select id="year">
                            <option v-for="(item, index) in yearLists" :key="index">{{ item }}</option>
                        </select>
                        <select id="month">
                            <option v-for="(item, index) in monthLists" :key="index">{{ item }}</option>
                        </select>
                        <select id="day">
                            <option v-for="(item, index) in dayLists" :key="index">{{ item }}</option>
                        </select> -->
                    </div>
                </div>
                <div class="line">
                    <div class="label">我与宝宝的关系</div>
                    <div class="value" style="display:flex;align-items:center;">
                        <select id="relationship" v-model="detail.babyRelation">
                            <option value="6">父母</option>
                            <option value="5">其他</option>
                        </select>
                    </div>
                </div>
                <div class="button-group">
                    <div class="button" @click="confirmUpdatePersonalInfomation">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    props: ['menu'],
    data() {
        return {
            // 麦咭豆
            maijiDou: {},
            // 麦咭币
            maijiBi: {},
            // 用户信息
            UserInfo: {},
            // 萌豆充值
            signList: [],
            // 充值地址
            rechargeUrl: {},
            // 充值类型
            rechargeType: 'WECHATPAY',
            // 充值列表
            RechargeLists: {
                body: {
                    list: []
                }
            },
            // 信息详情
            detail: {
                accessKeyId: '',
                accessKeySecret: '',
                akExpiration: '',
                babyBirthday: '',
                babyName: '',
                babyRealName: '',
                babyRelation: null,
                cityId: '',
                cityName: '',
                clientType: 0,
                createTime: '',
                magId: '',
                phone: '',
                provinceId: '',
                provinceName: '',
                qqInfo: null,
                realName: '',
                securityToken: '',
                sex: null,
                sign: '',
                solar: '',
                status: 0,
                token: '',
                userIcon: '',
                userId: '',
                userName: '',
                userNick: '',
                wxInfo: null,
                zodiac: ''
            },
            ddd: '',
            // 生肖
            shengxiaoLists: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
            // 关系列表
            relationshipLists: ['父母', '其他'],
            // 省列表
            provinceList: [],
            // 省索引
            provinceIndex: 0,
            // 市索引
            cityIndex: 0,
            // 市列表
            cityList: [],
            // 是否签到
            isSign: false,
            // 签到结果状态
            signResult: false,
            // 签到弹出框
            isQianDaoPopupShow: false,
            // 钱包弹出框
            isWalletPopupShow: false,
            // 用户信息弹框
            isUpdatePersonalInfoShow: false,
            // 当前充值类型
            currentRechargeItem: {},
            // 当前充值索引
            currentRechargeIndex: 0
        };
    },
    created() {},
    mounted() {
        this.init();
    },
    computed: {
        loginData() {
            return this.$store.state.loginData;
        },
        userData() {
            return this.$store.state.userData;
        },
        session() {
            return this.$store.state.session;
        },
        // 年份
        yearLists() {
            var arr = [];
            for (var i = 1990; i <= 2019; i++) {
                arr.push(i);
            }
            return arr;
        },
        // 月份
        monthLists() {
            var arr = [];
            for (var i = 1; i <= 12; i++) {
                arr.push(i);
            }
            return arr;
        },
        // 日期
        dayLists() {
            var arr = [];
            for (var i = 1; i <= 31; i++) {
                arr.push(i);
            }
            return arr;
        },
        // 出生日期，原始数据
        babyBirthdayOld() {
            return this.detail.babyBirthday.split('-');
        }
    },
    methods: {
        async getSignRechargeListRequest() {
            let that = this;

            // 充值项
            let RechargeLists = await axios({
                url: this.$domain + '/acm/getRechargeSettingsList',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                },
                data: {
                    settingsType: 'ANDROID'
                }
            });

            RechargeLists.data.body.list.forEach(function(item, index) {
                if (index === 0) {
                    that.currentRechargeItem = item;
                }
            });

            this.RechargeLists = RechargeLists.data;

            // 萌豆签到
            let MengDouLists = await axios({
                url: this.$domain + '/mes/getUserSignList',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                }
            });

            // 日期对象
            let t = new Date();
            // 星期几
            let day = t.getDay();
            if (day === 0) {
                day = 7;
            }
            MengDouLists.data.body.signList.forEach(function(item, index) {
                if (item.weekNo === day) {
                    // 今天
                    item.day = 'today';
                }
                if (item.weekNo < day) {
                    // 过去
                    item.day = 'past';
                }
                if (item.weekNo > day) {
                    // 将来
                    item.day = 'future';
                }
            });
            // signList = [
            //     {
            //         isSign: "0",
            //         rewardIcon:
            //             "https://cdn.duitang.com/uploads/item/201508/30/20150830105732_nZCLV.jpeg",
            //         rewardId: 10000001,
            //         rewardName: "萌豆奖励",
            //         rewardNum: 20,
            //         weekNo: 1
            //     }
            // ];
            this.signList = MengDouLists.data.body.signList;
        },
        async init() {
            // 签到状态
            let SignState = await axios({
                url: this.$domain + '/mes/checkTodaySignState',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                }
            });
            this.isSign = this.signResult || SignState.data.body.sign;

            this.getSignRechargeListRequest();
        },
        // 确认修改个人信息
        async confirmUpdatePersonalInfomation() {
            let that = this;
            let reply = await this.$completeUserInfo({
                babyBirthday: this.detail.babyBirthday,
                babyName: this.detail.babyName,
                babyRealName: this.detail.babyRealName,
                babyRelation: this.detail.babyRelation,
                cityId: this.detail.cityId,
                cityName: this.detail.cityName,
                provinceId: this.detail.provinceId,
                provinceName: this.detail.provinceName,
                realName: this.detail.realName,
                sex: this.detail.sex,
                sign: this.detail.sign,
                solar: this.detail.solar,
                userIcon: this.detail.userIcon,
                userNick: this.detail.userNick,
                zodiac: this.detail.zodiac
            });
            if (reply.msgCd === that.$msgCode.success) {
                this.isUpdatePersonalInfoShow = false;
                $.message({
                    message: reply.msgInfo,
                    type: 'success'
                });
            } else {
                $.message({
                    message: reply.msgInfo,
                    type: 'error'
                });
            }
        },
        // 打开更新用户信息的弹框
        async openUpdatePersonalInfoPopup() {
            let that = this;
            this.isUpdatePersonalInfoShow = true;
            this.detail = await this.$getUserInfo();
            this.provinceList = await this.$getProvinces();
            this.cityList = await this.$getCities({
                provinceid: this.detail.provinceId
            });
            this.$nextTick(function() {
                layui.laydate.render({
                    elem: that.$refs.babyBirthday,
                    value: that.detail.babyBirthday,
                    done: function(value, date, endDate) {
                        that.detail.babyBirthday = value;
                    }
                });
            });
        },
        // 选择省
        async changeProvince() {
            // this.detail.provinceId = this.detail.provinceId;
            let hash = {};
            this.provinceList.forEach(function(item) {
                hash[item.provinceid] = item;
            });

            this.detail.provinceName = hash[this.detail.provinceId].province;
            this.cityList = await this.$getCities({
                provinceid: this.detail.provinceId
            });
            if (this.cityList.length > 0) {
                this.detail.cityId = this.cityList[0].cityid;
                this.detail.cityName = this.cityList[0].city;
            }
        },
        // 选择市
        async changeCity() {
            this.detail.cityId = this.detail.cityId;
            let hash = {};
            this.cityList.forEach(function(item) {
                hash[item.cityId] = item;
            });
            this.detail.cityName = hash[this.detail.cityId];
        },
        // 关闭个人信息修改弹框
        closeUpdatePersonalInfoPanel() {
            this.isUpdatePersonalInfoShow = false;
        },
        // 切换充值类型
        changeRechargeType(type) {
            this.rechargeType = type;
            this.createQRcode(type);
        },
        // 签到
        async UserSign() {
            let reply = await axios({
                url: this.$domain + '/mes/userSign',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                }
            });
            if (reply.data.msgCd === this.$msgCode.success) {
                this.isSign = true;
                this.signResult = true;
                // 发送签到成功的广播
                this.$emit('signSuccessEmit');
                this.isAddressPanelShow = false;
                // location.reload();
                $.message({
                    message: reply.data.msgInfo,
                    type: 'success'
                });
                // location.reload();
                this.getSignRechargeListRequest();
            } else {
                $.message({
                    message: reply.data.msgInfo,
                    type: 'error'
                });
            }
        },

        // 选择充值项
        async chooseRechargeItem(item, index) {
            $('#id-qrcode').empty();
            this.currentRechargeItem = item;
            this.currentRechargeIndex = index;
            let reply = await axios({
                url: this.$domain + '/acm/recharge',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                },
                data: {
                    payType: 'PC',
                    settingsType: 'ANDROID',
                    settingsId: item.settingsId
                }
            });
            if (reply.data.body) {
                reply.data.body.orderInfo = JSON.parse(reply.data.body.orderInfo);
                this.rechargeUrl = reply.data.body;
                this.createQRcode(this.rechargeType);
            }
        },
        createQRcode(type) {
            $('#id-qrcode').empty();
            var rechargeURL = this.rechargeUrl.orderInfo[type];
            if (rechargeURL) {
                var qrcode = new QRCode(document.getElementById('id-qrcode'), {
                    text: this.rechargeUrl.orderInfo[type],
                    width: 100,
                    height: 100,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                });
            }
        },
        // 关闭签到弹框
        closeQiandaoPopup() {
            this.isQianDaoPopupShow = false;
        },
        // 打开签到弹框
        openQiandaoPopup() {
            this.isQianDaoPopupShow = true;
        },
        // 关闭钱包面板
        closeWalletPopup() {
            this.isWalletPopupShow = false;
        },
        // 打开钱包面板
        openWalletPopup() {
            this.chooseRechargeItem(this.currentRechargeItem, 0);
            this.isWalletPopupShow = true;
        }
    }
};
</script>
<style lang="scss">
#id-qrcode {
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
<style lang="scss" scoped>
// 切换支付方式
.switch-paytype {
    height: 40px;
    display: flex;
    justify-content: center;
    margin-top: 50px;
    .space {
        flex: 0 0 20px;
    }
    .tab {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 auto;
        padding: 0 20px;
        border: 1px solid #ddd;
        cursor: pointer;
        &.active {
            border: 1px solid #01acf0;
        }
    }
}

// 钱包弹框
.wallet-popup {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 99999999;
    display: flex;
    // justify-content: center;
    // align-items: center;
    overflow-y: auto;
    padding: 70px 0;
    .wallet-area {
        // position: relative;
        // min-height: 300px;
        width: 70%;
        margin: 0 auto;
        height: 80%;
        min-height: 760px;
        background-color: #fff;
        .title {
            position: relative;
            // height: 150px;
            height: 20%;
            background-color: #e7f6fc;

            .wallet-info {
                display: flex;
                position: absolute;
                top: 20px;
                left: 20px;
                bottom: 20px;
                max-height: 110px;

                .head-image {
                    display: flex;
                    flex-direction: column;
                    max-height: 110px;
                    .img {
                        flex: 0 0 80px;
                        img {
                            height: 80px;
                        }
                    }

                    .text {
                        text-align: center;
                        flex: 0 0 30px;
                    }
                }
                .head-info {
                    padding: 0 20px;
                    .name {
                        height: 40px;
                        line-height: 40px;
                        font-size: 26px;
                        font-weight: bold;
                        cursor: pointer;
                    }
                    .sign {
                        height: 30px;
                        line-height: 30px;
                        font-size: 14px;
                        color: #666;
                    }
                    .bi {
                        height: 40px;
                        line-height: 40px;
                        font-size: 14px;
                        .number {
                            font-size: 26px;
                            color: #1fb3f0;
                            font-weight: bold;
                        }
                    }
                }
            }
            .close {
                position: absolute;
                top: 10px;
                right: 10px;
                height: 30px;
                width: 30px;
                cursor: pointer;
                img {
                    height: 100%;
                    width: 100%;
                }
            }
        }
        .recharge-tips-text {
            margin: 3% 10px;
            font-size: 20px;
            color: #999;
            padding: 0 24px;
        }
        .recharge-area {
            display: flex;
            flex-wrap: nowrap;
            padding: 0 20px;
            .recharge-box {
                flex: 0 0 16.66%;
                height: 200px;
                // min-width: 120px;
                padding: 0 10px;
                cursor: pointer;

                &.active {
                    .recharge-main {
                        border: 2px solid #1fb3f0;
                    }
                }
                .recharge-main {
                    height: 100%;
                    width: 100%;
                    background-color: #f8f8f8;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .coin {
                        height: 40px;
                        width: 40px;
                        margin-bottom: 20px;
                    }
                    .bi {
                        height: 40px;
                        line-height: 40px;
                        font-size: 22px;
                        font-weight: bold;
                    }
                    .plus-price {
                        height: 30px;
                        line-height: 30px;
                        font-size: 18px;
                    }
                    .price {
                        height: 30px;
                        line-height: 30px;
                        font-size: 20px;
                        color: #999;
                    }
                }
            }
        }
    }
    .qrcode-area {
        height: 130px;
        display: flex;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 10px;
        .img {
            height: 100%;
            width: 130px;
            background-color: #eee;
            img {
                height: 100%;
                width: 100%;
            }
        }
        .text-area {
            height: 100%;
            padding-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .saoma {
                font-size: 20px;
                flex: 0 0 auto;
            }
            .price {
                font-size: 36px;
                color: #f8cb00;
                flex: 0 0 auto;
            }
            .account {
                font-size: 16px;
                flex: 0 0 auto;
                .strong {
                    font-size: 20px;
                }
            }
        }
    }
    .tips {
        text-align: center;
        padding: 0 10px;
        margin-bottom: 20px;
        color: #999;
    }
}

// 签到弹框
.qiandao-popup {
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
    .qiandao-area {
        position: relative;
        // width: 70%;
        // max-width: 700px;
        min-height: 300px;
        // background-color: #fff;

        .qiandao-main {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            padding: 20px;
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
                    color: #fff;
                    .line {
                        border-right: 1px solid #fff;
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
            .qiandao-content {
                position: absolute;
                top: 90px;
                bottom: 130px;
                left: 50px;
                right: 30px;
                display: flex;
                .left {
                    flex: 1 1 100%;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    .box {
                        flex: 0 0 30%;
                        height: 46%;
                    }
                }
                .right {
                    flex: 0 0 260px;
                    .box {
                        width: 90%;
                        margin-left: 5%;
                        height: 60%;
                    }
                }
                .box {
                    box-shadow: 6px 6px #5ebfea;
                    border-radius: 4px;
                    &.active {
                        box-shadow: 6px 6px #fdd005;
                        .title {
                            background-color: #fdd005;
                        }
                    }
                    & > div {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .title {
                        height: 20%;
                        font-size: 24px;
                        background-color: #5ebfea;
                        color: #fff;
                    }
                    .number {
                        height: 20%;
                        background-color: #fff;
                        font-size: 24px;
                        color: #fdd005;
                    }
                    .dou {
                        height: 40%;
                        background-color: #fff;
                        img {
                            height: 50%;
                        }
                    }
                    .status {
                        height: 20%;
                        background-color: #fff;
                        .button {
                            color: #999;
                            font-size: 16px;
                            &.today {
                                background-color: #ff4200;
                                color: #fff;
                                padding: 3px 8px;
                                border-radius: 14px;
                                cursor: pointer;
                            }
                            &.past {
                                background-color: #fdd005;
                                color: #fff;
                                padding: 3px 8px;
                                border-radius: 14px;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
            .qiandao-footer {
                position: absolute;
                bottom: 20px;
                left: 50px;
                right: 30px;
                color: #999;
            }
        }
    }
}

// 更新信息弹框
.form-add-address {
    width: 100%;
    max-width: 500px;
    background-color: #fff;
    padding: 0 10px;
    .title {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid #00adef;
        .text {
            flex: 0 0 auto;
            font-size: 20px;
            font-weight: bold;
        }
        .close {
            flex: 0 0 30px;
            height: 30px;
            cursor: pointer;
            img {
                height: 100%;
                width: 100%;
            }
        }
    }
    .line {
        display: flex;
        height: 50px;
        border-bottom: 1px solid #eee;
        .label {
            flex: 0 0 140px;
            display: flex;
            align-items: center;
            padding: 0 10px;
        }
        .value {
            display: flex;
            align-items: center;
            flex: 1 1 100%;
            font-size: 14px;
            input {
                flex: 1 1 100%;
                height: 30px;
                width: 100%;
                font-size: 14px;
                background-color: #f7f7f7;
                border: 1px solid #eee;
                padding: 0 4px;
            }
            select {
                flex: 1 1 100%;
            }
        }

        select {
            flex: 0 0 30%;
            min-width: 30%;
            max-width: 30%;
            width: 30%;
            height: 26px;
            background-color: #f7f7f7;
            border: 1px solid #eee;
        }
    }
    .button-group {
        height: 60px;
        padding: 10px;
        display: flex;
        justify-content: center;
        .button {
            display: flex;
            align-items: center;
            height: 100%;
            flex: 0 0 auto;
            padding: 0 20px;
            border-radius: 10px;
            background-color: #00adef;
            color: #fff;
            cursor: pointer;
        }
    }
}
</style>
