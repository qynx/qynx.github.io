<script setup>
const props = defineProps({
    "text":{},
    "title": {}
})

</script>

<template>
<a-tooltip placement="top" trigger='hover' effect="customized">
    <template #title>{{ props.title }}</template>
   <u>{{ props.text }}</u>
</a-tooltip>
</template>