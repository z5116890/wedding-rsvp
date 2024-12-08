<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import NavigationMenu from './NavigationMenu.vue'
import { NButton, NDataTable, NModal, NCard, NForm, NFormItem, FormItemRule, NInput, NRow, NCol } from 'naive-ui'
import { GraphQL } from '@/services/beef';

export default defineComponent({
  name: 'UpdateAccommodationModal',
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
  },

  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    updateAccommodation: {
      type: Function,
      required: true
    },
    accommodationToUpdate: {
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

    const formRef = ref(null)

    const modelRef = ref({
      id: props.accommodationToUpdate.id,
      name: props.accommodationToUpdate.name,
      address: props.accommodationToUpdate.address,
      numRooms: props.accommodationToUpdate.numRooms,
      numGuests: props.accommodationToUpdate.numGuests,
    })

    watch(() => props.show, (value) => {
      if (value) {
        modelRef.value = {
          id: props.accommodationToUpdate.id,
          name: props.accommodationToUpdate.name,
          address: props.accommodationToUpdate.address,
          numRooms: props.accommodationToUpdate.numRooms,
          numGuests: props.accommodationToUpdate.numGuests,
        }
      }
    })

    const rules = {
      name: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value || value.trim() === '' || value.length === 0) {
              return new Error('Accommodation name is required')
            }
            return true
          },
          trigger: ['input', 'blur']
        }
      ],
      address: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value || value.trim() === '' || value.length === 0) {
              return new Error('Accommodation address is required')
            }
            return true
          },
          trigger: ['input', 'blur']
        }
      ],
      numRooms: [
        {
          required: true,
          validator(rule: FormItemRule, value: number) {
            // check if code is 4 digits and not letters
            if (!value) {
              return new Error('Number of rooms is required')
            }
            
            return true
          },
          trigger: ['input', 'blur']
        }
      ],
    }

    return {
      showModal,
      formRef,
      model: modelRef,
      rules,
      async handleValidateButtonClick(e: MouseEvent) {
        e.preventDefault()
        try {
          
          await formRef.value?.validate()
          // close modal
          emit('update:show', false)
          showModal.value = false

          await props.updateAccommodation(props.accommodationToUpdate.id, {
            name: modelRef.value.name,
            address: modelRef.value.address,
            numRooms: Number(modelRef.value.numRooms),
            numGuests: Number(modelRef.value.numGuests),
          })

        } catch (error) {
          console.log(error)
        }
        
      },
    }

  },
})
</script>
<template>
  <div>
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        :title="`Update Accommodation`"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-form ref="formRef" :model="model" :rules="rules">
          <n-form-item path="name" label="Accommodation Name:">
            <n-input v-model:value="model.name" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="address" label="Accommodation Address:">
            <n-input v-model:value="model.address" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="numRooms" label="Number of rooms:">
            <n-input v-model:value="model.numRooms" @keydown.enter.prevent />
          </n-form-item>
          <n-row :gutter="[0, 24]">
            <n-col :span="24">
              <div style="display: flex; justify-content: flex-end">
                <n-button
                  round
                  type="primary"
                  @click="handleValidateButtonClick"
                >
                  Update Accommodation
                </n-button>
              </div>
            </n-col>
          </n-row>
        </n-form>
      </n-card>
    </n-modal>
  </div>
</template>
<style lang="scss" scoped>
</style>
