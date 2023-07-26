<script setup>
import IconLogo from './icons/IconLogo.vue'
</script>

<template>
  <div id="header">
    <header class="header">
      <div class="header__container">
        <router-link :to="{ name: 'home' }" href="#" class="header__container-logo logo">
          <IconLogo />
        </router-link>
      </div>
    </header>
  </div>
</template>

<style scoped>
#header {
  width: 100%;
}
.header__container {
  max-width: 1248px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  justify-content: center;
}
</style>
