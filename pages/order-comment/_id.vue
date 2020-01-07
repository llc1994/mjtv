<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <div class="order-comment-container">
            <div class="fore">
                <div class="section-title">评价宝贝</div>
                <div class="section-content">
                    <div class="goods">
                        <img src alt class="cover" />
                        <strong class="title">此处为商品的标题最多为两行多出隐藏</strong>
                    </div>
                    <div class="main">
                        <div class="stars">
                            <div class="current"></div>
                            <div class="current"></div>
                            <div class="current"></div>
                            <div></div>
                            <div></div>
                            <input type="hidden" />
                        </div>
                        <div class="comment">
                            <textarea name></textarea>
                            <div class="upload">
                                <button>添加图片/视频</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button">
                    <button type="submit">发表评论</button>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>
<style lang="scss">
    .order-comment-container {
        width: 100%;
        background: #f4f4f4;
        padding: 80px 0 160px;
        .fore {
            width: 1200px;
            margin: auto;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            .section-title {
                background: #00adef;
                padding: 10px 50px;
                font-size: 20px;
                color: #fff;
            }
            .section-content {
                background: #fff;
                width: 100%;
                display: flex;
                padding: 70px 110px;
                .goods {
                    display: flex;
                    flex-direction: column;
                    flex-shrink: 0;
                    .cover {
                        width: 180px;
                        height: 180px;
                        background: #f4f4f4;
                        margin-bottom: 20px;
                    }
                    .title {
                        width: 180px;
                        word-break: break-all;
                        font-size: 14px;
                        font-weight: normal;
                    }
                }
                .main {
                    width: 100%;
                    margin-left: 40px;
                    .stars {
                        display: flex;
                        div {
                            background: url('/icon-comment-unlike.png') no-repeat center center;
                            background-size: contain;
                            width: 40px;
                            height: 40px;
                            cursor: pointer;
                            &.current {
                                background-image: url('/icon-comment-like.png');
                            }
                        }
                    }
                    .comment {
                        background: #d0edff;
                        padding: 10px;
                        margin-top: 20px;
                        textarea {
                            width: 100%;
                            height: 140px;
                            background: #fff;
                            padding: 10px;
                            border: solid 1px #ccc;
                            font-size: 14px;
                            font-family: Helvetica, 'Droid Sans', Tahoma, Roboto, 'Microsoft YaHei', 微软雅黑, 'Heiti SC', 'Droid Sans Fallback', 'Hiragino Sans GB', 宋体;
                            line-height: 20px;
                            display: block;
                        }
                        .upload {
                            margin-top: 10px;
                            button {
                                background: #fff;
                                padding: 10px 20px;
                                font-size: 16px;
                                color: #00adef;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
            .button {
                background: #fff;
                width: 100%;
                padding-bottom: 80px;
                button {
                    margin: auto;
                    display: block;
                    background: #00adef;
                    color: #fff;
                    padding: 10px 50px;
                    border-radius: 40px;
                    font-weight: bold;
                    font-size: 20px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
<script>
    import Toper from '~/components/Toper.vue';
    import Footer from '~/components/Footer.vue';
    import UserMenu from '~/components/UserMenu.vue';
    import axios from 'axios';

    export default {
        data() {
            return {
                toperParams: {
                    backgroundColor: 'white',
                    category: '',
                },
            };
        },
        components: {
            Toper,
            Footer,
            UserMenu,
        },
        async asyncData(context) {
            let res = {};
        },
    };
</script>