<template>
  <div class="w-full bg-white rounded-[25px] p-5 md:p-8 min-h-[460px]">
    <p v-if="pageLoading" class="text-[#718EBF] text-sm">加载中...</p>
    <p v-else-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

    <form
      v-else
      class="w-full min-h-[460px] flex flex-col"
      @submit.prevent="handleSubmit"
    >
      <p v-if="successMessage" class="text-sm text-green-600 mb-4">
        {{ successMessage }}
      </p>
      <p v-if="submitErrorMessage" class="text-sm text-red-500 mb-4">
        {{ submitErrorMessage }}
      </p>

      <div class="flex-1">
        <!-- two factor -->
        <div>
          <h3 class="text-[#343C6A] text-[16px] font-semibold mb-5">
            双重身份验证
          </h3>

          <label class="flex items-center gap-5 cursor-pointer">
            <span class="relative w-[60px] h-[34px] shrink-0">
              <input
                v-model="form.twoFactorEnabled"
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
              启用或禁用双重身份验证
            </span>
          </label>
        </div>

        <!-- security info -->
        <div class="mt-8 md:mt-10 max-w-full md:max-w-[560px]">
          <h3 class="text-[#343C6A] text-[16px] font-semibold mb-5">安全信息</h3>

          <div class="space-y-6">
            <div>
              <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
                上次密码修改
              </label>
              <input
                :value="lastPasswordChangeLabel"
                type="text"
                readonly
                class="form-input form-input-readonly"
              />
            </div>

            <div>
              <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
                登录尝试次数
              </label>
              <input
                :value="String(securityInfo.loginAttempts)"
                type="text"
                readonly
                class="form-input form-input-readonly"
              />
            </div>

            <div>
              <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
                账户锁定至
              </label>
              <input
                :value="lockUntilLabel"
                type="text"
                readonly
                class="form-input form-input-readonly"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- save -->
      <div class="mt-10 flex justify-end">
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
import { computed, onMounted, reactive, ref } from "vue";
import {
  getMySecuritySettings,
  updateMySecuritySettings,
} from "../api/settings";
import { getApiErrorMessage } from "../utils/api-error";

const form = reactive({
  twoFactorEnabled: false,
});

const securityInfo = reactive({
  lastPasswordChange: "",
  loginAttempts: 0,
  lockUntil: null,
});

const pageLoading = ref(true);
const submitting = ref(false);
const errorMessage = ref("");
const submitErrorMessage = ref("");
const successMessage = ref("");

function formatDateTime(dateTime) {
  if (!dateTime) {
    return "—";
  }

  return new Date(dateTime).toLocaleString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const lastPasswordChangeLabel = computed(() =>
  formatDateTime(securityInfo.lastPasswordChange),
);

const lockUntilLabel = computed(() =>
  securityInfo.lockUntil ? formatDateTime(securityInfo.lockUntil) : "未锁定",
);

function fillFormFromSettings(settings) {
  form.twoFactorEnabled = settings.two_factor_enabled;
  securityInfo.lastPasswordChange = settings.last_password_change;
  securityInfo.loginAttempts = settings.login_attempts;
  securityInfo.lockUntil = settings.lock_until;
}

async function fetchSecuritySettings() {
  pageLoading.value = true;
  errorMessage.value = "";

  try {
    const settings = await getMySecuritySettings();
    fillFormFromSettings(settings);
  } catch (error) {
    errorMessage.value = getApiErrorMessage(error, "加载安全设置失败，请稍后重试");
  } finally {
    pageLoading.value = false;
  }
}

function buildUpdatePayload() {
  return {
    two_factor_enabled: form.twoFactorEnabled,
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
    const settings = await updateMySecuritySettings(buildUpdatePayload());
    fillFormFromSettings(settings);
    successMessage.value = "安全设置已保存";
  } catch (error) {
    submitErrorMessage.value = getApiErrorMessage(error, "保存失败，请稍后重试");
  } finally {
    submitting.value = false;
  }
}

onMounted(() => {
  fetchSecuritySettings();
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

.form-input-readonly {
  background: #f5f7fa;
  cursor: default;
}

.form-input:focus {
  border-color: #2d60ff;
}

.form-input-readonly:focus {
  border-color: #dfeaf2;
}
</style>
