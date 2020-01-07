<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <div class="user-center">
            <div class="wrap">
                <!-- 用户左侧面板 -->
                <UserMenu :menu="menu" />
                <div class="main">
                    <div class="user-message">
                        <div class="big-title">消息中心</div>

                        <!-- 切换 -->
                        <div class="switch">
                            <div class="tab" :class="{ active: isTab === 'tab1' }" @click="switchTab('tab1')">我获得的赞</div>
                            <div class="tab" :class="{ active: isTab === 'tab2' }" @click="switchTab('tab2')">评论</div>
                            <div class="tab" :class="{ active: isTab === 'tab3' }" @click="switchTab('tab3')">官方通知</div>
                        </div>

                        <!-- 赞 -->
                        <div class="panel" v-show="isTab === 'tab1'">
                            <!-- 消息列表 -->
                            <template v-if="MessageListsOfADDLIKE.length <= 0">
                                <img src="/list-holder.message.png" style="display: block;margin: auto; margin-top: 100px;" />
                            </template>
                            <div class="message-list">
                                <div class="list" v-for="(item, index) in MessageListsOfADDLIKE" :key="index">
                                    <div class="img">
                                        <img :src="item.object.userIcon || '/default-head-thumbnail.png'" />
                                    </div>
                                    <div class="info">
                                        <div class="title2">{{ item.object.userNick }}</div>
                                        <div class="summary">{{ item.content }}</div>
                                        <div class="date">{{ item.systemDateTime }}</div>
                                    </div>
                                    <div class="thumbnail">
                                        <img :src="item.object.rightCover + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90'" style="max-height:100%;max-width:100%;" />
                                    </div>
                                </div>
                                <!-- <div class="maiji-page">
                                    <div class="start" @click="pageStart">第一页</div>
                                    <div class="prev" @click="pagePrev">上一页</div>
                                    <div class="num">{{page.curr}}</div>
                                    <div class="next" @click="pageNext">下一页</div>
                                    <div class="end" @click="pageEnd">最后一页</div>
                                    <div class="total">共{{ page.pageCount }}页</div>
                                </div> -->
                            </div>
                        </div>

                        <!-- 评论 -->
                        <div class="panel" v-show="isTab === 'tab2'">
                            <!-- 消息列表 -->
                            <template v-if="MessageListsOfDISCUSS.length <= 0">
                                <img src="/list-holder.message.png" style="display: block;margin: auto; margin-top: 100px;" />
                            </template>
                            <div class="message-list">
                                <div class="list" v-for="(item, index) in MessageListsOfDISCUSS" :key="index">
                                    <div class="img">
                                        <img :src="item.object.userIcon || '/default-head-thumbnail.png'" />
                                    </div>
                                    <div class="info">
                                        <div class="title2">{{ item.object.userNick }}</div>
                                        <div class="summary">{{ item.content }}</div>
                                        <div class="date">{{ item.systemDateTime }}</div>
                                    </div>
                                    <div class="thumbnail">
                                        <img :src="item.object.rightCover + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90'" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 官方通知 -->
                        <div class="panel" v-show="isTab === 'tab3'">
                            <!-- 消息列表 -->
                            <template v-if="MessageListsOfSYSNOTI.length <= 0">
                                <img src="/list-holder.message.png" style="display: block;margin: auto; margin-top: 100px;" />
                            </template>
                            <div class="message-list">
                                <div class="list" v-for="(item, index) in MessageListsOfSYSNOTI" :key="index">
                                    <div class="img">
                                        <img src="/default-head-thumbnail.png" />
                                    </div>
                                    <div class="info">
                                        <div class="title2">{{ item.object.userNick }}</div>
                                        <div class="summary">{{ item.content }}</div>
                                        <div class="date">{{ item.systemDateTime }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
    data() {
        return {
            toperParams: {
                backgroundColor: 'white',
                category: ''
            },
            menu: {
                isActive: 'user-message'
            },
            // 当前tab值
            isTab: 'tab1'
        };
    },
    components: {
        Toper,
        Slide,
        Subject,
        Footer,
        UserMenu
    },
    async asyncData(context) {
        let that = context.app;
        let res = {};

        // 消息列表 - 赞
        let MessageListsOfADDLIKE = await that.$msgList({
            pageNum: 1,
            pageSize: 10,
            busType: 'ADDLIKE'
        });

        // 消息列表 - 评论
        let MessageListsOfDISCUSS = await that.$msgList({
            pageNum: 1,
            pageSize: 10,
            busType: 'DISCUSS'
        });

        // 消息列表 - 通知
        let MessageListsOfSYSNOTI = await that.$msgList({
            pageNum: 1,
            pageSize: 10,
            busType: 'SYSNOTI'
        });
        // ADDLIKE 赞
        // DISCUSS 评论
        // SYSNOTI 官方通知

        MessageListsOfADDLIKE.forEach(function(item) {
            item.object = JSON.parse(item.object);
        });
        MessageListsOfDISCUSS.forEach(function(item) {
            item.object = JSON.parse(item.object);
        });
        MessageListsOfSYSNOTI.forEach(function(item) {
            item.object = JSON.parse(item.object);
        });
        res.MessageListsOfADDLIKE = MessageListsOfADDLIKE;
        res.MessageListsOfDISCUSS = MessageListsOfDISCUSS;
        res.MessageListsOfSYSNOTI = MessageListsOfSYSNOTI;
        return res;
    },
    methods: {
        switchTab(tab) {
            this.isTab = tab;
        }
        // 浏览记录查询函数
        // async getBrowseGoodsList(){
        //     this.GoodsHistory = await this.$getBrowseGoodsList({
        //         pageNum:this.page.curr,
        //         pageSize: this.page.pageSize,
        //     });
        // }
    }
};
</script>
<style lang="scss" scoped>
.big-title {
    display: flex;
    align-items: center;
    height: 40px;
    // line-height: 40px;
    font-size: 30px;
    img {
        height: 24px;
        margin-right: 4px;
        vertical-align: middle;
    }
}

// 切换
.switch {
    display: flex;
    margin: 30px 0;
    font-size: 16px;
    align-items: center;
    .tab {
        flex: 0 0 auto;
        padding: 0 10px;
        margin-right: 20px;
        padding-bottom: 6px;
        cursor: pointer;
        &.active {
            border-bottom: 4px solid #00adef;
        }
    }
}
.message-list {
    .list {
        height: 160px;
        display: flex;
        border-bottom: 1px solid #eee;
        display: flex;
        padding: 20px 0;
        .img {
            flex: 0 0 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                height: 80px;
                width: 80px;
            }
        }
        .info {
            flex: 1 1 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-left: 20px;
            .title2 {
                flex: 0 0 auto;
                font-size: 18px;
            }
            .summary {
                flex: 0 0 auto;
            }
            .date {
                flex: 0 0 auto;
                color: #999;
            }
        }
        .thumbnail {
            flex: 0 0 210px;
            img {
                // height: 100%;
                // width: 100%;
            }
        }
    }
}
</style>
