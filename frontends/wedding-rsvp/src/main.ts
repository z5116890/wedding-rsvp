import { createApp } from 'vue'
import { store } from './store'
import { provideApolloClient } from '@vue/apollo-composable'
import 'core-js/stable'

import './styles/tailwind.scss'

import 'vfonts/OpenSans.css'

import router from '@/router'
import App from './App.vue'
import { apolloClient } from './gql/apollo'

const app = createApp(App)

app.use(router)
app.use(store)

provideApolloClient(apolloClient)

app.mount('#app')
