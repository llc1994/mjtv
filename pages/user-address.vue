<template>
    <div class="container">
        <Toper :toperParams="toperParams" />
        <div class="user-center">
            <div class="wrap">
                <!-- 用户左侧面板 -->
                <UserMenu :menu="menu" />
                <div class="main">
                    <div class="user-address">
                        <div class="add-address">
                            收货地址
                            <img src="/user-address-new.png" @click="newAddress" />
                        </div>
                        <div class="table">
                            <div class="th">
                                <div class="td x15">姓名</div>
                                <div class="td x15">电话</div>
                                <div class="td x35">地址</div>
                                <div class="td x35">操作</div>
                            </div>
                            <template v-if="AddressList.list && AddressList.list.length <= 0">
                                <img src="/list-holder.jpg" style="display: block;margin: auto; margin-top: 100px;" />
                            </template>
                            <template v-else>
                                <div class="tr" v-for="(item, index) in AddressList.list" :key="index">
                                    <div class="td x15">{{ item.name }}</div>
                                    <div class="td x15">{{ item.mobileNum }}</div>
                                    <div class="td x35">{{ item.address }}</div>
                                    <div class="td x35 space-between">
                                        <span
                                            class="default"
                                            :class="{
                                                active: item.defaultFlag === 1
                                            }"
                                            @click="SetDefault(item)"
                                            >默认地址</span
                                        >
                                        <span class="edit" @click="ShowUpdAddress(item)">编辑</span>
                                        <span class="delete" @click="DelAddress(item)">删除</span>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部 -->
        <Footer />

        <!-- 新增地址 -->
        <div class="layer" v-show="isAddressPanelShow">
            <div class="form-add-address">
                <div class="title">
                    <div class="text" v-show="popupType === 'insert'">新增地址</div>
                    <div class="text" v-show="popupType === 'update'">编辑地址</div>
                    <div class="close" @click="closeAddressPanel">
                        <img src="/close.png" />
                    </div>
                </div>
                <div class="line">
                    <div class="label">收货人</div>
                    <div class="value">
                        <input type="text" placeholder="请输入收货人" v-model="detail.name" />
                    </div>
                </div>
                <div class="line">
                    <div class="label">联系电话</div>
                    <div class="value">
                        <input type="text" placeholder="请输入联系电话" v-model="detail.mobileNum" />
                    </div>
                </div>
                <div class="line">
                    <div class="label">所在地区</div>
                    <div class="value" style="position:relative;">
                        <div class="new-address" v-show="isAddressType === 'newAddress'">
                            <select id="province" v-model="provinceIndex" @change="rechangeProvince">
                                <option :value="index" v-for="(item, index) in provinceList" :key="index">{{ item.province }}</option>
                            </select>
                            <select id="city" v-model="cityIndex" @change="rechangeCity">
                                <option :value="index" v-for="(item, index) in cityList" :key="index">{{ item.city }}</option>
                            </select>
                            <select id="county" v-model="areaIndex" @change="rechangeArea">
                                <option :value="index" v-for="(item, index) in areaList" :key="index">{{ item.area }}</option>
                            </select>
                            <div class="close" @click="closeChangeInputAddress"></div>
                        </div>
                        <div class="old-address" v-show="isAddressType === 'oldAddress'" @click="changeInputAddress">{{ detail.region }}</div>
                    </div>
                </div>
                <div class="line">
                    <div class="label">详细地址</div>
                    <div class="value">
                        <input type="text" placeholder="请输入详细地址" v-model="detail.address" />
                    </div>
                </div>
                <div class="line">
                    <div class="label">邮政编号</div>
                    <div class="value">
                        <input type="text" placeholder="（非必填）" />
                    </div>
                </div>
                <div class="button-group">
                    <div class="button" @click="InsAddress">确认</div>
                </div>
            </div>
        </div>
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
                category: ''
            },
            menu: {
                isActive: 'user-address'
            },
            isAddressPanelShow: false,
            isAddressType: 'oldAddress',
            popupType: 'insert',
            detail: {
                addrId: '',
                name: '',
                mobileNum: '',
                address: '',
                province: '',
                city: '',
                region: ''
            },
            isShowAddress:false,
            // 省名
            provinceName: '',
            provinceIndex: 0,
            provinceId:0,
            // 市名
            cityName: '',
            cityIndex: 0,
            cityId:0,
            // 区名
            areaName: '',
            areaIndex: 0,
            areaId:0,
            // 地址列表
            AddressList: {},
            // 省列表
            provinceList: [],
            // 市列表
            cityList: [],
            // 区列表
            areaList: []
        };
    },
    components: {
        Toper,
        Slide,
        Subject,
        Footer,
        UserMenu
    },
    async asyncData(context) {
        let res = {};
    },
    async created() {
        await this.getProvinces();
        await this.getCities();
        await this.getAreas();
    },
    mounted() {
        this.getAddress();
    },
    methods: {
        // 重新选择省
        async rechangeProvince() {
            let item = this.provinceList[this.provinceIndex];
            this.provinceName = item.province
            this.provinceId = item.provinceid
            await this.getCities();
            await this.getAreas();
        },
        // 重新选择市
        async rechangeCity() {
            let item = this.cityList[this.cityIndex];
            this.cityName = item.city;
            this.cityId = item.cityid
            await this.getAreas();
        },
        async rechangeArea(){
            let item = this.areaList[this.areaIndex];
            this.areaName = item.area;
            this.areaId = item.areaid
        },
        // 获取省列表
        async getProvinces() {
            this.provinceList = await this.$getProvinces();
            this.provinceName = this.provinceList[this.provinceIndex].province;
            this.provinceId = this.provinceList[this.provinceIndex].provinceid;
        },
        // 获取市
        async getCities() {
            this.cityList = await this.$getCities({
                provinceid: this.provinceId
            });
            this.cityName = this.cityList[this.cityIndex].city
            this.cityId = this.cityList[this.cityIndex].cityid
        },
        // 获取区
        async getAreas() {
            this.areaList = await this.$getAreas({
                cityid: this.cityId
            });
            this.areaName = this.areaList[this.areaIndex].area
            this.areaId = this.areaList[this.areaIndex].areaid
        },
        // 关闭选择地址
        closeChangeInputAddress() {
            this.isAddressType = 'oldAddress';
        },
        // 切换到选择地址
        changeInputAddress() {
            this.provinceIndex = 0
            this.cityIndex = 0
            this.areaIndex = 0
            this.isAddressType = 'newAddress';
        },
        // 获取地址列表
        async getAddress() {
            this.AddressList = await this.$findAddressList({
                pageNum: 1,
                pageSize: 10
            });
        },
        // 新增地址弹框
        newAddress() {
            this.popupType = 'insert';
            this.isAddressPanelShow = true;
            this.detail = {
                addrId: '',
                name: '',
                mobileNum: '',
                address: '',
                province: '',
                city: '',
                region: ''
            };
        },
        // 关闭地址弹框
        closeAddressPanel() {
            this.isAddressPanelShow = false;
        },
        // 显示更新地址弹框
        ShowUpdAddress(item) {
            this.isAddressPanelShow = true;
            this.popupType = 'update';
            this.detail = item;
        },
        // 设置默认地址
        async SetDefault(item) {
            let reply = await axios({
                url: this.$domain + '/urm/replaceDefaultAddress',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                },
                data: {
                    addrId: item.addrId
                }
            });
            if (reply.data.msgCd === this.$msgCode.success) {
                location.reload();
                $.message({
                    message: reply.data.msgInfo,
                    type: 'success'
                });
            } else {
                $.message({
                    message: reply.data.msgInfo,
                    type: 'error'
                });
            }
        },
        // 删除地址
        async DelAddress(item) {
            let reply = await axios({
                url: this.$domain + '/urm/deleteAddress',
                method: 'post',
                headers: {
                    token: this.$store.state.session.token || ''
                },
                data: {
                    addrId: item.addrId
                }
            });
            if (reply.data.msgCd === this.$msgCode.success) {
                location.reload();
                $.message({
                    message: reply.data.msgInfo,
                    type: 'success'
                });
            } else {
                $.message({
                    message: reply.data.msgInfo,
                    type: 'error'
                });
            }
        },
        // 更新地址
        async UpdAddress(item) {},
        // 新增收货地址
        async InsAddress(item) {
            let that = this;
            // addrId 主键
            // name 收件人姓名
            // mobileNum 联系手机号
            // region 收货城市
            // address 收货详细地址
            // defaultFlag 0 非默认收货地址 1 是默认收货地址
            // tag 标签（如：公司、家等）
            let reply = {};
            let newAddress = this.provinceName + this.cityName + this.areaName;
            let region = this.detail.region;
            if(this.isAddressType === 'newAddress' && newAddress){
                region = newAddress
            }

            if (this.popupType === 'insert') {
                reply = await axios({
                    url: this.$domain + '/urm/addAddress',
                    method: 'post',
                    headers: {
                        token: this.$store.state.session.token || ''
                    },
                    data: {
                        name: this.detail.name,
                        mobileNum: this.detail.mobileNum,
                        address: this.detail.address,
                        region: region
                    }
                });
            }
            if (this.popupType === 'update') {
                reply = await axios({
                    url: this.$domain + '/urm/modifyAddress',
                    method: 'post',
                    headers: {
                        token: this.$store.state.session.token || ''
                    },
                    data: {
                        addrId: this.detail.addrId,
                        name: this.detail.name,
                        mobileNum: this.detail.mobileNum,
                        address: this.detail.address,
                        region: region
                    }
                });
            }

            if (reply.data.msgCd === this.$msgCode.success) {
                this.isAddressPanelShow = false;
                $.message({
                    message: reply.data.msgInfo,
                    type: 'success'
                });
                // this.detail.region = region;
                location.reload();
            } else {
                $.message({
                    message: reply.data.msgInfo,
                    type: 'error'
                });
            }
        }
    }
};
</script>
<style lang="scss" scoped>
// 默认地址
.default {
    background-color: #fff;
    &.active {
        background-color: #00adef;
        color: #fff;
    }

    padding: 3px 8px;
    border-radius: 4px;
}
.old-address,
.new-address {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: #fff;
    cursor: pointer;
    select {
        flex: 0 0 80px;
    }
}
.new-address {
    .close {
        flex: 0 0 24px;
        height: 24px;
        margin-left: 10px;
        border: 1px solid #ddd;
        background-color: #eee;
        background: url('/layer-close.png') no-repeat center center / 60% auto;
    }
}
.form-add-address {
    width: 100%;
    max-width: 560px;
    background-color: #fff;
    padding: 0 10px;
    .title {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid #00adef;
        .text {
            flex: 0 0 auto;
            font-size: 20px;
            font-weight: bold;
        }
        .close {
            flex: 0 0 30px;
            height: 30px;
            cursor: pointer;
            img {
                height: 100%;
                width: 100%;
            }
        }
    }
    .line {
        display: flex;
        height: 50px;
        border-bottom: 1px solid #eee;
        .label {
            flex: 0 0 120px;
            display: flex;
            align-items: center;
            padding: 0 10px;
        }
        .value {
            display: flex;
            flex: 1 1 100%;
            input {
                flex: 1 1 100%;
                height: 100%;
                width: 100%;
            }
            select {
                flex: 0 0 auto;
                min-width: 100px;
                max-width: 33%;
            }
        }
    }
    .button-group {
        height: 60px;
        padding: 10px;
        display: flex;
        justify-content: center;
        .button {
            display: flex;
            align-items: center;
            height: 100%;
            flex: 0 0 auto;
            padding: 0 20px;
            border-radius: 10px;
            background-color: #00adef;
            color: #fff;
            cursor: pointer;
        }
    }
}
</style>
