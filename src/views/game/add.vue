<template>
  <game-info :form="form" :loading="loading" @submit="submit" />
</template>

<script>
import gameInfo from './component/index'
import { gameAdd } from '@/api/game'
import {closeTab} from "@/utils";

export default {
  name: 'gameadd',
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
          google: {
            privacy: ''
          },
          divide: {
            cp: 20,
            ios: 30,
            google: 30,
            paypal: 6,
            'paypal-fix': 0.05,
            payssion: 30,
            huawei: 0
          },
          mtn: {
            switch: '0',
            begintime: '',
            endtime: '',
            notice: ''
          }
        }
      },
      loading: false
    }
  },
  methods: {
    submit() {
      this.loading = true
      gameAdd(this.form)
        .then(({code}) => {
          if (code) {
            this.$message.success('操作成功')
            closeTab(this.$route.path, '/game/index')
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
    }
  }
}
</script>

<style scoped>

</style>
