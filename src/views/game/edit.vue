<template>
  <game-info :form="form" :loading="loading" @submit="submit" >

    <!--默认插槽-->
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


    <!--h5sdk插槽-->
    <template v-slot:h5sdk>
      <el-tab-pane label="H5SDK">

        <el-form-item label="本游戏是否显示">
          <el-radio-group v-model="form.extension.h5sdk.isshow">
            <el-radio label="0" border>隐藏</el-radio>
            <el-radio label="1" border>显示</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="显示游戏名">
          <el-input v-model="form.extension.h5sdk.name" clearable />
        </el-form-item>

        <el-form-item>
          <template slot="label">
            包<i class="labeli">登录appid用哪个包的{{form.extension.h5sdk.pkgbnd}}</i>
          </template>

          <el-select v-model="form.extension.h5sdk.pkgbnd" filterable>
            <el-option
              v-for="item in packagelist"
              :key="item.pkgbnd"
              :label="item.name"
              :value="item.pkgbnd"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否显示角标">
          <el-radio-group v-model="form.extension.h5sdk.isshowmnlogo">
            <el-radio label="0" border>隐藏</el-radio>
            <el-radio label="1" border>显示</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="角标图">
          <el-col :span="12">
            <el-upload
              class="upload-demo"
              action="joyboo"
              :http-request="uploadMnlogoUrl"
              :limit="1"
              :file-list="viewmnurl"
              list-type="picture"
            >
              <el-button :size="size" type="primary">点击上传角标</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB，最多1张图片</div>
            </el-upload>
          </el-col>
        </el-form-item>

        <div class="joyline" />

        <el-form-item label="游戏logo">
          <el-col :span="12">
            <el-upload
              class="upload-demo"
              action="joyboo"
              :http-request="uploadgamelogo"
              :limit="1"
              :file-list="viewgamelogo"
              list-type="picture"
            >
              <el-button :size="size" type="primary">点击上传游戏logo</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB，最多1张图片</div>
            </el-upload>
          </el-col>
        </el-form-item>

        <div class="joyline" />

        <el-form-item label="轮播图">
          <el-col :span="12">
            <el-upload
              class="upload-demo"
              action="joyboo"
              :http-request="uploadcarousel"
              :limit="5"
              multiple
              :file-list="viewcarousel"
              :on-remove="removecarousel"
              list-type="picture"
            >
              <el-button :size="size" type="primary">点击上传轮播图</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB，最多5张图片</div>
            </el-upload>
          </el-col>
        </el-form-item>

      </el-tab-pane>
    </template>

  </game-info>
</template>

<script>
  import {gameEdit, gkey} from '@/api/game'
  import gameInfo from './component'
  import {copyTo} from "@/utils";
  import {packageChildOption} from "@/api/package";
  import {uploadHttpRequest} from "@/api/upload";
  import {mapGetters} from "vuex";

  export default {
    components: {
      gameInfo
    },
    computed: {
      ...mapGetters(['size']),
      viewmnurl() {
        return this.form.extension.h5sdk.mnlogo ? [{ url: this.form.default_path + this.form.extension.h5sdk.mnlogo }] : []
      },
      viewgamelogo() {
        return this.form.extension.h5sdk.gamelogo ? [{ url: this.form.default_path + this.form.extension.h5sdk.gamelogo }] : []
      },
      viewcarousel() {
        let arr = []
        const carousel = this.form.extension.h5sdk.carousel.split(',')
        carousel.forEach(item => {
          if (item)
          {
            arr.push({url: this.form.default_path + item})
          }
        })
        return arr
      }
    },
    data() {
      return {
        form: {
          id: '',
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
            },
            h5sdk: {
              isshow: '0',
              name: '',
              gameid: '',
              pkgbnd: '',
              isshowmnlogo: '1',
              mnlogo: '', // 角标
              gamelogo: '', // logo
              carousel: ''  // 轮播图
            }
          }
        },
        loading: false,
        packagelist: []
      }
    },
    async mounted() {
      try{
        this.form.id = this.$route.query.id
        const {code, msg, data} = await gameEdit('get', { id: this.form.id })
        if (!code)
        {
          this.$message.error(msg)
          return
        }

        this.form = copyTo(this.form, data.data)
        this.form.extension.h5sdk['gameid'] = this.form.id

        const pkg = await packageChildOption({ gameid: this.form.id })
        if (pkg.code)
        {
          this.packagelist = pkg.data
        }

      } catch (e) {
        console.error(e)
      }
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
      },

      // 上传角标
      uploadMnlogoUrl(params) {
        uploadHttpRequest(params, {url: '/admin/game/upload'})
          .then(data => {
            this.form.extension.h5sdk.mnlogo = data
          })
          .catch(error => {})
      },

      // 上传游戏logo
      uploadgamelogo(params) {
        uploadHttpRequest(params, {url: '/admin/game/upload'})
          .then(data => {
            this.form.extension.h5sdk.gamelogo = data
          })
          .catch(error => {})
      },

      // 上传轮播图，批量上传
      uploadcarousel(params) {
        uploadHttpRequest(params, {url: '/admin/game/upload'})
          .then(data => {
            const arr = this.form.extension.h5sdk.carousel.split(',')
            arr.push(data)
            this.form.extension.h5sdk.carousel = arr.join(',')
          })
          .catch(error => {})
      },
      // 移除时的勾子,批量上传时组件会调用多次http-request而不是一次上传多个
      removecarousel(file, fileList) {
        let arr = []
        this.form.extension.h5sdk.carousel.split(',').forEach(item => {
          if (file.url.indexOf(item) < 0)
          {
            arr.push(item)
          }
        })
        this.form.extension.h5sdk.carousel = arr.join(',')
      }
    }
  }
</script>

<style scoped>

</style>
