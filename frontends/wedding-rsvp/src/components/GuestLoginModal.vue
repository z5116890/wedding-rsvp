<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import NavigationMenu from '../components/NavigationMenu.vue'
import { NButton, NDataTable, NModal, NCard, NForm, NFormItem, FormItemRule, NInput, NRow, NCol } from 'naive-ui'

export default defineComponent({
  name: 'GuestLoginModal',
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
  },
  emits: ['update:show', 'login'],
  setup(props, { emit }) {
    
    const showModal = computed<boolean>({
      get: () => props.show,
      set: (value: any) => { emit('update:show', value) },
    })

    const formRef = ref(null)

    const modelRef = ref({
      lastName: null,
      code: null,
    })

    watch(() => props.show, (value) => {
      if (value) {
        modelRef.value = {
          lastName: null,
          code: null,
        }
      }
    })

    const rules = {
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
              return new Error('Please enter valid code')
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
          emit('login', modelRef.value)

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
    <n-modal v-model:show="showModal" :close-on-esc="false" :mask-closable="false">
      <n-card
        style="width: 600px"
        title="Please enter your last name and the wedding code you received"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-form ref="formRef" :model="model" :rules="rules">
          <n-form-item path="lastName" label="Last Name:">
            <n-input v-model:value="model.lastName" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="code" label="Code:">
            <n-input v-model:value="model.code" @keydown.enter.prevent />
          </n-form-item>
          <n-row :gutter="[0, 24]">
            <n-col :span="24">
              <div style="display: flex; justify-content: flex-end">
                <n-button
                  round
                  type="primary"
                  @click="handleValidateButtonClick"
                >
                  Next
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
