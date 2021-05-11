<template>
  <package-info :form="form" :loading="loading" @submit="submit"></package-info>
</template>

<script>
  import packageInfo from './component'
  import {packageAdd} from '@/api/package'

  export default {
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
              storeurl: ''
            },
            share: {
              img: ''
            },
            aihelp: {
              sectionid: ''
            }
          }
        },
      }
    },
    methods: {
      submit() {
        this.loading = true

        packageAdd(this.form)
          .then(resp => {
            const {code, msg} = resp
            if (code) {
              this.$message.success('操作成功')
              this.$router.push({ path: '/package/index' })
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
