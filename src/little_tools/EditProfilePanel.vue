<template>
    <div class="w-full bg-white rounded-[25px] p-5 md:p-8">
      <form
        class="grid grid-cols-1 xl:grid-cols-[160px_1fr] gap-8"
      >
        <!-- avatar -->
        <div class="flex justify-center xl:justify-start">
          <div class="relative size-[110px] md:size-[130px]">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="avatar"
              class="size-full rounded-full object-cover"
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
              v-model="form.name"
              type="text"
              class="form-input"
            />
          </div>
  
          <div>
            <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
              曾用名
            </label>
            <input
              v-model="form.username"
              type="text"
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
              class="form-input"
            />
          </div>
  
          <div>
            <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
              出生日期
            </label>
            <div class="relative">
              <input
                v-model="form.birthDate"
                type="text"
                class="form-input pr-12"
              />
              <i
                class="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2
                       text-[#718EBF] text-[14px]"
              ></i>
            </div>
          </div>
  
          <div>
            <label class="block text-[#343C6A] text-[15px] font-semibold mb-2">
              当前地址
            </label>
            <input
              v-model="form.currentAddress"
              type="text"
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
              class="form-input"
            />
          </div>
  
          <div class="md:col-span-2 flex justify-end pt-2">
            <button
              type="submit"
              class="w-full md:w-[180px] h-[50px] rounded-[12px] bg-[#2D60FF]
                     text-white text-[17px] font-semibold
                     cursor-pointer active:scale-95 transition-all duration-100"
            >
              保存
            </button>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive } from "vue";
  
  const form = reactive({
    name: "Charlene Reed",
    username: "Charlene Reed",
    email: "charlenereed@gmail.com",
    password: "**********",
    birthDate: "25 January 1990",
    currentAddress: "San Jose, California, USA",
    permanentAddress: "San Jose, California, USA",
    city: "San Jose",
    postalCode: "45962",
    country: "USA",
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