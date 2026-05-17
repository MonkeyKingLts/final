<template>
    <div class="w-full bg-white rounded-[25px] p-4 md:p-6">
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
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  
  const props = defineProps({
    loans: {
      type: Array,
      default: () => [
        {
          id: 1,
          loanAmount: "$100,000",
          leftAmount: "$40,500",
          duration: "8 Months",
          interestRate: "12%",
          installment: "$2,000 / 月",
        },
        {
          id: 2,
          loanAmount: "$500,000",
          leftAmount: "$250,000",
          duration: "36 Months",
          interestRate: "10%",
          installment: "$8,000 / 月",
        },
        {
          id: 3,
          loanAmount: "$900,000",
          leftAmount: "$40,500",
          duration: "12 Months",
          interestRate: "12%",
          installment: "$5,000 / 月",
        },
        {
          id: 4,
          loanAmount: "$50,000",
          leftAmount: "$40,500",
          duration: "25 Months",
          interestRate: "5%",
          installment: "$2,000 / 月",
        },
        {
          id: 5,
          loanAmount: "$50,000",
          leftAmount: "$40,500",
          duration: "5 Months",
          interestRate: "16%",
          installment: "$10,000 / 月",
        },
        {
          id: 6,
          loanAmount: "$80,000",
          leftAmount: "$25,500",
          duration: "14 Months",
          interestRate: "8%",
          installment: "$2,000 / 月",
        },
        {
          id: 7,
          loanAmount: "$12,000",
          leftAmount: "$5,500",
          duration: "9 Months",
          interestRate: "13%",
          installment: "$500 / 月",
        },
        {
          id: 8,
          loanAmount: "$160,000",
          leftAmount: "$100,800",
          duration: "3 Months",
          interestRate: "12%",
          installment: "$900 / 月",
        },
      ],
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
  
  const formatNo = (num) => `${String(num).padStart(2, "0")}.`;
  
  const totalLoanAmount = computed(() => "$125,0000");
  const totalLeftAmount = computed(() => "$750,000");
  const totalInstallment = computed(() => "$50,000 / month");
  </script>