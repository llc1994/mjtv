<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <div class="user-center">
            <div class="wrap">
                <!-- 用户左侧面板 -->
                <UserMenu :menu="menu" />
                <div class="main">
                    <div class="user-address">
                        <div class="add-address">收货地址</div>
                        <div class="table">
                            <div class="th">
                                <div class="td x15">姓名</div>
                                <div class="td x15">电话</div>
                                <div class="td x35">地址</div>
                                <div class="td x35">操作</div>
                            </div>
                            <div class="tr">
                                <div class="td x15">关云长</div>
                                <div class="td x15">15685859565</div>
                                <div class="td x35">
                                    这里是地址长度大概是这么长多的省略
                                </div>
                                <div class="td x35 space-between">
                                    <span class="default">默认地址</span>
                                    <span class="view">查看</span>
                                    <span class="edit">编辑</span>
                                    <span class="delete">删除</span>
                                </div>
                            </div>
                            <div class="tr">
                                <div class="td x15">关云长</div>
                                <div class="td x15">15685859565</div>
                                <div class="td x35">
                                    这里是地址长度大概是这么长多的省略
                                </div>
                                <div class="td x35 space-between">
                                    <span class="default">默认地址</span>
                                    <span class="view">查看</span>
                                    <span class="edit">编辑</span>
                                    <span class="delete">删除</span>
                                </div>
                            </div>
                            <div class="tr">
                                <div class="td x15">关云长</div>
                                <div class="td x15">15685859565</div>
                                <div class="td x35">
                                    这里是地址长度大概是这么长多的省略
                                </div>
                                <div class="td x35 space-between">
                                    <span class="default">默认地址</span>
                                    <span class="view">查看</span>
                                    <span class="edit">编辑</span>
                                    <span class="delete">删除</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <Footer />
    </div>
</template>
<script>
    import Toper from "~/components/Toper.vue";
    import Footer from "~/components/Footer.vue";
    import Slide from "~/components/Slide.vue";
    import Subject from "~/components/Subject.vue";
    import UserMenu from "~/components/UserMenu.vue";
    import axios from "axios";
    export default {
        middleware: 'auth',
        data() {
            return {
                toperParams: {
                    backgroundColor: "white",
                    category: ""
                },
                menu: {
                    isActive: "user-setup"
                }
            };
        },
        components: {
            Toper,
            Slide,
            Subject,
            Footer,
            UserMenu,
        },
        async asyncData(context) {
            let res = {};

            let ParentChildProgram = await axios.post(
                context.app.$domain +"/mkt/getRecObjectList",
                {
                    pageSize: 8,
                    pageNum: 1,
                    recPosition: "cccd584aa108408a866aae2e4b4b1c85"
                }
            );
            res.ParentChildProgram = ParentChildProgram.data.body;
            return res;
        },
        created() {
            // if (!this.$store.state.userData.userId) {
            //     this.$router.push("/");
            // }
        }
    };
</script>