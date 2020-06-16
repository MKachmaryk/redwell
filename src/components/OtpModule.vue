<template>
  <div class="otp-module" :class="otpModuleClasses">
    <otp-input
      input-classes="otp-input"
      :separator="separator"
      :num-inputs="numInputs"
      :should-auto-focus="shouldAutoFocus"
      :is-input-num="isInputNum"
      class="otp-container"
      @on-change="onInputChange"
      @on-complete="typingInputsCompleted"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import OtpInput from '@bachdgvn/vue-otp-input'

@Component({
  name: 'otp-module',
  components: {
    OtpInput
  }
})

export default class OtpModule extends Vue {
  @Prop({ default: '' }) separator?: string
  @Prop({ default: 4 }) numInputs!: number
  @Prop({ default: false }) shouldAutoFocus!: boolean
  @Prop({ default: false }) isInputNum!: boolean
  @Prop() otpModuleClasses?: string[] | string

  /* METHODS */
  onInputChange (val: string) {
    this.$emit('on-change', val)
  }

  typingInputsCompleted (val: string) {
    this.$emit('on-complete', val)
  }
}
</script>

<style lang="scss">
  .otp-module {
    .otp-container {
      @apply border border-gray-300;
      border-radius: 5px;
      .otp-input {
        width: 55px;
        height: 60px;
        padding: 5px;
        font-size: 20px;
        border-right: 1px solid;
        border-color: theme('colors.gray.300');
        text-align: center;
        &.error {
          border: 1px solid red !important;
        }
        &:focus {
          outline: none;
        }
      }
      .otp-input::-webkit-inner-spin-button,
      .otp-input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      div:first-child .otp-input {
        border-radius: 5px 0 0 5px;
      }
      div:last-child .otp-input {
        border-right: none;
        border-radius: 0 5px 5px 0;
      }
    }
  }
</style>
