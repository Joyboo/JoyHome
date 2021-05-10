<template>
  <el-footer>

    <!--前插槽位-->
    <slot name="first"></slot>

    <el-button class="joy-btn" :size="size" type="primary" @click="submit">提 交</el-button>

    <!--默认插槽位-->
    <slot></slot>

    <router-link class="joy-btn" :to="{path: index}">
      <el-button type="success" :size="size">列 表</el-button>
    </router-link>

    <!--后插槽位-->
    <slot name="last"></slot>

  </el-footer>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
      computed: {
        ...mapGetters([
          'size'
        ]),
      },
      props: ['index'],
      methods: {
        submit() {
          this.$emit('submit')
        }
      }
    }
</script>

<style lang="scss" scoped>
  .el-footer {
    text-align: center;
    margin: 30px 10px;

    .joy-btn {
      margin: 0 10px;
    }
  }
</style>
