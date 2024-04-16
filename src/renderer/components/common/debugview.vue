<template>
  <div v-if="!isPackaged">
    <slot></slot>
  </div>
</template>

<script>
export default {
name: "debugview"
}
</script>

<style scoped>

</style>