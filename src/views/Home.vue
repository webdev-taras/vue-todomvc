<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <TodoApp></TodoApp>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import TodoApp from '@/components/todo-app.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    TodoApp
  }
}
</script>
