<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <!-- 轮播图 -->
        <Slide :AlbumRank="AlbumRank" />

        <!-- 答题互动 -->
        <div class="media-area" id="datihudong" v-if="res1.allAdvList.length > 0">
            <div class="index-title">
                <div class="wrap">
                    <nuxt-link target="_blank" to="parent-child" class="title">答题互动</nuxt-link>
                    <div class="section">
                        <div class="section">
                            <div class="pinyin">dá tí hù dòng</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wrap row">
                <div class="media-type-7 col col-pc-6 col-pad-12 col-mobile-12" v-for="(item, index) in res1.allAdvList" :key="index" >
                    <div class="inner-wrap" @click="ShowProgramQRcodePop(item)" >
                        <div class="inner-wrap-content inner-wrap-content-ddd">
                            <div class="cover">
                                <img :src="item.customImgUrl">
                            </div>
                            <div class="time-people-group">
                                <div class="time-people" style="padding:0 10px 10px;">
                                    <span>{{ item.descript }}</span>
                                </div>
                                <div class="time-people" style="padding:0 10px 10px;">
                                    <span>{{item.extendedField2}}</span>
                                </div>
                                <div class="summary2" style="padding:0 10px;color:#666;">
                                {{ item.my_title_one }}
                            </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 节目互动 -->
        <div class="media-area" id="jiemuhudong">
            <div class="index-title">
                <div class="wrap">
                    <nuxt-link target="_blank" to="parent-child" class="title">节目互动</nuxt-link>
                    <div class="section">
                        <div class="section">
                            <div class="pinyin">jié mù hù dòng</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wrap row">
                <div class="media-type-6 col col-pc-3 col-pad-3 col-mobile-6" v-for="(item, index) in res2.allAdvList" :key="index">
                    <div class="inner-wrap" @click="ShowProgramQRcodePop(item)">
                        <div class="inner-wrap-content">
                            <div
                                class="cover"
                                :style="{
                                    backgroundImage: 'url(' + item.customImgUrl + ')'
                                }"
                            ></div>
                            <div class="summary">
                                {{ item.extendedField5 }}
                            </div>
                            <div class="time-people">
                                活动时间：<span>{{ item.extendedField2 }} 至 {{ item.extendedField3 }}</span>
                            </div>
                            <div class="time-people">
                                参与人数：<span>{{ item.extendedField4 }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部 -->
        <Footer />

        <!-- 节目互动二维码弹窗 -->
        <!-- <CommonQRCodePop ref="CommonQRCodePop" /> -->
        <div class="layer layer-qrCode" :class="{active:commonQRCodePopViewShow.show === true}">
            <div class="form-white-content">
                <div class="close-bg">
                    <div class="close" @click="closeQRCodePop"></div>
                </div>

                <div class="qrcode-bg-content" >
                    <img src="/qrcode-bg.png" style="height: 115%">
                    <div class="qrcode-img" style="height:48%;" ref="qrcodeImg" id="id-qrcode"></div>
                    <!-- <img class="qrcode-img" :src="commonQRCodeImgName" style="height: 48%"> -->
                </div>
                <div class="qrcode-info-text">
                    {{commonQRCodePopInfoText}}<br>体验更流畅
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Toper from '~/components/Toper.vue';
import Footer from '~/components/Footer.vue';
import Slide from '~/components/Slide.vue';
import Subject from '~/components/Subject.vue';
// import CommonQRCodePop from '~/components/CommonQRCodePop.vue';
import axios from 'axios';

export default {
    data() {
        return {
            // 高亮导航
            isNav: 'program-interaction',
            // 顶部参数
            toperParams: {
                backgroundColor: 'white',
                category: 'program-interaction'
            },
            commonQRCodePopViewShow: {
                show: false
            },
            commonQRCodeImgName: "",
            commonQRCodePopInfoText: "",
            qrcode:null
        };
    },
    components: {
        Toper,
        Slide,
        Subject,
        Footer,
        // CommonQRCodePop
    },
    methods: {
        closeQRCodePop() {
            // 关闭弹框
            this.commonQRCodePopViewShow.show = false;
        },
        // 显示二维码弹框
        ShowProgramQRcodePop(item) {
            let that = this;
            // 二维码引用
            $('#id-qrcode').empty();
            this.qrcode = new QRCode(this.$refs['qrcodeImg'], {
                text: item.to,
                width: 144,
                height: 144,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.M,
            });
            this.commonQRCodePopInfoText = '使用手机或Pad，扫描二维码参与节目互动';
            this.commonQRCodePopViewShow = {
                show: true
            };
        }
    },
    async asyncData(context) {
        let that = context.app;
        let res = {};

        // 轮播图
        res.AlbumRank = await that.$getRecObjectList({
            pageNum: 1,
            pageSize: 7,
            recPosition: 'b5788f0d25bd41d8a9402f1cf94e5b7e'
        });

        // 原创主题挑战赛
        res.res1 = await that.$getRecObjectList({
            pageNum: '1',
            pageSize: '2',
            recPosition: 'e50e8f439139465aa231fb8d85a028d0'
        });

        // 原创主题挑战赛
        res.res2 = await that.$getRecObjectList({
            pageNum: '1',
            pageSize: '4',
            recPosition: '5070cbc981964a9988b82881d3c7977c'
        });

        return res;
    },
    mounted(){
        var hash = location.hash
        // datihudong(答题互动) jiemuhudong(节目互动)
        if(hash === '#datihudong' || hash === '#jiemuhudong'){
            if($(hash).offset()){
                $('html, body').animate({scrollTop: $(hash).offset().top - 80}, 1000)
            }
        }
    }
};
</script>
<style lang="scss" scoped>
#datihudong{
    .wrap{
        margin: 0 -10px;
    }
}
.media-type-7{
    height: auto;
    .cover{
        height: auto;
    }

    img{
        width: 100%;
    }
}
.inner-wrap {
    border: 2px solid #fff;
    transition: all 0.2s;
}
.inner-wrap:hover {
    border: 2px solid #01acf0;
    cursor: pointer;
}
.layer-qrCode{
    display: none;
    &.active{
        display: flex;
    }
}
</style>
