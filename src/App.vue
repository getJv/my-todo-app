<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Todo</span>
        <span class="font-weight-light">APP</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <todo-list></todo-list>
    </v-content>
  </v-app>
</template>

<script>
import TodoList from "./components/TodoList";
import axios from "axios";

export default {
  name: "App",
  components: {
    TodoList
  },
  created() {
    var url = "http://localhost:3000/issues.json"
    axios.get(url)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  },
  data() {
    return {
      //
    };
  }
};
</script>
