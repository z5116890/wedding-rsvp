<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import NavigationMenu from '../components/NavigationMenu.vue'
import { NButton, NDataTable, NModal, NCard, NForm, NFormItem, FormItemRule, NInput, NRow, NCol } from 'naive-ui'

export default defineComponent({
  name: 'AddAdminModal',
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
    NForm
  },

  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    addAdminUser: {
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
    const rPasswordFormItemRef = ref(null)
    const modelRef = ref({
      firstName: null,
      lastName: null,
      username: null,
      password: null,
      reenteredPassword: null
    })
    function validatePasswordStartWith(
      rule: FormItemRule,
      value: string
    ): boolean {
      return (
        !!modelRef.value.password
        && modelRef.value.password.startsWith(value)
        && modelRef.value.password.length >= value.length
      )
    }
    function validatePasswordSame(rule: FormItemRule, value: string): boolean {
      return value === modelRef.value.password
    }
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
      username: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value || value.trim() === '' || value.length === 0) {
              return new Error('username is required')
            }
            return true
          },
          trigger: ['input', 'blur']
        }
      ],
      password: [
        {
          required: true,
          message: 'Password is required'
        }
      ],
      reenteredPassword: [
        {
          required: true,
          message: 'Re-entered password is required',
          trigger: ['input', 'blur']
        },
        {
          validator: validatePasswordStartWith,
          message: 'Password is not same as re-entered password!',
          trigger: 'input'
        },
        {
          validator: validatePasswordSame,
          message: 'Password is not same as re-entered password!',
          trigger: ['blur', 'password-input']
        }
      ]
    }

    return {
      showModal,
      formRef,
      model: modelRef,
      rules,
      handlePasswordInput() {
        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
        }
      },
      async handleValidateButtonClick(e: MouseEvent) {
        e.preventDefault()
        try {
          
          await formRef.value?.validate()
          // close modal
          emit('update:show', false)
          showModal.value = false

          await props.addAdminUser({
            firstName: modelRef.value.firstName,
            lastName: modelRef.value.lastName,
            username: modelRef.value.username,
            password: modelRef.value.password,
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
        title="Add Admin User"
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
          <n-form-item path="username" label="Username:">
            <n-input v-model:value="model.username" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="password" label="Password:">
            <n-input
              v-model:value="model.password"
              type="password"
              @input="handlePasswordInput"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-form-item
            ref="rPasswordFormItemRef"
            first
            path="reenteredPassword"
            label="Re-enter Password"
          >
            <n-input
              v-model:value="model.reenteredPassword"
              :disabled="!model.password"
              type="password"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-row :gutter="[0, 24]">
            <n-col :span="24">
              <div style="display: flex; justify-content: flex-end">
                <n-button
                  round
                  type="primary"
                  @click="handleValidateButtonClick"
                >
                  Add admin
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
