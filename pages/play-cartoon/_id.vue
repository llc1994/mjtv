<template>
    <div class="container">
        <!-- 顶部导航 -->
        <Toper :toperParams="toperParams"  ref="toper"/>

        <!-- 顶部 - 子导航 -->
        <!-- <SubToper :APG="APG" /> -->

        <!-- 播放区域 -->
        <div class="player-area">
            <div class="wrap">
                <!-- 播放盒子 -->
                <div class="player-box">
                    <div class="prism-player" id="player-con"></div>
                </div>

                <!-- 右侧播放列表 -->
                <div class="player-list">
                    <div class="title">{{ ActProgramInfo.name }}</div>
                    <div class="sub-title">{{ VideoInfo.title }}</div>
                    <!-- 季播盒子 -->
                    <div class="ji-box fx">
                        <div class="ji-wrap" :class="{ active: item.active === true }" v-for="(item, index) in SeasonPlayer" :key="index" @click="SwitchSeason(item, index)">
                            <span class="ji" >第{{ item.markSort }}季</span>
                        </div>
                    </div>
                    <!-- <div class="ji-box">
                        <span class="ji" :class="{ active: item.active === true }" v-for="(item, index) in SeasonPlayer" :key="index" @click="SwitchSeason(item, index)">第{{ item.markSort }}季</span>
                    </div> -->
                    <!-- 集 -->
                    <div class="unit-box custom-scroll">
                        <div :to="'/play/' + item.id" class="unit" :class="{ active: item.active === true }" v-for="(item, index) in DramaLists.resItems" :key="index" @click="PlayJi(item)">
                            <span>{{ item.index }}</span>
                            <div class="vip-unit">vip</div>
                        </div>
                    </div>
                    <!-- 推荐区域 -->
                    <div class="recommand-area custom-scroll">
                        <div class="box" :class="{ active: item.active === true }" v-for="(item, index) in RecommendLists.resItems" :key="index" @click="PlayOneVideo(item, index)">
                            <div
                                class="img"
                                :style="{
                                    backgroundImage: 'url(' + item.alyUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                }"
                            ></div>
                            <div class="info">
                                <div class="title">{{ item.title }}</div>
                                <div class="summary">
                                    {{ item.descript }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 专辑的id作为推荐位查 -->
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
                        <span v-if="Favorited === true">已收藏</span>
                        <span v-if="Favorited === false">收藏</span>
                    </div>
                </div>
                <div class="profile-box">
                    {{ ActProgramInfo.intro }}
                </div>
            </div>
        </div>

        <!-- 两栏区 -->
        <div class="media-area">
            <div class="wrap row">
                <a target="_blank" :href="item.to" :to="'/play-cartoon/' + item.itemId" class="media-type-4  col col-pc-6 col-pad-6 col-mobile-12" v-for="(item, index) in HotActive.allAdvList" :key="index">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                            }"
                        ></div>
                    </div>
                </a>
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
                <nuxt-link target="_blank" :to="'/play/' + item.id" class="media-type-1  no-swiper col col-pc-6 col-pad-6 col-mobile-12" v-for="(item, index) in EveryDayWatch.list" :key="index">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(' + item.alyUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                            }"
                        ></div>
                        <div class="name">{{ item.title }}</div>
                        <div class="summary">{{ item.descript }}</div>
                    </div>
                </nuxt-link>
            </div>
        </div>

        <!-- 底部 -->
        <Footer />
    </div>
</template>
<script>
import Toper from '~/components/Toper.vue';
import SubToper from '~/components/SubToper.vue';
import Footer from '~/components/Footer.vue';
import Slide from '~/components/Slide.vue';
import Subject from '~/components/Subject.vue';
import axios from 'axios';
import _ from 'lodash';
export default {
    data() {
        return {
            toperParams: {
                backgroundColor: 'white',
                category: 'anime-cartoon'
            },
            // 播放器实例
            player: null,
            // 当前季
            currentSeason: 0,
            // 下一季
            nextSeason: 0,
            // 当前集
            currentJi: 0,
            // 已收藏
            Favorited: false
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
        // 代理app，同客户端
        var that = context.app;
        // 要导出的对象
        let res = {};

        // 参数前缀
        let prefixParams = context.params.id.substring(0, 3);

        // 如果是节目
        if (prefixParams === 'APG') {
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

            // 排除没有集数的正片
            res.DramaLists.resItems = res.DramaLists.resItems.filter(function(item) {
                return item.episode !== null;
            });
            // 默认当前集高亮
            if (_.isArray(res.DramaLists.resItems)) {
                res.DramaLists.resItems.forEach(function(item, index) {
                    index = index + 1;
                    item.index = index > 9 ? index : '0' + index;
                    if (item.id === res.DramaLists.resItems[0].id) {
                        item.active = true;
                    } else {
                        item.active = false;
                    }
                });
            }

            // 剧集详情
            // ------------------------------------------------------------
            res.VideoInfo = await that.$queryResItemDetail({
                resId: res.DramaLists.resItems[0].id
            });

            // 查询地址
            // ------------------------------------------------------------
            // res.VideoAddress = await that.$getPlayAddressList({
            //     videoId: res.VideoInfo.alyId,
            // });
            res.PlaySecret = await that.$getVideoPlayAuth({
                videoId: res.VideoInfo.alyId
            });

            // 调用推荐视频列表
            let RecommendLists = await axios.post(context.app.$domain + '/common/queryResItems', {
                bundleId: res.ActProgramInfo.tvBundleId,
                isDownSort: false,
                pageNum: 1,
                pageSize: 10,
                markSort: 1
            });
            RecommendLists.data.body.resItems.forEach(function(item) {
                item.active = false;
            });
            res.RecommendLists = RecommendLists.data.body;
        }
        // 如果是视频
        if (prefixParams === 'res') {
            // 查询视频详情
            // ------------------------------------------------------------
            res.VideoInfo = await that.$queryResItemDetail({
                resId: context.params.id
            });

            // 查询地址
            // ------------------------------------------------------------
            // res.VideoAddress = await that.$getPlayAddressList({
            //     videoId: res.VideoInfo.alyId,
            // });
            res.PlaySecret = await that.$getVideoPlayAuth({
                videoId: res.VideoInfo.alyId
            });

            // --------------------------------------------------
            // 高亮动漫卡通导航
            res.APG = res.VideoInfo.businessKey;

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
                    index = index + 1;
                    item.index = index > 9 ? index : '0' + index;
                    if (item.id === res.VideoInfo.id) {
                        item.active = true;
                    } else {
                        item.active = false;
                    }
                });
            }

            // ------------------------------------------
            // 调用推荐视频列表
            let RecommendLists = await axios.post(context.app.$domain + '/common/queryResItems', {
                bundleId: res.ActProgramInfo.tvBundleId,
                isDownSort: false,
                pageSize: 10,
                markSort: res.VideoInfo.markSort
            });
            if (RecommendLists.data && RecommendLists.data.msgCd === that.$msgCode.success && RecommendLists.data.body !== undefined) {
                RecommendLists.data.body.resItems.forEach(function(item) {
                    item.active = false;
                });
                res.RecommendLists = RecommendLists.data.body;
            } else {
                res.RecommendLists = {};
            }

            // 评论列表
            // let commentLists = await axios({
            //     url:
            //         context.app.$domain +
            //         "/act/actProgramComment/getCommentList",
            //     method: "post",
            //     headers: {
            //         token: context.store.state.session.token || ""
            //     },
            //     data: {
            //         pageSize: 30,
            //         pageNum: 1,
            //         id: VideoInfo.data.body.businessKey,
            //         resItemId: DramaLists[0].id,
            //         userId: context.store.state.session.userId
            //     }
            // });
            // commentLists.data.body.list.forEach(function(item) {
            //     if (!item.userIcon) {
            //         // item.userIcon = "/default-head-thumbnail.png";
            //     }
            // });
            // res.commentLists = commentLists.data.body;
        }

        // 节目互动
        res.HotActive = await that.$getRecObjectList({
            pageSize: 2,
            pageNum: 1,
            recPosition: '09b8ddd225354ea1bb5b7d61d1f28440'
        });
        // createTime: null
        // customImgResid: "res.2c619aab4eb14940abb7e39702cdf1c7"
        // customImgUrl: "http://oss-maijitv.maijimeng.com/4e0a078b14d7435b98fa1c924d62cf56.png"
        // descript: ""
        // downDate: "2026-09-28 22:00:12"
        // extendedField1: "PNG"
        // extendedField2: ""
        // extendedField3: ""
        // extendedField4: ""
        // extendedField5: ""
        // id: "2467a3558ed24e2f8c9393004cbb2ed5"
        // imgUrl: ""
        // itemId: ""
        // modifyTime: null
        // platType: 2
        // positionCode: "PC_TV_BANNER"
        // program: "中部banner(播放页)"
        // recPosition: "09b8ddd225354ea1bb5b7d61d1f28440"
        // resourceId: ""
        // skipCode: "GLOBAL_OUTER_URL"
        // skipName: "外部URL"
        // skipType: "35eb8339f34b4531b7238a23b55f0418"
        // sort: "1"
        // tag: "https://www.maijimaiji.cn/Special/FengKuangDeMaiJi"
        // title: "《疯狂的麦咭》同步答题"
        // upDate: "2019-09-28 22:00:10"

        // 每天都在看
        // ------------------------------------------
        let EveryDayWatch = await axios.post(context.app.$domain + '/common/getOtherResBundleLastItems', {
            pageNum: 1,
            pageSize: 16,
            bundleId: 'res.f02873ac153149af82cac8749f54945d'
        });
        res.EveryDayWatch = EveryDayWatch.data.body;
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

        // 播放单个视频
        PlayOneVideo: async function(item, index) {
            let that = this;
            this.RecommendLists.resItems.forEach(function(item) {
                item.active = false;
            });
            item.active = true;

            // 清空季
            this.SeasonPlayer.forEach(function(item, index) {
                item.active = false;
            });

            // 清空集的选中
            this.DramaLists.resItems.forEach(function(item, index) {
                item.active = false;
            });

            // 视频信息
            // ------------------------------------------------------------
            this.VideoInfo = await that.$queryResItemDetail({
                resId: item.id
            });
            history.pushState(null,null,'/play-cartoon/' + this.VideoInfo.id)

            // 查询地址
            // ------------------------------------------------------------
            this.PlaySecret = await this.$getVideoPlayAuth({
                videoId: item.alyId
            });

            this.PlayBegin();
        },
        PlayBegin: function() {
            if (this.player) {
                this.player.dispose();
            }
            this.player = new Aliplayer(
                {
                    id: 'player-con',
                    // source: this.VideoAddress,
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
                    useH5Prism: true
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
        },
        // 播放集数
        PlayJi: async function(item) {
            var that = this;

            // 清空推荐
            this.RecommendLists.resItems.forEach(function(item) {
                item.active = false;
            });

            // 视频信息
            // ------------------------------------------------------------
            this.VideoInfo = await that.$queryResItemDetail({
                resId: item.id
            });
            history.pushState(null,null,'/play-cartoon/' + this.VideoInfo.id)

            // 查询地址
            // ------------------------------------------------------------
            // this.VideoAddress = await that.$getPlayAddressList({
            //     videoId: item.alyId,
            // });
            this.PlaySecret = await this.$getVideoPlayAuth({
                videoId: item.alyId
            });

            // 重载播放
            // this.player.loadByUrl(this.VideoAddress);
            this.PlayBegin();

            // 集数激活
            this.DramaLists.resItems.forEach(function(item, index) {
                item.active = false;
            });
            item.active = true;

            // 专辑信息
            // ------------------------------------------------------------
            this.ActProgramInfo = await that.$getActProgram({
                id: this.VideoInfo.businessKey
            });

            // 季播信息
            // ------------------------------------------------------------
            this.SeasonPlayer = await that.$queryMarkSortDetail({
                bundleId: this.ActProgramInfo.tvBundleId,
                seasonNumber: this.VideoInfo.markSort
            });

            // 当前季播高亮
            this.SeasonPlayer.forEach(function(item, index) {
                if (item.markSort === that.VideoInfo.markSort) {
                    item.active = true;
                }
                // index === 0 ? (item.active = true) : (item.active = false);
            });
        },
        // 切换季
        SwitchSeason: async function(item, index) {
            let that = this;
            this.RecommendLists.resItems.forEach(function(item) {
                item.active = false;
            });

            // 剧集信息
            // ------------------------------------------------------------
            this.DramaLists = await that.$queryResItems({
                bundleId: this.ActProgramInfo.tvBundleId,
                markSort: item.markSort
            });

            this.DramaLists.resItems.forEach(function(item, index) {
                index = index + 1;
                item.index = index > 9 ? index : '0' + index;
                index === 1 ? (item.active = true) : (item.active = false);
            });
            this.SeasonPlayer.forEach(function(item, index) {
                item.active = false;
            });
            this.SeasonPlayer[index].active = true;
        },
        submitComment2: async function() {
            location.href = 'https://www.maijimeng.com';
        }
    }
};
</script>
<style lang="scss">
    .unit{
        position: relative;
        >span{
            padding: 2px 1px !important;
        }
        .vip-unit{
            width: 26px;
            height: 20px;
            background-color: RGB(238,117,20);
            color: RGB(245,236,251);
            border-radius: 2px;
            text-align: center;
            line-height: 20px;
            margin-top: 2px;
        }
    }

</style>