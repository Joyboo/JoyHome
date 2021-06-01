<template>

  <el-drawer
    title="充值详情"
    :visible.sync="showdialog"
    @open="search"
    direction="ltr"
    size="80%">

    <div class="view-container" v-loading="loading">
      <el-button-group style="margin-bottom: 10px;">
        <el-button icon="el-icon-arrow-down" @click="activeNames = ['1', '2', '3', '4']">展开</el-button>
        <el-button @click="activeNames = []">收起<i class="el-icon-arrow-up el-icon--right"></i></el-button>
      </el-button-group>

      <el-collapse v-model="activeNames" v-if="data">
        <el-collapse-item title="订单信息" name="1">
          <el-row>
            <el-col :span="6">本站订单号1: {{query.gameid}}-{{data.id}}-{{data.instime}}</el-col>
            <el-col :span="6">金额: {{data.money}}美分</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">首充：{{data.gno == '1' ? '是':'否'}}</el-col>
            <el-col :span="6">分成后：{{data.receipts}}美分</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">下单时间：{{data.itime}}</el-col>
            <el-col :span="6">支付时间：{{data.utime > data.itime ? data.utime : ''}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">订单状态：{{paystatus[data.status]}}</el-col>
            <el-col :span="6">内测单：{{(typeof data.extension.istest != 'undefined' && data.extension.istest == 1) ? '是' : '否'}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" v-if="data.gname">所属游戏：{{data.gname}}</el-col>
            <el-col :span="6" v-if="data.package">所属包：{{data.package.name}}（{{data.package.pkgbnd}}）</el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="支付平台信息" name="2">
          <el-row>
            <el-col :span="6">支付方式：{{paypf[data.pf]}}</el-col>
            <el-col :span="6">官方订单号：{{data.paysn}}</el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="玩家信息" name="3">
          <el-row>
            <el-col :span="6">UID：{{data.uid}}</el-col>
            <el-col :span="6">IP：{{data.ip}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">设备标识：{{data.devid}}</el-col>
            <el-col :span="6">设备型号：{{data.exmodel}}</el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="角色相关信息" name="4">
          <el-row>
            <el-col :span="6" v-if="data.extension.roleid">角色id：{{data.extension.roleid}}</el-col>
            <el-col :span="6" v-if="data.extension.rolename">角色名称：{{data.extension.rolename}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" v-if="data.extension.sid">区服id：{{data.extension.sid}}</el-col>
            <el-col :span="6" v-if="data.extension.vip">VIP：{{data.extension.vip}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" v-if="data.extension.productid">productid：{{data.extension.productid}}</el-col>
            <el-col :span="6" v-if="data.extension.productname">productname：{{data.extension.productname}}</el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <h2 v-else>
        暂无数据
      </h2>
    </div>
  </el-drawer>

</template>

<script>
  import {mapGetters} from "vuex";
  import {payDetail} from "@/api/reg";

  export default {
    props: {
      dialog: {
        type: Boolean,
        default: false
      },
      query: {
        type: Object,
        default: {}
      }
    },
    computed: {
      ...mapGetters(['size']),
      paystatus() {
        return this.$store.state.filter.pay.status
      },
      paypf() {
        return this.$store.state.filter.pay.pf
      },
      showdialog: {
        get() {
          return this.dialog
        },
        set(val) {
          this.$emit('setdialog', val)
        }
      }
    },
    data() {
      return {
        loading: false,
        data: {
          id: 0,
          instime: '',
          money: '',
          gno: '',
          receipts: '',
          itime: '',
          utime: '',
          status: '',
          gname: '',
          pf: '',
          paysn: '',
          uid: '',
          ip: '',
          devid: '',
          exmodel: '',
          package: {
            name: '',
            pkgbnd: ''
          },
          extension: {
            istest: '',
            roleid: '',
            rolename: '',
            sid: '',
            vip: '',
            productid: '',
            productname: '',
          }
        },
        activeNames: ['1', '2', '3', '4']
      }
    },
    methods: {
      search() {
        this.loading = true
        payDetail(this.query)
          .then(resp => {
            const {data} = resp
            this.data = data || {}
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-row {
    background-color: #ebf3f5;
    padding: 5px 10px;
  }

</style>
