<template>
    <div class="container">
        <!-- 顶部导航 -->
        <Toper :toperParams="toperParams" ref="toper" />
        <div class="filter-container">
            <div class="filter-labels">
                <div class="label-group" v-for="(item, index) in Labels" :key="index">
                    <span v-for="(item2, index2) in item.secondLables" :key="index2" @click="switchLabel(item.id, item2.id)" :class="{ current: selectedLabels.indexOf(item2.id) !== -1 }">{{ item2.lableName }}</span>
                </div>
                <div class="label-group">
                    <span class="header">排序方式</span>
                    <span @click="switchOrder(1)" :class="{ current: selectedOrder === 1 }">最多播放量</span>
                    <span @click="switchOrder(2)" :class="{ current: selectedOrder === 2 }">最新上线</span>
                </div>
            </div>
            <template v-if="videoList">
                <template v-if="!videoList.length">
                    <img src="list-holder.jpg" style="margin: auto; display: block;" />
                </template>
                <template v-else>
                    <div class="video-list">
                        <nuxt-link target="_blank" :to="getUrl(item)" class="a-video" v-for="(item, index) in videoList" :key="index">
                            <!-- <span class="vip">VIP</span> -->
                            <span class="tag" v-show="item.episodeStr">{{ item.episodeStr }}</span>
                            <img :src="item.alyUrl + '?x-oss-process=image/resize,h_120/format,jpeg/quality,Q_90'" :alt="item.title" class="cover" />
                            <strong class="title" :title="item.title">{{ item.title }}</strong>
                            <span class="description" :title="item.descript">{{ item.descript }}</span>
                        </nuxt-link>
                        <template v-if="videoList.length % 6 !== 0">
                            <span class="a-video" v-for="(item, index) in 6 - (videoList.length % 6)" :key="'empty-' + index"></span>
                        </template>
                    </div>
                    <Page :page="page" num="8" />
                </template>
            </template>
        </div>
        <!-- 底部 -->
        <Footer />
    </div>
</template>
<style lang = "scss" scoped>
.filter-container {
    padding-top: 20px;
    width: 100%;
    margin: auto;
    .filter-labels {
        background-color: #f5f5f5;
        padding: 20px 0;
        font-size: 14px;
        .label-group {
            display: flex;
            width: 1200px;
            margin: auto;
            margin-bottom: 12px;
            &:last-child {
                margin-bottom: 0;
            }
            span {
                margin-right: 30px;
                padding: 5px 10px;
                border-radius: 20px;
                cursor: pointer;
                user-select: none;
                &.current {
                    background-color: #e5e5e5;
                    color: #23b2ef;
                    font-weight: bold;
                }
                &.header {
                    cursor: default;
                }
                &:nth-child(1) {
                    width: 100px;
                    text-align: center;
                }
            }
        }
    }
    .video-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 1200px;
        margin: auto;
        margin-top: 20px;
        min-height: 300px;
        .a-video {
            width: 180px;
            position: relative;
            display: flex;
            flex-direction: column;
            padding-bottom: 10px;
            margin-bottom: 20px;
            .cover {
                width: 180px;
                height: 100px;
                object-fit: cover;
                display: block;
            }
            .title {
                font-size: 14px;
                margin-top: 8px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .description {
                font-size: 12px;
                color: #999;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-top: 6px;
            }
            .vip {
                position: absolute;
                right: 10px;
                top: 0;
                background-color: #e94743;
                color: #fff;
                font-size: 12px;
                padding: 2px 6px;
                border-radius: 0 0 5px 5px;
            }
            .tag {
                position: absolute;
                right: 5px;
                top: 100px;
                margin-top: -25px;
                background-color: rgba(0, 0, 0, 0.5);
                color: #fff;
                font-size: 12px;
                padding: 2px 6px;
                border-radius: 10px;
            }
            &:hover {
                .title {
                    color: #23b2ef;
                }
                .description {
                    color: #65bde2;
                }
            }
        }
    }
}
</style>
<script>
import axios from 'axios';

import Toper from '~/components/Toper.vue';
import SubToper from '~/components/SubToper.vue';
import Footer from '~/components/Footer.vue';
import Subject from '~/components/Subject.vue';
import Page from '~/components/Page.vue';

export default {
    data() {
        return {
            toperParams: {
                backgroundColor: 'white',
                category: ''
            },
            labels: [],
            selectedLabels: [],
            selectedOrder: 1,
            videoList: null,
            page: {
                current: 1,
                count: 1
            }
        };
    },
    components: {
        Toper,
        Footer,
        Page
    },
    watch: {
        'page.current': {
            handler() {
                this.doSearch();
            },
            deep: true
        }
    },
    async asyncData(context) {
        let labels = await axios({
            url: 'http://menguat.maijimaiji.cn' + '/mkt/videoLables',
            method: 'post',
            data: {}
        });
        return {
            Labels: labels.data.body
        };
    },
    mounted() {
        for (let i = 0; i < this.Labels.length; i++) {
            this.selectedLabels.push(this.Labels[i].id);
        }
        this.doSearch();
    },
    methods: {
        getGroupLabels(groupId) {
            for (let i = 0; i < this.Labels.length; i++) {
                if (this.Labels[i].id === groupId) {
                    return this.Labels[i].secondLables;
                }
            }
        },
        removeGroup(groupId) {
            let labels = this.getGroupLabels(groupId);
            for (let i = 0; i < labels.length; i++) {
                let index = this.selectedLabels.indexOf(labels[i].id);
                if (index !== -1) {
                    this.selectedLabels.splice(index, 1);
                }
            }
        },
        switchLabel(groupId, labelId) {
            this.removeGroup(groupId);
            this.selectedLabels.push(labelId);
            this.page.current = 1;
            this.doSearch();
        },
        switchOrder(orderId) {
            this.selectedOrder = orderId;
            this.page.current = 1;
            this.doSearch();
        },
        doSearch() {
            this.videoList = null;
            let condition = [];
            for (let i = 0; i < this.selectedLabels.length; i++) {
                let isTop = false;
                for (let o = 0; o < this.Labels.length; o++) {
                    if (this.selectedLabels[i] === this.Labels[o].id) {
                        isTop = true;
                    }
                }
                if (!isTop) {
                    condition.push(this.selectedLabels[i]);
                }
            }
            let params = {
                condition: condition.join(','),
                pageNum: this.page.current,
                pageSize: 24,
                sortType: this.selectedOrder
            };
            //console.log(params);
            window.scrollTo({ top: 0 });
            axios({
                url: 'http://menguat.maijimaiji.cn' + '/mkt/lableSearch',
                method: 'post',
                data: params
            }).then(result => {
                this.videoList = result.data.body.videos || [];
                this.page.count = result.data.body.pageCount || 1;
            });
        },
        getUrl(item) {
            switch (item.videoType) {
                case 'PRO_USUAL':
                case 'PRO_SEASON':
                case 'OTHER':
                    return '/play/' + item.itemId;
                    break;
                case 'SELF_CARTOON':
                case 'CARTOON':
                    return '/play-cartoon/' + item.itemId;
                    break;
                case 'GOODS':
                    return '/play-course/' + item.knowledgeId;
                    break;
                default:
                    return '';
                    break;
            }
        }
    }
};
</script>