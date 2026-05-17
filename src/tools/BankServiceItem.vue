<template>
    <div
      class="w-full bg-white rounded-[25px] p-5
             flex flex-col gap-5
             xl:flex-row xl:items-center xl:justify-between xl:gap-8"
    >
      <!-- service -->
      <div class="flex items-center gap-5 xl:w-[28%]">
        <div
          class="size-[70px] rounded-[20px]
                 flex items-center justify-center shrink-0"
          :class="iconBg"
        >
          <i :class="[icon, iconColor, 'text-[30px]']"></i>
        </div>
  
        <div>
          <h3 class="text-[#343C6A] text-[18px] font-semibold">
            {{ serviceName }}
          </h3>
  
          <p class="text-[#718EBF] text-[16px] mt-1">
            {{ serviceDesc }}
          </p>
        </div>
      </div>
  
      <!-- details -->
      <div
        class="grid grid-cols-1 gap-4
               sm:grid-cols-3 xl:flex xl:flex-1 xl:justify-between xl:gap-8"
      >
        <div
          v-for="item in details"
          :key="item.id"
        >
          <h4 class="text-[#343C6A] text-[17px] font-semibold">
            {{ item.title }}
          </h4>
  
          <p class="text-[#718EBF] text-[15px] mt-1">
            {{ item.desc }}
          </p>
        </div>
      </div>
  
      <!-- action -->
      <button
        class="w-full h-[42px] rounded-full border border-[#718EBF]
               text-[#718EBF] text-[16px] font-semibold
               active:scale-95 transition-all duration-100
               cursor-pointer
               active:border-[#2D60FF] active:text-[#2D60FF]
               xl:w-[160px] xl:h-[44px]"
      >
        详情
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    icon: {
      type: String,
      default: "fa-solid fa-hand-holding-dollar",
    },
  
    iconBg: {
      type: String,
      default: "bg-[#FFE0EB]",
    },
  
    iconColor: {
      type: String,
      default: "text-[#FF82AC]",
    },
  
    serviceName: {
      type: String,
      default: "商业贷款",
    },
  
    serviceDesc: {
      type: String,
      default: "长期签约",
    },
  
    details: {
      type: Array,
      default: () => [
        {
          id: 1,
          title: "Lorem Ipsum",
          desc: "Many publishing",
        },
        {
          id: 2,
          title: "Lorem Ipsum",
          desc: "Many publishing",
        },
        {
          id: 3,
          title: "Lorem Ipsum",
          desc: "Many publishing",
        },
      ],
    },
  });
  </script>