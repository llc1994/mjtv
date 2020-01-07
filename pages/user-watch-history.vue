<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <div class="user-center">
            <div class="wrap">
                <!-- 用户左侧面板 -->
                <UserMenu :menu="menu" />
                <div class="main">
                    <template v-if="videos.length <= 0">
                        <img src="/list-holder.video.png" style="display: block;margin: auto; margin-top: 100px;" />
                    </template>
                    <template v-else>
                        <div class="media-area row">
                            <nuxt-link target="_blank" :to="item.playAddress" class="media-type-1 no-swiper col col-pc-2 col-pad-3 col-mobile-6" v-for="(item, index) in videos" :key="index">
                                <div class="inner-wrap">
                                    <div
                                        class="cover"
                                        :style="{
                                            backgroundImage: 'url(' + item.alyUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="name">{{ item.descript }}</div>
                                    <div class="summary">{{ item.title }}</div>
                                </div>
                            </nuxt-link>
                        </div>
                        <div class="maiji-page">
                            <div class="start" @click="pageStart">第一页</div>
                            <div class="prev" @click="pagePrev">上一页</div>
                            <!-- <div class="num" :class="{active:item === page.curr}" v-for="(item,index) in page.list" :key="index" @click="pageNum(item)">{{item}}</div> -->
                            <div class="num">{{ page.curr }}</div>
                            <div class="next" @click="pageNext">下一页</div>
                            <div class="end" @click="pageEnd">最后一页</div>
                            <div class="total">共{{ page.pageCount }}页</div>
                        </div>
                    </template>
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
                category: ''
            },
            menu: {
                isActive: 'user-watch-history'
            },
            videos: []
        };
    },
    components: {
        Toper,
        Slide,
        Subject,
        Footer,
        UserMenu
    },
    watch: {
        'page.curr': {
            handler() {
                this.playHistory();
            },
            deep: true
        }
    },
    async asyncData(context) {
        let that = context.app;
        let res = {};
        let playWay = ['/play/', '/play-ment/', '/play-course/', '/play-course/'];
        let pageSize = 30;

        // 0.麦咭TV 1.萌娃秀 2 麦粉学堂 3 在线课堂
        let reply = await that.$playHistory({
            pageNum: 1,
            pageSize: pageSize
        });
        reply.videos.forEach(function(item) {
            item.playAddress = playWay[item.type] + item.videoId;
        });
        res.videos = reply.videos;
        // 分页相关
        let pageLimit = 1;
        let pageCount = reply.pageCount;
        let list = [];

        for (let i = 1; i <= pageCount; i++) {
            if (i > pageLimit) {
                break;
            } else {
                list.push(i);
            }
        }
        // 分页参数
        res.page = {
            pageSize: pageSize,
            pageLimit: pageLimit,
            pageCount: pageCount,
            curr: 1,
            list: list
        };
        return res;
    },
    methods: {
        // 浏览记录查询函数
        async playHistory() {
            let playWay = ['/play/', '/play-ment/', '/play-course/', '/play-course/'];
            let reply = await this.$playHistory({
                pageNum: this.page.curr,
                pageSize: this.page.pageSize
            });
            reply.videos.forEach(function(item) {
                item.playAddress = playWay[item.type] + item.videoId;
            });
            this.videos = reply.videos;
        },
        // 跳转到第一页
        pageStart() {
            this.page.curr = 1;
        },
        // 跳转到下一页
        pageNext() {
            if (this.page.curr >= this.page.pageCount) return;
            this.page.curr += 1;
        },
        // 跳转到上一页
        pagePrev() {
            if (this.page.curr <= 1) return;
            this.page.curr -= 1;
        },
        // 跳转到最后一页
        pageEnd() {
            this.page.curr = this.page.pageCount;
        }
    }
};
</script>
