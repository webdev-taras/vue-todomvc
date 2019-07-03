<template>
  <div class="home">
    <div class="todoapp">
      <TodoWidget>
        <header slot="header" class="header">
          <h1>todos widget</h1>
        </header>


        <footer slot="footer">
          <p>
            <span class="todo-count">Well done!</span>
          </p>
        </footer>
      </TodoWidget>
    </div>
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
