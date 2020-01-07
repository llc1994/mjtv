<template>
    <!-- 子栏目 -->
    <div class="index-subject">
        <div class="wrap row">
            <!-- 子栏目入口 -->
            <div class="subject-entry col col-pc-9 col-pad-9 col-mobile-12 row">
                <div class="group col col-pc-4 col-pad-6 col-mobile-12">
                    <div  class="box">
                        <div class="icon hunan-tv"></div>
                        <nuxt-link to="/parent-child"  class="title"  target="_blank">亲子节目</nuxt-link>
                        <nuxt-link to="/parent-child?#jibo"  class="sub-title" target="_blank">季播节目</nuxt-link>
                        <nuxt-link to="/parent-child?#changgui"  class="sub-title" target="_blank">周播节目</nuxt-link>
                    </div>
                </div>
                <div class="group col col-pc-4 col-pad-6 col-mobile-12">
                    <div class="box">
                        <div class="icon jie-mu-hu-dong"></div>
                        <nuxt-link to="/program-interaction" class="title">节目互动</nuxt-link>
                        <nuxt-link to="/program-interaction?#datihudong" class="sub-title" target="_blank">答题互动</nuxt-link>
                        <nuxt-link to="/program-interaction?#jiemuhudong" class="sub-title" target="_blank">节目参与</nuxt-link>
                    </div>
                </div>
                <div class="group col col-pc-4 col-pad-6 col-mobile-12">
                    <nuxt-link target="_blank" to="/anime-cartoon" class="box">
                        <div class="icon dong-man-ka-tong"></div>
                        <div class="title">动漫卡通</div>
                        <div class="sub-title">卡通自制</div>
                        <div class="sub-title">热播推荐</div>
                    </nuxt-link>
                </div>
                <div class="group col col-pc-4 col-pad-6 col-mobile-12">
                    <div class="box">
                        <div class="icon meng-bao-shi-pin"></div>
                        <nuxt-link target="_blank" to="/meng-bao-video" class="title">萌宝视频</nuxt-link>
                        <nuxt-link target="_blank" to="/meng-bao-video#mengWaShow" class="sub-title">萌娃秀</nuxt-link>
                        <nuxt-link target="_blank" to="/meng-bao-video#mengWaGou" class="sub-title">萌娃购</nuxt-link>
                    </div>
                </div>
                <div class="group col col-pc-4 col-pad-6 col-mobile-12">
                    <div class="box">
                        <div class="icon mai-ji-jiao-shi"></div>
                        <nuxt-link target="_blank" to="/maifen-classroom" class="title">麦粉学堂</nuxt-link>
                        <nuxt-link target="_blank" to="/maifen-classroom" class="sub-title">知识学堂</nuxt-link>
                        <nuxt-link target="_blank" to="/maiji-classroom" class="sub-title">在线课堂</nuxt-link>
                    </div>
                </div>
                <div class="group col col-pc-4 col-pad-6 col-mobile-12">
                    <div class="box">
                        <div class="icon mai-ji-shang-cheng"></div>
                        <nuxt-link target="_blank" to="/maiji-shop" class="title">麦咭商城</nuxt-link>
                        <nuxt-link target="_blank" to="/maiji-shop?#shangchengremai" class="sub-title">商城热卖</nuxt-link>
                        <nuxt-link target="_blank" to="/maiji-shop?#jingpindianpu" class="sub-title">精品店铺</nuxt-link>
                    </div>
                </div>
            </div>
            <!-- 上传和下载 -->
            <div class="upload-download col col-pc-2 col-pad-2 col-mobile-12">
                <div class="group">
                    <a
                        target="_blank"
                        href="https://www.maijimeng.com/app"
                        class="box upload"
                        style="background-size:30px auto;"
                    >
                        <div class="icon" style></div>
                        <div class="text">手机端下载</div>
                    </a>
                    <a target="_blank" href="https://www.maijimeng.com/pad" class="box download">
                        <div class="icon"></div>
                        <div class="text">PAD端下载</div>
                    </a>
                </div>
            </div>
            <!-- 广告位 -->
            <div class="ggw col col-pc-1 col-pad-1 col-mobile-12">
                <div class="subject-gg"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            pleaseWait() {
                this.$pleaseWait();
            },
        },
    };
</script>
<style lang="scss">
    .index-subject {
        // height: 120px;
        margin: 20px 0;
        .subject-entry {
            // display: flex;
            // justify-content: space-between;
            // align-content: space-between;
            // flex-wrap: wrap;
            // flex: 1 1 100%;
            // max-width: 1100px;
            // margin-right: 30px;
            // margin: 0 -10px;
            .group {
                &:nth-of-type(1),&:nth-of-type(4){
                    padding-left: 0;
                }
                padding: 10px;
                // width: 33%;
                .box {
                    display: flex;
                    align-items: center;
                    height: 46px;
                    // width: 320px;

                    background-color: #f8f8f9;
                    border-radius: 23px;
                    overflow: hidden;
                }

                .icon {
                    flex: 0 0 46px;
                    min-width: 46px;
                    max-width: 46px;
                    height: 100%;
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-size: 60% auto;
                    &.hunan-tv {
                        background-image: url('/hunan-tv.png');
                    }
                    &.jie-mu-hu-dong {
                        background-image: url('/jie-mu-hu-dong.png');
                    }
                    &.dong-man-ka-tong {
                        background-size: 42% auto;
                        background-image: url('/dong-man-ka-tong.png');
                    }
                    &.meng-bao-shi-pin {
                        background-image: url('/meng-bao-shi-pin.png');
                    }
                    &.mai-ji-jiao-shi {
                        background-image: url('/mai-ji-jiao-shi.png');
                    }
                    &.mai-ji-shang-cheng {
                        background-image: url('/mai-ji-shang-cheng.png');
                    }
                }
                .title {
                    flex: 0 0 26%;
                    /*min-width: 80px;*/
                    max-width: 80px;
                    height: 18px;
                    line-height: 18px;
                    font-weight: bold;
                    border-right: 1px solid #999;
                    margin-right: 10px;
                    font-size: 15px;
                    white-space: nowrap;
                    word-break: keep-all;
                }
                .sub-title {
                    flex: 0 0 26%;
                    /*min-width: 90px;*/
                    white-space: nowrap;
                    word-break: keep-all;
                    max-width: 90px;
                    color: #999;
                    font-size: 15px;
                }
            }
        }
        .upload-download {
            // flex: 0 0 300px;
            padding-left: 20px;
            height: 120px;
            .group {
                display: flex;
                justify-content: space-around;
                border-left: 1px solid #ddd;
                height: 100%;
            }
            .box {
                display: flex;
                flex-direction: column;
                height: 100%;
                width: 100px;
                // background-color: #999;
                // background-repeat: no-repeat;
                // background-position: top 20px center;
                // background-size: 60% auto;
                text-align: center;
                background-repeat: no-repeat;
                background-position: center center;
            }
            .upload {
                background-size: 30px auto;
                background-image: url('/index-mobile.png');
            }
            .download {
                background-size: 50px auto;
                background-image: url('/index-pad.png');
            }
            .icon {
                flex: 1 1 100%;
            }
            .text {
                flex: 0 0 30px;
                // color: #fff;
            }
        }
        .subject-gg{
            height: 120px;
            background-color: #fff;
        }
    }
</style>
