<style lang="scss" scoped>
.player-box{
    position: relative;
    .tips{
        position: absolute;
        top: 4px;
        right: 4px;
        z-index: 2;
        background: rgba(0,0,0,0.7);
        color: white;
        font-size: 14px;
        line-height: 14px;
        padding: 6px 12px;
        border-radius: 13px;
        .open{
            color: #FDD000;
            margin-left: 6px;
        }
    }
}
</style>

<template>
    <div class="container">
        <!-- 顶部导航 -->
        <Toper :toperParams="toperParams" ref="toper" />

        <!-- 顶部 - 子导航 -->
        <SubToper :APG="VideoInfo.businessKey" />

        <!-- 播放区域 -->
        <div class="player-area">
            <div class="wrap">
                <!-- 播放盒子 -->
                <div class="player-box">
                    <div class="tips">
                        开通会员观看完整版
                        <a href="javascript:;" class="open">开通VIP</a>
                    </div>
                    <template v-if="CurrentAdv.data">
                        <div class="adv-player">
                            <div class="close">{{ CurrentAdv.countDown }}</div>
                            <a class="go" :href="CurrentAdv.data.jumpUrl" target="_blank" v-show="CurrentAdv.data.jumpUrl"></a>

                            <template v-if="CurrentAdv.data.advType === 0">
                                <video :src="CurrentAdv.data.playUrl" :poster="CurrentAdv.data.coverUrl" autoplay></video>
                            </template>
                            <template v-if="CurrentAdv.data.advType === 1">
                                <img :src="CurrentAdv.data.imgUrl" />
                            </template>
                        </div>
                    </template>

                    <div class="prism-player" id="player-con"></div>
                    <div class="goto-download"></div>
                </div>

                <!-- 右侧播放列表 -->
                <div class="player-list">
                    <div class="title">{{ ActProgramInfo.name }}</div>
                    <div class="sub-title">{{ VideoInfo.descript }}</div>
                    <!-- 季播盒子 -->
                    <div class="ji-box fx">
                        <div class="ji-wrap" :class="{ active: item.active === true }" v-for="(item, index) in SeasonPlayer" :key="index" @click="SwitchSeason(item, index)">
                            <span class="ji">第{{ item.markSort }}季</span>
                        </div>
                    </div>
                    <!-- 集 -->
                    <div class="unit-box custom-scroll">
                        <a class="unit" :class="{ active: item.id === VideoInfo.id }" v-for="(item, index) in DramaLists.resItems" :key="index" :href="'/play/' + item.id">
                            <span>{{ item.episode || index + 1 }}</span>
                        </a>
                        <!-- <div
                            class="unit"
                            :class="{ active: item.id === currentJi }"
                            v-for="(item, index) in DramaLists.resItems"
                            :key="index"
                            @click="PlayJi(item)"
                        >
                            <span>{{ item.episode || index + 1 }}</span>
                        </div>-->
                    </div>

                    <div class="recommand-area custom-scroll">
                        <a class="box" :class="{ active: item.id === VideoInfo.id }" v-for="(item, index) in RecommendLists.resItems" :key="index" :href="'/play/' + item.id">
                            <div
                                class="img"
                                :style="{
                                    backgroundImage: 'url(' + item.alyUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                }"
                            ></div>
                            <div class="info">
                                <div class="title">{{ item.title }}</div>
                                <div class="summary">{{ item.descript }}</div>
                            </div>
                        </a>

                        <!-- <div
                            class="box"
                            :class="{ active: item.active === true }"
                            v-for="(item, index) in RecommendLists.resItems"
                            :key="index"
                            @click="PlayOneVideo(item, index)"
                        >
                            <div
                                class="img"
                                :style="{
                                    backgroundImage: 'url(' + item.alyUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                }"
                            ></div>
                            <div class="info">
                                <div class="title">{{ item.title }}</div>
                                <div class="summary">{{ item.descript }}</div>
                            </div>
                        </div>-->
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
                        <img :src="ActProgramInfo.iconResourceUrl" style="width: 100%; height: 100%;" />
                    </div>
                    <div class="name-and-focus">
                        <div class="name">{{ ActProgramInfo.name }}</div>
                        <div style="color: #999;">{{ ActProgramInfo.collectCount }} 收藏</div>
                    </div>
                    <div class="favorite" @click="addFocus">
                        <img src="/player/favorite.png" />
                        <span v-if="Favorited === false">收藏</span>
                        <span v-if="Favorited === true">已收藏</span>
                    </div>
                </div>
                <div class="profile-box">{{ ActProgramInfo.intro }}</div>
            </div>
        </div>

        <!-- 花絮片段 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="parent-child" class="title">花絮片段</nuxt-link>
                            <div class="pinyin">huā xù piàn duàn</div>
                        </div>
                    </div>
                </div>
                <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="media-type-1 no-swiper col col-pc-3 col-pad-4 col-mobile-6" v-for="(item, index) in res1.allAdvList" :key="index">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                            }"
                        >
                            <div class="tips">{{ item.my_title_one }}</div>
                        </div>
                        <div class="name">{{ item.descript }}</div>
                        <div class="summary">{{ item.my_title_two }}</div>
                    </div>
                </nuxt-link>
            </div>
        </div>

        <!-- 嗨正片 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="parent-child" class="title">嗨正片</nuxt-link>
                            <div class="pinyin">hāi zhèng piàn</div>
                        </div>
                    </div>
                </div>
                <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="media-type-1 no-swiper col col-pc-3 col-pad-4 col-mobile-6" v-for="(item, index) in res2.allAdvList" :key="index">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                            }"
                        >
                            <div class="tips">{{ item.my_title_one }}</div>
                        </div>
                        <div class="name">{{ item.descript }}</div>
                        <div class="summary">{{ item.my_title_two }}</div>
                    </div>
                </nuxt-link>
            </div>
        </div>

        <!-- 热门活动 -->
        <div class="media-area gg2-ts">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="title">热门活动</div>
                        <div class="section">
                            <div class="pinyin">rè mén huó dòng</div>
                        </div>
                    </div>
                </div>
                <div class="media-type-4 col col-pc-6 col-pad-6 col-mobile-12" v-for="(item, index) in HotActive.allAdvList" :key="index">
                    <a :href="item.to" :class="'xx' + (index + 1)" target="_blank" class="media-type-4-content" to="/program-interaction">
                        <div class="inner-wrap">
                            <div
                                class="cover"
                                :style="{
                                    backgroundImage: 'url(' + item.customImgUrl + ')'
                                }"
                            ></div>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <!--主编推荐 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="parent-child" class="title">主编推荐</nuxt-link>
                            <div class="pinyin">zhǔ biān tuī jiàn</div>
                        </div>
                    </div>
                </div>
                <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="media-type-1 no-swiper col col-pc-3 col-pad-4 col-mobile-6" v-for="(item, index) in res3.allAdvList" :key="index">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                            }"
                        >
                            <div class="tips">{{ item.my_title_one }}</div>
                        </div>
                        <div class="name">{{ item.descript }}</div>
                        <div class="summary">{{ item.my_title_two }}</div>
                    </div>
                </nuxt-link>
            </div>
        </div>

        <!-- 每天都在看 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="parent-child" class="title">每天都在看</nuxt-link>
                            <div class="pinyin">měi tiān dōu zài kàn</div>
                        </div>
                    </div>
                </div>
                <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="media-type-1 no-swiper col col-pc-3 col-pad-4 col-mobile-6" v-for="(item, index) in res4.allAdvList" :key="index">
                    <div class="inner-wrap">
                        <div class="cover" :style="{ backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)' }">
                            <div class="tips">{{ item.my_title_one }}</div>
                        </div>
                        <div class="name">{{ item.descript }}</div>
                        <div class="summary">{{ item.my_title_two }}</div>
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
                        <div class="notLogin" v-if="session.isLogin !== true">
                            请
                            <span class="login-highlight" @click="loginHighlight">登录</span>后评论
                        </div>
                    </div>
                    <div class="textarea mobile">
                        <textarea v-model="comment"></textarea>
                        <div class="submit-comment" @click="submitComment2()">提交评论</div>
                        <div class="notLogin" v-if="session.isLogin !== true">
                            请
                            <span class="login-highlight" @click="loginHighlight">登录</span>后评论
                        </div>
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
    </div>
</template>
<script>
import axios from 'axios';
import _ from 'lodash';
import Toper from '~/components/Toper.vue';
import SubToper from '~/components/SubToper.vue';
import Footer from '~/components/Footer.vue';
import Slide from '~/components/Slide.vue';
import Subject from '~/components/Subject.vue';

export default {
    data() {
        return {
            toperParams: {
                backgroundColor: 'white',
                category: 'parent-child'
            },
            // 播放器实例
            player: null,
            // 当前季
            currentSeason: 0,
            // 下一季
            nextSeason: 0,
            // 当前集
            currentJi: '',
            // 评论
            comment: '',
            // 已收藏
            Favorited: false,
            // 当前广告
            CurrentAdv: {
                data: null,
                countDown: 0
            }
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
        // 统一前后端写法
        var that = context.app;

        // 初始化返回
        let res = {};

        // 参数前缀，用来判断是专辑还是视频
        // ------------------------------------------------------------
        let prefixParams = context.params.id.substring(0, 3);
        let programId = '';
        // 如果是节目
        if (prefixParams === 'APG') {
            programId = context.params.id;
            // 专辑信息
            // ------------------------------------------------------------
            res.ActProgramInfo = await that.$getActProgram({
                id: context.params.id
            });

            // 季播信息
            // ------------------------------------------------------------
            res.SeasonPlayer = await that.$queryMarkSortDetail({
                bundleId: res.ActProgramInfo.tvBundleId,
                seasonNumber: 0
            });

            // 剧集信息
            // ------------------------------------------------------------
            res.DramaLists = await that.$queryResItems({
                bundleId: res.ActProgramInfo.tvBundleId,
                markSort: res.SeasonPlayer[0].markSort
            });

            // 默认第一集高亮，其他的集数初始为false
            // ------------------------------------------------------------
            if (_.isArray(res.DramaLists.resItems)) {
                // 排除没有集数的正片
                res.DramaLists.resItems = res.DramaLists.resItems.filter(function(item) {
                    return item.episode !== null;
                });
                // 默认当前集高亮
                res.DramaLists.resItems.forEach((item, index) => {
                    index = index + 1;
                    item.index = index > 9 ? index : '0' + index;
                    if (item.id === res.DramaLists.resItems[0].id) {
                        // item.active = true;
                        res.currentJi = item.id;
                    } else {
                        item.active = false;
                    }
                });
                res.DramaLists.resItems.forEach(function(item, index) {
                    if (index === 0) {
                        item.active = true;
                    } else {
                        item.active = false;
                    }
                });
                if (res.DramaLists.resItems.length > 0) {
                    // 第一集
                    let firstItem = res.DramaLists.resItems[0];

                    // 查询视频详情
                    // ------------------------------------------------------------
                    res.VideoInfo = await that.$queryResItemDetail({ resId: firstItem.id });

                    // 查询地址
                    // ------------------------------------------------------------
                    // res.VideoAddress = await that.$getPlayAddressList({
                    //     videoId: firstItem.alyId,
                    // });
                    res.PlaySecret = await that.$getVideoPlayAuth({
                        videoId: firstItem.alyId
                    });

                    // 评论列表
                    // ------------------------------------------------------------
                    res.CommentList = await that.$getCommentList({
                        id: res.VideoInfo.businessKey,
                        resItemId: firstItem.id
                    });

                    // 调用推荐视频列表
                    // ------------------------------------------------------------
                    res.RecommendLists = await that.$queryLastResItems({
                        bundleId: res.ActProgramInfo.tvBundleId,
                        pageNum: 1,
                        pageSize: 10,
                        cateGory: 'EASTER_EGG',
                        markSort: res.VideoInfo.markSort
                    });
                    res.RecommendLists.resItems.forEach(function(item) {
                        item.active = false;
                    });
                } else {
                    res.VideoInfo = {};
                    res.VideoAddress = '';
                    res.CommentList = {};
                    res.RecommendLists = {};
                }
            }
        }
        // 如果是视频
        if (prefixParams === 'res') {
            // 查询视频详情
            // ------------------------------------------------------------
            res.VideoInfo = await that.$queryResItemDetail({ resId: context.params.id });
            res.currentJi = context.params.id;

            // 锁定专辑高亮
            programId = res.VideoInfo.businessKey;

            // 查询地址
            // ------------------------------------------------------------
            // res.VideoAddress = await that.$getPlayAddressList({
            //     videoId: res.VideoInfo.alyId,
            // });
            res.PlaySecret = await that.$getVideoPlayAuth({
                videoId: res.VideoInfo.alyId
            });

            // 专辑信息
            // ------------------------------------------------------------
            res.ActProgramInfo = await that.$getActProgram({
                id: res.VideoInfo.businessKey
            });

            // 季播信息
            // ------------------------------------------------------------
            res.SeasonPlayer = await that.$queryMarkSortDetail({
                bundleId: res.ActProgramInfo.tvBundleId,
                seasonNumber: res.VideoInfo.markSort
            });

            // 剧集信息
            // ------------------------------------------------------------
            res.DramaLists = await that.$queryResItems({
                bundleId: res.ActProgramInfo.tvBundleId,
                markSort: res.VideoInfo.markSort
            });

            // 排除没有集数的正片
            res.DramaLists.resItems = res.DramaLists.resItems.filter(function(item) {
                return item.episode !== null;
            });

            // 默认当前集高亮
            if (_.isArray(res.DramaLists.resItems)) {
                res.DramaLists.resItems.forEach(function(item, index) {
                    if (item.id === res.VideoInfo.id) {
                        item.active = true;
                    } else {
                        item.active = false;
                    }
                });
            }

            // 评论列表
            // ------------------------------------------------------------
            res.CommentList = await that.$getCommentList({
                id: res.VideoInfo.businessKey,
                resItemId: res.VideoInfo.id
            });

            // 调用推荐视频列表
            // ------------------------------------------------------------
            res.RecommendLists = await that.$queryLastResItems({
                bundleId: res.ActProgramInfo.tvBundleId,
                pageSize: 10,
                cateGory: 'EASTER_EGG',
                markSort: res.VideoInfo.markSort
            });
            res.RecommendLists.resItems.forEach(function(item) {
                item.active = false;
            });
        }

        // 查询是否收藏
        let favorited = await axios({
            url: that.$domain + '/urm/checkCollectStatus',
            method: 'post',
            headers: {
                token: context.store.state.session.token || ''
            },
            data: {
                associatedId: programId,
                userId: context.store.state.session.userId
            }
        });
        if (favorited.data.msgCd === that.$msgCode.success && favorited.data.body) {
            res.Favorited = favorited.data.body.collect;
        } else {
            res.Favorited = false;
        }

        // 花絮片段
        let res1 = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: '7f23fde2a0544571b7170aae8bdf3425 '
        });
        res1.allAdvList.forEach(function(item) {
            let res = item.title.split('：');
            if (res.length < 2) {
                item.my_title_one = '';
                item.my_title_two = res[0];
            } else {
                item.my_title_one = res[0];
                item.my_title_two = res[1];
            }
        });
        res.res1 = res1;

        // 嗨正片
        let res2 = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: '6c3764069c1146f392cd49bbda13f998 '
        });
        res2.allAdvList.forEach(function(item) {
            let res = item.title.split('：');
            if (res.length < 2) {
                item.my_title_one = '';
                item.my_title_two = res[0];
            } else {
                item.my_title_one = res[0];
                item.my_title_two = res[1];
            }
        });
        res.res2 = res2;

        // 主编推荐
        let res3 = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: 'f6c13f50cd29453e9e13c2765a24860b  '
        });
        res3.allAdvList.forEach(function(item) {
            let res = item.title.split('：');
            if (res.length < 2) {
                item.my_title_one = '';
                item.my_title_two = res[0];
            } else {
                item.my_title_one = res[0];
                item.my_title_two = res[1];
            }
        });
        res.res3 = res3;

        // 每天都在看
        let res4 = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: 'f6c13f50cd29453e9e13c2765a24860b  '
        });
        res4.allAdvList.forEach(function(item) {
            let res = item.title.split('：');
            if (res.length < 2) {
                item.my_title_one = '';
                item.my_title_two = res[0];
            } else {
                item.my_title_one = res[0];
                item.my_title_two = res[1];
            }
        });
        res.res4 = res4;

        // 热门活动
        // res.HotActive = await that.$getRecObjectList({
        //     pageSize: 2,
        //     pageNum: 1,
        //     recPosition: '83f41a9e119241c097e69ba3f872494d'
        // });

        // 热门活动
        res.HotActive = await that.$getRecObjectList({
            pageSize: 2,
            pageNum: 1,
            recPosition: '09b8ddd225354ea1bb5b7d61d1f28440'
        });
        return res;
    },
    beforeRouteLeave(to, from, next) {
        this.$addVideoRecord({
            videoId: this.VideoInfo.alyId,
            playTime: Math.floor(this.player.getCurrentTime())
        });
        next();
    },
    mounted() {
        this.PlayBegin();
        setInterval(this.AdvCountDown, 1000);
    },
    methods: {
        // 播放和暂停视频
        playAndStopVideo() {
            // this.player.play();
        },
        // 点击高亮登录文字
        loginHighlight() {
            this.$refs.toper.ShowLoginAndRegister();
        },
        // 关注栏目
        addFocus: async function() {
            let Reply = await axios({
                url: this.$domain + '/urm/collectOption',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                },
                data: {
                    associatedId: this.VideoInfo.businessKey,
                    colType: 2,
                    enable: this.Favorited ? 0 : 1,
                    title: this.ActProgramInfo.name,
                    descript: this.ActProgramInfo.intro,
                    resUrl: this.ActProgramInfo.iconResourceUrl,
                    userId: this.$store.state.session.userId
                }
                // userId 用户id
                // associatedId 关联id
                // colType 收藏类型（0 资讯，1 课程， 2 节目，3 活动）
                // title 标题
                // descript 描述
                // enable 0 不可用 1 可用
                // resUrl 图片地址
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
        //
        submitComment2: async function() {
            location.href = 'https://www.maijimeng.com';
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
                url: this.$domain + '/act/actProgramComment/addComment',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                },
                data: {
                    userId: this.$store.state.session.userId,
                    episodeNo: this.VideoInfo.markSort,
                    resItemId: this.VideoInfo.id,
                    programSeasonId: this.VideoInfo.businessKey,
                    content: this.comment,
                    episodeNo: this.VideoInfo.episode,
                    seasonNo: this.VideoInfo.markSort
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
            // 推荐失焦
            // ------------------------------------------------------------
            this.RecommendLists.resItems.forEach(function(item) {
                item.active = false;
            });

            // 当前推荐聚焦
            // ------------------------------------------------------------
            item.active = true;

            // 清空季
            // ------------------------------------------------------------
            this.SeasonPlayer.forEach(function(item, index) {
                item.active = false;
            });

            // 清空集的选中
            // ------------------------------------------------------------
            this.DramaLists.resItems.forEach(function(item, index) {
                item.active = false;
            });

            // 查询视频详情
            // ------------------------------------------------------------
            this.VideoInfo = await this.$queryResItemDetail({ resId: item.id });
            history.pushState(null, null, '/play/' + this.VideoInfo.id);

            // 查询视频地址
            // ------------------------------------------------------------
            this.PlaySecret = await this.$getVideoPlayAuth({
                videoId: item.alyId
            });

            // 重载播放
            // ------------------------------------------------------------
            this.PlayBegin();
        },
        AdvCountDown() {
            if (this.CurrentAdv.end) {
                let num = (this.CurrentAdv.end.getTime() - new Date().getTime()) / 1000;
                if (num >= 0) this.CurrentAdv.countDown = Math.floor(num);
            }
        },
        PlayBegin: function() {
            var that = this;
            if (this.player) {
                this.player.dispose();
            }
            this.CurrentAdv.data = null;

            axios({
                url: this.$domain + '/mkt/queryVideoDetail/v1',
                method: 'post',
                data: { clientType: 1, resId: this.VideoInfo.id }
            }).then(result => {
                let adv = result.data.body;
                if (adv.startAdvList) {
                    this.CurrentAdv.end = new Date(new Date().getTime() + adv.startAdvList.totalTime * 1000);
                    this.AdvCountDown();

                    let currentIndex = -1;
                    let showNextAdv = () => {
                        currentIndex++;
                        if (currentIndex >= adv.startAdvList.advList.length) {
                            this.CurrentAdv.data = null;
                            showPlayer();
                            return;
                        }
                        let currentAdv = adv.startAdvList.advList[currentIndex];
                        currentAdv.jumpUrl = currentAdv.jumpUrl || (this.$jumpParams[currentAdv.skipType] ? this.$jumpParams[currentAdv.skipType] + currentAdv.detailId : '');

                        this.CurrentAdv.data = currentAdv;
                        setTimeout(() => {
                            showNextAdv();
                        }, currentAdv.showTime * 1000);
                    };
                    showNextAdv();
                } else {
                    showPlayer();
                }
            });

            let showPlayer = () => {
                this.player = new Aliplayer(
                    {
                        id: 'player-con',
                        // source: this.VideoAddress, //"//player.alicdn.com/video/aliyunmedia.mp4",
                        playauth: this.PlaySecret.playAuth,
                        vid: this.PlaySecret.videoId,
                        cover: this.PlaySecret.coverUrl,
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
                        useH5Prism: true,
                        definition: 'FD,LD',
                        qualitySort: 'desc'
                    },
                    function(player) {
                        var _video = document.querySelector('video');
                        player.on('play', function(e) {
                            _video.removeEventListener('click', play);
                            _video.addEventListener('click', pause);
                        });
                        player.on('pause', function(e) {
                            _video.removeEventListener('click', pause);
                            _video.addEventListener('click', play);
                        });
                        function play() {
                            if (player) player.play();
                        }
                        function pause() {
                            if (player) player.pause();
                        }
                    }
                );
            };
        },
        // 播放集数
        PlayJi: async function(item) {
            var that = this;
            try {
                // 让所有的推荐剧集不激活
                // ------------------------------------------------------------
                this.RecommendLists.resItems.forEach(function(item) {
                    item.active = false;
                });
                // 查询视频详情
                // ------------------------------------------------------------
                this.VideoInfo = await this.$queryResItemDetail({ resId: item.id });
                this.currentJi = item.id;
                history.pushState(null, null, '/play/' + this.VideoInfo.id);

                // 查询视频地址
                // ------------------------------------------------------------
                // this.VideoAddress = await this.$getPlayAddressList({
                //     videoId: item.alyId,
                // });
                this.PlaySecret = await this.$getVideoPlayAuth({
                    videoId: item.alyId
                });
                // 重载播放
                // ------------------------------------------------------------
                this.PlayBegin();

                // 聚焦季
                // ------------------------------------------------------------
                this.SeasonPlayer.forEach(function(item, index) {
                    if (item.markSort === that.VideoInfo.markSort) {
                        item.active = true;
                    } else {
                        item.active = false;
                    }
                });

                // 其他集数失焦
                // ------------------------------------------------------------
                this.DramaLists.resItems.forEach(function(item, index) {
                    item.active = false;
                });

                // 当前集聚焦
                // ------------------------------------------------------------
                item.active = true;

                // 专辑信息
                // ------------------------------------------------------------
                this.ActProgramInfo = await this.$getActProgram({
                    id: this.VideoInfo.businessKey
                });

                // 评论列表
                // ------------------------------------------------------------
                this.CommentList = await this.$getCommentList({
                    id: this.VideoInfo.businessKey,
                    resItemId: this.VideoInfo.id
                });
            } catch (err) {}
        },
        // 切换季
        SwitchSeason: async function(item, index) {
            try {
                // 把推荐视频不激活
                // ------------------------------------------------------------
                this.RecommendLists.resItems.forEach(function(item) {
                    item.active = false;
                });

                // 剧集信息
                // ------------------------------------------------------------
                this.DramaLists = await this.$queryResItems({
                    bundleId: this.ActProgramInfo.tvBundleId,
                    markSort: item.markSort
                });

                // 非当前季播失焦
                this.SeasonPlayer.forEach(function(item, index) {
                    item.active = false;
                });

                // 当前季播聚焦
                this.SeasonPlayer[index].active = true;

                //
            } catch (err) {}
        }
    }
};
</script>
