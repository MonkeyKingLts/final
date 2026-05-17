<template>
    <div class="bg-[#F5F7FA] w-full min-h-dvh p-3 xl:p-6">
      <div class="w-full bg-white rounded-[25px] p-5 md:p-8">
        <!-- tabs -->
        <div
          class="flex items-center gap-8 md:gap-16 overflow-x-auto
                 border-b border-[#F0F2F5] mb-8"
        >
          <RouterLink
            v-for="item in tabs"
            :key="item.path"
            :to="item.path"
            class="shrink-0 pb-3 text-[#718EBF] text-[15px] md:text-[16px]
                   font-semibold border-b-[3px] border-transparent
                   transition-all duration-200"
            active-class="!text-[#2D60FF] !border-[#2D60FF]"
          >
            {{ item.name }}
          </RouterLink>
        </div>
  
        <!-- content -->
        <RouterView />
      </div>
    </div>
  </template>
  
  <script setup>
  import { RouterLink, RouterView } from "vue-router";
  
  const tabs = [
    {
      name: "编辑个人资料",
      path: "/settings/edit-profile",
    },
    {
      name: "喜爱",
      path: "/settings/preference",
    },
    {
      name: "安全中心",
      path: "/settings/security",
    },
  ];
  </script>