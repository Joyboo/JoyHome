<template>
  <el-form :model="form" :size="size" label-width="15rem" :label-position="device === 'mobile' ? 'top' : 'right'">
    <el-form-item label="设备号">
      <el-input v-model="form.devid" clearable />
    </el-form-item>

    <el-form-item label="备注">
      <el-input v-model="form.name" clearable />
    </el-form-item>

    <el-form-item label="状态">
      <el-radio-group v-model="form.status">
        <el-radio label="0" border>未生效</el-radio>
        <el-radio label="1" border>生效</el-radio>
      </el-radio-group>
    </el-form-item>

    <button-tpl index="/whitelist/index" @submit="submit"></button-tpl>
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
      ...mapGetters(['size', 'device']),
    },
    props: {
      form: Object,
      default: {}
    },
    data() {
      return {
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
