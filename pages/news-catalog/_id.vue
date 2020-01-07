<template>
    <div>
        <Toper :toperParams="toperParams" />
        <SubToper />
        <div class="main-section">
            <div class="location">
                <i class="home"></i>
                <nuxt-link to="/news-catalog/all">麦咭资讯</nuxt-link>
                &gt;
                <a href="" v-text="GetTypeName(catalogId)"></a>
            </div>
            <div class="news-list-container">
                <div class="main">
                    <div class="news-list">
                        <nuxt-link :to="'/news/' + news.id" class="news" v-for="(news, index) in NewsList" target="_blank" :key="index">
                            <img :src="news.resUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90'" />
                            <div class="misc">
                                <strong>
                                    <em :class="news.type" v-text="GetTypeName(news.type)" v-show="news.type !== 'MAGEE_TOP'"></em>
                                    {{ news.title }}
                                </strong>
                                <span>
                                    {{ news.title }}
                                    <!--接口中缺少纯文本的概述字段, 暂时用 title 代替-->
                                </span>
                                <em>{{ news.upDate }}</em>
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
                </div>
                <div class="side">
                    <SideSection v-if="!(GetTypeName(catalogId) == '麦咭头条')" :MageeHead="HeadInfo" />
                    <SideSection2 v-if="!(GetTypeName(catalogId) == '生活')" :MageeHead="LifeInfo" />
                    <SideSection2 v-if="!(GetTypeName(catalogId) == '教育')" :MageeHead="EduInfo" />
                    <SideSection2 v-if="!(GetTypeName(catalogId) == '育儿')" :MageeHead="ChiInfo" />
                </div>
            </div>
            <Footer />
        </div>
    </div>
</template>

<script>
import Toper from '~/components/Toper.vue';
import SubToper from '~/components/SubToper.vue';
import Footer from '~/components/Footer.vue';
import SideSection from '~/components/News/SideSection.vue';
import SideSection2 from '~/components/News/SideSection2.vue';
import axios from 'axios';

export default {
    data() {
        return {
            toperParams: {
                backgroundColor: 'white',
                category: 'parent-child'
            },
            player: null
        };
    },
    components: {
        Toper,
        SubToper,
        Footer,
        SideSection,
        SideSection2
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
        let that = context.app
        let res = {};
        let id = context.params.id;
        let pageSize = 10;
        let params = {}
        if(id === 'all'){
            params = {
                status: 1,
                pageSize: 10,
                program: 'MAGEE_HEAD_LINE',
                pageNum: 1
            }
        }else{
            params = {
                status: 1,
                type: id,
                pageSize: 10,
                program: 'MAGEE_HEAD_LINE',
                pageNum: 1
            }
        }
        let news = await axios.post(that.$domain + '/mkt/getMktInfListByType', params);
        res.NewsList = news.data.body.allInfList;
        // 分页相关
        let pageLimit = 1;
        let pageCount = news.data.body.pageCount;
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
        res.catalogId = id;
        // 头条接口
        let HeadInfo = await axios.post(context.app.$domain + '/mkt/getAllToplineInfList', {
            status: '1',
            pageSize: '10',
            program: 'MAGEE_HEAD_LINE',
            pageNum: '1'
        });
        // headInfo.data.body.allInfList.forEach(function(item, index) {
        //     item.active = false;
        // });
        res.HeadInfo = HeadInfo.data.body;
        res.HeadInfo.headTitle = '麦咭头条';

        // 生活接口
        let LifeInfo = await axios.post(context.app.$domain + '/mkt/getMktInfListByType', {
            status: '1',
            type: 'LIFE',
            pageSize: '10',
            program: 'MAGEE_HEAD_LINE',
            pageNum: '1'
        });
        // headInfo.data.body.allInfList.forEach(function(item, index) {
        //     item.active = false;
        // });
        res.LifeInfo = LifeInfo.data.body;
        res.LifeInfo.headTitle = '生活';

        // 教育接口
        let EduInfo = await axios.post(context.app.$domain + '/mkt/getMktInfListByType', {
            status: '1',
            type: 'EDU',
            pageSize: '10',
            program: 'MAGEE_HEAD_LINE',
            pageNum: '1'
        });
        // headInfo.data.body.allInfList.forEach(function(item, index) {
        //     item.active = false;
        // });
        res.EduInfo = EduInfo.data.body;
        res.EduInfo.headTitle = '教育';

        // 育儿 接口
        let ChiInfo = await axios.post(context.app.$domain + '/mkt/getMktInfListByType', {
            status: '1',
            type: 'CHI',
            pageSize: '10',
            program: 'MAGEE_HEAD_LINE',
            pageNum: '1'
        });
        // headInfo.data.body.allInfList.forEach(function(item, index) {
        //     item.active = false;
        // });
        res.ChiInfo = ChiInfo.data.body;
        res.ChiInfo.headTitle = '育儿';

        return res;
    },
    methods: {
        GetTypeName(type) {
            if (type == 'MAGEE_TOP') return '头条';
            if (type == 'EDU') return '教育';
            if (type == 'CHI') return '育儿';
            if (type == 'LIFE') return '生活';
            if (type == 'all') return '全部';
        },
        // 浏览记录查询函数
        async search() {
            let news = await axios.post(that.$domain + '/mkt/getMktInfListByType', {
                status: 1,
                type: this.catalogId,
                pageSize: this.page.pageSize,
                program: 'MAGEE_HEAD_LINE',
                pageNum: this.page.curr
            });
            this.NewsList = news.data.body.allInfList;
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

<style lang="scss">
.main-section {
    background: #f8f8f8;
    .location {
        width: 1200px;
        margin: auto;
        padding: 30px 0;
        font-size: 16px;
        color: #101d2a;
    }
    .news-list-container {
        width: 1200px;
        margin: auto;

        overflow: hidden;
        zoom: 1;
        .main {
            float: left;
            width: 880px;
            background: #fff;
            box-sizing: border-box;
            padding: 40px;

            .news-list {
                .news {
                    display: flex;
                    margin-bottom: 20px;
                    padding-bottom: 20px;
                    border-bottom: solid 1px #ececec;

                    img {
                        width: 180px;
                        min-width: 180px;
                        height: 180px;
                        object-fit: cover;
                        margin-right: 20px;
                    }
                    .misc {
                        strong {
                            display: block;
                            font-size: 16px;
                            margin-bottom: 10px;
                            em {
                                background: #00adef;
                                color: #fff;
                                font-size: 12px;
                                font-style: normal;
                                padding: 2px 8px;
                                border-radius: 8px;
                                font-weight: normal;
                                margin-right: 10px;

                                &.CHI {
                                    background: #ef9200;
                                }

                                &.LIFE {
                                    background: #fdd000;
                                }

                                &.EDU {
                                    background: #1aa203;
                                }
                            }
                        }
                        span {
                            font-size: 14px;
                            color: #999999;
                            text-align: justify;
                            margin-bottom: 20px;
                            display: block;
                            line-height: 22px;
                            max-height: 66px;
                        }
                        & > em {
                            color: #999999;
                            font-size: 12px;
                            font-style: normal;
                            display: block;
                        }
                    }
                }
            }
            .pager {
            }
        }
        .side {
            width: 300px;
            float: right;
        }
    }
}
</style>
