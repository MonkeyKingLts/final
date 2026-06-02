<template>
  <div
    class="w-full min-w-[240px] rounded-3xl p-5 sm:p-6 aspect-[1.6/1] flex flex-col justify-between shadow-md"
    :class="variantClass"
    :style="variantStyle"
  >
    <div class="flex justify-between items-center">
      <div>
        <p class="text-sm opacity-80">余额</p>
        <h2 class="text-3xl font-bold">${{ formattedBalance }}</h2>
      </div>

      <i class="fa-solid fa-credit-card text-3xl"></i>
    </div>

    <div class="space-y-4">
      <div class="flex items-end justify-between gap-3 text-sm opacity-80">
        <div class="min-w-0">
          <p>持卡人</p>
          <span class="text-base font-medium truncate block">{{ name }}</span>
        </div>
        <div class="shrink-0 text-right">
          <p>到期日</p>
          <span class="text-base font-medium">{{ expirationDate }}</span>
        </div>
      </div>

      <div class="flex items-center justify-between gap-3">
        <span class="text-[15px] sm:text-base tracking-[0.08em] whitespace-nowrap font-medium">
          {{ cardNumber }}
        </span>
        <i class="fa-solid fa-credit-card text-xl shrink-0 opacity-90"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: 'Eddy Cusuma',
  },
  cardNumber: {
    type: String,
    default: '3778 **** **** 1234',
  },
  expirationDate: {
    type: String,
    default: '12/22',
  },
  balance: {
    type: [Number, String],
    default: 1000,
  },
  variant: {
    type: String,
    default: 'primary',
  },
})

const formattedBalance = computed(() => {
  const amount = Number.parseFloat(String(props.balance))
  if (Number.isNaN(amount)) {
    return '0'
  }
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
})

const variantClass = computed(() => {
  if (props.variant === 'light') {
    return 'bg-white text-[#343C6A] border border-gray-100'
  }
  if (props.variant === 'blue') {
    return 'text-white'
  }
  return 'text-white'
})

const variantStyle = computed(() => {
  if (props.variant === 'light') {
    return {}
  }
  if (props.variant === 'blue') {
    return { background: 'linear-gradient(123deg, #2d60ff 2%, #539bff 101%)' }
  }
  return { background: 'linear-gradient(124deg, #ffaa07 2%, #d99d2a 101%)' }
})
</script>
