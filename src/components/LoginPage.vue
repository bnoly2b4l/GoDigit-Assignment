<template>
  <div class="login-page">
    <div class="container">
      <h3>Log In</h3>
      <b-form @submit.stop.prevent="onSubmit">
        <b-form-group label="Nickname">
          <b-form-input
            v-model="$v.name.$model"
            :state="validateState()"
          ></b-form-input>

          <b-form-invalid-feedback
            >This is a required field.</b-form-invalid-feedback
          >
        </b-form-group>
        <b-button type="submit" variant="primary">Log In</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'LoginPage',
  data() {
    return {
      name: '',
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(1),
    },
  },
  methods: {
    validateState() {
      const { $dirty, $error } = this.$v.name
      return $dirty ? !$error : null
    },
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$anyError) {
        return;
      }
      localStorage.setItem('userName', JSON.stringify(this.name))
      this.$router.replace('/')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
}
.login-page {
  display: flex;
  align-items: center;
  height: 100vh;
}
</style>
