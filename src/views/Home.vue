<template>
  <div class="home">
    <TodoApp></TodoApp>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoApp from '@/components/todo-app.vue'

export default {
  name: 'home',
  components: {
    TodoApp
  }
}
</script>
