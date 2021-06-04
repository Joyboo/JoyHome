<template>
  <div class="box" @click="toggleClick">
    <svg t="1622787360929" :class="{'is-active':isActive}" class="hamburger" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1592" width="200" height="200"><path d="M109.714286 841.142857a36.571429 36.571429 0 0 0-36.571429 36.571429v73.142857a36.571429 36.571429 0 0 0 36.571429 36.571428h804.571428a36.571429 36.571429 0 0 0 36.571429-36.571428v-73.142857a36.571429 36.571429 0 0 0-36.571429-36.571429z m552.228571-484.205714a24.868571 24.868571 0 0 0-3.657143 12.434286V658.285714a22.674286 22.674286 0 0 0 33.645715 19.017143l228.937142-141.165714a22.674286 22.674286 0 0 0 7.314286-30.72 16.091429 16.091429 0 0 0-7.314286-6.582857l-228.937142-146.285715a21.211429 21.211429 0 0 0-29.988572 4.388572zM109.714286 438.857143a36.571429 36.571429 0 0 0-36.571429 36.571428v73.142858a36.571429 36.571429 0 0 0 36.571429 36.571428h365.714285a36.571429 36.571429 0 0 0 36.571429-36.571428v-73.142858a36.571429 36.571429 0 0 0-36.571429-36.571428z m0-402.285714A36.571429 36.571429 0 0 0 73.142857 73.142857v73.142857a36.571429 36.571429 0 0 0 36.571429 36.571429h804.571428A36.571429 36.571429 0 0 0 950.857143 146.285714V73.142857a36.571429 36.571429 0 0 0-36.571429-36.571428z" fill="#ffffff" p-id="1593" data-spm-anchor-id="a313x.7781069.0.i1" class="selected"></path></svg>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style lang="scss" scoped>

  .box {
    padding: 0 15px;
    background-color: rgb(48, 65, 86);

    .hamburger {
      display: inline-block;
      vertical-align: middle;
      /*font-size: 2rem!important;*/
      width: 1rem;
      height: 1rem;
    }

    .is-active {
      transform: rotate(180deg);
    }
  }

</style>
