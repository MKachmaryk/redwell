<template>
  <div>
    <!-- P A G E   T I T L E -->
    <div class="bg-preview-file-title pt-4 pb-6 px-6 text-white">

      <!-- B R E A D C R U M B S -->
      <p class="text-xs capitalize">
        {{ breadcrumbs.join(' / ') }}
      </p>

      <!-- T I T L E -->
      <p class="mt-5 text-2xl font-medium">{{ title }}</p>
    </div>

    <!-- D E S C R I P T I O N -->
    <h1 class="text-lg font-medium text-preview ml-6 mt-10">Description</h1>
    <p class="mx-6 mt-5 text-sm text-preview">{{ description }}</p>

    <!-- F I L E   P R E V I E W -->
    <div class="mx-6 mt-8">

      <!-- D A T E -->
      <p class="text-sm text-preview"><span class="font-bold mr-8">Date</span>{{ uploadDate }}</p>

      <!-- F I L E -->
      <slot/>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'file-preview'
})
export default class FilePreview extends Vue {
  @Prop() breadcrumbs!: string[]
  @Prop() title!: string
  @Prop() description!: string
  @Prop() uploadDate!: string
}
</script>
