<template>
  <div class="box" @click="toggleClick">
<!--    <svg-icon icon-class="jbhamburger" :class="{'is-active':isActive}" class="hamburger" />-->
    <!--<svg :class="{'is-active':isActive}" class="hamburger" t="1622778296189" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1876" width="200" height="200"><path d="M469.333333 725.333333h426.666667v-85.333333H469.333333v85.333333zM128 512l170.666667 170.666667V341.333333l-170.666667 170.666667z m0 384h768v-85.333333H128v85.333333zM128 128v85.333333h768V128H128z m341.333333 256h426.666667v-85.333333H469.333333v85.333333z m0 170.666667h426.666667v-85.333334H469.333333v85.333334z" p-id="1877" data-spm-anchor-id="a313x.7781069.0.i0" class="selected" fill="#ffffff"></path></svg>-->
    <!--一个左一个右-->
    <svg t="1622778553845" :class="{'is-active':isActive}" class="hamburger" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2044" width="200" height="200"><path d="M128 896h768v-85.333333H128v85.333333z m0-554.666667v341.333334l170.666667-170.666667-170.666667-170.666667z m341.333333 384h426.666667v-85.333333H469.333333v85.333333zM128 128v85.333333h768V128H128z m341.333333 256h426.666667v-85.333333H469.333333v85.333333z m0 170.666667h426.666667v-85.333334H469.333333v85.333334z" p-id="2045" data-spm-anchor-id="a313x.7781069.0.i5" class="selected" fill="#ffffff"></path></svg>
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
