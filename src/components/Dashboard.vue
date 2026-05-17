<template>
    <div class="w-full min-h-dvh bg-gray-50 p-4 xl:p-6">
      <div class="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <!-- 左侧 -->
        <div class="space-y-6">
          <!-- 我的银行卡 -->
          <section>
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-[#343C6A] font-bold text-[22px]">
                我的银行卡
              </h2>
  
              <button class=" xl:block text-[#343C6A] font-semibold cursor-pointer active:scale-90 transition-all duration-100">
                查看更多
              </button>
            </div>
  
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card
                class="cursor-pointer active:scale-98 transition-all duration-100"
                name="Eddy Cusuma"
                cardNumber="3778 **** **** 1234"
                expirationDate="12/22"
                balance="5756"
              />
  
              <Card
                class="cursor-pointer active:scale-98 transition-all duration-100"
                textColor="text-[#343C6A]"
                name="Eddy Cusuma"
                cardNumber="3778 **** **** 1234"
                expirationDate="12/22"
                balance="5756"
                backgroundColor="bg-[#FFFFFF]"
              />
            </div>
          </section>
  
          <!-- 每周活动 -->
          <section>
            <h2 class="text-[#343C6A] font-bold text-[22px] mb-4">
              每周活动
            </h2>
  
            <div class="w-full rounded-[25px] bg-white p-4 md:p-6">
              <div ref="chartRef" class="h-[280px] md:h-[330px] w-full"></div>
            </div>
          </section>
  
          <!-- 批量转账 -->
          <section class="max-w-[520px]">
            <h2 class="text-[#343C6A] font-bold text-[22px] mb-4">
              批量转账
            </h2>
  
            <div class="w-full rounded-[25px] bg-white p-6">
              <div class="flex items-center justify-between gap-4">
                <div
                  v-for="user in transferUsers"
                  :key="user.id"
                  class="flex flex-col items-center shrink-0"
                >
                  <img
                    :src="user.avatar"
                    class="size-16 rounded-full object-cover mb-3 cursor-pointer"
                  />
  
                  <h3 class="text-[#343C6A] font-semibold text-lg">
                    {{ user.name }}
                  </h3>
  
                  <p class="text-[#718EBF] text-sm">
                    {{ user.role }}
                  </p>
                </div>
  
                <button
                  class="size-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[#718EBF] cursor-pointer active:scale-90 transition-all duration-100"
                >
                  <i class="fa-solid fa-chevron-right text-xl"></i>
                </button>
              </div>
  
              <div class="flex items-center gap-4 mt-8">
                <span class="text-[#718EBF] font-medium whitespace-nowrap">
                  填写金额
                </span>
  
                <div class="flex flex-1 h-12 rounded-full bg-[#EDF1F7] overflow-hidden">
                  <input
                    v-model="transferAmount"
                    type="text"
                    class="flex-1 bg-transparent px-6 text-[#718EBF] outline-none min-w-0"
                    placeholder="525.50"
                  />
  
                  <button
                    class="h-full px-6 rounded-full bg-[#396AFF] text-white font-semibold flex items-center gap-3 cursor-pointer active:scale-90 transition-all duration-100"
                  >
                    发送
                    <i class="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
  
        <!-- 右侧 -->
        <div class="space-y-6">
          <!-- 最近交易 -->
          <section>
            <h2 class="text-[#343C6A] font-bold text-[22px] mb-4">
              最近交易
            </h2>
  
            <TransactionCardList :items="amountArr" />
          </section>
  
          <!-- 消费数据统计 -->
          <section>
            <h2 class="text-[#343C6A] font-bold text-[22px] mb-4">
              消费数据统计
            </h2>
  
            <div class="w-full rounded-[25px] bg-white p-4 md:p-6">
              <div ref="pieChartRef" class="h-[280px] md:h-[300px] w-full"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </template>

<script setup>
import Card from "../tools/card.vue";
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
import TransactionCardList from "../tools/TransactionCardList.vue";

const props = defineProps({
  date: {
    type: String,
    default: "28 January 2026",
  },
  amount: {
    type: Number,
    default: -800,
  },
});

const amountArr = ref([
  {
    icon: "fa-solid fa-wallet",
    date: "28 January 2026",
    amount: -850,
    backgroundColor: "bg-[#FFF5D9]",
    textColor: "text-[#FFBB38]",
  },
  {
    icon: "fa-brands fa-paypal",
    date: "25 January 2021",
    amount: 2500,
    backgroundColor: "bg-[#E7EDFF]",
    textColor: "text-[#396AFF]",
  },
  {
    icon: "fa-solid fa-coins",
    date: "21 January 2021",
    amount: 5400,
    backgroundColor: "bg-[#DCFAF8]",
    textColor: "text-[#16DBCC]",
  },
]);

const chartRef = ref(null);

let chart = null;

const getOption = () => {
  const isMd = window.innerWidth >= 768;

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },

    legend: {
      top: 10,
      right: isMd ? 40 : 15,

      icon: "circle",

      itemWidth: isMd ? 18 : 14,
      itemHeight: isMd ? 18 : 14,

      itemGap: isMd ? 50 : 25,

      textStyle: {
        color: "#718EBF",
        fontSize: isMd ? 18 : 13,
        fontWeight: 600,
        padding: [0, 0, 0, 10],
      },

      data: [
        {
          name: "押金",
          icon: "circle",
          itemStyle: {
            color: "#16DBCC",
          },
        },
        {
          name: "退回",
          icon: "circle",
          itemStyle: {
            color: "#FF82AC",
          },
        },
      ],
    },

    grid: {
      top: isMd ? 70 : 55,
      left: isMd ? 55 : 28,
      right: isMd ? 40 : 12,
      bottom: isMd ? 45 : 35,
    },

    xAxis: {
      type: "category",
      data: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: "#718EBF",
        fontSize: isMd ? 14 : 10,
        margin: isMd ? 16 : 10,
      },
    },

    yAxis: {
      type: "value",
      min: 0,
      max: 500,
      interval: 100,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: "#718EBF",
        fontSize: isMd ? 14 : 10,
      },
      splitLine: {
        lineStyle: {
          color: "#F3F3F5",
        },
      },
    },

    series: [
      {
        name: "押金",
        type: "bar",
        data: [480, 350, 330, 480, 160, 390, 400],
        barWidth: isMd ? 18 : 8,
        barGap: isMd ? "80%" : "35%",
        barCategoryGap: isMd ? "45%" : "25%",
        itemStyle: {
          color: "#FFA800",
          borderRadius: [20, 20, 20, 20],
        },
      },
      {
        name: "退回",
        type: "bar",
        data: [250, 130, 270, 370, 250, 250, 340],
        barWidth: isMd ? 18 : 8,
        itemStyle: {
          color: "#16DBCC",
          borderRadius: [20, 20, 20, 20],
        },
      },
    ],
  };
};
const pieChartRef = ref(null)
let pieChart = null

const getPieOption = () => {
  const isMd = window.innerWidth >= 768

  return {
    tooltip: {
      trigger: 'item'
    },

    series: [
      {
        type: 'pie',

        radius: isMd ? ['0%', '88%'] : ['0%', '82%'],

        center: ['50%', '48%'],

        avoidLabelOverlap: false,

        itemStyle: {
          borderColor: '#ffffff',
          borderWidth: isMd ? 14 : 10
        },

        label: {
          show: true,
          position: 'inside',

          color: '#ffffff',

          fontSize: isMd ? 12 : 10,

          fontWeight: 700,

          formatter: '{d}%\n{b}'
        },

        labelLine: {
          show: false
        },

        data: [
          {
            value: 30,
            name: '娱乐',

            selected: true,
            selectedOffset: 12,

            itemStyle: {
              color: '#16DBCC'
            }
          },
          {
            value: 15,
            name: '账单费用',

            selected: true,
            selectedOffset: 12,

            itemStyle: {
              color: '#FF82AC'
            }
          },
          {
            value: 35,
            name: '其他',

            selected: true,
            selectedOffset: 12,

            itemStyle: {
              color: '#396AFF'
            }
          },
          {
            value: 20,
            name: '资产',

            selected: true,
            selectedOffset: 12,

            itemStyle: {
              color: '#FFBB38'
            }
          }
        ]
      }
    ]
  }
}

const transferAmount = ref('525.50')

const transferUsers = ref([
  {
    id: 1,
    name: '木子李',
    role: 'CEO',
    avatar: 'https://i.pravatar.cc/150?img=47'
  },
  {
    id: 2,
    name: '木子李',
    role: '经理',
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: 3,
    name: '木子李',
    role: '设计师',
    avatar: 'https://i.pravatar.cc/150?img=15'
  }
])


const renderChart = () => {
  if (chart) {
    chart.setOption(getOption(), true)
    chart.resize()
  }

  if (pieChart) {
    pieChart.setOption(getPieOption(), true)
    pieChart.resize()
  }
}

onMounted(() => {
  chart = echarts.init(chartRef.value)
  pieChart = echarts.init(pieChartRef.value)

  renderChart()

  window.addEventListener('resize', renderChart)
})

onUnmounted(() => {
  window.removeEventListener('resize', renderChart)

  if (chart) {
    chart.dispose()
    chart = null
  }

  if (pieChart) {
    pieChart.dispose()
    pieChart = null
  }
})
</script>
