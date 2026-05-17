<template>
    <div
      class="w-full bg-white rounded-[25px] px-4 py-3 flex items-center justify-between"
    >
      <div class="flex items-center gap-4 min-w-0">
        <div
          class="w-[57px] h-[57px] rounded-[18px] flex items-center justify-center shrink-0"
          :class="iconBg"
        >
          <i :class="[icon, iconColor, 'text-[28px]']"></i>
        </div>
  
        <div class="min-w-0">
          <h3 class="text-[#343C6A] text-[18px] font-semibold truncate">
            {{ companyName }}
          </h3>
          <p class="text-[#718EBF] text-[15px] mt-1 truncate">
            {{ business }}
          </p>
        </div>
      </div>
  
      <div class="text-left shrink-0">
        <p class="text-[#343C6A] text-[18px] font-semibold">
          {{ price }}
        </p>
        <p class="text-[#718EBF] text-[15px] mt-1">
          投资价值
        </p>
      </div>
  
      <div class="text-left shrink-0">
        <p
          class="text-[18px] font-semibold"
          :class="percent.startsWith('-') ? 'text-[#FF4B6E]' : 'text-[#16DBAA]'"
        >
          {{ percent }}
        </p>
        <p class="text-[#718EBF] text-[15px] mt-1">
          超值回报
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    icon: {
      type: String,
      default: "fa-brands fa-apple",
    },
  
    iconBg: {
      type: String,
      default: "bg-[#FFE0EB]",
    },
  
    iconColor: {
      type: String,
      default: "text-[#FF82AC]",
    },
  
    companyName: {
      type: String,
      default: "Apple Store",
    },
  
    business: {
      type: String,
      default: "电子商务、市场",
    },
  
    price: {
      type: String,
      default: "$54,000",
    },
  
    percent: {
      type: String,
      default: "+16%",
    },
  });
  </script>