<template>
  <div v-loading="loading" class="view-container">
    <el-form ref="package-search" :model="form" :size="size" :rules="rules" label-width="15rem">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="所属游戏">
            <el-select v-model="form.gameid" filterable clearable>
              <el-option
                v-for="item in filtergamelist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="包操作系统">
            <el-radio v-for="(pack, key) in packos" v-model="form.os" :key="key" :label="key" border>{{ pack }}</el-radio>
          </el-form-item>

          <el-form-item label="包">
            <el-col :span="10">
              <el-input v-model="form.name" class="colInput" clearable placeholder="包名" />
            </el-col>

            <el-col :span="10">
              <el-input v-model="form.pkgbnd" class="colInput" clearable placeholder="包id(bundle_id或pkg_id)" />
            </el-col>
          </el-form-item>

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

          <el-form-item label="下载地址">
            <el-input v-model="form.url" clearable />
          </el-form-item>

          <el-form-item>
            <template slot="label">
              登录api网址 <i class="labeli">平台会将用户token传到此网址</i><i class="cRed labeli">手游此项可随便填</i>
            </template>
            <el-input v-model="form.extension.logurl" clearable />
          </el-form-item>

          <el-form-item>
            <template slot="label">
              支付api网址 <i class="labeli">平台会将支付信息传到此网址</i>
            </template>
            <el-input v-model="form.extension.payurl" clearable />
          </el-form-item>

          <!-- todo 自动填充域名（直接后端处理？？）-->
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
              <el-input
                v-model="form.extension.google_paykey"
                class="colInput"
                type="textarea"
                :rows="3"
                clearable
                placeholder="paykey公钥"
              />
            </el-col>

            <el-col :span="10">
              <el-input
                v-model="form.extension.google.web_clientid"
                class="colInput"
                type="textarea"
                :rows="3"
                clearable
                placeholder="web_client客户端id"
              />
            </el-col>
          </el-form-item>

          <el-form-item label="华为参数">
            <el-col :span="10">
              <el-input
                v-model="form.extension.huawei.production.clientid"
                class="colInput"
                type="textarea"
                :rows="3"
                clearable
                placeholder="正式client_id"
              />
            </el-col>

            <el-col :span="10">
              <el-input
                v-model="form.extension.huawei.production.clientsecret"
                class="colInput"
                type="textarea"
                :rows="3"
                clearable
                placeholder="正式client_secret"
              />
            </el-col>
          </el-form-item>

          <el-form-item label="facebook参数">
            <el-col :span="10">
              <el-input
                v-model="form.extension.facebook.bindnotice"
                class="colInput"
                type="textarea"
                :rows="3"
                clearable
                placeholder="绑定通知"
              />
            </el-col>

            <el-col :span="10">
              <el-input
                v-model="form.extension.facebook.appid"
                class="colInput"
                type="textarea"
                :rows="3"
                clearable
                placeholder="appid"
              />
            </el-col>
          </el-form-item>

          <el-form-item label="MG参数">
            <el-col :span="10">
              <el-input
                v-model="form.extension.mg.appkey"
                class="colInput"
                type="textarea"
                :rows="3"
                clearable
                placeholder="appkey"
              />
            </el-col>

            <el-col :span="10">
              <el-input
                v-model="form.extension.mg.publickey"
                class="colInput"
                type="textarea"
                :rows="3"
                clearable
                placeholder="publickey"
              />
            </el-col>
          </el-form-item>

        </el-tab-pane>
        <el-tab-pane label="切支付配置">

          <el-form-item>
            <template slot="label">
              切支付 <i class="labeli">开启H5支付</i>
            </template>
            <el-radio v-model="form.extension.qzf.enable" label="0" border>关闭</el-radio>
            <el-radio v-model="form.extension.qzf.enable" label="1" border>开启</el-radio>
          </el-form-item>

          <el-form-item>
            <template slot="label">
              H5支付方式 <i class="labeli">切支付开启时有效11</i>
            </template>

            <el-checkbox-group v-model="form.extension.qzf.pf">
              <el-checkbox v-for="pname in h5pf" :key="pname" :label="pname" />
            </el-checkbox-group>

          </el-form-item>

          <div class="joyline" />

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
                  <el-input
                    v-model="form.extension.paypal.production.clientid"
                    class="colInput"
                    type="textarea"
                    :rows="2"
                    clearable
                    placeholder="正式clientId"
                  />
                </el-col>
                <el-col :span="10">
                  <el-input
                    v-model="form.extension.paypal.production.clientsecret"
                    class="colInput"
                    type="textarea"
                    :rows="2"
                    clearable
                    placeholder="正式clientSecret"
                  />
                </el-col>
              </el-row>
              <el-row style="margin: 20px;">
                <el-col :span="10">
                  <el-input
                    v-model="form.extension.paypal.sandbox.clientid"
                    class="colInput"
                    type="textarea"
                    :rows="2"
                    clearable
                    placeholder="沙盒clientId"
                  />
                </el-col>
                <el-col :span="10">
                  <el-input
                    v-model="form.extension.paypal.sandbox.clientsecret"
                    class="colInput"
                    type="textarea"
                    :rows="2"
                    clearable
                    placeholder="沙盒clientSecret"
                  />
                </el-col>
              </el-row>
            </el-row>
          </el-form-item>

          <div class="joyline" />

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
                  <el-input
                    v-model="form.extension.payssion.production.clientid"
                    class="colInput"
                    type="textarea"
                    :rows="2"
                    clearable
                    placeholder="正式clientId"
                  />
                </el-col>
                <el-col :span="10">
                  <el-input
                    v-model="form.extension.payssion.production.clientsecret"
                    class="colInput"
                    type="textarea"
                    :rows="2"
                    clearable
                    placeholder="正式clientSecret"
                  />
                </el-col>
              </el-row>
              <el-row style="margin: 20px;">
                <el-col :span="10">
                  <el-input
                    v-model="form.extension.payssion.sandbox.clientid"
                    class="colInput"
                    type="textarea"
                    :rows="2"
                    clearable
                    placeholder="沙盒clientId"
                  />
                </el-col>
                <el-col :span="10">
                  <el-input
                    v-model="form.extension.payssion.sandbox.clientsecret"
                    class="colInput"
                    type="textarea"
                    :rows="2"
                    clearable
                    placeholder="沙盒clientSecret"
                  />
                </el-col>
              </el-row>
            </el-row>
          </el-form-item>

        </el-tab-pane>
        <el-tab-pane label="adjust配置">

          <el-form-item label="货币类型">
            <el-input v-model="form.extension.adjust.currency" clearable />
          </el-form-item>

          <el-form-item label="事件">
            <el-row>
              <el-button icon="el-icon-plus" :size="size" type="primary" plain @click="cp_param" />
            </el-row>
            <el-row v-for="(ipt, key) in form.extension.adjust.event" :key="key">
              <el-col :span="8">
                <el-input v-model="ipt.Key" class="colInput" clearable placeholder="Key" />
              </el-col>
              <el-col :span="8">
                <el-input v-model="ipt.Value" class="colInput" clearable placeholder="Value" />
              </el-col>
              <el-col :span="4">
                <el-button icon="el-icon-delete" :size="size" type="danger" plain @click="del_param(ipt)" />
              </el-col>
            </el-row>
          </el-form-item>

        </el-tab-pane>
        <el-tab-pane label="评分配置">

          <el-form-item label="开关">
            <el-radio v-model="form.extension.rating.pop" label="0" border>关闭</el-radio>
            <el-radio v-model="form.extension.rating.pop" label="1" border>开启</el-radio>
          </el-form-item>

          <el-form-item label="定时器">
            <el-input v-model="form.extension.rating.time" style="width: 300px;" clearable>
              <span slot="suffix">分钟后弹出（开关打开时有效）</span>
            </el-input>
          </el-form-item>

          <div class="joyline" />

          <el-form-item label="背景图">
            <el-col :span="12">
              <el-upload
                class="upload-demo"
                action="joyboo"
                :http-request="uploadBgUrl"
                :limit="1"
                :file-list="viewbgurl"
                list-type="picture"
              >
                <el-button :size="size" type="primary">点击上传背景图</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
              </el-upload>
            </el-col>
          </el-form-item>

          <div class="joyline" />

          <el-form-item label="按钮图">
            <el-col :span="12">
              <el-upload
                class="upload-demo"
                action="joyboo"
                :http-request="uploadBtnUrl"
                :limit="1"
                :file-list="viewbtnurl"
                list-type="picture"
              >
                <el-button :size="size" type="primary">点击上传按钮图</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
              </el-upload>
            </el-col>
          </el-form-item>

          <div class="joyline" />

          <el-form-item label="标题图 rate now">
            <el-col :span="12">
              <el-upload
                class="upload-demo"
                action="joyboo"
                :http-request="uploadTitUrl"
                :limit="1"
                :file-list="viewtiturl"
                list-type="picture"
              >
                <el-button :size="size" type="primary">点击上传标题图</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
              </el-upload>
            </el-col>
          </el-form-item>

          <div class="joyline" />

          <el-form-item label="左按钮图 its ok">
            <el-col :span="12">
              <el-upload
                class="upload-demo"
                action="joyboo"
                :http-request="uploadLeftUrl"
                :limit="1"
                :file-list="viewlefturl"
                list-type="picture"
              >
                <el-button :size="size" type="primary">点击上传左按钮图</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
              </el-upload>
            </el-col>
          </el-form-item>

          <div class="joyline" />

          <el-form-item label="右按钮图 love it">
            <el-col :span="12">
              <el-upload
                class="upload-demo"
                action="joyboo"
                :http-request="uploadRightUrl"
                :limit="1"
                :file-list="viewrighturl"
                list-type="picture"
              >
                <el-button :size="size" type="primary">点击上传右按钮图</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
              </el-upload>
            </el-col>
          </el-form-item>

          <el-form-item label="跳转地址">
            <el-input v-model="form.extension.rating.storeurl" clearable />
          </el-form-item>

        </el-tab-pane>
        <el-tab-pane label="分享配置">
          <el-form-item label="分享图">
            <el-col :span="12">
              <el-upload
                class="upload-demo"
                action="joyboo"
                :http-request="uploadShareImg"
                :limit="1"
                :file-list="viewshare"
                list-type="picture"
              >
                <el-button :size="size" type="primary">点击上传分享图</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
              </el-upload>
            </el-col>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="aihelp配置">
          <el-form-item label="sectionid">
            <el-input v-model="form.extension.aihelp.sectionid" clearable />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>

      <button-tpl index="/package/index" @submit="submit" />
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { gkey } from '@/api/package'
import { uploadJb } from '@/api/upload'
import ButtonTpl from '@/components/ButtonTpl'

export default {
  components: {
    ButtonTpl
  },
  props: ['form', 'loading'],
  data() {
    return {
      rules: {
        url: [
          { required: false, message: '请填写URL', trigger: 'blur' },
          { type: 'url', message: '请填写正确格式的URL', trigger: 'blur' }
        ]
      },
      h5pf: {
        6: 'paypal',
        7: 'payssion'
      }
    }
  },
  computed: {
    ...mapGetters([
      'size',
      'gamelist',
      'filtergamelist',
      'packos'
    ]),
    isupd() {
      return typeof this.form.id !== 'undefined'
    },
    viewbgurl() {
      return (this.isupd && this.form.extension.rating.bgurl) ? [{ url: this.form.default_path + this.form.extension.rating.bgurl }] : []
    },
    viewbtnurl() {
      return (this.isupd && this.form.extension.rating.btnurl) ? [{ url: this.form.default_path + this.form.extension.rating.btnurl }] : []
    },
    viewtiturl() {
      return (this.isupd && this.form.extension.rating.titurl) ? [{ url: this.form.default_path + this.form.extension.rating.titurl }] : []
    },
    viewlefturl() {
      return (this.isupd && this.form.extension.rating.lefturl) ? [{ url: this.form.default_path + this.form.extension.rating.lefturl }] : []
    },
    viewrighturl() {
      return (this.isupd && this.form.extension.rating.righturl) ? [{ url: this.form.default_path + this.form.extension.rating.righturl }] : []
    },
    viewshare() {
      return (this.isupd && this.form.extension.share.img) ? [{ url: this.form.default_path + this.form.extension.share.img }] : []
    }
  },
  mounted() {
    this.$store.dispatch('filter/gameInfo')
  },
  methods: {
    submit() {
      this.$emit('submit')
    },
    // 随机生成key
    get_gkey(column) {
      gkey(column).then(resp => {
        this.form.extension[column] = resp.data
      }).catch(error => {
        this.$message.error(error)
      })
    },
    // 上传背景图
    uploadBgUrl(params) {
      this.uploadHttpRequest(params).then(data => {
        this.form.extension.rating.bgurl = data
      })
    },
    // 上传按钮图
    uploadBtnUrl(params) {
      this.uploadHttpRequest(params).then(data => {
        this.form.extension.rating.btnurl = data
      })
    },
    // 上传标题图
    uploadTitUrl(params) {
      this.uploadHttpRequest(params).then(data => {
        this.form.extension.rating.titurl = data
      })
    },
    // 左按钮图
    uploadLeftUrl(params) {
      this.uploadHttpRequest(params).then(data => {
        this.form.extension.rating.lefturl = data
      })
    },
    // 右按钮图
    uploadRightUrl(params) {
      this.uploadHttpRequest(params).then(data => {
        this.form.extension.rating.righturl = data
      })
    },
    // 上传分享图
    uploadShareImg(params) {
      this.uploadHttpRequest(params).then(data => {
        this.form.extension.share.img = data
      })
    },
    // 覆盖默认的上传行为
    uploadHttpRequest(params) {
      return new Promise((resolve) => {
        const file = params.file
        const fileType = file.type

        if (fileType.indexOf('image') == -1) {
          this.$message.error('只能上传图片格式!')
          return
        }
        if (file.size / 1024 / 1024 > 2) {
          this.$message.error('只能上传图片大小小于2M')
          return
        }

        uploadJb('/admin/package/upload', params).then(resp => {
          const { status, data } = resp
          if (status == 200) {
            this.$message.success('上传成功')
            resolve(data)
          } else {
            this.$message.error('上传失败了')
          }
        })
      })
    },
    // 复制adjust事件框
    cp_param() {
      this.form.extension.adjust.event.push({
        Key: '',
        Value: ''
      })
    },
    del_param(ipt) {
      var index = this.form.extension.adjust.event.indexOf(ipt)
      if (index !== -1) {
        this.form.extension.adjust.event.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
