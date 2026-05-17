<template>
  <!-- mobile topbar -->
  <div
    class="xl:hidden h-14 w-full bg-white flex justify-between items-center gap-2 p-4"
  >
    <div class="flex items-center gap-2">
      <i class="fa-solid fa-building-columns text-amber-300 text-xl"></i>
      <h2 class="text-zinc-700 text-xl font-bold">softbank</h2>
    </div>

    <button @click="isOpen = !isOpen" class="relative w-6 h-6">
      <i
        class="fa-solid fa-bars absolute inset-0 transition-all duration-300"
        :class="isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'"
      ></i>
      <i
        class="fa-solid fa-xmark absolute inset-0 transition-all duration-300"
        :class="isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'"
      ></i>
    </button>
  </div>

  <!-- mobile menu -->
  <div
    class="xl:hidden bg-white shadow-md overflow-hidden transition-all duration-300 ease-in-out"
    :class="isOpen ? 'opacity-100 min-h-dvh p-4' : 'opacity-0 max-h-0 p-0'"
  >
    <nav class="space-y-6 text-[#718EBF] text-lg">
      <RouterLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        @click="isOpen = false"
        class="flex items-center gap-4"
      >
        <i :class="[item.icon, 'w-6 text-xl']"></i>
        <span>{{ item.name }}</span>
      </RouterLink>
    </nav>
  </div>

  <!-- desktop sidebar -->
  <aside
    class="hidden xl:flex fixed left-0 top-0 h-screen w-[240px] bg-white border-r border-gray-100 flex-col"
  >
    <div class="h-[90px] flex items-center gap-3 px-10">
      <i class="fa-solid fa-building-columns text-amber-300 text-2xl"></i>
      <h2 class="text-[#343C6A] text-2xl font-bold">softbank</h2>
    </div>

    <nav class="mt-6 flex flex-col gap-8 text-[#718EBF] text-lg font-semibold">
      <RouterLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="relative flex items-center gap-6 px-10 cursor-pointer active:scale-95 transition-all duration-100"
        :class="isActiveMenu(item.path) ? 'text-[#2D60FF]' : ''"
      >
        <span
          v-if="isActiveMenu(item.path)"
          class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#5B73A0] rounded-r-full"
        ></span>

        <i :class="[item.icon, 'w-6 text-2xl']"></i>
        <span>{{ item.name }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const isOpen = ref(false);

const isActiveMenu = (path) => {
  if (path === "/dashboard") {
    return route.path === "/dashboard";
  }

  return route.path.startsWith(path);
};

const menuItems = [
  {
    name: "实时看板",
    path: "/dashboard",
    icon: "fa-solid fa-house",
  },
  {
    name: "交易",
    path: "/transactions",
    icon: "fa-solid fa-money-bill-transfer",
  },
  {
    name: "账户",
    path: "/accounts",
    icon: "fa-solid fa-user",
  },
  {
    name: "资产",
    path: "/assets",
    icon: "fa-solid fa-chart-column",
  },
  {
    name: "信用卡",
    path: "/credit-cards",
    icon: "fa-solid fa-credit-card",
  },
  {
    name: "贷款",
    path: "/loans",
    icon: "fa-solid fa-hand-holding-dollar",
  },
  {
    name: "设备",
    path: "/devices",
    icon: "fa-solid fa-screwdriver-wrench",
  },
  {
    name: "设置",
    path: "/settings",
    icon: "fa-solid fa-gear",
  },
];
</script>
