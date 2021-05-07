<template>
  <div class="view-container">
    <el-form ref="package-search" :model="form" :size="size" :rules="rules" label-width="15rem">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item  label="所属游戏">
            <el-select v-model="form.gameid" filterable clearable>
              <el-option
                v-for="item in filtergamelist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item  label="包操作系统">
            <el-radio v-for="(pack, key) in packos" v-model="form.os" :label="key">{{pack}}</el-radio>
          </el-form-item>

          <el-form-item label="包">
            <el-col :span="10">
              <el-input v-model="form.name" class="colInput" clearable placeholder="包名"/>
            </el-col>

            <el-col :span="10">
              <el-input v-model="form.pkgbnd" class="colInput" clearable placeholder="包id(bundle_id或pkg_id)" />
            </el-col>
          </el-form-item>

          <el-form-item label="密钥">
            <el-col :span="10">
              <el-input class="colInput" v-model="form.extension.logkey" clearable placeholder="登录密钥">
                <el-button slot="prepend" @click="get_gkey('logkey')">随机</el-button>
              </el-input>
            </el-col>

            <el-col :span="10">
              <el-input class="colInput" v-model="form.extension.paykey" clearable placeholder="支付密钥">
                <el-button slot="prepend" @click="get_gkey('paykey')">随机</el-button>
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="下载地址">
            <el-input v-model="form.url" clearable />
          </el-form-item>

          <el-form-item >
            <template slot="label">
              登录api网址 <i class="labeli">平台会将用户token传到此网址</i><i class="cRed labeli">手游此项可随便填</i>
            </template>
            <el-input v-model="form.extension.logurl" clearable ></el-input>
          </el-form-item>

          <el-form-item >
            <template slot="label">
              支付api网址 <i class="labeli">平台会将支付信息传到此网址</i>
            </template>
            <el-input v-model="form.extension.logurl" clearable ></el-input>
          </el-form-item>

          <el-form-item label="report域名">
            <el-input v-model="form.extension.domain.report" clearable />
          </el-form-item>

          <el-form-item label="sdk域名">
            <el-input v-model="form.extension.domain.sdk" clearable />
          </el-form-item>

          <el-form-item label="pay域名">
            <el-input v-model="form.extension.domain.pay" clearable />
          </el-form-item>

        </el-tab-pane>
        <el-tab-pane label="第三方配置">

          <el-form-item label="google参数">
            <el-col :span="10">
              <el-input class="colInput" type="textarea" :rows="3" v-model="form.extension.google_paykey"
                        clearable placeholder="paykey公钥"></el-input>
            </el-col>

            <el-col :span="10">
              <el-input class="colInput" type="textarea" :rows="3" v-model="form.extension.google.web_clientid"
                        clearable placeholder="web_client客户端id"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="华为参数">
            <el-col :span="10">
              <el-input class="colInput" type="textarea" :rows="3" v-model="form.extension.huawei.production.clientid"
                        clearable placeholder="正式client_id"></el-input>
            </el-col>

            <el-col :span="10">
              <el-input class="colInput" type="textarea" :rows="3" v-model="form.extension.huawei.production.clientsecret"
                        clearable placeholder="正式client_secret"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="facebook参数">
            <el-col :span="10">
              <el-input class="colInput" type="textarea" :rows="3" v-model="form.extension.facebook.bindnotice"
                        clearable placeholder="绑定通知"></el-input>
            </el-col>

            <el-col :span="10">
              <el-input class="colInput" type="textarea" :rows="3" v-model="form.extension.facebook.appid"
                        clearable placeholder="appid"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="MG参数">
            <el-col :span="10">
              <el-input class="colInput" type="textarea" :rows="3" v-model="form.extension.mg.appkey"
                        clearable placeholder="appkey"></el-input>
            </el-col>

            <el-col :span="10">
              <el-input class="colInput" type="textarea" :rows="3" v-model="form.extension.mg.publickey"
                        clearable placeholder="publickey"></el-input>
            </el-col>
          </el-form-item>

        </el-tab-pane>
        <el-tab-pane label="切支付配置">

          <el-form-item >
            <template slot="label">
              切支付 <i class="labeli">开启H5支付</i>
            </template>
            <el-radio v-model="form.extension.qzf.enable" label="0" border>关闭</el-radio>
            <el-radio v-model="form.extension.qzf.enable" label="1" border>开启</el-radio>
          </el-form-item>

          <el-form-item >
            <template slot="label">
              H5支付方式 <i class="labeli">切支付开启时有效</i>
            </template>
            <el-checkbox v-for="name in h5pf" :key="name" v-model="form.extension.qzf.pf" :label="name">{{name}}</el-checkbox>
          </el-form-item>

          <div class="joyline"></div>

          <el-form-item label="paypal参数">
            <el-row>
              <el-row>
                <el-col>
                  <span style="padding: 0 20px">支付环境</span>
                  <el-radio v-model="form.extension.paypal.env" label="0" border>沙盒</el-radio>
                  <el-radio v-model="form.extension.paypal.env" label="1" border>正式</el-radio>
                </el-col>
              </el-row>

              <el-row style="margin: 20px;">
                <el-col :span="10">
                  <el-input class="colInput" type="textarea" :rows="2" v-model="form.extension.paypal.production.clientid"
                            clearable placeholder="正式clientId"></el-input>
                </el-col>
                <el-col :span="10">
                  <el-input class="colInput" type="textarea" :rows="2" v-model="form.extension.paypal.production.clientsecret"
                            clearable placeholder="正式clientSecret"></el-input>
                </el-col>
              </el-row>
              <el-row  style="margin: 20px;">
                <el-col :span="10">
                  <el-input class="colInput" type="textarea" :rows="2" v-model="form.extension.paypal.sandbox.clientid"
                            clearable placeholder="沙盒clientId"></el-input>
                </el-col>
                <el-col :span="10">
                  <el-input class="colInput" type="textarea" :rows="2" v-model="form.extension.paypal.sandbox.clientsecret"
                            clearable placeholder="沙盒clientSecret"></el-input>
                </el-col>
              </el-row>
            </el-row>
          </el-form-item>

          <div class="joyline"></div>

          <el-form-item label="payssion参数">
            <el-row>
              <el-row>
                <el-col>
                  <span style="padding: 0 20px">支付环境</span>
                  <el-radio v-model="form.extension.payssion.env" label="0" border>沙盒</el-radio>
                  <el-radio v-model="form.extension.payssion.env" label="1" border>正式</el-radio>
                </el-col>
              </el-row>

              <el-row style="margin: 20px;">
                <el-col :span="10">
                  <el-input class="colInput" type="textarea" :rows="2" v-model="form.extension.payssion.production.clientid"
                            clearable placeholder="正式clientId"></el-input>
                </el-col>
                <el-col :span="10">
                  <el-input class="colInput" type="textarea" :rows="2" v-model="form.extension.payssion.production.clientsecret"
                            clearable placeholder="正式clientSecret"></el-input>
                </el-col>
              </el-row>
              <el-row  style="margin: 20px;">
                <el-col :span="10">
                  <el-input class="colInput" type="textarea" :rows="2" v-model="form.extension.payssion.sandbox.clientid"
                            clearable placeholder="沙盒clientId"></el-input>
                </el-col>
                <el-col :span="10">
                  <el-input class="colInput" type="textarea" :rows="2" v-model="form.extension.payssion.sandbox.clientsecret"
                            clearable placeholder="沙盒clientSecret"></el-input>
                </el-col>
              </el-row>
            </el-row>
          </el-form-item>

        </el-tab-pane>
        <el-tab-pane label="adjust配置">

          <el-form-item label="货币类型">
            <el-input v-model="form.extension.adjust.currency" clearable />
          </el-form-item>

          <el-form-item >
            <template slot="label">
              事件 <el-button @click="cp_param" icon="el-icon-plus" :size="size"></el-button>
            </template>

            <!--todo 未解决动态生成input -->
            <el-row v-for="n in adjustEnevtNum" :key="n">
              <el-col :span="8">
                <el-input class="colInput" clearable placeholder="Key"/>
              </el-col>
              <el-col :span="8">
                <el-input class="colInput" clearable placeholder="Value"/>
              </el-col>
              <el-col :span="4">
                <el-button icon="el-icon-delete" :size="size"></el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <!--
          <tbody>
                <tr>
                    <th>货币类型</th>
                    <td><input type="text" name="extension[adjust][currency]" value="<?=$data['extension']['adjust']['currency']??''?>"  class="value"  /></td>
                </tr>
                <tr>
                    <th>事件</th>
                    <td class="params">
                        <section><i class="aui-iconfont aui-icon-plus hand" onclick="cp_param('','')" title="添加一项参数"></i> <i class="aui-iconfont aui-icon-menu hand" onclick="import_param('','')" title="批量导入参数"></i></section>
                        <ul id="eventBox"></ul>
                    </td>
                </tr>
            </tbody>
            -->
        </el-tab-pane>
        <el-tab-pane label="评分配置">定时任务补偿</el-tab-pane>
        <el-tab-pane label="分享配置">定时任务补偿</el-tab-pane>
        <el-tab-pane label="aihelp配置">定时任务补偿</el-tab-pane>
      </el-tabs>

      <el-footer>
        <el-button class="joy-btn" :size="size" type="primary" @click="">提 交</el-button>

        <router-link class="joy-btn" :to="{path:'/package/index'}">
          <el-button type="success" :size="size">列 表</el-button>
        </router-link>

      </el-footer>
    </el-form>
  </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {gkey} from '@/api/package'

    export default {
      // props: ['form'],
      data(){
        return {
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
                enevt: {
                  Key: ['abd'],
                  Value: ['111']
                }
              }
            }
          },
          rules: {
            // url: {type: 'url', required: false, message: '请填写正确格式的URL', trigger: 'blur' }
          },
          h5pf: {
            6: 'paypal',
            7: 'payssion'
          },
          adjustEnevtNum: 1,
        }
      },
      computed: {
        ...mapGetters([
          'size',
          'gamelist',
          'filtergamelist',
          'packos'
        ])
      },
      mounted() {
        this.$store.dispatch('filter/gameInfo')
      },
      methods: {
        // 随机生成key
        get_gkey(column) {
          let _this = this;
          gkey(column).then(resp => {
            _this.form.extension[column] = resp.data
          }).catch(error => {
            _this.$message.error(error)
          })
        },
        // 复制adjust事件框
        cp_param() {
          this.adjustEnevtNum++
        }
      }
    }
</script>

<style lang="scss" scoped>
  .labeli {
    font-size: .6rem;
    font-style: normal;
    display: block;
    color: #999;
  }

  .cRed {
    color: red!important;
  }

  .colInput {
    width: 90%;
    margin: 3px 0;
  }

  .el-footer {
    text-align: center;
    margin: 30px 10px;

    .joy-btn {
      margin: 0 10px;
    }
  }

  .joyline {
    border-top: 1px dashed #eee;
    padding: 5px;
  }
</style>
