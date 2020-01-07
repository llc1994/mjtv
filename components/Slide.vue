<template>
    <div class="slide index-slide">
        <div class="swiper-area">
            <div v-swiper:BannerSwiper="BannerSwiperOption" ref="ResBannerSwiper">
                <div class="swiper-wrapper">
                    <a
                        :href="item.to"
                        :to="item.to"
                        class="swiper-slide background-cover"
                        v-for="(item, index) in AlbumRank.allAdvList"
                        :key="index"
                        :style="{
                            backgroundImage: 'url(' + item.customImgUrl + '?x-oss-process=image/resize,w_1920/format,jpeg/quality,Q_90)'
                        }"
                        target="_blank"
                    ></a>
                </div>
                <!-- <div class="swiper-pagination swiper-pagination-bullets"></div> -->
            </div>
            <div class="rank-list">
                <!-- <div class="very-recommend">
                    <span class="fire iconfont icon-fire"></span>重磅推荐
                </div> -->
                <div class="list-box">
                    <a
                        :href="item.to"
                        :to="item.to"
                        class="group"
                        v-for="(item, index) in AlbumRank.allAdvList"
                        :key="index"
                        :class="{ active: item.active === true }"
                        target="_blank"
                    >
                        <div class="list" @mouseenter="AlbumRankMouseEnter(item, index)">
                            <div class="title">{{ item.title }}</div>
                            <div class="summary">{{ item.descript }}</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import _ from 'lodash';
    export default {
        props: ["AlbumRank", "Banner", "Play"],
        data() {
            return {
                rankBackgroundImage: "",
                // 轮播图参数
                BannerSwiperOption: {
                    loop: this.AlbumRank.allAdvList.length > 1,
                    autoplay: {
                        disableOnInteraction: false
                    },
                    // controller: {
                    //     control: this.RankSwiper //控制Swiper1
                    // },
                    on: {
                        slideChange: () => {
                            let swiper = this.$refs.ResBannerSwiper.swiper;
                            let i = swiper.activeIndex;
                            this.AlbumRank.allAdvList.forEach(function(
                                item,
                                index
                            ) {
                                item.active = false;
                            });
                            i = i >= this.AlbumRank.allAdvList.length + 1 ? 1 : i;
                            this.AlbumRank.allAdvList[i - 1].active = true;
                        }
                    }
                },
                // 排行榜参数
                RankSwiperOption: {
                    direction: "vertical",
                    slidesPerView: 7,
                    loop: true
                    // autoplay: true,
                }
            };
        },
        created() {
            if (this.AlbumRank.allAdvList && this.AlbumRank.allAdvList.length > 0) {
                let itemData = this.AlbumRank.allAdvList[0];
                this.backgroundImage = itemData.customImgUrl;
                itemData.active = true;
            }
        },
        mounted() {
            let that = this;
        },
        methods: {
            //
            // 鼠标移进在排行榜上
            AlbumRankMouseEnter(item, index) {
                this.AlbumRank.allAdvList.forEach(function(item, index) {
                    item.active = false;
                });
                item.active = true;
                this.$refs.ResBannerSwiper.swiper.slideTo(index + 1);
                // this.rankBackgroundImage = item.customImgUrl;
            },
            // 鼠标移出在排行榜上
            AlbumRankMouseLeave(item, index) {
                this.AlbumRank.allAdvList.forEach(function(item, index) {
                    item.active = false;
                });
                // this.rankBackgroundImage = "";
            },
            // 鼠标点击排行榜
            async AlbumRankClick(item) {
                // 排行榜详情
                // let AlbumRankDetail = await axios.post(
                //     domain + "/act/actProgram/getActProgram",
                //     {
                //         pageNum: "1",
                //         pageSize: "8",
                //         id: item.itemId,
                //         type: 0
                //     }
                // );
                this.$router.push({
                    path: "/play/" + item.itemId
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    .index-slide {
        position: relative;
        max-height: 440px;
        height: 12rem;
        // background-color: #999;

        .swiper-area {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        // 排行榜背景图
        .rank-background-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            // background-repeat: no-repeat;
            // background-position: center center;
            // background-size: contain;
            background-color: #fff;
            z-index: 2;
        }
        .rank-list {
            position: absolute;
            width: 350px;
            top: 0;
            right: 0;
            bottom: 0;
            color: #fff;
            z-index: 333;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            flex-direction: column;
            .very-recommend {
                display: flex;
                align-items: center;
                height: 62px;
                font-size: 20px;
                font-weight: bold;
                border-bottom: 1px solid #eee;
                margin: 0 20px 10px 20px;
            }
            .list-box {
                flex: 1 1 100%;
            }
            .group {
                height: 47px;
                line-height: 47px;
                font-size: 18px;
                padding: 0 50px;
                cursor: pointer;
                overflow: hidden;

                .summary {
                    height: 0;
                    overflow: hidden;
                }
                &.active {
                    background-color: #fff;
                    height: 83px;
                    width: 100%;
                    padding: 10px 50px;
                    .title {
                        height: 40px;
                        line-height: 40px;
                        font-size: 20px;
                        font-weight: bold;
                        overflow: hidden;
                        color: #00adef;
                    }
                    .summary {
                        height: 20px;
                        font-size: 14px;
                        line-height: 20px;
                        overflow: hidden;
                        color: #000;
                    }
                }
            }

            .fire {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 40px;
                width: 40px;
                font-size: 26px;
            }
        }
    }
</style>
