<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import NavigationMenu from '../components/NavigationMenu.vue'
import { NButton, NDataTable, NModal, NCard, NForm, NFormItem, FormItemRule, NInput, NRow, NCol } from 'naive-ui'
import { GuestType } from '@/services/beef/types'

export default defineComponent({
  name: 'AddGuestModal',
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
    addGuestUser: {
      type: Function,
      required: true
    },
    userType: {
      type: String,
      required: true,
      default: GuestType.guest
    },
    plusOneOf: {
      type: Number,
      required: false,
      default: null
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
      type: props.userType,
      firstName: null,
      lastName: null,
      code: props.userType === GuestType.guest ? null : Math.floor(1000 + Math.random() * 9000).toString(),
      numPlusOnes: 0,
      dietaryRestrictions: '',
      plusOneOf: props.plusOneOf,
      welcomeMessage: '',
    })

    watch(() => props.show, (value) => {
      if (value) {
        modelRef.value = {
          type: props.userType,
          firstName: null,
          lastName: null,
          code: null,
          numPlusOnes: 0,
          dietaryRestrictions: '',
          plusOneOf: props.plusOneOf,
          welcomeMessage: '',
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
            if (!value || isNaN(Number(value))) {
              return new Error('Enter a valid number')
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

          await props.addGuestUser({
            firstName: modelRef.value.firstName,
            lastName: modelRef.value.lastName,
            type: modelRef.value.type,
            code: modelRef.value.code,
            numPlusOnes: Number(modelRef.value.numPlusOnes),
            dietaryRestrictions: modelRef.value.dietaryRestrictions,
            plusOneOf: modelRef.value.plusOneOf ?? undefined,
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
        :title="`Add ${userType === 'guest' ? 'Guest' : 'Plus One'} User`"
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
          <n-form-item v-if="userType === 'guest'" path="code" label="Code:">
            <n-input v-model:value="model.code" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item v-if="userType === 'guest'" path="numPlusOnes" label="Number of Plus Ones:">
            <n-input v-model:value="model.numPlusOnes" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="dietaryRestrictions" label="Dietary Restrictions:">
            <n-input v-model:value="model.dietaryRestrictions" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item v-if="userType === 'guest'" path="welcomeMessage" label="Welcome Message:">
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
                  Add {{ userType === 'guest' ? 'Guest' : 'Plus One' }}
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
