<template>
  <form class="w-full bg-white rounded-[25px] p-5 md:p-8 min-h-[520px]">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      <div>
        <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
          通货
        </label>
        <input v-model="form.currency" type="text" class="form-input" />
      </div>

      <div>
        <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
          时区
        </label>
        <input v-model="form.timezone" type="text" class="form-input" />
      </div>
    </div>

    <div class="mt-8">
      <h3 class="text-[#343C6A] text-[16px] font-semibold mb-5">通知</h3>

      <div class="space-y-5">
        <label
          v-for="item in notifications"
          :key="item.key"
          class="flex items-center gap-5 cursor-pointer"
        >
          <span class="relative w-[60px] h-[34px] shrink-0">
            <input
              v-model="form[item.key]"
              type="checkbox"
              class="sr-only peer"
            />

            <span
              class="absolute inset-0 rounded-full bg-[#DFEAF2] transition-all duration-200 peer-checked:bg-[#16DBCC]"
            ></span>

            <span
              class="absolute top-1 left-1 size-[26px] rounded-full bg-white transition-all duration-200 peer-checked:translate-x-[26px]"
            ></span>
          </span>

          <span class="text-[#718EBF] text-[15px] md:text-[16px] font-semibold">
            {{ item.label }}
          </span>
        </label>
      </div>
    </div>

    <div class="mt-10 md:mt-20 flex justify-end">
      <button
        type="submit"
        class="w-full md:w-[190px] h-[52px] rounded-[12px] bg-[#2D60FF] text-white text-[17px] font-semibold active:scale-95 transition-all duration-100"
      >
        保存
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  currency: "USD",
  timezone: "(GMT-12:00) International Date Line West",
  cryptoTransfer: true,
  merchantOrder: false,
  accountRecommendation: true,
});

const notifications = [
  {
    key: "cryptoTransfer",
    label: "我发送或接收数字货币",
  },
  {
    key: "merchantOrder",
    label: "我收到商户订单",
  },
  {
    key: "accountRecommendation",
    label: "我的账户有推荐",
  },
];
</script>

<style scoped>
.form-input {
  width: 100%;
  height: 52px;
  border-radius: 15px;
  border: 1px solid #dfeaf2;
  padding: 0 20px;
  outline: none;
  color: #718ebf;
  font-size: 15px;
  font-weight: 500;
  background: #ffffff;
}

.form-input:focus {
  border-color: #2d60ff;
}
</style>
