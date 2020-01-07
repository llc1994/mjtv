<template>
    <div class="layer">
        <div class="form" :style="layerParams.style">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: ["layerParams"]
};
</script>