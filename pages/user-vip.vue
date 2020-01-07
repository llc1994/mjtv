<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <div class="user-center">
            <div class="wrap">
                <!-- 用户左侧面板 -->
                <UserMenu :menu="menu" />

                <!-- 主内容区 -->
                <div class="main">
                    <div class="user-vip">
                        <div class="big-title">我的段位</div>
                        <div class="line-wrap">
                            <!-- 经验圆圈 -->
                            <div class="expire-circle">
                                <img src="/user-vip-huan-no-text.png" />
                                <div class="info">
                                    <div
                                        class="image background-contain"
                                        :style="{
                                            backgroundImage: 'url(' + userData.levIcon + ')'
                                        }"
                                    ></div>
                                    <div class="number">{{ userData.mesExp }}</div>
                                    <div class="text">经验值</div>
                                </div>
                            </div>
                        </div>
                        <div class="line-wrap">
                            <!-- 等级 -->
                            <div class="level-badge">
                                {{ userData.mesLevName }}
                            </div>
                        </div>
                        <div class="line-wrap">
                            <!-- 还差经验 -->
                            <div class="expire-less">
                                距离<span>{{ userData.nextMesLevName }}</span
                                >还差<span>{{ userData.expDiffer }}</span
                                >经验
                            </div>
                        </div>
                        <div class="line-wrap">
                            <!-- 经验规则 -->
                            <div class="expire-rule" @click="showRule"><img src="/user-vip-rule.png" />会员规则</div>
                        </div>

                        <!-- 成就徽章 -->
                        <div class="big-title">我的成就</div>
                        <div class="row badge-achievement">
                            <div class="badge-box" v-for="(item, index) in MineEvent.body.mesFeatsList" :key="index">
                                <div class="badge-image badge-1">
                                    <img v-if="item.isHave === true" :src="item.featsIcon" />
                                    <img v-if="item.isHave === false" :src="item.featsGrayIcon" />
                                </div>
                                <div class="badge-text">
                                    {{ item.featsName }}
                                </div>
                            </div>
                        </div>
                        <div class="big-title">我的专属权益</div>

                        <!-- 专属徽章 -->
                        <div class="row badge-equity">
                            <div class="badge-box">
                                <div class="badge-image">
                                    <img src="/user-equity/1.png" />
                                </div>
                                <div class="badge-text">充值奖励</div>
                            </div>

                            <div class="badge-box">
                                <div class="badge-image">
                                    <img src="/user-equity/2.png" />
                                </div>
                                <div class="badge-text">秀圈达人</div>
                            </div>

                            <div class="badge-box">
                                <div class="badge-image">
                                    <img src="/user-equity/3.png" />
                                </div>
                                <div class="badge-text">互动之星</div>
                            </div>

                            <div class="badge-box">
                                <div class="badge-image">
                                    <img src="/user-equity/4.png" />
                                </div>
                                <div class="badge-text">优惠大礼</div>
                            </div>

                            <div class="badge-box">
                                <div class="badge-image">
                                    <img src="/user-equity/5.png" />
                                </div>
                                <div class="badge-text">新人礼包</div>
                            </div>

                            <div class="badge-box">
                                <div class="badge-image">
                                    <img src="/user-equity/6.png" />
                                </div>
                                <div class="badge-text">果园特权</div>
                            </div>

                            <div class="badge-box">
                                <div class="badge-image">
                                    <img src="/user-equity/7.png" />
                                </div>
                                <div class="badge-text">购物优惠</div>
                            </div>

                            <div class="badge-box">
                                <div class="badge-image">
                                    <img src="/user-equity/8.png" />
                                </div>
                                <div class="badge-text">生日礼包</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 用户规则 -->
        <div class="user-rule-mask" v-if="isShowRule === true">
            <div class="user-rule-box">
                <div class="head-info" :style="{backgroundImage:'url(/user-rule-background-image.png)'}">
                    <div class="thumbnail">
                        <img :src="userData.userIcon || '/default-head-thumbnail.png'">
                    </div>
                    <div class="text">
                        <div class="name">
                            {{ userData.babyName }}
                            <img :src="userData.levIcon" />
                        </div>
                        <div class="sign">{{ userData.sign }}</div>
                        <div class="bi">麦咭币：<span class="number">{{ userData.androidBal }}</span></div>
                    </div>
                    <div class="close">
                        <img src="/layer-close.png" @click="closeRule">
                    </div>
                </div>
                <!-- 主要信息 -->
                <div class="body-info">
                    <!-- 等级信息 -->
                    <div class="level-info">
                        <div class="box">
                            <div class="img"><img src="/vip-level/vip-level-1.png"></div>
                            <div class="txt">青铜会员</div>
                        </div>
                        <div class="box">
                            <div class="img"><img src="/vip-level/vip-level-2.png"></div>
                            <div class="txt">白银会员</div>
                        </div>
                        <div class="box">
                            <div class="img"><img src="/vip-level/vip-level-3.png"></div>
                            <div class="txt">黄金会员</div>
                        </div>
                        <div class="box">
                            <div class="img"><img src="/vip-level/vip-level-4.png"></div>
                            <div class="txt">钻石会员</div>
                        </div>
                    </div>
                    <!-- 规则表格 -->
                    <div class="rule-table-1">
                        <div class="row th line">
                            <div class="col col-pc-2 col-pad-2 col-mobile-2">特权对比</div>
                            <div class="col col-pc-2 col-pad-2 col-mobile-2">新人</div>
                            <div class="col col-pc-2 col-pad-2 col-mobile-2">青铜</div>
                            <div class="col col-pc-2 col-pad-2 col-mobile-2">白银</div>
                            <div class="col col-pc-2 col-pad-2 col-mobile-2">黄金</div>
                            <div class="col col-pc-2 col-pad-2 col-mobile-2">钻石</div>
                        </div>
                        <div class="row line">
                            <div class="col col-pc-2 col-pad-2 col-mobile-2">新手礼包</div>
                            <div class="col col-pc-10 col-pad-10 col-mobile-10">注册并登陆APP，进入会员中心点击领取</div>
                        </div>
                        <div class="row line deep-color">
                            <div class="col col-pc-2 col-pad-2 col-mobile-2">购物奖励</div>
                            <div class="col col-pc-2 col-pad-2 col-mobile-2">1倍</div>
                            <div class="col col-pc-2 col-pad-2 col-mobile-2">1倍</div>
                            <div class="col col-pc-2 col-pad-2 col-mobile-2">1倍</div>
                            <div class="col col-pc-2 col-pad-2 col-mobile-2">1.2倍</div>
                            <div class="col col-pc-2 col-pad-2 col-mobile-2">1.5倍</div>
                        </div>
                        <div class="row line">
                            <div class="col col-pc-2 col-pad-2 col-mobile-2">购物优惠</div>
                            <div class="col col-pc-6 col-pad-6 col-mobile-6"></div>
                            <div class="col col-pc-2 col-pad-2 col-mobile-2">9.5折</div>
                            <div class="col col-pc-2 col-pad-2 col-mobile-2">9折</div>
                        </div>
                        <div class="row line">
                            <div class="col col-pc-2 col-pad-2 col-mobile-2">果园特权</div>
                            <div class="col col-pc-6 col-pad-6 col-mobile-6"></div>
                            <div class="col col-pc-2 col-pad-2 col-mobile-2"><img src="/gou1.png" style="width:16px;"></div>
                            <div class="col col-pc-2 col-pad-2 col-mobile-2"><img src="/gou1.png" style="width:16px;"></div>
                        </div>
                    </div>
                    <div class="title">会员等级说明</div>
                    <div class="p">
                        会员分为5个等级，分为，新人，青铜会员、白银会员、黄金会员、钻石会员。会员等级由成长值
                        决定，每增加1点经验值，收益1颗麦咭豆，经验值越高会员等级越高，享受会员权益越多。
                    </div>
                    <div class="rule-table-2">
                        <div class="box">
                            <div class="line">
                                <div class="img"><img src="/vip-level/vip-level-0.png"></div>
                                <div class="name">新人</div>
                                <div class="expire">经验值  0~99</div>
                            </div>
                            <div class="line">
                                <div class="img"><img src="/vip-level/vip-level-2.png"></div>
                                <div class="name">白银会员</div>
                                <div class="expire">经验值  1000~2999</div>
                            </div>
                            <div class="line">
                                <div class="img"><img src="/vip-level/vip-level-4.png"></div>
                                <div class="name">钻石会员</div>
                                <div class="expire">经验值  6000~9999</div>
                            </div>
                        </div>
                        <div class="box">
                            <div class="line">
                                <div class="img"><img src="/vip-level/vip-level-1.png"></div>
                                <div class="name">青铜会员</div>
                                <div class="expire">经验值  100~999</div>
                            </div>
                            <div class="line">
                                <div class="img"><img src="/vip-level/vip-level-3.png"></div>
                                <div class="name">黄金会员</div>
                                <div class="expire">经验值  3000~5999</div>
                            </div>
                        </div>
                    </div>
                    <div class="title">积分</div>
                    <div class="p">
                        会员可以通过消费、完成日常任务获得成长值
                    </div>
                    <div class="title">积分规则</div>
                    <div class="p">
                        会员等级青铜以上，会有有效期1年，会员注册时间超过90天，每自然年1月初扣减相应的积分后重新计算会员等级。
                    </div>
                    <div class="rule-table-2">
                        <div class="box">
                            <div class="line">
                                <div class="img"><img src="/vip-level/vip-level-1.png"></div>
                                <div class="name">青铜会员</div>
                                <div class="expire">经验值  100~999</div>
                            </div>
                            <div class="line">
                                <div class="img"><img src="/vip-level/vip-level-2.png"></div>
                                <div class="name">白银会员</div>
                                <div class="expire">经验值  1000~2999</div>
                            </div>
                        </div>
                        <div class="box">
                            <div class="line">
                                <div class="img"><img src="/vip-level/vip-level-3.png"></div>
                                <div class="name">黄金会员</div>
                                <div class="expire">经验值  3000~5999</div>
                            </div>
                            <div class="line">
                                <div class="img"><img src="/vip-level/vip-level-4.png"></div>
                                <div class="name">钻石会员</div>
                                <div class="expire">经验值  6000~9999</div>
                            </div>
                        </div>
                    </div>
                    <div class="title">会员须知</div>
                    <div class="p ">
                        <div class="p-know">1.会员等级根据成长值变化</div>
                        <div class="p-know">2.若违反活动限制或采用非正常流程获取优惠利益，情节严重会被取消会员资格，被列入黑名单平台所有权益无法使用</div>
                        <div class="p-know">3.在法律法规许可范围内，麦咭TV有权对活动规则进行解释。</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部 -->
        <Footer />
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
    components: {
        Toper,
        Slide,
        Subject,
        Footer,
        UserMenu
    },
    data() {
        return {
            // 顶部参数
            toperParams: {
                backgroundColor: 'white',
                category: ''
            },
            // 高亮左侧栏目
            menu: {
                isActive: 'user-vip'
            },
            // 是否显示规则面板
            isShowRule:false
        };
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
        }
    },
    async asyncData(context) {
        // 初始化变量
        let that = context.app;
        let res = {};

        // 我的成就
        let MineEvent = await axios({
            url: context.app.$domain + '/mes/queryMesFeatsList',
            method: 'post',
            headers: {
                token: context.store.state.session.token || ''
            }
        });
        res.MineEvent = MineEvent.data;

        return res;
    },
    methods:{
        // 显示规则面板
        showRule:function(){
            this.isShowRule = true;
        },
        // 关闭规则面板
        closeRule:function(){
            this.isShowRule = false;
        }
    }
};
</script>
<style lang="scss" scoped>
// 行包围
.line-wrap {
    display: flex;
    justify-content: center;
}

// 大标题
.big-title {
    font-size: 32px;
}

// 用户规则
.user-rule-mask{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.3);
    z-index: 99999999;
    padding: 20px 0;
    overflow-y: auto;
    .user-rule-box{
        width: 700px;
        background-color: #fff;
        margin: 0 auto;
        // height: 1000px;
        .head-info{
            display: flex;
            height: 150px;
            background-color: #eee;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
            .thumbnail{
                flex: 0 0 140px;
                text-align: center;
                padding-top: 10px;
                img{
                    width: 70%;
                    border-radius: 50%;
                }
            }
            .text{
                flex: 1 1 100%;
                padding: 10px;
                .name{
                    font-size: 24px;
                    font-weight: bold;
                    img{
                        width: 20px;
                    }
                }
                .sign{
                    font-size: 15px;
                    color: #999;
                }
                .bi{
                    font-size: 15px;
                    color: #999;
                    .number{
                        font-size: 26px;
                        color: #1FB3F0;
                        font-weight: bold;
                    }
                }
            }
            .close{
                flex: 0 0 50px;
                text-align: center;
                padding-top:10px;
                img{
                    width: 40%;
                    cursor: pointer;
                }
            }
        }
        .body-info{
            padding: 60px 50px;
            background-color: #fff;
            .level-info{
                display: flex;
                justify-content: space-between;
                img{
                    width: 60px;
                    margin-bottom: 8px;
                }
            }
        }
        .title{
            font-size: 20px;
            border-left: 3px solid #00ADEF;
            padding-left: 10px;
            margin-top:10px;
        }
        .p{
            padding: 10px 0;
            color: #333333;
            line-height: 20px;
        }
        .p-know{
            margin:10px 0;
        }
    }
}

// 第一个表格
.rule-table-1{
    margin: 20px 0;
    background-color: #f7f7ff;
    .th{
        height: 50px;
        background-color: #7fcdf5;
        color: #fff !important;
    }
    .line{
        color: #333333;
        border-top: 1px solid #eee;
        .col{
            text-align: center;
            line-height: 52px;
            border-right: 1px solid #eee;
            height: 50px;
            &:last-of-type{
                border-right: 0;
            }
        }
    }
}

// 第二个表格
.rule-table-2{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    .box{
        flex: 0 0 49%;
        background-color: #f7f7ff;
        padding: 10px;
    }
    .line{
        height: 50px;
        line-height: 50px;
        display: flex;
        .img{
            display: flex;
            align-items: center;
            flex: 0 0 50px;
            max-width: 50px;
            img{
                height: 70%;
            }
        }
        .name{
            flex: 0 0 100px;
        }
        .expire{
            flex: 1 1 100%;
        }
    }
}

// 经验圆圈
.expire-circle {
    position: relative;
    height: 3rem;
    // width: 3rem;
    // background-color: #eee;
    border-radius: 50%;
    .info {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-left: 10px;
        .image {
            height: 30px;
            width: 30px;
            flex: 0 0 30px;
        }
        .number {
            flex: 0 0 auto;
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }
        .text {
            flex: 0 0 auto;
            font-size: 14px;
            color: #999;
        }
    }
    img {
        height: 100%;
        // width: 100%;
    }
}

// 等级徽章
.level-badge {
    flex: 0 0 auto;
    padding: 0 26px;
    height: 30px;
    line-height: 30px;
    background-color: #00adef;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    margin: 20px 0;
    border-radius: 15px;
}

// 还差经验
.expire-less {
    flex: 0 0 auto;
    display: flex;
    height: 20px;
    color: #333;
    span {
        margin: 0 10px;
    }
}

// 经验规则
.expire-rule {
    flex: 0 0 auto;
    height: 20px;
    line-height: 20px;
    cursor: pointer;
    margin: 10px 0;
    img {
        height: 16px;
        vertical-align: middle;
        margin-right: 6px;
    }
}

// 徽章区域
.badge-achievement,
.badge-equity {
    margin: 20px 0;
}
.badge-box {
    width: 1.5rem;
    max-width: 100px;
    margin-right: 0.5rem;
    float: left;
    margin-top: 20px;
    .badge-image {
        // height: 1.5rem;
    }
}
.badge-box2 {
    width: 1.2rem;
    margin-right: 0.5rem;
    float: left;
    margin-top: 20px;
    .badge-image {
        height: 1.2rem;
    }
}
// 徽章图片
.badge-image {
    width: 100%;
    img {
        // height: 100%;
        width: 100%;
    }
}

// 徽章文字
.badge-text {
    text-align: center;
}
.badge-achievement {
}
</style>
