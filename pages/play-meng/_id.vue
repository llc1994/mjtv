<template>
    <div class="container">
        <!-- 顶部导航 -->
        <Toper :toperParams="toperParams"  ref="toper"/>

        <!-- 顶部 - 子导航 -->
        <!-- <SubToper /> -->

        <!-- 播放区域 -->
        <div class="player-area" style="padding: 20px 0;">
            <div class="wrap">
                <div></div>
                <!-- 播放盒子 -->
                <div class="player-box meng-wa" style="position:relative;">
                    <div class="prism-player" id="player-con" style="position:relative;"></div>
                    <div class="mobile-side-action">
                        <!-- 头像 -->
                        <div class="group">
                            <div
                                class="img background-contain"
                                :style="{
                                    backgroundImage: 'url(' + VideoInfo.userIcon + ')'
                                }"
                            ></div>
                            <div class="focus cursor" @click="addFocus(VideoInfo)" v-if="VideoInfo.followStatus === 0">+</div>
                            <div class="focus" v-if="VideoInfo.followStatus === 1"></div>
                        </div>

                        <!-- 喜欢 -->
                        <div class="group" @click="addLikes(VideoInfo)">
                            <div
                                class="like"
                                :class="{
                                    active: VideoInfo.likeStatus === 1
                                }"
                            ></div>
                            <div class="text">{{ VideoInfo.likes }}</div>
                        </div>

                        <!-- 评论 -->
                        <div class="group" @click="gotoComment()">
                            <div class="comment"></div>
                            <div class="text">{{ VideoInfo.comments }}</div>
                        </div>

                        <!-- 转发 -->
                        <div class="group" @click="addShare(VideoInfo)">
                            <div class="zhuanfa"></div>
                        </div>
                    </div>
                </div>
                <div class="play-meng-wa-infos">
                    <div class="title">{{ VideoInfo.content }}</div>
                    <div class="head-info">
                        <div
                            class="img"
                            style="background-size:contain;"
                            :style="{
                                backgroundImage: 'url(' + VideoInfo.userIcon + ')'
                            }"
                        ></div>
                        <div class="info">
                            <div class="author">{{ VideoInfo.userName }}</div>
                            <div class="focus" style="margin-top: 10px;">
                                <span @click="addFocus(VideoInfo, true)" v-if="VideoInfo.followStatus === 0">+关注</span>
                                <span @click="addFocus(VideoInfo, false)" v-if="VideoInfo.followStatus === 1">已关注</span>
                            </div>
                        </div>
                    </div>
                    <div class="summary"></div>
                    <div class="action">
                        <div class="group cursor" @click="addLikes(VideoInfo)"><span class="icon like" :class="{ active: VideoInfo.likeStatus === 1 }"></span>喜欢</div>
                        <div class="group cursor" @click="addShare(VideoInfo)"><span class="icon share"></span>分享</div>
                        <!-- <div class="group">
                            <span class="icon view"></span>12万次播放
                        </div>-->
                    </div>
                    <div class="recommand-list" v-if="RecommendWorks.body && RecommendWorks.body.allRecList">
                        <nuxt-link target="_blank" class="media-type-5" :to="'/play-meng/' + item.worksId" v-for="(item, index) in RecommendWorks.body.allRecList" :key="index" style="margin-right: 20px;">
                            <div class="inner-wrap">
                                <div
                                    class="cover cover222"
                                    :class="{ active222: cover222 }"
                                    :style="{
                                        backgroundImage: 'url(' + item.resourceUrl + ')'
                                    }"
                                >
                                    <div class="tips" style="color:#fff;">
                                        <span
                                            class="like"
                                            :class="{
                                                active: item.likeStatus === 1
                                            }"
                                        ></span>
                                        {{ item.likes }}
                                    </div>
                                </div>
                                <div class="info">
                                    <div
                                        class="head"
                                        :style="{
                                            backgroundImage: 'url(' + item.userIcon + ')'
                                        }"
                                    ></div>
                                    <div class="name">{{ item.my_userName }}</div>
                                </div>
                                <div class="summary">{{ item.my_content }}</div>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
        <!-- 评论 -->
        <div class="comment-area">
            <div class="wrap">
                <div class="comment-number">
                    评论
                    <span class="number">（{{ commentLists.commentCount }}）</span>
                </div>
                <div class="comment-input" id="comment-input">
                    <div class="head-thumbnail">
                        <div
                            v-if="!!userData.userIcon"
                            class="img"
                            :style="{
                                backgroundImage: 'url(' + userData.userIcon + ')'
                            }"
                        ></div>
                        <div
                            v-else
                            class="img"
                            :style="{
                                backgroundImage: 'url(/default-head-thumbnail.png)'
                            }"
                        ></div>
                    </div>
                    <div class="textarea">
                        <textarea v-model="mengwaComment"></textarea>
                        <div class="submit-comment" @click="submitComment(VideoInfo)">提交评论</div>
                        <div class="notLogin" v-if="session.isLogin !== true">请<span class="login-highlight" @click="loginHighlight">登录</span>后评论</div>
                    </div>
                </div>
                <div class="comment-list" v-for="(item, index) in commentLists.list" :key="index">
                    <div
                        class="thumbnail"
                        style="background-size:contain;"
                        :style="{
                            backgroundImage: 'url(' + item.userIcon + ')'
                        }"
                    ></div>
                    <div class="info">
                        <div class="name">{{ item.userName }}</div>
                        <div class="time">{{ item.addTime }}</div>
                        <div class="value">{{ item.content }}</div>
                        <div class="option">
                            <span class="reply"></span>
                            <span class="zan"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <Footer />

        <div class="temp-fixed"></div>
    </div>
</template>
<script>
import Toper from '~/components/Toper.vue';
import SubToper from '~/components/SubToper.vue';
import Footer from '~/components/Footer.vue';
import Slide from '~/components/Slide.vue';
import Subject from '~/components/Subject.vue';
import axios from 'axios';
export default {
    components: {
        Toper,
        SubToper,
        Subject,
        Footer
    },
    data() {
        return {
            toperParams: {
                backgroundColor: 'white',
                category: 'meng-bao-video'
            },
            // 播放器实例
            player: null,
            // 当前季
            currentSeason: 0,
            // 下一季
            nextSeason: 0,
            // 当前集
            currentJi: 0,
            // 萌娃评论
            mengwaComment: '',
            cover222:false
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
        var that = context.app;
        let res = {};
        // 参数前缀
        // ------------------------------------------------------------
        let prefixParams = context.params.id.substring(0, 2);

        // 单个萌娃视频
        // if (prefixParams === "AW") {
        // 萌娃秀详情
        res.VideoInfo = await that.$getActWorks({ id: context.params.id });
        res.VideoInfo.userIcon = res.VideoInfo.userIcon || '/default-head-thumbnail.png'
        res.VideoAddress = res.VideoInfo.resourcePlayUrl;
        // 萌宝视频
        let MengBaoVideo = await that.$getRecObjectList({
            pageSize: 1,
            pageNum: 1,
            recPosition: '0a15d438066c4663bd1be8a66ed761dd'
        });
        // 萌娃秀
        // -------------------------------------------
        let MengWaShow = await axios({
            url: that.$domain + '/act/actWorks/getDareWorkTop',
            method: 'post',
            headers: {
                token: context.store.state.session.token || ''
            },
            data: {
                pageNum: 1,
                pageSize: 5,
                type: 2,
                actId: MengBaoVideo.allAdvList[0].itemId,
                userId: context.store.state.session.userId
            }
        });
        res.MengBaoVideo = MengWaShow.data.body;

        // 推荐视频
        let RecommendWorks = await axios({
            url: that.$domain + '/mkt/getChoiceWorks',
            method: 'post',
            headers: {
                token: context.store.state.session.token || ''
            },
            data: {
                pageNum: 1,
                pageSize: 5
                // type: 3
                // userId: context.store.state.session.userId
            }
        });

        RecommendWorks.data.body.allRecList.forEach(item => {
            item.userIcon = item.userIcon || '/default-head-thumbnail.png';
        })
        res.RecommendWorks = RecommendWorks.data;

        // 评论列表
        let commentLists = await axios({
            url: that.$domain + '/act/actWorks/getCommentList',
            method: 'post',
            headers: {
                token: context.store.state.session.token || ''
            },
            data: {
                id: res.VideoInfo.id,
                userId: context.store.state.session.userId
            }
        });
        commentLists.data.body.list.forEach(function(item) {
            if (!item.userIcon) {
                item.userIcon = '/default-head-thumbnail.png';
            }
        });
        res.commentLists = commentLists.data.body;

        return res;
    },
    mounted() {
        this.PlayBegin();
        // 大图闪现处理
        setTimeout(() => {
            this.cover222 = true
        },300)
    },
    methods: {
        // 点击高亮登录文字
        loginHighlight(){
            this.$refs.toper.ShowLoginAndRegister()
        },
        // 分享
        addShare: async function(item) {
            let Reply = await axios({
                url: this.$domain + '/act/actWorks/addForwards',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                },
                data: {
                    id: item.userId, // 无
                    userId: this.$store.state.session.userId // 操作用户id
                }
            });
            if (Reply.data.msgCd === this.$msgCode.success) {
                $.message({
                    message: Reply.data.msgInfo,
                    type: 'success'
                });
            } else {
                $.message({
                    message: Reply.data.msgInfo,
                    type: 'error'
                });
            }
        },
        // 跳到评论
        gotoComment: async function() {
            var offsetTop = document.querySelector('#comment-input').offsetTop;
            window.scrollTo({
                top: offsetTop - 150,
                behavior: 'smooth'
            });
        },
        async getComment() {
            // 评论列表
            let commentLists = await axios({
                url: this.$domain + '/act/actWorks/getCommentList',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                },
                data: {
                    id: this.VideoInfo.id,
                    userId: this.$store.state.session.userId
                }
            });
            commentLists.data.body.list.forEach(function(item) {
                if (!item.userIcon) {
                    item.userIcon = '/default-head-thumbnail.png';
                }
            });
            this.commentLists = commentLists.data.body;
        },
        // 提交评论
        submitComment: async function(item) {
            let Reply = await axios({
                url: this.$domain + '/act/actWorks/addComment',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                },
                data: {
                    worksId: item.worksId,
                    userId: this.$store.state.session.userId,
                    content: this.mengwaComment
                }
            });
            if (Reply.data.msgCd === this.$msgCode.success) {
                this.mengwaComment = '';
                this.getComment();
                $.message({
                    message: Reply.data.msgInfo,
                    type: 'success'
                });
            } else {
                $.message({
                    message: Reply.data.msgInfo,
                    type: 'error'
                });
            }
        },
        // 添加关注
        addFocus: async function(item, status) {
            let that = this;
            // /actWorks/addForwards

            let reply = await axios({
                url: this.$domain + '/urm/followOption',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                },
                data: {
                    associatedId: item.userId, //item.userId, // 关联用户
                    enable: status ? 1 : 0, // 0 不可用 1 可用
                    typeFlag: 0, // 0 关注用户 1 关注节目
                    // id: item.userId, // 无
                    userId: this.$store.state.session.userId // 操作用户id
                }
            });
            if (reply.data && reply.data.msgCd === that.$msgCode.success) {
                item.followStatus = Number(!item.followStatus);
                $.message({
                    message: reply.data.msgInfo || reply.data.msgCd,
                    type: 'success'
                });
            } else {
                $.message({
                    message: reply.data.msgInfo || reply.data.msgCd,
                    type: 'error'
                });
            }
        },
        // 喜欢
        addLikes: async function(item) {
            let that = this;
            let reply = await axios({
                url: this.$domain + '/act/actWorks/addLikes',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                },
                data: {
                    id: item.id,
                    type: item.likeStatus ? 0 : 1,
                    userId: this.$store.state.session.userId
                }
            });
            if (reply.data && reply.data.msgCd === that.$msgCode.success) {
                item.likeStatus = Number(!item.likeStatus);
                item.likes += item.likeStatus ? 1 : -1;
                $.message({
                    message: reply.data.msgInfo || reply.data.msgCd,
                    type: 'success'
                });
            } else {
                $.message({
                    message: reply.data.msgInfo || reply.data.msgCd,
                    type: 'error'
                });
            }
        },
        // 播放单个视频
        PlayOneVideo: async function(item, index) {
            this.RecommendLists.resItems.forEach(function(item) {
                item.active = false;
            });
            item.active = true;
            // 清空季
            this.SeasonPlayer.forEach(function(item, index) {
                item.active = false;
            });
            // 清空集的选中
            this.DramaLists.forEach(function(item, index) {
                item.active = false;
            });

            // 视频信息
            let VideoInfo = await axios.post(context.app.$domain + '/common/queryResItemDetail', {
                resId: item.id
            });
            this.VideoInfo = VideoInfo.data.body;
            // 视频地址
            let VideoAddress = await axios.post(context.app.$domain + '/aly/getPlayAddress', {
                videoId: item.alyId
            });
            this.VideoAddress = VideoAddress.data.body;
            // this.PlayBegin();
            this.player.loadByUrl(this.VideoAddress);
        },
        PlayBegin: function() {
            this.player = new Aliplayer(
                {
                    id: 'player-con',
                    source: this.VideoAddress,
                    width: '100%',
                    height: '100%',
                    videoWidth: '100%',
                    videoHeight: '100%',
                    autoplay: true,
                    isLive: false,
                    rePlay: false,
                    playsinline: true,
                    preload: true,
                    controlBarVisibility: 'hover',
                    useH5Prism: true
                },
                function(player) {}
            );
        },
        // 播放集数
        PlayJi: async function(item) {
            var that = this;
            this.RecommendLists.resItems.forEach(function(item) {
                item.active = false;
            });
            // 视频信息
            let VideoInfo = await axios.post(this.$domain + '/common/queryResItemDetail', {
                resId: item.id
            });
            this.VideoInfo = VideoInfo.data.body;
            // --------------------------------------------------
            // 视频地址
            let VideoAddress = await axios.post(this.$domain + '/aly/getPlayAddress', {
                videoId: VideoInfo.data.body.alyId
            });
            this.VideoAddress = VideoAddress.data.body;
            this.player.loadByUrl(this.VideoAddress);
            this.DramaLists.forEach(function(item, index) {
                item.active = false;
            });
            item.active = true;
            let ActProgramInfo = await axios.post(this.$domain + '/act/actProgram/getActProgram', {
                id: VideoInfo.data.body.businessKey,
                pageNum: 1,
                pageSize: 1
            });
            this.ActProgramInfo = ActProgramInfo.data.body;
            // -----------------------------------------------------
            // 第二步：根据专辑信息查季播数
            let SeasonPlayer = await axios.post(this.$domain + '/common/queryMarkSortDetail', {
                bundleId: ActProgramInfo.data.body.tvBundleId
            });
            // SeasonPlayer.data.body.reverse();
            SeasonPlayer.data.body.forEach(function(item, index) {
                if (item.markSort === that.VideoInfo.markSort) {
                    item.active = true;
                }
                // index === 0 ? (item.active = true) : (item.active = false);
            });
            this.SeasonPlayer = SeasonPlayer.data.body;
        },
        // 切换季
        SwitchSeason: async function(item, index) {
            this.RecommendLists.resItems.forEach(function(item) {
                item.active = false;
            });
            // 获取剧集
            let DramaLists = await axios.post(this.$domain + '/common/queryItemsByMarkSort', {
                bundleId: this.ActProgramInfo.tvBundleId,
                markSort: item.markSort
            });

            DramaLists.data.body.forEach(function(item, index) {
                index = index + 1;
                item.index = index > 9 ? index : '0' + index;
                index === 1 ? (item.active = true) : (item.active = false);
            });
            this.DramaLists = DramaLists.data.body;
            this.SeasonPlayer.forEach(function(item, index) {
                item.active = false;
            });
            this.SeasonPlayer[index].active = true;
        }
    }
};
</script>
