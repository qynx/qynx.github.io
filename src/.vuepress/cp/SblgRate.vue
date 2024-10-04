<script setup>
import {defineProps, ref} from 'vue'

const props = defineProps({
    "rate": {

    }
})
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])
</script>

<template>
<el-rate v-model="props.rate" :colors="colors" ></el-rate>
</template>