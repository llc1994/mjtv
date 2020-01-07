<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <!-- 轮播图 -->
        <Slide :AlbumRank="AlbumRank" :Banner="Banner" :Play="Play" />
        <div class="index-title">
            <div class="wrap">
                <nuxt-link target="_blank" to="parent-child" class="title">一年级</nuxt-link>
                <div class="section">
                    <div class="section">
                        <div class="pinyin">yī nián jí</div>
                        <div class="tag active">全部课程</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="media-area">
            <div class="wrap row">
                <nuxt-link target="_blank" :to="'play/' + item.itemId" class="media-type-7 col col-pc-1dot5 col-pad-2 col-mobile-6" v-for="(item, index) in ParentChildProgram.allAdvList" :key="index">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(/cover-grade.png)'
                            }"
                        >
                            <div class="tips">
                                {{ item.skipName }}
                            </div>
                        </div>
                        <div class="grade-area">
                            <div class="grade">一年级数学</div>
                            <div class="level">上册</div>
                        </div>
                        <div class="summary">
                            <div class="count">1234次</div>
                            <div class="type">人教版</div>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
        <!-- 二年级 -->
        <div class="index-title">
            <div class="wrap">
                <nuxt-link target="_blank" to="parent-child" class="title">二年级</nuxt-link>
                <div class="section">
                    <div class="section">
                        <div class="pinyin">yī nián jí</div>
                        <div class="tag active">全部课程</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="media-area">
            <div class="wrap row">
                <nuxt-link target="_blank" :to="'play/' + item.itemId" class="media-type-7 col col-pc-1dot5 col-pad-2 col-mobile-6" v-for="(item, index) in ParentChildProgram2.allAdvList" :key="index">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(/cover-grade.png)'
                            }"
                        >
                            <div class="tips">
                                {{ item.skipName }}
                            </div>
                        </div>
                        <div class="grade-area">
                            <div class="grade">一年级数学</div>
                            <div class="level">上册</div>
                        </div>
                        <div class="summary">
                            <div class="count">1234次</div>
                            <div class="type">人教版</div>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
        <!-- 三年级 -->
        <div class="index-title">
            <div class="wrap">
                <nuxt-link target="_blank" to="parent-child" class="title">三年级</nuxt-link>
                <div class="section">
                    <div class="section">
                        <div class="pinyin">yī nián jí</div>
                        <div class="tag active">全部课程</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="media-area">
            <div class="wrap row">
                <nuxt-link target="_blank" :to="'play/' + item.itemId" class="media-type-7 col col-pc-1dot5 col-pad-2 col-mobile-6" v-for="(item, index) in ParentChildProgram3.allAdvList" :key="index">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(/cover-grade.png)'
                            }"
                        >
                            <div class="tips">
                                {{ item.skipName }}
                            </div>
                        </div>
                        <div class="grade-area">
                            <div class="grade">一年级数学</div>
                            <div class="level">上册</div>
                        </div>
                        <div class="summary">
                            <div class="count">1234次</div>
                            <div class="type">人教版</div>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
        <!-- 四年级 -->
        <div class="index-title">
            <div class="wrap">
                <nuxt-link target="_blank" to="parent-child" class="title">四年级</nuxt-link>
                <div class="section">
                    <div class="section">
                        <div class="pinyin">yī nián jí</div>
                        <div class="tag active">全部课程</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="media-area">
            <div class="wrap row">
                <nuxt-link target="_blank" :to="'play/' + item.itemId" class="media-type-7 col col-pc-1dot5 col-pad-2 col-mobile-6" v-for="(item, index) in ParentChildProgram3.allAdvList" :key="index">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(/cover-grade.png)'
                            }"
                        >
                            <div class="tips">
                                {{ item.skipName }}
                            </div>
                        </div>
                        <div class="grade-area">
                            <div class="grade">一年级数学</div>
                            <div class="level">上册</div>
                        </div>
                        <div class="summary">
                            <div class="count">1234次</div>
                            <div class="type">人教版</div>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
        <!-- 五年级 -->
        <div class="index-title">
            <div class="wrap">
                <nuxt-link target="_blank" to="parent-child" class="title">五年级</nuxt-link>
                <div class="section">
                    <div class="section">
                        <div class="pinyin">yī nián jí</div>
                        <div class="tag active">全部课程</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="media-area">
            <div class="wrap row">
                <nuxt-link target="_blank" :to="'play/' + item.itemId" class="media-type-7 col col-pc-1dot5 col-pad-2 col-mobile-6" v-for="(item, index) in ParentChildProgram3.allAdvList" :key="index">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(/cover-grade.png)'
                            }"
                        >
                            <div class="tips">
                                {{ item.skipName }}
                            </div>
                        </div>
                        <div class="grade-area">
                            <div class="grade">一年级数学</div>
                            <div class="level">上册</div>
                        </div>
                        <div class="summary">
                            <div class="count">1234次</div>
                            <div class="type">人教版</div>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
        <!-- 六年级 -->
        <div class="index-title">
            <div class="wrap">
                <nuxt-link target="_blank" to="parent-child" class="title">六年级</nuxt-link>
                <div class="section">
                    <div class="section">
                        <div class="pinyin">yī nián jí</div>
                        <div class="tag active">全部课程</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="media-area">
            <div class="wrap row">
                <nuxt-link target="_blank" :to="'play/' + item.itemId" class="media-type-7 col col-pc-1dot5 col-pad-2 col-mobile-6" v-for="(item, index) in ParentChildProgram3.allAdvList" :key="index">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(/cover-grade.png)'
                            }"
                        >
                            <div class="tips">
                                {{ item.skipName }}
                            </div>
                        </div>
                        <div class="grade-area">
                            <div class="grade">一年级数学</div>
                            <div class="level">上册</div>
                        </div>
                        <div class="summary">
                            <div class="count">1234次</div>
                            <div class="type">人教版</div>
                        </div>
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
import Footer from '~/components/Footer.vue';
import Slide from '~/components/Slide.vue';
import Subject from '~/components/Subject.vue';
import axios from 'axios';
export default {
    data() {
        return {
            isNav: 'maifen-classroom',
            Play: 'play',
            toperParams: {
                backgroundColor: 'white',
                category: 'maiji-classroom'
            }
        };
    },
    components: {
        Toper,
        Slide,
        Subject,
        Footer
    },
    async asyncData(context) {
        let res = {};
        // Banner图
        let Banner = await axios.post(context.app.$domain + '/mkt/getRecObjectList', {
            pageNum: '1',
            pageSize: '7',
            recPosition: '52e4dc6b035a403f87df18a5517aeaf7'
        });
        res.Banner = Banner.data.body;
        // 排行榜
        res.AlbumRank = await that.$getRecObjectList({
            pageNum: 1,
            pageSize: 7,
            recPosition: 'b5788f0d25bd41d8a9402f1cf94e5b7e'
        });

        let ParentChildProgram = await axios.post(context.app.$domain + '/mkt/getRecObjectList', {
            pageSize: 8,
            pageNum: 1,
            recPosition: 'cccd584aa108408a866aae2e4b4b1c85'
        });
        res.ParentChildProgram = ParentChildProgram.data.body;
        // ---------------------------------------------------
        let ParentChildProgram2 = await axios.post(context.app.$domain + '/mkt/getRecObjectList', {
            pageSize: 8,
            pageNum: 1,
            recPosition: 'cccd584aa108408a866aae2e4b4b1c85'
        });
        res.ParentChildProgram2 = ParentChildProgram2.data.body;
        // ---------------------------------------------------
        let ParentChildProgram3 = await axios.post(context.app.$domain + '/mkt/getRecObjectList', {
            pageSize: 8,
            pageNum: 1,
            recPosition: 'cccd584aa108408a866aae2e4b4b1c85'
        });
        res.ParentChildProgram3 = ParentChildProgram3.data.body;
        // ---------------------------------------------------
        let ParentChildProgram4 = await axios.post(context.app.$domain + '/mkt/getRecObjectList', {
            pageSize: 8,
            pageNum: 1,
            recPosition: 'cccd584aa108408a866aae2e4b4b1c85'
        });
        res.ParentChildProgram4 = ParentChildProgram4.data.body;
        // ---------------------------------------------------
        let ParentChildProgram5 = await axios.post(context.app.$domain + '/mkt/getRecObjectList', {
            pageSize: 8,
            pageNum: 1,
            recPosition: 'cccd584aa108408a866aae2e4b4b1c85'
        });
        res.ParentChildProgram5 = ParentChildProgram5.data.body;
        // ---------------------------------------------------
        let ParentChildProgram6 = await axios.post(context.app.$domain + '/mkt/getRecObjectList', {
            pageSize: 8,
            pageNum: 1,
            recPosition: 'cccd584aa108408a866aae2e4b4b1c85'
        });
        res.ParentChildProgram6 = ParentChildProgram6.data.body;
        // ---------------------------------------------------
        let ParentChildProgram7 = await axios.post(context.app.$domain + '/mkt/getRecObjectList', {
            pageSize: 8,
            pageNum: 1,
            recPosition: 'cccd584aa108408a866aae2e4b4b1c85'
        });
        res.ParentChildProgram7 = ParentChildProgram7.data.body;
        return res;
    }
};
</script>
