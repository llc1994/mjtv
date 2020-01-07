<template>
    <div class="maiji-page">
        <div class="start" :class="{ disabled: page.current <= 1 }" @click="pageStart">| &lt;</div>
        <div class="prev" :class="{ disabled: page.current <= 1 }" @click="pagePrev">&lt;</div>
        <div class="num" :class="{ active: item === page.current }" v-for="(item, index) in list(num)" :key="index" @click="pageNum(item)">{{ item }}</div>
        <div class="next" :class="{ disabled: page.current >= page.count }" @click="pageNext">下一页 &gt;</div>
        <div class="end" :class="{ disabled: page.current >= page.count }" @click="pageEnd">&gt; |</div>
        <div class="total">共{{ page.count }}页</div>
    </div>
</template>
<script>
export default {
    name: 'page',
    data: function() {
        return {
            list: num => {
                if (num <= 1) {
                    return [this.page.current];
                }
                let min = this.page.current - Math.floor(num / 2) + 1;
                let max = this.page.current + Math.ceil(num / 2);
                if (min < 1) {
                    max += 1 - min;
                    min = 1;
                }
                if (max > this.page.count) {
                    min -= max - this.page.count;
                    max = this.page.count;
                }
                if (min < 1) min = 1;
                let result = [];
                for (let i = min; i <= max; i++) {
                    result.push(i);
                }
                return result;
            }
        };
    },
    props: ['page', 'num'],
    methods: {
        // 跳转到第一页
        pageStart() {
            this.page.current = 1;
        },
        // 跳转到下一页
        pageNext() {
            if (this.page.current >= this.page.count) return;
            this.page.current += 1;
        },
        // 跳转到上一页
        pagePrev() {
            if (this.page.current <= 1) return;
            this.page.current -= 1;
        },
        // 跳转到最后一页
        pageEnd() {
            this.page.current = this.page.count;
        },
        // 跳转到指定页
        pageNum(page) {
            this.page.current = page;
        }
    }
};
</script>
<style lang="scss" scoped>
.maiji-page {
    height: 40px;
    display: flex;
    justify-content: center;
    font-size: 16px;
    margin-top: 40px;
    & > div {
        // display: flex;
        // align-items: center;
        line-height: 40px;
        flex: 0 0 auto;
        padding: 0 15px;
        border: 1px solid #ddd;
        margin-right: -1px;
        cursor: pointer;
        &:hover {
            background-color: #f5f5f5;
        }
        &.total {
            pointer-events: none;
        }
        &.disabled {
            color: #ccc;
            pointer-events: none;
        }
    }
    .active {
        color: #00adef;
        font-weight: bold;
        pointer-events: none;
    }
}
</style>