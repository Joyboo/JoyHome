<template>
  <el-form :model="form" :size="size" label-width="15rem">
    <el-form-item label="所属组">
      <el-select v-model="form.grpid" placeholder="请选择所属组">
        <el-option v-for="(s, k) in grpid" :key="k" :label="s" :value="k" />
      </el-select>
    </el-form-item>

    <el-form-item>
      <template slot="label">
        变量名称<i class="labeli">只能由单词字符组成</i>
      </template>
      <el-input v-model="form.var" clearable />
    </el-form-item>

    <el-form-item label="参数说明">
      <el-input v-model="form.extension.comment" clearable />
    </el-form-item>

    <el-form-item label="变量类型">
      <el-radio v-model="form.extension.type" v-for="(t, n) in valopn" :key="n" :label="n" border>{{t}}</el-radio>
    </el-form-item>

    <el-form-item label="变量值">
      <el-input
        v-model="form.value"
        type="textarea"
        :rows="10"
        style="width: 50%;"
        clearable
      />
    </el-form-item>

    <button-tpl index="/sysinfo/index" @submit="submit"></button-tpl>
  </el-form>
</template>

<script>
  import ButtonTpl from '@/components/ButtonTpl'
  import {mapGetters} from "vuex";
  export default {
    components: {
      ButtonTpl
    },
    computed: {
      ...mapGetters(['size']),
    },
    mounted() {
      // 获取配置
    },
    props: {
      form: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        grpid: {
          1: '基本信息',
          2: '优化信息',
          3: '第三方模块',
          4: '数据库'
        },
        valopn: {
          text: '文本',
          radio: '选项',
          textarea: '多行文本',
          date: '日期',
          array: '数组',
          file: '文件'
        }
      }
    },
    methods: {
      submit() {
        this.$emit('submit')
      }
    }
  }
</script>

<style scoped>

</style>
