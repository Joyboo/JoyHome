<template>
  <div class="block">
    <el-cascader
      v-model="joyPid"
      :options="cascader.options"
      :props="cascader.props"
      filterable
      clearable
    />
  </div>
</template>

<script>
  import {cascaderTree} from "@/api/menu";

  export default {
    name: "MenuCascader",
    props: ['pid', 'uid'],
    computed: {
      joyPid: {
        get() {
          return this.pid
        },
        set(val) {
          this.$emit('setpid', val)
        }
      }
    },
    mounted() {
      cascaderTree({uid: this.uid ? this.uid : 0})
        .then(({data}) => {
          this.cascader.options = data
        })
        .catch(error => {
          console.log(error)
        })
    },
    data() {
      return {
        // 级联选择器
        cascader: {
          options: [], // 数据
          optioned: [], // 默认选中, value值
          props: {
            checkStrictly: true
            /* lazy: true, // 懒加载
              lazyLoad (node, resolve) {
              }*/
          }
        },
      }
    }
  }
</script>

<style scoped>

</style>
