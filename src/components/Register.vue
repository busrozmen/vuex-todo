<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <div class="col-md-12">
                  <input
                    id="name"
                    type="name"
                    class="form-control"
                    name="name"
                    placeholder="Name"
                    value
                    required
                    autofocus
                    v-model="form.name"
                  />
                </div>
              </div>

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
                  <button type="submit" class="btn register-btn">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        name: "",
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
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.form.name
            })
             // eslint-disable-next-line no-unused-vars
            .then((data) => {
                this.$router.replace({name : "MyList"})
                });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>

<style >
.register-btn{
    width: 35%;
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