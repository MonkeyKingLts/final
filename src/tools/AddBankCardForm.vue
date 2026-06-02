<template>
  <div class="w-full bg-white rounded-[25px] p-6 md:p-8">
    <p class="text-[#718EBF] text-[16px] md:text-[18px] leading-9 mb-12">
      信用卡通常是指指定给持卡人的计划商业银行发行的具有信用额度的塑料卡，
      可用于赊购商品和服务或获得现金预付款。
    </p>

    <form
      class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7"
      @submit.prevent="handleSubmit"
    >
      <p
        v-if="successMessage"
        class="md:col-span-2 text-sm text-green-600"
      >
        {{ successMessage }}
      </p>
      <p
        v-if="errorMessage"
        class="md:col-span-2 text-sm text-red-500"
      >
        {{ errorMessage }}
      </p>

      <div>
        <label class="block text-[#343C6A] text-[18px] font-semibold mb-3">
          银行名称
        </label>
        <input
          v-model="form.bankName"
          type="text"
          required
          maxlength="50"
          class="w-full h-[56px] rounded-[15px] border border-[#DFEAF2] px-5
                 text-[#718EBF] text-[16px] outline-none
                 placeholder:text-[#718EBF]"
          placeholder="SoftBank"
        />
      </div>

      <div>
        <label class="block text-[#343C6A] text-[18px] font-semibold mb-3">
          卡片类型
        </label>
        <div class="relative">
          <select
            v-model="form.cardType"
            required
            class="w-full h-[56px] rounded-[15px] border border-[#DFEAF2] px-5 pr-12
                   text-[#718EBF] text-[16px] outline-none appearance-none bg-white"
          >
            <option
              v-for="option in CARD_TYPE_OPTIONS"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
          <i
            class="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2
                   text-[#718EBF] pointer-events-none"
          ></i>
        </div>
      </div>

      <div>
        <label class="block text-[#343C6A] text-[18px] font-semibold mb-3">
          持卡人
        </label>
        <input
          v-model="form.cardHolder"
          type="text"
          required
          maxlength="100"
          class="w-full h-[56px] rounded-[15px] border border-[#DFEAF2] px-5
                 text-[#718EBF] text-[16px] outline-none
                 placeholder:text-[#718EBF]"
          placeholder="My Cards"
        />
      </div>

      <div>
        <label class="block text-[#343C6A] text-[18px] font-semibold mb-3">
          卡号
        </label>
        <input
          v-model="form.cardNumber"
          type="text"
          required
          inputmode="numeric"
          maxlength="32"
          class="w-full h-[56px] rounded-[15px] border border-[#DFEAF2] px-5
                 text-[#718EBF] text-[16px] outline-none
                 placeholder:text-[#718EBF]"
          placeholder="**** **** **** ****"
        />
      </div>

      <div>
        <label class="block text-[#343C6A] text-[18px] font-semibold mb-3">
          到期日
        </label>
        <input
          v-model="form.expiryDate"
          type="date"
          required
          class="w-full h-[56px] rounded-[15px] border border-[#DFEAF2] px-5
                 text-[#718EBF] text-[16px] outline-none
                 placeholder:text-[#718EBF]"
        />
      </div>

      <div>
        <label class="block text-[#343C6A] text-[18px] font-semibold mb-3">
          CVV
        </label>
        <input
          v-model="form.cvv"
          type="password"
          required
          inputmode="numeric"
          maxlength="4"
          minlength="3"
          class="w-full h-[56px] rounded-[15px] border border-[#DFEAF2] px-5
                 text-[#718EBF] text-[16px] outline-none
                 placeholder:text-[#718EBF]"
          placeholder="***"
        />
      </div>

      <div v-if="form.cardType === 'CREDIT'">
        <label class="block text-[#343C6A] text-[18px] font-semibold mb-3">
          信用额度
        </label>
        <input
          v-model="form.creditLimit"
          type="number"
          min="0"
          step="0.01"
          class="w-full h-[56px] rounded-[15px] border border-[#DFEAF2] px-5
                 text-[#718EBF] text-[16px] outline-none
                 placeholder:text-[#718EBF]"
          placeholder="10000.00"
        />
      </div>

      <div>
        <label class="block text-[#343C6A] text-[18px] font-semibold mb-3">
          初始余额
        </label>
        <input
          v-model="form.balance"
          type="number"
          min="0"
          step="0.01"
          class="w-full h-[56px] rounded-[15px] border border-[#DFEAF2] px-5
                 text-[#718EBF] text-[16px] outline-none
                 placeholder:text-[#718EBF]"
          placeholder="0.00"
        />
      </div>

      <button
        type="submit"
        :disabled="submitting"
        class="w-full md:w-[200px] h-[58px] rounded-[12px] bg-[#2D60FF]
               text-white text-[18px] font-semibold
               cursor-pointer active:scale-95 transition-all duration-100
               disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {{ submitting ? '添加中...' : '添加卡片' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { createMyBankCard } from "../api/bank-cards";
import { getApiErrorMessage } from "../utils/api-error";

const emit = defineEmits(["created"]);

const CARD_TYPE_OPTIONS = [
  { value: "DEBIT", label: "借记卡" },
  { value: "CREDIT", label: "信用卡" },
  { value: "SUPPLEMENTARY", label: "副卡" },
];

const form = reactive({
  bankName: "",
  cardType: "DEBIT",
  cardHolder: "",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
  creditLimit: "",
  balance: "0.00",
});

const submitting = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

function resetForm() {
  form.bankName = "";
  form.cardType = "DEBIT";
  form.cardHolder = "";
  form.cardNumber = "";
  form.expiryDate = "";
  form.cvv = "";
  form.creditLimit = "";
  form.balance = "0.00";
}

async function handleSubmit() {
  if (submitting.value) {
    return;
  }

  successMessage.value = "";
  errorMessage.value = "";
  submitting.value = true;

  try {
    const payload = {
      bank_name: form.bankName.trim(),
      card_type: form.cardType,
      card_holder: form.cardHolder.trim(),
      card_number: form.cardNumber.replace(/\s/g, ""),
      expiry_date: form.expiryDate,
      cvv: form.cvv.trim(),
      balance: form.balance || "0.00",
    };

    if (form.cardType === "CREDIT" && form.creditLimit !== "") {
      payload.credit_limit = form.creditLimit;
    }

    await createMyBankCard(payload);
    successMessage.value = "银行卡添加成功";
    resetForm();
    emit("created");
  } catch (error) {
    errorMessage.value = getApiErrorMessage(error, "添加银行卡失败，请稍后重试");
  } finally {
    submitting.value = false;
  }
}
</script>
