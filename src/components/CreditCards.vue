<template>
  <div class="w-full min-h-dvh bg-[#F5F7FA]">
    <div class="p-3">
      <h2 class="text-[#343C6A] font-bold text-[22px] mb-2 pl-4">我的银行卡</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-3">
        <Card
          backgroundColor="bg-[linear-gradient(123deg,#2d60ff_2%,#539bff_101%)]"
          textColor="text-white"
          class="cursor-pointer active:scale-95 transition-all duration-100"
        />
        <Card
          class="cursor-pointer active:scale-95 transition-all duration-100"
        />
        <Card
          background-color="bg-[#FFFFFF]"
          text-color="text-[#343C6A]"
          class="cursor-pointer active:scale-95 transition-all duration-100"
        />
      </div>
    </div>

    <div>
      <div class="grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-4 p-3 min-h-[400px]">
        <div>
          <h2 class="text-[#343C6A] font-bold text-[22px] mb-2 pl-4">
            银行卡消费数据
          </h2>

          <div class="bg-white rounded-[25px] p-4">
            <div ref="chartRef" class="w-full h-[300px]"></div>
          </div>
        </div>

        <div>
          <h2 class="text-[#343C6A] font-bold text-[22px] mb-2 pl-4">
            银行卡列表
          </h2>
          
          <div class="flex flex-col gap-4">
          <BankCardList
            v-for="item in bankCards"
            :key="item.id"
            v-bind="item"
          />
        </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4 p-3 min-h-[500px]">
        <div>
            <h2 class="text-[#343C6A] font-bold text-[22px] mb-2 pl-4">添加银行卡</h2>
            <AddBankCardForm />
        </div>

        <div>
            <h2 class="text-[#343C6A] font-bold text-[22px] mb-2 pl-4">卡片设置</h2>
            <CardSettingsPanel  />
        </div>
    </div>
  </div>
</template>

<script setup>
import CardSettingsPanel from "../tools/CardSettingsPanel.vue";
import AddBankCardForm from "../tools/AddBankCardForm.vue";
import BankCardList from "../tools/BankCardList.vue";
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
import Card from "../tools/card.vue";

const bankCards = [
  {
    id: 1,

    cardType: "副卡",

    bankName: "中国银行",

    cardNumber: "**** **** 5600",

    holderName: "张三丰",

    iconBg: "bg-[#E7EDFF]",
    iconColor: "text-[#396AFF]",
  },

  {
    id: 2,

    cardType: "副卡",

    bankName: "工商银行",

    cardNumber: "**** **** 4300",

    holderName: "张三丰",

    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",
  },

  {
    id: 3,

    cardType: "副卡",

    bankName: "农业银行",

    cardNumber: "**** **** 7560",

    holderName: "张三丰",

    iconBg: "bg-[#FFF5D9]",
    iconColor: "text-[#FFBB38]",
  },
];

const chartRef = ref(null);
let MyChart = null;

const getCardConsumeOption = () => {
  return {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {d}%",
    },

    legend: {
      bottom: 10,
      left: "center",
      itemWidth: 12,
      itemHeight: 12,
      icon: "circle",
      itemGap: 24,
      textStyle: {
        color: "#718EBF",
        fontSize: 14,
        fontWeight: 600,
      },
      data: ["中国银行", "工商银行", "建设银行", "农业银行"],
    },

    series: [
      {
        name: "银行卡消费数据",
        type: "pie",
        radius: ["32%", "68%"],
        center: ["50%", "42%"],
        startAngle: 90,
        avoidLabelOverlap: false,

        label: {
          show: false,
        },

        labelLine: {
          show: false,
        },

        itemStyle: {
          borderWidth: 0,
        },

        data: [
          {
            value: 25,
            name: "中国银行",
            itemStyle: {
              color: "#396AFF",
            },
          },
          {
            value: 25,
            name: "建设银行",
            itemStyle: {
              color: "#16DBCC",
            },
          },
          {
            value: 25,
            name: "工商银行",
            itemStyle: {
              color: "#FF82AC",
            },
          },
          {
            value: 25,
            name: "农业银行",
            itemStyle: {
              color: "#FFBB38",
            },
          },
        ],
      },
    ],
  };
};

const resizeChart = () => {
  MyChart?.resize();
};

onMounted(() => {
  MyChart = echarts.init(chartRef.value);
  MyChart.setOption(getCardConsumeOption());

  window.addEventListener("resize", resizeChart);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeChart);
  MyChart?.dispose();
});
</script>
