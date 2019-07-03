<template>
  <li class="todo" :key="todo.id" :class="{ completed: todo.done, editing: editing }">
    <div class="view">
      <input class="toggle" type="checkbox" :checked="todo.done" @change="toggleTodo(todo)">
      <label v-text="todo.text" @dblclick="startEdit"></label>
      <button class="destroy" @click="removeTodo(todo)"></button>
    </div>
    <input
      class="edit"
      v-show="editing"
      v-focus="editing"
      :value="todo.text"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit"
    >
  </li>
</template>

<script>
export default {
  props: ["todo"],
  data() {
    return {
      editing: false
    };
  },
  directives: {
    focus(el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus();
        });
      }
    }
  },
  methods: {
    doneEdit(e) {
      const value = e.target.value.trim();
      if (!value) {
        this.removeTodo(this.todo);
      } else if (this.editing) {
        this.editTodo({ text: value })
      }
      this.editing = false;
    },
    startEdit() {
      this.editing = true;
    },
    cancelEdit(e) {
      e.target.value = this.todo.text;
      this.editing = false;
    },
    toggleTodo() {
      this.editTodo({ done: !this.todo.done })
    },
    editTodo({ text, done }) {
      this.$emit('edited', { item: this.todo, text, done })
    },
    removeTodo(item) {
      this.$emit('removed', { item })
    }
  }
};
</script>