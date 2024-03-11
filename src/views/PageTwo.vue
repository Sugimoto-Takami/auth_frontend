<!-- src/components/PageTwo.vue -->
<template>
    <div>
        <h1>ここはページ2です</h1>
        <h3>user</h3>
        <!-- <h3>{{$store.state.userId}}<h3> -->
        <router-link :to="{ name: 'page1' }">ページ1へ</router-link>
    </div>
  </template>