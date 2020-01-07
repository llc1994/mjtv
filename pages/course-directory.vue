<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <!-- 课程筛选 -->
        <div class="course-filter">
            <div class="wrap">
                <div class="group-box">
                    <div class="group">
                        <div class="label">年级</div>
                        <div
                            class="value"
                            :class="{ active: item.active === true }"
                            v-for="(item, index) in grade"
                            :key="index"
                            @click="changeGrade(item)"
                        >
                            {{ item.name }}
                        </div>
                    </div>
                    <div class="group">
                        <div class="label">科目</div>
                        <div
                            class="value"
                            :class="{ active: item.active === true }"
                            v-for="(item, index) in course"
                            :key="index"
                            @click="changeCourse(item)"
                        >
                            {{ item.name }}
                        </div>
                    </div>
                    <div class="group">
                        <div class="label">版本</div>
                        <div
                            class="value"
                            :class="{ active: item.active === true }"
                            v-for="(item, index) in publish"
                            :key="index"
                            @click="changePublish(item)"
                        >
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="media-area">
            <div class="wrap row">
                <div
                    :to="'play/' + item.itemId"
                    class="media-type-7 col col-pc-1dot5 col-pad-2 col-mobile-6"
                    v-for="(item, index) in book.merKnowledgeList"
                    :key="index"
                >
                    <div class="inner-wrap">
                        <div
                            class="cover"
                            :style="{
                                backgroundImage:
                                    'url(' + item.qualityRspDTOs[1].url + ')'
                            }"
                        >
                            <div class="tips"></div>
                        </div>
                        <div class="grade-area">
                            <div class="grade">
                                {{ item.knowledgeName.split(" ")[0] }}
                            </div>
                            <div class="level">
                                {{ item.knowledgeName.split(" ")[1] }}
                            </div>
                        </div>
                        <div class="summary">
                            <div class="count">
                                <img src="/play2.png" />{{ item.playNum }}次
                            </div>
                            <div class="type">
                                {{ number2press[item.press] }}
                            </div>
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
import Toper from "~/components/Toper.vue";
import Footer from "~/components/Footer.vue";
import Slide from "~/components/Slide.vue";
import Subject from "~/components/Subject.vue";
import axios from "axios";
export default {
    data() {
        return {
            isNav:'maifen-classroom',
            toperParams: {
                backgroundColor: "white",
                category: "maiji-classroom"
            },
            params: {
                knowledgeType: 1,
                knowledgeModule: 2,
                grade: 1,
                subject: 0,
                press: 0,
                pageNum: 1,
                pageSize: 100
            },
            grade: [
                {
                    name: "全部",
                    active: true,
                    number: 0
                },
                {
                    name: "一年级",
                    active: false,
                    number: 1
                },
                {
                    name: "二年级",
                    active: false,
                    number: 2
                },
                {
                    name: "三年级",
                    active: false,
                    number: 3
                },
                {
                    name: "四年级",
                    active: false,
                    number: 4
                },
                {
                    name: "五年级",
                    active: false,
                    number: 5
                },
                {
                    name: "六年级",
                    active: false,
                    number: 6
                },
                {
                    name: "七年级",
                    active: false,
                    number: 7
                },
                {
                    name: "八年级",
                    active: false,
                    number: 8
                },
                {
                    name: "九年级",
                    active: false,
                    number: 9
                }
            ],
            course: [
                {
                    name: "全部",
                    active: true,
                    number: 0
                },
                {
                    name: "语文",
                    active: false,
                    number: 1
                },
                {
                    name: "数学",
                    active: false,
                    number: 2
                },
                {
                    name: "英语",
                    active: false,
                    number: 3
                },
                {
                    name: "物理",
                    active: false,
                    number: 4
                },
                {
                    name: "化学",
                    active: false,
                    number: 5
                },
                {
                    name: "生物",
                    active: false,
                    number: 6
                },
                {
                    name: "历史",
                    active: false,
                    number: 8
                },
                {
                    name: "地理",
                    active: false,
                    number: 7
                }
            ],
            publish: [
                {
                    name: "全部",
                    active: true,
                    number: 0
                },
                {
                    name: "人教版",
                    active: false,
                    number: 2
                },
                {
                    name: "北师大版",
                    active: false,
                    number: 4
                },
                {
                    name: "苏教版",
                    active: false,
                    number: 3
                },
                {
                    name: "外研版",
                    active: false,
                    number: 1
                },
                {
                    name: "牛津版",
                    active: false,
                    number: 5
                },
                {
                    name: "中考专题",
                    active: false,
                    number: 6
                },
                {
                    name: "高考专题",
                    active: false,
                    number: 7
                },
                {
                    name: "知识重点",
                    active: false,
                    number: 8
                }
            ]
        };
    },
    components: {
        Toper,
        Slide,
        Subject,
        Footer,
    },
    async asyncData(context) {

        let res = {};
        res.number2press = {
            1: "外研版",
            2: "人教版",
            3: "苏教版",
            4: "北大师版",
            5: "牛津版",
            6: "中考专题",
            7: "高考专题",
            8: "知识重点",
            9: "全部"
        };

        // 课程筛选
        let book = await axios.post(context.app.$domain + "/mer/knowledgeList", {
            knowledgeType: 1,
            knowledgeModule: 2,
            grade: 0,
            subject: 0,
            press: 0,
            pageNum: 1,
            pageSize: 100
        });
        res.book = book.data.body;
        return res;
    },
    methods: {
        async getCourseLists() {
            // 课程筛选
            let book = await axios.post(
                this.$domain + "/mer/knowledgeList",
                this.params
            );
            this.book = book.data.body;
        },
        // 改变年级
        changeGrade(item) {
            this.params.grade = item.number;
            this.grade.forEach(function(item) {
                item.active = false;
            });
            item.active = true;
            this.getCourseLists();
        },
        // 改变课程
        changeCourse(item) {
            this.params.subject = item.number;
            this.course.forEach(function(item) {
                item.active = false;
            });
            item.active = true;
            this.getCourseLists();
        },
        // 改变课程
        changePublish(item) {
            this.params.press = item.number;
            this.publish.forEach(function(item) {
                item.active = false;
            });
            item.active = true;
            this.getCourseLists();
        }
    }
};
</script>