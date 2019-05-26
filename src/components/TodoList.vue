<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
          <v-text-field
            ref="nextTodo"
            v-model="newTodo"
            placeholder="What to do next?"
            required
            @keyup.enter="addTodo"
            v-focus
          ></v-text-field>
        </v-flex>
        <v-flex xs6 offset-xs3>
          <v-checkbox
            v-if="todoItens > 1"
            small
            label="all"
            ref="allTodos"
            :value="allItsDone"
            @change="checkAllTodos()"
          ></v-checkbox>
          <v-divider></v-divider>
          <v-list-tile v-for="(todo, index) in filteredTodos" :key="todo.id">
            <v-list-tile-action>
              <v-checkbox v-show="!todo.editing" v-model="todo.completed"></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title
                :class="{completed : todo.completed}"
                v-if="!todo.editing"
                @dblclick="enableEdit(todo)"
              >{{todo.title}}</v-list-tile-title>
              <input
                type="text"
                v-else
                @keyup.enter="doneEdit(todo)"
                @keyup.esc="disableEdit(todo)"
                @blur="doneEdit(todo)"
                v-model="todo.title"
                outline
                v-focus
              >
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple v-show="!todo.editing" @click.prevent="removeItem(index)">
                <v-icon color="grey lighten-1">remove</v-icon>
              </v-btn>
              <v-btn v-show="todo.editing" icon ripple @click.prevent="doneEdit(todo)">
                <v-icon color="grey lighten-1">done</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
        </v-flex>

        <v-flex xs2 offset-xs2>
          <v-btn
            flat
            small
            color="grey"
            :class="{selected: filter == ''}"
            @click.prevent="filter = ''"
          >{{checkedTodos}} / {{todoItens}}</v-btn>
        </v-flex>
        <v-flex xs2 v-if="filter == 'completed'">
          <v-btn
            class="mr-2"
            flat
            small
            color="grey"
            :class="{selected: filter == 'open'}"
            @click.prevent="filter = 'open'"
          >
            <v-icon small>assignment</v-icon>Open
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="hasCompletedItens">
          <v-btn
            class="mr-2"
            flat
            small
            color="grey"
            :class="{selected: filter == 'completed'}"
            @click.prevent="filter = 'completed'"
          >
            <v-icon small>done</v-icon>Done
          </v-btn>
        </v-flex>

        <v-flex xs2 v-if="hasCompletedItens">
          <v-btn class="mr-2" flat small color="grey" @click.prevent="clearCompleted()">
            <v-icon small>remove</v-icon>Clear
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  created() {
    this.todos = [
      {
        id: 1,
        title: "completar o estudo do curso",
        completed: false,
        editing: false,
        beforeEditing: ""
      },
      {
        id: 2,
        title: "terminar o curso mais rápido que o gustavo",
        completed: true,
        editing: false,
        beforeEditing: ""
      },
      {
        id: 3,
        title: "jogaar um dotinha antes de dormir!",
        completed: false,
        editing: false,
        beforeEditing: ""
      }
    ];
  },
  computed: {
    filteredTodos() {
      if (this.filter == "completed")
        return this.todos.filter(item => item.completed);
      if (this.filter == "open")
        return this.todos.filter(item => !item.completed);
      return this.todos;
    },
    todoItens() {
      return this.todos.length;
    },
    checkedTodos() {
      return this.todos.filter(item => item.completed).length;
    },
    isSelected() {
      return true;
    },
    hasCompletedItens() {
      return this.todos.filter(item => item.completed).length > 0;
    },
    allItsDone() {
      return (
        this.todos.length > 0 &&
        this.todos.filter(item => !item.completed).length == 0
      );
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length < 1) {
        return;
      }

      this.todos.push({
        id: this.todos.length + 1,
        title: this.newTodo,
        completed: false,
        editing: false,
        beforeEditing: ""
      });
      this.newTodo = "";
    },
    removeItem(index) {
      this.todos = this.todos.filter(item => {
        return item.id != this.todos[index].id;
      });
    },
    enableEdit(todo) {
      todo.editing = !todo.editing;
      todo.beforEditing = todo.title;
    },
    disableEdit(todo) {
      todo.title = todo.beforEditing;
      todo.editing = !todo.editing;
    },
    doneEdit(todo) {
      if (todo.title.trim() == "") {
        todo.title = todo.beforEditing;
      }
      todo.editing = false;
    },
    clearCompleted() {
      this.todos = this.todos.filter(item => !item.completed);
    },
    checkAllTodos() {
      this.todos.forEach(item => {
      if (this.$refs.allTodos.isActive) {
          item.completed = true;
        } else {
          item.completed = false;
        }
      });
    }
  },
  directives: {
    focus: {
      // definição da diretiva
      inserted: function(el) {
        el.focus();
      }
    }
  },
  data() {
    return {
      newTodo: "",
      todos: [],
      filter: ""
    };
  }
};
</script>
<style>
.completed {
  text-decoration: line-through;
  color: gray;
}

.selected {
  background-color: darkslategray;
}
</style>
