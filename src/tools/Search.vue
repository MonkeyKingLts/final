<template>
  <div
    class="hidden xl:flex items-center justify-between h-[90px] px-10 bg-white border-b border-gray-100"
  >
    <!-- title -->
    <h1 class="block shrink-0 text-3xl font-bold text-[#343C6A] z-10 font-sans">
      {{ currentTitle }}
    </h1>

    <!-- right -->
    <div class="flex items-center gap-6">
      <!-- search -->
      <div
        class="w-[350px] h-[50px] rounded-full bg-[#F5F7FA] flex items-center gap-4 px-6"
      >
        <i class="fa-solid fa-magnifying-glass text-[#718EBF] text-lg"></i>

        <input
          type="text"
          placeholder="Search for something"
          class="bg-transparent outline-none w-full text-[#718EBF] placeholder:text-[#718EBF]"
        />
      </div>

      <!-- settings -->
      <RouterLink
        to="/settings"
        class="size-[50px] rounded-full bg-[#F5F7FA] flex items-center justify-center cursor-pointer active:scale-90 transition-all duration-100"
      >
        <i class="fa-solid fa-gear text-[#718EBF] text-xl"></i>
      </RouterLink>

      <!-- notification -->
      <button
        class="size-[50px] rounded-full bg-[#F5F7FA] flex items-center justify-center relative cursor-pointer active:scale-90 transition-all duration-100"
      >
        <i class="fa-regular fa-bell text-[#FE5C73] text-xl"></i>

        <span
          class="absolute top-3 right-3 size-2 rounded-full bg-[#FE5C73]"
        ></span>
      </button>

      <!-- avatar -->
      <img
        src="https://i.pravatar.cc/150?img=32"
        alt="用户头像"
        class="size-[60px] rounded-full object-cover cursor-pointer active:scale-90 transition-all duration-100"
      />

      <button
        type="button"
        @click="logout"
        class="flex items-center gap-2 h-[50px] px-5 rounded-full bg-[#F5F7FA] text-[#718EBF] hover:text-[#FE5C73] cursor-pointer active:scale-90 transition-all duration-100"
      >
        <i class="fa-solid fa-right-from-bracket text-lg"></i>
        <span class="text-sm font-medium whitespace-nowrap">退出登录</span>
      </button>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router';
import { useLogout } from '../composables/useLogout';

const route = useRoute()
const { logout } = useLogout()
const menuItems = [
  {
    name: '实时看板',
    path: '/dashboard',
  },
  {
    name: '交易',
    path: '/transactions',
  },
  {
    name: '账户',
    path: '/accounts',
  },
  {
    name: '资产',
    path: '/assets',
  },
  {
    name: '信用卡',
    path: '/credit-cards',
  },
  {
    name: '贷款',
    path: '/loans',
  },
  {
    name: '设备',
    path: '/devices',
  },
  {
    name: '设置',
    path: '/settings',
  }
]

const currentTitle = computed(() => {
  const matchedItem = menuItems.find((item) => route.path.startsWith(item.path))
  return matchedItem?.name || '实时看板'
})
</script>
