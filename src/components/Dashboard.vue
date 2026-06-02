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
  
              <button
                v-if="allBankCards.length > 0"
                type="button"
                class="xl:block text-[#343C6A] font-semibold cursor-pointer active:scale-90 transition-all duration-100"
                @click="openBankCardsModal"
              >
                查看更多
              </button>
            </div>
  
            <div v-if="bankCardsLoading" class="text-[#718EBF] text-sm">
              加载中...
            </div>

            <p
              v-else-if="dashboardBankCards.length === 0"
              class="text-[#718EBF] text-sm"
            >
              暂无银行卡数据
            </p>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card
                v-for="(card, index) in dashboardBankCards"
                :key="card.id"
                class="cursor-pointer active:scale-98 transition-all duration-100"
                :variant="index === 1 ? 'light' : 'primary'"
                :name="card.card_holder"
                :card-number="formatCardNumber(card.card_number_masked)"
                :expiration-date="formatCardExpiry(card.expiry_date)"
                :balance="card.balance"
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
              <p v-if="transferUsersLoading" class="text-[#718EBF] text-sm">
                加载中...
              </p>

              <p
                v-else-if="allTransferUsers.length === 0"
                class="text-[#718EBF] text-sm mb-4"
              >
                暂无转账记录，请手动填写用户名
              </p>

              <div
                v-else
                class="flex items-center justify-between gap-4"
              >
                <button
                  v-for="user in visibleTransferUsers"
                  :key="user.username"
                  type="button"
                  class="flex flex-col items-center shrink-0 cursor-pointer active:scale-95 transition-all duration-100"
                  @click="selectTransferUser(user)"
                >
                  <img
                    :src="user.avatar"
                    :alt="user.name"
                    class="size-16 rounded-full object-cover mb-3 ring-2 ring-offset-2 transition-all duration-100"
                    :class="
                      selectedTransferUserId === user.username
                        ? 'ring-[#396AFF]'
                        : 'ring-transparent'
                    "
                  />

                  <h3 class="text-[#343C6A] font-semibold text-lg">
                    {{ user.name }}
                  </h3>

                  <p class="text-[#718EBF] text-sm">
                    {{ user.role }}
                  </p>
                </button>

                <button
                  v-if="canShowNextTransferPage"
                  type="button"
                  class="size-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[#718EBF] cursor-pointer active:scale-90 transition-all duration-100 shrink-0"
                  @click="showNextTransferUsers"
                >
                  <i class="fa-solid fa-chevron-right text-xl"></i>
                </button>
              </div>

              <p
                v-if="transferMessage"
                class="mt-4 text-sm"
                :class="transferMessageType === 'success' ? 'text-green-600' : 'text-red-500'"
              >
                {{ transferMessage }}
              </p>

              <div class="space-y-4 mt-8">
                <div class="flex items-center gap-4">
                  <span class="text-[#718EBF] font-medium whitespace-nowrap w-[80px]">
                    付款银行卡
                  </span>

                  <p
                    v-if="bankCardsLoading"
                    class="text-[#718EBF] text-sm"
                  >
                    加载中...
                  </p>

                  <p
                    v-else-if="transferBankCards.length === 0"
                    class="text-[#718EBF] text-sm"
                  >
                    暂无可用银行卡，请先添加银行卡
                  </p>

                  <div v-else class="relative flex-1 min-w-0">
                    <select
                      v-model="selectedBankCardId"
                      class="form-select w-full"
                    >
                      <option
                        v-for="card in transferBankCards"
                        :key="card.id"
                        :value="card.id"
                      >
                        {{ formatBankCardLabel(card) }}
                      </option>
                    </select>
                    <i
                      class="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2
                             text-[#718EBF] text-[14px] pointer-events-none"
                    ></i>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <span class="text-[#718EBF] font-medium whitespace-nowrap w-[80px]">
                    填写用户名
                  </span>

                  <input
                    v-model="transferUsername"
                    type="text"
                    class="flex-1 h-12 rounded-full bg-[#EDF1F7] px-6 text-[#718EBF] outline-none min-w-0"
                    placeholder="请输入收款用户名"
                  />
                </div>

                <div class="flex items-center gap-4">
                  <span class="text-[#718EBF] font-medium whitespace-nowrap w-[80px]">
                    填写金额
                  </span>

                  <div class="flex flex-1 h-12 rounded-full bg-[#EDF1F7] overflow-hidden">
                    <input
                      v-model="transferAmount"
                      type="text"
                      inputmode="decimal"
                      class="flex-1 bg-transparent px-6 text-[#718EBF] outline-none min-w-0"
                      placeholder="525.50"
                    />

                    <button
                      type="button"
                      :disabled="transferSubmitting"
                      class="h-full px-6 rounded-full bg-[#396AFF] text-white font-semibold flex items-center gap-3 cursor-pointer active:scale-90 transition-all duration-100
                             disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                      @click="handleTransfer"
                    >
                      {{ transferSubmitting ? '发送中...' : '发送' }}
                      <i class="fa-solid fa-paper-plane"></i>
                    </button>
                  </div>
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
  
            <div v-if="transactionsLoading" class="text-[#718EBF] text-sm">
              加载中...
            </div>

            <p
              v-else-if="recentTransactions.length === 0"
              class="text-[#718EBF] text-sm"
            >
              暂无交易记录
            </p>

            <TransactionCardList v-else :items="recentTransactions" />
          </section>
  
          <!-- 消费数据统计 -->
          <section>
            <h2 class="text-[#343C6A] font-bold text-[22px] mb-4">
              消费数据统计
            </h2>
  
            <div class="w-full rounded-[25px] bg-white p-4 md:p-6">
              <p
                v-if="!consumptionStatsLoading && consumptionPieData.length === 0"
                class="text-[#718EBF] text-sm text-center py-16"
              >
                暂无消费统计数据
              </p>
              <div
                v-show="consumptionStatsLoading || consumptionPieData.length > 0"
                ref="pieChartRef"
                class="h-[280px] md:h-[300px] w-full"
              ></div>
            </div>
          </section>
        </div>
      </div>

      <Teleport to="body">
        <div
          v-if="showBankCardsModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            class="absolute inset-0 bg-black/40"
            @click="closeBankCardsModal"
          ></div>

          <div
            class="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-white rounded-[25px] p-6 md:p-8 shadow-xl"
          >
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-[#343C6A] font-bold text-[22px]">
                我的银行卡
              </h2>

              <button
                type="button"
                class="size-10 rounded-full flex items-center justify-center text-[#718EBF] hover:text-[#343C6A] hover:bg-[#F5F7FA] cursor-pointer active:scale-95 transition-all duration-100"
                @click="closeBankCardsModal"
              >
                <i class="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <p
              v-if="allBankCards.length === 0"
              class="text-[#718EBF] text-sm text-center py-12"
            >
              暂无银行卡数据
            </p>

            <div
              v-else
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <Card
                v-for="(card, index) in allBankCards"
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
        </div>
      </Teleport>
    </div>
  </template>

<script setup>
import Card from "../tools/card.vue";
import { computed, ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
import TransactionCardList from "../tools/TransactionCardList.vue";
import { listMyBankCards } from "../api/bank-cards";
import {
  listMyRecentTransactions,
  transferToUser,
} from "../api/transactions";
import { listMyConsumptionStats } from "../api/consumption-stats";
import { getApiErrorMessage } from "../utils/api-error";
import { buildInitialsAvatar } from "../utils/avatar";

const PIE_COLORS = ["#16DBCC", "#FF82AC", "#396AFF", "#FFBB38", "#FE5C73", "#718EBF"];
const TRANSFER_PAGE_SIZE = 3;
const CARD_VARIANTS = ["primary", "light", "blue"];

const TRANSACTION_TYPE_STYLES = {
  SHOPPING: {
    icon: "fa-solid fa-bag-shopping",
    backgroundColor: "bg-[#FFF5D9]",
    textColor: "text-[#FFBB38]",
  },
  TRANSFER_IN: {
    icon: "fa-solid fa-arrow-down",
    backgroundColor: "bg-[#DCFAF8]",
    textColor: "text-[#16DBCC]",
  },
  TRANSFER_OUT: {
    icon: "fa-solid fa-arrow-up",
    backgroundColor: "bg-[#FFF5D9]",
    textColor: "text-[#FFBB38]",
  },
  SERVICE: {
    icon: "fa-solid fa-bell",
    backgroundColor: "bg-[#E7EDFF]",
    textColor: "text-[#396AFF]",
  },
  WITHDRAWAL: {
    icon: "fa-solid fa-money-bill-transfer",
    backgroundColor: "bg-[#FFF5D9]",
    textColor: "text-[#FFBB38]",
  },
  DEPOSIT: {
    icon: "fa-solid fa-coins",
    backgroundColor: "bg-[#DCFAF8]",
    textColor: "text-[#16DBCC]",
  },
};

const dashboardBankCards = ref([]);
const allBankCards = ref([]);
const showBankCardsModal = ref(false);
const bankCardsLoading = ref(true);
const recentTransactions = ref([]);
const transactionsLoading = ref(true);
const allTransferUsers = ref([]);
const transferUserPage = ref(0);
const transferUsersLoading = ref(true);
const consumptionPieData = ref([]);
const consumptionStatsLoading = ref(true);
const transferUsername = ref("");
const transferAmount = ref("");
const selectedBankCardId = ref(null);
const selectedTransferUserId = ref(null);
const transferSubmitting = ref(false);
const transferMessage = ref("");
const transferMessageType = ref("success");

const visibleTransferUsers = computed(() => {
  const start = transferUserPage.value * TRANSFER_PAGE_SIZE;
  return allTransferUsers.value.slice(start, start + TRANSFER_PAGE_SIZE);
});

const canShowNextTransferPage = computed(
  () => allTransferUsers.value.length > TRANSFER_PAGE_SIZE,
);

const transferBankCards = computed(() =>
  allBankCards.value.filter((card) => card.status === "ACTIVE"),
);

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

function formatBankCardLabel(card) {
  const digits = card.card_number_masked.replace(/\D/g, "");
  const last4 = digits.slice(-4) || "****";
  const balance = Number.parseFloat(card.balance);
  const balanceLabel = Number.isNaN(balance)
    ? card.balance
    : balance.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });

  return `${card.bank_name} · **** ${last4} · $${balanceLabel}`;
}

function setDefaultBankCard() {
  if (transferBankCards.value.length === 0) {
    selectedBankCardId.value = null;
    return;
  }

  const hasSelected = transferBankCards.value.some(
    (card) => card.id === selectedBankCardId.value,
  );

  if (hasSelected) {
    return;
  }

  const defaultDebitCard = transferBankCards.value.find(
    (card) => card.card_type === "DEBIT",
  );

  selectedBankCardId.value =
    defaultDebitCard?.id ?? transferBankCards.value[0].id;
}

function openBankCardsModal() {
  showBankCardsModal.value = true;
}

function closeBankCardsModal() {
  showBankCardsModal.value = false;
}

async function fetchDashboardBankCards() {
  bankCardsLoading.value = true;
  try {
    const cards = await listMyBankCards();
    allBankCards.value = cards;
    dashboardBankCards.value = cards.slice(0, 2);
    setDefaultBankCard();
  } catch {
    allBankCards.value = [];
    dashboardBankCards.value = [];
    selectedBankCardId.value = null;
  } finally {
    bankCardsLoading.value = false;
  }
}

function formatTransactionDate(dateTime) {
  return new Date(dateTime).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function mapTransactionToListItem(transaction) {
  const style =
    TRANSACTION_TYPE_STYLES[transaction.transaction_type] ??
    TRANSACTION_TYPE_STYLES.SERVICE;

  return {
    id: transaction.id,
    title: transaction.description,
    date: formatTransactionDate(transaction.transaction_time),
    amount: Number.parseFloat(transaction.amount),
    icon: style.icon,
    backgroundColor: style.backgroundColor,
    textColor: style.textColor,
  };
}

function parseTransferRecipient(description) {
  const trimmed = description.trim();
  const patterns = [
    /^Transfer to @?(\S+)/i,
    /^转账给\s@?(\S+)/,
    /^向\s@?(\S+)\s转账/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) {
      return {
        username: match[1],
        name: match[1],
      };
    }
  }

  return {
    username: trimmed,
    name: trimmed,
  };
}

function buildTransferUsers(transactions) {
  const seen = new Map();

  for (const transaction of transactions) {
    if (transaction.transaction_type !== "TRANSFER_OUT") {
      continue;
    }

    if (transaction.status === "FAILED" || transaction.status === "CANCELLED") {
      continue;
    }

    const recipient = parseTransferRecipient(transaction.description);
    const key = recipient.username.toLowerCase();

    if (!key || seen.has(key)) {
      continue;
    }

    seen.set(key, {
      username: recipient.username,
      name: recipient.name,
      role: "转账对象",
      avatar: buildInitialsAvatar(recipient.name),
      lastTransferTime: transaction.transaction_time,
    });
  }

  return Array.from(seen.values()).sort(
    (a, b) =>
      new Date(b.lastTransferTime).getTime() -
      new Date(a.lastTransferTime).getTime(),
  );
}

function showNextTransferUsers() {
  const totalPages = Math.ceil(allTransferUsers.value.length / TRANSFER_PAGE_SIZE);
  transferUserPage.value = (transferUserPage.value + 1) % totalPages;
  selectedTransferUserId.value = null;
}

function selectTransferUser(user) {
  selectedTransferUserId.value = user.username;
  transferUsername.value = user.username;
  transferMessage.value = "";
}

async function fetchRecentTransactions() {
  transactionsLoading.value = true;
  transferUsersLoading.value = true;

  try {
    const transactions = await listMyRecentTransactions({ limit: 100 });
    recentTransactions.value = transactions
      .slice(0, 3)
      .map(mapTransactionToListItem);
    allTransferUsers.value = buildTransferUsers(transactions);
    transferUserPage.value = 0;
  } catch {
    recentTransactions.value = [];
    allTransferUsers.value = [];
    transferUserPage.value = 0;
  } finally {
    transactionsLoading.value = false;
    transferUsersLoading.value = false;
  }
}

async function handleTransfer() {
  if (transferSubmitting.value) {
    return;
  }

  const username = transferUsername.value.trim();
  const amount = transferAmount.value.trim();

  if (!username) {
    transferMessageType.value = "error";
    transferMessage.value = "请填写收款用户名";
    return;
  }

  if (!amount || Number.parseFloat(amount) <= 0) {
    transferMessageType.value = "error";
    transferMessage.value = "请填写有效转账金额";
    return;
  }

  if (!selectedBankCardId.value) {
    transferMessageType.value = "error";
    transferMessage.value = "请选择付款银行卡";
    return;
  }

  transferSubmitting.value = true;
  transferMessage.value = "";

  try {
    await transferToUser({
      to_username: username,
      amount,
      bank_card_id: selectedBankCardId.value,
    });

    transferMessageType.value = "success";
    transferMessage.value = `已向 ${username} 转账成功`;
    transferAmount.value = "";
    await Promise.all([fetchRecentTransactions(), fetchDashboardBankCards()]);
  } catch (error) {
    transferMessageType.value = "error";
    transferMessage.value = getApiErrorMessage(error, "转账失败，请稍后重试");
  } finally {
    transferSubmitting.value = false;
  }
}

function mapConsumptionStatsToPieData(stats) {
  return stats
    .filter((stat) => stat.category)
    .map((stat, index) => ({
      value: Number.parseFloat(stat.amount),
      name: stat.category,
      selected: true,
      selectedOffset: 12,
      itemStyle: {
        color: PIE_COLORS[index % PIE_COLORS.length],
      },
    }));
}

async function fetchConsumptionStats() {
  consumptionStatsLoading.value = true;
  try {
    const stats = await listMyConsumptionStats({ stat_type: "CATEGORY" });
    consumptionPieData.value = mapConsumptionStatsToPieData(stats);
  } catch {
    consumptionPieData.value = [];
  } finally {
    consumptionStatsLoading.value = false;
    if (pieChart) {
      pieChart.setOption(getPieOption(), true);
      pieChart.resize();
    }
  }
}

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

        data: consumptionPieData.value,
      }
    ]
  }
}

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
  fetchDashboardBankCards();
  fetchRecentTransactions();
  chart = echarts.init(chartRef.value);
  pieChart = echarts.init(pieChartRef.value);

  renderChart();
  fetchConsumptionStats();

  window.addEventListener("resize", renderChart);
});

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

<style scoped>
.form-select {
  height: 48px;
  border-radius: 9999px;
  border: none;
  padding: 0 48px 0 24px;
  outline: none;
  color: #718ebf;
  font-size: 15px;
  font-weight: 500;
  background: #edf1f7;
  appearance: none;
}

.form-select:focus {
  box-shadow: 0 0 0 2px #2d60ff;
}
</style>
