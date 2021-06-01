<template>
  <div v-loading="loading" class="view-container">
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

          <slot></slot>

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

        <el-tab-pane label="充值信息">

          <el-form-item>
            <template slot="label">
              充值产品ID<i class="labeli">逗号,或换行符隔开</i>
            </template>

            <el-input v-model="form.extension.goodsids" type="textarea" :rows="20" clearable />
          </el-form-item>

        </el-tab-pane>

        <el-tab-pane label="APP信息">

          <el-form-item>
            <template slot="label">
              维护开关<i class="labeli">维护期间时打开</i>
            </template>

            <el-radio-group v-model="form.extension.mtn.switch">
              <el-radio label="0" border>关闭</el-radio>
              <el-radio label="1" border>开启</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <template slot="label">
              维护时间段<i class="labeli">开关打开时有效 <i class="cRed">北京时间</i></i>
            </template>

            <el-date-picker
              v-model="date"
              type="datetimerange"
              format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>

          <el-form-item label="维护公告">
            <el-input v-model="form.extension.mtn.notice" type="textarea" :rows="5" clearable />
          </el-form-item>

          <el-form-item label="FB粉丝页">
            <el-input v-model="form.extension.facebook.fansurl" clearable />
          </el-form-item>

          <el-form-item label="私隐政策页">
            <el-input v-model="form.extension.google.privacy" clearable />
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

        <slot name="h5sdk"></slot>
      </el-tabs>

      <button-tpl index="/game/index" @submit="submit" />
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ButtonTpl from '@/components/ButtonTpl'

export default {
  components: {
    ButtonTpl
  },
  // name: 'gameInfoComponent',
  props: ['form', 'loading'],
  computed: {
    ...mapGetters([
      'size'
    ])
  },
  data() {
    return {
      date: []
    }
  },
  watch: {
    date(val) {
      if (typeof val != 'object')
      {
        return
      }

      this.form.extension.mtn.begintime = val[0]
      this.form.extension.mtn.endtime = val[1]
    },
    'form.extension': {
      immediate: true,
      handler: function (newVal, oldVal) {
        // 默认的开始和结束时间
        if (typeof newVal.mtn.begintime != 'undefined' && typeof newVal.mtn.endtime != 'undefined'
          && newVal.mtn.begintime != '' && newVal.mtn.endtime != '')
        {
          this.date = [new Date(newVal.mtn.begintime), new Date(newVal.mtn.endtime)]
        }
      }
    }
  },
  methods: {
    submit() {
      this.$emit('submit')
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
