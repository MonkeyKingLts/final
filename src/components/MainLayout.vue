<script setup>
import { RouterView } from 'vue-router'
import Sidebar from '../tools/Sidebar.vue'
import Search from '../tools/Search.vue'
</script>

<template>
  <Sidebar />
  <main class="xl:ml-[240px]">
    <Search />
    <RouterView />
  </main>
</template>
