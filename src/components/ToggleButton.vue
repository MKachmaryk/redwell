<template>
  <div
    class="toggle"
    :class="{ active: state }"
    @click.self="onClick"
  >
    <div
      class="draggable"
      :style="{ transform: `translateX(${positionPercentage})`}"
      @mousedown.prevent="dragStart"
    >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'toggle-button'
})
export default class ToggleButton extends Vue {
  @Prop() value!: boolean

  /* DATA */
  width = 100
  state = false
  pressed = 0
  position = 0

  /* COMPUTED */
  get positionPercentage () {
    return `${this.position / this.width * 100}%`
  }

  /* METHODS */
  onClick () {
    this.toggle(!this.state)
    this.updateState()
  }

  toggle (state: boolean) {
    this.state = state
    this.position = !state ? 0 : 100
  }

  dragging (e: any) {
    const pos = e.clientX - (this.$el as any).offsetLeft
    const percent = pos / this.width * 100
    this.position = percent <= 0
      ? 0
      : percent >= 100
        ? 100
        : percent
  }

  dragStart () {
    this.startTimer()
    window.addEventListener('mousemove', this.dragging)
    window.addEventListener('mouseup', this.dragStop)
  }

  dragStop () {
    window.removeEventListener('mousemove', this.dragging)
    window.removeEventListener('mouseup', this.dragStop)
    this.resolvePosition()
    clearInterval((this.$options as any).interval)
    if (this.pressed < 30) {
      this.toggle(!this.state)
    }
    this.pressed = 0
    this.updateState()
  }

  startTimer () {
    (this.$options as any).interval = setInterval(() => {
      this.pressed++
    }, 1)
  }

  resolvePosition () {
    this.position = this.state
      ? 100
      : 0
  }

  updateState () {
    this.$emit('input', this.state)
  }

  /* HOOKS */
  mounted () {
    this.toggle(this.value)
  }

  /* WATCHERS */
  @Watch('position')
  onPositionChanged () {
    this.state = this.position >= 50
  }
}
</script>

<style lang="scss">
  $width: 40px;
  $background: #fff;
  $background-active: #fff;
  $border-color: #1e212a;
  $button-size: 20px;
  $button-color: #1e212a;

  .toggle {
    width: calc(#{$width} + 6px);
    height: calc(#{$button-size} + 4px);
    background: $background;
    border: 1px solid $border-color;
    border-radius: 200px;
    transition: background 0.6s;

  .draggable {
    width: $button-size;
    height: $button-size;
    background: $button-color;
    border-radius: 100%;
    transform: translateX(0%);
    transition: transform 0.08s ease-in-out;
    margin-top: 1px;
    margin-left: 2px;
  }

  &.active {
     background: $background-active;
     transition: background 0.4s;
   }
  }
</style>
