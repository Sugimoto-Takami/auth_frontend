<!-- frontend/src/views/LoginPage.vue -->
<template>
  <div class="login-container">
    <form @submit.prevent="post">
      <h1>ログインフォーム</h1>
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input type="text" id="email" v-model="state.email" placeholder="Enter email" class="form-input" />
        <div v-for="error in v$.email.$errors" :key="error.$uid" class="error-message">
          <div>{{ error.$message }}</div>
        </div>
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <div class="password-field">
          <input :type="state.showPassword ? 'text' : 'password'" id="password" v-model="state.password"
            placeholder="Enter password" class="form-input" />
          <button type="button" @click="state.showPassword = !state.showPassword" class="toggle-password">
            <img :src="state.showPassword ? '../assets/logo.png' : '../assets/logo.png'" alt="Show/Hide Password">
          </button>
        </div>
        <div v-for="error in v$.password.$errors" :key="error.$uid" class="error-message">
          <div>{{ error.$message }}</div>
        </div>
      </div>
      <button type="submit" class="submit-button">LogIn</button>
      <div>{{ state.msg }}</div>
    </form>
    <div>
      <p>登録がまだの方は<a href="/RegisterPage">こちら</a></p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import store from '@/store';

const router = useRouter();

const state = reactive({
  email: '',
  password: '',
  showPassword: false,
  msg: 'userIDとpasswordを入力して下さい'
});

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(8) },
}

const v$ = useVuelidate(rules, state);

const post = async () => {

  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }

  let response;
  try {
    response = await axios.post('http://localhost:3000/auth/login', state);
    console.log(response);
    state.msg = response.data.message;

    if (response.data.message === 'Logged in successfully') {
      store.dispatch("fetch", state.email); // storeに保存 (Vuexの機能)
      router.push({ name: 'page1' });
    }
  } catch (error) {
    console.log(error);
    state.msg = error.response ? error.response.data.message : error.message; // エラーメッセージをセット
    return; // 関数から抜ける
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  /* 横幅を400pxに制限 */
  margin: 50px auto;
  /* 上下50pxのマージン、左右autoで中央揃え */
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
}

.form-input {
  width: 100%;
  /* 全幅にする */
  padding: 8px;
  margin-bottom: 10px;
  /* マージンを適度に設定 */
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  text-align: left;
  /* テキストを左揃えに */
}

.error-message {
  color: red;
  /* 警告メッセージを赤色に */
}

.password-field {
  position: relative;
}

/* 変更: 画像コンテナのスタイルを追加 */
.image-container {
  text-align: center;
  /* 中央揃えに */
  margin-top: 20px;
  /* 上部のマージンを設定 */
}

.image-container img {
  max-width: 100%;
  /* 画像の最大幅を親要素に合わせる */
  height: auto;
  /* 高さは自動で調整 */
}

.toggle-password {
  position: absolute;
  /* ボタンをinputフィールド内に絶対位置で配置 */
  right: 0;
  /* 右端に */
  top: 0;
  /* 上端に */
  border: none;
  /* 枠線なし */
  background-color: transparent;
  /* 背景を透明に */
  cursor: pointer;
  /* カーソルを指に */
}

.toggle-password img {
  width: 20px;
  /* アイコンの幅 */
  height: 20px;
  /* アイコンの高さ */
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #2980b9;
}

a {
  color: #3498db;
}

a:hover {
  text-decoration: underline;
}
</style>