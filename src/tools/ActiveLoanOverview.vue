<template>
  <div class="w-full bg-white rounded-[25px] p-4 md:p-6">
    <p
      v-if="loans.length === 0"
      class="text-[#718EBF] text-sm text-center py-12"
    >
      暂无贷款数据
    </p>

    <template v-else>
      <!-- desktop table -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full min-w-[900px]">
          <thead>
            <tr class="border-b border-[#E7ECF2]">
              <th
                v-for="column in columns"
                :key="column.key"
                class="pb-3 text-left text-[#718EBF] text-[15px] font-semibold"
              >
                {{ column.label }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in loans"
              :key="item.id"
              class="border-b border-[#F0F2F5]"
            >
              <td class="py-4 text-[#718EBF] text-[15px]">
                {{ formatNo(item.id) }}
              </td>

              <td class="py-4 text-[#718EBF] text-[15px] font-semibold">
                {{ item.loanAmount }}
              </td>

              <td class="py-4 text-[#718EBF] text-[15px] font-semibold">
                {{ item.leftAmount }}
              </td>

              <td class="py-4 text-[#718EBF] text-[15px] font-semibold">
                {{ item.duration }}
              </td>

              <td class="py-4 text-[#718EBF] text-[15px] font-semibold">
                {{ item.interestRate }}
              </td>

              <td class="py-4 text-[#718EBF] text-[15px] font-semibold">
                {{ item.installment }}
              </td>

              <td class="py-4">
                <button
                  class="w-[90px] h-[32px] rounded-full border border-[#718EBF]
                         text-[#343C6A] text-[14px] font-semibold
                         cursor-pointer
                         active:border-[#2D60FF] active:text-[#2D60FF]
                         active:scale-95 transition-all duration-100"
                >
                  还款
                </button>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td class="pt-4 text-[#FE5C73] text-[15px] font-bold">
                共计
              </td>

              <td class="pt-4 text-[#FE5C73] text-[15px] font-bold">
                {{ totalLoanAmount }}
              </td>

              <td class="pt-4 text-[#FE5C73] text-[15px] font-bold">
                {{ totalLeftAmount }}
              </td>

              <td></td>
              <td></td>

              <td class="pt-4 text-[#FE5C73] text-[15px] font-bold">
                {{ totalInstallment }}
              </td>

              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- mobile cards -->
      <div class="md:hidden space-y-4">
        <div
          v-for="item in loans"
          :key="item.id"
          class="rounded-[20px] border border-[#E7ECF2] p-4"
        >
          <div class="flex items-center justify-between mb-4">
            <span class="text-[#343C6A] text-[17px] font-bold">
              {{ formatNo(item.id) }}
            </span>

            <button
              class="w-[78px] h-[30px] rounded-full border border-[#718EBF]
                     text-[#343C6A] text-[14px] font-semibold
                     active:border-[#2D60FF] active:text-[#2D60FF]
                     active:scale-95 transition-all duration-100"
            >
              还款
            </button>
          </div>

          <div class="grid grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <p class="text-[#718EBF] text-[13px]">贷款金额</p>
              <p class="text-[#343C6A] text-[15px] font-semibold">
                {{ item.loanAmount }}
              </p>
            </div>

            <div>
              <p class="text-[#718EBF] text-[13px]">待还金额</p>
              <p class="text-[#343C6A] text-[15px] font-semibold">
                {{ item.leftAmount }}
              </p>
            </div>

            <div>
              <p class="text-[#718EBF] text-[13px]">贷款时长</p>
              <p class="text-[#343C6A] text-[15px] font-semibold">
                {{ item.duration }}
              </p>
            </div>

            <div>
              <p class="text-[#718EBF] text-[13px]">利率</p>
              <p class="text-[#343C6A] text-[15px] font-semibold">
                {{ item.interestRate }}
              </p>
            </div>

            <div class="col-span-2">
              <p class="text-[#718EBF] text-[13px]">分期付款</p>
              <p class="text-[#343C6A] text-[15px] font-semibold">
                {{ item.installment }}
              </p>
            </div>
          </div>
        </div>

        <div class="rounded-[20px] bg-[#FFF5F7] p-4">
          <div class="grid grid-cols-2 gap-y-2 text-[#FE5C73] text-[15px] font-bold">
            <span>共计</span>
            <span>{{ totalLoanAmount }}</span>
            <span>待还金额</span>
            <span>{{ totalLeftAmount }}</span>
            <span>分期付款</span>
            <span>{{ totalInstallment }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  loans: {
    type: Array,
    default: () => [],
  },
});

const columns = [
  { key: "id", label: "SL No" },
  { key: "loanAmount", label: "贷款金额" },
  { key: "leftAmount", label: "待还金额" },
  { key: "duration", label: "贷款时长" },
  { key: "interestRate", label: "利率" },
  { key: "installment", label: "分期付款" },
  { key: "repay", label: "还款" },
];

function formatNo(num) {
  return `${String(num).padStart(2, "0")}.`;
}

function formatCurrency(value) {
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

function sumField(field) {
  return props.loans.reduce((total, loan) => total + loan[field], 0);
}

const totalLoanAmount = computed(() =>
  formatCurrency(sumField("loanAmountRaw")),
);

const totalLeftAmount = computed(() =>
  formatCurrency(sumField("remainingAmountRaw")),
);

const totalInstallment = computed(() =>
  `${formatCurrency(sumField("monthlyPaymentRaw"))} / month`,
);
</script>
