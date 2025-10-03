<script setup>
import {ref} from 'vue'

const props = defineProps({
    "rate": {

    },
    "desc":{}
})
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])
</script>

<template>
<span>
    <a-rate v-model:value="props.rate" :colors="colors" ></a-rate>
    <span class="ant-rate-text">{{ desc || "" }}</span>
</span>
</template>