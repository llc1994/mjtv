<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <div class="user-center">
            <div class="wrap">
                <!-- 用户左侧面板 -->
                <UserMenu :menu="menu" />
                <!-- 主要内容区 -->
                <div class="main">
                    <!-- <div class="title">今天</div> -->
                    <template v-if="!GoodsHistory.list.length">
                        <img
                            src="/list-holder.jpg"
                            style="display: block;margin: auto; margin-top: 100px;"
                        />
                    </template>
                    <template v-else>
                        <div
                            class="media-area row"
                            v-if="GoodsHistory.list && GoodsHistory.list.length > 0"
                        >
                            <nuxt-link target="_blank"
                                :to="'/goods-detail/' + item.mallGoodsId"
                                class="media-type-2 col col2-pc-4 col-pad-4 col-mobile-6"
                                v-for="(item, index) in GoodsHistory.list"
                                :key="index"
                            >
                                <div class="inner-wrap">
                                    <div
                                        class="cover background-contain"
                                        :style="{
                                            backgroundImage:
                                                'url(' +
                                                item.mallGoodsEspImg +
                                                '?x-oss-process=image/resize,h_240/format,jpeg/quality,Q_90)'
                                        }"
                                    >
                                        <!-- <div class="tips">第一季 08期</div> -->
                                    </div>
                                    <div class="name">{{ item.mallGoodsName }}</div>
                                    <div class="sale">
                                        <div class="price">
                                            <strong>￥{{ item.perPrice }}</strong>
                                        </div>
                                        <div class="number line-thought">原价￥{{ item.oriPrice }}</div>
                                    </div>
                                </div>
                            </nuxt-link>
                        </div>
                        <div class="maiji-page">
                            <div class="start" @click="pageStart">第一页</div>
                            <div class="prev" @click="pagePrev">上一页</div>
                            <!-- <div class="num" :class="{active:item === page.curr}" v-for="(item,index) in page.list" :key="index" @click="pageNum(item)">{{item}}</div> -->
                            <div class="num">{{page.curr}}</div>
                            <div class="next" @click="pageNext">下一页</div>
                            <div class="end" @click="pageEnd">最后一页</div>
                            <div class="total">共{{ page.pageCount }}页</div>
                        </div>
                    </template>
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
    import UserMenu from '~/components/UserMenu.vue';
    import axios from 'axios';
    export default {
        middleware: 'auth',
        data() {
            return {
                toperParams: {
                    backgroundColor: 'white',
                    category: '',
                },
                menu: {
                    isActive: 'user-goods-browsed',
                },
            };
        },
        components: {
            Toper,
            Slide,
            Subject,
            Footer,
            UserMenu,
        },
        created() {
            // if (!this.$store.state.userData.userId) {
            //     this.$router.push("/");
            // }
        },
        watch:{
            'page.curr':{
                handler(){
                    this.getBrowseGoodsList()
                },
                deep:true
            }
        },
        async asyncData(context) {
            let that = context.app;
            let res = {};
            let pageSize = 30;


            // 商品浏览历史
            res.GoodsHistory = await that.$getBrowseGoodsList({
                pageSize: pageSize,
            });
            let pageLimit = 1;
            let pageCount = res.GoodsHistory.pageCount;
            let list = []

            for(let i = 1;i <= pageCount;i++){
                if(i > pageLimit){
                    break;
                }else{
                    list.push(i)
                }
            }
            // 分页参数
            res.page = {
                pageSize:pageSize,
                pageLimit:pageLimit,
                pageCount:pageCount,
                curr:1,
                list:list
            }
            return res;
        },
        methods:{
            // 浏览记录查询函数
            async getBrowseGoodsList(){
                this.GoodsHistory = await this.$getBrowseGoodsList({
                    pageNum:this.page.curr,
                    pageSize: this.page.pageSize,
                });
            },
            // 跳转到第一页
            pageStart(){
                this.page.curr = 1
            },
            // 跳转到下一页
            pageNext(){
                if(this.page.curr >= this.page.pageCount)return
                this.page.curr += 1
            },
            // 跳转到上一页
            pagePrev(){
                if(this.page.curr <= 1)return
                this.page.curr -= 1
            },
            // 跳转到最后一页
            pageEnd(){
                this.page.curr = this.page.pageCount
            }
        }
    };
</script>
