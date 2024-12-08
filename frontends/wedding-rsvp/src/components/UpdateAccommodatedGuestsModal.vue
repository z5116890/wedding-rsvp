<script lang="ts">
import { computed, defineComponent, h, onMounted, PropType, ref, watch } from 'vue'
import NavigationMenu from './NavigationMenu.vue'
import { NButton, NDataTable, NModal, NCard, NForm, NFormItem, DataTableColumns, NInput, NRow, NCol, useMessage, useDialog, NDatePicker } from 'naive-ui'
import { GraphQL } from '@/services/beef';
import { AccommodatedGuest } from '@/services/beef/types';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'UpdateAccommodatedGuestsModal',
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
    NForm,
    NDatePicker,
  },

  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    accommodation: {
      type: Object as PropType<GraphQL.Accommodation>,
      required: true
    }
  },
  emits: ['update:show'],
  setup(props, { emit }) {
    
    const showModal = computed<boolean>({
      get: () => props.show,
      set: (value: any) => { emit('update:show', value) },
    })

    function createColumns({
      deleteAccommodatedGuest,
    }: {
      deleteAccommodatedGuest: (row: AccommodatedGuest) => void
    }): DataTableColumns<AccommodatedGuest> {
      return [
        {
          title: 'First Name',
          key: 'firstName',
        },
        {
          title: 'Last Name',
          key: 'lastName'
        },
        {
          title: 'Check In Date',
          key: 'checkInDate',
          render(row, index) {
            return h(NDatePicker, {
              value: row.checkInDate,
              valueFormat: 'yyyy-MM-dd',
              onUpdateValue(v) {
                data.value[index] = {
                  ...data.value[index],
                  checkInDate:  new Date(v).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).split(',')[0]
                }
              }
            })
          }
        },
        {
          title: 'Check Out Date',
          key: 'checkOutDate',
          render(row, index) {
            return h(NDatePicker, {
              value: row.checkOutDate,
              valueFormat: 'yyyy-MM-dd',
              onUpdateValue(v) {
                data.value[index] = {
                  ...data.value[index],
                  checkOutDate: new Date(v).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).split(',')[0]
                }
              }
            })
          }
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
                  onClick: () => deleteAccommodatedGuest(row)
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
    const accommodatedGuests = computed(() => store.state.accommodatedGuests)
    const loadingAccommodatedGuests = computed(() => store.state.loadingAccommodatedGuests)

    const data = ref<AccommodatedGuest[]>([])
    const message = useMessage()
    const dialog = useDialog()
    const saveDisabled = ref(true)

    onMounted(async () => {
      await store.dispatch('getAccommodatedGuests', props.accommodation.id).then((res: AccommodatedGuest[]) => {
        data.value = [...res]
      })
    })

    const save = () => {
      for (const guest of data.value) {
        store.dispatch('updateAccommodatedGuest', {
          accommodationId: guest.accommodationId,
          userId: guest.userId,
          checkInDate: guest.checkInDate,
          checkOutDate: guest.checkOutDate,
        })
      }
      message.success('Accommodated guests updated')
      showModal.value = false
    }

    watch(data, (newData) => {
      saveDisabled.value = JSON.stringify(newData) === JSON.stringify(accommodatedGuests.value)
    }, { deep: true })

    watch(accommodatedGuests, (newData) => {
      data.value = [...newData]
    })
    
    return {
      save,
      data,
      showModal,
      loadingAccommodatedGuests,
      accommodatedGuests,
      saveDisabled,
      pagination: {
        pageSize: 10
      },
      accommodationTableColumns: createColumns({
        deleteAccommodatedGuest: (row: AccommodatedGuest) => {
          dialog.error({
            title: 'Delete Accommodated Guest',
            content: `Are you sure you want to delete this accommodated guest?`,
            positiveText: 'Delete',
            negativeText: 'Cancel',
            onPositiveClick: () => {
              store.dispatch('deleteAccommodatedGuest', { userId: row.userId, accommodationId: row.accommodationId })
              emit('update:accommodations')
              message.success('Accommodated guest deleted')
              showModal.value = false
            },
          })
        },
      }),
    }

  },
})
</script>
<template>
  <div>
    <n-modal v-model:show="showModal">
      <n-card
        v-if="accommodation"
        style="width: 800px"
        :title="`Update Accommodated Guests for ${accommodation.name}`"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
      <div>
        {{ saveDisabled }}
        <n-data-table
          :key="JSON.stringify(data)"
          :loading="loadingAccommodatedGuests"
          size="large"
          :columns="accommodationTableColumns"
          :data="data"
          :pagination="pagination"
          :bordered="true"
        />
        <div class="flex justify-end gap-2 mt-10">
        <n-button @click="save" :disabled="saveDisabled">
          Save
        </n-button>
      </div>
      </div>
      </n-card>
    </n-modal>
  </div>
</template>
<style lang="scss" scoped>
</style>
