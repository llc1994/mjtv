<template>
    <div class="not-login">
        请登录账号
    </div>
</template>
<script>
export default {
    mounted(){
        setTimeout(function(){
            window.location.href = '/'
        },2000)
    }
};
</script>
<style lang="scss" scoped>
.not-login{
    text-align: center;
    font-size: 50px;
    color: #999;
    padding: 100px;
}
</style>
