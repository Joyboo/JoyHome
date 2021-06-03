<template>
  <el-form ref="menu-info" :rules="rules" :model="form" :size="size" label-width="15rem">
    <el-form-item label="任务名">
      <el-input type="text" v-model="form.name" clearable />
    </el-form-item>

    <el-form-item label="执行规则">
      <el-input type="text" v-model="form.rule" placeholder="" clearable />
    </el-form-item>

    <el-form-item label="异步任务模板类">
      <el-input type="text" v-model="form.rclass" placeholder="" clearable />
    </el-form-item>

    <el-form-item label="运行类和方法">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-input type="text" v-model="form.eclass" clearable />
        </el-col>
        <el-col :span="1" style="text-align: center;">
          <i class="el-icon-right" />
        </el-col>
        <el-col :span="8">
          <el-input type="text" v-model="form.method" clearable />
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="参数">
      <el-row>
        <el-button icon="el-icon-plus" type="primary" plain @click="cp_param" />
      </el-row>
      <el-row v-for="(ipt, key) in form.args" :key="key">
        <el-col :span="8">
          <el-input v-model="ipt.key" class="colInput" clearable placeholder="key" />
        </el-col>
        <el-col :span="8">
          <el-input v-model="ipt.value" class="colInput" clearable placeholder="value" />
        </el-col>
        <el-col :span="4">
          <el-button icon="el-icon-delete" type="danger" plain @click="del_param(ipt)" />
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="备注">
      <el-input type="text" v-model="form.remark" placeholder="" clearable />
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

    <button-tpl index="/crontab/index" @submit="submit"></button-tpl>
  </el-form>
</template>

<script>
  import {mapGetters} from "vuex";
  import ButtonTpl from '@/components/ButtonTpl'

  export default {
    components: {
      ButtonTpl
    },
    computed: {
      ...mapGetters(['size'])
    },
    props: {
      form: {
        type: Object,
        default: {}
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
