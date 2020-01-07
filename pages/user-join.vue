<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <SubToper />

        <div class="user-center">
            <div class="wrap">
                <!-- 用户左侧面板 -->
                <UserMenu :menu="menu" />
                <div class="main">
                    <div class="user-join">
                        <div class="section-title">我的参与</div>
                        <div class="join-list">
                            <template v-if="!ActList.length">
                                <img
                                    src="/list-holder.act.png"
                                    style="display: block;margin: auto; margin-top: 100px;"
                                />
                            </template>
                            <div class="a-join" v-for="(item, index) in ActList" :key="index">
                                <img
                                    :src="item.imgUrl+'?x-oss-process=image/resize,m_fill,w_440,h_200,limit_0/format,jpeg/quality,Q_90'"
                                    class="cover"
                                />
                                <div class="info">
                                    <strong class="join-title">{{item.name}}</strong>
                                    <span class="join-type">
                                        <template v-if="item.type==1">线上活动</template>
                                        <template v-if="item.type==2">线下活动</template>
                                        <template v-if="item.type==3">节目组活动</template>
                                        <template v-if="item.type==4">秀活动</template>
                                    </span>
                                    <span class="date">{{item.beginDate}} ~ {{item.endDate}}</span>
                                    <span class="user-count">
                                        <em>{{item.applyAmount}}</em>人参与
                                    </span>
                                </div>
                                <!-- <span class="status">剩余3天</span> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <Footer />
        <!-- 登录注册 -->
    </div>
</template>
<style lang="scss" scoped>
    .user-join {
        .section-title {
            font-size: 32px;
            color: #000;
        }
        .join-list {
            display: flex;
            flex-wrap: wrap;
            margin-top: 30px;
            .a-join {
                width: 48%;
                margin-right: 4%;
                background: #f8f8f8;
                margin-bottom: 30px;
                display: flex;
                position: relative;
                box-sizing: border-box;
                padding: 10px;

                &:nth-child(2n) {
                    margin-right: 0;
                }
                .cover {
                    width: 60%;
                    flex-shrink: 0;
                    display: block;
                    background: #fff;
                }
                .info {
                    margin-left: 5%;
                    width: 35%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding-top: 10px;
                    .join-title {
                        font-size: 16px;
                        line-height: 30px;
                        height: 60px;
                        overflow: hidden;
                    }
                    .join-type {
                        font-size: 16px;
                        color: #fff;
                        line-height: 16px;
                        padding: 8px 14px;
                        background: #00adef;
                        width: auto;
                        border-radius: (16 + 8 * 2px) / 2;
                        margin-top: 10px;
                        white-space: nowrap;
                        max-width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .date {
                        font-size: 12px;
                        color: #666;
                        margin-top: 10px;
                        white-space: nowrap;
                        max-width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .user-count {
                        font-size: 12px;
                        color: #666;
                        margin-top: 6px;
                        white-space: nowrap;
                        max-width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        em {
                            color: #00adef;
                            font-style: normal;
                        }
                    }
                }
                .status {
                    position: absolute;
                    top: 30px;
                    background: #66cef5;
                    color: #fff;
                    padding: 5px 20px;
                    font-size: 15px;
                    border-radius: 0 20px 20px 0;
                }
            }
        }
    }
</style>
<script>
    import Toper from '~/components/Toper.vue';
    import SubToper from '~/components/SubToper.vue';

    import Footer from '~/components/Footer.vue';
    import Slide from '~/components/Slide.vue';
    import Subject from '~/components/Subject.vue';
    import UserMenu from '~/components/UserMenu.vue';
    import axios from 'axios';
    export default {
        middleware: 'auth',
        data() {
            return {
                toperParams: {
                    backgroundColor: 'white',
                    category: ''
                },
                menu: {
                    isActive: 'user-join'
                }
            };
        },
        components: {
            Toper,
            SubToper,
            Slide,
            Subject,
            Footer,
            UserMenu
        },
        async asyncData(context) {
            let res = {};

            let dataList = await axios({
                url: context.app.$domain + '/act/getMyApplyActList',
                method: 'post',
                headers: {
                    token: context.store.state.session.token || ''
                },
                data: {
                    pageNum: 1,
                    pageSize: 20,
                    userId: context.store.state.session.userId
                }
            });

            res.ActList = dataList.data.body.list;
            return res;
        },
        created() {
            // if (!this.$store.state.userData.userId) {
            //     this.$router.push("/");
            // }
        }
    };
</script>