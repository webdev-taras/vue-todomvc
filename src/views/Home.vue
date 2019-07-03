<template>
  <div class="home">
    <TodoWidget></TodoWidget>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoWidget from '@/widgets/todo'

export default {
  name: 'home',
  components: {
    TodoWidget
  }
}
</script>
