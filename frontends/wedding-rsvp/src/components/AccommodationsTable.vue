<script lang="ts">
import { defineComponent, h, computed } from 'vue'
import NavigationMenu from '../components/NavigationMenu.vue'
import AddAccommodationModal from '../components/AddAccommodationModal.vue'
import UpdateAccommodationModal from '../components/UpdateAccommodationModal.vue'
import UpdateAccommodatedGuestsModal from '../components/UpdateAccommodatedGuestsModal.vue'
import AddAccommodatedGuestModal from '@/components/AddAccommodatedGuestModal.vue'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NDataTable, NModal, NCard, NForm, NFormItem, useDialog, NInput, NRow, NCol, useMessage } from 'naive-ui'
import { Accommodation } from '@/services/beef/types'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'AccommodationsTable',
  components: {
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
  emits: ['openManageAccommodationModal', 'openAddAccommodatedGuestModal', 'openUpdateAccommodationModal'],
  props: {
    updateKey: {
      type: Number,
      required: true
    },
  },
  setup(props, { emit }) {

    function createColumns({
      manageAccommodation,
      addAccommodatedGuest,
      updateAccommodation,
      deleteAccommodation,
    }: {
      manageAccommodation: (row: Accommodation) => void
      addAccommodatedGuest: (row: Accommodation) => void
      updateAccommodation: (row: Accommodation) => void
      deleteAccommodation: (row: Accommodation) => void
    }): DataTableColumns<Accommodation> {
      return [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Address',
          key: 'address'
        },
        {
          title: 'Number of Guests',
          key: 'numGuests'
        },
        {
          title: 'Number of Rooms',
          key: 'numRooms'
        },
        {
          title: 'Action',
          key: 'actions',
          render(row) {

            const actions = [ 
              h(
                NButton,
                {
                  strong: true,
                  tertiary: true,
                  size: 'small',
                  class: 'mx-1',
                  onClick: () => manageAccommodation(row)
                },
                { default: () => 'Manage' }
              ),
              h(
                NButton,
                {
                  strong: true,
                  tertiary: true,
                  size: 'small',
                  class: 'mx-1',
                  onClick: () => addAccommodatedGuest(row)
                },
                { default: () => 'Add Guest' }
              ),
              h(
                NButton,
                {
                  strong: true,
                  tertiary: true,
                  size: 'small',
                  class: 'mx-1',
                  onClick: () => updateAccommodation(row)
                },
                { default: () => 'Update' }
              ),
              h(
                NButton,
                {
                  strong: true,
                  tertiary: true,
                  size: 'small',
                  class: 'mx-1',
                  onClick: () => deleteAccommodation(row)
                },
                { default: () => 'Delete' }
              ),
            ]

            return actions

          }
        },
      ]
    }

    const store = useStore()

    const accommodations = computed(() => store.state.accommodations)
    const loadingAccommodations = computed(() => store.state.loadingAccommodations)

    const message = useMessage()
    const dialog = useDialog()

    return {
      accommodations,
      loadingAccommodations,
      accommodationTableColumns: createColumns({
        manageAccommodation: (row: Accommodation) => {
          // accommodationToUpdate.value = row
          // showManageAccommodationModal.value = true
          emit('openManageAccommodationModal', row)
        },
        addAccommodatedGuest: (row: Accommodation) => {
          // accommodationToUpdate.value = row
          // showAddAccommodatedGuestModal.value = true
          emit('openAddAccommodatedGuestModal', row)
        },
        updateAccommodation: (row: Accommodation) => {
          // accommodationToUpdate.value = row
          // showUpdateAccommodationModal.value = true
          emit('openUpdateAccommodationModal', row)
        },
        deleteAccommodation: (row: Accommodation) => {
          dialog.error({
            title: 'Delete Accommodation',
            content: `Are you sure you want to delete this accommodation?`,
            positiveText: 'Delete',
            negativeText: 'Cancel',
            onPositiveClick: () => {
              store.dispatch('deleteAccommodation', row.id)
              message.success('Accommodation deleted')
            },
          })
        },
      }),
      pagination: {
        pageSize: 10
      },
    }

  },
})
</script>
<template>
  <div v-if="!loadingAccommodations">
    <n-data-table
      :loading="loadingAccommodations"
      size="large"
      :columns="accommodationTableColumns"
      :data="accommodations"
      :pagination="pagination"
      :bordered="true"
    />
  </div>
</template>
<style lang="scss" scoped>
</style>
