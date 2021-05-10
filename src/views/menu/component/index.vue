<template>
  <div class="view-container" v-loading="loading">
    <el-form ref="menu-info" :rules="rules" :model="form" :size="size" label-width="15rem">

      <el-form-item label="上级菜单">
        <div class="block">
          <el-cascader
            v-model="form.pid"
            :options="cascader.options"
            :props="cascader.props"
            filterable
          />
        </div>
      </el-form-item>

      <el-form-item label="菜单名">
        <el-input v-model="form.title" placeholder="在侧边栏和面包屑中展示的名字" clearable />
      </el-form-item>

      <el-form-item label="name">
        <el-input v-model="form.name" placeholder="keep-alive使用的名称" clearable />
      </el-form-item>

      <el-form-item label="path">
        <el-input v-model="form.path" placeholder="/" clearable />
      </el-form-item>

      <el-form-item label="组件">
        <el-input v-model="form.component" clearable class="input-with-select">
          <el-select slot="prepend" v-model="form.component" placeholder="请选择">
            <el-option label="Layout" value="Layout" />
            <el-option label="RouterView" value="RouterView" />
          </el-select>
        </el-input>
      </el-form-item>

      <el-form-item label="重定向">
        <el-input v-model="form.redirect" clearable />
      </el-form-item>

      <el-form-item label="图标">
        <el-input v-model="form.icon" style="width: 80%" placeholder="el-icon-menu" clearable>
          <router-link slot="prepend" target="_blank" to="/icon/index">
            <i class="el-icon-view" />
          </router-link>
        </el-input>
      </el-form-item>

      <el-form-item label="是否隐藏">
        <el-switch v-model="form.hidden == '1'" @change="changeHidden()" />
      </el-form-item>

      <el-form-item label="是否显示在面包屑中">
        <el-switch v-model="form.breadcrumb == '1'" @change="changeBreadcrumb()" />
      </el-form-item>

      <el-form-item label="是否固定在tags-view中">
        <el-switch v-model="form.affix == '1'" @change="changeAffix()" />
      </el-form-item>

      <el-form-item label="排序号">
        <el-input-number v-model="form.sort" :min="1" :max="1000" />
      </el-form-item>

      <el-footer>
        <el-button class="joy-btn" :size="size" type="primary" @click="onSubmit('menu-info')">提 交</el-button>

        <router-link class="joy-btn" :to="{path:'/menu/index'}">
          <el-button type="success" :size="size">列 表</el-button>
        </router-link>

      </el-footer>

    </el-form>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // name: 'MenuInfo',
  computed: {
    ...mapGetters([
      'size'
    ])
  },
  props: ['form', 'cascader', 'loading'],
  data() {
    return {
      rules: {
        requre: [
          { required: true, message: '请填写', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('onsubmit')
    },
    changeHidden() {
      this.changeSwitch('hidden')
    },
    changeBreadcrumb() {
      this.changeSwitch('breadcrumb')
    },
    changeAffix() {
      this.changeSwitch('affix')
    },
    changeSwitch(key) {
      this.$emit('changeSwitch', key)
    }
  }
}
</script>

<style lang="scss" scoped>

  .el-input-group__prepend {
    background-color: #fff!important;
    width: 120px!important;
  }
</style>
