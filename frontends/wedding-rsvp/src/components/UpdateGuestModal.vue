<script lang="ts">
import { PropType, computed, defineComponent, ref, watch } from 'vue'
import NavigationMenu from '../components/NavigationMenu.vue'
import { NButton, NDataTable, NModal, NCard, NForm, NFormItem, FormItemRule, NInput, NRow, NCol, NSelect, } from 'naive-ui'
import { GraphQL } from '@/services/beef'

export default defineComponent({
  name: 'UpdateGuestModal',
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
    NSelect,
  },

  props: {
    userToUpdate: {
      type: Object as PropType<GraphQL.User>,
      required: true
    },
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    updateGuestUser: {
      type: Function,
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

    const rsvpOptions = ref([
      { label: 'Yes', value: true },
      { label: 'No', value: false },
      { label: 'Maybe', value: null },
    ])

    const modelRef = ref({
      firstName: props.userToUpdate.firstName,
      lastName: props.userToUpdate.lastName,
      code: props.userToUpdate.code,
      rsvpReception: props.userToUpdate.rsvpReception,
      rsvpTeaCeremony: props.userToUpdate.rsvpTeaCeremony,
      numPlusOnes: props.userToUpdate.numPlusOnes,
      dietaryRestrictions: props.userToUpdate.dietaryRestrictions,
      welcomeMessage: props.userToUpdate.welcomeMessage,
    })

    watch(() => props.show, (value) => {
      if (value) {
        modelRef.value = {
          firstName: props.userToUpdate.firstName,
          lastName: props.userToUpdate.lastName,
          code: props.userToUpdate.code,
          rsvpReception: props.userToUpdate.rsvpReception,
          rsvpTeaCeremony: props.userToUpdate.rsvpTeaCeremony,
          numPlusOnes: props.userToUpdate.numPlusOnes,
          dietaryRestrictions: props.userToUpdate.dietaryRestrictions,
          welcomeMessage: props.userToUpdate.welcomeMessage,
        }
      }
    })

    const rules = {
      firstName: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value || value.trim() === '' || value.length === 0) {
              return new Error('First name is required')
            }
            return true
          },
          trigger: ['input', 'blur']
        }
      ],
      lastName: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value || value.trim() === '' || value.length === 0) {
              return new Error('Last name is required')
            }
            return true
          },
          trigger: ['input', 'blur']
        }
      ],
      code: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            // check if code is 4 digits and not letters
            if (!value || value.trim() === '' || value.length !== 4 || isNaN(Number(value))) {
              return new Error('Code is required and must be 4 digits')
            }
            
            return true
          },
          trigger: ['input', 'blur']
        }
      ],
      numPlusOnes: [
        {
          validator(rule: FormItemRule, value: string) {

            if (props.userToUpdate.type === 'plus_one') {
              return true
            }

            if (!value || isNaN(Number(value))) {
              return new Error('Number of plus ones is required')
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
      rsvpOptions,
      async handleValidateButtonClick(e: MouseEvent) {
        e.preventDefault()
        try {
          
          await formRef.value?.validate()
          // close modal
          emit('update:show', false)
          showModal.value = false

          await props.updateGuestUser(props.userToUpdate.id, {
            firstName: modelRef.value.firstName,
            lastName: modelRef.value.lastName,
            rsvpReception: modelRef.value.rsvpReception,
            rsvpTeaCeremony: modelRef.value.rsvpTeaCeremony,
            code: modelRef.value.code,
            numPlusOnes: Number(modelRef.value.numPlusOnes),
            dietaryRestrictions: modelRef.value.dietaryRestrictions,
            welcomeMessage: modelRef.value.welcomeMessage,
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
        title="Update Guest User"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-form ref="formRef" :model="model" :rules="rules">
          <n-form-item path="firstName" label="First Name:">
            <n-input v-model:value="model.firstName" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="lastName" label="Last Name:">
            <n-input v-model:value="model.lastName" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item v-if="userToUpdate.type === 'guest'" path="code" label="Code:">
            <n-input v-model:value="model.code" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item v-if="userToUpdate.type === 'guest'" path="numPlusOnes" label="Number of Plus Ones:">
            <n-input v-model:value="model.numPlusOnes" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="dietaryRestrictions" label="Dietary Restrictions:">
            <n-input v-model:value="model.dietaryRestrictions" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="rsvpReception" label="RSVP for Reception:">
            <n-select v-model:value="model.rsvpReception" :options="rsvpOptions" />
          </n-form-item>
          <n-form-item path="rsvpTeaCeremony" label="RSVP for Tea Ceremony:">
            <n-select v-model:value="model.rsvpTeaCeremony" :options="rsvpOptions" />
          </n-form-item>
          <n-form-item v-if="userToUpdate.type === 'guest'" path="welcomeMessage" label="Welcome Message:">
            <n-input v-model:value="model.welcomeMessage" @keydown.enter.prevent />
          </n-form-item>
          <n-row :gutter="[0, 24]">
            <n-col :span="24">
              <div style="display: flex; justify-content: flex-end">
                <n-button
                  round
                  type="primary"
                  @click="handleValidateButtonClick"
                >
                  Update Guest
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
