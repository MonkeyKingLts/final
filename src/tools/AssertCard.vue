<template>
  <!-- Mobile: icon + name on top, stats row below -->
  <div class="md:hidden w-full bg-white rounded-[25px] px-4 py-3">
    <div class="flex items-center gap-3">
      <div
        class="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center shrink-0"
        :class="iconBg"
      >
        <i :class="[icon, iconColor, 'text-[24px]']"></i>
      </div>

      <div class="min-w-0 flex-1">
        <h3 class="text-[#343C6A] text-[16px] font-semibold truncate leading-tight">
          {{ companyName }}
        </h3>
        <p class="text-[#718EBF] text-[14px] truncate leading-tight mt-0.5">
          {{ business }}
        </p>
      </div>
    </div>

    <div class="flex justify-between gap-4 mt-3 pt-3 border-t border-[#F0F2F5]">
      <div>
        <p class="text-[#343C6A] text-[16px] font-semibold tabular-nums leading-tight">
          {{ price }}
        </p>
        <p class="text-[#718EBF] text-[14px] leading-tight mt-0.5">投资价值</p>
      </div>

      <div class="text-right">
        <p
          class="text-[16px] font-semibold tabular-nums leading-tight"
          :class="percent.startsWith('-') ? 'text-[#FF4B6E]' : 'text-[#16DBAA]'"
        >
          {{ percent }}
        </p>
        <p class="text-[#718EBF] text-[14px] leading-tight mt-0.5">超值回报</p>
      </div>
    </div>
  </div>

  <!-- Desktop: grid keeps columns aligned across cards -->
  <div
    class="hidden md:grid w-full bg-white rounded-[25px] px-4 py-3 grid-cols-[57px_minmax(0,1fr)_7rem_6rem] gap-x-6 gap-y-1 items-center"
  >
    <div
      class="row-span-2 w-[57px] h-[57px] rounded-[18px] flex items-center justify-center shrink-0 self-center"
      :class="iconBg"
    >
      <i :class="[icon, iconColor, 'text-[28px]']"></i>
    </div>

    <h3
      class="col-start-2 text-[#343C6A] text-[18px] font-semibold truncate leading-tight"
    >
      {{ companyName }}
    </h3>

    <p
      class="col-start-3 text-[#343C6A] text-[18px] font-semibold text-right leading-tight tabular-nums"
    >
      {{ price }}
    </p>

    <p
      class="col-start-4 text-[18px] font-semibold text-right leading-tight tabular-nums"
      :class="percent.startsWith('-') ? 'text-[#FF4B6E]' : 'text-[#16DBAA]'"
    >
      {{ percent }}
    </p>

    <p class="col-start-2 text-[#718EBF] text-[15px] truncate leading-tight">
      {{ business }}
    </p>

    <p class="col-start-3 text-[#718EBF] text-[15px] text-right leading-tight">
      投资价值
    </p>

    <p class="col-start-4 text-[#718EBF] text-[15px] text-right leading-tight">
      超值回报
    </p>
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
