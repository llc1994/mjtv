<template>
    <div class="news-list">
        <div class="header">
            <strong>{{ MageeHead.headTitle }}</strong>
            <nuxt-link target="_blank" class="more" :to="'/news-catalog/' + MageeHead.allInfList[0].type">更多 &gt;</nuxt-link>
        </div>

        <div class="news">
            <ul>
                <div v-if="MageeHead != undefined">
                    <nuxt-link target="_blank" v-for="(item, index) in MageeHead.allInfList.slice(0, 6)" :key="index" :to="'/news/' + item.id">
                        <li>
                            {{ item.title }}
                        </li>
                    </nuxt-link>
                </div>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: ['MageeHead'],
    data() {
        return {};
    }
};
</script>
<style lang="scss" scoped>
.news-list {
    background: #fff;
    margin-bottom: 20px;
    padding: 20px;
    padding-bottom: 0;
    border-top: solid 3px #00adef;

    .header {
        overflow: hidden;
        zoom: 1;
        border-bottom: solid 1px #ececec;
        padding-bottom: 10px;
        strong {
            float: left;
            color: #333333;
            font-size: 18px;
        }
        .more {
            float: right;
            color: #101d2a;
            font-size: 12px;
        }
    }
    .news {
        ul {
            margin: 0;
            li {
                margin: 0;
                list-style-type: none;
                padding: 10px 0;
                border-bottom: solid 1px #ececec;
                &:last-child {
                    border-bottom: none;
                }
                a {
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
