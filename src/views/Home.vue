<template>
  <div>
    <file-preview
      title="PDF Title Goes Here"
      description="Lorem ipsum dolor sit amet, his at minimum liberavisse, ex impedit suscipit maiestatis eam. Eos ad hinc vituperata, soluta omnium ne vix, vis an prodesset philosophia. Wisi reque utamur id mel. Inani labitur laoreet ei sed. In quo vocibus fabellas. Justo utamur moderatius mea id, sanctus nusquam adipiscing ei eam. Lobortis pertinax maiestatis cu per, nobis dissentiet vix cu. An hinc minimum pro, et usu feugait phaedrum, at laudem prompta scriptorem mea. An est veritus suscipiantur comprehensam. Commune forensibus per eu, scaevola constituto ea sed. Probo argumentum cu his, ei qui nostrum commune noluisse. Volumus placerat explicari nec et. Vim et perpetua mediocrem, ne mea feugait eleifend. Tacimates argumentum no eam. Brute minimum consequat an pro, soluta perpetua est ei, eu soleat adipiscing eum."
      :breadcrumbs="['home', 'file preview']"
      uploadDate="May 20, 2019"
    >
      <div class="flex justify-center">
        <p>PDF</p>
        <toggle-button class="mx-2" v-model="showVideo"/>
        <p>Video</p>
      </div>
      <div
        v-if="!showVideo"
        class="flex justify-center my-8 mb-32"
      >
        <img
          class="bg-white p-4 w-1/2 border border-gray-300 rounded-lg"
          :src="require('@/assets/img/pdf-copy.jpg')"
          alt=""
        />
      </div>
      <div
        v-else
        class="flex justify-center mt-2 mb-32"
      >
        <iframe
          src="https://player.vimeo.com/video/46926279"
          width="900"
          height="600"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
        />
      </div>
    </file-preview>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FilePreview from '@/views/FilePreview.vue'
import ToggleButton from '@/components/ToggleButton.vue'

@Component({
  name: 'home',
  components: {
    FilePreview,
    ToggleButton
  }
})
export default class Home extends Vue {
  /* DATA */
  showVideo = false
}
</script>
