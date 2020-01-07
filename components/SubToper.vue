<template>
    <div class="sub-toper custom-scroll">
        <div class="wrap">
            <nuxt-link target="_blank"
                to="/play/APG20190412007501"
                class="link"
                :class="{ active: APG === 'APG20190412007501' }"
                >麦咭小厨</nuxt-link
            >
            <nuxt-link target="_blank"
                to="/play/APG20180712006002"
                class="link"
                :class="{ active: APG === 'APG20180712006002' }"
                >爱上幼儿园</nuxt-link
            >
            <nuxt-link target="_blank"
                to="/play/APG20180707004501"
                class="link"
                :class="{ active: APG === 'APG20180707004501' }"
                >嘭！发射</nuxt-link
            >
            <nuxt-link target="_blank"
                to="/play/APG20180614003002"
                class="link"
                :class="{ active: APG === 'APG20180614003002' }"
                >疯狂的麦咭</nuxt-link
            >
            <nuxt-link target="_blank"
                to="/play/APG20180614002002"
                class="link"
                :class="{ active: APG === 'APG20180614002002' }"
                >运动不一样</nuxt-link
            >
            <nuxt-link target="_blank"
                to="/play/APG20180614002501"
                class="link"
                :class="{ active: APG === 'APG20180614002501' }"
            >
                龙的传人
            </nuxt-link>
            <nuxt-link target="_blank"
                to="/play/APG20180612001501"
                class="link"
                :class="{ active: APG === 'APG20180612001501' }"
                >人偶总动员</nuxt-link
            >
            <nuxt-link target="_blank"
                to="/play/APG20180611000002"
                class="link"
                :class="{ active: APG === 'APG20180611000002' }"
                >中国新声代</nuxt-link
            >
            <nuxt-link target="_blank"
                to="/play/APG20180712006001"
                class="link"
                :class="{ active: APG === 'APG20180712006001' }"
                >爱宝贝晒一晒</nuxt-link
            >
            <nuxt-link target="_blank"
                to="/play/APG20180712005002"
                class="link"
                :class="{ active: APG === 'APG20180712005002' }"
                >玩名堂</nuxt-link
            >
            <nuxt-link target="_blank"
                to="/play/APG20180614003001"
                class="link"
                :class="{ active: APG === 'APG20180614003001' }"
                >飞行幼儿园</nuxt-link
            >
            <nuxt-link target="_blank"
                to="/play/APG20180707004502"
                class="link"
                :class="{ active: APG === 'APG20180707004502' }"
                >童趣大冒险</nuxt-link
            >
        </div>
    </div>
</template>
<script>
export default {
    props: ["APG"]
};
</script>