<script>
export default {
  props: ["todo"],
  data() {
    return {
      editing: false
    };
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
    },
  },
  render() {
    return this.$scopedSlots.default({
      editing: this.editing,
      toggleTodo: this.toggleTodo,
      removeTodo: this.removeTodo,
      startEdit: this.startEdit,
      doneEdit: this.doneEdit,
      cancelEdit: this.cancelEdit,
    })
  },
};
</script>