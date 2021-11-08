<template>
  <div
    class="
      container
      container-height
      d-flex
      align-content-center
      flex-wrap
      justify-content-center
    "
  >
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container-height {
  height: 100vh;
}
</style>
