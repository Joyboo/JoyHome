<template>
  <game-info :form="form" :loading="loading" @submit="submit" >

    <el-form-item label="密钥">
      <el-col :span="10">
        <el-input v-model="form.extension.logkey" class="colInput" clearable placeholder="登录密钥">
          <el-button slot="prepend" @click="get_gkey('logkey')">随机</el-button>
        </el-input>
      </el-col>

      <el-col :span="10">
        <el-input v-model="form.extension.paykey" class="colInput" clearable placeholder="支付密钥">
          <el-button slot="prepend" @click="get_gkey('paykey')">随机</el-button>
        </el-input>
      </el-col>
    </el-form-item>

    <el-form-item>
      <template slot="label">
        ID <i class="labeli">gameid</i>
      </template>
      <el-input v-model="form.id" disabled></el-input>
    </el-form-item>

  </game-info>
</template>

<script>
  import {gameEdit, gkey} from '@/api/game'
  import gameInfo from './component'

  export default {
  components: {
    gameInfo
  },
  data() {
    return {
      form: {
        id: 0,
        name: '',
        extension: {
          type: '0',
          logkey: '',
          paykey: '',
          logurl: '',
          payurl: '',
          goodsids: '',
          facebook: {
            fansurl: ''
          },
          divide: {
            cp: 20,
            ios: 30,
            google: 30,
            paypal: 6,
            'paypal-fix': 0.05,
            payssion: 30,
            huawei: 0
          }
        }
      },
      loading: false
    }
  },
  mounted() {
    this.form.id = this.$route.query.id
    gameEdit('get', { id: this.form.id })
      .then(resp => {
        const { code, data } = resp
        this.form = data.data
      }).catch(error => {
        this.$message.error(error)
      })
  },
  methods: {
    submit() {
      this.loading = true

      gameEdit('post', this.form)
        .then(resp => {
          const { code } = resp
          if (code) {
            this.$message.success('操作成功')
            this.$router.push({ path: '/game/index' })
          } else {
            this.$message.error('操作失败')
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },

    // 随机生成key
    get_gkey(column) {
      gkey(column).then(resp => {
        this.form.extension[column] = resp.data
      }).catch(error => {
        this.$message.error(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
