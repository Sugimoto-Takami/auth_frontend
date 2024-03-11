<!-- frontend/src/views/RegisterPage.vue -->
<template>
  <div class="register-container">
    <h1>登録フォーム</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="name" class="form-label">Name</label>
        <input type="text" v-model="state.name" placeholder="Name" id="name" class="form-control" />
        <div v-for="error in v$.name.$errors" :key="error.$uid" class="error-message">
          {{ error.$message }}
        </div>
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input type="text" v-model="state.email" placeholder="Email" id="email" class="form-control" />
        <div v-for="error in v$.email.$errors" :key="error.$uid" class="error-message">
          {{ error.$message }}
        </div>
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <div class="password-container">
          <input :type="state.showPassword ? 'text' : 'password'" id="password" v-model="state.password"
            placeholder="Password" class="form-control" />
          <span @click="state.showPassword = !state.showPassword" class="password-toggle">
            <img :src="state.showPassword ? '/path/to/hide-icon.png' : '/path/to/show-icon.png'"
              alt="Show/Hide Password" />
          </span>
        </div>
        <div v-for="error in v$.password.$errors" :key="error.$uid" class="error-message">
          {{ error.$message }}
        </div>
      </div>
      <button type="submit" class="submit-button">Register</button>
    </form>
    <div v-if="state.successMessage">{{ state.successMessage }}</div>
    <div v-if="state.errorMessage" class="error-message">{{ state.errorMessage }}</div>
    <div>
      <p>登録済みの方は<a href="/LoginPage">こちら</a></p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

const router = useRouter();

const state = reactive({
  name: '',
  email: '',
  password: '',
  successMessage: '',
  errorMessage: '',
  showPassword: false
});

const rules = {
  name: { required },
  email: { required, email },
  password: { required, minLength: minLength(8) },
};

const v$ = useVuelidate(rules, state);

const register = async () => {

  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/auth/register', state);
    if (response.status === 201 && response.data.message === 'User registered') {
      state.successMessage = "Registration success.";
      setTimeout(() => router.push({ name: 'login' }), 1000);
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      state.errorMessage = error.response.data.message || "An error occurred. Please try again.";
    } else if (error.request) {
      console.log(error.request);
      state.errorMessage = "No response from the server. Please check your network connection.";
    } else {
      console.log('Error', error.message);
      state.errorMessage = "An error occurred. Please try again.";
    }
    console.error("Error during registration:", error);
  }
};
</script>

<style>
.register-container {
  max-width: 400px;
  /* フォームの最大幅を設定 */
  margin: auto;
  /* 中央揃え */
}

.form-group {
  margin-bottom: 16px;
  /* 各入力欄の下部にマージンを追加 */
}

.form-label {
  display: block;
  /* ラベルをブロック要素に */
  margin-bottom: 4px;
  /* ラベルの下に少しマージンを追加 */
  text-align: left;
  /* ラベルのテキストを左揃えに */
}

.form-control {
  width: 100%;
  /* 入力欄の幅を100%に */
  padding: 8px;
  /* パディングを追加 */
  box-sizing: border-box;
  /* パディングとボーダーを幅に含める */
}

.password-container {
  position: relative;
  /* パスワードの目アイコンの位置を調整するため */
}

.password-toggle {
  position: absolute;
  /* 目アイコンを絶対位置で配置 */
  right: 8px;
  /* 右から8pxの位置に */
  top: 8px;
  /* 上から8pxの位置に */
  cursor: pointer;
  /* カーソルをポインタに */
}

.error-message {
  color: red;
  /* エラーメッセージを赤色に */
}

.submit-button {
  width: 100%;
  /* 送信ボタンの幅を100%に */
  padding: 8px;
  /* 送信ボタンにパディングを追加 */
  background-color: #3498db;
  border: none; /* ボーダーを削除 */
  color: white;
  /* テキストを白に */
  cursor: pointer;
  /* カーソルをポインタに */
  margin-top: 16px;
  /* ボタンの上のマージンを追加 */
}

/* ボタンにホバーしたときの効果 */
.submit-button:hover {
  background-color: #2980b9;
  /* ボタンの背景色を濃い青に */
}

/* エラーメッセージ表示のスタイル */
.error-message {
  color: red;
  /* エラーメッセージの色 */
  font-size: 0.85rem;
  /* フォントサイズを小さく */
}
</style>
