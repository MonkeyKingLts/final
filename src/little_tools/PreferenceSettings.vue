<template>
  <div class="w-full bg-white rounded-[25px] p-5 md:p-8 min-h-[520px]">
    <p v-if="pageLoading" class="text-[#718EBF] text-sm">加载中...</p>
    <p v-else-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

    <form
      v-else
      class="w-full"
      @submit.prevent="handleSubmit"
    >
      <p v-if="successMessage" class="text-sm text-green-600 mb-4">
        {{ successMessage }}
      </p>
      <p v-if="submitErrorMessage" class="text-sm text-red-500 mb-4">
        {{ submitErrorMessage }}
      </p>

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
          :disabled="submitting"
          class="w-full md:w-[190px] h-[52px] rounded-[12px] bg-[#2D60FF] text-white text-[17px] font-semibold active:scale-95 transition-all duration-100
                 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {{ submitting ? '保存中...' : '保存' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getMySystemSettings, updateMySystemSettings } from "../api/settings";
import { getApiErrorMessage } from "../utils/api-error";

const form = reactive({
  currency: "",
  timezone: "",
  notify_crypto: false,
  notify_merchant: false,
  notify_recommendation: false,
});

const notifications = [
  {
    key: "notify_crypto",
    label: "我发送或接收数字货币",
  },
  {
    key: "notify_merchant",
    label: "我收到商户订单",
  },
  {
    key: "notify_recommendation",
    label: "我的账户有推荐",
  },
];

const pageLoading = ref(true);
const submitting = ref(false);
const errorMessage = ref("");
const submitErrorMessage = ref("");
const successMessage = ref("");

function fillFormFromSettings(settings) {
  form.currency = settings.currency;
  form.timezone = settings.timezone;
  form.notify_crypto = settings.notify_crypto;
  form.notify_merchant = settings.notify_merchant;
  form.notify_recommendation = settings.notify_recommendation;
}

async function fetchSystemSettings() {
  pageLoading.value = true;
  errorMessage.value = "";

  try {
    const settings = await getMySystemSettings();
    fillFormFromSettings(settings);
  } catch (error) {
    errorMessage.value = getApiErrorMessage(error, "加载系统设置失败，请稍后重试");
  } finally {
    pageLoading.value = false;
  }
}

function buildUpdatePayload() {
  return {
    currency: form.currency.trim(),
    timezone: form.timezone.trim(),
    notify_crypto: form.notify_crypto,
    notify_merchant: form.notify_merchant,
    notify_recommendation: form.notify_recommendation,
  };
}

async function handleSubmit() {
  if (submitting.value) {
    return;
  }

  successMessage.value = "";
  submitErrorMessage.value = "";
  submitting.value = true;

  try {
    const settings = await updateMySystemSettings(buildUpdatePayload());
    fillFormFromSettings(settings);
    successMessage.value = "设置已保存";
  } catch (error) {
    submitErrorMessage.value = getApiErrorMessage(error, "保存失败，请稍后重试");
  } finally {
    submitting.value = false;
  }
}

onMounted(() => {
  fetchSystemSettings();
});
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
