<template>
    <div class="container maiji-shop">
        <!-- 头部 -->
        <Toper :toperParams="toperParams" />

        <div class="main-area">
            <div class="wrap">
                <div class="title2">评价宝贝</div>
                <div class="evalute-area">
                    <div class="left">
                        <div
                            class="image background-contain"
                            :style="{
                                backgroundImage: 'url(' + evaluteBackgroundImage + '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)',
                            }"
                        ></div>
                        <div class="text">
                            {{ evaluteSummary }}
                        </div>
                    </div>
                    <div class="right">
                        <div class="heart-area">
                            <div class="heart active"></div>
                            <div class="heart"></div>
                            <div class="heart"></div>
                            <div class="heart"></div>
                            <div class="heart"></div>
                        </div>
                        <div class="textarea">
                            <textarea placeholder="宝贝您还满意吗？说说他的优点和不足的地方吧！您的评价能帮助其他小伙伴哦~（200字以内）" v-model="evaluteContent"></textarea>
                        </div>
                        <div class="upload-action" id="upload-action">
                            <div class="button">添加图片/视频</div>
                        </div>
                    </div>
                </div>
                <div class="submit-area">
                    <div class="submit" @click="SubmitEvalute">发表评论</div>
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
import axios from 'axios';
import _ from 'lodash';
export default {
    data() {
        return {
            toperParams: {
                backgroundColor: 'white',
                category: 'maiji-shop',
            },
            evaluteGoodsDetail: {},
            evaluteContent: '',
        };
    },
    computed: {
        // 评价背景图
        evaluteBackgroundImage() {
            let url = '';
            if (_.isArray(this.evaluteGoodsDetail.goodsList) && this.evaluteGoodsDetail.goodsList.length > 0) {
                return this.evaluteGoodsDetail.goodsList[0].mallGoodsEspImg;
            }
            return url;
        },
        // 图片描述文字
        evaluteSummary() {
            let text = '';
            if (_.isArray(this.evaluteGoodsDetail.goodsList) && this.evaluteGoodsDetail.goodsList.length > 0) {
                return this.evaluteGoodsDetail.goodsList[0].mallGoodsDes;
            }
            return text;
        },
        loginData() {
            return this.$store.state.loginData;
        },
        userData() {
            return this.$store.state.userData;
        },
        session() {
            return this.$store.state.session;
        },
    },
    components: {
        Toper,
        Slide,
        Subject,
        Footer,
    },
    async asyncData(context) {
        let res = {};
        // 商城目录
        // 添加评论参考
        // /mer/estimate/create
        // let _ = {
        //     chantId: 'MER1901044502',
        //     estimateDes: '99999',
        //     estimateLevel: '3',
        //     estimateType: '1',
        //     mallGoodsId: 'GOODS20190519005027',
        //     mallOrderId: 'MALL20190601012010',
        //     orderGoodsId: 'ORDGOODS20190601012010',
        //     userIcon: 'http://oss-maijitv.maijimeng.com/BB76CD0F-FF50-4E88-B617-61389CD87D44.jpg',
        //     userId: 'user.d5b234d7afa44ed9b7e9ac8c06292867',
        //     userName: '王可乐可乐',
        // };
    },
    mounted() {
        layui.upload.render({
            elem: '#upload-action',
            url: this.$domain + '/aly/openshop/api/uploadImg',
            headers:{
                token:this.$store.state.session.token || ''
            },
            done: function(res, index, upload) {
                //上传后的回调
            },
            //,accept: 'file' //允许上传的文件类型
            size: 10240, //最大允许上传的文件大小
            //,……
        });
        this.evaluteGoodsDetail = MJStore.get('mj_evaluteGoodsDetail') || {};
    },
    methods: {
        async SubmitEvalute() {
            let that = this;
            let reply = await axios({
                url: that.$domain + '/mer/estimate/create',
                method: 'post',
                headers: {
                    token: that.$store.state.session.token || '',
                },
                data: {
                    chantId: this.evaluteGoodsDetail.chantId,
                    estimateDes: this.evaluteContent,
                    estimateLevel: 3,
                    estimateType: 1,
                    mallGoodsId: this.evaluteGoodsDetail.goodsList[0].orderGoodsId,
                    mallOrderId: this.evaluteGoodsDetail.mallOrderId,
                    orderGoodsId: this.evaluteGoodsDetail.goodsList[0].orderGoodsId,
                    userIcon: this.userData.userIcon,
                    userName: this.userData.babyName,
                },
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.title2 {
    height: 50px;
    margin-top: 40px;
    line-height: 50px;
    width: 200px;
    background-color: #00aff0;
    text-align: center;
    color: #fff;
    font-size: 18px;
}
.main-area {
    padding-bottom: 20px;
}
.evalute-area {
    min-height: 200px;
    background-color: #fff;
    padding: 70px 120px 40px 120px;
    display: flex;
    .left {
        flex: 0 0 200px;
        .image {
            height: 200px;
            background-color: #99a;
        }
        .text {
            line-height: 26px;
        }
    }
    .right {
        flex: 1 1 100%;
        // padding: 0 40px;
        padding: 0 40px 10px 40px;
        .heart-area {
            display: flex;
            height: 50px;
            // background-color: #aa8;
            .heart {
                flex: 0 0 50px;
                background-repeat: no-repeat;
                background-image: url('/icon-comment-unlike.png');
                background-position: center center;
                background-size: 80% auto;
                height: 100%;
                cursor: pointer;
                &.active {
                    background-image: url('/icon-comment-like.png');
                }
            }
        }
        .textarea {
            min-height: 200px;
            background-color: #d1eeff;
            padding: 10px;
            textarea {
                background-color: #fff;
                width: 100%;
                min-height: 200px;
                padding: 10px;
                font-size: 14px;
            }
        }
        .upload-action {
            display: flex;
            padding: 10px;
            background-color: #d1eeff;
            .button {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 40px;
                flex: 0 0 auto;
                padding: 0 10px;
                background-color: #fff;
                cursor: pointer;
                color: #00aff0;
            }
        }
    }
}
.submit-area {
    height: 70px;
    display: flex;
    justify-content: center;
    background-color: #fff;
    padding-bottom: 20px;
    .submit {
        flex: 0 0 auto;
        padding: 0 20px;
        background-color: #00aff0;
        border-radius: 10px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
}
</style>
