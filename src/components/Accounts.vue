<template>
  <div class="bg-[#F5F7FA] w-full min-h-dvh p-3 xl:p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-3">
      <SummaryCard
        class="cursor-pointer active:scale-95 transition-all duration-100"
        v-for="item in summaryCards"
        :key="item.id"
        :title="item.title"
        :value="item.value"
        :icon="item.icon"
        :iconBg="item.iconBg"
        :iconColor="item.iconColor"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 items-start">
      <div class="space-y-6">
        <div>
          <h2 class="text-[#343C6A] font-bold text-[22px] mb-3">最近交易</h2>
          <div>
            <!-- desktop / tablet -->
            <div class="hidden md:block bg-white rounded-[25px] p-6">
              <div
                v-for="item in transactions"
                :key="item.id"
                class="grid grid-cols-[2fr_1fr_1.2fr_1fr_1fr] items-center py-4 cursor-pointer active:scale-97 transition-all duration-100"
              >
                <div class="flex items-center gap-5">
                  <div
                    class="size-[60px] rounded-[20px] flex items-center justify-center"
                    :class="item.iconBg"
                  >
                    <i :class="[item.icon, item.iconColor, 'text-2xl']"></i>
                  </div>

                  <div>
                    <h3 class="text-[#343C6A] font-bold text-[16px]">
                      {{ item.title }}
                    </h3>
                    <p class="text-[#8BA3CB] font-semibold">
                      {{ item.date }}
                    </p>
                  </div>
                </div>

                <div class="text-[#718EBF] font-semibold">
                  {{ item.type }}
                </div>

                <div class="text-[#718EBF] font-semibold">
                  {{ item.card }}
                </div>

                <div class="text-[#718EBF] font-semibold">
                  {{ item.status }}
                </div>

                <div
                  class="text-right font-bold text-[18px]"
                  :class="item.amount < 0 ? 'text-[#FF5B7F]' : 'text-[#16DBCC]'"
                >
                  {{ item.amount < 0 ? "-" : "+" }}${{ Math.abs(item.amount) }}
                </div>
              </div>
            </div>

            <!-- mobile -->
            <div class="md:hidden space-y-4">
              <div
                v-for="item in transactions"
                :key="item.id"
                class="bg-white rounded-[22px] p-4 cursor-pointer active:scale-95 transition-all duration-100"
              >
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="size-[52px] rounded-[18px] flex items-center justify-center"
                      :class="item.iconBg"
                    >
                      <i :class="[item.icon, item.iconColor, 'text-xl']"></i>
                    </div>

                    <div>
                      <h3 class="text-[#343C6A] font-bold">
                        {{ item.title }}
                      </h3>
                      <p class="text-[#8BA3CB] text-sm font-semibold">
                        {{ item.date }}
                      </p>
                    </div>
                  </div>

                  <div
                    class="font-bold text-[18px]"
                    :class="
                      item.amount < 0 ? 'text-[#FF5B7F]' : 'text-[#16DBCC]'
                    "
                  >
                    {{ item.amount < 0 ? "-" : "+" }}${{
                      Math.abs(item.amount)
                    }}
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-y-2 text-sm">
                  <span class="text-[#8BA3CB] font-semibold">种类</span>
                  <span class="text-right text-[#343C6A] font-semibold">
                    {{ item.type }}
                  </span>

                  <span class="text-[#8BA3CB] font-semibold">银行卡</span>
                  <span class="text-right text-[#343C6A] font-semibold">
                    {{ item.card }}
                  </span>

                  <span class="text-[#8BA3CB] font-semibold">状态</span>
                  <span class="text-right text-[#343C6A] font-semibold">
                    {{ item.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-[#343C6A] font-bold text-[22px] mb-2">
            Debit & Credit Overview
          </h2>
          <div class="w-full h-[320px] bg-white rounded-[25px] p-4">
            <div ref="chartRef" class="w-full h-full"></div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="xl:min-h-[366px]">
          <h2 class="text-[#343C6A] font-bold text-[22px] mb-4">我的银行卡</h2>

          <Card
          class="cursor-pointer active:scale-95 transition-all duration-100"
            background-color="bg-[linear-gradient(124deg,#2D60FF_2%,#539BFF_101%)]"
          />
        </div>

        <div>
          <h2 class="text-[#343C6A] font-bold text-[22px] mb-2">已发送发票</h2>
          <TransactionCardList :items="invoiceList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SummaryCard from "../tools/SummaryCard.vue";
import * as echarts from "echarts";
import { ref, onMounted, onUnmounted } from "vue";
import Card from "../tools/card.vue";
import TransactionCardList from "../tools/TransactionCardList.vue";

const chartRef = ref(null);
let myChart = null;

const invoiceList = [
  {
    id: 1,

    title: 'Apple Store',
    date: '5h ago',

    amount: 450,

    icon: 'fa-brands fa-apple',

    backgroundColor: 'bg-[#DCFAF8]',
    textColor: 'text-[#16DBCC]',
  },

  {
    id: 2,

    title: '王武玩',
    date: '2 days ago',

    amount: 160,

    icon: 'fa-solid fa-user',

    backgroundColor: 'bg-[#FFF5D9]',
    textColor: 'text-[#FFBB38]',
  },

  {
    id: 3,

    title: 'Playstation游戏机',
    date: '5 days ago',

    amount: 1085,

    icon: 'fa-brands fa-playstation',

    backgroundColor: 'bg-[#E7EDFF]',
    textColor: 'text-[#396AFF]',
  },

  {
    id: 4,

    title: '孙三娘',
    date: '10 days ago',

    amount: 90,

   icon: 'fa-solid fa-user',

    backgroundColor: 'bg-[#FFE0EB]',
    textColor: 'text-[#FF82AC]',
  },
]

const summaryCards = [
  {
    id: 1,
    title: "我的余额",
    value: "$12,750",

    icon: "fa-solid fa-sack-dollar",

    iconBg: "bg-[#FFF5D9]",
    iconColor: "text-[#FFBB38]",
  },

  {
    id: 2,
    title: "收入",
    value: "$5,600",

    icon: "fa-solid fa-hand-holding-dollar",

    iconBg: "bg-[#E7EDFF]",
    iconColor: "text-[#396AFF]",
  },

  {
    id: 3,
    title: "花费",
    value: "$3,460",

    icon: "fa-solid fa-file-invoice-dollar",

    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",
  },

  {
    id: 4,
    title: "Total Saving",
    value: "$7,920",

    icon: "fa-solid fa-piggy-bank",

    iconBg: "bg-[#DCFAF8]",
    iconColor: "text-[#16DBCC]",
  },
];

const transactions = [
  {
    id: 1,
    title: "Spotify订阅",
    date: "25 Jan 2021",
    type: "购物",
    card: "1234 ****",
    status: "进行中",
    amount: -150,
    icon: "fa-solid fa-arrows-rotate",
    iconBg: "bg-[#DCFAF8]",
    iconColor: "text-[#16DBCC]",
  },
  {
    id: 2,
    title: "移动服务",
    date: "25 Jan 2021",
    type: "服务",
    card: "1234 ****",
    status: "已完成",
    amount: -340,
    icon: "fa-solid fa-screwdriver-wrench",
    iconBg: "bg-[#E7EDFF]",
    iconColor: "text-[#396AFF]",
  },
  {
    id: 3,
    title: "王武",
    date: "25 Jan 2021",
    type: "转账",
    card: "1234 ****",
    status: "已完成",
    amount: 780,
    icon: "fa-solid fa-user",
    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",
  },
];

const getOption = () => {
  const isMobile = window.innerWidth < 576;

  return {
    grid: {
      top: isMobile ? 70 : 60,
      left: isMobile ? 10 : 35,
      right: isMobile ? 10 : 30,
      bottom: 20,
      containLabel: true,
    },

    title: {
      text: "本周借记7560美元，贷记5420美元",
      left: 0,
      top: 0,

      textStyle: {
        color: "#343C6A",
        fontSize: isMobile ? 12 : 16,
        fontWeight: 700,
      },
    },

    legend: {
      top: 30,
      right: 0,

      icon: "roundRect",

      itemWidth: isMobile ? 10 : 14,
      itemHeight: isMobile ? 10 : 14,

      itemGap: isMobile ? 10 : 24,

      textStyle: {
        color: "#8BA3CB",
        fontSize: isMobile ? 12 : 16,
        fontWeight: 600,
      },

      data: ["Debit", "Credit"],
    },

    xAxis: {
      type: "category",

      data: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],

      axisLine: {
        show: false,
      },

      axisTick: {
        show: false,
      },

      axisLabel: {
        color: "#8BA3CB",
        fontSize: isMobile ? 11 : 14,
        fontWeight: 500,
        margin: 10,
      },
    },

    yAxis: {
      type: "value",
      show: false,
    },

    series: [
      {
        name: "Debit",

        type: "bar",

        data: [360, 280, 270, 560, 400, 420, 480],

        barWidth: isMobile ? 14 : 34,

        barGap: isMobile ? "15%" : "35%",

        itemStyle: {
          color: "#396AFF",
          borderRadius: [12, 12, 12, 12],
        },
      },

      {
        name: "Credit",

        type: "bar",

        data: [620, 500, 370, 330, 570, 280, 580],

        barWidth: isMobile ? 14 : 34,

        itemStyle: {
          color: "#FFA800",

          borderRadius: [12, 12, 12, 12],
        },
      },
    ],
  };
};

const renderChart = () => {
  if (!myChart) return;
  myChart.setOption(getOption(), true);
  myChart.resize();
};

onMounted(() => {
  myChart = echarts.init(chartRef.value);
  renderChart();

  window.addEventListener("resize", renderChart);
});

onUnmounted(() => {
  window.removeEventListener("resize", renderChart);

  if (myChart) {
    myChart.dispose();
    myChart = null;
  }
});
</script>
