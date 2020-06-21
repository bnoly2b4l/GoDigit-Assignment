<template>
  <b-modal
    v-if="data"
    id="modal-edit-profile"
    ref="editModal"
    :title="'Profile'"
    @show="onSetForm"
    @hide="resetValidate"
    hide-footer
    scrollable
  >
    <b-form ref="customerForm" @submit="onSubmit" class="content">
      <b-form-group class="information" label="ชื่อ">
        <b-form-input
          v-model="$v.form['first_name'].$model"
          :state="validateState('first_name')"
        ></b-form-input>
        <b-form-invalid-feedback
          >This is a required field</b-form-invalid-feedback
        >
      </b-form-group>
      <b-form-group class="information" label="นามสกุล">
        <b-form-input
          v-model="$v.form['last_name'].$model"
          :state="validateState('last_name')"
        ></b-form-input>
        <b-form-invalid-feedback
          >This is a required field</b-form-invalid-feedback
        >
      </b-form-group>
      <b-form-group class="information" label="อายุ">
        <b-form-input
          v-model="$v.form.age.$model"
          :state="validateState('age')"
        ></b-form-input>
        <b-form-invalid-feedback
          >This is a required field</b-form-invalid-feedback
        >
      </b-form-group>
      <b-form-group class="information" label="เพศ">
        <b-form-radio-group
          v-model="$v.form.sex.$model"
          :state="validateState('sex')"
          :options="genders"
          name="radio-inline"
        ></b-form-radio-group>
      </b-form-group>
      <b-form-group class="information" label="อีเมล">
        <b-form-input
          v-model="$v.form.email.$model"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback
          >This is a required field</b-form-invalid-feedback
        >
      </b-form-group>
      <b-form-group class="information" label="เบอร์โทรศัพท์">
        <b-form-input
          v-model="$v.form.tel.$model"
          :state="validateState('tel')"
        ></b-form-input>
        <b-form-invalid-feedback
          >This is a required field</b-form-invalid-feedback
        >
      </b-form-group>
      <b-form-group class="information" label="สถานะ">
        <b-form-select
          v-model="$v.form.status.$model"
          :state="validateState('status')"
          :options="statusOptions"
        ></b-form-select>
      </b-form-group>
      <b-form-group class="information" label="ความคิดเห็น">
        <b-form-textarea
          v-model="$v.form.remark.$model"
          :state="validateState('remark')"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
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
</template>

<script>
import { required, minLength, email, decimal } from 'vuelidate/lib/validators'
import { v4 as uuidv4 } from 'uuid';
import { mapState } from 'vuex'

export default {
  name: 'EditProfileModal',
  data() {
    return {
      form: {},
      genders: [
        { text: 'ชาย', value: 'M' },
        { text: 'หญิง', value: 'F' },
      ],
      statusOptions: [
        { value: 'active', text: 'Active' },
        { value: 'deactive', text: 'Deactive' },
      ],
    }
  },
  computed: {
    ...mapState({
      currentCustomer: 'currentCustomer',
      data: 'data',
    }),
  },
  validations: {
    form: {
      first_name: {
        required,
        minLength: minLength(1),
      },
      last_name: {
        required,
        minLength: minLength(1),
      },
      age: {
        required,
        decimal,
      },
      sex: {
        required,
      },
      email: {
        required,
        email,
      },
      tel: {
        required,
      },
      status: {
        required,
      },
      remark: {},
    },
  },
  methods: {
    resetValidate() {
      this.$v.$reset()
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    onSetForm() {
      this.form = { ...this.currentCustomer }
    },
    onCancel() {
      this.$refs.editModal.onCancel()
    },
    onSubmit(e) {
      e.preventDefault()
      this.$v.form.$touch()

      if (this.$v.form.$anyError) {
        return
      }
      const newCustomer = { ...this.form }

      delete newCustomer.name
      delete newCustomer.management

      if (this.form.id) {
        const index = this.data.findIndex((customer) => customer.id === this.form.id)
        const newData = [...this.data]
        newData[index] = newCustomer
        localStorage.setItem('data', JSON.stringify(newData))
      } else {
        newCustomer.id = uuidv4()
        const newData = [...this.data, newCustomer]
        localStorage.setItem('data', JSON.stringify(newData))
      }

      this.$refs.editModal.onOk()
      this.resetValidate()
      window.location.reload()
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sub-title {
  margin-bottom: 5px;
}
.information {
  margin-bottom: 10px;
}
.footer {
  float: right;
}
.button {
  margin-left: 10px;
}
</style>
