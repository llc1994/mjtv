<template>
    <div>
        <Toper :toperParams="toperParams" />
        <SubToper />
        <div class="main-section">
            <div class="location">
                <i class="home"></i>
                <nuxt-link to="/news-catalog/all">麦咭资讯</nuxt-link>
                &gt;
                <a href="" v-text="GetTypeName(catalogId)"></a>
            </div>
            <div class="news-container">
                <div class="main">
                    <h1>{{ News.title }}</h1>
                    <div class="misc">
                        <div class="date">{{ News.upDate }}</div>
                        <!--无此字段, 暂时隐藏 div class="source">来源: 麦咭萌</div-->
                    </div>
                    <div class="share">
                        <!-- <div class="share-icon"> -->
                        <div class="social-share" data-sites="qq,wechat,weibo"></div>
                            <!-- <div class="qq"></div>
                            <div class="wechat"></div>
                            <div class="weibo"></div> -->
                        <!-- </div> -->
                        <div class="num">
                            <!--无此字段, 暂时隐藏  div class="click">
                              1234
                            </div>
                            <div class="favorite current">
                              1234
                            </div-->
                        </div>
                    </div>
                    <div class="content" v-html="News.body"></div>
                    <div class="content-footer">
                        <div class="top" @click="toTop">
                            <i class="icon"></i>
                            返回顶部
                        </div>
                    </div>
                </div>
                <div class="side">
                    <SideSection :MageeHead="HeadInfo" />
                    <SideSection2 :MageeHead="LifeInfo" />
                    <SideSection2 :MageeHead="EduInfo" />
                    <SideSection2 :MageeHead="ChiInfo" />
                </div>
            </div>
            <Footer />
        </div>
    </div>
</template>

<script>
import Toper from '~/components/Toper.vue';
import SubToper from '~/components/SubToper.vue';
import Footer from '~/components/Footer.vue';
import SideSection from '~/components/News/SideSection.vue';
import SideSection2 from '~/components/News/SideSection2.vue';
import axios from 'axios';

export default {
    data() {
        return {
            toperParams: {
                backgroundColor: 'white',
                category: 'parent-child'
            },
            player: null
        };
    },
    components: {
        Toper,
        SubToper,
        Footer,
        SideSection,
        SideSection2
    },
    methods: {
        toTop() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        GetTypeName(type) {
            if (type == 'MAGEE_TOP') return '';
            if (type == 'EDU') return '教育';
            if (type == 'CHI') return '育儿';
            if (type == 'LIFE') return '生活';
        }
    },
    async asyncData(context) {
        let res = {};
        let id = context.params.id;
        let news = await axios.post(context.app.$domain + '/mkt/getInfDetail', {
            infId: context.params.id
        });
        res.News = news.data.body;
        res.catalogId = res.News.type;
        // 头条接口
        let HeadInfo = await axios.post(context.app.$domain + '/mkt/getAllToplineInfList', {
            status: '1',
            pageSize: '20',
            program: 'MAGEE_HEAD_LINE',
            pageNum: '1'
        });
        // headInfo.data.body.allInfList.forEach(function(item, index) {
        //     item.active = false;
        // });
        res.HeadInfo = HeadInfo.data.body;
        res.HeadInfo.headTitle = '麦咭头条';

        // 生活接口
        let LifeInfo = await axios.post(context.app.$domain + '/mkt/getMktInfListByType', {
            status: '1',
            type: 'LIFE',
            pageSize: '20',
            program: 'MAGEE_HEAD_LINE',
            pageNum: '1'
        });
        // headInfo.data.body.allInfList.forEach(function(item, index) {
        //     item.active = false;
        // });
        res.LifeInfo = LifeInfo.data.body;
        res.LifeInfo.headTitle = '生活';

        // 教育接口
        let EduInfo = await axios.post(context.app.$domain + '/mkt/getMktInfListByType', {
            status: '1',
            type: 'EDU',
            pageSize: '20',
            program: 'MAGEE_HEAD_LINE',
            pageNum: '1'
        });
        // headInfo.data.body.allInfList.forEach(function(item, index) {
        //     item.active = false;
        // });
        res.EduInfo = EduInfo.data.body;
        res.EduInfo.headTitle = '教育';

        // 育儿 接口
        let ChiInfo = await axios.post(context.app.$domain + '/mkt/getMktInfListByType', {
            status: '1',
            type: 'CHI',
            pageSize: '20',
            program: 'MAGEE_HEAD_LINE',
            pageNum: '1'
        });
        // headInfo.data.body.allInfList.forEach(function(item, index) {
        //     item.active = false;
        // });
        res.ChiInfo = ChiInfo.data.body;
        res.ChiInfo.headTitle = '育儿';

        return res;
    }
};
</script>

<style lang="scss">
.main-section {
    background: #f8f8f8;
    .location {
        width: 1200px;
        margin: auto;
        padding: 30px 0;
        // font-size: 16px;
        color: #101d2a;
    }
    .news-container {
        width: 1200px;
        margin: auto;

        overflow: hidden;
        zoom: 1;
        .main {
            float: left;
            width: 880px;
            background: #fff;
            box-sizing: border-box;
            padding: 40px;
            h1 {
                font-size: 36px;
                color: #333333;
            }
            .misc {
                color: #999999;
                overflow: hidden;
                zoom: 1;
                padding: 20px 0;
                font-size: 14px;

                .date {
                    float: left;
                }
                .source {
                    float: right;
                }
            }
            .share {
                color: #999999;
                // overflow: hidden;
                zoom: 1;
                padding: 20px 0;
                font-size: 14px;
                margin-top:40px;
                border-top: solid 1px #ececec;
                border-bottom: solid 1px #ececec;
                .share-icon {
                    float: left;
                    display: flex;
                    div {
                        background: no-repeat center center;
                        width: 32px;
                        height: 32px;
                        margin-right: 10px;
                        cursor: pointer;
                        &.qq {
                            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAOVBMVEVHcEwQr/8RrPwArP8RrP0RrP0Rq/wRrPwRrP0OqvsRrPwNrf0PrPwRrPwRrfwRrPwPrP0RrP0SrPzVKPNvAAAAEnRSTlMADokHnNVZ9eghyClE/b2qOHTx2QHtAAAA9ElEQVQ4y4VT2xKFIAhUUyFTu/z/x57swtKpJmZ6CBCWZTFGzEafmIiTj9bcrfe0NCvtI9//hTu3h8XIdZfnYblZUEUGXh6MB3n/GF8zjhpdWF4s7DicctU5OlXPbQ0KauaNj1EcpTXxeDAdoKp4/JoPAsYT9QQ6rIkoEGVuVj7VIUtCUD0SEkAdYCZVjexDAhtgnMG9QokE1uurSGA1MiyjhYCMFiV6KZwwZk4KpAjEgyjaV7Ppg5iEKFAdMvSpR5ef0HYVXaMrauRq3amuM5VQ+bJuLZhSyil9COZdcuWQ3Kdov2X/fTjfp6eOdw/fjvf9/H8XQSscoeP9owAAAABJRU5ErkJggg==');
                        }
                        &.wechat {
                            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAMAAAAocOYLAAAAP1BMVEVHcEwKvBIKvBIIuxEKvBIJvBEAvQAKvBIBuw4KvBIKvBIJvA8KvBIJvBEKvBIIug8JuxAIvREKvBIKvBILvBNF1fgpAAAAFHRSTlMA0Kssk1MG8xHeoDK6d4UcRGH8wYyDZ/wAAAEoSURBVCjPjVOLsoQgCMX3M83y/791VUyt7c5dZsJG4HAQABiiBffEEM+Fhm9hVuWcj+MoWlH2sGpe76cc/IbBTH6KWSB2lb9F7SP6zVwcOoI2+V0McrDISNkkEr/52oaOYJtENLF6uCtcuVkquQHoRk6UQC5RxUlXaRA1tylxVMWqCqcwAQTwevBil7qpPfDgBwIHX48wkttUecrUWXogo5B6T2P/i+hAwLTaezc2B3KL5dPAWsMMxl8AvJa3QySlXIrxHhOFlnZberrV6xP596eCsNh7YQLNhFFDLZlmabB+fL+scH7SsIf+flf7+oOmNXumo39DvIiaCXlOUvY5FwXL+Fn1f/Pz5/y5H+cXwL3Mv7vtz5Okfe6go8tYUfeyoX1/z9v+fgC2gikH0Hm3RQAAAABJRU5ErkJggg==');
                        }
                        &.weibo {
                            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAPFBMVEVHcEzYHATYHQXYHQXYHQXXEQDYFADYHQXYHADYHQXZHQXXGgPYHQbZGwPYHQXYHQXZHQTYGwLYHAXYHgYdlgEFAAAAE3RSTlMAVNSI6AkR9SGbyDXdQLytcipg5W7KCAAAAUJJREFUOMuNU+m2hiAIRMWF3Erf/10viqf6ttPll8XIDAMCnOEUbeg9bqQcfEYg38/wFN7S1tzSE2Lsy3XdP0LfihzYvwQe5/2veUasGlb3H6FFh3n/X11QdZ7MJPi8uKsAMY3jIKFbb4WmHMRRZTROrMBfrbOBxzgdkNM2qb0FdRaeXU38ZtzRcxx/1clQRbHT1HJDgtSmOIJN8uXFeUPOC2ADMQllfiGKN9R9b3kmQDQq/qvKOGONAPulXABMEJgr1YnZ5WsBUAq41P0oE4Y/XMOt+aCIDKPpxk0GyGIPiNcskgSg2RNVFJdagMVBYpTiCx7SYM9CEZcGJdZpG33fY7Ns1BTp0tJo17CK4+mZHPfUU76tIJ3jxmYVlVIMp91lQ7gtDFKLwYW812vBzf9W7nFpn9f++eE8P73nx/v7+f8BmmAtHIZh2CkAAAAASUVORK5CYII=');
                        }
                    }
                }
                .num {
                    float: right;
                    div {
                        float: left;
                        line-height: 32px;
                        padding-left: 20px;
                        background: no-repeat center left;
                        margin-left: 16px;
                        &.click {
                            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAMAAABcOc2zAAAARVBMVEUAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkBVNYgAAAAFnRSTlMA1wrJjcOxqJdbU044Hd6OcT8+3c5z3l59GwAAAGJJREFUCNddjkkOgDAMAye07EtZ/f+norQcUH2yLU1iXOtgkg0rn6IsTVM0xZKD5mJmBYBWDSwhLNCohd3zob7X4c2ORmDroNuAUb/iykVBTkdOR576aPX2LibJYh6WAOrpL/JGBPci5AgvAAAAAElFTkSuQmCC');
                        }
                        &.favorite {
                            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAb1BMVEUAAAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AABh+yj+AAAAJHRSTlMAzYz28uO6opcX7Orm39qqdzguH8Supp6cmo5mYExCMiIPDQdRwaxzAAAAbklEQVQI11XMRxLDIBAF0WYAgRWs5JwD9z+jmQVS+S266i9mgCnGEWY538nE9qGRq+uDr+CWNkCdZsAdaAfUW/OqaSdWFd34N01k8fA886uiGeDkyjputSZXSfqiOqO9LFfGwi59KIL1BlayB/UDC0EEQC6tW2cAAAAASUVORK5CYII=');
                            cursor: pointer;
                            &.current {
                                background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAMAAABBwMRzAAAAUVBMVEUAAAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAAgx90pAAAAGnRSTlMA17q0D/fy7d3Gv6OaFeTi0MysjIhqX1QLAQWFajEAAABSSURBVAjXVchXDoAgFETRC2Kj2Cv7X6hiDOHdn8kZuDbVuoDxbbcaMF18G0+VZgj4WOZohBtq4ZpZWHEI77AUrACqTA3lYfnTH3tyWhJsnG5SD+QkDL2PJZtjAAAAAElFTkSuQmCC');
                                color: #ff4242;
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
            .content {
                padding: 40px 10px;
                text-justify: inter-ideograph;
                text-align: justify;
                line-height: 1.5em;
                font-size: 14px;
                color: #333333;
                p {
                    margin-top: 1em;
                    margin-bottom: 1em;
                    text-justify: inter-ideograph;
                    text-align: justify;
                }
                img {
                    max-width: 90%;
                }
            }
            .content-footer {
                overflow: hidden;
                zoom: 1;
                .top {
                    float: right;
                    font-size: 14px;
                    color: #999999;
                    padding-left: 26px;
                    background: no-repeat center left;
                    margin-left: 10px;
                    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAASFBMVEUAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmn+vFLAAAAF3RSTlMACO3ZsauCezfOo46LdlYM6LuabjkcG+EgmcQAAABbSURBVBjTdY5LDoAgDESrCFRU8N/731QympQufBuYaZo+OnpDoCiGiboXvPj84Webk8hi5lKJmgcBwWZtttaC6HLS4AvdmfnrEp+5YGmsSc9ooW6rgF09HIDrA0INCPsEa6/3AAAAAElFTkSuQmCC');
                    cursor: pointer;
                }
            }
        }
        .side {
            width: 300px;
            float: right;
        }
    }
}
</style>
