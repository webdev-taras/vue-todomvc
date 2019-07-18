<template>
  <TodoWidget>
    <div slot-scope="{
      inputAttrs,
      addItem,
      todos,
      handleRemoved
    }">
      <div class="max-w-sm w-full mx-auto">
        <h1>Dashboard</h1>

        <div class="tags-input">
          <span v-for="todo in todos"
            class="tags-input-tag"
            :key="todo.id"
          >
            <span>{{ todo.text }}</span>
            <button type="button" class="tags-input-remove" @click="handleRemoved({ item: todo })">&times;</button>
          </span>
          <input class="tags-input-text" placeholder="Add todo item..."
            @keydown.enter.prevent="addItem"
            v-bind="inputAttrs"
          >
        </div>
      </div>
    </div>
  </TodoWidget>
</template>

<script>
import TodoWidget from '@/widgets/todo'

export default {
  name: 'dashboard',
  components: {
    TodoWidget
  },
}
</script>

<style scoped>
.tags-input {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  border-width: 1px;
  border-radius: .25rem;
  padding-left: .5rem;
  padding-right: 1rem;
  padding-top: .5rem;
  padding-bottom: .25rem;
}

.tags-input-tag {
  display: inline-flex;
  line-height: 1;
  align-items: center;
  font-size: .875rem;
  background-color: #efefef;
  color: #1c3d5a;
  border-radius: .25rem;
  user-select: none;
  padding: .25rem;
  margin-right: .5rem;
  margin-bottom: .25rem;
}

.tags-input-tag:last-of-type {
  margin-right: 0;
}

.tags-input-remove {
  color: #2779bd;
  font-size: 1.125rem;
  line-height: 1;
}

.tags-input-remove:first-child {
  margin-right: .25rem;
}

.tags-input-remove:last-child {
  margin-left: .25rem;
}

.tags-input-remove:focus {
  outline: 0;
}

.tags-input-text {
  flex: 1;
  outline: 0;
  padding-top: .25rem;
  padding-bottom: .25rem;
  margin-left: .5rem;
  margin-bottom: .25rem;
  min-width: 10rem;
}

.py-16 {
  padding-top: 4rem;
  padding-bottom: 4rem;
}
</style>
