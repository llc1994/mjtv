<template>
    <!-- 底部 -->
    <div class="footer">
        <!-- 固定导航 - 暂时隐藏 -->
        <div class="fixed-navigation">
            <div class="box x1">
                <div class="popup">
                    <div class="wrap2">
                        <a class="line y1" target="_blank" href="https://www.maijimaiji.cn/news">
                            <span class="icon"></span>麦咭头条
                        </a>
                        <a
                            class="line y2"
                            target="_blank"
                            href="https://www.maijimaiji.cn/zt/comic"
                        >
                            <span class="icon"></span>麦咭漫画
                        </a>
                        <a
                            class="line y3"
                            target="_blank"
                            href="https://www.maijimaiji.cn/zt/maijibiaoqing"
                        >
                            <span class="icon"></span>麦咭表情
                        </a>
                        <a
                            class="line y4"
                            target="_blank"
                            href="https://www.maijimaiji.cn/zt/robot"
                        >
                            <span class="icon"></span>智能生活
                        </a>
                    </div>
                </div>
            </div>
            <a class="box x2" target="_blank" href="https://www.maijimeng.com/app"></a>
            <nuxt-link to="/user-vip" class="box x3" target="_blank"></nuxt-link>
            <a class="box x4" target="_blank" href="https://www.maijimeng.com/app"></a>
            <div class="box x5" @click="backToTop"></div>
        </div>
        <div class="logo">
            <img src="/footer-logo.png" />
        </div>
        <div class="link">
            <nuxt-link target="_blank" class="a" to="/about/us">关于我们</nuxt-link>
            <nuxt-link target="_blank" class="a" to="/about/contact">联系我们</nuxt-link>
            <nuxt-link target="_blank" class="a" to="/about/feedback">意见建议</nuxt-link>
            <nuxt-link target="_blank" class="a" to="/about/agreement">用户声明</nuxt-link>
            <nuxt-link target="_blank" class="a" to="/about/help">使用帮助</nuxt-link>
        </div>
        <div class="copyright">
            Copyright@2018-2019 | 湖南金鹰卡通传媒有限公司 版权所有 |
            maijitv.com All Reserved.
        </div>
        <div class="copyright 2">营业执照注册号 91430000768015410U | 湘网文〔2017〕4466-046号</div>
        <div class="copyright 3">湘ICP备14005121号-3 | 湘公网安备43010502000148号</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        computed: {},
        mounted() {
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement('script');
                hm.src = 'https://hm.baidu.com/hm.js?39f9109a925144e4bb5b3419cfc1293d';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(hm, s);
            })();
        },
        methods: {
            backToTop() {
                let body = document.body;
                let doc = document.documentElement;
                if (body.scrollTop !== 0 || doc.scrollTop !== 0) {
                    $(doc, body).animate(
                        {
                            scrollTop: 0
                        },
                        200
                    );
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .fixed-navigation {
        position: fixed;
        right: 10px;
        bottom: 100px;
        width: 50px;
        border-left: 1px solid #ddd;
        border-top: 1px solid #ddd;
        border-right: 1px solid #ddd;
        background-color: #fff;
        border-radius: 6px;
        box-shadow: 0px 0px 4px #c3c3c3;
        z-index: 999999;
        .popup {
            position: absolute;
            right: 46px;
            height: 180px;
            width: 160px;
            padding-right: 24px;
            top: -60px;
            padding: 10px;

            display: none;
            .wrap2 {
                width: 100%;
                height: 100%;
                border-radius: 6px;
                background-color: #fff;
                border: 1px solid #ddd;
            }
            .line {
                height: 40px;
                cursor: pointer;
                font-size: 16px;
                &:hover {
                    color: #0bb2f1;
                }
                .icon {
                    width: 40px;
                    height: 40px;
                    vertical-align: middle;
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-size: 50% auto;
                }
                &.y1 .icon {
                    background-image: url('/index-fixed/资讯.png');
                }
                &.y1:hover .icon {
                    background-image: url('/index-fixed/资讯-选中.png');
                }
                &.y2 .icon {
                    background-image: url('/index-fixed/漫画.png');
                }
                &.y2:hover .icon {
                    background-image: url('/index-fixed/漫画-选中.png');
                }
                &.y3 .icon {
                    background-image: url('/index-fixed/表情.png');
                }
                &.y3:hover .icon {
                    background-image: url('/index-fixed/表情-选中.png');
                }
                &.y4 .icon {
                    background-image: url('/index-fixed/智能.png');
                }
                &.y4:hover .icon {
                    background-image: url('/index-fixed/智能-选中.png');
                }
            }
        }
        .box {
            width: 100%;
            height: 50px;
            border-bottom: 1px solid #eee;
            background-repeat: no-repeat;
            background-position: center center;
            cursor: pointer;
        }
        .x1 {
            position: relative;
            background-image: url('/toper/menu.png');
            background-size: 50% auto;
            &:hover {
                .popup {
                    display: block;
                }
            }
        }
        .x2 {
            background-image: url('/toper/upload.png');
            background-size: 50% auto;
        }
        .x3 {
            background-image: url('/toper/vip.png');
            background-size: 50% auto;
        }
        .x4 {
            background-image: url('/toper/mobile.png');
            background-size: 40% auto;
        }
        .x5 {
            background-image: url('/toper/arrow.png');
            background-size: 40% auto;
        }
    }
</style>
