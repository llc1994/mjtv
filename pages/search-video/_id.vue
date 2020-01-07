<template>
    <div class="search-container">
        <Toper :toperParams="toperParams" :keyword="keyword" />
        <div class="main-section">
            <div class="search-info">搜索 “{{ Keyword }}”, 共找到 {{ SearchResult.videoCount }} 个结果</div>
            <div class="main">
                <div class="result">
                    <template v-if="!SearchResult.videos.length && !SearchResult.programs.length">
                        <img src="/list-holder.jpg" style="display: block;margin: auto; margin-top: 100px;" />
                    </template>
                    <template v-if="(SearchResult.programs && SearchResult.programs.length) || SearchResult.videos">
                        <div class="program-list">
                            <div class="program" v-for="(Program, programIndex) in SearchResult.programs" :key="programIndex">
                                <nuxt-link class="cover" target="_blank" :to="'/play/' + Program.actId">
                                    <img :src="Program.imageUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90'" />
                                </nuxt-link>
                                <div class="info">
                                    <nuxt-link target="_blank" :to="'/play/' + Program.actId" class="title">{{ Program.programName }}</nuxt-link>
                                    <span class="description">
                                        {{ Program.description }}
                                    </span>
                                    <div class="season-list">
                                        <span v-for="(Season, index) in Program.groups" :key="index">{{ Season.groupName }}</span>
                                    </div>
                                    <div class="episode-list" v-for="(Season, index) in Program.groups" :key="index" style="display: none;">
                                        <nuxt-link :to="'/play/' + Episode.itemId" v-for="(Episode, index) in Season.videos" :title="Episode.title" :key="index" target="_blank">{{ Episode.episode || Episode.title }}</nuxt-link>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="video-list">
                            <div class="video" v-for="(Episode, index) in SearchResult.videos" :key="index">
                                <nuxt-link :to="'/play/' + Episode.itemId" class="cover" target="_blank">
                                    <img :src="Episode.alyUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90'" />
                                </nuxt-link>
                                <div class="info">
                                    <nuxt-link :to="'/play/' + Episode.itemId" class="title" :title="Episode.title" target="_blank">{{ Episode.title }}</nuxt-link>
                                    <span class="description">{{ Episode.descript }}</span>
                                    <em class="date">{{ Episode.date }}</em>
                                </div>
                            </div>
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
                <div class="hot-search">
                    <h1>热搜排行榜</h1>
                    <div class="rank-list">
                        <ul>
                            <li v-for="(item, index) in RankList" :key="index">
                                <span>{{ item.order }}</span>
                                <nuxt-link target="_blank" :to="'/search-video/' + encodeURIComponent(item.title)">{{ item.title }}</nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    </div>
</template>
<script>
import Toper from '~/components/Toper.vue';
import Footer from '~/components/Footer.vue';
import axios from 'axios';
export default {
    data() {
        return {
            toperParams: {
                backgroundColor: 'white',
                category: ''
            },
            keyword: ''
        };
    },
    components: {
        Toper,
        Footer
    },
    watch: {
        'page.curr': {
            handler() {
                this.search();
            },
            deep: true
        }
    },
    async asyncData(context) {
        let that = context.app;
        let res = {};
        let pageSize = 30;
        res.Keyword = context.params.id;
        let rankList = await axios.post('http://mengdata.maijimaiji.cn/mkt/searchHot');

        res.RankList = rankList.data.body.hots;

        let searchResult = await that.$search({
            condition: res.Keyword,
            pageNum: 1,
            pageSize: 30
        });
        searchResult.programs.forEach(item => {
            item.actId = item.groups[0].videos[0].itemId;
        });
        res.SearchResult = searchResult;
        // 分页相关
        let pageLimit = 1;
        let pageCount = searchResult.pageCount;
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
        async search() {
            let SearchResult = await this.$search({
                condition: this.Keyword,
                pageNum: this.page.curr,
                pageSize: this.page.pageSize
            });
            SearchResult.programs = !SearchResult.programs ? [] : SearchResult.programs;
            this.SearchResult = SearchResult;
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
    },
    mounted() {
        $('.season-list').each(function() {
            let that = $(this);
            let span = that.find('span');
            span.click(function() {
                let that = $(this);
                let index = that.index();
                let episode = that.parents('.info').find('.episode-list');
                episode.hide();
                episode.eq(index).show();
                that.parent()
                    .find('span')
                    .removeClass('current');
                that.addClass('current');
            });
            span.eq(0).click();
        });
        $('.episode-list').each(function() {
            let that = $(this);
            that.find('span').click(function() {
                that.toggleClass('expand');
            });
            if (that.find('a').length <= 9) {
                that.find('span').hide();
            }
        });
    }
};
</script>
<style lang="scss" scoped>
.search-container {
    .main-section {
        width: 1200px;
        margin: auto;
        .search-info {
            border-bottom: solid 1px #f1f1f1;
            font-size: 18px;
            padding: 20px 0;
            color: #999;
        }
        .main {
            display: flex;
            .result {
                width: 840px;
                margin-right: auto;
                padding: 20px 0 0 0;
                h1 {
                    font-size: 32px;
                    color: #333;
                    font-weight: normal;
                    margin-bottom: 20px;
                }
                .program-list {
                    .program {
                        display: flex;
                        margin-bottom: 20px;
                        padding-bottom: 20px;
                        border-bottom: solid 1px #f1f1f1;
                        .cover {
                            width: 260px;
                            flex-grow: 0;
                            flex-shrink: 0;
                            margin-right: 40px;

                            img {
                                width: 100%;
                                object-fit: contain;
                                object-position: top;
                                border-radius: 10px;
                            }
                        }
                        .info {
                            .title {
                                color: #2e2e2e;
                                font-size: 22px;
                                display: block;
                                margin-bottom: 20px;
                            }
                            .description {
                                font-size: 14px;
                                color: #333;
                                display: block;
                                margin-bottom: 20px;
                            }
                            .season-list {
                                display: flex;
                                flex-wrap: wrap;
                                margin-bottom: 20px;

                                span {
                                    padding: 4px 20px;
                                    box-sizing: border-box;
                                    min-width: 40px;
                                    text-align: center;
                                    background: #ececec;
                                    color: #999999;
                                    margin-right: 10px;
                                    margin-bottom: 10px;
                                    border-radius: 4px;
                                    font-size: 14px;
                                    &:hover {
                                        background: #00adef;
                                        color: #fff;
                                        cursor: pointer;
                                    }
                                    &.current {
                                        background: #00adef;
                                        color: #fff;
                                        font-weight: bold;
                                    }
                                }
                            }
                            .episode-list {
                                display: flex;
                                flex-wrap: wrap;
                                a,
                                span {
                                    padding: 10px 10px;
                                    line-height: 20px;
                                    height: 40px;
                                    box-sizing: border-box;
                                    min-width: 40px;
                                    text-align: center;
                                    background: #ececec;
                                    color: #999999;
                                    margin-right: 10px;
                                    margin-bottom: 10px;
                                    border-radius: 4px;
                                    font-size: 14px;
                                    &:hover {
                                        background: #00adef;
                                        color: #fff;
                                    }
                                }
                                a {
                                    &:nth-child(n + 10) {
                                        display: none;
                                    }
                                }
                                &.expand {
                                    a {
                                        display: block;
                                    }
                                    span {
                                        &:before {
                                            content: '收起';
                                        }
                                    }
                                }
                                span {
                                    background: transparent;
                                    color: #00adef;
                                    &:hover {
                                        cursor: pointer;
                                        background: transparent;
                                        text-decoration: underline;
                                        color: #00adef;
                                    }
                                    &:before {
                                        content: '展开更多';
                                    }
                                }
                            }
                        }
                    }
                }
                .video-list {
                    .video {
                        display: flex;
                        margin-bottom: 20px;
                        padding-bottom: 20px;
                        border-bottom: solid 1px #f1f1f1;
                        .cover {
                            width: 260px;
                            height: 150px;
                            flex-grow: 0;
                            flex-shrink: 0;
                            margin-right: 40px;
                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                border-radius: 10px;
                            }
                        }
                        .info {
                            .title {
                                color: #2e2e2e;
                                font-size: 22px;
                                display: block;
                                margin-bottom: 20px;
                            }
                            .description {
                                font-size: 14px;
                                color: #333;
                                display: block;
                                margin-bottom: 40px;
                            }
                            .date {
                                display: block;
                                color: #999999;
                                font-style: normal;
                            }
                        }
                    }
                }
            }
            .hot-search {
                width: 300px;
                padding: 20px 0 0 0;
                h1 {
                    font-size: 32px;
                    color: #333;
                    font-weight: normal;
                    margin-bottom: 20px;
                }
                .rank-list {
                    background: #f8f8f8;
                    padding: 30px;
                    ul {
                        list-style-type: none;
                        margin: 0;
                        padding: 0;
                        li {
                            margin: 0;
                            padding: 0;
                            margin-bottom: 20px;
                            display: flex;
                            span {
                                background: #00adef;
                                color: #fff;
                                padding: 5px 0;
                                width: 30px;
                                text-align: center;
                                margin-right: 10px;
                                flex-shrink: 0;
                                flex-grow: 0;
                                border-radius: 5px;
                            }
                            a {
                                font-size: 16px;
                                color: #000;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                            }
                            &:nth-child(n + 4) {
                                span {
                                    background: #cccccc;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
