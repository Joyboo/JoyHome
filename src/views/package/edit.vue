<template>
  <package-info :form="form" :loading="loading" @submit="submit" />
</template>

<script>
import packageInfo from './component'
import { packageEdit } from '@/api/package'
import {closeTab, copyTo} from "@/utils";

export default {
  name: 'Edit',
  components: {
    packageInfo
  },
  data() {
    return {
      loading: false,
      form: {
        id: 0,
        default_path: '',
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
  mounted() {
    this.loading = true
    this.form.id = this.$route.query.id
    packageEdit('get', { id: this.form.id })
      .then(({code, msg, data}) => {
        if (!code)
        {
          return this.$message.error(msg)
        }
        this.form = copyTo(this.form, data.data)
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    submit() {
      this.loading = true

      packageEdit('post', this.form)
        .then(({code, msg}) => {
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
