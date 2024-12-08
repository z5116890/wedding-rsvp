<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import NavigationMenu from './NavigationMenu.vue'
import { NButton, NDataTable, NModal, NCard, NForm, NFormItem, NSelect, NInput, NRow, NCol, NDatePicker, useMessage } from 'naive-ui'
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AddAccommodatedGuestModal',
  components: {
    NavigationMenu,
    NDataTable,
    NButton,
    NModal,
    NCard,
    NFormItem,
    NInput,
    NRow,
    NCol,
    NSelect,
    NForm,
    NDatePicker,
  },

  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    accommodationId: {
      type: Number,
      required: true
    }
  },
  emits: ['update:show'],
  setup(props, { emit }) {
    
    const showModal = computed<boolean>({
      get: () => props.show,
      set: (value: any) => { emit('update:show', value) },
    })

    const store = useStore()
    const users = computed(() => store.state.users.map((user) => {
      return {
        label: `${user.firstName} ${user.lastName}`,
        value: user.id,
      }
    }))
    const guests = computed(() => store.getters.guests)
    const plusOnes = computed(() => store.getters.plusOnes)
    const loadingUsers = computed(() => store.state.loadingUsers)


    onMounted(async () => {
      await store.dispatch('getUsers', { filter: {}, pagination: { page: 1, pageSize: 100 } })
    })

    watch(() => props.show, (value) => {
      if (value) {
        store.dispatch('getUsers', { filter: {}, pagination: { page: 1, pageSize: 100 } })
      }
    })

    const message = useMessage()

    const addGuestToAccommodation = (userId: number) => {
      store.dispatch('addAccommodatedGuest', { 
        accommodationId: props.accommodationId, 
        userId, 
        checkInDate: new Date(checkInDate.value).toISOString().split('T')[0], 
        checkOutDate: new Date(checkOutDate.value).toISOString().split('T')[0], 
      })
      message.success('Accommodated guest added')
      showModal.value = false
    }

    const checkInDate = ref(null)
    const checkOutDate = ref(null)

    const selectedGuest = ref(null)

    return {
      showModal,
      selectedGuest,
      loadingUsers,
      users,
      addGuestToAccommodation,
      checkInDate,
      checkOutDate,
    }

  },
})
</script>
<template>
  <div>
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        :title="`Add Accommodated Guest`"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
      <n-select
        v-if="!loadingUsers"
        v-model:value="selectedGuest"
        filterable
        placeholder="Please select a guest to add to this accommodation"
        :options="users"
      />
      Check-in Date
      <n-date-picker
        v-model:formatted-value="checkInDate"
        value-format="yyyy-MM-dd"
        clearable
      />
      Check-out Date
      <n-date-picker
        v-model:formatted-value="checkOutDate"
        value-format="yyyy-MM-dd"
        clearable
      />
      <n-button
        v-if="!loadingUsers"
        @click="addGuestToAccommodation(selectedGuest)"
        :disabled="!selectedGuest"
      >
        Add
      </n-button>
      </n-card>
    </n-modal>
  </div>
</template>
<style lang="scss" scoped>
</style>
