<template>
  <div v-loading="loading" class="view-container">
    <el-form ref="menu-info" :rules="rules" :model="form" :size="size" label-width="15rem">

      <el-form-item label="上级菜单">
        <menu-cascader :pid="form.pid" @setpid="setpid"></menu-cascader>
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="form.title" placeholder="在侧边栏和面包屑中展示的名字" clearable />
      </el-form-item>

      <el-form-item label="完整名称">
        <el-input v-model="form.fulltitle" placeholder="在tags-view中展示的名字" clearable />
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

      <el-form-item>
        <template slot="label">
          <router-link slot="prepend" target="_blank" to="/icon/index" :style="'color:' + theme + ';'">
            图标 <i class="el-icon-view el-icon--right" />
          </router-link>
        </template>
        <el-input v-model="form.icon" style="width: 80%" placeholder="el-icon-menu" clearable>
          <el-select slot="prepend" v-model="form.icon">
            <el-option label="列表" value="el-icon-c-scale-to-original" />
            <el-option label="添加" value="el-icon-plus" />
            <el-option label="编辑" value="el-icon-edit" />
            <el-option label="删除" value="el-icon-delete" />
          </el-select>
        </el-input>
      </el-form-item>

      <el-form-item label="是否隐藏">
        <el-switch v-model="form.hidden == '1'" @change="changeHidden()" />
      </el-form-item>

      <el-form-item label="是否需要Keep-alive缓存">
        <el-switch v-model="form.noCache == '0'" @change="changeKeepAlive()" />
      </el-form-item>

      <el-form-item label="是否固定在标签页">
        <el-switch v-model="form.affix == '1'" @change="changeAffix()" />
      </el-form-item>

      <el-form-item label="是否显示在面包屑">
        <el-switch v-model="form.pid != 0 && form.breadcrumb == '1'" @change="changeBreadcrumb()" />
      </el-form-item>

      <el-form-item label="排序号">
        <el-input-number v-model="form.sort" :min="1" :max="1000" />
      </el-form-item>

      <button-tpl index="/menu/index" @submit="onSubmit" />

    </el-form>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ButtonTpl from '@/components/ButtonTpl'
import MenuCascader from '@/components/MenuCascader'

export default {
  // name: 'MenuInfo',
  computed: {
    ...mapGetters(['size']),
    theme() {
      return this.$store.state.settings.theme
    }
  },
  components: {
    ButtonTpl,
    MenuCascader
  },
  props: ['form', 'loading'],
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
      if (typeof this.form.pid === 'object') {
        // 级联选择器传递的是包含父节点的多级数组，取最后一个
        this.form.pid = this.form.pid[this.form.pid.length - 1]
      }
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
    changeKeepAlive() {
      this.changeSwitch('noCache')
    },
    changeSwitch(key) {
      this.$emit('changeSwitch', key)
    },
    setpid(pid) {
      this.form.pid = pid
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
