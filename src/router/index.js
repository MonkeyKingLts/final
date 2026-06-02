import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/login.vue";
import MainLayout from "../components/MainLayout.vue";
import Dashboard from "../components/Dashboard.vue";
import Transactions from "../components/Transactions.vue";
import Accounts from "../components/Accounts.vue";
import Assets from "../components/Assets.vue";
import CreditCards from "../components/CreditCards.vue";
import Loans from "../components/Loans.vue";
import Devices from "../components/Devices.vue";
import Settings from "../components/Settings.vue";

import EditProfilePanel from "../little_tools/EditProfilePanel.vue";
import PreferenceSettings from "../little_tools/PreferenceSettings.vue";
import SecuritySettings from "../little_tools/SecuritySettings.vue";
import { isAuthenticated } from "../utils/auth";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login, name: "login" },
  {
    path: "/",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "dashboard", component: Dashboard, name: "dashboard" },
      {
        path: "transactions",
        component: Transactions,
        name: "transactions",
      },
      { path: "accounts", component: Accounts, name: "accounts" },
      { path: "assets", component: Assets, name: "assets" },
      {
        path: "credit-cards",
        component: CreditCards,
        name: "credit-cards",
      },
      { path: "loans", component: Loans, name: "loans" },
      { path: "devices", component: Devices, name: "devices" },
      {
        path: "settings",
        component: Settings,
        name: "settings",
        redirect: { name: "edit-profile" },
        children: [
          {
            path: "edit-profile",
            component: EditProfilePanel,
            name: "edit-profile",
          },
          {
            path: "preference",
            component: PreferenceSettings,
            name: "preference",
          },
          {
            path: "security",
            component: SecuritySettings,
            name: "security",
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const loggedIn = isAuthenticated();

  if (requiresAuth && !loggedIn) {
    return { name: "login" };
  }

  if (to.name === "login" && loggedIn) {
    return { name: "dashboard" };
  }
});

export default router;
