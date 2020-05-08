<template>
  <div class="mt-5">
    <div class="addTodo col-12 m-auto">
      <form @submit="onSubmit">
        <input type="text" class="form-control" v-model="titledesc.title" placeholder="Name" />
        <textarea class="form-control mt-2" aria-label="With textarea" v-model="titledesc.description" placeholder="Description"></textarea>
        <input class="btn submit-btn col-12 mt-2" type="submit" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddTodo",
  data() {
    return {
      titledesc:{
        title:"",
        description:""
      }
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    onSubmit(e) {
      e.preventDefault();
      this.addTodo(this.titledesc);
    }
  }
};
</script>
<style scoped>
.submit-btn{
    width: 35%;
    margin-left: 50%;
    transform: translateX(-50%);
    padding: 15px 0;
    background: #23de81;
    background: -webkit-linear-gradient(to right, #1f6dbb, #23de81);
    background: linear-gradient(to right, #1f6dbb, #23de81);
    border: none;
    margin-top: 15px !important;
}
</style>
