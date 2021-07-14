<template>
  <package-info :form="form" :loading="loading" @submit="submit" />
</template>

<script>
import packageInfo from './component'
import { packageAdd } from '@/api/package'
import { closeTab } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'packageadd',
  components: {
    packageInfo
  },
  data() {
    return {
      loading: false,
      form: {
        gameid: '',
        os: '',
        name: '',
        pkgbnd: '',
        url: '',
        extension: {
          logkey: '',
          paykey: '',
          logurl: '',
          payurl: '',
          domain: {
            report: '',
            sdk: '',
            pay: ''
          },
          google_paykey: '',
          google: {
            web_clientid: ''
          },
          huawei: {
            production: {
              clientid: '',
              clientsecret: ''
            }
          },
          facebook: {
            bindnotice: '',
            appid: ''
          },
          mg: {
            publickey: '',
            appkey: ''
          },
          qzf: {
            enable: '0',
            pf: []
          },
          paypal: {
            env: '0',
            production: {
              clientid: '',
              clientsecret: ''
            },
            sandbox: {
              clientid: '',
              clientsecret: ''
            }
          },
          payssion: {
            env: '0',
            production: {
              clientid: '',
              clientsecret: ''
            },
            sandbox: {
              clientid: '',
              clientsecret: ''
            }
          },
          adjust: {
            currency: '',
            event: [
              {
                Key: '',
                Value: ''
              }
            ]
          },
          rating: {
            pop: '0',
            time: 5,
            bgurl: '',
            btnurl: '',
            titurl: '',
            storeurl: '',
            lefturl: '',
            righturl: ''
          },
          share: {
            img: ''
          },
          aihelp: {
            sectionid: ''
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['config']),
    domain() {
      return this.config.region_domain.domain
    }
  },
  watch: {
    domain: {
      immediate: true,
      handler: function(newVal, oldVal) {
        if (newVal) {
          this.form.extension.domain = {
            report: 'https://api-report.' + newVal,
            sdk: 'https://api-sdk.' + newVal,
            pay: 'https://api-pay.' + newVal
          }
        }
      }
    }
  },
  methods: {
    submit() {
      this.loading = true

      packageAdd(this.form)
        .then(({ code, msg }) => {
          if (code) {
            this.$message.success('操作成功')
            closeTab()
          } else {
            this.$message.error(msg || '操作失败')
          }
        })
        .catch(error => {
          this.$message.error(error || '操作失败')
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
