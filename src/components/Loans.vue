<template>
  <div class="bg-[#F5F7FA] w-full min-h-dvh p-3 xl:p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-3">
      <SummaryCard v-for="item in loanCards" :key="item.id" v-bind="item" class="cursor-pointer active:scale-98 transition-all duration-100" />
    </div>

    <div>
        <h2 class="text-[#343C6A] font-bold text-[22px] mb-2 pl-4">活跃贷款概述</h2>
        <ActiveLoanOverview />
    </div>
  </div>
</template>

<script setup>
import SummaryCard from "../tools/SummaryCard.vue";
import ActiveLoanOverview from "../tools/ActiveLoanOverview.vue";

const loanCards = [
  {
    id: 1,
    icon: "fa-solid fa-user",
    iconBg: "bg-[#E7EDFF]",
    iconColor: "text-[#396AFF]",
    title: "个人贷款",
    value: "$50,000",
  },
  {
    id: 2,
    icon: "fa-solid fa-briefcase",
    iconBg: "bg-[#FFF5D9]",
    iconColor: "text-[#FFBB38]",
    title: "公司贷款",
    value: "$100,000",
  },
  {
    id: 3,
    icon: "fa-solid fa-chart-simple",
    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",
    title: "商业贷款",
    value: "$500,000",
  },
  {
    id: 4,
    icon: "fa-solid fa-screwdriver-wrench",
    iconBg: "bg-[#DCFAF8]",
    iconColor: "text-[#16DBCC]",
    title: "常用贷款",
    value: "选择",
  },
];
</script>
