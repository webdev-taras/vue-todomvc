<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/todos">Todos</router-link> |
      <router-link to="/incoming">Incoming</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
