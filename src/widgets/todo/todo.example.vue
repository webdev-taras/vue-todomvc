<template>
  <section class="todoapp">
    <!-- header -->
    <header slot="header" class="header">
      <h1>todos</h1>
    </header>

    <!-- top-toolbar -->
    <section slot="top-toolbar">
      <input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        @keyup.enter="tryAddTodo"
      >
    </section>

    <!-- main section -->
    <section slot="main" class="main" v-show="todos.length">
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

    <!-- bottom-toolbar -->
    <section slot="bottom-toolbar"></section>

    <!-- footer -->
    <footer slot="footer" class="footer" v-show="todolist$.length" v-cloak>
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
