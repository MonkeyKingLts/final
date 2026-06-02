<template>
  <div class="w-full min-h-dvh bg-[#F5F7FA]">
    <div class="p-3">
      <h2 class="text-[#343C6A] font-bold text-[22px] mb-2 pl-4">我的银行卡</h2>

      <p v-if="pageLoading" class="text-[#718EBF] text-sm pl-4">加载中...</p>
      <p
        v-else-if="displayCards.length === 0"
        class="text-[#718EBF] text-sm pl-4"
      >
        暂无银行卡数据
      </p>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-3">
        <Card
          v-for="(card, index) in displayCards"
          :key="card.id"
          class="cursor-pointer active:scale-95 transition-all duration-100"
          :variant="CARD_VARIANTS[index % CARD_VARIANTS.length]"
          :name="card.card_holder"
          :card-number="formatCardNumber(card.card_number_masked)"
          :expiration-date="formatCardExpiry(card.expiry_date)"
          :balance="card.balance"
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
            <p
              v-if="!pageLoading && consumptionPieData.length === 0"
              class="text-[#718EBF] text-sm text-center py-24"
            >
              暂无消费数据
            </p>
            <div
              v-show="pageLoading || consumptionPieData.length > 0"
              ref="chartRef"
              class="w-full h-[300px]"
            ></div>
          </div>
        </div>

        <div>
          <h2 class="text-[#343C6A] font-bold text-[22px] mb-2 pl-4">
            银行卡列表
          </h2>

          <p v-if="pageLoading" class="text-[#718EBF] text-sm pl-4">加载中...</p>
          <p
            v-else-if="bankCardListItems.length === 0"
            class="text-[#718EBF] text-sm pl-4"
          >
            暂无银行卡数据
          </p>

          <div v-else class="flex flex-col gap-4">
            <BankCardList
              v-for="item in bankCardListItems"
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
        <AddBankCardForm @created="fetchPageData" />
      </div>

      <div>
        <h2 class="text-[#343C6A] font-bold text-[22px] mb-2 pl-4">卡片设置</h2>
        <CardSettingsPanel />
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
import { listMyBankCards } from "../api/bank-cards";
import { listMyRecentTransactions } from "../api/transactions";

const CARD_VARIANTS = ["blue", "primary", "light"];

const CARD_TYPE_LABELS = {
  DEBIT: "借记卡",
  CREDIT: "信用卡",
  SUPPLEMENTARY: "副卡",
};

const LIST_ICON_STYLES = [
  { iconBg: "bg-[#E7EDFF]", iconColor: "text-[#396AFF]" },
  { iconBg: "bg-[#FFE0EB]", iconColor: "text-[#FF82AC]" },
  { iconBg: "bg-[#FFF5D9]", iconColor: "text-[#FFBB38]" },
];

const PIE_COLORS = ["#396AFF", "#16DBCC", "#FF82AC", "#FFBB38", "#718EBF"];

const chartRef = ref(null);
let myChart = null;

const pageLoading = ref(true);
const displayCards = ref([]);
const bankCardListItems = ref([]);
const consumptionPieData = ref([]);

function formatCardExpiry(expiryDate) {
  const [year, month] = expiryDate.split("-");
  return `${month}/${year.slice(-2)}`;
}

function formatCardNumber(maskedNumber) {
  const digits = maskedNumber.replace(/\D/g, "");
  if (digits.length <= 4) {
    return `**** **** **** ${digits}`;
  }
  return maskedNumber;
}

function formatCardLabel(card) {
  const digits = card.card_number_masked.replace(/\D/g, "");
  const last4 = digits.slice(-4) || "****";
  return `${card.bank_name} · ${last4}`;
}

function mapBankCardsToListItems(cards) {
  return cards.map((card, index) => {
    const style = LIST_ICON_STYLES[index % LIST_ICON_STYLES.length];

    return {
      id: card.id,
      cardType: CARD_TYPE_LABELS[card.card_type] ?? card.card_type,
      bankName: card.bank_name,
      cardNumber: formatCardNumber(card.card_number_masked),
      holderName: card.card_holder,
      iconBg: style.iconBg,
      iconColor: style.iconColor,
    };
  });
}

function buildConsumptionPieData(cards, transactions) {
  const cardMap = Object.fromEntries(cards.map((card) => [card.id, card]));

  const spendingByCardId = transactions.reduce((accumulator, transaction) => {
    const amount = Number.parseFloat(transaction.amount);
    if (Number.isNaN(amount) || amount >= 0) {
      return accumulator;
    }

    const cardId = transaction.bank_card_id;
    accumulator[cardId] = (accumulator[cardId] ?? 0) + Math.abs(amount);
    return accumulator;
  }, {});

  return Object.entries(spendingByCardId)
    .filter(([cardId]) => cardMap[Number(cardId)])
    .map(([cardId, value], index) => ({
      value,
      name: formatCardLabel(cardMap[Number(cardId)]),
      itemStyle: {
        color: PIE_COLORS[index % PIE_COLORS.length],
      },
    }));
}

function getCardConsumeOption() {
  const legendData = consumptionPieData.value.map((item) => item.name);

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
      data: legendData,
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

        data: consumptionPieData.value,
      },
    ],
  };
}

function renderChart() {
  if (!myChart || consumptionPieData.value.length === 0) {
    return;
  }

  myChart.setOption(getCardConsumeOption(), true);
  myChart.resize();
}

async function fetchPageData() {
  pageLoading.value = true;

  try {
    const [cards, transactions] = await Promise.all([
      listMyBankCards(),
      listMyRecentTransactions({ limit: 100 }),
    ]);

    displayCards.value = cards.slice(0, 3);
    bankCardListItems.value = mapBankCardsToListItems(cards);
    consumptionPieData.value = buildConsumptionPieData(cards, transactions);
  } catch {
    displayCards.value = [];
    bankCardListItems.value = [];
    consumptionPieData.value = [];
  } finally {
    pageLoading.value = false;
    renderChart();
  }
}

function resizeChart() {
  renderChart();
}

onMounted(() => {
  myChart = echarts.init(chartRef.value);
  fetchPageData();
  window.addEventListener("resize", resizeChart);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeChart);
  myChart?.dispose();
});
</script>
