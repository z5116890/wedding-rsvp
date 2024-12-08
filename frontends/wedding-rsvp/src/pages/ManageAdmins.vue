<script lang="ts">
import { defineComponent, onMounted, h, ref, computed } from 'vue'
import NavigationMenu from '../components/NavigationMenu.vue'
import AddAdminModal from '../components/AddAdminModal.vue'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NDataTable, NModal, NCard, NForm, NFormItem, NInput, NRow, NCol, useMessage, NMessageProvider } from 'naive-ui'
import { Admin } from '@/services/beef/types'
import { useStore } from 'vuex'

function createColumns({
  deleteUser,
}: {
  deleteUser: (row: Admin) => void
}): DataTableColumns<Admin> {
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
      title: 'Username',
      key: 'username'
    },
    {
      title: 'Action',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            type: 'error',
            onClick: () => deleteUser(row)
          },
          { default: () => 'Delete' }
        )
      }
    }
  ]
}

export default defineComponent({
  name: 'ManageAdmins',
  components: {
    AddAdminModal,
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
    NMessageProvider,
  },

  setup() {

    const store = useStore()

    const admins = computed(() => store.state.admins)
    const loadingAdmins = computed(() => store.state.loadingAdmins)

    const handleAddAdminUser = async (attrs: {
      firstName: string
      lastName: string
      username: string
      password: string
    }) => {
      await store.dispatch('addAdminUser', attrs)
      showAddAdminModal.value = false
    }

    const showAddAdminModal = ref(false)

    const message = useMessage()

    onMounted(async () => {
      await store.dispatch('getAdmins')
    })

    return {
      admins,
      loadingAdmins,
      showAddAdminModal,
      handleAddAdminUser,
      columns: createColumns({
        deleteUser: async (row: Admin) => {
          message.success('Admin user deleted')
          await store.dispatch('deleteAdminUser', row.id)
        }
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
        <h1>Manage Admins</h1>
        <div class="flex w-11/12 flex-row-reverse paddin">
          <n-button @click="showAddAdminModal = true">
            Add admin user
          </n-button>
        </div>
        <div class="w-11/12">
          <n-data-table
            :loading="loadingAdmins"
            size="large"
            :columns="columns"
            :data="admins"
            :pagination="pagination"
            :bordered="true"
          />
        </div>  
      </div>
      <AddAdminModal v-model:show="showAddAdminModal" :addAdminUser="handleAddAdminUser" @update:show="showAddAdminModal = false" />
  </div>
</template>
<style lang="scss" scoped>
</style>
