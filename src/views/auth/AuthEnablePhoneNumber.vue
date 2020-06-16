<template>
  <div class="mt-4 auth-form flex flex-col justify-center bg-white rounded-lg shadow px-8 pt-5 pb-8">
    <div class="flex justify-center">
      <img :src="require('@/assets/img/roselang-auth-logo.png')" alt="" class="h-8">
    </div>

    <p class="text-sm font-bold mt-8 text-auth-form">Enable SMS two-factor authentication</p>

    <p class="text-sm my-4 text-auth-form">
      Enter your mobile phone number. We will send you a 6 digit code to your number to enable two-factor authentication.
    </p>

    <p class="text-sm font-bold text-auth-form">Phone Number</p>

    <input
      type="text"
      class="py-2 px-2 border border-gray-400 bg-auth-phone-input rounded"
      placeholder="234-555-6789"
      maxlength="12"
      :value="phoneNumber"
      @input="numberOnly(phoneNumber, $event)"
    >

    <button class="w-full py-2 bg-sidebar-header mt-3 rounded text-white">Send Authentication Code</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'auth-enable-phone-number'
})
export default class AuthEnablePhoneNumber extends Vue {
  /* DATA */
  phoneNumber = ''

  /* METHODS */
  numberOnly (item: any, e: any) {
    item = e.target.value.replace(/[^\d]/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
    e.target.value = !item[2] ? item[1] : '' + item[1] + '-' + item[2] + (item[3] ? '-' + item[3] : '')
  }
}
</script>
