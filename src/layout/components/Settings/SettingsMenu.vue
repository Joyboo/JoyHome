<template>
  <el-row :gutter="20">
    <!--默认模式，顶部导航-->
    <el-col :span="12">
      <el-row class="menu" :style="{border: border(true)}" @click.native="handlerMenuMode(true)">
        <el-col :span="6" class="height" :style="{backgroundColor: variables.menuBg}" />
        <el-col :span="18" class="height">
          <div style="height: 20px;" :style="{backgroundColor: variables.menuBg}" /><div />
        </el-col>
      </el-row>
    </el-col>

    <!--侧边栏菜单模式-->
    <el-col :span="12">
      <el-row class="menu" :style="{border: border(false)}" @click.native="handlerMenuMode(false)">
        <el-col :span="6" class="height" :style="{backgroundColor: variables.menuBg}" />
        <el-col :span="18" class="height" />
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import variables from '@/styles/variables.scss'
import { mapGetters, mapState } from 'vuex'

export default {
  props: {
    mode: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(['device']),
    ...mapState({
      theme: state => state.settings.theme
    }),
    isMobile() {
      return this.device === 'mobile'
    },
    variables() {
      return variables
    },
    // 计算属性传参，返回function
    border() {
      return (mode) => {
        let str = '2px solid '

        // 选中时边框
        const _active = this.theme
        // 未选中边框
        // const _conv = this.variables.menuHover
        const _conv = this.variables.menuText
        // const _conv = '#ccc'

        if (this.isMobile) {
          str += mode ? _conv : _active
        } else {
          str += this.mode === mode ? _active : _conv
        }
        return str
      }
    }
  },
  methods: {
    handlerMenuMode(mode) {
      if (this.mode !== mode && !this.isMobile) {
        this.$emit('update:mode', mode)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

  /* 高度 */
  $height: 100px;
  /* border 高*/
  $border: 2px;
  /* 外层 = 容器 + border */
  $totalHeight: 104px;

  .menu {
    height: $totalHeight;
    border-radius: 5px;
    cursor: pointer;
    /*box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5)*/
  }

  .height {
    height: $height;
  }

  .bgColor {
    background-color: $menuBg;
  }
</style>
