<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useLoggedInUser } from '../services/use/use-logged-in-user'
import { NButton } from 'naive-ui'
import { useStore } from 'vuex';

export default defineComponent({
  name: 'HomePage',
  components: {
    NButton,
  },

  setup() {

    const code = ref(null)

    const store = useStore()

    const users = computed(() => store.state.users)
    const loadingUsers = computed(() => store.state.loadingUsers)

    const {
      loadLoggedInUser,
      loggedInUser,
      loadingLoggedInUser,
    } = useLoggedInUser()

    onMounted(async () => {
      await store.dispatch('getUsers', { filter: {}, pagination: { page: 1, pageSize: 10 } })
    })

    return {
      users,
      loadingUsers,
      code,
      loadLoggedInUser,
      loggedInUser,
      loadingLoggedInUser,
    }

  },
})
</script>
<template>
  <div>
    <h1>Welcome</h1>
    <h2>please enter in your code:</h2>
    <input type="text" v-model="code" />
    <n-button @click="loadLoggedInUser({ code })">Submit</n-button>
    <div v-if="loggedInUser && !loadingLoggedInUser">
      <h1>{{ loggedInUser.welcomeMessage }}</h1>
    </div>
    <div v-if="loadingUsers">Loading...</div>
    <div v-else>
      <div v-for="user in users" :key="user.id">
        <h1>{{ user.welcomeMessage }}</h1>
        
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
