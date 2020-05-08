<template>
  <div v-if="user.loggedIn" class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
         <Todos />
         <AddTodo /> 
      </div>
    </div>
  </div>
  <div v-else class="container alert alert-info" role="alert">
  Please login or register!
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Todos from './Todos';
import AddTodo from "./AddTodo";

export default {
    components:{
        Todos,
        AddTodo,
    },
    data(){
        return{
            todos:[]
        }
    },
      computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  }
}

</script>