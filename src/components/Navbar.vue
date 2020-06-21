<template>
  <div class="navbar">
    <div class="container">
      <p v-b-modal.modal-change-name>{{ name }}</p>
      <b-button class="logout-button" variant="outline-dark" @click="onLogout"
        >Log Out</b-button
      >
      <b-modal
        @hide="resetValidate"
        id="modal-change-name"
        title="Change Nickname"
        ref="changeNameModal"
        hide-footer
      >
        <b-form ref="customerForm" @submit="onSubmit">
          <b-form-group label="Nickname">
            <b-form-input
              v-model="$v.userName.$model"
              :state="validateState()"
            ></b-form-input>

            <b-form-invalid-feedback
              >This is a required field.</b-form-invalid-feedback
            >
          </b-form-group>
          <div class="footer">
            <b-button class="button" @click="onCancel">
              Cancel
            </b-button>
            <b-button class="button" variant="primary" type="submit">
              OK
            </b-button>
          </div>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  validations: {
    userName: {
      required,
      minLength: minLength(1),
    },
  },
  computed: {
    ...mapState({
      name: 'currentUser',
    }),
  },
  data() {
    return {
      userName: ''
    }
  },
  methods: {
    ...mapActions({
      setUserName: 'setUserName'
    }),
    resetValidate() {
      this.$v.$reset()
    },
    validateState() {
      const { $dirty, $error } = this.$v.userName
      return $dirty ? !$error : null
    },
    onLogout() {
      localStorage.removeItem('userName');
      this.$router.replace('/login')
    },
    onCancel() {
      this.$refs.changeNameModal.onCancel()
    },
    onSubmit(e) {
      e.preventDefault()
      this.$v.$touch()

      if (this.$v.$anyError) {
        return
      }
      localStorage.setItem('userName', JSON.stringify(this.userName))
      this.$refs.changeNameModal.onOk()
      this.resetValidate()
      window.location.reload()
    },
  },
  mounted() {
    const userName = JSON.parse(localStorage.getItem('userName'))
    this.userName = userName
    this.setUserName(userName)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  box-shadow: 0px 4px 10px 0px #dbdbdbbf;
  width: 100%;
}
.container {
  justify-content: flex-end;
  align-items: center;
}
.logout-button {
  margin-left: 15px;
}
.footer {
  float: right;
}
.button {
  margin-left: 10px;
}
</style>
