<template>
    <div class="w-full rounded-[25px] p-6 bg-white space-y-5">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex items-center justify-between cursor-pointer active:scale-98 transition-all duration-100"
      >
        <div class="flex items-center gap-4">
          <div
            class="size-[55px] rounded-full flex items-center justify-center"
            :class="item.backgroundColor"
          >
            <i :class="[item.icon, item.textColor, 'text-xl']"></i>
          </div>
  
          <div class="flex flex-col">
            <span class="text-[#505887] font-bold">
              {{ item.title || '银行卡扣款' }}
            </span>
            <span class="text-[#718EBF]">
              {{ item.date }}
            </span>
          </div>
        </div>
  
        <div
          class="text-xl"
          :class="item.amount < 0 ? 'text-[#FF4B4A]' : 'text-[#41D4A8]'"
        >
          {{ item.amount < 0 ? '-' : '+' }}${{
            Math.abs(item.amount)
          }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    items: {
      type: Array,
      required: true,
    },
  })
  </script>