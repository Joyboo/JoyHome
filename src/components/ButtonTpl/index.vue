<template>
  <el-footer>

    <!--前插槽位-->
    <slot name="first" />

    <el-button class="joy-btn" :size="size" type="primary" @click="submit">提 交</el-button>

    <!--默认插槽位-->
    <slot />

    <router-link class="joy-btn" :to="{path: index}">
      <el-button :size="size">列 表</el-button>
    </router-link>

    <!--后插槽位-->
    <slot name="last" />

  </el-footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    index: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'size'
    ])
  },
  methods: {
    submit() {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
