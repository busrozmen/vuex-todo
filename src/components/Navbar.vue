<template>
<div class="container">
  <b-navbar toggleable="lg" type="light">
      <router-link to="mylist" class="navbar-brand">My Todo List</router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <template v-if="user.loggedIn">
            <b-nav-item>
              <router-link to="mylist" class="nav-link">{{user.data.email}}</router-link>
            </b-nav-item>
            <b-nav-item>
              <a class="nav-link" @click.prevent="signOut">Sign out</a>
            </b-nav-item>
          </template>
          <template v-else>
            <b-nav-item >
              <router-link to="login" class="nav-link">Login</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="register" class="nav-link">Register</router-link>
            </b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
  </b-navbar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "mylist"
          });
        });
    }
  }
};
</script>
<style scoped>
.nav-link{
  cursor: pointer;
}

</style>