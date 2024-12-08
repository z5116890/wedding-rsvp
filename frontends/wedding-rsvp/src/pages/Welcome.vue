<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { CashOutline as CashIcon, PersonAddOutline, Person } from '@vicons/ionicons5'
import AddGuestModal from '../components/AddGuestModal.vue'
import UpdateGuestModal from '../components/UpdateGuestModal.vue'
import GuestLoginModal from '../components/GuestLoginModal.vue'
import { NButton, NCheckboxGroup, NInput, NForm, FormInst, useMessage, NCheckbox, NFormItem, NFloatButton, NIcon, NTabs, NTabPane, NTimeline, NTimelineItem, NDivider, NH2, NP, NList, NListItem } from 'naive-ui'
import { useStore } from 'vuex';
import { GuestType, User } from '@/services/beef/types'

export default defineComponent({
  name: 'Welcome',
  components: {
    NButton,
    NCheckbox,
    NCheckboxGroup,
    NInput,
    NForm,
    NFormItem,
    NFloatButton,
    NIcon,
    CashIcon,
    PersonAddOutline,
    Person,
    GuestLoginModal,
    AddGuestModal,
    UpdateGuestModal,
    NTabs,
    NTabPane,
    NTimeline,
    NTimelineItem,
    NDivider,
    NH2,
    NP,
    NList,
    NListItem,
  },

  setup() {

    const welcomeMessage = ref('Welcome x, we would love you to join us on our special day.')

    const store = useStore()

    const message = useMessage()

    const formRef = ref<FormInst | null>(null)

    const showAddGuestModal = ref(false)
    const showUpdateGuestModal = ref(false)

    const userToUpdate = ref(null)

    const addUserType = ref(GuestType.plus_one)
    
    const rules = ref({
      checkboxGroupValue: [
        { type: 'array', required: true, message: 'Please select at least one option', trigger: 'change' },
      ],
    })

    const handleLogin = async (args: { lastName: string, code: string }) => {
      try {
        await store.dispatch('getLoggedInUser', args)
        message.success(`Welcome ${store.state.loggedInUser?.firstName}`)
      } catch (error) {
        message.error('Invalid login')
      }
    }

    watch(() => showAddGuestModal.value, async (value) => {
      if (!value) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        await store.dispatch('getLoggedInUser', { lastName: loggedInUser.value?.lastName, code: loggedInUser.value?.code })
      }
    })

    const handleAddGuestUser = async (attrs: {
      firstName: string
      lastName: string
      type: string
      code: string
      numPlusOnes: number
      dietaryRestrictions: string
      plusOneOf?: number
      welcomeMessage: string
    }) => {
      await store.dispatch('addUser', attrs)
      message.success('Plus one added')
      showAddGuestModal.value = false
    }

    const handleUpdateGuestUser = (
      id: number, 
      attrs: {
        firstName: string
        lastName: string
        rsvp: boolean
        code: string
        numPlusOnes: number
        dietaryRestrictions: string
        welcomeMessage: string
      }) => {
      store.dispatch('updateUser', { id, ...attrs })
      message.success('Plus one updated')
      showUpdateGuestModal.value = false
    }

    const handleRsvpUpdate = (rsvp: boolean) => {
      store.dispatch('updateUser', { id: loggedInUser.value.id, rsvp }).then(() => {
        store.dispatch('getLoggedInUser', { lastName: loggedInUser.value?.lastName, code: loggedInUser.value?.code })
        message.success('RSVP updated')
      })
    }

    const openAddGuestModal = () => {
      showAddGuestModal.value = true
    }

    const openUpdateGuestModal = (user: User) => {
      userToUpdate.value = user
      showUpdateGuestModal.value = true
    }

    const loggedInUser = computed(() => store.state.loggedInUser)

    const showLoginModal = ref(loggedInUser.value === null)

    const dietaryRestrictions = ref('')
    const dietaryRestrictionsStatus = ref()
    const dietaryRestrictionsLoading = ref(false)
    let typingTimer: any

    watch(() => loggedInUser.value, (value) => {
      if (value) {
        dietaryRestrictions.value = value.dietaryRestrictions
      }
    }, { immediate: true })

    const saveDietaryRestrictions = (value: string) => {

      dietaryRestrictionsLoading.value = true
      dietaryRestrictionsStatus.value = 'warning'
      dietaryRestrictions.value = value

      clearTimeout(typingTimer)

      typingTimer = setTimeout(() => {
        dietaryRestrictionsLoading.value = false
        dietaryRestrictionsStatus.value = 'success'
        store.dispatch('updateUser', { id: loggedInUser.value.id, dietaryRestrictions: value }).then(() => {
          store.dispatch('getLoggedInUser', { lastName: loggedInUser.value?.lastName, code: loggedInUser.value?.code })
          message.success('Dietary restrictions updated')
        })

      }, 3000)

    }

    return {
      welcomeMessage,
      rules: rules.value,
      formRef,
      showLoginModal,
      handleLogin,
      loggedInUser,
      showAddGuestModal,
      addUserType,
      handleAddGuestUser,
      openAddGuestModal,
      showUpdateGuestModal,
      handleUpdateGuestUser,
      userToUpdate,
      handleRsvpUpdate,
      openUpdateGuestModal,
      dietaryRestrictions,
      dietaryRestrictionsStatus,
      dietaryRestrictionsLoading,
      saveDietaryRestrictions,
    }

  },
})
</script>
<template>
  <div>
    <guest-login-modal
      v-if="!loggedInUser"
      v-model:show="showLoginModal" 
      @login="handleLogin"
      @update:show="showLoginModal = false" 
    />
    <div
      class="w-screen h-screen flex background flex-col items-center"
    >
      <div class="menu-items">
        <h2 class="mb-12 ml-5">RSVP.</h2>
        <h2 class="mb-12 mr-5">Info.</h2>
      </div>
      <h1 class="main-heading">Austin & Katie are getting married.</h1>
      <div class="images-container">
        <div class="image-1">
          <p class="h5 md:text-3xl xl:text-4xl mb-0">
          </p>
        </div>
        <div class="image-2">
          <h3 class="text">{{ loggedInUser ? loggedInUser.welcomeMessage : '' }}</h3>
          <br/>
          <h3 class="text">January 10th, 2026 at 6pm</h3>
          <p class="text">The Reverie Saigon, Ho Chi Minh City, Vietnam</p>
        </div>
      </div>
    </div>
    <div 
      v-if="loggedInUser"
      class="w-screen h-screen flex background flex-col items-center"
    >
      <h1 class="heading">RSVP</h1>
      <div class="menu-container flex items-center flex-col">
        <div class="rsvp-padding">
          <h3>Let us know if you are coming:</h3>
          <n-p>
            Kindly RSVP by Wednesday, 30th October 2024 so we may confirm numbers with the hotel and catering for all events.

          </n-p>
          <div class="flex gap-2 pt-3">
            <n-button type="primary" :ghost="!loggedInUser.rsvp" @click="handleRsvpUpdate(true)">
              Yes
            </n-button>
            <n-button type="error" :ghost="loggedInUser.rsvp || loggedInUser.rsvp === null" @click="handleRsvpUpdate(false)">
              No
            </n-button>
          </div>
          <div class="mt-5 flex flex-col justify-center gap-2" v-if="loggedInUser && loggedInUser.numPlusOnes > 0">
            <h3>Plus One's:</h3>
            <div :key="loggedInUser.firstName" class="flex gap-2">
              <n-float-button
                v-for="i in (loggedInUser.numPlusOnes - loggedInUser.plusOnes.length)"
                position="relative" 
                shape="square"
                @click="openAddGuestModal"
              >
                <n-icon>
                  <PersonAddOutline />
                </n-icon>
              </n-float-button>
              <n-float-button 
                v-for="user in loggedInUser.plusOnes"
                position="relative" 
                shape="square"
                @click="openUpdateGuestModal(user)"
              >
                <n-icon>
                  <Person />
                </n-icon>
              </n-float-button>
            </div>
          </div>
          <div :key="loggedInUser.firstName" class="mt-5 flex flex-col justify-center gap-2">
            <h3>Dietary Restrictions:</h3>
            <div class="flex gap-2">
              <n-input
                :key="loggedInUser.firstName"
                v-model:value="dietaryRestrictions" 
                :status="dietaryRestrictionsStatus" 
                placeholder="e.g. vegetarian" 
                maxlength="50"
                size="small"
                type="textarea"
                :loading="dietaryRestrictionsLoading"
                :on-update:value="saveDietaryRestrictions"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div 
      v-if="loggedInUser"
      class="w-screen h-screen flex background flex-col items-center"
    >
      <h1 class="heading">Info</h1>
      <div class="menu-container flex items-center w-4/6 flex-col">
        <n-tabs 
          default-value="oasis" 
          justify-content="space-evenly" 
          type="line"
          :animated="true"
          size="large"
        >
          <n-tab-pane name="oasis" tab="Itinerary TBA">
            <div class="info-container flex p-12 flex-col">
              <n-h2>Saturday</n-h2>
              <n-timeline size="large">
                <n-timeline-item
                  type="info"
                  title="Tea Ceremony"
                  content="meet n greet the fam"
                  time="10-01-2025 18:00"
                />
                <n-timeline-item
                  type="info"
                  title="Lunch/Dinner"
                  content="meet n greet the fam"
                  time="10-01-2025 18:00"
                />
              </n-timeline>
              <n-divider />
              <n-h2>Sunday</n-h2>
              <n-timeline size="large">
                <n-timeline-item
                  type="info"
                  title="Ceremony"
                  content="kiss the bridge n dat"
                  time="10-01-2025 18:00"
                />
                <n-timeline-item
                  type="success"
                  title="Reception"
                  content="party time"
                  time="10-01-2025 12:00 pm TO 10:00 pm"
                />
              </n-timeline>
            </div>
          </n-tab-pane>
          <n-tab-pane name="the beatles" tab="Key Information">
            <div class="info-container">
              <n-h2>Location</n-h2>
              <n-p>
                Our Wedding will be held in Ho Chi Minh City, Vietnam from Friday 8th January 2026 - Sunday 10th January 2026.
              </n-p>
              <n-h2>Accommodation</n-h2>
              <div v-if="loggedInUser.stayingAt">
                <n-p>
                  You will be staying at <b>{{ loggedInUser.stayingAt.name }}</b>
                </n-p>
                <n-p>
                  <b>Address</b>: {{ loggedInUser.stayingAt.address }}
                </n-p>
                <n-p>
                  <b>Check-in</b>: {{ loggedInUser.stayingAt.checkInDate }}
                </n-p>
                <n-p>
                  <b>Check-out</b>: {{ loggedInUser.stayingAt.checkOutDate }}
                </n-p>
              </div>
              <n-p v-else>
                Please book exclusive discounted accommodation for Hilton via this Reservation Link:
              </n-p>
              <n-h2>Dress code</n-h2>
              <n-p>
                Formal attire
              </n-p>
              <n-h2>Travelling to Vietnam</n-h2>
              <n-p>
                <ol>
                  <li>
                    Please make sure you have a valid passport with at least 6 months validity
                  </li>
                  <li>
                    For our friends visiting Vietnam for the first time, you will need to apply for an eVisa here: <a href="https://evisa.xuatnhapcanh.gov.vn/en_US/web/guest/khai-thi-thuc-dien-tu/cap-thi-thuc-dien-tu">eVisa Link</a>
                  </li>
                </ol>

              </n-p>
              <n-h2>Also...</n-h2>
              <n-p>
                We recommend taking the following precautions to have a safe, healthy and enjoyable trip:
              </n-p>
              <ol>
                <li>
                  drink bottled water if you have a sensitive stomach
                </li>
                <li>
                  please make sure you have travel insurance
                </li>
                <li>
                  if you haven't already, please get vaccinated for Hepatitis A, Typhoid, and Tetanus
                </li>
              </ol>
            </div>
          </n-tab-pane>
        </n-tabs>
      </div>
    </div>
    <AddGuestModal 
      v-if="showAddGuestModal"
      :userType="addUserType"
      :plusOneOf="loggedInUser?.id"
      v-model:show="showAddGuestModal" 
      :addGuestUser="handleAddGuestUser" 
      @update:show="showAddGuestModal = false" 
    />
    <UpdateGuestModal
      v-if="userToUpdate && showUpdateGuestModal"
      v-model:show="showUpdateGuestModal" 
      :updateGuestUser="handleUpdateGuestUser" 
      :userToUpdate="userToUpdate" 
      @update:show="showUpdateGuestModal = false"
    />
  </div>
</template>
<style lang="scss" scoped>

@media only screen and (max-width: 600px) {
  .main-heading {
    @apply heading m-20 text-center;
  }
  .menu-items {
    display: none;
  }
  .images-container {
    flex-direction: column;
    width: 80%;
  }
  .image-1 {
    width: 100%;
  }
  .image-2 {
    width: 90%;
    padding: 10px;
  }
  .menu-container {
    width: 90%;
    .rsvp-padding {
      @apply px-5 py-12;
    }
  }
  .info-container {
    @apply px-2 py-6;
  }
}

@media only screen and (min-width: 601px) {
  .main-heading {
    @apply heading mb-20 text-center;
  }
  .menu-items {
    @apply flex w-full justify-center justify-between;
  }
  .images-container {
    @apply w-4/6;
  }
  .image-1 {
    @apply w-4/6;
  }
  .image-2 {
    right: 30px;
    padding: 40px;
    @apply w-4/6;
  }
  .menu-container {
    @apply w-4/6 h-5/6;
    .rsvp-padding {
      @apply p-12;
    }
  }
  .info-container {
    @apply p-12;
  }
}

.images-container {
  height: 800px;
  @apply flex items-center border-solid;
}
.heading {
  font-size: 2rem;
  font-weight: bold;
  font-family: PlayfairDisplay, serif-serif;
  color: #264E70;
}
.background {
  background-color: #FBF8F1;
}
.image-1 {
  @apply h-5/6 border-solid;
}
.image-2 {
  @apply h-3/6 border-solid;
  position: relative;
}
.text {
  color: #264E70;
}
</style>
