<template>
  <section>
    <!-- header -->
    <slot name="header"></slot>
    <!-- top-toolbar -->
    <slot name="top-toolbar"
      :inputAttrs="{ value: newTodo }"
      :addItem="addItem"
      :todos="todos"
      :remaining="remaining"
      :statuses="statuses"
      :visibility="visibility"
      :allChecked="allChecked"

      :toggleAll="toggleAll"
      :clearCompleted="clearCompleted"
    ></slot>

    <!-- main section -->
    <section class="main" v-show="todos.length">
      <ul class="todo-list">
        <todo v-for="todo in todos"
          :todo="todo"
          :key="todo.id"
          @edited="handleEdited"
          @removed="handleRemoved"
        >
          <li slot-scope="{ editing, toggleTodo, removeTodo }" class="todo" :class="{ completed: todo.done, editing: editing }">
            <div class="view">
              <input class="toggle" type="checkbox" :checked="todo.done" @change="toggleTodo(todo)">
              <label v-text="todo.text"></label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
          </li>
        </todo>
      </ul>
    </section>
    
    <!-- bottom-toolbar -->
    <slot name="bottom-toolbar"
      :todos="todos"
      :remaining="remaining"
      :statuses="statuses"
      :visibility="visibility"
      :allChecked="allChecked"

      :toggleAll="toggleAll"
      :clearCompleted="clearCompleted"
      :setVisibility="setVisibility"

      v-show="todolist$.length"
    ></slot>

    <!-- footer -->
    <slot name="footer"></slot>
  </section>
</template>

<script>
import Todo from "./components/Todo.vue"
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
      newTodo: '',
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
    addItem(e) {
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
    setVisibility(value) {
      console.log('setVisibility', value)
      this.visibility = value
    },
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