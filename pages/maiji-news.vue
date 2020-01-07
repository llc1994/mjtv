<template>
    <div>
        <Toper :toperParams="toperParams" />
        <SubToper />
        <div class="main-section">
            <div class="location">
                <i class="home"></i>
                <nuxt-link to="/maiji-news">麦咭资讯</nuxt-link>
            </div>
            <div class="news-container">
                <div class="main2">
                    <div class="line" v-for="(item,index) in allNews.allInfList" :key="index">
                        <div class="box" v-for="(item2,index2) in item.infIntros" :key="index2">
                            <nuxt-link :to="'/news/' + item2.id" class="img">
                                <img :src="item2.resUrl">
                            </nuxt-link>
                            <div class="info">
                                <nuxt-link :to="'/news/' + item2.id" class="title">
                                    {{item2.title}}
                                </nuxt-link>
                                <div class="summary"></div>
                                <div class="tag">
                                    <span>更新时间：{{item2.upDate}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="side">
                    <SideSection :MageeHead="HeadInfo" />
                    <SideSection2 :MageeHead="LifeInfo" />
                    <SideSection2 :MageeHead="EduInfo" />
                    <SideSection2 :MageeHead="ChiInfo" />
                </div>
            </div>

            <!-- 底部 -->
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
    methods: {
        toTop() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        GetTypeName(type) {
            if (type == 'MAGEE_TOP') return '';
            if (type == 'EDU') return '教育';
            if (type == 'CHI') return '育儿';
            if (type == 'LIFE') return '生活';
        }
    },
    async asyncData(context) {
        let that = context.app;
        let res = {};
        let id = context.params.id;

         res.allNews = await that.$getAllToplineInfList({
            program:"MAGEE_HEAD_LINE",
            status:"1"
        });

        // 头条接口
        let HeadInfo = await axios.post(context.app.$domain + '/mkt/getAllToplineInfList', {
            status: '1',
            pageSize: '20',
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
            pageSize: '20',
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
            pageSize: '20',
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
            pageSize: '20',
            program: 'MAGEE_HEAD_LINE',
            pageNum: '1'
        });
        // headInfo.data.body.allInfList.forEach(function(item, index) {
        //     item.active = false;
        // });
        res.ChiInfo = ChiInfo.data.body;
        res.ChiInfo.headTitle = '育儿';

        return res;
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
    .news-container {
        width: 1200px;
        margin: auto;

        overflow: hidden;
        zoom: 1;
        .main2 {
            float: left;
            width: 880px;
            box-sizing: border-box;
            .line{
                height: 160px;
                padding: 10px;
                background-color: #fff;
                margin-bottom: 10px;

                .box{
                    display: flex;

                }
                .img{
                    flex: 0 0 140px;
                    max-width: 140px;
                    img{
                        height: 140px;
                        width: 140px;
                    }
                }
                .info{
                    flex: 1 1 100%;
                    padding-left: 10px;
                    .title{
                        height: 30px;
                        font-size: 20px;
                        font-weight: bold;
                        color: #333;
                    }
                    .summary{
                        height: 90px;
                        line-height: 20px;
                        padding: 5px 0;
                    }
                    .tag{
                        height: 20px;
                        font-size: 14px;
                        color: #999;
                    }
                }
            }
        }
        .side {
            width: 300px;
            float: right;
        }
    }
}
</style>