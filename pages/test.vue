<template> </template>
<script>
import axios from 'axios';
import _ from 'lodash';
// 提交ddd分支
export default {
    // middleware: 'global',
    async asyncData(context) {
        let reply = await axios({
            url: context.app.$domain + '/aly//getPlayInfo',
            // headers: {
            //     token: 'token.28d50d63b3ef4a4bbb30b11689be1376',
            // },
            data: {
                videoId: 'res.c10f5086074c430093f34e71263cf135',
            },
        });
    },
    mounted() {
    },
};
</script>