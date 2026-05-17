<template>
    <div class="w-full bg-white rounded-[25px] px-6 py-5">
      <table class="w-full table-fixed">
        <thead>
          <tr class="border-b border-[#F0F2F5]">
            <th
              v-for="column in columns"
              :key="column.key"
              class="pb-3 text-left text-[#718EBF] text-[16px] font-semibold"
              :class="column.class"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
  
        <tbody>
          <tr v-for="(item, index) in stocks" :key="item.id">
            <td class="py-4 text-[#343C6A] text-[16px]">
              {{ formatNo(index + 1) }}
            </td>
  
            <td class="py-4 text-[#343C6A] text-[16px] font-medium">
              {{ item.name }}
            </td>
  
            <td class="py-4 text-[#343C6A] text-[16px]">
              {{ item.price }}
            </td>
  
            <td
              class="py-4 text-[16px] font-semibold"
              :class="item.returnRate.startsWith('-') ? 'text-[#FF4B6E]' : 'text-[#16DBAA]'"
            >
              {{ item.returnRate }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  defineProps({
    stocks: {
      type: Array,
      default: () => [
        {
          id: 1,
          name: "华泰证券",
          price: "$520",
          returnRate: "+5%",
        },
        {
          id: 2,
          name: "华泰证券",
          price: "$480",
          returnRate: "+10%",
        },
        {
          id: 3,
          name: "华泰证券",
          price: "$350",
          returnRate: "-3%",
        },
        {
          id: 4,
          name: "华泰证券",
          price: "$940",
          returnRate: "+2%",
        },
        {
          id: 5,
          name: "华泰证券",
          price: "$670",
          returnRate: "-12%",
        },
      ],
    },
  });
  
  const columns = [
    {
      key: "no",
      label: "No",
      class: "w-[22%]",
    },
    {
      key: "name",
      label: "姓名",
      class: "w-[34%]",
    },
    {
      key: "price",
      label: "价格",
      class: "w-[28%]",
    },
    {
      key: "returnRate",
      label: "超值回报",
      class: "w-[16%]",
    },
  ];
  
  const formatNo = (num) => `${String(num).padStart(2, "0")}.`;
  </script>