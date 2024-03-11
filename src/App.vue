<template>
  <!-- frontend/src/App.vue -->
  <div id="nav">
    <router-link :to="{ name: 'home' }">Home</router-link>
  </div>
  <router-view/>
  <div id="auth-options">
    <router-link class="auth-link" :to="{ name: 'login' }">ログインはこちら</router-link>
    <router-link class="auth-link" :to="{ name: 'register' }">登録はこちら</router-link>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  /* ナビゲーションスタイルを適用する */
}

#auth-options {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* ボタンを垂直に並べる */
  gap: 20px; /* ボタン間のスペース */
}

.auth-link {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  width: 200px; /* ボタンの幅 */
  text-align: center;
}
</style>