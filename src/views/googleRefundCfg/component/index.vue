<template>
  <div v-loading="loading" class="info-container">
    <el-form :model="form" :size="size" label-width="15rem">
      <el-form-item label="所属游戏">
        <el-select v-model="form.gameid" filterable>
          <el-option
            v-for="item in filtergamelist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
    mounted() {
      this.$store.dispatch('filter/gameInfo')
    },
    computed: {
      ...mapGetters(['size', 'filtergamelist'])
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
