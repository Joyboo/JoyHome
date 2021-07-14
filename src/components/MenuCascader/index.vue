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
import { cascaderTree } from '@/api/menu'
import { isArray } from '@/utils/validate'

export default {
  name: 'MenuCascader',
  props: {
    pid: {
      type: [Number, Array, String],
      default() {
        return 0
      }
    },
    uid: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 级联选择器
      cascader: {
        options: [], // 数据
        props: {
          checkStrictly: true
          /* lazy: true, // 懒加载
              lazyLoad (node, resolve) {
              }*/
        }
      }
    }
  },
  computed: {
    joyPid: {
      get() {
        return this.pid
      },
      set(val) {
        // 级联选择器传递的是包含父节点的多级数组，取最后一个
        if (isArray(val)) {
          val = val[val.length - 1]
        }
        // 重要，如果点击叉叉取消选中后，val为undefined后端会直接清掉这个字段
        this.$emit('update:pid', val || '')
      }
    }
  },
  mounted() {
    cascaderTree({ uid: this.uid ? this.uid : 0 })
      .then(({ data }) => {
        this.cascader.options = data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style scoped>

</style>
