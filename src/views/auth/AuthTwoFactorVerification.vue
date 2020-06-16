<template>
  <div class="mt-4 auth-form flex flex-col justify-center bg-white rounded-lg shadow px-8 pt-5 pb-8">
    <div class="flex justify-center">
      <img :src="require('@/assets/img/roselang-auth-logo.png')" alt="" class="h-8">
    </div>

    <p class="text-sm font-bold mt-8 text-auth-form">Two-Step Verification</p>

    <div class="text-sm my-4 text-auth-form">
      А text message with a 6-digit code was just sent to
      <div class="flex items-center">
        (<div class="dot"/> <div class="dot" /> <div class="dot" />)
        <div class="dot"/> <div class="dot"/> <div class="dot"/>
        <div class="mx-1">-</div>
        <div class="dot" /> <div class="dot"/> {{ sentToNumber }}
      </div>
    </div>

    <p class="text-sm font-bold text-auth-form">Enter Code</p>

    <otp-module
      :num-inputs="6"
      :should-auto-focus="true"
      :is-input-num="true"
      :otp-module-classes="['mt-3']"
      @on-change="onInputChange"
      @on-complete="typingInputsCompleted"
    />

    <button class="w-full py-2 bg-sidebar-header mt-2 rounded text-white">Verify</button>
    <label class="flex items-center mt-3">
      <input type="checkbox">
      <span class="text-sm ml-1 text-auth-form">Remember this device for 30 days</span>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import OtpModule from '@/components/OtpModule.vue'

@Component({
  name: 'auth-two-factor-verification',
  components: {
    OtpModule
  }
})
export default class AuthTwoFactorVerification extends Vue {
  /* METHODS */
  onInputChange (val: string) {
    console.log('com inp change', val)
  }

  typingInputsCompleted (val: string) {
    console.log('completed', val)
  }

  /* COMPUTED */
  get sentToNumber () {
    const phoneNumber = '0030940251'
    return phoneNumber.slice(phoneNumber.length - 2)
  }
}
</script>

<style lang="scss">
  .dot {
    width: 4px;
    height: 4px;
    background: black;
    border-radius: 100px;
    margin: 0 1px;
  }
</style>
