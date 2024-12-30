<script lang="ts">
import { defineComponent, onMounted, h, ref, computed } from 'vue'
import NavigationMenu from '../components/NavigationMenu.vue'
import AddGuestModal from '../components/AddGuestModal.vue'
import UpdateGuestModal from '../components/UpdateGuestModal.vue'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NDataTable, NModal, NCard, NForm, NFormItem, useDialog, NInput, NRow, NCol, useMessage } from 'naive-ui'
import { GuestType, User } from '@/services/beef/types'
import { useStore } from 'vuex'

function createColumns({
  deleteUser,
  editUser,
  addPlusOne,
}: {
  deleteUser: (row: User) => void
  editUser: (row: User) => void
  addPlusOne?: (row: User) => void
}): DataTableColumns<User> {
  return [
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: 'First Name',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      key: 'lastName'
    },
    {
      title: 'Code',
      key: 'code'
    },
    {
      title: 'RSVP for Reception',
      key: 'rsvpReception',
      render(row) {
        if (row.rsvpReception === true) {
          return 'Yes'
        } else if (row.rsvpReception === false) {
          return 'No'
        } else {
          return 'Maybe'
        }
      }
    },
    {
      title: 'RSVP for Tea Ceremony',
      key: 'rsvpTeaCeremony',
      render(row) {
        if (row.rsvpTeaCeremony === true) {
          return 'Yes'
        } else if (row.rsvpTeaCeremony === false) {
          return 'No'
        } else {
          return 'Maybe'
        }
      }
    },
    ...addPlusOne ? [
      {
        title: 'Number Of Plus Ones',
        key: 'numPlusOnes'
      },
    ] : [
      {
        title: 'Plus One Of',
        key: 'plusOneOf'
      },
    ],
    {
      title: 'Dietary Restrictions',
      key: 'dietaryRestrictions'
    },
    {
      title: 'Welcome Message',
      key: 'welcomeMessage'
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
              onClick: () => editUser(row)
            },
            { default: () => 'Edit' }
          ),
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              type: 'error',
              class: 'mx-1',
              onClick: () => deleteUser(row)
            },
            { default: () => 'Delete' }
          )
        ]

        if (row.numPlusOnes > 0) {
          return [
            h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: 'small',
                class: 'mx-1',
                onClick: () => addPlusOne(row)
              },
              { default: () => 'Add Plus One' }
            ),
            ...actions
          ]
        }
        
        return actions

      }
    },
  ]
}

export default defineComponent({
  name: 'ManageGuests',
  components: {
    AddGuestModal,
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
    UpdateGuestModal,
  },

  setup() {

    const store = useStore()

    const guests = computed(() => store.getters.guests)
    const plusOnes = computed(() => store.getters.plusOnes)
    const loadingUsers = computed(() => store.state.loadingUsers)

    const filter = ref({
      firstName: '',
      lastName: '',
    })

    const searchUsers = () => {
      store.dispatch('getUsers', { filter: { ...filter.value }, pagination: { page: 1, pageSize: 10 } })
    }

    const clearSearch = () => {
      filter.value = {
        firstName: '',
        lastName: '',
      }
      store.dispatch('getUsers', { filter: { ...filter.value }, pagination: { page: 1, pageSize: 10 } })
    }

    const handleAddGuestUser = async (attrs: {
      firstName: string
      lastName: string
      type: string
      code: string
      numPlusOnes: number
      dietaryRestrictions: string
      plusOneOf?: number
      welcomeMessage: string
    }) => {
      await store.dispatch('addUser', attrs)
      showAddGuestModal.value = false
    }

    const handleUpdateGuestUser = (
      id: number, 
      attrs: {
        firstName: string
        lastName: string
        rsvpReception: boolean
        rsvpTeaCeremony: boolean
        code: string
        numPlusOnes: number
        dietaryRestrictions: string
        welcomeMessage: string
      }) => {
      store.dispatch('updateUser', { id, ...attrs })
      message.success('User updated')
      showUpdateGuestModal.value = false
    }

    const showAddGuestModal = ref(false)
    const addUserType = ref(GuestType.guest)
    const showUpdateGuestModal = ref(false)
    const userToUpdate = ref<User | null>(null)

    const openAddGuestModal = () => {
      showAddGuestModal.value = true
      addUserType.value = GuestType.guest
    }

    const openAddPlusOneModal = () => {
      showAddGuestModal.value = true
      addUserType.value = GuestType.plus_one
    }

    const message = useMessage()
    const dialog = useDialog()

    onMounted(async () => {
      await store.dispatch('getUsers', { filter: {}, pagination: { page: 1, pageSize: 10 } })
    })

    return {
      guests,
      plusOnes,
      filter,
      searchUsers,
      clearSearch,
      loadingUsers,
      showAddGuestModal,
      handleAddGuestUser,
      showUpdateGuestModal,
      handleUpdateGuestUser,
      userToUpdate,
      openAddGuestModal,
      addUserType,
      plusOneTableColumns: createColumns({
        deleteUser: (row: User) => {
          dialog.error({
            title: 'Delete User',
            content: `Are you sure you want to delete ${row.firstName} ${row.lastName}?`,
            positiveText: 'Delete',
            negativeText: 'Cancel',
            onPositiveClick: () => {
              store.dispatch('deleteUser', row.id)
              message.success('User deleted')
            },
          })
        },
        editUser: (row: User) => {
          userToUpdate.value = row
          showUpdateGuestModal.value = true
        },
      }),
      guestTableColumns: createColumns({
        deleteUser: (row: User) => {
          dialog.error({
            title: 'Delete User',
            content: `Are you sure you want to delete ${row.firstName} ${row.lastName}?`,
            positiveText: 'Delete',
            negativeText: 'Cancel',
            onPositiveClick: () => {
              store.dispatch('deleteUser', row.id)
              message.success('User deleted')
            },
          })
        },
        editUser: (row: User) => {
          userToUpdate.value = row
          showUpdateGuestModal.value = true
        },
        addPlusOne: (row: User) => {
          if (plusOnes.value.filter(plusOne => plusOne.plusOneOf === row.id).length >= row.numPlusOnes) {
            message.error('You have reached the maximum number of plus ones for this user')
            return
          }
          userToUpdate.value = row
          openAddPlusOneModal()
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
  <div>
      <NavigationMenu />
      <div class="h-full flex justify-center items-center flex-col gap-6">
        <h1>Manage Guests</h1>
        <div class="flex justify-between w-11/12">
          <div class="flex gap-2">
            <n-input v-model:value="filter.firstName" type="text" placeholder="First Name" />
            <n-input v-model:value="filter.lastName" type="text" placeholder="Last Name" />
            <n-button secondary type="info" @click="searchUsers">
                Search
            </n-button>
            <n-button secondary @click="clearSearch">
                Clear
            </n-button>
          </div>
          <div class="flex flex-row-reverse">
            <n-button @click="openAddGuestModal">
              Add guest user
            </n-button>
          </div>
        </div>
        <div class="w-11/12">
          <n-data-table
            :loading="loadingUsers"
            size="large"
            :columns="guestTableColumns"
            :data="guests"
            :pagination="pagination"
            :bordered="true"
          />
        </div>  
      </div>
      <div class="h-full flex justify-center items-center flex-col gap-6">
        <h1>Manage Plus Ones</h1>
        <div class="w-11/12">
          <n-data-table
            :loading="loadingUsers"
            size="large"
            :columns="plusOneTableColumns"
            :data="plusOnes"
            :pagination="pagination"
            :bordered="true"
          />
        </div>  
      </div>
      <AddGuestModal 
        v-if="showAddGuestModal"
        :userType="addUserType"
        :plusOneOf="userToUpdate?.id"
        v-model:show="showAddGuestModal" 
        :addGuestUser="handleAddGuestUser" 
        @update:show="showAddGuestModal = false" 
      />
      <UpdateGuestModal
        v-if="userToUpdate && showUpdateGuestModal"
        v-model:show="showUpdateGuestModal" 
        :updateGuestUser="handleUpdateGuestUser" 
        :userToUpdate="userToUpdate" 
        @update:show="showUpdateGuestModal = false"
      />
  </div>
</template>
<style lang="scss" scoped>
</style>
