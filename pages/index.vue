<template>
    <div class="container" v-cloak>
        <!-- 大图巨幕 -->
        <div class="large-picture" v-if="LargePic.customImgUrl && ShowLargePic">
            <!-- <div class="large-picture" v-if="false" v-show="LargePic && LargePic.customImgUrl && LargePic.customImgUrl.length > 0 && ShowLargePic">-->
            <div class="fore">
                <div class="close-time-bg">
                    <p v-if="ShowLargePicTime > 0">
                        倒计时：<span>{{ ShowLargePicTime }}s</span>
                    </p>
                    <div class="close" v-on:click="closeLargeAdPic"></div>
                </div>
                <nuxt-link target="_blank" :to="LargePic.extendedField4 && LargePic.extendedField4 === '16' ? '/goods-detail/' + LargePic.itemId : '/Play/' + LargePic.itemId" class="large-img-bg" :title="LargePic.title">
                    <img :src="LargePic.customImgUrl" class="large-img" />
                </nuxt-link>
            </div>
        </div>

        <!-- 顶部栏 -->
        <Toper :toperParams="toperParams" />

        <!-- 轮播图 -->
        <Slide :AlbumRank="AlbumRank" />

        <!-- 子项目导航 -->
        <Subject />

        <!-- 亲子节目 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <nuxt-link target="_blank" to="parent-child" class="title">亲子节目</nuxt-link>

                        <div class="section">
                            <div class="pinyin">qīn zǐ jié mù</div>
                            <div
                                class="tag"
                                :class="{
                                    active: index === ParentChildProgramSwitch.index
                                }"
                                v-for="(item, index) in ParentChildProgramSwitch.list"
                                :key="index"
                                @mouseenter="TabSwitchOfParentChildProgram(item, index)"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                        <div to="/parent-child" class="more ParentChildProgramSwiper">
                            <div class="more-arrow prev" style="cursor:pointer"></div>
                            <div class="more-arrow next" style="cursor:pointer"></div>
                        </div>
                    </div>
                </div>
                <div v-swiper:ParentChildProgramSwiper="ParentChildProgramSwiperOption" v-show="ParentChildProgram.allAdvList.length > 0">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in ParentChildProgram.allAdvList" :key="index">
                            <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="media-type-1" @click="usePlay(item)">
                                <div class="inner-wrap">
                                    <div
                                        class="cover cover222"
                                        :class="{ active222: cover222 }"
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
                <div class="no-data" v-show="ParentChildProgram.allAdvList.length <= 0">暂无数据</div>
            </div>
        </div>

        <!-- 精彩片段 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="title">精彩片段</div>
                        <div class="section">
                            <div class="pinyin">jīng cǎi piàn duàn</div>
                            <div
                                class="tag"
                                :class="{
                                    active: index === HighlightsSwitch.index
                                }"
                                v-for="(item, index) in HighlightsSwitch.list"
                                :key="index"
                                @mouseenter="TabSwitchOfHighlights(item, index)"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                        <div class="more HighlightsSwiper">
                            <div class="more-arrow prev" style="cursor:pointer"></div>
                            <div class="more-arrow next" style="cursor:pointer"></div>
                        </div>
                    </div>
                </div>
                <div v-swiper:HighlightsSwiper="HighlightsSwiperOption" v-show="Highlights.allAdvList.length > 0">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in Highlights.allAdvList" :key="index">
                            <nuxt-link target="_blank" :to="'/play/' + item.itemId" class="media-type-1">
                                <div class="inner-wrap">
                                    <div
                                        class="cover cover222"
                                        :class="{ active222: cover222 }"
                                        :style="{
                                            backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    >
                                        <!-- <div class="tips">第一季 08期</div> -->
                                    </div>
                                    <div class="name">{{ item.descript }}</div>
                                    <div class="summary">{{ item.title }}</div>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
                <div class="no-data" v-show="Highlights.allAdvList.length <= 0">暂无视频</div>
            </div>
        </div>

        <!-- 节目互动 -->
        <div class="media-area gg4">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="title">节目互动</div>
                        <div class="section">
                            <div class="pinyin">jié mù hù dòng</div>
                        </div>
                    </div>
                </div>
                <div class="media-type-3 col col-pc-3 col-pad-6 col-mobile-12" :class="'xx' + (index + 1)" v-for="(item, index) in ProgramInteraction.allAdvList" :key="index">
                    <nuxt-link target="_blank" class="media-type-3-content" to="/program-interaction">
                        <div class="inner-wrap">
                            <div
                                class="cover cover222"
                                :class="{ active222: cover222 }"
                                :style="{
                                    backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_480/format,jpeg/quality,Q_90)'
                                }"
                            ></div>
                            <div class="name">{{ item.title }}</div>
                            <div class="summary">
                                <div class="time">
                                    活动时间：{{ item.my_title_one }} 至
                                    {{ item.my_title_two }}
                                </div>
                                <div class="join">
                                    <span class="user-group"></span>
                                    <span class="number">{{ item.my_join_number }}</span>人已参与
                                </div>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </div>

        <!-- 动漫卡通 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="col col-pc-9 col-pad-12 col-mobile-12">
                    <div class="index-title">
                        <div class="wrap-title">
                            <div class="title">动漫卡通</div>
                            <div class="section">
                                <div class="pinyin">dòng màn kǎ tōng</div>
                                <div
                                    class="tag"
                                    :class="{
                                        active: index === AnimeCartoonSwitch.index
                                    }"
                                    v-for="(item, index) in AnimeCartoonSwitch.list"
                                    :key="index"
                                    @mouseenter="TabSwitchOfAnimeCartoon(item, index)"
                                >
                                    {{ item.name }}
                                </div>
                            </div>
                            <div class="more AnimeCartoonSwiper">
                                <div class="more-arrow prev" style="cursor:pointer"></div>
                                <div class="more-arrow next" style="cursor:pointer"></div>
                            </div>
                        </div>
                    </div>
                    <div v-swiper:AnimeCartoonSwiper="AnimeCartoonSwiperOption" v-show="AnimeCartoon.allAdvList.length > 0">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item, index) in AnimeCartoon.allAdvList" :key="index">
                                <nuxt-link target="_blank" :to="'/play-cartoon/' + item.itemId" class="media-type-1">
                                    <div class="inner-wrap">
                                        <div
                                            class="cover cover222"
                                            :class="{ active222: cover222 }"
                                            :style="{
                                                backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                            }"
                                        >
                                            <div class="tips">{{ item.my_title_one }}</div>
                                        </div>
                                        <div class="name">{{ item.descript }}</div>
                                        <div class="summary">{{ item.my_title_one }}</div>
                                    </div>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="no-data" v-show="AnimeCartoon.allAdvList.length <= 0">暂无视频</div>
                </div>
                <div class="pai-hang-bang col col-pc-3 col-pad-12 col-mobile-12">
                    <div class="category-rank">
                        <div class="title">排行榜</div>
                        <div class="box-area fx">
                            <nuxt-link target="_blank" :to="'/play-cartoon/' + item.latestResItemId" class="box" v-for="(item, index) in AnimeCartoonRank.content" :key="index">
                                <div class="order-and-name">
                                    <div class="order">{{ index + 1 }}</div>
                                    <div class="name">{{ item.name }}</div>
                                </div>
                                <div class="date">
                                    {{ item.latestResName }}
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 萌娃秀 -->
        <div class="media-area">
            <div class="wrap">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="title">萌娃秀</div>
                        <div class="section">
                            <div class="pinyin">méng wá xiù</div>
                            <div
                                class="tag"
                                :class="{
                                    active: index === MengBaoVideoSwitch.index
                                }"
                                v-for="(item, index) in MengBaoVideoSwitch.list"
                                :key="index"
                                @mouseenter="TabSwitchOfMengBaoVideo(item, index)"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                        <div class="more MengBaoVideoSwiper">
                            <div class="more-arrow prev" style="cursor:pointer"></div>
                            <div class="more-arrow next" style="cursor:pointer"></div>
                        </div>
                    </div>
                </div>
                <div v-swiper:MengBaoVideoSwiper="MengBaoVideoSwiperOption" v-show="MengBaoVideo.length > 0">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in MengBaoVideo" :key="index">
                            <nuxt-link target="_blank" class="media-type-5" :to="'/play-meng/' + item.worksId">
                                <div class="inner-wrap">
                                    <div
                                        class="cover cover222"
                                        :class="{ active222: cover222 }"
                                        :style="{
                                            backgroundImage: 'url(' + item.resourceUrl + '?x-oss-process=image/resize,h_480/format,jpeg/quality,Q_90)'
                                        }"
                                    >
                                        <div class="tips" style="color:#fff;">
                                            <span class="like"></span>
                                            {{ item.likes }}
                                        </div>
                                    </div>
                                    <div class="info">
                                        <div
                                            class="head"
                                            :style="{
                                                backgroundImage: 'url(' + item.userIcon + ')'
                                            }"
                                        ></div>
                                        <div class="name">{{ item.userName }}</div>
                                    </div>
                                    <div class="summary">{{ item.content }}</div>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
                <div class="no-data" v-show="MengBaoVideo.length <= 0">暂无视频</div>
            </div>
        </div>

        <!-- 热门活动 -->
        <div class="media-area gg2-ts">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="title">热门活动</div>
                        <div class="section">
                            <div class="pinyin">rè mén huó dòng</div>
                        </div>
                    </div>
                </div>
                <div class="media-type-4 col col-pc-6 col-pad-6 col-mobile-12" :class="'xx' + (index + 1)" v-for="(item, index) in HotActive.allAdvList" :key="index">
                    <a :href="item.to" target="_blank" class="media-type-4-content" to="/program-interaction">
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

        <!-- 麦粉学堂 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="col col-pc-9 col-pad-12 col-mobile-12">
                    <div class="index-title">
                        <div class="wrap-title">
                            <div class="title">麦粉学堂</div>
                            <div class="section">
                                <div class="pinyin">mài jí jiào shì</div>
                                <div
                                    class="tag"
                                    :class="{
                                        active: index === MaiJiClassroomSwitch.index
                                    }"
                                    v-for="(item, index) in MaiJiClassroomSwitch.list"
                                    :key="index"
                                    @mouseenter="TabSwitchOfMaiJiClassroom(item, index)"
                                >
                                    {{ item.name }}
                                </div>
                            </div>
                            <div class="more MaiJiClassroomSwiper">
                                <div class="more-arrow prev" style="cursor:pointer"></div>
                                <div class="more-arrow next" style="cursor:pointer"></div>
                            </div>
                        </div>
                    </div>
                    <div v-swiper:MaiJiClassroomSwiper="MaiJiClassroomSwiperOption" v-show="MaiJiClassroom.allAdvList.length > 0">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item, index) in MaiJiClassroom.allAdvList" :key="index">
                                <nuxt-link :to="'/play-course/' + item.itemId" target="_blank" class="media-type-1" :key="index" @click="playCourse(item)">
                                    <div class="inner-wrap">
                                        <div
                                            class="cover cover222"
                                            :class="{ active222: cover222 }"
                                            :style="{
                                                backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                            }"
                                        >
                                            <!-- <div class="tips">第一季 08期</div> -->
                                        </div>
                                        <div class="name">{{ item.title }}</div>
                                        <div class="summary">{{ item.descript }}</div>
                                    </div>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="no-data" v-show="MaiJiClassroom.allAdvList.length <= 0">暂无数据</div>
                </div>
                <div class="pai-hang-bang col col-pc-3 col-pad-12 col-mobile-12">
                    <div class="category-rank">
                        <div class="title">排行榜</div>
                        <div class="box-area fx">
                            <a :href="'/play-course/' + item.playBundleId" target="_blank" class="box" v-for="(item, index) in MaiJiClassroomRank.content" :key="index">
                                <div class="order-and-name">
                                    <div class="order">{{ index + 1 }}</div>
                                    <div class="name">{{ item.name }}</div>
                                </div>
                                <div class="date">
                                    {{ item.latestResName }}
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 麦咭头条 -->
        <div class="media-area">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="title">麦咭头条</div>
                        <div class="section">
                            <div class="pinyin">mài jí tóu tiáo</div>
                            <div
                                class="tag"
                                :class="{
                                    active: index === MaiJiNewsSwitch.index
                                }"
                                v-for="(item, index) in MaiJiNewsSwitch.list"
                                :key="index"
                                @mouseenter="TabSwitchOfMaiJiNews(item, index)"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                        <div class="more MaiJiNewsSwiper">
                            <div class="more-arrow prev" style="cursor:pointer"></div>
                            <div class="more-arrow next" style="cursor:pointer"></div>
                        </div>
                    </div>
                </div>
                <div v-swiper:MaiJiNewsSwiper="MaiJiNewsSwiperOption" v-show="MaiJiNews.allAdvList.length > 0">
                    <div class="swiper-wrapper">
                        <nuxt-link target="_blank" class="swiper-slide media-type-1-content" v-for="(item, index) in MaiJiNews.allAdvList" :key="index" :to="'/news/' + item.itemId">
                            <div class="media-type-1">
                                <div class="inner-wrap">
                                    <div
                                        class="cover cover222"
                                        :class="{
                                            active222: cover222,
                                            active: MaiJiNewsSwitch.index === 0
                                        }"
                                        :style="{
                                            backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="name2">{{ item.title }}</div>
                                </div>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
                <div class="no-data" v-show="MaiJiNews.allAdvList.length <= 0">暂无数据</div>
            </div>
        </div>

        <!-- 卖萌热推 -->
        <div class="media-area gg2-ts">
            <div class="wrap row">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="title">麦萌热推</div>
                        <div class="section">
                            <div class="pinyin">mài méng rè tuī</div>
                        </div>
                    </div>
                </div>
                <a target="_blank" :href="item.to" :to="'/goods-detail/' + item.itemId" class="media-type-4 col col-pc-6 col-pad-6 col-mobile-12" :class="'xx' + (index + 1)" v-for="(item, index) in MaiMengReTui.allAdvList" :key="index">
                    <div class="inner-wrap">
                        <div
                            class="cover cover222"
                            :class="{ active222: cover222 }"
                            :style="{
                                backgroundImage: 'url(' + item.customImgUrl + ')'
                            }"
                        ></div>
                    </div>
                </a>
            </div>
        </div>

        <!-- 商城热卖 -->
        <div class="media-area">
            <div class="wrap">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="title">商城热卖</div>
                        <div class="section">
                            <div class="pinyin">shāng chéng rè mài</div>
                            <div
                                class="tag"
                                :class="{
                                    active: index === ShopHotSaleSwitch.index
                                }"
                                v-for="(item, index) in ShopHotSaleSwitch.list"
                                :key="index"
                                @mouseenter="TabSwitchOfShopHotSale(item, index)"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                        <div class="more ShopHotSaleSwiper">
                            <div class="more-arrow prev" style="cursor:pointer"></div>
                            <div class="more-arrow next" style="cursor:pointer"></div>
                        </div>
                    </div>
                </div>
                <div v-swiper:ShopHotSaleProgramSwiper="ShopHotSaleSwiperOption" v-show="ShopHotSale.allAdvList.length > 0">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in ShopHotSale.allAdvList" :key="index">
                            <nuxt-link target="_blank" :to="!!item.extendedField2 ? '/goods-detail/' + item.itemId : '/mall-storeHome/' + item.itemId" class="media-type-1">
                                <div class="inner-wrap">
                                    <div
                                        class="cover background-contain"
                                        :class="{ active222: cover222 }"
                                        :style="{
                                            backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    ></div>
                                    <div class="name" style="text-align: center;">{{ item.title }}</div>
                                    <template v-if="!!item.extendedField2">
                                        <div class="sale" style="height:auto;flex-wrap:wrap;">
                                            <div class="price">
                                                <strong> ￥{{ item.extendedField3 }} </strong>
                                                <template v-if="parseFloat(item.extendedField3) < parseFloat(item.extendedField2)">
                                                    <span>
                                                        <strike> ￥{{ item.extendedField2 }} </strike>
                                                    </span>
                                                </template>
                                            </div>
                                            <div class="number">已售{{ item.extendedField4 }}件</div>
                                        </div>
                                    </template>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
                <div class="no-data" v-show="ShopHotSale.allAdvList.length <= 0">暂无数据</div>
            </div>
        </div>

        <!-- 店铺直达 -->
        <div class="media-area">
            <div class="wrap">
                <div class="index-title">
                    <div class="wrap-title">
                        <div class="title">店铺直达</div>
                        <div class="section">
                            <div class="pinyin">diàn pù zhí dá</div>
                            <div
                                class="tag"
                                :class="{
                                    active: index === ShopGoSwitch.index
                                }"
                                v-for="(item, index) in ShopGoSwitch.list"
                                :key="index"
                                @mouseenter="TabSwitchOfShopGo(item, index)"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                        <div class="more ShopGoSwiper">
                            <div class="more-arrow prev" style="cursor:pointer"></div>
                            <div class="more-arrow next" style="cursor:pointer"></div>
                        </div>
                    </div>
                </div>
                <div v-swiper:ShopGoProgramSwiper="ShopGoSwiperOption" v-show="ShopGo.allAdvList.length > 0">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in ShopGo.allAdvList" :key="index">
                            <nuxt-link target="_blank" :to="'/mall-storeHome/' + item.itemId" class="media-type-1">
                                <div class="inner-wrap">
                                    <!-- <div
                                        class="cover background-contain"
                                        style="border-radius:50%;"
                                        :style="{
                                            backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    > -->
                                    <div style="text-align:center;">
                                        <img :src="item.customImgUrl + '?x-oss-process=image/resize,h_80/format,jpeg/quality,Q_90'" style="border-radius:50%;" />
                                    </div>
                                    <div class="name" style="text-align: center;">{{ item.title }}</div>
                                    <div class="tips-2" style="display:flex;">
                                        <!--<div-->
                                        <!--class="text"-->
                                        <!--style="flex:0 0 auto;padding:0 10px;border-radius:4px;background-color:#faf0ef;color:#CE4031;"-->
                                        <!--&gt;-->
                                        <!--店铺优惠力度-->
                                        <!--</div>-->
                                    </div>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
                <div class="no-data" v-show="ShopGo.allAdvList.length <= 0">暂无数据</div>
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
import Layer from '~/components/Layer.vue';

import axios from 'axios';
import Cookies from 'js-cookie';

export default {
    middleware: 'mobile',
    components: {
        Toper,
        Slide,
        Subject,
        Footer,
        Layer
    },
    data() {
        return {
            // 大图闪现处理变量
            cover222: false,
            // 是否显示巨幕
            ShowLargePic: false,
            // 广告定时器变量
            adTimerInterval: null,
            // 巨幕显示时间
            ShowLargePicTime: 0,
            // 顶部参数
            toperParams: {
                backgroundColor: 'black'
            },
            // 弹出框参数
            layerParams: {
                style: {
                    'max-width': '500px',
                    height: 'auto'
                }
            },
            // 公用swiper参数
            swiperOption: {
                grabCursor: true,
                slidesPerView: '8',
                slidesPerColumn: '2',
                slidesPerColumnFill: 'row',
                spaceBetween: 18,
                observer: true,
                observeParents: true,
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true
                },
                // navigation: {
                //     nextEl: ".swiper-button-next",
                //     prevEl: ".swiper-button-prev"
                // },
                breakpoints: {
                    320: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 2
                    },
                    1080: {
                        slidesPerView: 4
                    },
                    1200: {
                        slidesPerView: 6
                    },
                    1440: {
                        slidesPerView: 8
                    }
                }
            },
            swiperOption2: {
                grabCursor: true,
                // slidesPerView: '6',
                slidesPerColumn: '2',
                slidesPerColumnFill: 'row',
                spaceBetween: 18,
                observer: true,
                observeParents: true,
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true
                },
                // navigation: {
                //     nextEl: ".swiper-button-next",
                //     prevEl: ".swiper-button-prev"
                // },
                breakpoints: {
                    320: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 2
                    },
                    1080: {
                        slidesPerView: 4
                    },
                    1200: {
                        slidesPerView: 6
                    },
                    1440: {
                        slidesPerView: 8
                    }
                }
            },
            // 亲子栏目 - tab切换
            ParentChildProgramSwitch: {
                index: 0,
                list: [
                    {
                        name: '热门推荐',
                        token: '703f1dbd3d0d44738e10e0d58748b3a2'
                    },
                    {
                        name: '季播节目',
                        token: 'c901ae875ae1487ba33965e020d51c60'
                    },
                    {
                        name: '周播节目',
                        token: '0641b575cfdb4b6fbf0a50a921262304'
                    }
                ]
            },
            // 精彩片段 - tab切换
            HighlightsSwitch: {
                index: 0,
                list: [
                    {
                        name: '热门推荐',
                        token: 'bbbdae4143f8443a878109de4a911d59'
                    },
                    {
                        name: '运动不一样',
                        token: 'c13b5be260cb43ce829af6d50a5e7bec'
                    },
                    {
                        name: '爱上幼儿园',
                        token: 'f522794064634341b553a9d90681cddd'
                    },

                    {
                        name: '疯狂的麦咭',
                        token: '47087298e18143ffad8cbbaf0047f2e5'
                    },
                    {
                        name: '麦咭小厨',
                        token: '721a647672ae43a69fac3e81733a50a5'
                    }
                ]
            },
            // 动漫卡通 - tab切换
            AnimeCartoonSwitch: {
                index: 0,
                list: [
                    {
                        name: '热门推荐',
                        token: 'b2abb5e6770c4a509811f609a96a653e'
                    },
                    {
                        name: '金鹰卡通自制',
                        token: '62a5886ab0014825b1c1e783e14c65e8'
                    },
                    {
                        name: '经典动画',
                        token: 'ffc84360c04546a59ca21c9166331f5c'
                    }
                ]
            },
            // 麦粉学堂 - tab切换
            MaiJiClassroomSwitch: {
                index: 0,
                list: [
                    {
                        name: '热门推荐',
                        token: '2758d27dbdbe4c7fa68767466a6502c0'
                    },
                    {
                        name: '国学经典',
                        token: '1f64f6f70f684beaa921067324a37ba9'
                    },
                    {
                        name: '历史文学',
                        token: '5a39298b9b254f5fadf3b607890cb8ac'
                    },
                    {
                        name: '音乐教学',
                        token: 'e7e854b4b2db4ba3a013d4991fc80913'
                    },
                    {
                        name: '童话故事',
                        token: 'cf84dcf929dc4edaa25b5a1134c3f331'
                    }
                ]
            },
            // 麦咭头条 - tab切换
            MaiJiNewsSwitch: {
                index: 0,
                list: [
                    {
                        name: '麦咭头条',
                        token: '7c09ddae806948a08fc9013de817e58d'
                    },
                    {
                        name: '生活',
                        token: '8bae40e6a6f04f57813480f55e7f3bac'
                    },
                    {
                        name: '育儿',
                        token: '163eafc25062416c80f6d2db9870695e'
                    },
                    {
                        name: '教育',
                        token: '20c7fef6eded4569bceece7f2e31bed9'
                    }
                ]
            },
            // 商城热卖 - tab切换
            ShopHotSaleSwitch: {
                index: 0,
                list: [
                    {
                        name: '好物推荐',
                        token: '17f28ae4050544e693e2fe7a366e1f3b'
                    },
                    {
                        name: '店铺推荐',
                        token: 'bb08ac449ffc4522adc57ddb1a6eaff0'
                    }
                    // {
                    //     name: "秒杀",
                    //     token: ""
                    // }
                ]
            },
            // 店铺直达 - tab切换
            ShopGoSwitch: {
                index: 0,
                list: [
                    {
                        name: '麦咭推荐',
                        token: '1588bc079f9048e98e4d171f78b05144'
                    },
                    {
                        name: '玩具',
                        token: 'ab5db442cc074901a34badfa04362cce'
                    },
                    {
                        name: '书籍',
                        token: '8c34819a126e445891899cd9f7445d30'
                    }
                ]
            },
            // 萌娃秀 - tab切换
            MengBaoVideoSwitch: {
                index: 0,
                list: [
                    {
                        name: '热门推荐',
                        token: '0a15d438066c4663bd1be8a66ed761dd'
                    },
                    {
                        name: '运动不一样',
                        token: '2b161754e33b42708f0dcb97d7801f2b'
                    },
                    {
                        name: '爱上幼儿园',
                        token: 'd6ad6855184a489b9838b2fed0389435'
                    },
                    {
                        name: '麦咭小厨',
                        token: '5dde5c03144f452db204887e3e3aafda'
                    }
                ]
            }
        };
    },
    computed: {
        // 登录数据
        loginData() {
            return this.$store.state.loginData;
        },
        // 用户数据
        userData() {
            return this.$store.state.userData;
        },
        // 会话数据
        session() {
            return this.$store.state.session;
        },
        // 亲子节目 - 滑动参数
        ParentChildProgramSwiperOption() {
            let json = JSON.parse(JSON.stringify(this.swiperOption));
            json.navigation = {
                nextEl: '.ParentChildProgramSwiper .next',
                prevEl: '.ParentChildProgramSwiper .prev'
            };

            return json;
        },
        // 精彩花絮 - 滑动参数
        HighlightsSwiperOption() {
            let json = JSON.parse(JSON.stringify(this.swiperOption));
            json.navigation = {
                nextEl: '.HighlightsSwiper .next',
                prevEl: '.HighlightsSwiper .prev'
            };

            return json;
        },
        // 动漫卡通 - 滑动参数
        AnimeCartoonSwiperOption() {
            let json = JSON.parse(JSON.stringify(this.swiperOption2));
            json.slidesPerView = 6;
            json.breakpoints = {
                320: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 2
                },
                1200: {
                    slidesPerView: 4
                },
                1440: {
                    slidesPerView: 6
                }
            };
            json.navigation = {
                nextEl: '.AnimeCartoonSwiper .next',
                prevEl: '.AnimeCartoonSwiper .prev'
            };

            return json;
        },
        // 萌娃秀 - 滑动参数
        MengBaoVideoSwiperOption() {
            let json = JSON.parse(JSON.stringify(this.swiperOption));
            json.slidesPerColumn = 1;
            json.spaceBetween = 18;
            json.navigation = {
                nextEl: '.MengBaoVideoSwiper .next',
                prevEl: '.MengBaoVideoSwiper .prev'
            };

            return json;
        },
        // 麦粉学堂 - 滑动参数
        MaiJiClassroomSwiperOption() {
            let json = JSON.parse(JSON.stringify(this.swiperOption2));
            json.slidesPerView = 6;
            json.breakpoints = {
                320: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 2
                },
                1200: {
                    slidesPerView: 4
                },
                1440: {
                    slidesPerView: 6
                }
            };
            json.navigation = {
                nextEl: '.MaiJiClassroomSwiper .next',
                prevEl: '.MaiJiClassroomSwiper .prev'
            };

            return json;
        },
        // 麦咭新闻 - 滑动参数
        MaiJiNewsSwiperOption() {
            let json = JSON.parse(JSON.stringify(this.swiperOption));
            json.slidesPerColumn = 1;
            json.navigation = {
                nextEl: '.MaiJiNewsSwiper .next',
                prevEl: '.MaiJiNewsSwiper .prev'
            };

            return json;
        },
        // 商场热卖 - 滑动参数
        ShopHotSaleSwiperOption() {
            let json = JSON.parse(JSON.stringify(this.swiperOption));
            json.slidesPerColumn = 1;
            json.navigation = {
                nextEl: '.ShopHotSaleSwiper .next',
                prevEl: '.ShopHotSaleSwiper .prev'
            };

            return json;
        },
        // 店铺直达 - 滑动参数
        ShopGoSwiperOption() {
            let json = JSON.parse(JSON.stringify(this.swiperOption));
            json.slidesPerColumn = 1;
            json.navigation = {
                nextEl: '.ShopGoSwiper .next',
                prevEl: '.ShopGoSwiper .prev'
            };
            return json;
        }
    },

    async asyncData(context) {
        let that = context.app;
        let res = {};

        // 巨幕广告
        let LargePic = await that.$getRecObjectList({
            pageNum: 1,
            pageSize: 1,
            recPosition: '178475081fed475e875b9ceb960ceac4'
        });
        // 巨幕初始化空数据
        let largePicData = {};
        if (LargePic.allAdvList.length > 0) {
            largePicData = LargePic.allAdvList[0];
            if (largePicData.extendedField2 && !isNaN(Number(largePicData.extendedField2))) {
                res.ShowLargePicTime = Number(largePicData.extendedField2);
            }
        }
        res.LargePic = largePicData;

        // 排行榜
        res.AlbumRank = await that.$getRecObjectList({
            pageNum: 1,
            pageSize: 8,
            recPosition: 'b5788f0d25bd41d8a9402f1cf94e5b7e'
        });

        // --------------------------------------------
        // 亲子节目 - 热门推荐
        let ParentChildProgram = await that.$getRecObjectList({
            pageSize: 20,
            pageNum: 1,
            recPosition: '703f1dbd3d0d44738e10e0d58748b3a2'
        });
        ParentChildProgram.allAdvList.forEach(function(item) {
            let res = item.title.split('：');
            if (res.length < 2) {
                item.my_title_one = '';
                item.my_title_two = res[0];
            } else {
                item.my_title_one = res[0];
                item.my_title_two = res[1];
            }
        });
        res.ParentChildProgram = ParentChildProgram;

        // --------------------------------------------
        // 商城热卖
        res.ShopHotSale = await that.$getRecObjectList({
            pageSize: 20,
            pageNum: 1,
            recPosition: '17f28ae4050544e693e2fe7a366e1f3b'
        });

        // --------------------------------------------
        // 店铺直达
        res.ShopGo = await that.$getRecObjectList({
            pageSize: 20,
            pageNum: 1,
            recPosition: '1588bc079f9048e98e4d171f78b05144'
        });

        // --------------------------------------------
        // 动漫卡通
        let AnimeCartoon = await that.$getRecObjectList({
            pageSize: 20,
            pageNum: 1,
            recPosition: 'b2abb5e6770c4a509811f609a96a653e'
        });
        AnimeCartoon.allAdvList.forEach(function(item) {
            let res = item.title.split('》');
            if (res.length < 2) {
                item.my_title_one = '';
                item.my_title_two = res[0] + '》';
            } else {
                item.my_title_one = res[1];
                item.my_title_two = res[0] + '》';
            }
        });
        res.AnimeCartoon = AnimeCartoon;

        // --------------------------------------------
        // 动画热播-右侧排行榜
        res.AnimeCartoonRank = await that.$getRankList({
            pageNum: 1,
            pageSize: 10,
            type: 'CARTOON'
        });

        // --------------------------------------------
        // 精彩片段
        res.Highlights = await that.$getRecObjectList({
            pageSize: 20,
            pageNum: 1,
            recPosition: 'bbbdae4143f8443a878109de4a911d59'
        });

        // --------------------------------------------
        // 节目互动
        let ProgramInteraction = await that.$getRecObjectList({
            pageSize: 4,
            pageNum: 1,
            recPosition: '1e214ce63203415c97a69ad49831ef76'
        });

        ProgramInteraction.allAdvList.forEach(function(item, index) {
            if (index === 0) {
                item.my_title_one = '2019-07-08';
                item.my_title_two = '2019-09-22';
                item.my_join_number = '20.4万+';
            }
            if (index === 1) {
                item.my_title_one = '2019-07-06';
                item.my_title_two = '2019-09-07';
                item.my_join_number = '12.8万+';
            }
            if (index === 2) {
                item.my_title_one = '2019-08-20';
                item.my_title_two = '2020-09-20';
                item.my_join_number = '8.5万+';
            }
            if (index === 3) {
                item.my_title_one = '2019-08-26';
                item.my_title_two = '2021-08-26';
                item.my_join_number = '9.6万+';
            }
        });
        res.ProgramInteraction = ProgramInteraction;

        // --------------------------------------------
        // 热门活动
        res.HotActive = await that.$getRecObjectList({
            pageSize: 2,
            pageNum: 1,
            recPosition: '83f41a9e119241c097e69ba3f872494d'
        });

        // --------------------------------------------
        // 麦粉学堂
        res.MaiJiClassroom = await that.$getRecObjectList({
            pageSize: 20,
            pageNum: 1,
            recPosition: '2758d27dbdbe4c7fa68767466a6502c0'
        });

        // --------------------------------------------
        // 麦粉排行榜
        res.MaiJiClassroomRank = await that.$getRankList({
            pageNum: 1,
            pageSize: 10,
            type: 'MAIFEN_COURSE'
        });

        // --------------------------------------------
        // 麦萌热推
        res.MaiMengReTui = await that.$getRecObjectList({
            pageSize: 2,
            pageNum: 1,
            recPosition: '6fa667ddc928496498ab014578b7dbea'
        });

        // -------------------------------------------
        // 萌宝视频 - 推荐
        let MengBaoVideo = await that.$getRecObjectList({
            pageSize: 1,
            pageNum: 1,
            recPosition: '0a15d438066c4663bd1be8a66ed761dd'
        });

        // -------------------------------------------
        // 萌娃秀
        let MengWaShow = await that.$getDareWorkTop({
            pageNum: 1,
            pageSize: 20,
            type: 2,
            actId: MengBaoVideo.allAdvList[0].itemId
        });
        res.MengBaoVideo = MengWaShow;

        // -------------------------------------------
        // 麦咭资讯
        res.MaiJiNews = await that.$getRecObjectList({
            pageSize: 20,
            pageNum: 1,
            recPosition: '7c09ddae806948a08fc9013de817e58d'
        });
        // -------------------------------------------
        return res;
    },
    mounted() {
        // 开始处理巨幕
        this.M_ShowLargePic();
        // 防止大图闪现处理程序
        setTimeout(() => {
            this.cover222 = true;
        }, 300);
    },
    methods: {
        // 是否显示巨幕
        M_ShowLargePic() {
            if (this.session.isLogin === true) {
                let t = new Date();
                let d = t.getDate();
                let LastLargeImageTime = localStorage.getItem('LastLargeImageTime');
                if (LastLargeImageTime) {
                    let t2 = new Date(Number(LastLargeImageTime));
                    let d2 = t2.getDate();
                    if (d == d2) {
                        this.ShowLargePic = false;
                        this.daojishi();
                    } else {
                        localStorage.setItem('LastLargeImageTime', Date.now());
                        this.ShowLargePic = true;
                        this.daojishi();
                    }
                } else {
                    localStorage.setItem('LastLargeImageTime', Date.now());
                    this.ShowLargePic = true;
                    this.daojishi();
                }
            } else {
                if (sessionStorage.getItem('ShowLargePic') !== 'true') {
                    this.ShowLargePic = true;
                    sessionStorage.setItem('ShowLargePic', 'true');
                    this.daojishi();
                }
            }
        },
        // 倒计时
        daojishi() {
            if (this.ShowLargePicTime > 0) {
                let myThis = this;
                this.adTimerInterval = setInterval(() => {
                    --myThis.ShowLargePicTime;
                    if (myThis.ShowLargePicTime === 0) {
                        myThis.closeLargeAdPic();
                    }
                }, 1000);
            }
        },
        // 关闭巨幕
        closeLargeAdPic() {
            this.ShowLargePic = false;
            if (this.adTimerInterval) {
                clearInterval(this.adTimerInterval);
                this.adTimerInterval = null;
            }
        },
        // 使用play播放器
        usePlay: async function(item) {
            // itemId
            // 参数前缀
            let prefixParams = item.itemId.substring(0, 3);
            if (prefixParams === 'AGP') {
                // 专辑
                let ActProgramInfo = await axios.post(this.$domain + '/act/actProgram/getActProgram', {
                    id: item.itemId
                });
                // 季播
                let SeasonPlayer = await axios.post(this.$domain + '/common/queryMarkSortDetail', {
                    bundleId: ActProgramInfo.data.body.tvBundleId
                });
                // 剧集
                let DramaLists = await axios.post(this.$domain + '/common/queryResItems', {
                    bundleId: ActProgramInfo.data.body.tvBundleId,
                    markSort: SeasonPlayer.data.body[0].markSort,
                    cateGory: 'OFFICIAL',
                    isDownSort: false,
                    pageNum: 1,
                    pageSize: 1
                });
            }
        },
        // 滑块上一个
        SwiperPrev: function(whichSwiper) {
            this[whichSwiper].slidePrev();
        },
        // 滑块下一个
        SwiperNext: function(whichSwiper) {
            this[whichSwiper].slideNext();
        },
        // 关闭弹框
        // closeLayer(){
        //     this.is
        // },
        async playCourse(item) {
            let DramaLists = await axios.post(this.$domain + '/mer/getKnowledgeDetails', {
                knowledgeId: item.itemId
            });
            let token = '';
            let len = DramaLists.data.body.qualityRspDTOs.length;
            for (let i = 0; i < len; i++) {
                if (DramaLists.data.body.qualityRspDTOs[i].type === 7) {
                    token = DramaLists.data.body.qualityRspDTOs[i].id;
                    break;
                }
            }
            this.$router.push('/play-course/' + token);
        },
        // 亲子节目
        TabSwitchOfParentChildProgram: async function(item, index) {
            let that = this;
            this.ParentChildProgramSwitch.index = index;
            if (item.token !== '') {
                let ParentChildProgram = await that.$getRecObjectList({
                    pageSize: 20,
                    pageNum: 1,
                    recPosition: item.token
                });

                ParentChildProgram.allAdvList.forEach(function(item) {
                    let res = item.title.split('：');
                    if (res.length < 2) {
                        item.my_title_one = '';
                        item.my_title_two = res[0];
                    } else {
                        item.my_title_one = res[0];
                        item.my_title_two = res[1];
                    }
                });
                this.ParentChildProgram = ParentChildProgram;
            } else {
                this.ParentChildProgram = {
                    allAdvList: []
                };
            }
        },
        // 精彩推荐
        TabSwitchOfHighlights: async function(item, index) {
            let that = this;
            this.HighlightsSwitch.index = index;
            if (item.token !== '') {
                this.Highlights = await that.$getRecObjectList({
                    pageSize: 20,
                    pageNum: 1,
                    recPosition: item.token
                });
            } else {
                this.Highlights = {
                    allAdvList: []
                };
            }
        },
        // 动漫卡通切换
        TabSwitchOfAnimeCartoon: async function(item, index) {
            let that = this;
            this.AnimeCartoonSwitch.index = index;
            if (item.token !== '') {
                let AnimeCartoon = await that.$getRecObjectList({
                    pageSize: 20,
                    pageNum: 1,
                    recPosition: item.token
                });
                AnimeCartoon.allAdvList.forEach(function(item) {
                    let res = item.title.split('》');
                    if (res.length < 2) {
                        item.my_title_one = '';
                        item.my_title_two = res[0] + '》';
                    } else {
                        item.my_title_one = res[1];
                        item.my_title_two = res[0] + '》';
                    }
                });
                this.AnimeCartoon = AnimeCartoon;
            } else {
                this.AnimeCartoon = {
                    allAdvList: []
                };
            }
        },
        // 麦粉学堂
        TabSwitchOfMaiJiClassroom: async function(item, index) {
            let that = this;
            this.MaiJiClassroomSwitch.index = index;
            if (item.token !== '') {
                this.MaiJiClassroom = await that.$getRecObjectList({
                    pageSize: 20,
                    pageNum: 1,
                    recPosition: item.token
                });
            } else {
                this.MaiJiClassroom = {
                    allAdvList: []
                };
            }
        },
        // 麦咭头条
        TabSwitchOfMaiJiNews: async function(item, index) {
            let that = this;
            this.MaiJiNewsSwitch.index = index;
            if (item.token !== '') {
                this.MaiJiNews = await that.$getRecObjectList({
                    pageSize: 20,
                    pageNum: 1,
                    recPosition: item.token
                });
            } else {
                this.MaiJiNews = {
                    allAdvList: []
                };
            }
        },
        // 商城热卖 - 切换栏
        TabSwitchOfShopHotSale: async function(item, index) {
            let that = this;
            this.ShopHotSaleSwitch.index = index;
            if (item.token !== '') {
                this.ShopHotSale = await that.$getRecObjectList({
                    pageSize: 20,
                    pageNum: 1,
                    recPosition: item.token
                });
            } else {
                this.ShopHotSale = {
                    allAdvList: []
                };
            }
        },
        // 店铺直达
        TabSwitchOfShopGo: async function(item, index) {
            let that = this;
            this.ShopGoSwitch.index = index;
            if (item.token !== '') {
                this.ShopGo = await that.$getRecObjectList({
                    pageSize: 20,
                    pageNum: 1,
                    recPosition: item.token
                });
            } else {
                this.ShopGo = {
                    allAdvList: []
                };
            }
        },
        // 萌娃秀
        TabSwitchOfMengBaoVideo: async function(item, index) {
            let that = this;
            this.MengBaoVideoSwitch.index = index;
            if (item.token !== '') {
                let MengBaoVideo = await that.$getRecObjectList({
                    pageSize: 1,
                    pageNum: 1,
                    recPosition: item.token
                });

                let MengWaShow = await that.$getDareWorkTop({
                    pageNum: 1,
                    pageSize: 20,
                    type: 2,
                    actId: MengBaoVideo.allAdvList[0].itemId
                });
                this.MengBaoVideo = MengWaShow;
            } else {
                this.MengBaoVideo = {
                    list: []
                };
            }
        }
    }
};
</script>
<style lang="scss">
.large-picture {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    // height: 440px;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.5);

    .fore {
        position: relative;
        width: 100%;
        height: 100%;
        /*background-color: #c4a31d;*/

        .large-img-bg {
            /*background-color: #00ADEF;*/
            width: 100%;
            height: 100%;
            overflow: hidden;

            .large-img {
                // object-fit: cover;
                width: 100%;
                height: 100%;
            }
        }

        .close-time-bg {
            /*background-color: #c4a31d;*/
            position: absolute;
            right: 20px;
            top: 20px;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .close {
                width: 40px;
                height: 40px;
                background: rgba(0, 0, 0, 0.5);
                /*text-align: center;*/
                /*line-height: 60px;*/
                color: #fff;
                border-radius: 50%;
                /*cursor: pointer;*/
                display: flex;
                align-items: center;
                justify-content: center;
                // padding: 0 0 7px 2px;
                margin-left: 20px;

                &:after {
                    /*background-color: #c4a31d;*/
                    content: '×';
                    font-size: 30px;
                    /*line-height: 60px;*/
                    /*height: 100%;*/
                    /*display: flex;*/
                    /*align-items: center;*/
                }
            }

            p {
                color: #333;
                font-size: 20px;

                span {
                    color: #ef1923;
                }
            }
        }
    }
}
</style>
