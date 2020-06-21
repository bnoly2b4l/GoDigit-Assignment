<template>
  <div class="data-table-page">
    <div class="container">
      <b-button
        v-b-modal.modal-edit-profile
        class="add-button"
        variant="info"
        @click="onSetCurrentCustomer(null)"
        >เพิ่มข้อมูล</b-button
      >
      <h3 class="title">รายชื่อลูกค้า</h3>
      <b-table hover bordered :fields="fields" :items="customers">
        <template v-slot:cell(name)="name">
          <router-link :to="'/detail/' + name.value.id">{{
            name.value.fullName
          }}</router-link>
        </template>
        <template v-slot:cell(sex)="sex">
          <p>{{ sex.value === 'F' ? 'หญิง' : 'ชาย' }}</p>
        </template>
        <template v-slot:cell(status)="status">
          <p :class="{ status: true, active: status.value === 'active' }">
            {{ status.value === 'active' ? 'Active' : 'Deactive' }}
          </p>
        </template>
        <template v-slot:cell(management)="data">
          <div class="group-tools">
            <b-button
              v-b-modal.modal-edit-profile
              variant="primary"
              class="tools-button"
              @click="onSetCurrentCustomer(data.value)"
              >แก้ไข</b-button
            >
            <b-button
              v-b-modal.modal-delete-profile
              variant="danger"
              class="tools-button"
              @click="onSetCurrentCustomer(data.value)"
              >ลบ</b-button
            >
          </div>
        </template>
      </b-table>
    </div>
    <EditProfileModal />
    <DeleteProfileModal />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EditProfileModal from './EditProfileModal'
import DeleteProfileModal from './DeleteProfileModal'
export default {
  name: 'DataTablePage',
  components: {
    EditProfileModal,
    DeleteProfileModal,
  },
  computed: {
    ...mapGetters({
      data: 'customers',
    }),
  },
  data() {
    return {
      currentCustomer: null,
      fields: [
        { key: 'name', label: 'ชื่อ-นามสกุล' },
        { key: 'age', label: 'อายุ' },
        { key: 'sex', label: 'เพศ' },
        { key: 'status', label: 'สถานะ' },
        { key: 'management', label: 'การจัดการ' },
      ],
      customers: [],
    }
  },
  methods: {
    ...mapActions({
      setCurrentCustomer: 'setCurrentCustomer',
    }),
    onSetCurrentCustomer(id) {
      let currentCustomer = {}
      if (id) {
        currentCustomer = this.customers.find((customer) => customer.id === id)
      } else {
        currentCustomer = {
          id: null,
          first_name: '',
          last_name: '',
          name: {
            fullName: '',
            id: ''
          },
          age: '',
          sex: '',
          email: '',
          tel: '',
          status: '',
          remark: '',
        }
      }
      this.setCurrentCustomer(currentCustomer)
    },
  },
  mounted() {
    this.customers = this.data
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.data-table-page {
  margin-top: 60px;
}
.title {
  text-align: center;
  margin-bottom: 20px;
}
.status {
  color: red;
}
.active {
  color: #00ad00;
}
.tools-button {
  margin: 5px;
}
.group-tools {
  display: flex;
}
.add-button {
  float: right;
}
</style>
