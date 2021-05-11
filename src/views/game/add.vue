<template>
  <game-info :form="form" :loading="loading" @submit="submit" />
</template>

<script>
import gameInfo from './component/index'
import { gameAdd } from '@/api/game'

export default {
  name: 'GameAdd',
  components: {
    gameInfo
  },
  data() {
    return {
      form: {
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
  methods: {
    submit() {
      this.loading = true
      gameAdd(this.form).then(resp => {
        const { code } = resp

        this.loading = false
        if (code) {
          this.$message({
            type: 'success',
            message: '操作成功',
            duration: 1500,
            onClose: () => {
              this.$router.push({ path: '/game/index' })
            }
          })
        } else {
          this.$message.error('操作失败')
        }
      }).catch(error => {
        console.log('error=>', error)
        this.loading = false
        this.$message.error(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
