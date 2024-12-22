<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex';
import { useMessage } from 'naive-ui'
import router from '../router'

export default defineComponent({
  name: 'AdminLogout',
  setup() {

    const store = useStore()
    const message = useMessage()

    onMounted(async () => {
      try {
        await store.dispatch('logoutAdmin')
        router.push({ name: 'AdminLogin' })
        message.success('Logged out')
      } catch (error) {
        message.error('Error logging out')
      }
    })

    return {
    }
    
  },
})
</script>
<template>
  <div>
  </div>
</template>