<script>
import TodoService from '@/services/todo.service'

import { commitState, restoreState } from "@/services/local-storage.service"

const todoFilters = {
  all: list => list,
  active: list => list.filter(todo => !todo.done),
  completed: list => list.filter(todo => todo.done),
}

const {
  todos: data = [],
} = restoreState()

const todoService = new TodoService({ data })

export default {
  data() {
    return {
      newTodo: '',
      statuses: Object.keys(todoFilters),
      visibility: 'all'
    }
  },
  subscriptions() {
    return {
      todolist$: todoService.data$
    }
  },
  computed: {
    todos() {
      const status = this.visibility
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

      const todos = this.todolist$
      const visibility = this.visibility
      commitState({ todos, visibility })
    },
  },
  
  render() {
    return this.$scopedSlots.default({
      inputAttrs: { value: this.newTodo },
      addItem: this.addItem,
      todos: this.todos,
      remaining: this.remaining,
      statuses: this.statuses,
      visibility: this.visibility,
      allChecked: this.allChecked,

      toggleAll: this.toggleAll,
      clearCompleted: this.clearCompleted,
      setVisibility: this.setVisibility,

      handleEdited: this.handleEdited,
      handleRemoved: this.handleRemoved,
    })
  },

  created() {
    const { visibility } = restoreState()
    this.visibility = visibility

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