<template>
  <form
    class="w-full bg-white rounded-[25px] p-5 md:p-8 min-h-[460px] flex flex-col"
  >
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

      <!-- password -->
      <div class="mt-8 md:mt-10 max-w-full md:max-w-[560px]">
        <h3 class="text-[#343C6A] text-[16px] font-semibold mb-5">修改密码</h3>

        <div class="space-y-6">
          <div>
            <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
              当前密码
            </label>

            <input
              v-model="form.currentPassword"
              type="password"
              class="form-input"
            />
          </div>

          <div>
            <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
              新密码
            </label>

            <input
              v-model="form.newPassword"
              type="password"
              class="form-input"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- save -->
    <div class="mt-10 flex justify-end">
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
  twoFactorEnabled: true,
  currentPassword: "**********",
  newPassword: "**********",
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
