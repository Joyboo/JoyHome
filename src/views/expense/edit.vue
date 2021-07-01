<template>
  <div class="view-container" v-loading="loading">

    <el-form :model="form" :size="size" label-width="15rem" :label-position="device === 'mobile' ? 'top' : 'right'">
      <el-form-item label="所属日期">
        <el-date-picker
          v-model="form.exptime"
          type="date"
          value-format="timestamp"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="所属游戏">
        <el-select v-model="form.gameid" @change="chgGame" filterable>
          <el-option
            v-for="item in filtergamelist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="所属包">
        <el-select v-model="form.pkgbnd" filterable>
          <el-option
            v-for="item in pkglist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <template slot="label">
          广告成本<i class="labeli">单位：美元</i>
        </template>
        <el-input type="text" v-model="form.cost" style="width: 50%" placeholder="" clearable />
      </el-form-item>

      <button-tpl index="/expense/index" @submit="submit"></button-tpl>
    </el-form>
  </div>
</template>

<script>
  import {expenseEdit} from '@/api/expense'
  import {packageindex} from "@/api/package";
  import {mapGetters} from "vuex";
  import ButtonTpl from '@/components/ButtonTpl'
  import {closeTab} from "@/utils";

  export default {
    components: {
      ButtonTpl
    },
    computed: {
      ...mapGetters(['size', 'filtergamelist', 'device'])
    },
    data() {
      return {
        loading: false,
        pkglist: [],
        form : {
          exptime: '',
          gameid: '',
          pkgbnd: '',
          cost: '',
        }
      }
    },
    async mounted() {
      this.loading = true

      try{
        await this.$store.dispatch('filter/gameInfo')
        const id = this.$route.query.id
        const {code, msg, data} = await expenseEdit('get', {id: id})

        if (!code)
        {
          return this.$message.error(msg)
        }
        this.form = data.data
        this.chgGame(this.form.gameid)

      } catch (e) {
        this.$message.error(e)
      }
      this.loading = false
    },
    methods: {
      submit() {
        this.loading = true
        expenseEdit('post', this.form)
          .then(({code, msg}) => {
            if (code)
            {
              this.$message.success(msg)
              closeTab()
            } else {
              this.$message.error(msg || 'add error')
            }
          })
          .catch(error => {
            this.$message.error(error)
          })
          .finally(() => {
            this.loading = false
          })
      },
      chgGame(value) {
        this.pkglist = []
        this.loading = true
        packageindex({gameid: value})
          .then(({code, msg, data}) => {
            if (!code)
            {
              return this.$message.error(msg)
            }
            for(let i in data.data)
            {
              let item = data.data[i]
              this.pkglist.push({
                label: item.name,
                value: item.pkgbnd
              })
            }
          })
          .finally(() => {
            this.loading = false
          })
      },
    }
  }
</script>

<style scoped>

</style>
