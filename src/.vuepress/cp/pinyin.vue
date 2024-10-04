<script setup>
import {defineProps} from 'vue'

const props = defineProps({
    "text":{},
    "title": {}
})

</script>

<template>
<el-tooltip placement="top" :content='props.title' trigger='hover' effect="customized">
   {{ props.text }}
</el-tooltip>
</template>