<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useLoginAdmin } from '../services/use/use-login-admin'
import { NButton, NForm, NFormItemRow, NInput, NTabs, NTabPane, useMessage } from 'naive-ui'
import { useStore } from 'vuex';
import router from '../router'

export default defineComponent({
  name: 'AdminLogin',
  components: {
    NButton,
    NForm,
    NFormItemRow,
    NInput,
    NTabs,
    NTabPane,
  },

  setup() {

    const username = ref(null)
    const password = ref(null)

    const store = useStore()

    const message = useMessage()

    const handleLogin = async () => {
      try {
        await store.dispatch('getLoggedInAdmin', {
          username: username.value,
          password: password.value,
        })
        router.push({ name: 'ManageAdmins' })
        message.success(`Welcome ${store.state.loggedInAdmin?.firstName}`)
      } catch (error) {
        message.error('Invalid login')
      }
    }

    const {
      adminUser,
      loadingAdminUser,
      adminUserLoaded,
      adminLogin,
    } = useLoginAdmin()

    return {
      username,
      password,
      adminUser,
      loadingAdminUser,
      adminLogin,
      adminUserLoaded,
      handleLogin,
    }

  },
})
</script>
<template>
  <div class="w-full h-screen flex justify-center items-center">
    <n-tabs
      class="card-tabs flex w-96"
      default-value="signin"
      size="large"
      animated
      pane-wrapper-style="margin: 0 -4px"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >
      <n-tab-pane name="signin" tab="Sign in">
        <n-form>
          <n-form-item-row label="Username">
            <n-input v-model:value="username"/>
          </n-form-item-row>
          <n-form-item-row label="Password">
            <n-input v-model:value="password"/>
          </n-form-item-row>
        </n-form>
        <n-button type="primary" block secondary strong @click="handleLogin">
          Sign In
        </n-button>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
<style lang="scss" scoped>
</style>
