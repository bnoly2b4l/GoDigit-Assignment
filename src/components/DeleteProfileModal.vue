<template>
  <div>
    <b-modal v-if="currentCustomer" ref="deleteModal" id="modal-delete-profile" hide-header>
      <p class="text">
        คุณต้องการจะลบข้อมูลของ <span class="name">{{ currentCustomer.name.fullName }}</span> ใช่หรือไม่
        ?
      </p>
      <template v-slot:modal-footer="{ cancel }">
        <b-button size="sm" variant="primary" @click="cancel()">
          Cancel
        </b-button>
        <b-button size="sm" variant="danger" @click="onDelete">
          OK
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'deleteProfileModal',
  computed: {
    ...mapState({
      currentCustomer: 'currentCustomer',
      data: 'data'
    }),
    ...mapGetters({
      customers: 'customers'
    })
  },
  methods: {
    onDelete() {
      const newData = [...this.data]
      const index = this.data.findIndex((customer) => customer.id === this.currentCustomer.id)
      newData.splice(index, 1)
      localStorage.setItem('data', JSON.stringify(newData))
      this.$refs.deleteModal.onOk()
      this.$router.replace('/')
      window.location.reload()
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text {
  font-weight: 300;
}
.name {
  font-weight: 500;
  margin: 0 5px;
}
</style>
