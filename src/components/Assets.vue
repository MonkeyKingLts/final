<template>
  <div class="w-full min-h-dvh bg-[#F5F7FA]">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-3">
      <SummaryCard
        class="cursor-pointer active:scale-95 transition-all duration-100 flex items-center justify-center"
        v-for="item in investmentCards"
        :key="item.id"
        :title="item.title"
        :value="item.value"
        :icon="item.icon"
        :iconBg="item.iconBg"
        :iconColor="item.iconColor"
      />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 p-3">
      <div>
        <h2 class="text-[#343C6A] font-bold text-[22px] mb-2">年总投资</h2>

        <div class="bg-white rounded-[25px] p-4 h-[340px]">
          <div ref="annualInvestment" class="w-full h-full"></div>
        </div>
      </div>

      <div>
        <h2 class="text-[#343C6A] font-bold text-[22px] mb-2">月收入</h2>

        <div class="bg-white rounded-[25px] p-4 h-[340px]">
          <div ref="monthlyIncome" class="w-full h-full"></div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 p-3">
        <div>
            <h2 class="text-[#343C6A] font-bold text-[22px] mb-2">我的资产</h2>
            <div class="flex flex-col gap-4">
            <AssertCard class="cursor-pointer active:scale-95 transition-all duration-100"  v-for="item in assets" :key="item.id" :icon="item.icon" :iconBg="item.iconBg" :iconColor="item.iconColor" :companyName="item.companyName" :business="item.business" :price="item.price" :percent="item.percent" />
            </div>
        </div>

        <div>
            <h2 class="text-[#343C6A] font-bold text-[22px] mb-2">趋势股</h2>
            <TrendingStockTable :stocks="trendingStocks" />
        </div>
    </div>
  </div>
</template>
    
<script setup>
import AssertCard from "../tools/AssertCard.vue";
import TrendingStockTable from "../tools/TrendingStockTable .vue";
import { ref, onMounted, onUnmounted } from "vue";
import SummaryCard from "../tools/SummaryCard.vue";
import * as echarts from "echarts";

const annualInvestment = ref(null);
const monthlyIncome = ref(null);

const trendingStocks = [
  {
    id: 1,
    name: "华泰证券",
    price: "$520",
    returnRate: "+5%",
  },
  {
    id: 2,
    name: "华泰证券",
    price: "$480",
    returnRate: "+10%",
  },
  {
    id: 3,
    name: "华泰证券",
    price: "$350",
    returnRate: "-3%",
  },
  {
    id: 4,
    name: "华泰证券",
    price: "$940",
    returnRate: "+2%",
  },
  {
    id: 5,
    name: "华泰证券",
    price: "$670",
    returnRate: "-12%",
  },
];

let annualChart = null;
let monthlyChart = null;

const assets = [
  {
    id: 1,

    icon: "fa-brands fa-apple",
    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",

    companyName: "Apple Store",
    business: "电子商务、市场",

    price: "$54,000",
    percent: "+16%",
  },

  {
    id: 2,

    icon: "fa-brands fa-google",
    iconBg: "bg-[#E7EDFF]",
    iconColor: "text-[#396AFF]",

    companyName: "三星手机",
    business: "电子商务、市场",

    price: "$25,300",
    percent: "-4%",
  },

  {
    id: 3,

    icon: "fa-solid fa-t",
    iconBg: "bg-[#FFF5D9]",
    iconColor: "text-[#FFBB38]",

    companyName: "特斯拉汽车公司",
    business: "电动汽车",

    price: "$8,200",
    percent: "+25%",
  },
];

const getAnnualOption = () => {
  return {
    grid: {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20,
      containLabel: true,
    },

    xAxis: {
      type: "category",

      data: ["2016", "2017", "2018", "2019", "2020", "2021"],

      boundaryGap: false,

      axisLine: {
        show: false,
      },

      axisTick: {
        show: false,
      },

      axisLabel: {
        color: "#718EBF",
        fontSize: 14,
        margin: 16,
      },
    },

    yAxis: {
      type: "value",

      min: 0,
      max: 40000,
      interval: 10000,

      axisLine: {
        show: false,
      },

      axisTick: {
        show: false,
      },

      axisLabel: {
        color: "#718EBF",
        fontSize: 14,

        formatter: (value) => `$${value.toLocaleString()}`,
      },

      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "#E7ECF2",
        },
      },
    },

    series: [
      {
        type: "line",

        data: [5000, 23000, 15000, 37000, 20000, 29000],

        smooth: false,

        symbol: "circle",
        symbolSize: 10,

        lineStyle: {
          color: "#FFAA00",
          width: 4,
        },

        itemStyle: {
          color: "#FFFFFF",
          borderColor: "#FFAA00",
          borderWidth: 4,
        },
      },
    ],
  };
};

const getMonthlyOption = () => {
  return {
    grid: {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20,
      containLabel: true,
    },

    xAxis: {
      type: "category",

      data: ["2016", "2017", "2018", "2019", "2020", "2021"],

      boundaryGap: false,

      axisLine: {
        show: false,
      },

      axisTick: {
        show: false,
      },

      axisLabel: {
        color: "#718EBF",
        fontSize: 14,
        margin: 16,
      },
    },

    yAxis: {
      type: "value",

      min: 0,
      max: 40000,
      interval: 10000,

      axisLine: {
        show: false,
      },

      axisTick: {
        show: false,
      },

      axisLabel: {
        color: "#718EBF",
        fontSize: 14,

        formatter: (value) => `$${value.toLocaleString()}`,
      },

      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "#E7ECF2",
        },
      },
    },

    series: [
      {
        type: "line",

        smooth: true,

        symbol: "none",

        data: [10000, 20000, 26000, 31000, 22000, 33000],

        lineStyle: {
          color: "#16DBCC",
          width: 4,
        },

        areaStyle: {
          opacity: 0,
        },
      },
    ],
  };
};

const investmentCards = [
  {
    id: 1,

    title: "投资总额",
    value: "$150,000",

    icon: "fa-solid fa-sack-dollar",

    iconBg: "bg-[#DCFAF8]",
    iconColor: "text-[#16DBCC]",
  },

  {
    id: 2,

    title: "投资数量",
    value: "1,250",

    icon: "fa-solid fa-chart-pie",

    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",
  },

  {
    id: 3,

    title: "退回率",
    value: "+5.80%",

    icon: "fa-solid fa-repeat",

    iconBg: "bg-[#E7EDFF]",
    iconColor: "text-[#396AFF]",
  },
];

const resizeCharts = () => {
  annualChart?.resize();
  monthlyChart?.resize();
};

onMounted(() => {
  annualChart = echarts.init(annualInvestment.value);
  monthlyChart = echarts.init(monthlyIncome.value);

  annualChart.setOption(getAnnualOption());
  monthlyChart.setOption(getMonthlyOption());

  window.addEventListener("resize", resizeCharts);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeCharts);

  annualChart?.dispose();
  monthlyChart?.dispose();
});
</script>
