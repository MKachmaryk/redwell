<template>
  <div id="app" class="h-full flex">
    <!-- S I D E  B A R -->
    <div
      v-if="showSidebar"
      class="flex flex-col overflow-hidden bg-sidebar-content w-1/5"
    >
      <div class="flex justify-center items-center flex-shrink-0 text-2xl py-2 bg-sidebar-header h-16 text-white">
        <router-link :to="{ name: 'home' }">Redwell</router-link>
      </div>
      <div class="flex-grow overflow-auto mt-5 text-white">
        <ul>
          <li class="mb-4 ml-6 cursor-pointer">
            <router-link :to="{ name: 'file-upload' }">File Upload</router-link>
          </li>
          <li class="mb-4 ml-6 cursor-pointer">
            <router-link :to="{ name: 'file-preview' }">File Preview</router-link>
          </li>
          <li class="mb-4 ml-6 cursor-pointer">
            <router-link :to="{ name: 'auth' }">Auth Phone</router-link>
          </li>
          <li class="mb-4 ml-6 cursor-pointer">
            <router-link :to="{ name: 'two-factor' }">Two Factor Verification</router-link>
          </li>
        </ul>
      </div>
      <div class="flex-shrink-0 flex justify-center text-white py-2">© Redwell footer</div>
    </div>

    <!-- C O N T E N T  W R A P P E R -->
    <div class="overflow-hidden w-full">
      <!-- H E A D E R -->
      <header class="flex items-center justify-between shadow relative h-16">
        <button
          @click="showSidebar = !showSidebar"
          class="border p-1 bg-gray-500 ml-6 focus:outline-none"
        >
          {{ showSidebar ? 'close' : 'open' }}
        </button>

        <!-- U S E R  I C O N -->
        <img style="height: 40px" class="mr-4" src="https://img.icons8.com/material/4ac144/256/user-male.png" alt="">
      </header>

      <!-- M A I N  C O N T E N T -->
      <div class="overflow-auto bg-gray-100 h-full w-full">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'app'
})
export default class App extends Vue {
  /* DATA */
  showSidebar = true
}
</script>
