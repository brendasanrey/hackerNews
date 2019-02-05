<template>
  <div class="flex pal justify-between nowrap orange">
    <div class="flex flex-fixed black">
      <div class="fw7 mr1">Hacker News</div>
      <router-link to="/" class="ml1 no-underline black">New</router-link>
      <div class="ml1">|</div>
      <router-link to="/create" class="ml1 no-uderline black">Submit</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style>
</style>
