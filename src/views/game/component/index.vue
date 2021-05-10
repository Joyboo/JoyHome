<template>
  <div class="view-container" v-loading="loading">
    <el-form ref="game-search" :model="form" :size="size" label-width="15rem">
      <el-tabs type="border-card">
        <el-tab-pane label="对接信息">

          <el-form-item label="名称">
            <el-input v-model="form.name" placeholder="产品名称" style="width: 50%" maxlength="50" show-word-limit clearable />
          </el-form-item>

          <el-form-item label="类型">
            <el-radio-group v-model="form.extension.type">
              <el-radio label="0" border>H5</el-radio>
              <el-radio label="1" border>手游</el-radio>
            </el-radio-group>
          </el-form-item>

          <template v-if="isupd">
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

          </template>

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

        </el-tab-pane>

        <el-tab-pane label="APP信息">

          <el-form-item>
            <template slot="label">
              充值产品ID<i class="labeli">逗号,或换行符隔开</i>
            </template>

            <el-col>
              <el-input v-model="form.extension.goodsids" type="textarea" :rows="3" clearable />
            </el-col>
          </el-form-item>

          <el-form-item label="FB粉丝页">
            <el-input v-model="form.extension.facebook.fansurl" clearable />
          </el-form-item>

        </el-tab-pane>

        <el-tab-pane label="分成信息">

          <el-form-item>
            <template slot="label">
              CP分成比例<i class="labeli">研发的分成百分比</i>
            </template>

            <el-input v-model="form.extension.divide.cp" class="minInput" clearable />%
          </el-form-item>

          <el-form-item label="IOS分成比例">
            <el-input v-model="form.extension.divide.ios" class="minInput" clearable />%
          </el-form-item>

          <el-form-item label="google分成比例">
            <el-input v-model="form.extension.divide.google" class="minInput" clearable />%
          </el-form-item>

          <el-form-item label="paypal分成比例">
            <div class="paypalIpt">
              <el-input v-model="form.extension.divide.paypal" class="minInput" clearable />%
            </div>
            <div class="paypalIpt">
              + <el-input v-model="form.extension.divide['paypal-fix']" class="minInput" clearable />
            </div>
          </el-form-item>

          <el-form-item label="payssion分成比例">
            <el-input v-model="form.extension.divide.payssion" class="minInput" clearable />%
          </el-form-item>

          <el-form-item label="华为分成比例">
            <el-input v-model="form.extension.divide.huawei" class="minInput" clearable />%
          </el-form-item>

        </el-tab-pane>

      </el-tabs>

      <button-tpl index="/game/index" @submit="submit"></button-tpl>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { gkey } from '@/api/game'
import ButtonTpl from '@/layout/components/ButtonTpl'

export default {
  // name: 'gameInfoComponent',
  props: ['form', 'loading'],
  components: {
    ButtonTpl
  },
  computed: {
    ...mapGetters([
      'size'
    ]),
    isupd() {
      return typeof this.form.id !== 'undefined'
    }
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .minInput {
    width: 100px;
  }

  .paypalIpt {
    float: left;
  }
</style>
