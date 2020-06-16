<template>
  <div class="flex justify-center">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'auth'
})
export default class Auth extends Vue {
}
</script>
