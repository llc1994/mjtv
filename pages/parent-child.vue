<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <!-- 专辑栏 -->
        <SubToper :APG="APG" />
        <!-- 轮播图 -->
        <Slide :AlbumRank="AlbumRank" />

        <!-- 疯狂的麦咭 -->
        <div class="media-area gg">
            <div class="wrap2 row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <div class="special-image">
                                <img src="/parent-child-1.png" />
                            </div>
                            <div class="pinyin">dāng jì zhǔ dǎ</div>
                        </div>
                    </div>
                </div>
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="/play/APG20180614003002" class="title">疯狂的麦咭</nuxt-link>
                            <div class="pinyin">fēng kuáng de mài jí</div>
                        </div>
                        <nuxt-link target="_blank" to="/play/APG20180614003002" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div class="row">
                    <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="col media-type-1 col col-pc-1dot5 col-pad-4 col-mobile-6" v-for="(item, index) in res1.allAdvList" :key="index">
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
        </div>

        <!-- 龙的传人 -->
        <div class="media-area gg">
            <div class="wrap2">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="/play/APG20180614002501" class="title">龙的传人</nuxt-link>
                            <div class="pinyin">lóng de chuán rén</div>
                        </div>
                        <nuxt-link target="_blank" to="/play/APG20180614002501" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div class="row">
                    <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="col media-type-1 col col-pc-1dot5 col-pad-4 col-mobile-6" v-for="(item, index) in res2.allAdvList" :key="index">
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
        </div>

        <!-- 热门活动 -->
        <div class="media-area gg2" style="margin-top:20px;">
            <div class="wrap row">
                <div class="media-type-4 col col-pc-6 col-pad-6 col-mobile-12" :class="'xx' + (index + 1)" v-for="(item, index) in HotActive.allAdvList" :key="index">
                    <a :href="item.to" target="_blank" class="media-type-4-content">
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

        <!-- 爱宝贝晒一晒 -->
        <div class="media-area gg" id="changgui">
            <div class="wrap2">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <div class="special-image">
                                <img src="/parent-child-5.png" />
                            </div>
                            <div class="pinyin">zhōu bō jié mù</div>
                        </div>
                    </div>
                </div>
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="/play/APG20180712006001" class="title">爱宝贝晒一晒</nuxt-link>
                            <div class="pinyin">ài bǎo bèi shài yí shài</div>
                        </div>
                        <nuxt-link target="_blank" to="/play/APG20180712006001" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div class="row">
                    <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="col media-type-1 col col-pc-1dot5 col-pad-4 col-mobile-6" v-for="(item, index) in res3.allAdvList" :key="index">
                        <div class="inner-wrap">
                            <div
                                class="cover"
                                :style="{
                                    backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                }"
                            >
                                <div class="tips">{{ item.my_title_one }}</div>
                                <div class="payment">付费</div>
                            </div>
                            <div class="name">{{ item.descript }}</div>
                            <div class="summary">{{ item.my_title_two }}</div>
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </div>

        <!-- 玩名堂 -->
        <div class="media-area gg">
            <div class="wrap2">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="/play/APG20180712005002" class="title">玩名堂</nuxt-link>
                            <div class="pinyin">wán míng táng</div>
                        </div>
                        <nuxt-link target="_blank" to="/play/APG20180712005002" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div class="row">
                    <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="col media-type-1 col col-pc-1dot5 col-pad-4 col-mobile-6" v-for="(item, index) in res4.allAdvList" :key="index">
                        <div class="inner-wrap">
                            <div
                                class="cover"
                                :style="{
                                    backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240)'
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
        </div>

        <!-- 童趣大冒险 -->
        <div class="media-area gg">
            <div class="wrap2">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="/play/APG20180707004502" class="title">童趣大冒险</nuxt-link>
                            <div class="pinyin">tóng qù dà mào xiǎn</div>
                        </div>
                        <nuxt-link target="_blank" to="/play/APG20180707004502" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div class="row">
                    <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="col media-type-1 col col-pc-1dot5 col-pad-4 col-mobile-6" v-for="(item, index) in res5.allAdvList" :key="index">
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
        </div>

        <!-- 飞行幼乐园 -->
        <div class="media-area gg">
            <div class="wrap2">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="/play/APG20180614003001" class="title">飞行幼乐园</nuxt-link>
                            <div class="pinyin">feī xíng yòu lè yuán</div>
                        </div>
                        <nuxt-link target="_blank" to="/play/APG20180614003001" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div class="row">
                    <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="col media-type-1 col col-pc-1dot5 col-pad-4 col-mobile-6" v-for="(item, index) in res6.allAdvList" :key="index">
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
        </div>

        <!-- 童心撞地球 -->
        <div class="media-area gg">
            <div class="wrap2">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="/play/APG20180614002502" class="title">童心撞地球</nuxt-link>
                            <div class="pinyin">tóng xīn zhuàng dì qíu</div>
                        </div>
                        <nuxt-link target="_blank" to="/play/APG20180614002502" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div class="row">
                    <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="col media-type-1 col col-pc-1dot5 col-pad-4 col-mobile-6" v-for="(item, index) in res7.allAdvList" :key="index">
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
        </div>

        <!-- 辣妈战奶爸 -->
        <div class="media-area gg">
            <div class="wrap2">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="/play/APG20180611000501" class="title">辣妈战奶爸</nuxt-link>
                            <div class="pinyin">là mā zhàn naǐ bà</div>
                        </div>
                        <nuxt-link target="_blank" to="/play/APG20180611000501" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div class="row">
                    <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="col media-type-1 col col-pc-1dot5 col-pad-4 col-mobile-6" v-for="(item, index) in res8.allAdvList" :key="index">
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
        </div>

        <!-- 爱上幼儿园 -->
        <div class="media-area gg" id="jibo">
            <div class="wrap2">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <div class="special-image">
                                <img src="/parent-child-3.png" />
                            </div>
                            <div class="pinyin">wáng pái jì bō</div>
                        </div>
                    </div>
                </div>
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="/play/APG20180712006002" class="title">爱上幼儿园</nuxt-link>
                            <div class="pinyin">ài shàng yòu ér yuán</div>
                        </div>
                        <nuxt-link target="_blank" to="/play/APG20180712006002" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div class="row">
                    <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="col media-type-1 col col-pc-1dot5 col-pad-4 col-mobile-6" v-for="(item, index) in res9.allAdvList" :key="index">
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
        </div>

        <!-- 中国新声代 -->
        <div class="media-area gg">
            <div class="wrap2">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="/play/APG20180611000002" class="title">中国新声代</nuxt-link>
                            <div class="pinyin">zhōng guó xīn shēng dài</div>
                        </div>
                        <nuxt-link target="_blank" to="/play/APG20180611000002" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div class="row">
                    <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="col media-type-1 col col-pc-1dot5 col-pad-4 col-mobile-6" v-for="(item, index) in res10.allAdvList" :key="index">
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
        </div>

        <!-- 嘭！发射 -->
        <div class="media-area gg">
            <div class="wrap2">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="/play/APG20180707004501" class="title">嘭！发射</nuxt-link>
                            <div class="pinyin">pēng fā shè</div>
                        </div>
                        <nuxt-link target="_blank" to="/play/APG20180707004501" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div class="row">
                    <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="col media-type-1 col col-pc-1dot5 col-pad-4 col-mobile-6" v-for="(item, index) in res11.allAdvList" :key="index">
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
        </div>

        <!-- 运动不一样 -->
        <div class="media-area gg">
            <div class="wrap2">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="/play/APG20180614002002" class="title">运动不一样</nuxt-link>
                            <div class="pinyin">yùn dòng bù yí yàng</div>
                        </div>
                        <nuxt-link target="_blank" to="/play/APG20180614002002" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div class="row">
                    <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="col media-type-1 col col-pc-1dot5 col-pad-4 col-mobile-6" v-for="(item, index) in res12.allAdvList" :key="index">
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
        </div>

        <!-- 人偶总动员 -->
        <div class="media-area gg">
            <div class="wrap2">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <nuxt-link target="_blank" to="/play/APG20180612001501" class="title">人偶总动员</nuxt-link>
                            <div class="pinyin">rén ǒu zǒng dòng yuán</div>
                        </div>
                        <nuxt-link target="_blank" to="/play/APG20180612001501" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div class="row">
                    <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="col media-type-1 col col-pc-1dot5 col-pad-4 col-mobile-6" v-for="(item, index) in res13.allAdvList" :key="index">
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
        </div>

        <!-- 每天都看 -->
        <div class="media-area gg">
            <div class="wrap2">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="section">
                            <div class="special-image">
                                <img src="/parent-child-4.png" />
                            </div>
                            <div class="pinyin">měi tiān dōu kàn</div>
                        </div>
                        <nuxt-link target="_blank" to="video-filter" class="more2" style="background-image:url('/more-arrow.png');">更多</nuxt-link>
                    </div>
                </div>
                <div class="row">
                    <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="media-type-3 col col-pc-3 col-pad-4 col-mobile-6 " v-for="(item, index) in res14.allAdvList" :key="index">
                        <div class="inner-wrap">
                            <div
                                class="cover"
                                :style="{
                                    backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                }"
                            ></div>
                            <div class="name">
                                {{ item.descript }}
                            </div>
                            <div class="summary">
                                {{ item.title }}
                            </div>
                        </div>
                    </nuxt-link>
                </div>
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
export default {
    data() {
        return {
            // 高亮的导航
            isNav: 'parent-child',
            // 顶部栏参数
            toperParams: {
                backgroundColor: 'white',
                category: 'parent-child'
            }
        };
    },
    components: {
        Toper,
        SubToper,
        Slide,
        Subject,
        Footer
    },
    async asyncData(context) {
        let that = context.app;
        let res = {};
        res.APG = '';

        // 顶部轮播图
        res.AlbumRank = await that.$getRecObjectList({
            pageNum: 1,
            pageSize: 8,
            recPosition: 'b5788f0d25bd41d8a9402f1cf94e5b7e'
        });

        // 疯狂的麦咭
        let res1 = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: 'd6fb4e75ee3b4f66a49c5086b23f79cd'
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

        // 龙的传人
        let res2 = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: 'da071adde2c548608e503fd53a18cbf9'
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

        // 爱宝贝晒一晒
        let res3 = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: '47514b66c4624c7bae33d0bd97090e34'
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

        // 玩名堂
        let res4 = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: 'aaa462dfa3b842129a346f3efc601d7d'
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

        // 童趣大冒险
        let res5 = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: '9bec2f5b66064b3f932e7f20b8a28844'
        });
        res5.allAdvList.forEach(function(item) {
            let res = item.title.split('：');
            if (res.length < 2) {
                item.my_title_one = '';
                item.my_title_two = res[0];
            } else {
                item.my_title_one = res[0];
                item.my_title_two = res[1];
            }
        });
        res.res5 = res5;

        // 飞行幼乐园
        let res6 = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: '827decc88cf4459fad561df50126be45'
        });
        res6.allAdvList.forEach(function(item) {
            let res = item.title.split('：');
            if (res.length < 2) {
                item.my_title_one = '';
                item.my_title_two = res[0];
            } else {
                item.my_title_one = res[0];
                item.my_title_two = res[1];
            }
        });
        res.res6 = res6;

        // 童心撞地球
        let res7 = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: 'e2534ff0caca4de8aa4b812f13c38966'
        });
        res7.allAdvList.forEach(function(item) {
            let res = item.title.split('：');
            if (res.length < 2) {
                item.my_title_one = '';
                item.my_title_two = res[0];
            } else {
                item.my_title_one = res[0];
                item.my_title_two = res[1];
            }
        });
        res.res7 = res7;

        // 辣妈战奶爸
        let res8 = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: '1d68ce1b9cf841c7a65ce6a6119754d3'
        });
        res8.allAdvList.forEach(function(item) {
            let res = item.title.split('：');
            if (res.length < 2) {
                item.my_title_one = '';
                item.my_title_two = res[0];
            } else {
                item.my_title_one = res[0];
                item.my_title_two = res[1];
            }
        });
        res.res8 = res8;

        // 爱上幼儿园
        let res9 = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: 'e516e062d3144d76afe37bbd17859d29'
        });
        res9.allAdvList.forEach(function(item) {
            let res = item.title.split('：');
            if (res.length < 2) {
                item.my_title_one = '';
                item.my_title_two = res[0];
            } else {
                item.my_title_one = res[0];
                item.my_title_two = res[1];
            }
        });
        res.res9 = res9;

        // 中国新声代
        let res10 = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: '7db4d1324c954dc8ab0477e37e532021'
        });
        res10.allAdvList.forEach(function(item) {
            let res = item.title.split('：');
            if (res.length < 2) {
                item.my_title_one = '';
                item.my_title_two = res[0];
            } else {
                item.my_title_one = res[0];
                item.my_title_two = res[1];
            }
        });
        res.res10 = res10;

        // 嘭！发射
        let res11 = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: '01740a86baf846a49d2fb96abf502a59'
        });
        res11.allAdvList.forEach(function(item) {
            let res = item.title.split('：');
            if (res.length < 2) {
                item.my_title_one = '';
                item.my_title_two = res[0];
            } else {
                item.my_title_one = res[0];
                item.my_title_two = res[1];
            }
        });
        res.res11 = res11;

        // 运动不一样
        let res12 = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: '0d6434d5748244fa84abd208291134ee'
        });
        res12.allAdvList.forEach(function(item) {
            let res = item.title.split('：');
            if (res.length < 2) {
                item.my_title_one = '';
                item.my_title_two = res[0];
            } else {
                item.my_title_one = res[0];
                item.my_title_two = res[1];
            }
        });
        res.res12 = res12;

        // 人偶总动员
        let res13 = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: 'ee899fd6c01e4efd8abd42595d1f03dd'
        });
        res13.allAdvList.forEach(function(item) {
            let res = item.title.split('：');
            if (res.length < 2) {
                item.my_title_one = '';
                item.my_title_two = res[0];
            } else {
                item.my_title_one = res[0];
                item.my_title_two = res[1];
            }
        });
        res.res13 = res13;

        // 每天都看
        let res14 = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: 'c03c9ef338d5497589f2e14398a24713'
        });
        res14.allAdvList.forEach(function(item) {
            let res = item.title.split('：');
            if (res.length < 2) {
                item.my_title_one = '';
                item.my_title_two = res[0];
            } else {
                item.my_title_one = res[0];
                item.my_title_two = res[1];
            }
        });
        res.res14 = res14;

        // 热门活动
        res.HotActive = await that.$getRecObjectList({
            pageSize: 2,
            pageNum: 1,
            recPosition: 'a1fc4abe48bf4b7b9dfd3320c4b37054'
        });

        // 龙的传人
        // --------------------------------------
        res.LegendOfTheDragon = await that.$getRecObjectList({
            pageSize: 8,
            pageNum: 1,
            recPosition: 'f522794064634341b553a9d90681cddd'
        });
        return res;
    },
    mounted() {
        // 滚动条定位
        var hash = location.hash;
        // changgui(常规) jibo(季播)
        if (hash === '#changgui' || hash === '#jibo') {
            if ($(hash).offset()) {
                $('html, body').animate({ scrollTop: $(hash).offset().top - 80 }, 1000);
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.wrap2 {
    padding: 0 5px;
    .row {
        padding: 0 1rem;
        // margin:0 -9px;
    }
    .index-title {
        padding: 0 1rem;
        .wrap-title {
            padding: 0 9px;
        }
    }
    .col {
        padding: 0 9px;
    }
}
.cover {
    position: relative;
    .payment {
        width: 60px;
        height: 25px;
        background: RGB(114,213,234);
        color: RGB(205,245,251);
        text-align: center;
        line-height: 25px;
        border-radius: 3px;
        position: absolute;
        top: 0;
        left: 2px;
    }
}
</style>
