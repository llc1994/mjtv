<template>
        <div class="bottom-wrap">
            <div class="bottom-confirm">
                <div class="text-tips">请收到货后，再确认收货！否则您可能钱货两空!</div>
                <div class="button" @click="confirm">
                    <div>确认收货</div>
                </div>
            </div>
        </div>
</template>

<script>
import axios from "axios";
export default {
    props: ["mallOrderId"],
    data() {
        return {

        };
    },
    computed: {

    },
    components: {

    },
    methods: {
        confirm() {
          if(confirm("确认要收货吗？")){
            let orders = axios({
            url:
                this.$domain +
                "/mer/mall/modifyMyOrderStatus/",
            method: "post",
            headers: {
                token: this.$store.state.session.token || ""
            },
            data: {
               orderStatus:"SUCCESS",
               mallOrderId:this.mallOrderId
            }
        });
}
        }
    }
};
</script>

<style lang="scss" scoped>
.bottom-wrap {
    background-color: #f4f4f4;
    padding: 0 2rem;
}

.bottom-confirm {
    padding: 0.5rem;
    background-color: #fff;
    .text-tips{
        color: red;
    }
}

.button {
    align-items: center;
    flex: 0 0 30px;
    font-size: 24px;
    background-color: #00adef;
    color: #fff;
    height: 46px;
    width:159px;
    padding: 4px 10px;
    border-radius: 6px;
    margin:10px 0px;
    display: flex;
    padding-left: 30px;
    padding-right: 30px;
    cursor: pointer;
    }

</style>
