<template>
  <el-form ref="menu-info" :rules="rules" :model="form" :size="size" label-width="15rem" :label-position="device === 'mobile' ? 'top' : 'right'">
    <el-form-item label="任务名">
      <el-input v-model="form.name" type="text" clearable />
    </el-form-item>

    <el-form-item label="执行规则">
      <el-input v-model="form.rule" type="text" placeholder="" clearable />
    </el-form-item>

    <el-form-item label="异步任务模板类">
      <el-input v-model="form.rclass" type="text" placeholder="" clearable />
    </el-form-item>

    <el-form-item label="运行类和方法">
      <el-row :gutter="10">
        <el-col :xs="{span: 22}" :sm="{span: 22}" :md="{span: 22}" :lg="{span: 8}" :xl="{span: 8}">
          <el-input v-model="form.eclass" type="text" clearable />
        </el-col>
        <el-col :xs="{span: 22}" :sm="{span: 22}" :md="{span: 22}" :lg="{span: 1}" :xl="{span: 1}" style="text-align: center;">
          <i class="el-icon-right" />
        </el-col>
        <el-col :xs="{span: 22}" :sm="{span: 22}" :md="{span: 22}" :lg="{span: 8}" :xl="{span: 8}">
          <el-input v-model="form.method" type="text" clearable />
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="参数">
      <el-row>
        <el-button icon="el-icon-plus" type="primary" plain @click="cp_param" />
      </el-row>
      <el-row v-for="(ipt, key) in form.args" :key="key" :gutter="20">
        <el-col :span="10">
          <el-input v-model="ipt.key" class="colInput" clearable placeholder="key" />
        </el-col>
        <el-col :span="10">
          <el-input v-model="ipt.value" class="colInput" clearable placeholder="value" />
        </el-col>
        <el-col :span="4">
          <el-button icon="el-icon-delete" type="danger" plain @click="del_param(ipt)" />
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="备注">
      <el-input v-model="form.remark" type="text" placeholder="" clearable />
    </el-form-item>

    <el-form-item label="状态">
      <el-radio v-model="form.status" label="0" border>启用</el-radio>
      <el-radio v-model="form.status" label="1" border>禁用</el-radio>
      <el-radio v-model="form.status" label="2" border>运行一次</el-radio>
    </el-form-item>

    <el-form-item label="运行系统">
      <el-checkbox-group v-model="form.sys">
        <el-checkbox :label="1">report</el-checkbox>
        <el-checkbox :label="2">pay</el-checkbox>
        <el-checkbox :label="3">sdk</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="运行服务器">
      <el-checkbox-group v-model="form.server">
        <el-checkbox :label="1">1服</el-checkbox>
        <el-checkbox :label="2">2服</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <button-tpl index="/crontab/index" @submit="submit" />
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
import ButtonTpl from '@/components/ButtonTpl'

export default {
  components: {
    ButtonTpl
  },
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      rules: {
        requre: [
          { required: true, message: '请填写', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['size', 'device'])
  },
  methods: {
    submit() {
      this.$emit('submit')
    },
    cp_param() {
      this.form.args.push({
        key: '',
        value: ''
      })
    },
    del_param(ipt) {
      var index = this.form.args.indexOf(ipt)
      if (index !== -1) {
        this.form.args.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>

</style>
