<template>
  <div v-loading="loading" class="view-container">
    <el-form :model="form" :size="size" label-width="15rem" :label-position="device === 'mobile' ? 'top' : 'right'">
      <el-form-item label="所属游戏">
        <el-select v-model="form.gameid" filterable>
          <el-option
            v-for="(_gname, _gid) in gamelist"
            :key="_gid"
            :label="_gname"
            :value="parseInt(_gid)"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="所属包">
        <el-input v-model="form.pkgbnd" clearable />
      </el-form-item>

      <el-form-item label="JSON文件">
        <el-input v-model="form.file" clearable />
      </el-form-item>

      <button-tpl index="/googleRefundCfg/index" @submit="submit" ></button-tpl>
    </el-form>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import ButtonTpl from '@/components/ButtonTpl'
  import {packageChildOption} from "@/api/package";

  export default {
    components: {
      ButtonTpl
    },
    computed: {
      ...mapGetters(['size', 'device', 'gamelist'])
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      form: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        packagelist: []
      }
    },
    methods: {
      submit() {
        this.$emit('submit')
      },
    }
  }
</script>

<style scoped>

</style>
