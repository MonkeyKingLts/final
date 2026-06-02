<template>
  <div class="bg-[#F5F7FA] w-full min-h-dvh p-3 xl:p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-3">
      <SummaryCard
        v-for="item in loanCards"
        :key="item.id"
        v-bind="item"
        class="cursor-pointer active:scale-98 transition-all duration-100"
      />
    </div>

    <div>
      <h2 class="text-[#343C6A] font-bold text-[22px] mb-2 pl-4">活跃贷款概述</h2>
      <p v-if="pageLoading" class="text-[#718EBF] text-sm pl-4">加载中...</p>
      <ActiveLoanOverview v-else :loans="tableLoans" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import SummaryCard from "../tools/SummaryCard.vue";
import ActiveLoanOverview from "../tools/ActiveLoanOverview.vue";
import { listMyLoans } from "../api/loans";

const LOAN_CARD_CONFIG = [
  {
    id: 1,
    type: "PERSONAL",
    icon: "fa-solid fa-user",
    iconBg: "bg-[#E7EDFF]",
    iconColor: "text-[#396AFF]",
    title: "个人贷款",
  },
  {
    id: 2,
    type: "COMPANY",
    icon: "fa-solid fa-briefcase",
    iconBg: "bg-[#FFF5D9]",
    iconColor: "text-[#FFBB38]",
    title: "公司贷款",
  },
  {
    id: 3,
    type: "COMMERCIAL",
    icon: "fa-solid fa-chart-simple",
    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",
    title: "商业贷款",
  },
  {
    id: 4,
    icon: "fa-solid fa-screwdriver-wrench",
    iconBg: "bg-[#DCFAF8]",
    iconColor: "text-[#16DBCC]",
    title: "常用贷款",
    value: "选择",
  },
];

const pageLoading = ref(true);
const loans = ref([]);

function parseAmount(value) {
  const amount = Number.parseFloat(String(value));
  return Number.isNaN(amount) ? 0 : amount;
}

function formatCurrency(value) {
  const amount = parseAmount(value);
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

function formatInterestRate(value) {
  const rate = parseAmount(value);
  return `${Number.isInteger(rate) ? rate : rate.toFixed(2)}%`;
}

function sumLoanAmountByType(type) {
  return loans.value
    .filter((loan) => loan.loan_type === type)
    .reduce((total, loan) => total + parseAmount(loan.loan_amount), 0);
}

function mapLoanToTableRow(loan, index) {
  return {
    id: index + 1,
    loanAmount: formatCurrency(loan.loan_amount),
    leftAmount: formatCurrency(loan.remaining_amount),
    duration: `${loan.loan_term_months} Months`,
    interestRate: formatInterestRate(loan.interest_rate),
    installment: `${formatCurrency(loan.monthly_payment)} / 月`,
    loanAmountRaw: parseAmount(loan.loan_amount),
    remainingAmountRaw: parseAmount(loan.remaining_amount),
    monthlyPaymentRaw: parseAmount(loan.monthly_payment),
  };
}

const loanCards = computed(() =>
  LOAN_CARD_CONFIG.map((card) => {
    if (!card.type) {
      return card;
    }

    return {
      ...card,
      value: formatCurrency(sumLoanAmountByType(card.type)),
    };
  }),
);

const tableLoans = computed(() =>
  loans.value.map((loan, index) => mapLoanToTableRow(loan, index)),
);

async function fetchLoans() {
  pageLoading.value = true;

  try {
    loans.value = await listMyLoans();
  } catch {
    loans.value = [];
  } finally {
    pageLoading.value = false;
  }
}

onMounted(() => {
  fetchLoans();
});
</script>
