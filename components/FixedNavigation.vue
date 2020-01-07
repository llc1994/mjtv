<template>
    <!-- 固定导航 -->
    <div class="fixed-navigation">

        <!-- <div class="box x1">
            <div class="popup">
                <div class="wrap2">
                    <div class="line"><span class="icon"></span>麦咭头条</div>
                    <div class="line"><span class="icon"></span>麦咭漫画</div>
                    <div class="line"><span class="icon"></span>麦咭表情</div>
                    <div class="line"><span class="icon"></span>智能生活</div>
                </div>

            </div>
        </div> -->
        <!-- <div class="box x2"></div>
        <div class="box x3"></div>
        <div class="box x4"></div> -->
        <div class="box x5" @click="backToTop"></div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data() {
            return {
            };
        },
        computed: {
        },
        methods: {
            backToTop () {
                let body = document.body;
                let doc= document.documentElement;
                if (body.scrollTop !== 0 || doc.scrollTop !== 0) {
                    $(doc, body).animate({
                        scrollTop: 0
                    }, 200);
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
.fixed-navigation{
    position: fixed;
    right: 10px;
    bottom: 30px;
    width: 50px;
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
    border-right: 1px solid #ddd;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0px 0px 4px #c3c3c3;
    z-index: 999999;
    .popup{
        position: absolute;
        right: 46px;
        height: 180px;
        width: 160px;
        padding-right: 24px;
        top: -60px;
        padding: 10px;

        display: none;
        .wrap2{
            width: 100%;
            height: 100%;
            border-radius: 6px;
            background-color: #fff;
            border: 1px solid #ddd;
        }
        .line{
            height: 40px;
            cursor: pointer;
            .icon{
                width: 40px;
                height: 40px;
                vertical-align: middle;
            }
            &:hover{
                color: #0bb2f1;
            }
        }
    }
    .box{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #eee;
        background-repeat: no-repeat;
        background-position: center center;
        cursor: pointer;
    }
    .x1{
        position: relative;
        background-image: url('/toper/menu.png');
        background-size: 50% auto;
        &:hover{
            .popup{
                display: block;
            }
        }
    }
    .x2{
        background-image: url('/toper/upload.png');
        background-size: 50% auto;
    }
    .x3{
        background-image: url('/toper/vip.png');
        background-size: 50% auto;
    }
    .x4{
        background-image: url('/toper/mobile.png');
        background-size: 40% auto;
    }
    .x5{
        background-image: url('/toper/arrow.png');
        background-size: 40% auto;
    }
}
</style>
