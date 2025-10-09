<script setup>

const props = defineProps({
    "list": []
})

const colorMap = {
  0: "blue",
  1: "gray",
  2: "green",
}

</script>

<template>
<a-timeline>
  <a-timeline-item  :color="colorMap[idx%3]"  v-for='(item,idx) in props.list'>
    <a-typography>
      <a-typography-link  :href="item.href" target="_blank">
       {{item.path}}
      </a-typography-link>
       <a-typography-paragraph type="secondary" style="font-size:12px">
        {{item.time}}
       </a-typography-paragraph>
     </a-typography>
  </a-timeline-item>

</a-timeline>

</template>