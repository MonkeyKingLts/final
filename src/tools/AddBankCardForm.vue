<template>
    <div class="w-full bg-white rounded-[25px] p-6 md:p-8">
      <p class="text-[#718EBF] text-[16px] md:text-[18px] leading-9 mb-12">
        信用卡通常是指指定给持卡人的计划商业银行发行的具有信用额度的塑料卡，
        可用于赊购商品和服务或获得现金预付款。
      </p>
  
      <form class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
        <div>
          <label class="block text-[#343C6A] text-[18px] font-semibold mb-3">
            银行卡
          </label>
          <input
            v-model="form.cardType"
            type="text"
            class="w-full h-[56px] rounded-[15px] border border-[#DFEAF2] px-5
                   text-[#718EBF] text-[16px] outline-none
                   placeholder:text-[#718EBF]"
            placeholder="Classic"
          />
        </div>
  
        <div>
          <label class="block text-[#343C6A] text-[18px] font-semibold mb-3">
            持卡人
          </label>
          <input
            v-model="form.holderName"
            type="text"
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
          <div class="relative">
            <input
              v-model="form.expirationDate"
              type="text"
              class="w-full h-[56px] rounded-[15px] border border-[#DFEAF2] px-5 pr-12
                     text-[#718EBF] text-[16px] outline-none
                     placeholder:text-[#718EBF]"
              placeholder="25 January 2025"
            />
  
            <i
              class="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2
                     text-[#718EBF]"
            ></i>
          </div>
        </div>
  
        <button
          type="submit"
          class="w-full md:w-[200px] h-[58px] rounded-[12px] bg-[#2D60FF]
                 text-white text-[18px] font-semibold
                 cursor-pointer active:scale-95 transition-all duration-100"
        >
          添加卡片
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive } from "vue";
  
  const form = reactive({
    cardType: "",
    holderName: "",
    cardNumber: "",
    expirationDate: "",
  });
  </script>