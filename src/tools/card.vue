<template>
  <div
    class="w-full max-w-sm rounded-3xl p-6  aspect-[1.6/1] 
        flex flex-col justify-between
    "
    :class="[props.backgroundColor, props.textColor]"
  >
    <div class="flex justify-between items-center">
        <div>
            <p class="text-sm opacity-80">余额</p>
            <h2 class="text-3xl font-bold">${{ props.balance }}</h2>
        </div>

        <i class="fa-solid fa-credit-card text-3xl"></i>
    </div>

    <div class="space-y-4">
        <div class="flex justify-between text-sm opacity-80">
        <div>
            <p>持卡人</p>
            <span class="  text-lg">{{ props.name }}</span>
        </div>
        <div>
            <p>到期日</p>
            <span class=" text-lg">{{ props.expirationDate }}</span>
        </div>
      </div>

      <p class="tracking-[0.2em] text-lg flex items-center justify-between ">
        {{ props.cardNumber }}
        <i class="fa-solid fa-credit-card text-2xl"></i>
      </p>
    </div>
  </div>
</template>


<script setup>
     import {ref} from 'vue'

     const props = defineProps({
        name: {
            type: String,
            default: 'Eddy Cusuma'
        },
        cardNumber: {
            type: String,
            default: '3778 **** **** 1234'
        },
        expirationDate: {
            type: String,
            default: '12/22'
        },
        balance: {
            type: Number,
            default: 1000
        },
        backgroundColor: {
            type: String,
            default: 'bg-[linear-gradient(124deg,#ffaa07_2%,#d99d2a_101%)]'
        },
        textColor: {
            type: String,
            default: 'text-white'
        }
     })
</script>
