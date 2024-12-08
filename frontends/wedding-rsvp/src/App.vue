<script lang="ts">
import { defineComponent } from 'vue'
import { NMessageProvider, NDialogProvider } from 'naive-ui'

export default defineComponent({
  name: 'App',
  components: {
    NMessageProvider,
    NDialogProvider,
  }
})
</script>

<template>
  <div id="app">
  <n-dialog-provider>
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-dialog-provider>
  </div>
</template>
