<template>
  <div>
    <p class="capitalize text-xs ml-6 mt-6">home / file upload</p>
    <div class="flex justify-center">
      <div class="mb-24 w-2/3">
        <h1 class="text-xl font-medium mt-6">File Upload</h1>
        <div class="border border-gray-200 mt-4 bg-white p-8 rounded-lg">
          <p class="text-sm leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cupiditate doloribus
            ducimus ea est fugiat id impedit inventore mollitia necessitatibus nihil odio quae reiciendis rem repellat
            soluta temporibus, unde vitae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cupiditate doloribus
            ducimus ea est fugiat id impedit inventore mollitia necessitatibus nihil odio quae reiciendis rem repellat soluta
            temporibus, unde vitae.
          </p>

          <!-- T I T L E  A N D  D E S C R I P T I O N -->
          <h2 class="text-lg mt-4 font-medium">Title & Description</h2>

          <!-- A D D  T I T L E -->
          <input
            type="text"
            class="focus:bg-white focus:outline-none mt-2 input"
            placeholder="Enter a title"
            v-model="title"
          />
          <p class="mt-4 mb-2 text-sm">Give a brief description of the file. A good description is a few sentences long
            using proper nouns and answers
            who, what, and/or why.
          </p>

          <!-- A D D  D E S C R I P T I O N -->
          <textarea
            class="mt-2 focus:bg-white focus:outline-none rounded-xl resize-none h-48 pt-4"
            placeholder="Enter a description"
            v-model="description"
          />

          <!-- A D D  A  F I L E -->
          <h3 class="mt-10 text-lg font-medium">Add a file</h3>
          <p class="my-3 text-sm">Select if you are uploading a PDF or a video.</p>

          <!-- T O G G L E  P D F  /  V I D E O  F I L E -->
          <div class="flex my-4">
            <span class="text-sm">PDF</span>
            <toggle-button v-model="uploadVideo" class="mx-2"/>
            <span>Video</span>
          </div>

          <template v-if="!uploadVideo">
            <p class="text-sm">Select a file or drag n drop into the field below. Only PDF files will be accepted</p>
            <button class="button my-3 focus:outline-none" @click="selectFile">Select a File</button>
            <p class="text-sm mb-3 ml-5">or</p>

            <!-- D R A P  N  D R O P  A R E A -->
            <div class="rounded-xl border border-dashed">
              <vue-dropzone
                ref="myVueDropzone"
                id="dropzone"
                class="rounded-xl"
                :options="dropzoneOptions"
                @vdropzone-file-added="dropzoneFileAdded"
                @vdropzone-removed-file="dropzoneRemoveFile"
                :awss3="amazonService"
              />
            </div>
          </template>

          <!-- V I D E O  U R L  I N P U T -->
          <input v-else class="focus:bg-white focus:outline-none input" type="text" placeholder="Video URL" v-model="uploadedVideoUrl">

          <!-- D A T E -->
          <h3 class="mt-5 text-lg font-medium">Date</h3>
          <p class="mt-3 mb-5 text-sm">Select the date of the PDF or Video.</p>
          <datepicker
            ref="datePicker"
            placeholder="Select a Date"
            class="focus:outline-none"
            input-class="px-4 w-33 focus:outline-none bg-gray-100 border rounded-2xl py-2 border-gray-300"
            v-model="chosenDate"
          />

          <!-- K E Y W O R D S -->
          <h3 class="mt-8 text-lg font-medium">Keywords</h3>
          <p class="my-3 text-sm">Select keywords from the pre-defined set. You can also add additional keywords as needed.</p>
          <ul>
            <li v-for="i in 5" :key="`keyword index ${ i }`" class="flex items-center mb-1">
              <input type="checkbox" class="mr-2">
              <span class="text-sm">Keyword {{ i }}</span>
            </li>

          </ul>

          <p class="text-sm my-3">Enter additional keywords</p>
          <input
            class="focus:bg-white focus:outline-none bg-gray-100 border w-2/3 rounded-2xl px-4 py-2 border-gray-300"
            type="text"
            placeholder="Enter a keywords"
            @keyup.enter="addNewKeyword"
            v-model="additionalKeyword"
          >

          <!-- A D D I T I O N A L  K E Y W O R D S  L I S T -->
          <ul class="mt-3">
            <li
              v-for="(item, i) in additionalKeywordsList"
              :key="`manual additional keyword ${i}`"
              class="flex items-center"
            >
              <button
                class="mr-2"
                @click="removeAdditionalKeyword(i)"
                style="width: 10px; height: 10px"
              >
                <img :src="require('@/assets/img/delete.png')" alt="">
              </button>
              {{ item }}
            </li>
          </ul>

          <!-- S A V E  U P L O A D E D  F I L E -->
          <button class="button mt-8 focus:outline-none" @click="save">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import vueDropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import ToggleButton from '@/components/ToggleButton.vue'
import Datepicker from 'vuejs-datepicker'

@Component({
  name: 'file-upload',
  components: {
    vueDropzone,
    ToggleButton,
    Datepicker
  }
})
export default class FileUpload extends Vue {
  $refs!: {
    myVueDropzone: any
  }

  /* DATA */
  amazonService = {
    signingURL: 'http://aws-direct-s3.dev/'
  }

  dropzoneOptions = {
    url: '#',
    headers: {},
    acceptedFiles: '.pdf',
    addRemoveLinks: true,
    dictCancelUpload: '',
    dictRemoveFile: `<img class="delete-pdf-button" src="${require('@/assets/img/delete.png')}" alt="">`,
    dictDefaultMessage: 'Drag n Drop file here',
    previewTemplate: this.templatePreviewPdfFile()
  }

  uploadVideo = false
  uploadedVideoUrl = ''

  title = ''
  description = ''

  additionalKeyword = ''
  additionalKeywordsList: string[] = []
  uploadedFilesList: { [key: string]: string }[] = []
  chosenDate = ''

  /* METHODS */
  templatePreviewPdfFile () {
    return `
      <div class="dz-preview dz-file-preview h-48 w-pdf-thumbnail">
        <div class="dz-image">
          <div data-dz-thumbnail-bg></div>
        </div>
        <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
        <div class="dz-error-message"><span data-dz-errormessage></span></div>
        <div class="dz-success-mark"><i class="fa fa-check"></i></div>
        <div class="dz-error-mark"><i class="fa fa-close"></i></div>
      </div>
    `
  }

  addNewKeyword () {
    if (!this.additionalKeyword.trim().length) return
    this.additionalKeywordsList.push(this.additionalKeyword.trim())
    this.additionalKeyword = ''
  }

  removeAdditionalKeyword (i: number) {
    this.additionalKeywordsList.splice(i, 1)
  }

  selectFile () {
    this.$refs.myVueDropzone.$el.click()
  }

  dropzoneFileAdded (file: any) {
    this.uploadedFilesList.push({ name: file.name, uuid: file.upload.uuid })
    this.createPdfPreviewFile(file)
  }

  // create pdf uploaded first page in dropzone
  async createPdfPreviewFile (file: any) {
    const fileUrl = URL.createObjectURL(file)
    const pdfjs = await import('pdfjs-dist/build/pdf')
    pdfjs.GlobalWorkerOptions.workerSrc = await import('pdfjs-dist/build/pdf.worker.entry')

    const scale = 0.24
    const allPreviewElements = document.querySelectorAll('.dz-image')
    const lastPreviewElement = allPreviewElements[allPreviewElements.length - 1]
    const canvas = document.createElement('canvas')
    lastPreviewElement.appendChild(canvas)
    const ctx = canvas.getContext('2d')

    pdfjs.getDocument(fileUrl).promise.then((pdf: any) => pdf.getPage(1)).then((page: any) => {
      const viewport = page.getViewport({ scale })
      canvas.height = viewport.height
      canvas.width = viewport.width

      const renderCtx = {
        canvasContext: ctx,
        viewport
      }

      page.render(renderCtx)
    })
  }

  dropzoneRemoveFile (file: any) {
    const fileIndex = this.uploadedFilesList.findIndex(item => item.uuid === file.upload.uuid)
    this.uploadedFilesList.splice(fileIndex, 1)
  }

  save () {
    console.log(this.uploadedFilesList)
  }
}
</script>

<style lang="scss">
  .input, textarea {
    @apply bg-gray-100 border w-full rounded-2xl px-4 py-2 border-gray-300;
  }

  #dropzone {
    border: none;
    .delete-pdf-button {
      width: 10px;
      height: 10px;
      cursor: pointer;
    }
    .dz-image {
      border-radius: 0;
    }
    .dz-remove {
      border: none;
      right: 10px;
      top: 10px;
      padding: 0;
      bottom: inherit;
    }
  }
</style>
