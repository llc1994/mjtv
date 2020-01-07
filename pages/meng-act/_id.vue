<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <!-- <SubToper /> -->
        <div class="act-container">
            <div class="info">
                <img :src="Info.pgroupIcon" alt class="icon" />
                <div class="misc">
                    <strong class="title">{{ Info.actName }}</strong>
                    <span class="text">{{ Info.actContent }}</span>
                </div>
            </div>
            <div class="rank-container">
                <div class="rank-switch">
                    <div class="rank-1">总榜</div>
                    <div class="rank-2">月榜</div>
                    <div class="rank-3">周榜</div>
                </div>
                <div class="rank-list" v-for="(rank, index) in Rank" :key="index" style="display: none;">
                    <nuxt-link :to="'/play-meng/' + video.id" class="a-video" v-for="(video, index) in rank" target="_blank" :key="index">
                        <img :src="video.resourceUrl + '?x-oss-process=image/resize,m_fill,w_200,h_310,limit_0/format,jpeg/quality,Q_90'" alt class="cover" />
                        <span class="like">{{ video.likes }}</span>
                        <div class="user-info">
                            <img :src="video.userIcon" alt class="avatar" />
                            <span>{{ video.userName }}</span>
                        </div>
                        <div class="text">{{ video.content }}</div>
                    </nuxt-link>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>
<style scoped lang="scss">
.act-container {
    width: 1400px;
    margin: auto;
    margin-top: 20px;
    .info {
        background: #f8f8f8;
        padding: 20px 40px;
        box-sizing: border-box;
        display: flex;
        border-radius: 4px;
        .icon {
            width: 90px;
            height: 90px;
            background-color: #f0f0f0;
            border-radius: 50%;
            margin-right: 30px;
            flex-shrink: 0;
            flex-grow: 0;
        }
        .misc {
            padding-top: 10px;
            .title {
                display: block;
                font-size: 24px;
                color: #333333;
            }
            .text {
                display: block;
                font-size: 14px;
                color: #333333;
                margin-top: 10px;
            }
        }
    }
    .rank-container {
        padding-top: 20px;
        .rank-switch {
            display: flex;
            div {
                padding: 10px 40px 20px;
                font-size: 24px;
                cursor: pointer;
                &.current {
                    position: relative;
                    &:before {
                        content: '';
                        height: 8px;
                        border-radius: 4px;
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: #00adef;
                    }
                }
            }
        }
        .rank-list {
            margin-top: 30px;
            display: flex;
            flex-flow: row wrap;
            min-height: 400px;
            &:after {
                content: '';
                width: 120px;
            }
            .a-video {
                position: relative;
                width: 200px;
                margin-right: 40px;
                margin-bottom: 40px;
                align-items: stretch;
                flex-shrink: 0;
                &:before {
                    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
                    height: 40px;
                    position: absolute;
                    top: 310px - 40px;
                    content: '';
                    left: 0;
                    right: 0;
                    border-radius: 0 0 4px 4px;
                }
                &:nth-child(6n) {
                    margin-right: 0;
                }
                .cover {
                    width: 100%;
                    height: 310px;
                    background: #f8f8f8;
                    display: block;
                    border-radius: 4px;
                }

                .like {
                    position: absolute;
                    top: 310px - 14px - 5px;
                    right: 5px;
                    background: url('/inactive-zan-heart.png') no-repeat center left;
                    background-size: contain;
                    padding-left: 18px;
                    color: #fff;
                    font-size: 14px;
                    line-height: 14px;
                }
                .user-info {
                    display: flex;
                    align-items: center;
                    margin-top: -10px;
                    position: relative;
                    z-index: 1;

                    .avatar {
                        width: 50px;
                        height: 50px;
                        border: solid 2px #fff;
                        border-radius: 50%;
                        background: #f0f0f0;
                        margin-right: 10px;
                        flex-shrink: 0;
                        color: #333333;
                    }
                    span {
                        white-space: nowrap;
                        font-size: 16px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                }
                .text {
                    font-size: 14px;
                    color: #333333;
                    line-height: 20px;
                    height: 40px;
                    overflow: hidden;
                    margin-top: 4px;
                    white-space: break-all;
                    text-align: justify;
                }
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
import axios from 'axios';

export default {
    data() {
        return {
            toperParams: {
                backgroundColor: 'white',
                category: 'meng-bao-video'
            }
        };
    },
    components: {
        Toper,
        SubToper,
        Footer
    },
    mounted() {
        $('.rank-switch')
            .find('div')
            .click(function() {
                $('.rank-switch')
                    .find('div')
                    .removeClass();
                let that = $(this);
                that.addClass('current');
                $('.rank-list')
                    .hide()
                    .eq(that.index())
                    .show();
            })
            .eq(0)
            .click();
    },
    async asyncData(context) {
        let result = {};
        let actId = context.params.id;

        let rank1 = await axios.post('http://mengdata.maijimaiji.cn/act/actWorks/getDareWorkTop', { pageSize: 30, type: 2, actId: actId, pageNum: 1 });

        let rank2 = await axios.post('http://mengdata.maijimaiji.cn/act/actWorks/getDareWorkTop', { pageSize: 30, type: 1, actId: actId, pageNum: 1 });

        let rank3 = await axios.post('http://mengdata.maijimaiji.cn/act/actWorks/getDareWorkTop', { pageSize: 30, type: 0, actId: actId, pageNum: 1 });
        result.Rank = [rank1.data.body.list, rank2.data.body.list, rank3.data.body.list];

        result.Info = rank3.data.body;

        return result;
    }
};
</script>
