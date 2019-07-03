<template>
  <div class="home">
    <div class="todoapp">
      <TodoWidget>
        <header slot="header" class="header">
          <h1>todos widget</h1>
        </header>
        <section slot="top-toolbar" slot-scope="{ inputAttrs, addItem, todos, allChecked, toggleAll }">
          <input
            class="new-todo"
            autofocus
            autocomplete="off"
            placeholder="What needs to be done?"
            v-bind="inputAttrs"
            @keyup.enter="addItem"
          >

          <section class="main" v-show="todos.length">
            <input
              id="toggle-all"
              class="toggle-all"
              type="checkbox"
              :checked="allChecked"
              @change="toggleAll(!allChecked)"
            >
            <label for="toggle-all"></label>
          </section>
        </section>

        <section slot="bottom-toolbar" slot-scope="{ todos, remaining, statuses, visibility, clearCompleted, setVisibility }" class="footer" v-cloak>
          <span class="todo-count">
            <strong>{{ remaining }}</strong>
            {{ remaining | pluralize('item') }} left
          </span>
          <ul class="filters">
            <li v-for="(status, key) in statuses" :key="key">
              <a
                :class="{ selected: visibility === status }"
                :disabled="visibility === status"
                @click=setVisibility(status)
              >{{ status }}</a>
            </li>
          </ul>
          <button
            class="clear-completed"
            v-show="todos.length > remaining"
            @click="clearCompleted"
          >Clear completed</button>
        </section>

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
  },
  filters: {
    pluralize: (n, w) => (n === 1 ? w : w + "s")
  },
}
</script>
