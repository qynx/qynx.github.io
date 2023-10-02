<script setup>
import {defineProps} from 'vue'

const props = defineProps({
    "text":{},
    "title": {}
})

</script>

<template>
<el-popover  :title='props.title' trigger='hover'>
    <template #reference>
        <span style='border-bottom: 2px solid green'>{{ props.text }}</span>
    </template>
</el-popover>
</template>