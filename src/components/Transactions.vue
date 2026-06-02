<template>
  <div class="w-full min-h-dvh bg-gray-50 p-4 xl:p-6">
    <div class="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 mb-3">
      <div>
        <h2 class="text-[#343C6A] font-bold text-[22px] mb-4">我的银行卡</h2>

        <p v-if="bankCardsLoading" class="text-[#718EBF] text-sm">加载中...</p>
        <p v-else-if="bankCards.length === 0" class="text-[#718EBF] text-sm">
          暂无银行卡数据
        </p>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <Card
            v-for="(card, index) in bankCards"
            :key="card.id"
            class="cursor-pointer active:scale-98 transition-all duration-100"
            :variant="CARD_VARIANTS[index % CARD_VARIANTS.length]"
            :name="card.card_holder"
            :card-number="formatCardNumber(card.card_number_masked)"
            :expiration-date="formatCardExpiry(card.expiry_date)"
            :balance="card.balance"
          />
        </div>
      </div>

      <div>
        <h2 class="text-[#343C6A] font-bold text-[22px] mb-4">我的消费</h2>
        <div class="w-full rounded-[25px] bg-white p-4 md:p-6">
          <div class="w-full h-[220px]" ref="chartRef"></div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-[#343C6A] font-bold text-[22px] mb-4">最近交易</h2>
      <div class="flex items-center w-full border-b-2 border-[#EBEEF2]">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="
            activeTab === tab.value
              ? 'text-[#2D60FF] border-[#2D60FF]'
              : 'text-[#718EBF] border-transparent'
          "
          class="w-[120px] h-[60px] flex items-center justify-center border-b-[3px] font-semibold text-[16px] transition-all duration-300 cursor-pointer"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="hidden md:block bg-white rounded-[25px] p-6 mt-6">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b border-[#E6EFF5]">
              <th class="pb-4 text-left text-[#718EBF] font-semibold">描述</th>
              <th class="pb-4 text-left text-[#718EBF] font-semibold">
                交易 ID
              </th>
              <th class="pb-4 text-left text-[#718EBF] font-semibold">种类</th>
              <th class="pb-4 text-left text-[#718EBF] font-semibold">
                银行卡
              </th>
              <th class="pb-4 text-left text-[#718EBF] font-semibold">日期</th>
              <th class="pb-4 text-left text-[#718EBF] font-semibold">金额</th>
              <th class="pb-4 text-right text-[#718EBF] font-semibold">收据</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="transactionsLoading">
              <td colspan="7" class="py-8 text-center text-[#718EBF]">加载中...</td>
            </tr>

            <tr v-else-if="paginatedTransactions.length === 0">
              <td colspan="7" class="py-8 text-center text-[#718EBF]">暂无交易记录</td>
            </tr>

            <tr
              v-for="item in paginatedTransactions"
              :key="item.id"
              class="border-b border-[#F2F4F7] last:border-b-0"
            >
              <td class="py-5">
                <div class="flex items-center gap-4">
                  <div
                    class="size-9 rounded-full border-2 border-[#718EBF] flex items-center justify-center text-[#718EBF] font-bold"
                  >
                    i
                  </div>

                  <span class="text-[#505887] font-semibold">
                    {{ item.desc }}
                  </span>
                </div>
              </td>

              <td class="py-5 text-[#505887] font-semibold">
                {{ item.transactionId }}
              </td>

              <td class="py-5 text-[#505887] font-semibold">
                {{ item.type }}
              </td>

              <td class="py-5 text-[#505887] font-semibold">
                {{ item.card }}
              </td>

              <td class="py-5 text-[#505887] font-semibold">
                {{ item.date }}
              </td>

              <td
                class="py-5 font-bold"
                :class="item.amount < 0 ? 'text-[#FF5B7F]' : 'text-[#16DBCC]'"
              >
                {{ item.amount < 0 ? "-" : "+" }}${{
                  Math.abs(item.amount).toLocaleString()
                }}
              </td>

              <td class="py-5 text-right">
                <button
                  class="w-[100px] h-[38px] rounded-full border border-[#718EBF] text-[#343C6A] font-semibold hover:border-[#2D60FF] hover:text-[#2D60FF] active:scale-95 transition-all duration-100"
                >
                  下载
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="md:hidden space-y-4">
        <p v-if="transactionsLoading" class="text-[#718EBF] text-sm text-center py-6">
          加载中...
        </p>

        <p
          v-else-if="paginatedTransactions.length === 0"
          class="text-[#718EBF] text-sm text-center py-6"
        >
          暂无交易记录
        </p>

        <div
          v-for="item in paginatedTransactions"
          :key="item.id"
          class="bg-white rounded-[20px] p-4"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <div
                class="size-10 rounded-full border-2 border-[#718EBF] flex items-center justify-center text-[#718EBF]"
              >
                i
              </div>

              <div>
                <h3 class="text-[#343C6A] font-semibold">
                  {{ item.desc }}
                </h3>
                <p class="text-[#718EBF] text-sm">
                  {{ item.date }}
                </p>
              </div>
            </div>

            <span
              class="font-bold"
              :class="item.amount < 0 ? 'text-[#FF5B7F]' : 'text-[#16DBCC]'"
            >
              {{ item.amount < 0 ? "-" : "+" }}${{ Math.abs(item.amount) }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-y-2 text-sm text-[#718EBF]">
            <p>交易ID</p>
            <p class="text-right text-[#343C6A]">{{ item.transactionId }}</p>

            <p>种类</p>
            <p class="text-right text-[#343C6A]">{{ item.type }}</p>

            <p>银行卡</p>
            <p class="text-right text-[#343C6A]">{{ item.card }}</p>
          </div>

          <button
            class="mt-4 w-full h-10 rounded-full border border-[#718EBF] text-[#343C6A] font-semibold cursor-pointer active:scale-96 transition-all duration-100"
          >
            下载
          </button>
        </div>
      </div>

      <div class="flex justify-end items-center gap-3 mt-6">
        <!-- previous -->
        <button
          @click="goToPreviousPage"
          :disabled="activePage === 1"
          class="flex items-center gap-2 text-[#2D60FF] font-semibold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <i class="fa-solid fa-chevron-left text-sm"></i>
          <span>Previous</span>
        </button>

        <!-- page -->
        <button
          v-for="page in pages"
          :key="page"
          @click="activePage = page"
          :class="
            activePage === page
              ? 'bg-[#2D60FF] text-white shadow-lg'
              : 'bg-transparent text-[#2D60FF]'
          "
          class="size-[45px] rounded-xl font-semibold transition-all duration-200 cursor-pointer active:scale-95"
        >
          {{ page }}
        </button>

        <!-- next -->
        <button
          @click="goToNextPage"
          :disabled="activePage === totalPages"
          class="flex items-center gap-2 text-[#2D60FF] font-semibold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <i class="fa-solid fa-chevron-right text-sm"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { computed, ref, watch, onMounted, onUnmounted } from "vue";
import Card from "../tools/card.vue";
import { listMyBankCards } from "../api/bank-cards";
import { listMyRecentTransactions } from "../api/transactions";

const CARD_VARIANTS = ["primary", "light", "blue"];
const PAGE_SIZE = 5;

const TRANSACTION_TYPE_LABELS = {
  SHOPPING: "购物",
  TRANSFER_IN: "转入",
  TRANSFER_OUT: "转出",
  SERVICE: "服务",
  WITHDRAWAL: "取款",
  DEPOSIT: "存款",
};

const chartRef = ref(null);
let chart = null;

const bankCards = ref([]);
const bankCardsLoading = ref(true);
const transactions = ref([]);
const transactionsLoading = ref(true);

const activeIndex = ref(4);
const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
const values = [8500, 12000, 8800, 4500, 12500, 8000];

const getOption = () => {
  return {
    grid: {
      top: 30,
      left: 0,
      right: 0,
      bottom: 20,
      containLabel: false,
    },

    xAxis: {
      type: "category",
      data: months,

      axisTick: {
        show: false,
      },

      axisLine: {
        show: false,
      },

      axisLabel: {
        color: "#8BA3CB",
        fontSize: 14,
        fontWeight: 500,
        margin: 12,
      },
    },

    yAxis: {
      type: "value",
      show: false,
    },

    series: [
      {
        type: "bar",

        barWidth: 44,

        itemStyle: {
          borderRadius: [14, 14, 14, 14],
        },

        data: values.map((value, index) => ({
          value,

          itemStyle: {
            color: activeIndex.value === index ? "#16DBCC" : "#EDF1F7",
          },

          label:
            activeIndex.value === index
              ? {
                  show: true,
                  position: "top",

                  formatter: `$${value.toLocaleString()}`,

                  color: "#343C6A",
                  fontSize: 16,
                  fontWeight: 700,
                  distance: 8,
                }
              : {
                  show: false,
                },
        })),
      },
    ],
  };
};

const tabs = [
  {
    label: "所有交易",
    value: "all",
  },
  {
    label: "首日",
    value: "income",
  },
  {
    label: "消费",
    value: "expense",
  },
];

const activePage = ref(1);
const activeTab = ref("all");

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

function formatTransactionDateTime(dateTime) {
  return new Date(dateTime).toLocaleString("zh-CN", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function mapTransactionsToTableRows(items, cards) {
  const cardMap = Object.fromEntries(
    cards.map((card) => [card.id, card.card_number_masked]),
  );

  return items.map((transaction) => ({
    id: transaction.id,
    desc: transaction.description,
    transactionId: `#${transaction.transaction_no}`,
    type:
      TRANSACTION_TYPE_LABELS[transaction.transaction_type] ??
      transaction.transaction_type,
    card: cardMap[transaction.bank_card_id] ?? "****",
    date: formatTransactionDateTime(transaction.transaction_time),
    amount: Number.parseFloat(transaction.amount),
    receiptUrl: transaction.receipt_url,
  }));
}

async function fetchPageData() {
  bankCardsLoading.value = true;
  transactionsLoading.value = true;

  try {
    const [cards, recentTransactions] = await Promise.all([
      listMyBankCards(),
      listMyRecentTransactions({ limit: 20 }),
    ]);

    bankCards.value = cards.slice(0, 3);
    transactions.value = mapTransactionsToTableRows(
      recentTransactions,
      cards,
    );
  } catch {
    bankCards.value = [];
    transactions.value = [];
  } finally {
    bankCardsLoading.value = false;
    transactionsLoading.value = false;
  }
}

const filteredTransactions = computed(() => {
  if (activeTab.value === "income") {
    return transactions.value.filter((item) => item.amount > 0);
  }

  if (activeTab.value === "expense") {
    return transactions.value.filter((item) => item.amount < 0);
  }

  return transactions.value;
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredTransactions.value.length / PAGE_SIZE)),
);

const pages = computed(() =>
  Array.from({ length: totalPages.value }, (_, index) => index + 1),
);

const paginatedTransactions = computed(() => {
  const start = (activePage.value - 1) * PAGE_SIZE;
  return filteredTransactions.value.slice(start, start + PAGE_SIZE);
});

function goToPreviousPage() {
  if (activePage.value > 1) {
    activePage.value -= 1;
  }
}

function goToNextPage() {
  if (activePage.value < totalPages.value) {
    activePage.value += 1;
  }
}

watch(activeTab, () => {
  activePage.value = 1;
});

watch(totalPages, (pageCount) => {
  if (activePage.value > pageCount) {
    activePage.value = pageCount;
  }
});

const renderChart = () => {
  if (!chart) return;
  chart.setOption(getOption(), true);
  chart.resize();
};

onMounted(() => {
  fetchPageData();
  chart = echarts.init(chartRef.value);
  renderChart();

  chart.on("click", (params) => {
    activeIndex.value = params.dataIndex;
    renderChart();
  });

  window.addEventListener("resize", renderChart);
});

onUnmounted(() => {
  window.removeEventListener("resize", renderChart);

  if (chart) {
    chart.dispose();
    chart = null;
  }
});
</script>
