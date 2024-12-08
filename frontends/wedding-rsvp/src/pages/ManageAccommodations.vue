<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import NavigationMenu from '../components/NavigationMenu.vue'
import AddAccommodationModal from '../components/AddAccommodationModal.vue'
import UpdateAccommodationModal from '../components/UpdateAccommodationModal.vue'
import UpdateAccommodatedGuestsModal from '../components/UpdateAccommodatedGuestsModal.vue'
import AddAccommodatedGuestModal from '@/components/AddAccommodatedGuestModal.vue'
import AccommodationsTable from '@/components/AccommodationsTable.vue'
import { NButton, NDataTable, NModal, NCard, NForm, NFormItem, NInput, NRow, NCol } from 'naive-ui'
import { Accommodation } from '@/services/beef/types'

export default defineComponent({
  name: 'ManageAccommodations',
  components: {
    AccommodationsTable,
    AddAccommodationModal,
    UpdateAccommodationModal,
    UpdateAccommodatedGuestsModal,
    AddAccommodatedGuestModal,
    NavigationMenu,
    NDataTable,
    NButton,
    NModal,
    NCard,
    NFormItem,
    NInput,
    NRow,
    NCol,
    NForm,
  },

  setup() {

    const store = useStore()

    onMounted(async() => {
      await store.dispatch('getAccommodations')
    })

    const handleAddAccommodation = async (attrs: {
      name: string
      address: string
      numGuests: number
      numRooms: number
    }) => {
      await store.dispatch('addAccommodation', attrs)
      showManageAccommodationModal.value = false
    }

    const handleUpdateAccommodation = async (id: number, attrs: {
      name: string
      address: string
      numGuests: number
      numRooms: number
    }) => {
      await store.dispatch('updateAccommodation', { id, ...attrs })
      showUpdateAccommodationModal.value = false
    }

    const showManageAccommodationModal = ref(false)
    const showAddAccommodationModal = ref(false)
    const showUpdateAccommodationModal = ref(false)
    const showAddAccommodatedGuestModal = ref(false)
    const accommodationToUpdate = ref<Accommodation | null>(null)

    const openAddAccommodationModal = () => {
      showAddAccommodationModal.value = true
    }

    const manageAccommodatedGuestsKey = ref(0)
    const addAccommodatedGuestKey = ref(0)
    const accommodationsKey = ref(0)

    // const updateKeys = () => {
    //   manageAccommodatedGuestsKey.value++
    //   addAccommodatedGuestKey.value++
    //   accommodationsKey.value++
    // }

    const openManageAccommodationModal = (row: Accommodation) => {
      accommodationToUpdate.value = row
      showManageAccommodationModal.value = true
    }

    const openAddAccommodatedGuestModal = (row: Accommodation) => {
      accommodationToUpdate.value = row
      showAddAccommodatedGuestModal.value = true
    }

    const openUpdateAccommodationModal = (row: Accommodation) => {
      accommodationToUpdate.value = row
      showUpdateAccommodationModal.value = true
    }
    
    return {
      openManageAccommodationModal,
      openAddAccommodatedGuestModal,
      openUpdateAccommodationModal,
      // updateKeys,
      openAddAccommodationModal,
      showAddAccommodationModal,
      showUpdateAccommodationModal,
      showManageAccommodationModal,
      showAddAccommodatedGuestModal,
      handleAddAccommodation,
      handleUpdateAccommodation,
      accommodationToUpdate,
      manageAccommodatedGuestsKey,
      accommodationsKey,
    }

  },
})
</script>
<template>
  <div>
      <NavigationMenu />
      <div class="h-full flex justify-center items-center flex-col gap-6">
        <h1>Manage Accommodations</h1>
        <div class="flex justify-between w-11/12 flex-row-reverse">
          <div class="flex">
            <n-button @click="openAddAccommodationModal">
              Add accommodation
            </n-button>
          </div>
        </div>
        <div class="w-11/12">
          <AccommodationsTable
            :updateKey="accommodationsKey"
            @openAddAccommodatedGuestModal="openAddAccommodatedGuestModal"
            @openUpdateAccommodationModal="openUpdateAccommodationModal"
            @openManageAccommodationModal="openManageAccommodationModal"
          />
        </div>
      </div>
      <AddAccommodationModal 
        v-if="showAddAccommodationModal"
        v-model:show="showAddAccommodationModal" 
        :addAccommodation="handleAddAccommodation" 
        @update:show="showAddAccommodationModal = false" 
      />
      <UpdateAccommodationModal
        v-if="showUpdateAccommodationModal"
        v-model:show="showUpdateAccommodationModal" 
        :updateAccommodation="handleUpdateAccommodation" 
        :accommodationToUpdate="accommodationToUpdate" 
        @update:show="showUpdateAccommodationModal = false"
      />
      <UpdateAccommodatedGuestsModal
        :key="manageAccommodatedGuestsKey"
        v-if="showManageAccommodationModal"
        :accommodation="accommodationToUpdate"
        v-model:show="showManageAccommodationModal"
        @update:show="showManageAccommodationModal = false"
      />
      <AddAccommodatedGuestModal
        v-if="showAddAccommodatedGuestModal"
        :accommodationId="accommodationToUpdate.id"
        v-model:show="showAddAccommodatedGuestModal"
        @update:show="showAddAccommodatedGuestModal = false"
      />
  </div>
</template>
<style lang="scss" scoped>
</style>
