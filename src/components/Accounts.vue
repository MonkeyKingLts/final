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

    <div class="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
      <section class="order-1 xl:col-start-1 xl:row-start-1">
        <h2 class="text-[#343C6A] font-bold text-[22px] mb-3">最近交易</h2>
        <div>
          <p v-if="transactionsLoading" class="text-[#718EBF] text-sm">加载中...</p>
          <p
            v-else-if="transactions.length === 0"
            class="text-[#718EBF] text-sm"
          >
            暂无交易记录
          </p>

          <!-- desktop / tablet -->
          <div v-else class="hidden md:block bg-white rounded-[25px] p-6">
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
                {{ formatTransactionAmount(item.amount) }}
              </div>
            </div>
          </div>

          <!-- mobile -->
          <div v-if="!transactionsLoading && transactions.length > 0" class="md:hidden space-y-4">
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
                  {{ formatTransactionAmount(item.amount) }}
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
      </section>

      <section class="order-3 xl:col-start-2 xl:row-start-1">
        <h2 class="text-[#343C6A] font-bold text-[22px] mb-3">我的银行卡</h2>

        <p v-if="bankCardLoading" class="text-[#718EBF] text-sm">加载中...</p>
        <p v-else-if="!primaryBankCard" class="text-[#718EBF] text-sm">
          暂无银行卡数据
        </p>

        <Card
          v-else
          class="cursor-pointer active:scale-95 transition-all duration-100"
          variant="blue"
          :name="primaryBankCard.card_holder"
          :card-number="formatCardNumber(primaryBankCard.card_number_masked)"
          :expiration-date="formatCardExpiry(primaryBankCard.expiry_date)"
          :balance="primaryBankCard.balance"
        />
      </section>

      <section class="order-2 xl:col-start-1 xl:row-start-2">
        <h2 class="text-[#343C6A] font-bold text-[22px] mb-3">
          Debit & Credit Overview
        </h2>
        <div class="w-full h-[320px] bg-white rounded-[25px] p-4">
          <div ref="chartRef" class="w-full h-full"></div>
        </div>
      </section>

      <section class="order-4 xl:col-start-2 xl:row-start-2">
        <h2 class="text-[#343C6A] font-bold text-[22px] mb-3">已发送发票</h2>
        <p v-if="invoicesLoading" class="text-[#718EBF] text-sm">加载中...</p>
        <p v-else-if="invoiceList.length === 0" class="text-[#718EBF] text-sm">
          暂无发票数据
        </p>
        <TransactionCardList v-else :items="invoiceList" />
      </section>
    </div>
  </div>
</template>

<script setup>
import SummaryCard from "../tools/SummaryCard.vue";
import * as echarts from "echarts";
import { ref, onMounted, onUnmounted } from "vue";
import Card from "../tools/card.vue";
import TransactionCardList from "../tools/TransactionCardList.vue";
import { getMyAccountOverview } from "../api/accounts";
import { listMyBankCards } from "../api/bank-cards";
import { listMyRecentTransactions } from "../api/transactions";
import { listMyInvoices } from "../api/invoices";
import { listMyLoans } from "../api/loans";

const SUMMARY_CARD_META = [
  {
    id: 1,
    title: "我的余额",
    field: "total_balance",
    icon: "fa-solid fa-sack-dollar",
    iconBg: "bg-[#FFF5D9]",
    iconColor: "text-[#FFBB38]",
  },
  {
    id: 2,
    title: "收入",
    field: "total_income",
    icon: "fa-solid fa-hand-holding-dollar",
    iconBg: "bg-[#E7EDFF]",
    iconColor: "text-[#396AFF]",
  },
  {
    id: 3,
    title: "花费",
    field: "total_expense",
    icon: "fa-solid fa-file-invoice-dollar",
    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",
  },
  {
    id: 4,
    title: "Total Saving",
    field: "total_saving",
    icon: "fa-solid fa-piggy-bank",
    iconBg: "bg-[#DCFAF8]",
    iconColor: "text-[#16DBCC]",
  },
];

const TRANSACTION_TYPE_LABELS = {
  SHOPPING: "购物",
  TRANSFER_IN: "转账",
  TRANSFER_OUT: "转出",
  SERVICE: "服务",
  WITHDRAWAL: "取款",
  DEPOSIT: "存款",
};

const TRANSACTION_STATUS_LABELS = {
  PENDING: "进行中",
  COMPLETED: "已完成",
  FAILED: "失败",
  CANCELLED: "已取消",
};

const TRANSACTION_TYPE_STYLES = {
  SHOPPING: {
    icon: "fa-solid fa-bag-shopping",
    iconBg: "bg-[#DCFAF8]",
    iconColor: "text-[#16DBCC]",
  },
  TRANSFER_IN: {
    icon: "fa-solid fa-user",
    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",
  },
  TRANSFER_OUT: {
    icon: "fa-solid fa-arrow-up",
    iconBg: "bg-[#FFF5D9]",
    iconColor: "text-[#FFBB38]",
  },
  SERVICE: {
    icon: "fa-solid fa-screwdriver-wrench",
    iconBg: "bg-[#E7EDFF]",
    iconColor: "text-[#396AFF]",
  },
  WITHDRAWAL: {
    icon: "fa-solid fa-money-bill-transfer",
    iconBg: "bg-[#FFF5D9]",
    iconColor: "text-[#FFBB38]",
  },
  DEPOSIT: {
    icon: "fa-solid fa-arrows-rotate",
    iconBg: "bg-[#DCFAF8]",
    iconColor: "text-[#16DBCC]",
  },
};

const LOAN_TYPE_LABELS = {
  PERSONAL: "个人贷款",
  COMPANY: "企业贷款",
  COMMERCIAL: "商业贷款",
};

const INVOICE_ICON_STYLES = [
  { icon: "fa-brands fa-apple", backgroundColor: "bg-[#DCFAF8]", textColor: "text-[#16DBCC]" },
  { icon: "fa-solid fa-user", backgroundColor: "bg-[#FFF5D9]", textColor: "text-[#FFBB38]" },
  { icon: "fa-brands fa-playstation", backgroundColor: "bg-[#E7EDFF]", textColor: "text-[#396AFF]" },
  { icon: "fa-solid fa-user", backgroundColor: "bg-[#FFE0EB]", textColor: "text-[#FF82AC]" },
];

const chartRef = ref(null);
let myChart = null;

const summaryCards = ref([]);
const accountOverview = ref(null);
const primaryBankCard = ref(null);
const bankCardLoading = ref(true);
const transactions = ref([]);
const transactionsLoading = ref(true);
const invoiceList = ref([]);
const invoicesLoading = ref(true);
const loans = ref([]);

const getOption = () => {
  const isMobile = window.innerWidth < 576;
  const loanLabels = loans.value.map(
    (loan) => LOAN_TYPE_LABELS[loan.loan_type] ?? loan.loan_type,
  );
  const loanAmounts = loans.value.map((loan) =>
    Number.parseFloat(loan.loan_amount),
  );
  const remainingAmounts = loans.value.map((loan) =>
    Number.parseFloat(loan.remaining_amount),
  );
  const weeklyDebit = accountOverview.value
    ? formatCurrency(accountOverview.value.weekly_debit)
    : "$0";
  const weeklyCredit = accountOverview.value
    ? formatCurrency(accountOverview.value.weekly_credit)
    : "$0";

  return {
    tooltip: {
      trigger: "axis",
      confine: true,
      axisPointer: {
        type: "shadow",
        shadowStyle: {
          color: "rgba(57, 106, 255, 0.06)",
        },
      },
      backgroundColor: "#ffffff",
      borderColor: "#E6EFF5",
      borderWidth: 1,
      padding: isMobile ? 10 : 12,
      shadowBlur: 0,
      extraCssText:
        "box-shadow: 0 2px 8px rgba(52, 60, 106, 0.1); border-radius: 12px;",
      textStyle: {
        color: "#343C6A",
        fontSize: isMobile ? 12 : 14,
      },
      position(point, _params, _dom, _rect, size) {
        const x = point[0] - size.contentSize[0] / 2;
        const y = point[1] - size.contentSize[1] - 12;
        return [x, y];
      },
      formatter(params) {
        const items = Array.isArray(params) ? params : [params];
        const category = items[0]?.axisValue ?? "";
        let html = `<div style="font-weight:700;margin-bottom:6px">${category}</div>`;
        html += `<div style="color:#8BA3CB;font-size:12px;margin-bottom:8px">本周借记 ${weeklyDebit} · 贷记 ${weeklyCredit}</div>`;

        for (const item of items) {
          html += `<div style="margin-top:4px">${item.marker}${item.seriesName}: <b>${formatCurrency(item.value)}</b></div>`;
        }

        return html;
      },
    },

    grid: {
      top: isMobile ? 70 : 60,
      left: isMobile ? 10 : 35,
      right: isMobile ? 10 : 30,
      bottom: 20,
      containLabel: true,
    },

    title: {
      text: "本周借记与贷记概览",
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

      data: ["贷款金额", "待还金额"],
    },

    xAxis: {
      type: "category",

      data: loanLabels.length > 0 ? loanLabels : ["暂无贷款"],

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
        name: "贷款金额",

        type: "bar",

        data: loanAmounts.length > 0 ? loanAmounts : [0],

        barWidth: isMobile ? 14 : 34,

        barGap: isMobile ? "15%" : "35%",

        itemStyle: {
          color: "#396AFF",
          borderRadius: [12, 12, 12, 12],
        },

        label: {
          show: false,
        },
      },

      {
        name: "待还金额",

        type: "bar",

        data: remainingAmounts.length > 0 ? remainingAmounts : [0],

        barWidth: isMobile ? 14 : 34,

        itemStyle: {
          color: "#FFA800",

          borderRadius: [12, 12, 12, 12],
        },

        label: {
          show: false,
        },
      },
    ],
  };
};

function formatTransactionAmount(amount) {
  const value = Number.parseFloat(String(amount));
  const prefix = value < 0 ? "-" : "+";
  return `${prefix}$${Math.abs(value).toLocaleString("en-US")}`;
}

function formatCurrency(value) {
  const amount = Number.parseFloat(String(value));
  if (Number.isNaN(amount)) {
    return "$0";
  }

  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

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

function formatTransactionDate(dateTime) {
  return new Date(dateTime).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatRelativeTime(dateTime) {
  const diffMs = Date.now() - new Date(dateTime).getTime();
  const hours = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60)));

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

function buildSummaryCards(account) {
  return SUMMARY_CARD_META.map((item) => ({
    id: item.id,
    title: item.title,
    value: formatCurrency(account[item.field]),
    icon: item.icon,
    iconBg: item.iconBg,
    iconColor: item.iconColor,
  }));
}

function mapTransactionsToListItems(items, cards) {
  const cardMap = Object.fromEntries(
    cards.map((card) => [card.id, card.card_number_masked]),
  );

  return items.map((transaction) => {
    const style =
      TRANSACTION_TYPE_STYLES[transaction.transaction_type] ??
      TRANSACTION_TYPE_STYLES.SERVICE;

    return {
      id: transaction.id,
      title: transaction.description,
      date: formatTransactionDate(transaction.transaction_time),
      type:
        TRANSACTION_TYPE_LABELS[transaction.transaction_type] ??
        transaction.transaction_type,
      card: cardMap[transaction.bank_card_id] ?? "****",
      status:
        TRANSACTION_STATUS_LABELS[transaction.status] ?? transaction.status,
      amount: Number.parseFloat(transaction.amount),
      icon: style.icon,
      iconBg: style.iconBg,
      iconColor: style.iconColor,
    };
  });
}

function mapInvoicesToListItems(items) {
  return items.map((invoice, index) => {
    const style = INVOICE_ICON_STYLES[index % INVOICE_ICON_STYLES.length];

    return {
      id: invoice.id,
      title: invoice.counterparty,
      date: formatRelativeTime(invoice.issued_at),
      amount: Number.parseFloat(invoice.amount),
      icon: style.icon,
      backgroundColor: style.backgroundColor,
      textColor: style.textColor,
    };
  });
}

async function fetchPageData() {
  bankCardLoading.value = true;
  transactionsLoading.value = true;
  invoicesLoading.value = true;

  try {
    const [
      account,
      cards,
      recentTransactions,
      invoices,
      loanList,
    ] = await Promise.all([
      getMyAccountOverview(),
      listMyBankCards(),
      listMyRecentTransactions({ limit: 3 }),
      listMyInvoices(),
      listMyLoans(),
    ]);

    accountOverview.value = account;
    summaryCards.value = buildSummaryCards(account);
    primaryBankCard.value = cards[0] ?? null;
    transactions.value = mapTransactionsToListItems(
      recentTransactions,
      cards,
    );
    invoiceList.value = mapInvoicesToListItems(invoices);
    loans.value = loanList;
  } catch {
    accountOverview.value = null;
    summaryCards.value = [];
    primaryBankCard.value = null;
    transactions.value = [];
    invoiceList.value = [];
    loans.value = [];
  } finally {
    bankCardLoading.value = false;
    transactionsLoading.value = false;
    invoicesLoading.value = false;

    if (myChart) {
      renderChart();
    }
  }
}

const renderChart = () => {
  if (!myChart) return;
  myChart.setOption(getOption(), true);
  myChart.resize();
};

onMounted(() => {
  myChart = echarts.init(chartRef.value);
  renderChart();
  fetchPageData();

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
