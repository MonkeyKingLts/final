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
        <h2 class="text-[#343C6A] font-bold text-[22px] mb-2">年收入</h2>

        <div class="bg-white rounded-[25px] p-4 h-[340px]">
          <div ref="monthlyIncome" class="w-full h-full"></div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 p-3">
        <div>
            <h2 class="text-[#343C6A] font-bold text-[22px] mb-2">我的资产</h2>
            <p v-if="investmentsLoading" class="text-[#718EBF] text-sm">加载中...</p>
            <p
              v-else-if="assets.length === 0"
              class="text-[#718EBF] text-sm"
            >
              暂无投资数据
            </p>
            <div v-else class="flex flex-col gap-4">
            <AssertCard class="cursor-pointer active:scale-95 transition-all duration-100"  v-for="item in assets" :key="item.id" :icon="item.icon" :iconBg="item.iconBg" :iconColor="item.iconColor" :companyName="item.companyName" :business="item.business" :price="item.price" :percent="item.percent" />
            </div>
        </div>

        <div>
            <h2 class="text-[#343C6A] font-bold text-[22px] mb-2">趋势股</h2>
            <p v-if="trendStocksLoading" class="text-[#718EBF] text-sm">加载中...</p>
            <p
              v-else-if="trendingStocks.length === 0"
              class="text-[#718EBF] text-sm"
            >
              暂无趋势股数据
            </p>
            <TrendingStockTable v-else :stocks="trendingStocks" />
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
import { listMyInvestmentStats } from "../api/investment-stats";
import { listMyInvestments } from "../api/investments";
import { listTrendStocks } from "../api/trend-stocks";

const annualInvestment = ref(null);
const monthlyIncome = ref(null);

const trendingStocks = ref([]);
const trendStocksLoading = ref(true);
const assets = ref([]);
const investmentCards = ref([]);
const investmentsLoading = ref(true);

const ASSET_ICON_STYLES = [
  {
    icon: "fa-brands fa-apple",
    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",
  },
  {
    icon: "fa-brands fa-google",
    iconBg: "bg-[#E7EDFF]",
    iconColor: "text-[#396AFF]",
  },
  {
    icon: "fa-solid fa-chart-line",
    iconBg: "bg-[#FFF5D9]",
    iconColor: "text-[#FFBB38]",
  },
];

const SUMMARY_CARD_META = [
  {
    id: 1,
    title: "投资总额",
    icon: "fa-solid fa-sack-dollar",
    iconBg: "bg-[#DCFAF8]",
    iconColor: "text-[#16DBCC]",
  },
  {
    id: 2,
    title: "投资数量",
    icon: "fa-solid fa-chart-pie",
    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",
  },
  {
    id: 3,
    title: "退回率",
    icon: "fa-solid fa-repeat",
    iconBg: "bg-[#E7EDFF]",
    iconColor: "text-[#396AFF]",
  },
];

let annualChart = null;
let monthlyChart = null;

const annualInvestmentLabels = ref([]);
const annualInvestmentValues = ref([]);
const annualIncomeLabels = ref([]);
const annualIncomeValues = ref([]);

function parseAmount(value) {
  const amount = Number.parseFloat(String(value));
  return Number.isNaN(amount) ? 0 : amount;
}

function computeYAxisScale(values) {
  const maxValue = Math.max(...values, 0);

  if (maxValue === 0) {
    return { min: 0, max: 10000, interval: 2000 };
  }

  const interval = Math.ceil(maxValue / 4 / 1000) * 1000 || 1000;
  const max = interval * 4;

  return { min: 0, max, interval };
}

function buildAnnualInvestmentSeries(investments) {
  const totalsByYear = investments.reduce((accumulator, investment) => {
    const year = investment.investment_date.slice(0, 4);
    accumulator[year] =
      (accumulator[year] ?? 0) + parseAmount(investment.investment_value);
    return accumulator;
  }, {});

  const years = Object.keys(totalsByYear).sort();

  annualInvestmentLabels.value =
    years.length > 0 ? years : ["暂无数据"];
  annualInvestmentValues.value =
    years.length > 0 ? years.map((year) => totalsByYear[year]) : [0];
}

function buildAnnualIncomeSeries(stats) {
  const yearlyStats = stats
    .filter((item) => item.stat_type === "YEARLY")
    .sort((left, right) => left.period.localeCompare(right.period));

  annualIncomeLabels.value =
    yearlyStats.length > 0
      ? yearlyStats.map((item) => item.period)
      : ["暂无数据"];
  annualIncomeValues.value =
    yearlyStats.length > 0
      ? yearlyStats.map((item) => parseAmount(item.amount))
      : [0];
}

function formatAxisCurrency(value) {
  return `$${Number(value).toLocaleString("en-US")}`;
}

function formatTooltipCurrency(value) {
  return `$${Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

function formatStockPrice(price) {
  const amount = parseAmount(price);
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

function formatReturnRate(rate, fractionDigits = 2) {
  const value = parseAmount(rate);
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(fractionDigits)}%`;
}

function buildInvestmentSummaryCards(investments) {
  const totalValue = investments.reduce(
    (sum, investment) => sum + parseAmount(investment.investment_value),
    0,
  );
  const weightedReturn =
    totalValue > 0
      ? investments.reduce(
          (sum, investment) =>
            sum +
            parseAmount(investment.investment_value) *
              parseAmount(investment.return_rate),
          0,
        ) / totalValue
      : 0;

  const values = [
    formatTooltipCurrency(totalValue),
    investments.length.toLocaleString("en-US"),
    formatReturnRate(weightedReturn),
  ];

  investmentCards.value = SUMMARY_CARD_META.map((item, index) => ({
    id: item.id,
    title: item.title,
    value: values[index],
    icon: item.icon,
    iconBg: item.iconBg,
    iconColor: item.iconColor,
  }));
}

function mapInvestmentsToAssets(investments) {
  return investments.map((investment, index) => {
    const style = ASSET_ICON_STYLES[index % ASSET_ICON_STYLES.length];

    return {
      id: investment.id,
      icon: style.icon,
      iconBg: style.iconBg,
      iconColor: style.iconColor,
      companyName: investment.investment_name,
      business: investment.category,
      price: formatStockPrice(investment.investment_value),
      percent: formatReturnRate(investment.return_rate),
    };
  });
}

function mapTrendStocksToTableItems(stocks) {
  return stocks.map((stock) => ({
    id: stock.id,
    name: stock.stock_name,
    price: formatStockPrice(stock.price),
    returnRate: formatReturnRate(stock.return_rate),
  }));
}

const getAnnualOption = () => {
  const yAxisScale = computeYAxisScale(annualInvestmentValues.value);

  return {
    tooltip: {
      trigger: "axis",
      confine: true,
      shadowBlur: 0,
      extraCssText:
        "box-shadow: 0 2px 8px rgba(52, 60, 106, 0.1); border-radius: 12px;",
      formatter(params) {
        const items = Array.isArray(params) ? params : [params];
        const category = items[0]?.axisValue ?? "";
        let html = `<div style="font-weight:700;margin-bottom:6px">${category}</div>`;

        for (const item of items) {
          html += `<div style="margin-top:4px">${item.marker}投资总额: <b>${formatTooltipCurrency(item.value)}</b></div>`;
        }

        return html;
      },
    },

    grid: {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20,
      containLabel: true,
    },

    xAxis: {
      type: "category",

      data: annualInvestmentLabels.value,

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

      min: yAxisScale.min,
      max: yAxisScale.max,
      interval: yAxisScale.interval,

      axisLine: {
        show: false,
      },

      axisTick: {
        show: false,
      },

      axisLabel: {
        color: "#718EBF",
        fontSize: 14,

        formatter: formatAxisCurrency,
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

        data: annualInvestmentValues.value,

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
  const yAxisScale = computeYAxisScale(annualIncomeValues.value);

  return {
    tooltip: {
      trigger: "axis",
      confine: true,
      shadowBlur: 0,
      extraCssText:
        "box-shadow: 0 2px 8px rgba(52, 60, 106, 0.1); border-radius: 12px;",
      formatter(params) {
        const items = Array.isArray(params) ? params : [params];
        const category = items[0]?.axisValue ?? "";
        let html = `<div style="font-weight:700;margin-bottom:6px">${category}</div>`;

        for (const item of items) {
          html += `<div style="margin-top:4px">${item.marker}年收入: <b>${formatTooltipCurrency(item.value)}</b></div>`;
        }

        return html;
      },
    },

    grid: {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20,
      containLabel: true,
    },

    xAxis: {
      type: "category",

      data: annualIncomeLabels.value,

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

      min: yAxisScale.min,
      max: yAxisScale.max,
      interval: yAxisScale.interval,

      axisLine: {
        show: false,
      },

      axisTick: {
        show: false,
      },

      axisLabel: {
        color: "#718EBF",
        fontSize: 14,

        formatter: formatAxisCurrency,
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

        data: annualIncomeValues.value,

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

const renderCharts = () => {
  annualChart?.setOption(getAnnualOption(), true);
  monthlyChart?.setOption(getMonthlyOption(), true);
  annualChart?.resize();
  monthlyChart?.resize();
};

async function fetchChartData() {
  trendStocksLoading.value = true;
  investmentsLoading.value = true;

  try {
    const [investments, investmentStats, trendStocks] = await Promise.all([
      listMyInvestments(),
      listMyInvestmentStats(),
      listTrendStocks({ limit: 10 }),
    ]);

    buildAnnualInvestmentSeries(investments);
    buildAnnualIncomeSeries(investmentStats);
    buildInvestmentSummaryCards(investments);
    assets.value = mapInvestmentsToAssets(investments);
    trendingStocks.value = mapTrendStocksToTableItems(trendStocks);
  } catch {
    annualInvestmentLabels.value = ["暂无数据"];
    annualInvestmentValues.value = [0];
    annualIncomeLabels.value = ["暂无数据"];
    annualIncomeValues.value = [0];
    investmentCards.value = SUMMARY_CARD_META.map((item) => ({
      ...item,
      value: item.id === 2 ? "0" : item.id === 3 ? "+0.00%" : "$0",
    }));
    assets.value = [];
    trendingStocks.value = [];
  } finally {
    trendStocksLoading.value = false;
    investmentsLoading.value = false;
    renderCharts();
  }
}

const resizeCharts = () => {
  renderCharts();
};

onMounted(() => {
  annualChart = echarts.init(annualInvestment.value);
  monthlyChart = echarts.init(monthlyIncome.value);

  renderCharts();
  fetchChartData();

  window.addEventListener("resize", resizeCharts);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeCharts);

  annualChart?.dispose();
  monthlyChart?.dispose();
});
</script>
