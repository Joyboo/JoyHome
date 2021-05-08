<template>
  <package-info :form="form" @submit="submit"></package-info>
</template>

<script>
  import packageInfo from './component'
  import {packageEdit, packGetOne} from "@/api/package"
  import {Loading} from "element-ui";

  export default {
    name: "edit",
    components: {
      packageInfo
    },
    mounted() {
      this.form.id = this.$route.query.id
      packGetOne({id: this.form.id}).then(resp => {
        this.form = resp.data
      })
    },
    methods: {
      submit() {
        const loadingInstance = Loading.service()

        packageEdit(this.form).then(resp => {

          const {code, msg} = resp
          if (code) {
            this.$message({
              type: 'success',
              message: '操作成功',
              duration: 1500,
              onClose: () => {
                this.$nextTick(() => {
                  loadingInstance.close()
                })
                this.$router.push({ path: '/package/index' })
              }
            })
          } else {
            this.$nextTick(() => {
              loadingInstance.close()
            })
            this.$message.error(msg || '操作失败')
          }
        }).catch(error => {
          this.$nextTick(() => {
            loadingInstance.close()
          })
          this.$message.error(error || '操作失败')
        })
      }
    },
    data() {
      return {
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
    }
  }
</script>

<style scoped>

</style>
