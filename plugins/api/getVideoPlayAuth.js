import axios from 'axios';
import _ from 'lodash';
// 查询动漫卡通视频
// ------------------------------------------------------------
export default function getVideoPlayAuth(context) {
    // 统一前后端书写
    let that = context.app;

    return async function(params) {
        // 初始化返回
        let res = {};

        // 预定义参数
        params.pageNum = params.pageNum || 1;

        // 开始请求
        let reply = await axios({
            url: that.$domain + '/aly/getVideoPlayAuth',
            method: 'post',
            data: params,
        });
        // 数据处理
        if (reply.data && reply.data.msgCd === that.$msgCode.success && _.isObject(reply.data.body)) {
            return reply.data.body;
        }

        // 返回结果
        return res;
    };

    // =====================================================
    // reply.data.body 值详情
    // =====================================================
    // reply.data.body = {
    //     coverUrl: 'http://imgmagee.geeksfin.com/64320f50626c4371947da443b50d34e9.jpg',
    //     code: '0',
    //     requestId: 'ED2443AB-88E8-4B7B-A304-439353315C26',
    //     videoId: '3345736eb92d4cb0a2e0720eadd2a715',
    //     title: '大灰狼的隐形帽',
    //     playAuth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJUzN3SjFxNkZ0NUIyeWZTaklyNUxHSlBuZ25ydFp3bys2U21yOXAya0JZZTFIM1kzQ2lEejJJSHBOZTNocUIrMGZzUGt3bEdsVTZmZ2Nsck1xRjhVZUZCYWNNSk1ydE1vT3ExNzZKcExGc3QySjZyOEpqc1Y2OHVVR2dsdXBzdlhKYXNEVkVma3VFNVhFTWlJNS8wMGU2TC8rY2lyWVhEN0JHSmFWaUpsaFE4MEtWdzJqRjFSdkQ4dFhJUTBRazYxOUszemRaOW1nTGlidWkzdnhDa1J2MkhCaWptOHR4cW1qL015UTV4MzFpMXYweStCM3dZSHRPY3FjYThCOU1ZMVdUc3Uxdm9oemFyR1Q2Q3BaK2psTStxQVU2cWxZNG1YcnM5cUhFa0ZOd0JpWFNaMjJsT2RpTndoa2ZLTTNOcmRacGZ6bjc1MUN0L2ZVaXA3OHhtUW1YNGdYY1Z5R0ZkMzhtcE9aUXJ6eGFvWmdLZStxQVJtWGpJRFRiS3VTbWhnL2ZIY1dPRGxOZjljY01YSnFBWFF1TUdxQWMvRDJvZzZYTzFuK0ZQamNqUDVvajRBSjVsSHA3TWVNR1YrRGVMeVF5aDBFSWFVN2EwNDQxTUtpUXVranBzUWFnQUZCQno0bEp2UU5rRWJINVV6UWNaNmZ1T3F1cjFrU2h0S3lCSFVwN2grNW9Yd1dHREVRTGxGMmZpRjdwYnVnSHFIa1FNZTNTNlpBeVA2cnlGd3hJM3pTQ1ZsZGJ0ZWx1bWhmaTJ4UThwODB6dGhjM0FOWFdPUGwzU2xFMjhYTlpGV0VWaEhQdzQ5SVRMMmkzeW8yWENZVW50elFtZUQwMHBNd0VNaTFZbDAxbkE9PSIsIkF1dGhJbmZvIjoie1wiQ0lcIjpcIitTeEdKUnlKUEZROFhIWVNIbXRGeklVeGI3UXdrSSs2SjlqSkZVVFB4TktxT0xVb055VCtFU2Y5YzRoNklNQmUxZG11K1ZQOHlzSHNcXHJcXG53anhocVZjR0k1VldzdmpBVE0yUzJGL0J6RXIwSUVzPVxcclxcblwiLFwiQ2FsbGVyXCI6XCJZR2p5L1Z1bFVTR05qTHRjMXpTY1BWUEwwQ2lYbGdqWC9mMS9WM0RRUUtZPVxcclxcblwiLFwiRXhwaXJlVGltZVwiOlwiMjAxOS0xMC0zMVQwMTo1OTo1NFpcIixcIk1lZGlhSWRcIjpcIjMzNDU3MzZlYjkyZDRjYjBhMmUwNzIwZWFkZDJhNzE1XCIsXCJQbGF5RG9tYWluXCI6XCJ2aWRlb21hZ2VlLm1haWppbWVuZy5jb21cIixcIlNpZ25hdHVyZVwiOlwibG50d1JxRWNsZjlIMjduZWFNNkM1L2ZRWUVFPVwifSIsIlZpZGVvTWV0YSI6eyJTdGF0dXMiOiJOb3JtYWwiLCJWaWRlb0lkIjoiMzM0NTczNmViOTJkNGNiMGEyZTA3MjBlYWRkMmE3MTUiLCJUaXRsZSI6IuWkp+eBsOeLvOeahOmakOW9ouW4vSIsIkNvdmVyVVJMIjoiaHR0cDovL2ltZ21hZ2VlLmdlZWtzZmluLmNvbS82NDMyMGY1MDYyNmM0MzcxOTQ3ZGE0NDNiNTBkMzRlOS5qcGciLCJEdXJhdGlvbiI6MTY3LjAyNjl9LCJBY2Nlc3NLZXlJZCI6IlNUUy5OUXNvQ1RzZHh1TVFITExDaVRtYmsySGlqIiwiUGxheURvbWFpbiI6InZpZGVvbWFnZWUubWFpamltZW5nLmNvbSIsIkFjY2Vzc0tleVNlY3JldCI6IkRlZWpIR0VvOUVZYjJHZXpiOW9Vd2lrbmtXd1VUc2pSVndYdmkxRktrUlNkIiwiUmVnaW9uIjoiY24tc2hhbmdoYWkiLCJDdXN0b21lcklkIjoxNDIzOTIwNTAzMjYxMjUzfQ=='
    // }
}
