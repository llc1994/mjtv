<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <div class="user-center">
            <div class="wrap">
                <!-- 用户左侧面板 -->
                <UserMenu :menu="menu" />
                <div class="main">
                    <div class="user-collection">
                        <!-- 疯狂的麦咭 -->

                        <template v-if="EmptyList">
                            <img
                                src="/list-holder.jpg"
                                style="display: block;margin: auto; margin-top: 100px;"
                            />
                        </template>
                        <div class="media-area row" v-if="MyCollectionLists[0].length > 0">
                            <div class="index-title">
                                <div class="wrap-title">
                                    <div class="section">
                                        <!-- <nuxt-link target="_blank"
                                            to="/news-catalog/MAGEE_TOP"
                                            class="title"
                                        >-->
                                        <div class="title">资讯收藏</div>
                                        <!-- </nuxt-link
                                        >-->
                                    </div>
                                </div>
                            </div>
                            <nuxt-link target="_blank"
                                :to="'/news/' + item.associatedId"
                                class="media-type-1 col col2-pc-4 col2-pad-6 col2-mobile-12"
                                style="padding:0 10px;"
                                v-for="(item, index) in MyCollectionLists[0]"
                                :key="index"
                            >
                                <div class="inner-wrap">
                                    <div
                                        class="cover"
                                        :style="{
                                            backgroundImage:
                                                'url(' + item.resUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="name">{{ item.title }}</div>
                                    <div class="summary" v-html="item.descript"></div>
                                </div>
                            </nuxt-link>
                        </div>

                        <!-- 课程收藏 -->
                        <div class="media-area row" v-if="MyCollectionLists[1].length > 0">
                            <div class="index-title">
                                <div class="wrap-title">
                                    <!-- <nuxt-link target="_blank"
                                        to="/course-directory"
                                        class="title"
                                        target="_blank"
                                    >-->
                                    <div class="title">课程收藏</div>
                                    <!-- </nuxt-link
                                    >-->
                                </div>
                            </div>
                            <nuxt-link target="_blank"
                                :to="'/play-course/' + item.associatedId"
                                class="media-type-1 col col2-pc-4 col2-pad-6 col2-mobile-12"
                                style="padding:0 10px;"
                                v-for="(item, index) in MyCollectionLists[1]"
                                :key="index"
                            >
                                <div class="inner-wrap">
                                    <div
                                        class="cover"
                                        :style="{
                                            backgroundImage:
                                                'url(' + item.resUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="name">{{ item.title }}</div>
                                    <div class="summary">{{ item.descript }}</div>
                                </div>
                            </nuxt-link>
                        </div>

                        <!-- 节目收藏 -->
                        <div class="media-area row" v-if="MyCollectionLists[2].length > 0">
                            <div class="index-title">
                                <div class="wrap-title">
                                    <!-- <nuxt-link target="_blank"
                                        to="/parent-child"
                                        class="title"
                                        target="_blank"
                                    >-->
                                    <div class="title">节目收藏</div>
                                    <!-- </nuxt-link
                                    >-->
                                </div>
                            </div>
                            <nuxt-link target="_blank"
                                :to="'/play/' + item.associatedId"
                                class="media-type-1 col col2-pc-4 col2-pad-6 col2-mobile-12"
                                style="padding:0 10px;"
                                v-for="(item, index) in MyCollectionLists[2]"
                                :key="index"
                            >
                                <div class="inner-wrap">
                                    <div
                                        class="cover"
                                        :style="{
                                            backgroundImage:
                                                'url(' + item.resUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="name">{{ item.title }}</div>
                                    <div class="summary">{{ item.descript }}</div>
                                </div>
                            </nuxt-link>
                        </div>

                        <!-- 活动收藏 -->
                        <div class="media-area row" v-if="MyCollectionLists[3].length > 0">
                            <div class="index-title">
                                <div class="wrap-title">
                                    <!-- <nuxt-link target="_blank"
                                        to="/program-interaction"
                                        class="title"
                                        target="_blank"
                                    >-->
                                    <div class="title">热门活动</div>
                                    <!-- </nuxt-link
                                    >-->
                                </div>
                            </div>
                            <nuxt-link target="_blank"
                                :to="'/program-interaction/'"
                                class="media-type-1 col col2-pc-4 col2-pad-6 col2-mobile-12"
                                style="padding:0 10px;"
                                v-for="(item, index) in MyCollectionLists[3]"
                                :key="index"
                            >
                                <div class="inner-wrap">
                                    <div
                                        class="cover"
                                        :style="{
                                            backgroundImage:
                                                'url(' + item.resUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="name">{{ item.title }}</div>
                                    <div class="summary">{{ item.descript }}</div>
                                </div>
                            </nuxt-link>
                        </div>

                        <!-- show活动 -->
                        <div class="media-area row" v-if="MyCollectionLists[4].length > 0">
                            <div class="index-title">
                                <div class="wrap-title">
                                    <!-- <nuxt-link target="_blank"
                                        to="/course-directory"
                                        class="title"
                                        target="_blank"
                                    >-->
                                    <div class="title">show活动</div>
                                    <!-- </nuxt-link
                                    >-->
                                </div>
                            </div>
                            <nuxt-link target="_blank"
                                :to="'/program-interaction/'"
                                class="media-type-1 col col2-pc-4 col2-pad-6 col2-mobile-12"
                                style="padding:0 10px;"
                                v-for="(item, index) in MyCollectionLists[4]"
                                :key="index"
                            >
                                <div class="inner-wrap">
                                    <div
                                        class="cover"
                                        :style="{
                                            backgroundImage:
                                                'url(' + item.resUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="name">{{ item.title }}</div>
                                    <div class="summary">{{ item.descript }}</div>
                                </div>
                            </nuxt-link>
                        </div>

                        <!-- 节目活动 -->
                        <div class="media-area row" v-if="MyCollectionLists[5].length > 0">
                            <div class="index-title">
                                <div class="wrap-title">
                                    <!-- <nuxt-link target="_blank"
                                        to="/course-directory"
                                        class="title"
                                        target="_blank"
                                    >-->
                                    <div class="title">show活动</div>
                                    <!-- </nuxt-link
                                    >-->
                                </div>
                            </div>
                            <nuxt-link target="_blank"
                                :to="'/program-interaction/'"
                                class="media-type-1 col col2-pc-4 col2-pad-6 col2-mobile-12"
                                style="padding:0 10px;"
                                v-for="(item, index) in MyCollectionLists[5]"
                                :key="index"
                            >
                                <div class="inner-wrap">
                                    <div
                                        class="cover"
                                        :style="{
                                            backgroundImage:
                                                'url(' + item.resUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="name">{{ item.title }}</div>
                                    <div class="summary">{{ item.descript }}</div>
                                </div>
                            </nuxt-link>
                        </div>

                        <!-- 商品收藏 -->
                        <div class="media-area row" v-if="MyCollectionLists[6].length > 0">
                            <div class="index-title">
                                <div class="wrap-title">
                                    <!-- <nuxt-link target="_blank"
                                        to="/maiji-shop/"
                                        class="title"
                                        target="_blank"
                                    >-->
                                    <div class="title">商品收藏</div>
                                    <!-- </nuxt-link
                                    >-->
                                </div>
                            </div>
                            <nuxt-link target="_blank"
                                :to="'/goods-detail/' + item.associatedId"
                                class="media-type-1 col col2-pc-4 col2-pad-6 col2-mobile-12"
                                style="padding:0 10px;"
                                v-for="(item, index) in MyCollectionLists[6]"
                                :key="index"
                            >
                                <div class="inner-wrap">
                                    <div
                                        class="cover"
                                        :style="{
                                            backgroundImage:
                                                'url(' + item.resUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="name">{{ item.title }}</div>
                                    <div class="summary">{{ item.descript }}</div>
                                </div>
                            </nuxt-link>
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
                    category: '',
                },
                menu: {
                    isActive: 'user-collection',
                },
            };
        },
        components: {
            Toper,
            Slide,
            Subject,
            Footer,
            UserMenu,
        },
        async asyncData(context) {
            let res = {};
            res.number2press = {
                1: '外研版',
                2: '人教版',
                3: '苏教版',
                4: '北大师版',
                5: '牛津版',
                6: '中考专题',
                7: '高考专题',
                8: '知识重点',
                9: '全部',
            };

            let ParentChildProgram = await axios.post(context.app.$domain + '/mkt/getRecObjectList', {
                pageSize: 8,
                pageNum: 1,
                recPosition: 'cccd584aa108408a866aae2e4b4b1c85',
            });
            res.ParentChildProgram = ParentChildProgram.data.body;

            // 疯狂的麦咭
            let res1 = await axios.post(context.app.$domain + '/mkt/getRecObjectList', {
                pageSize: 6,
                pageNum: 1,
                recPosition: 'd6fb4e75ee3b4f66a49c5086b23f79cd',
            });
            res1.data.body.allAdvList.forEach(function(item) {
                let res = item.title.split('：');
                if (res.length < 2) {
                    item.my_title_one = '';
                    item.my_title_two = res[0];
                } else {
                    item.my_title_one = res[0];
                    item.my_title_two = res[1];
                }
            });
            res.res1 = res1.data.body;

            // 课程收藏
            // 一年级
            let grade1 = await axios.post(context.app.$domain + '/mer/knowledgeList', {
                knowledgeType: 1,
                knowledgeModule: 2,
                grade: 1,
                subject: 0,
                press: 0,
                pageNum: 1,
                pageSize: 6,
            });

            grade1.data.body.merKnowledgeList.forEach(function(item) {
                item.qualityRspDTOs_Object = {};
                item.qualityRspDTOs.forEach(function(item2) {
                    item.qualityRspDTOs_Object[item2.type] = item2;
                });
            });
            res.grade1 = grade1.data.body;

            // 我的收藏
            // colType   0资讯 1课堂 2tv节目 3热门活动 4show活动 5节目活动 6商品
            let MyCollectionLists = await axios({
                url: context.app.$domain + '/urm/getCollectList',
                method: 'post',
                headers: {
                    token: context.store.state.session.token || '',
                },
                data: {
                    pageNum: 1,
                    pageSize: 100,
                    userId: context.store.state.session.userId,
                },
            });
            // _ = {
            //     associatedId: "KN20180611172339000509",
            //     colType: 1,
            //     resUrl: null,
            //     title: "童趣小小调查员",
            //     descript:"飞行家族成员带着小冒险员们一起",
            //     enable: 1,
            //     collectId: "urm25577138be9f435fab916519345cbf6b"
            // };
            let coll = [[], [], [], [], [], [], []];
            MyCollectionLists.data.body.list.forEach(function(item, index) {
                if(!item.descript||item.descript=='<null>'){
                    item.descript = '';
                }
                coll[item.colType].push(item);
            });
            res.MyCollectionLists = coll;
            res.EmptyList = true;
            for (let i = 0; i < res.MyCollectionLists.length; i++) {
                if (res.MyCollectionLists[i].length) {
                    res.EmptyList = false;
                }
            }
            return res;
        },
        created() {
            // if (!this.$store.state.userData.userId) {
            //     this.$router.push("/");
            // }
        },
    };
</script>
