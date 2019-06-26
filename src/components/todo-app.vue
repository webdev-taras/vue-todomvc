<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        @keyup.enter="tryAddTodo"
      >
    </header>
    <!-- main section -->
    <section class="main" v-show="todos.length">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        :checked="allChecked"
        @change="toggleAll(!allChecked)"
      >
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <todo v-for="(todo, key) in todos"
          :todo="todo"
          :key="key"
          @edited="handleEdited"
          @removed="handleRemoved"
        ></todo>
      </ul>
    </section>
    <!-- footer -->
    <footer class="footer" v-show="todolist$.length" v-cloak>
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
      <ul class="filters">
        <li v-for="(status, key) in statuses" :key="key">
          <a :class="{ selected: visibility === status }" :disabled="visibility === status" @click="visibility = status">{{ status }}</a>
        </li>
      </ul>
      <button
        class="clear-completed"
        v-show="todos.length > remaining"
        @click="clearCompleted"
      >Clear completed</button>
    </footer>
  </section>
</template>

<script>
import Todo from "@/components/Todo.vue"
import TodoService from '@/services/todo.service'

import { commitState, restoreState } from "@/services/local-storage.service"

const todoFilters = {
  all: list => list,
  active: list => list.filter(todo => !todo.done),
  completed: list => list.filter(todo => todo.done),
}

const {
  todos: data = [],
  visibility: defaultVisibility = 'all'
} = restoreState()

const todoService = new TodoService({ data })

export default {
  components: { Todo },
  data() {
    return {
      statuses: Object.keys(todoFilters),
      visibility: defaultVisibility
    }
  },
  subscriptions() {
    return {
      todolist$: todoService.data$
    }
  },
  computed: {
    todos() {
      const status = this.visibility || defaultVisibility
      return todoFilters[status](this.todolist$)
    },
    remaining() {
      return todoFilters['active'](this.todolist$).length
    },
    allChecked() {
      return this.todolist$.every(todo => todo.done);
    },
  },
  methods: {
    tryAddTodo(e) {
      var text = e.target.value.trim();
      if (text) {
        this.handleAdd({ text })
      }
      e.target.value = "";
    },
    handleAdd: todoService.add.bind(todoService),
    handleEdited: todoService.update.bind(todoService),
    handleRemoved: todoService.remove.bind(todoService),
    toggleAll: todoService.toggleAll.bind(todoService),
    clearCompleted: todoService.clearCompleted.bind(todoService),
  },
  filters: {
    pluralize: (n, w) => (n === 1 ? w : w + "s")
  },
  created() {
    this.subscription = todoService.data$.subscribe(todos => {
      const { visibility } = this
      commitState({ todos, visibility })
      // eslint-disable-next-line no-console
      console.log('todos', todos)
    })
  },
  beforeDestroy() {
    this.subscription.unsubscribe()
  }
};
</script>