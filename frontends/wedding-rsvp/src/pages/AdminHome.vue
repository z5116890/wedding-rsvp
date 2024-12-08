<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import NavigationMenu from '../components/NavigationMenu.vue'
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AdminHome',
  components: {
    NavigationMenu,
  },

  setup() {

    const store = useStore()

    const message = 'Admin Home'

    const users = computed(() => store.state.users)
    const loadingUsers = computed(() => store.state.loadingUsers)
    const accommodations = computed(() => store.state.accommodations)
    const loadingAccommodations = computed(() => store.state.loadingAccommodations)

    onMounted(async () => {
      await store.dispatch('getUsers', { filter: {}, pagination: { page: 1, pageSize: 10 } })
      await store.dispatch('getAccommodations')
    })

    return {
      message,
      users,
      loadingUsers,
      loadingAccommodations,
      accommodations,
    }

  },
})
</script>
<template>
  <div>
    <NavigationMenu />
    <div class="h-full flex justify-center items-center flex-col">
      <h1>{{ message }}</h1>
      <div v-if="loadingUsers || loadingAccommodations">Loading...</div>
      <div v-else>
        number of guests: {{ users.length }}
        number of accommodations: {{ accommodations.length }}
      </div>  
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
