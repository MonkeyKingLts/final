<template>
    <div
      class="w-full bg-white rounded-[25px] p-5
             flex flex-col gap-5
             md:flex-row md:items-center md:justify-between md:gap-4"
    >
      <!-- top / left -->
      <div class="flex items-center gap-4">
        <div
          class="size-[64px] md:size-[70px] rounded-[20px]
                 flex items-center justify-center shrink-0"
          :class="iconBg"
        >
          <i
            class="fa-solid fa-credit-card text-[28px] md:text-[30px]"
            :class="iconColor"
          ></i>
        </div>
  
        <div>
          <h3 class="text-[#343C6A] text-[17px] md:text-[18px] font-semibold">
            银行卡种类
          </h3>
          <p class="text-[#718EBF] text-[15px] md:text-[16px] mt-1">
            {{ cardType }}
          </p>
        </div>
      </div>
  
      <!-- mobile info grid / desktop columns -->
      <div
        class="grid grid-cols-2 gap-x-6 gap-y-4
               md:flex md:items-center md:justify-between md:flex-1 md:gap-8"
      >
        <div>
          <h3 class="text-[#343C6A] text-[16px] md:text-[18px] font-semibold">
            银行
          </h3>
          <p class="text-[#718EBF] text-[15px] md:text-[16px] mt-1">
            {{ bankName }}
          </p>
        </div>
  
        <div>
          <h3 class="text-[#343C6A] text-[16px] md:text-[18px] font-semibold">
            银行卡号
          </h3>
          <p class="text-[#718EBF] text-[15px] md:text-[16px] mt-1 tracking-[1px]">
            {{ cardNumber }}
          </p>
        </div>
  
        <div>
          <h3 class="text-[#343C6A] text-[16px] md:text-[18px] font-semibold">
            持卡人
          </h3>
          <p class="text-[#718EBF] text-[15px] md:text-[16px] mt-1">
            {{ holderName }}
          </p>
        </div>
  
        <button
          class="text-[#2D60FF] text-[16px] md:text-[18px] font-semibold
                 text-left md:text-center cursor-pointer
                 active:scale-95 transition-all duration-100"
        >
          详情
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    cardType: {
      type: String,
      default: "副卡",
    },
    bankName: {
      type: String,
      default: "中国银行",
    },
    cardNumber: {
      type: String,
      default: "**** **** 5600",
    },
    holderName: {
      type: String,
      default: "张三丰",
    },
    iconBg: {
      type: String,
      default: "bg-[#E7EDFF]",
    },
    iconColor: {
      type: String,
      default: "text-[#396AFF]",
    },
  });
  </script>