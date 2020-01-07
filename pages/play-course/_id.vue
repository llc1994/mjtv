<template>
    <div class="container">
        <!-- 顶部导航 -->
        <Toper :toperParams="toperParams"  ref="toper"/>
        <!-- 播放区域 -->
        <div class="player-area-wrap" style="background-color:#000914;">
            <div class="player-area">
                <div class="wrap">
                    <!-- 播放盒子 -->
                    <div class="player-box">
                        <div class="prism-player" id="player-con"></div>
                    </div>
                    <!-- 右侧播放列表 -->
                    <div class="player-list">
                        <div class="title">{{ VideoInfo.title }}</div>
                        <div class="sub-title">{{ VideoInfo.descript }}</div>
                        <!-- 季播盒子 -->
                        <!-- <div class="ji-box">
                            <span class="ji">第1季</span>
                        </div> -->
                        <!-- 课程列表 -->
                        <div class="course-list custom-scroll" style="margin-top:20px;">
                            <div :to="'/play-course/' + item.resId" class="list" v-for="(item, index) in DramaLists.resItems" :key="index" @click="PlayOneVideo(item, index)">
                                <div class="head-info" :class="{active:item.active === true}">
                                    <div class="mark"></div>
                                    <div class="label">{{ item.label }}</div>
                                    <div class="title2">{{ item.title2 }}</div>
                                    <div class="buy" v-if="item.freeScope === 'BUY'">收费</div>
                                </div>
                                <div class="other-info">
                                    <div class="time">时长：{{item.second}}</div>
                                    <div class="view">播放：{{ item.playNumber }}次</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 视频信息区域 -->
            <div class="player-info">
                <div class="wrap">
                    <div class="title">{{ VideoInfo.title }}</div>
                    <div class="info">
                        <div class="img" style="overflow: hidden">
                            <img :src="KnowledgeDetail.lectuerInfoOfKnowDetailRsp.qualityRspDTOs[0].url" style="width: 100%; height: 100%;" />
                        </div>
                        <div class="name-and-focus">
                            <div class="name">{{ KnowledgeDetail.lectuerInfoOfKnowDetailRsp.lectuerName }}</div>
                            <div style="color: #999;">{{ KnowledgeDetail.followNum }} 收藏</div>
                        </div>
                        <div class="favorite" @click="addFocus">
                            <img src="/player/favorite.png" />
                            <span v-if="KnowledgeDetail.followStatus === 0">收藏</span>
                            <span v-if="KnowledgeDetail.followStatus === 1">已收藏</span>
                        </div>
                    </div>
                    <div class="profile-box">{{ KnowledgeDetail.knowledgeDetail }}</div>
                </div>
            </div>


        </div>

        <!-- 每天都在看 -->

        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="parent-child" class="title">同类推荐</nuxt-link>
                            <div class="pinyin">tóng lèi tuī jiàn</div>
                        </div>
                    </div>
                </div>
                <nuxt-link target="_blank" :to="'/play-course/' + item.knowledgeId" class="media-type-1  no-swiper col col-pc-6 col-pad-6 col-mobile-12" v-for="(item, index) in recommendSimilar.merKnowledgeList" :key="index">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(' + item.my_url + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                            }"
                        ></div>
                        <div class="name">{{ item.knowledgeName }}</div>
                        <div class="summary">{{ item.knowledgeDetail }}</div>
                    </div>
                </nuxt-link>
            </div>
        </div>
        <!-- 评论 -->
        <div class="comment-area">
            <div class="wrap">
                <div class="comment-number">
                    评论
                    <span class="number">（{{ CommentList.commentCount }}）</span>
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
                    <div class="textarea pc">
                        <textarea v-model="comment"></textarea>
                        <div class="submit-comment" @click="submitComment()">提交评论</div>
                        <div class="notLogin" v-if="session.isLogin !== true">请<span class="login-highlight" @click="loginHighlight">登录</span>后评论</div>
                    </div>
                    <div class="textarea mobile">
                        <textarea v-model="comment"></textarea>
                        <div class="submit-comment" @click="submitComment2()">提交评论</div>
                        <div class="notLogin" v-if="session.isLogin !== true">请<span class="login-highlight" @click="loginHighlight">登录</span>后评论</div>
                    </div>
                </div>
                <div class="comment-list" v-for="(item, index) in CommentList.list" :key="index">
                    <div class="thumbnail" style="background-size:contain;" :style="{ backgroundImage: 'url(' + item.userIcon + ')' }"></div>
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
        <div class="qr-box" v-show="ShowMobileQr">
            <div class="close" v-on:click="ShowMobileQr = false"></div>
            <div class="qr-container" ref="mobileQr"></div>
            <div class="tip">更好的观看付费课程请使用手机或Pad哦！</div>
        </div>
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
    data() {
        return {
            toperParams: {
                backgroundColor: 'white',
                category: 'maiji-classroom'
            },
            // 播放器实例
            player: null,
            // 评论
            comment: '',
            // 当前季
            currentSeason: 0,
            // 下一季
            nextSeason: 0,
            // 当前集
            currentJi: 0,
            // 显示二维码
            ShowMobileQr: false
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
    components: {
        Toper,
        SubToper,
        Slide,
        Subject,
        Footer
    },
    async asyncData(context) {
        var that = context.app;
        let res = {};
        // 参数前缀
        let prefixParams = context.params.id.substring(0, 3);

        // 如果是视频
        if (prefixParams !== 'res') {
            // 获取知识详情
            let KnowledgeDetail = await that.$getKnowledgeDetails({
                knowledgeId: context.params.id
            });

            // 获取token
            let len = KnowledgeDetail.qualityRspDTOs.length;
            for (let i = 0; i < len; i++) {
                let item = KnowledgeDetail.qualityRspDTOs[i];
                if (item.type === 7) {
                    KnowledgeDetail.token = item.id;
                    break;
                }
            }
            res.KnowledgeDetail = KnowledgeDetail;

            // 获取所有剧集
            let DramaLists = await that.$queryResItems({
                bundleId: KnowledgeDetail.token,
                none_cateGory: true
            });

            DramaLists.resItems.forEach((item,index) => {
                if(index === 0){
                    item.active = true
                }else{
                    item.active = false
                }
                let _ = item.title.split(' ');
                item.label = _[0];
                item.title2 = _[1];
                let time = parseInt(item.duration)
                let minute = Math.floor(time / 60)
                let second = Math.floor(time % 60)
                if(minute < 9) minute = '0' + minute
                item.second =  minute + ':' + second;
            });
            res.DramaLists = DramaLists;
            res.VideoInfo = DramaLists.resItems[0];

            // 获取播放凭证
            res.PlaySecret = await that.$getVideoPlayAuth({
                videoId: res.VideoInfo.alyId
            });

            // 评论列表
            // ------------------------------------------------------------
            res.CommentList = await that.$getCommentList({
                id: res.VideoInfo.businessKey,
                resItemId: res.VideoInfo.id
            });

            res.recommendSimilar = await that.$merRecommendSimilar({
                knowledgeModule: "0",
                knowledgeId: res.KnowledgeDetail.knowledgeId
            })
            res.recommendSimilar.merKnowledgeList.forEach(item => {
                item.qualityRspDTOs.forEach(item2 => {
                    if(item2.type === 3){
                        item.my_url = item2.url;
                    }
                })
            })
        } else {
            // 获取所有剧集
            let DramaLists = await that.$queryResItems({
                bundleId: context.params.id,
                none_cateGory: true
            });
            DramaLists.resItems.forEach(function(item) {
                let _ = item.title.split(' ');
                item.label = _[0];
                item.title2 = _[1];
                item.second = item.duration / 60;
            });
            res.DramaLists = DramaLists;
            res.VideoInfo = DramaLists.resItems[0];
            // 获取播放凭证
            res.PlaySecret = await that.$getVideoPlayAuth({
                videoId: res.VideoInfo.alyId
            });

            // 获取知识详情
            let KnowledgeDetail = await that.$getKnowledgeDetails({
                knowledgeId: res.VideoInfo.businessKey
            });

            // 获取token
            let len = KnowledgeDetail.qualityRspDTOs.length;
            for (let i = 0; i < len; i++) {
                let item = KnowledgeDetail.qualityRspDTOs[i];
                if (item.type === 7) {
                    KnowledgeDetail.token = item.id;
                    break;
                }
            }
            res.KnowledgeDetail = KnowledgeDetail;
            // 评论列表
            // ------------------------------------------------------------
            res.CommentList = await that.$getCommentList({
                id: res.VideoInfo.businessKey,
                resItemId: res.VideoInfo.id
            });

            res.recommendSimilar = await that.$merRecommendSimilar({
                knowledgeModule: "0",
                knowledgeId: res.KnowledgeDetail.knowledgeId
            })

            res.recommendSimilar.merKnowledgeList.forEach(item => {
                item.qualityRspDTOs.forEach(item2 => {
                    if(item2.type === 3){
                        item.my_url = item2.url;
                    }
                })
            })
        }

        return res;
    },
    mounted() {
        this.PlayBegin();
    },
    beforeRouteLeave(to, from, next) {
        this.$addVideoRecord({
            videoId: this.VideoInfo.alyId,
            playTime: Math.floor(this.player.getCurrentTime())
        });
        next();
    },
    methods: {
         //
        submitComment2: async function() {
            location.href = 'https://www.maijimeng.com';
        },
        // 点击高亮登录文字
        loginHighlight(){
            this.$refs.toper.ShowLoginAndRegister()
        },
        // 关注栏目
        addFocus: async function() {
            let Reply = await axios({
                url: this.$domain + '/mer/followKnowledgeColumn',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                },
                data: {
                    knowledgeColumn: this.KnowledgeDetail.knowledgeColumn
                }
            });
            if (Reply.data.msgCd === this.$msgCode.success) {
                $.message({
                    message: Reply.data.msgInfo,
                    type: 'success'
                });
                this.Favorited = !this.Favorited;
            } else {
                $.message({
                    message: Reply.data.msgInfo,
                    type: 'error'
                });
            }
        },
        // 提交评论
        submitComment: async function() {
            if (!this.comment) {
                $.message({
                    message: '评论不能为空',
                    type: 'info'
                });
                return;
            }
            let Reply = await axios({
                url: this.$domain + '/mer/knowledgeComment/addComment',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                },
                data: {
                    knowledgeId: this.VideoInfo.businessKey,
                    content:this.comment
                }
            });
            if (Reply.data.msgCd === this.$msgCode.success) {
                this.comment = '';
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
        // 播放单个视频
        PlayOneVideo: async function(item, index) {
            var that = this;
            // 如果是付费课程
            if (item.freeScope == 'BUY') {
                $(this.$refs.mobileQr).html('');
                var qr = new QRCode(this.$refs.mobileQr, {
                    text: 'https://www.maijimeng.com/share/lessonchapter/' + item.id,
                    width: 150,
                    height: 150,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.L
                });
                this.ShowMobileQr = true;
                return;
            }

            this.VideoInfo = item;
            // history.pushState(null,null,'/play-course/' + this.VideoInfo.bundleId)

            this.DramaLists.resItems.forEach(item => {
                item.active = false
            });
            item.active = true
            // history.pushState({}, '', location.origin + '/play-course/' + item.bundleId);
            // 视频信息
            this.PlaySecret = await this.$getVideoPlayAuth({
                videoId: item.alyId
            });
            // 重载播放
            // ------------------------------------------------------------
            this.PlayBegin();
        },
        PlayBegin: function() {
            if (this.player) {
                this.player.dispose();
            }
            let playParams = {
                id: 'player-con',
                playauth: this.PlaySecret.playAuth,
                vid: this.PlaySecret.videoId,
                cover: this.PlaySecret.coverUrl,
                // cover: 'http://oss-maijitv.maijimeng.com/037a0b387a74443887d932dd40081c44.jpg',
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
            };
            if (this.KnowledgeDetail.knowledgeType === 2) {
                playParams.mediaType = 'audio';
            }
            this.player = new Aliplayer(playParams, function(player) {
                player.play();
            });
        },
        // 播放集数
        PlayJi: async function(item) {
            var that = this;
            this.RecommendLists.resItems.forEach(function(item) {
                item.active = false;
            });
            // 视频信息
            this.VideoInfo = await this.$queryResItemDetail({
                resId: item.id
            });

            // --------------------------------------------------
            // 视频地址
            this.PlaySecret = await this.$getVideoPlayAuth({
                videoId: this.VideoInfo.alyId
            });
            this.PlayBegin();
            this.DramaLists.forEach(function(item, index) {
                item.active = false;
            });
            item.active = true;
            this.ActProgramInfo = await this.$getActProgram({
                id: this.VideoInfo.businessKey,
                pageNum: 1,
                pageSize: 1
            });
            // -----------------------------------------------------
            // 第二步：根据专辑信息查季播数
            let SeasonPlayer = await axios.post(this.$domain + '/common/queryMarkSortDetail', {
                bundleId: this.ActProgramInfo.tvBundleId
            });
            // SeasonPlayer.data.body.reverse();
            SeasonPlayer.data.body.forEach(function(item, index) {
                if (item.markSort === this.VideoInfo.markSort) {
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
<style lang="scss">
.player-area-wrap {
    padding: 20px 0;
}
.qr-box {
    background: url('/bg2.png') no-repeat center center / cover;
    width: 600px;
    height: 600px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -300px;
    margin-top: -300px;
    border-radius: 10px;
    border: solid 1px #ccc;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
    z-index: 99999;
    .close {
        //background: rgba(0, 0, 0, 0.5);
        position: absolute;
        right: 0;
        top: 0;
        width: 50px;
        height: 50px;
        cursor: pointer;
    }
    .tip {
        //background: rgba(0, 0, 0, 0.5);
        position: absolute;
        left: 0;
        right: 0;
        bottom: 30px;
        text-align: center;
        font-size: 20px;
    }
    .qr-container {
        //background: rgba(0, 0, 0, 0.5);
        width: 150px;
        height: 150px;
        left: 50%;
        margin-left: -75px;
        top: 200px;
        position: absolute;
        img {
            width: 100%;
            height: 100%;
            background: #fff;
            display: block;
            image-rendering: pixelated;
            border: solid 5px #fff;
        }
    }
    .player-list {
        padding-right: 10px;
    }
}
</style>
