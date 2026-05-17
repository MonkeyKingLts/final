<template>
  <div
    class="w-full h-[120px] rounded-[25px] bg-white grid grid-cols-[150px_1fr] items-center px-7"
  >
    <!-- icon area -->
    <div class="flex justify-center">
      <div
        class="size-[70px] rounded-full flex items-center justify-center"
        :class="iconBg"
      >
        <i :class="[icon, iconColor, 'fa-fw text-[30px] leading-none']"></i>
      </div>
    </div>

    <!-- text -->
    <div class="flex flex-col">
      <span class="text-[#718EBF] text-[18px] font-semibold">
        {{ title }}
      </span>

      <span class="text-[#343C6A] text-[24px] font-bold">
        {{ value }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: "fa-solid fa-user",
  },
  iconBg: {
    type: String,
    default: "bg-[#E7EDFF]",
  },
  iconColor: {
    type: String,
    default: "text-[#396AFF]",
  },
  title: {
    type: String,
    default: "个人贷款",
  },
  value: {
    type: String,
    default: "$50,000",
  },
});
</script>
