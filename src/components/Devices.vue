<template>
  <div class="bg-[#F5F7FA] w-full min-h-dvh p-3 xl:p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-3">
      <SummaryCard
        v-for="item in insuranceCards"
        :key="item.id"
        v-bind="item"
        class="cursor-pointer active:scale-97 transition-all duration-100"
      />
    </div>

    <div>
      <h2 class="text-[#343C6A] font-bold text-[22px] mb-2 pl-4">
        银行服务清单
      </h2>

      <p v-if="pageLoading" class="text-[#718EBF] text-sm pl-4">加载中...</p>
      <p
        v-else-if="bankServices.length === 0"
        class="text-[#718EBF] text-sm pl-4"
      >
        暂无银行服务数据
      </p>

      <div v-else class="flex flex-col gap-4">
        <BankServiceItem
          v-for="item in bankServices"
          :key="item.id"
          v-bind="item"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SummaryCard from "../tools/SummaryCard.vue";
import BankServiceItem from "../tools/BankServiceItem.vue";
import { listMyBankServices } from "../api/services";

const SERVICE_STATUS_LABELS = {
  AVAILABLE: "可用",
  UNAVAILABLE: "不可用",
};

const SERVICE_STYLE_MAP = {
  COMMERCIAL_LOAN: {
    icon: "fa-solid fa-hand-holding-dollar",
    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",
  },
  BUSINESS_LOAN: {
    icon: "fa-solid fa-hand-holding-dollar",
    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",
  },
  CHECKING: {
    icon: "fa-solid fa-briefcase",
    iconBg: "bg-[#FFF5D9]",
    iconColor: "text-[#FFBB38]",
  },
  SAVINGS: {
    icon: "fa-solid fa-chart-simple",
    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",
  },
  DEBIT_CREDIT: {
    icon: "fa-solid fa-user",
    iconBg: "bg-[#E7EDFF]",
    iconColor: "text-[#396AFF]",
  },
  CREDIT_CARD: {
    icon: "fa-solid fa-user",
    iconBg: "bg-[#E7EDFF]",
    iconColor: "text-[#396AFF]",
  },
  LIFE_INSURANCE: {
    icon: "fa-solid fa-shield-heart",
    iconBg: "bg-[#DCFAF8]",
    iconColor: "text-[#16DBCC]",
  },
};

const FALLBACK_STYLES = [
  {
    icon: "fa-solid fa-hand-holding-dollar",
    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",
  },
  {
    icon: "fa-solid fa-briefcase",
    iconBg: "bg-[#FFF5D9]",
    iconColor: "text-[#FFBB38]",
  },
  {
    icon: "fa-solid fa-chart-simple",
    iconBg: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",
  },
  {
    icon: "fa-solid fa-user",
    iconBg: "bg-[#E7EDFF]",
    iconColor: "text-[#396AFF]",
  },
  {
    icon: "fa-solid fa-shield-heart",
    iconBg: "bg-[#DCFAF8]",
    iconColor: "text-[#16DBCC]",
  },
];

const insuranceCards = [
  {
    id: 1,
    icon: "fa-solid fa-shield",
    iconBg: "bg-[#E7EDFF]",
    iconColor: "text-[#396AFF]",
    title: "人寿保险",
    value: "无期限",
  },
  {
    id: 2,
    icon: "fa-solid fa-bag-shopping",
    iconBg: "bg-[#FFF5D9]",
    iconColor: "text-[#FFBB38]",
    title: "购物",
    value: "购买,购物",
  },
  {
    id: 3,
    icon: "fa-solid fa-shield-heart",
    iconBg: "bg-[#DCFAF8]",
    iconColor: "text-[#16DBCC]",
    title: "安全",
    value: "我们是您的靠谱管家",
  },
];

const pageLoading = ref(true);
const bankServices = ref([]);

function getServiceStyle(serviceType, index) {
  const normalizedType = serviceType.toUpperCase().replace(/[\s-]+/g, "_");
  return (
    SERVICE_STYLE_MAP[normalizedType] ??
    FALLBACK_STYLES[index % FALLBACK_STYLES.length]
  );
}

function formatDateTime(dateTime) {
  return new Date(dateTime).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function mapBankServiceToItem(service, index) {
  const style = getServiceStyle(service.service_type, index);

  return {
    id: service.id,
    ...style,
    serviceName: service.service_name,
    serviceDesc: service.contract_type,
    details: [
      {
        id: 1,
        title: service.service_type,
        desc: "服务类型",
      },
      {
        id: 2,
        title: service.contract_type,
        desc: "合约类型",
      },
      {
        id: 3,
        title: SERVICE_STATUS_LABELS[service.status] ?? service.status,
        desc: formatDateTime(service.created_at),
      },
    ],
  };
}

async function fetchBankServices() {
  pageLoading.value = true;

  try {
    const services = await listMyBankServices();
    bankServices.value = services.map(mapBankServiceToItem);
  } catch {
    bankServices.value = [];
  } finally {
    pageLoading.value = false;
  }
}

onMounted(() => {
  fetchBankServices();
});
</script>
