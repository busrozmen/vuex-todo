<template>
  <div class="container" v-if="user.loggedIn">
  </div>
   <div class="container" v-else>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <div class="col-md-12">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    placeholder="Email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-md-12">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    placeholder="Password"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                  <button type="submit" class="btn login-btn">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
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
    }),
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        // eslint-disable-next-line no-unused-vars
        .then(data => {
          this.$router.replace({ name: "MyList" });
        })
        .catch(err => {
          this.error = err.message;
        });
    },
  }
};
</script>
<style>
.login-btn{
    width: 25%;
    padding: 10px 0 !important;
    margin-left: 50%;
    transform: translateX(-50%);
    background: #23de81;
    background: -webkit-linear-gradient(to right, #1f6dbb, #23de81);
    background: linear-gradient(to right, #1f6dbb, #23de81);
    border: none !important;
    margin-top: 15px !important;
}
</style>
