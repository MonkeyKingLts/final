<template>
  <div class="bg-[#F5F7FA] w-full min-h-dvh p-3 xl:p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-3">
      <SummaryCard
        v-for="item in insuranceCards"
        :key="item.id"
        v-bind="item"
        class="cursor-pointer active:scale-97 transition-all duration-100"
      />
    </div>

    <div>
      <h2 class="text-[#343C6A] font-bold text-[22px] mb-2 pl-4">
        银行服务清单
      </h2>

      <div class="flex flex-col gap-4">
      <BankServiceItem
        v-for="item in bankServices"
        :key="item.id"
        v-bind="item"
      />
    </div>
    </div>
  </div>
</template>

<script setup>
import SummaryCard from "../tools/SummaryCard.vue";
import BankServiceItem from "../tools/BankServiceItem.vue";

const bankServices = [
  {
    id: 1,

    icon: "fa-solid fa-hand-holding-dollar",
    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",

    serviceName: "商业贷款",
    serviceDesc: "长期签约",

    details: [
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

  {
    id: 2,

    icon: "fa-solid fa-briefcase",
    iconBg: "bg-[#FFF5D9]",
    iconColor: "text-[#FFBB38]",

    serviceName: "支票账户",
    serviceDesc: "长期签约",

    details: [
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

  {
    id: 3,

    icon: "fa-solid fa-chart-simple",
    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",

    serviceName: "储蓄账户",
    serviceDesc: "长期签约",

    details: [
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

  {
    id: 4,

    icon: "fa-solid fa-user",
    iconBg: "bg-[#E7EDFF]",
    iconColor: "text-[#396AFF]",

    serviceName: "借记卡和信用卡",
    serviceDesc: "长期签约",

    details: [
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

  {
    id: 5,

    icon: "fa-solid fa-shield-heart",
    iconBg: "bg-[#DCFAF8]",
    iconColor: "text-[#16DBCC]",

    serviceName: "人寿保险",
    serviceDesc: "长期签约",

    details: [
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

  {
    id: 6,

    icon: "fa-solid fa-hand-holding-dollar",
    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",

    serviceName: "商业贷款",
    serviceDesc: "长期签约",

    details: [
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
];

const insuranceCards = [
  {
    id: 1,

    icon: "fa-solid fa-shield",
    iconBg: "bg-[#E7EDFF]",
    iconColor: "text-[#396AFF]",

    title: "人寿保险",
    value: "无期限",
  },

  {
    id: 2,

    icon: "fa-solid fa-bag-shopping",
    iconBg: "bg-[#FFF5D9]",
    iconColor: "text-[#FFBB38]",

    title: "购物",
    value: "购买,购物",
  },

  {
    id: 3,

    icon: "fa-solid fa-shield-heart",
    iconBg: "bg-[#DCFAF8]",
    iconColor: "text-[#16DBCC]",

    title: "安全",
    value: "我们是您的靠谱管家",
  },
];
</script>
