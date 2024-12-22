<script lang="ts">
import { defineComponent } from 'vue'
import { NMessageProvider, NDialogProvider, NConfigProvider, NGlobalStyle } from 'naive-ui'

export default defineComponent({
  name: 'App',
  components: {
    NMessageProvider,
    NDialogProvider,
    NGlobalStyle,
    NConfigProvider,
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

<style lang="scss" scoped>
body {
  font-family: 'open sans' !important;
}
</style>
