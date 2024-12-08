<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'


export default defineComponent({
  name: 'UnknownErrorPage',
  components: {
  },
  setup() {

    const message = computed(() => {
      return 'ERROR'
    })

    return {
      message
    }

  },
})
</script>
<template>
  <div>
    {{ message }}
  </div>
</template>
<style scoped lang="scss">
</style>
