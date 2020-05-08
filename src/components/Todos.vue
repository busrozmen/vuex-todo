<template>
<div>
 <div class="searchTodo">
  <div class="input-group mb-3">
      <input type="text" class="form-control" v-model="search">
       <div class="input-group-append">
          <input class="btn btn-dark" type="submit" value="Search" @click="searchTodo()">
       </div>
  </div>
  </div>
    <div class="todos row mt-5">
      <div
        v-for="todo in allTodos"
        :key="todo.id"
        class="todo card " v-bind:class="{'is-complete':todo.completed}">
        <div class="row m-0">
        <div class="col-2" >
         <label class="checkbox-container">
         <input type="checkbox"  @click="onDblClick(todo)"/>
         <span class="checkmark"></span>        
         </label>
        </div>
        <div class="col-10 todo-detail">
          <p class="font-weight-bold">{{ todo.title }}</p>
          <p>{{ todo.description }}</p>
       </div>
        <div class="col-12 todo-delete">
            <svg @click="deleteTodo(todo.id)" class="bi bi-trash-fill del" width="1rem" height="1rem" viewBox="0 0 16 16" fill="#c7c7c7" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd" />
            </svg>            
         </div>
      </div>
      </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Todos",
    data() {
    return {
      search: ""
    }
  },
  methods: {
    ...mapActions(["fetchTodos", "deleteTodo","updateTodo", "filteredTodos"]),
   onDblClick(todo) {
      const updTodo = {
        id: todo.id,
        title: todo.title,
        description:todo.description,
        completed: !todo.completed
      };
      this.updateTodo(updTodo);
    },
     searchTodo(){
       this.search!=="" ? this.filteredTodos(this.search):this.fetchTodos();
     }

  },
  computed:mapGetters(["allTodos"]),  
  created() {
    this.fetchTodos();
  },
   mounted() {
        setTimeout(() => {
            let todoItems = document.querySelectorAll('.todo');
            todoItems.forEach(function (todoItem) {
                if (todoItem.className.indexOf("is-complete") >= 0) {
                    todoItem.querySelector('input[type=checkbox]').checked = true;
                }
            });
        }, 400);
   }
};
</script>

<style scoped>

.todos{
  margin-right:0px;
  margin-left: 0px;
}
.todo {
    width: calc(50% - 20px);
    padding: 20px 0;
    box-shadow: 3px 2px 6px rgba(0,0,0,.25);
    border: none;
    margin:10px;
    border-left: 12px solid #79c37954;
}
@media only screen and (max-width: 600px) {
.todo {
    width: calc(1000% - 20px);
}
}
.todo-delete{
  height: 15px;
}
.del{
  cursor: pointer;
  right: 15px;
  position: absolute;
}
.checkbox-container {
    position: absolute;
    padding-left: 15px;
    cursor: pointer;
}

.is-complete {
  border-left: 12px solid #79c379;
}

.checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

/* Create a custom checkbox */
.checkmark {
    position: absolute;
    top: 5px;
    left: 0;
    height: 17px;
    width: 17px;
    background-color: #fff;
    border: 2px solid #79c37954;
    border-radius: 50%;

}

/* When the checkbox is checked, add a blue background */
.checkbox-container input:checked~.checkmark {
    background-color: #fff;
    border:none;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.checkbox-container input:checked~.checkmark:after {
    display: block;
}

/* Style the checkmark/indicator */
.checkbox-container .checkmark:after {
    left: 4px;
    top:-5px;
    width: 10px;
    height: 20px;
    border: 1px solid #79c379;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}

</style>