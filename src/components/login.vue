
<template>
    <div class="min-h-screen bg-[#FCFCFC] flex flex-col items-center justify-center p-4">
      <!-- Brand Section -->
      <div class="text-center mb-8">
        <div class="flex items-center justify-center space-x-3 mb-4">
          <i class="fas fa-university text-orange-500 text-4xl"></i>
          <h1 class="text-3xl font-bold text-gray-800">SoftBank</h1>
        </div>
        <p class="text-gray-600 text-lg">{{ currentForm === 'login' ? '欢迎回来，请登录您的账户' : '创建新账户，开始您的金融之旅' }}</p>
      </div>
  
      <!-- Login/Register Form Card -->
      <div
        class="bg-white rounded-2xl shadow-xl w-full overflow-hidden transition-all duration-300 max-w-lg"
        :class="{ 'max-w-2xl': currentForm === 'register' }"
      >
        <!-- Form Toggle Tabs -->
        <div class="flex border-b">
          <button 
            @click="switchForm('login')"
            :class="['flex-1 py-4 px-6 text-center font-medium text-sm transition-colors duration-200', 
                     currentForm === 'login' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700']"
          >
            登录
          </button>
          <button 
            @click="switchForm('register')"
            :class="['flex-1 py-4 px-6 text-center font-medium text-sm transition-colors duration-200', 
                     currentForm === 'register' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700']"
          >
            注册
          </button>
        </div>
  
        <!-- Form Content -->
        <div class="p-8">
          <!-- Login Form -->
          <form v-if="currentForm === 'login'" @submit.prevent="handleLogin">
            <p v-if="loginSuccessMessage" class="mb-4 text-sm text-green-600">
              {{ loginSuccessMessage }}
            </p>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="username">
                用户名 / 邮箱
              </label>
              <div class="relative" :class="{ 'login-shake': shakeInputs }">
                <input
                  id="username"
                  v-model="loginForm.username"
                  @input="clearLoginError"
                  @focus="loginSuccessMessage = ''"
                  :class="loginInputClass"
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm transition-colors duration-200"
                  type="text"
                  placeholder="请输入用户名或邮箱"
                />
                <i class="fas fa-user absolute right-3 top-3.5 text-gray-400"></i>
              </div>
            </div>
  
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="password">
                密码
              </label>
              <div class="relative" :class="{ 'login-shake': shakeInputs }">
                <input
                  id="password"
                  v-model="loginForm.password"
                  @input="clearLoginError"
                  :class="loginInputClass"
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm transition-colors duration-200"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="请输入您的密码"
                />
                <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <p v-if="loginError" class="mt-2 text-sm text-red-500">
                {{ loginErrorMessage }}
              </p>
            </div>
  
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <input
                  id="remember"
                  v-model="loginForm.rememberMe"
                  type="checkbox"
                  class="h-4 w-4 text-orange-500 focus:ring-green-500 border-gray-300 rounded"
                />
                <label for="remember" class="ml-2 block text-sm text-gray-700">
                  记住我
                </label>
              </div>
              <a href="#" class="text-sm text-green-600 hover:text-green-800">
                忘记密码？
              </a>
            </div>
  
            <button
              type="submit"
              :disabled="isSubmitting"
              class="!rounded-button whitespace-nowrap w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {{ isSubmitting ? '登录中...' : '登录' }}
            </button>
          </form>
  
          <!-- Register Form -->
          <form v-else @submit.prevent="handleRegister" class="max-h-[65vh] overflow-y-auto pr-1">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="reg-username">
                用户名
              </label>
              <div class="relative" :class="{ 'login-shake': shakeRegisterInputs }">
                <input
                  id="reg-username"
                  v-model="registerForm.username"
                  @input="clearRegisterError"
                  :class="registerInputClass"
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm transition-colors duration-200"
                  type="text"
                  placeholder="3-50 个字符"
                  maxlength="50"
                />
                <i class="fas fa-at absolute right-3 top-3.5 text-gray-400"></i>
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="reg-name">
                姓名
              </label>
              <div class="relative" :class="{ 'login-shake': shakeRegisterInputs }">
                <input
                  id="reg-name"
                  v-model="registerForm.fullName"
                  @input="clearRegisterError"
                  :class="registerInputClass"
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm transition-colors duration-200"
                  type="text"
                  placeholder="请输入您的姓名"
                  maxlength="100"
                />
                <i class="fas fa-user absolute right-3 top-3.5 text-gray-400"></i>
              </div>
            </div>
  
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="reg-email">
                邮箱
              </label>
              <div class="relative" :class="{ 'login-shake': shakeRegisterInputs }">
                <input
                  id="reg-email"
                  v-model="registerForm.email"
                  @input="clearRegisterError"
                  :class="registerInputClass"
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm transition-colors duration-200"
                  type="email"
                  placeholder="请输入您的邮箱"
                />
                <i class="fas fa-envelope absolute right-3 top-3.5 text-gray-400"></i>
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="reg-birth-date">
                出生日期
              </label>
              <div class="relative" :class="{ 'login-shake': shakeRegisterInputs }">
                <input
                  id="reg-birth-date"
                  v-model="registerForm.birthDate"
                  @input="clearRegisterError"
                  :class="registerInputClass"
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm transition-colors duration-200"
                  type="date"
                />
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="reg-address">
                现居地址
              </label>
              <div class="relative" :class="{ 'login-shake': shakeRegisterInputs }">
                <input
                  id="reg-address"
                  v-model="registerForm.currentAddress"
                  @input="clearRegisterError"
                  :class="registerInputClass"
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm transition-colors duration-200"
                  type="text"
                  placeholder="请输入现居地址"
                />
                <i class="fas fa-location-dot absolute right-3 top-3.5 text-gray-400"></i>
              </div>
            </div>

            <div class="mb-4 grid grid-cols-2 gap-3">
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2" for="reg-city">
                  城市
                </label>
                <input
                  id="reg-city"
                  v-model="registerForm.city"
                  @input="clearRegisterError"
                  :class="registerInputClass"
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm transition-colors duration-200"
                  type="text"
                  placeholder="城市"
                  maxlength="50"
                />
              </div>
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2" for="reg-state">
                  州 / 省
                </label>
                <input
                  id="reg-state"
                  v-model="registerForm.state"
                  @input="clearRegisterError"
                  :class="registerInputClass"
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm transition-colors duration-200"
                  type="text"
                  placeholder="州 / 省"
                  maxlength="50"
                />
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="reg-postal-code">
                邮编
              </label>
              <input
                id="reg-postal-code"
                v-model="registerForm.postalCode"
                @input="clearRegisterError"
                :class="registerInputClass"
                class="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm transition-colors duration-200"
                type="text"
                placeholder="请输入邮编"
                maxlength="20"
              />
            </div>
  
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="reg-password">
                密码
              </label>
              <div class="relative" :class="{ 'login-shake': shakeRegisterInputs }">
                <input
                  id="reg-password"
                  v-model="registerForm.password"
                  @input="clearRegisterError"
                  :class="registerInputClass"
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm transition-colors duration-200"
                  :type="showRegPassword ? 'text' : 'password'"
                  placeholder="至少 8 位字符"
                  maxlength="128"
                />
                <button
                  type="button"
                  @click="toggleRegPasswordVisibility"
                  class="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <i :class="showRegPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>
  
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="reg-confirm-password">
                确认密码
              </label>
              <div class="relative" :class="{ 'login-shake': shakeRegisterInputs }">
                <input
                  id="reg-confirm-password"
                  v-model="registerForm.confirmPassword"
                  @input="clearRegisterError"
                  :class="registerInputClass"
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm transition-colors duration-200"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="请再次输入密码"
                  maxlength="128"
                />
                <button
                  type="button"
                  @click="toggleConfirmPasswordVisibility"
                  class="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <p v-if="registerError" class="mt-2 text-sm text-red-500">
                {{ registerErrorMessage }}
              </p>
            </div>
  
            <div class="mb-4">
              <div class="flex items-center">
                <input
                  id="terms"
                  v-model="registerForm.acceptTerms"
                  type="checkbox"
                  class="h-4 w-4 text-orange-500 focus:ring-green-500 border-gray-300 rounded"
                />
                <label for="terms" class="ml-2 block text-sm text-gray-700">
                  我同意
                  <a href="#" class="text-orange-500 hover:text-orange-700">服务条款</a>
                  和
                  <a href="#" class="text-orange-500 hover:text-orange-700">隐私政策</a>
                </label>
              </div>
            </div>
  
            <button
              type="submit"
              :disabled="isSubmitting"
              class="!rounded-button whitespace-nowrap w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {{ isSubmitting ? '注册中...' : '创建账户' }}
            </button>
          </form>
  
          <!-- Divider -->
          <div class="my-6 flex items-center">
            <div class="flex-grow border-t border-gray-300"></div>
            <span class="mx-4 text-gray-500 text-sm">或</span>
            <div class="flex-grow border-t border-gray-300"></div>
          </div>
  
          <!-- Social Login Options -->
          <div class="grid grid-cols-2 gap-3">
            <button class="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200">
              <i class="fab fa-google text-red-500 mr-2"></i>
              <span class="text-sm text-gray-700">Google</span>
            </button>
            <button class="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200">
              <i class="fab fa-facebook text-blue-600 mr-2"></i>
              <span class="text-sm text-gray-700">Facebook</span>
            </button>
          </div>
        </div>
      </div>
  
      <!-- Footer -->
      <div class="mt-8 text-center">
        <p class="text-gray-500 text-sm">
          © 2024 SoftBank. All rights reserved.
        </p>
        <div class="mt-2 flex justify-center space-x-4">
          <a href="#" class="text-xs text-gray-500 hover:text-gray-700">隐私政策</a>
          <a href="#" class="text-xs text-gray-500 hover:text-gray-700">服务条款</a>
          <a href="#" class="text-xs text-gray-500 hover:text-gray-700">联系我们</a>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { loginForAccessToken, registerUser } from '../api/auth';
  import { getApiErrorMessage } from '../utils/api-error';
  import { setAuth } from '../utils/auth';

  const router = useRouter();
  const isSubmitting = ref(false);
  const loginError = ref(false);
  const loginErrorMessage = ref('');
  const shakeInputs = ref(false);
  const registerError = ref(false);
  const registerErrorMessage = ref('');
  const loginSuccessMessage = ref('');
  const shakeRegisterInputs = ref(false);
  
  const loginInputClass = computed(() =>
    loginError.value
      ? 'border-red-500 ring-2 ring-red-500/30 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent',
  );

  const registerInputClass = computed(() =>
    registerError.value
      ? 'border-red-500 ring-2 ring-red-500/30 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent',
  );
  
  // Form states
  const currentForm = ref<'login' | 'register'>('login');
  const showPassword = ref(false);
  const showRegPassword = ref(false);
  const showConfirmPassword = ref(false);
  
  // Login form data
  const loginForm = ref({
    username: '',
    password: '',
    rememberMe: false,
  });
  
  // Register form data
  const registerForm = ref({
    username: '',
    fullName: '',
    email: '',
    birthDate: '',
    currentAddress: '',
    city: '',
    state: '',
    postalCode: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  
  // Switch between forms
  function switchForm(form: 'login' | 'register') {
    currentForm.value = form;
    clearLoginError();
    clearRegisterError();
    loginSuccessMessage.value = '';
  }

  function clearLoginError() {
    loginError.value = false;
    loginErrorMessage.value = '';
  }

  function clearRegisterError() {
    registerError.value = false;
    registerErrorMessage.value = '';
  }

  function triggerLoginError(message = '账号或密码错误，请重试') {
    loginErrorMessage.value = message;
    loginError.value = true;
    shakeInputs.value = false;
    requestAnimationFrame(() => {
      shakeInputs.value = true;
    });
    window.setTimeout(() => {
      shakeInputs.value = false;
    }, 450);
  }

  function triggerRegisterError(message: string) {
    registerErrorMessage.value = message;
    registerError.value = true;
    shakeRegisterInputs.value = false;
    requestAnimationFrame(() => {
      shakeRegisterInputs.value = true;
    });
    window.setTimeout(() => {
      shakeRegisterInputs.value = false;
    }, 450);
  }

  function validateRegisterForm(): string | null {
    const form = registerForm.value;

    if (!form.username.trim()) return '请填写用户名';
    if (form.username.trim().length < 3) return '用户名至少 3 个字符';
    if (!form.fullName.trim()) return '请填写姓名';
    if (!form.email.trim()) return '请填写邮箱';
    if (!form.birthDate) return '请选择出生日期';
    if (!form.currentAddress.trim()) return '请填写现居地址';
    if (!form.city.trim()) return '请填写城市';
    if (!form.state.trim()) return '请填写州 / 省';
    if (!form.postalCode.trim()) return '请填写邮编';
    if (!form.password) return '请填写密码';
    if (form.password.length < 8) return '密码至少 8 位字符';
    if (form.password !== form.confirmPassword) return '两次输入的密码不一致';
    if (!form.acceptTerms) return '请同意服务条款和隐私政策';

    return null;
  }
  
  // Toggle password visibility for login
  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };
  
  // Toggle password visibility for register
  const toggleRegPasswordVisibility = () => {
    showRegPassword.value = !showRegPassword.value;
  };
  
  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
  };
  
  // Handle login submission
  async function handleLogin() {
    const { username, password, rememberMe } = loginForm.value;

    if (!username.trim() || !password) {
      triggerLoginError('请填写用户名和密码');
      return;
    }

    isSubmitting.value = true;
    clearLoginError();
    try {
      const token = await loginForAccessToken(username.trim(), password);
      setAuth(token.access_token, rememberMe);
      router.push({ name: 'dashboard' });
    } catch {
      triggerLoginError();
    } finally {
      isSubmitting.value = false;
    }
  }
  
  async function handleRegister() {
    clearRegisterError();

    const validationError = validateRegisterForm();
    if (validationError) {
      triggerRegisterError(validationError);
      return;
    }

    const form = registerForm.value;
    isSubmitting.value = true;

    try {
      await registerUser({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        full_name: form.fullName.trim(),
        birth_date: form.birthDate,
        current_address: form.currentAddress.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        postal_code: form.postalCode.trim(),
        country: 'USA',
      });

      const registeredUsername = form.username.trim();
      registerForm.value = {
        username: '',
        fullName: '',
        email: '',
        birthDate: '',
        currentAddress: '',
        city: '',
        state: '',
        postalCode: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
      };

      currentForm.value = 'login';
      loginForm.value.username = registeredUsername;
      loginSuccessMessage.value = '注册成功，请使用用户名登录';
    } catch (error) {
      triggerRegisterError(
        getApiErrorMessage(error, '注册失败，请检查信息后重试'),
      );
    } finally {
      isSubmitting.value = false;
    }
  }
  </script>
  
  <style scoped>
  @keyframes login-shake {
    0%,
    100% {
      transform: translateX(0);
    }

    20%,
    60% {
      transform: translateX(-6px);
    }

    40%,
    80% {
      transform: translateX(6px);
    }
  }

  .login-shake {
    animation: login-shake 0.45s ease-in-out;
  }
  </style>
  
  