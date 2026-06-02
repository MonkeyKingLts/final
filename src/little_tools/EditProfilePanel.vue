<template>
  <div class="w-full bg-white rounded-[25px] p-5 md:p-8">
    <p v-if="pageLoading" class="text-[#718EBF] text-sm">加载中...</p>

    <form
      v-else
      class="grid grid-cols-1 xl:grid-cols-[160px_1fr] gap-8"
      @submit.prevent="handleSubmit"
    >
      <p
        v-if="successMessage"
        class="xl:col-span-2 text-sm text-green-600"
      >
        {{ successMessage }}
      </p>
      <p
        v-if="errorMessage"
        class="xl:col-span-2 text-sm text-red-500"
      >
        {{ errorMessage }}
      </p>

      <!-- avatar -->
      <div class="flex justify-center xl:justify-start">
        <div class="relative size-[110px] md:size-[130px]">
          <img
            :src="avatarUrl"
            alt="avatar"
            class="size-full rounded-full object-cover bg-[#E7EDFF]"
            @error="handleAvatarError"
          />

          <button
            type="button"
            class="absolute right-0 bottom-2 size-[34px] rounded-full bg-[#2D60FF]
                   flex items-center justify-center
                   text-white cursor-pointer active:scale-95 transition-all duration-100"
          >
            <i class="fa-solid fa-pen text-[14px]"></i>
          </button>
        </div>
      </div>

      <!-- form -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        <div>
          <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
            姓名
          </label>
          <input
            v-model="form.fullName"
            type="text"
            required
            maxlength="100"
            class="form-input"
          />
        </div>

        <div>
          <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
            曾用名
          </label>
          <input
            v-model="form.formerName"
            type="text"
            maxlength="100"
            class="form-input"
          />
        </div>

        <div>
          <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
            邮箱
          </label>
          <input
            v-model="form.email"
            type="email"
            required
            class="form-input"
          />
        </div>

        <div>
          <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
            密码
          </label>
          <input
            v-model="form.password"
            type="password"
            minlength="8"
            maxlength="128"
            class="form-input"
            placeholder="留空则不修改"
          />
        </div>

        <div>
          <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
            出生日期
          </label>
          <input
            v-model="form.birthDate"
            type="date"
            required
            class="form-input"
          />
        </div>

        <div>
          <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
            当前地址
          </label>
          <input
            v-model="form.currentAddress"
            type="text"
            required
            class="form-input"
          />
        </div>

        <div>
          <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
            永久地址
          </label>
          <input
            v-model="form.permanentAddress"
            type="text"
            class="form-input"
          />
        </div>

        <div>
          <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
            城市
          </label>
          <input
            v-model="form.city"
            type="text"
            required
            maxlength="50"
            class="form-input"
          />
        </div>

        <div>
          <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
            邮政编号
          </label>
          <input
            v-model="form.postalCode"
            type="text"
            required
            maxlength="20"
            class="form-input"
          />
        </div>

        <div>
          <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
            国家
          </label>
          <input
            v-model="form.country"
            type="text"
            maxlength="50"
            class="form-input"
          />
        </div>

        <div class="md:col-span-2 flex justify-end pt-2">
          <button
            type="submit"
            :disabled="submitting"
            class="w-full md:w-[180px] h-[50px] rounded-[12px] bg-[#2D60FF]
                   text-white text-[17px] font-semibold
                   cursor-pointer active:scale-95 transition-all duration-100
                   disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {{ submitting ? '保存中...' : '保存' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getCurrentUser, updateMyProfile } from "../api/auth";
import { getApiErrorMessage } from "../utils/api-error";
import { buildInitialsAvatar, resolveAvatarUrl } from "../utils/avatar";

const form = reactive({
  fullName: "",
  formerName: "",
  email: "",
  password: "",
  birthDate: "",
  currentAddress: "",
  permanentAddress: "",
  city: "",
  postalCode: "",
  country: "",
});

const pageLoading = ref(true);
const submitting = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const avatarUrl = ref(buildInitialsAvatar(""));
const state = ref("");

function handleAvatarError() {
  avatarUrl.value = buildInitialsAvatar(form.fullName);
}

function fillFormFromUser(user) {
  form.fullName = user.full_name;
  form.formerName = user.former_name ?? "";
  form.email = user.email;
  form.password = "";
  form.birthDate = user.birth_date;
  form.currentAddress = user.current_address;
  form.permanentAddress = user.permanent_address ?? "";
  form.city = user.city;
  form.postalCode = user.postal_code;
  form.country = user.country;
  avatarUrl.value = resolveAvatarUrl(user.avatar_url, user.full_name);
  state.value = user.state;
}

async function fetchProfile() {
  pageLoading.value = true;
  errorMessage.value = "";

  try {
    const user = await getCurrentUser();
    fillFormFromUser(user);
  } catch (error) {
    errorMessage.value = getApiErrorMessage(error, "加载个人资料失败，请稍后重试");
  } finally {
    pageLoading.value = false;
  }
}

function buildUpdatePayload() {
  const payload = {
    full_name: form.fullName.trim(),
    former_name: form.formerName.trim() || null,
    email: form.email.trim(),
    birth_date: form.birthDate,
    current_address: form.currentAddress.trim(),
    permanent_address: form.permanentAddress.trim() || null,
    city: form.city.trim(),
    state: state.value.trim() || null,
    postal_code: form.postalCode.trim(),
    country: form.country.trim() || null,
  };

  if (form.password.trim()) {
    payload.password = form.password;
  }

  return payload;
}

async function handleSubmit() {
  if (submitting.value) {
    return;
  }

  successMessage.value = "";
  errorMessage.value = "";
  submitting.value = true;

  try {
    const user = await updateMyProfile(buildUpdatePayload());
    fillFormFromUser(user);
    successMessage.value = "个人资料已保存";
  } catch (error) {
    errorMessage.value = getApiErrorMessage(error, "保存失败，请稍后重试");
  } finally {
    submitting.value = false;
  }
}

onMounted(() => {
  fetchProfile();
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

.form-input::placeholder {
  color: #718ebf;
}

.form-input:focus {
  border-color: #2d60ff;
}
</style>
