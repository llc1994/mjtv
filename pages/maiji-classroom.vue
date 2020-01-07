<template>
    <div class="container">
        <!-- 顶部导航 -->
        <Toper :toperParams="toperParams" />

        <!-- 轮播图 -->
        <Slide :AlbumRank="AlbumRank" />

        <div class="media-area" style="margin:0 -9px;">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <nuxt-link to="/course-directory" class="title" target="_blank">一年级</nuxt-link>
                        <div class="section">
                            <div class="section">
                                <div class="pinyin">yī nián jí</div>
                                <nuxt-link to="/course-directory" class="tag active" target="_blank">全部课程</nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
                <nuxt-link :to="'/play-course/' + item.qualityRspDTOs_Object[7].id" class="media-type-7 col col-pc-1dot5 col-pad-2 col-mobile-6" v-for="(item, index) in grade1" :key="index" target="_blank">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(' + item.qualityRspDTOs_Object[5].url + ')'
                            }"
                        >
                            <div class="tips"></div>
                        </div>
                        <div class="grade-area">
                            <div class="grade">
                                {{ item.knowledgeName.split(' ')[0] }}
                            </div>
                            <div class="level">
                                {{ item.knowledgeName.split(' ')[1] }}
                            </div>
                        </div>
                        <div class="summary">
                            <div class="count"><img src="/play2.png" />{{ item.playNum }}次</div>
                            <div class="type">
                                {{ item.press }}
                            </div>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
        <!-- 二年级 -->

        <div class="media-area" style="margin:0 -9px;">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <nuxt-link to="/course-directory" class="title" target="_blank">二年级</nuxt-link>
                        <div class="section">
                            <div class="section">
                                <div class="pinyin">yī nián jí</div>
                                <nuxt-link to="/course-directory" class="tag active" target="_blank">全部课程</nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
                <nuxt-link :to="'/play-course/' + item.qualityRspDTOs_Object[7].id" class="media-type-7 col col-pc-1dot5 col-pad-2 col-mobile-6" v-for="(item, index) in grade2" :key="index" target="_blank">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(' + item.qualityRspDTOs_Object[5].url + ')'
                            }"
                        >
                            <div class="tips"></div>
                        </div>
                        <div class="grade-area">
                            <div class="grade">
                                {{ item.knowledgeName.split(' ')[0] }}
                            </div>
                            <div class="level">
                                {{ item.knowledgeName.split(' ')[1] }}
                            </div>
                        </div>
                        <div class="summary">
                            <div class="count"><img src="/play2.png" />{{ item.playNum }}次</div>
                            <div class="type">
                                {{ item.press }}
                            </div>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
        <!-- 三年级 -->

        <div class="media-area" style="margin:0 -9px;">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <nuxt-link to="/course-directory" class="title" target="_blank">三年级</nuxt-link>
                        <div class="section">
                            <div class="section">
                                <div class="pinyin">yī nián jí</div>
                                <nuxt-link to="/course-directory" class="tag active" target="_blank">全部课程</nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
                <nuxt-link :to="'/play-course/' + item.qualityRspDTOs_Object[7].id" class="media-type-7 col col-pc-1dot5 col-pad-2 col-mobile-6" v-for="(item, index) in grade3" :key="index" target="_blank">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(' + item.qualityRspDTOs_Object[5].url + ')'
                            }"
                        >
                            <div class="tips"></div>
                        </div>
                        <div class="grade-area">
                            <div class="grade">
                                {{ item.knowledgeName.split(' ')[0] }}
                            </div>
                            <div class="level">
                                {{ item.knowledgeName.split(' ')[1] }}
                            </div>
                        </div>
                        <div class="summary">
                            <div class="count"><img src="/play2.png" />{{ item.playNum }}次</div>
                            <div class="type">
                                {{ item.press }}
                            </div>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
        <!-- 四年级 -->

        <div class="media-area" style="margin:0 -9px;">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <nuxt-link to="/course-directory" class="title" target="_blank">四年级</nuxt-link>
                        <div class="section">
                            <div class="section">
                                <div class="pinyin">yī nián jí</div>
                                <nuxt-link to="/course-directory" class="tag active" target="_blank">全部课程</nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
                <nuxt-link :to="'/play-course/' + item.qualityRspDTOs_Object[7].id" class="media-type-7 col col-pc-1dot5 col-pad-2 col-mobile-6" v-for="(item, index) in grade4" :key="index" target="_blank">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(' + item.qualityRspDTOs_Object[5].url + ')'
                            }"
                        >
                            <div class="tips"></div>
                        </div>
                        <div class="grade-area">
                            <div class="grade">
                                {{ item.knowledgeName.split(' ')[0] }}
                            </div>
                            <div class="level">
                                {{ item.knowledgeName.split(' ')[1] }}
                            </div>
                        </div>
                        <div class="summary">
                            <div class="count"><img src="/play2.png" />{{ item.playNum }}次</div>
                            <div class="type">
                                {{ item.press }}
                            </div>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
        <!-- 五年级 -->

        <div class="media-area" style="margin:0 -9px;">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <nuxt-link to="/course-directory" class="title" target="_blank">五年级</nuxt-link>
                        <div class="section">
                            <div class="section">
                                <div class="pinyin">yī nián jí</div>
                                <nuxt-link to="/course-directory" class="tag active" target="_blank">全部课程</nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
                <nuxt-link :to="'/play-course/' + item.qualityRspDTOs_Object[7].id" class="media-type-7 col col-pc-1dot5 col-pad-2 col-mobile-6" v-for="(item, index) in grade5" :key="index" target="_blank">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(' + item.qualityRspDTOs_Object[5].url + ')'
                            }"
                        >
                            <div class="tips"></div>
                        </div>
                        <div class="grade-area">
                            <div class="grade">
                                {{ item.knowledgeName.split(' ')[0] }}
                            </div>
                            <div class="level">
                                {{ item.knowledgeName.split(' ')[1] }}
                            </div>
                        </div>
                        <div class="summary">
                            <div class="count"><img src="/play2.png" />{{ item.playNum }}次</div>
                            <div class="type">
                                {{ item.press }}
                            </div>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
        <!-- 六年级 -->

        <div class="media-area" style="margin:0 -9px;">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <nuxt-link to="/course-directory" class="title" target="_blank">六年级</nuxt-link>
                        <div class="section">
                            <div class="section">
                                <div class="pinyin">yī nián jí</div>
                                <nuxt-link to="/course-directory" class="tag active" target="_blank">全部课程</nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
                <nuxt-link :to="'/play-course/' + item.qualityRspDTOs_Object[7].id" class="media-type-7 col col-pc-1dot5 col-pad-2 col-mobile-6" v-for="(item, index) in grade6" :key="index" target="_blank">
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage: 'url(' + item.qualityRspDTOs_Object[5].url + ')'
                            }"
                        >
                            <div class="tips"></div>
                        </div>
                        <div class="grade-area">
                            <div class="grade">
                                {{ item.knowledgeName.split(' ')[0] }}
                            </div>
                            <div class="level">
                                {{ item.knowledgeName.split(' ')[1] }}
                            </div>
                        </div>
                        <div class="summary">
                            <div class="count"><img src="/play2.png" />{{ item.playNum }}次</div>
                            <div class="type">
                                {{ item.press }}
                            </div>
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
        // 初始化变量
        let that = context.app;
        let res = {};

        // 排行榜
        res.AlbumRank = await that.$getRecObjectList({
            pageNum: 1,
            pageSize: 8,
            recPosition: 'b5788f0d25bd41d8a9402f1cf94e5b7e'
        });

        // 一年级
        res.grade1 = await that.$merKnowledgeList({
            grade: 1
        });

        // 二年级
        res.grade2 = await that.$merKnowledgeList({
            grade: 2
        });

        // 三年级
        res.grade3 = await that.$merKnowledgeList({
            grade: 3
        });

        // 四年级
        res.grade4 = await that.$merKnowledgeList({
            grade: 4
        });

        // 五年级
        res.grade5 = await that.$merKnowledgeList({
            grade: 5
        });

        // 六年级
        res.grade6 = await that.$merKnowledgeList({
            grade: 6
        });
        return res;
    }
};
</script>
