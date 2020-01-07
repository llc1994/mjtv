<template>
    <div class="layer layer-qrCode" v-show="commonQRCodePopViewShow.show">
        <div class="form-white-content">
            <div class="close-bg">
                <div class="close" @click="closeQRCodePop"></div>
            </div>

            <div class="qrcode-bg-content">
                <img src="../static/qrcode-bg.png" style="height: 115%">
                <img class="qrcode-img" :src="commonQRCodeImgName" style="height: 48%">
            </div>
            <div class="qrcode-info-text">
                {{commonQRCodePopInfoText}}<br>体验更流畅
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    export default {
        data() {
            return {
                commonQRCodePopViewShow: {
                    show: false
                },
                commonQRCodeImgName: "",
                commonQRCodePopInfoText: ""
            };
        },
        methods: {
            closeQRCodePop() {
                // 关闭弹框
                this.commonQRCodePopViewShow.show = false;
            }
        }
    };
</script>
