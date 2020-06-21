<template>
  <div class="detail-page">
    <div class="container" v-if="customer">
      <div class="header">
        <h3 class="title">คุณ {{ customer.name.fullName }}</h3>
        <div class="group-tools">
          <b-button
            v-b-modal.modal-edit-profile
            variant="primary"
            class="tools-button"
            @click="onSetCurrentCustomer(customer)"
            >แก้ไข</b-button
          >
          <b-button
            v-b-modal.modal-delete-profile
            variant="danger"
            class="tools-button"
            @click="onSetCurrentCustomer(customer)"
            >ลบ</b-button
          >
        </div>
      </div>
      <div class="content">
        <div class="group-information">
          <div class="information">
            <span class="sub-title">ชื่อ</span>{{ customer['first_name'] }}
          </div>
          <div class="information">
            <span class="sub-title">นามสกุล</span>{{ customer['last_name'] }}
          </div>
        </div>
        <div class="information">
          <span class="sub-title">อายุ</span>{{ customer.age }}
        </div>
        <div class="information">
          <span class="sub-title">เพศ</span
          >{{ customer.sex === 'F' ? 'หญิง' : 'ชาย' }}
        </div>
        <div class="information">
          <span class="sub-title">อีเมล</span>{{ customer.email }}
        </div>
        <div class="information">
          <span class="sub-title">เบอร์โทรศัพท์</span>{{ customer.tel }}
        </div>
        <div class="information">
          <span class="sub-title">สถานะ</span
          >{{ customer.status === 'active' ? 'Active' : 'Deactive' }}
        </div>
        <div class="information">
          <span class="sub-title">ความคิดเห็น</span
          >{{ customer.remark.length == 0 ? '-' : customer.remark }}
        </div>
      </div>
    </div>
    <EditProfileModal />
    <DeleteProfileModal />
  </div>
</template>

<script>
import EditProfileModal from './EditProfileModal'
import DeleteProfileModal from './DeleteProfileModal'
import { mapGetters, mapActions } from 'vuex'


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
      id: this.$route.params.id,
      customer: null,
    }
  },
  methods: {
    ...mapActions({
      setCurrentCustomer: 'setCurrentCustomer',
    }),
    onSetCurrentCustomer(customer) {
      this.setCurrentCustomer(customer)
    }
  },
  mounted() {
    this.customer = this.data.find((customer) => customer.id === this.id)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.detail-page {
  margin-top: 60px;
}
.title {
  margin: 0;
}
.sub-title {
  font-weight: 500;
  margin-right: 15px;
  width: 120px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.information {
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 10px;
  display: flex;
}
.group-information {
  display: flex;
  flex-wrap: wrap;
  .information {
    margin-right: 100px;
  }
}
.tools-button {
  margin: 5px;
}
.group-tools {
  display: flex;
}
</style>
