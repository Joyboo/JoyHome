<template>
  <div class="view-container" v-loading="loading">
    <el-form :size="size">
      <el-tabs type="border-card" @tab-click="tabClick">
        <el-tab-pane label="基本信息">

          <fieldset>
            <legend><b>基础信息</b></legend>
            <el-form :size="size" :inline="true">
              <el-form-item label="ID">
                <el-input disabled v-model="view.uid" class="myInput"></el-input>
              </el-form-item>

              <el-form-item label="用户名">
                <el-input disabled v-model="view.username" class="myInput"></el-input>
              </el-form-item>

              <el-form-item label="注册时间">
                <el-input disabled v-model="view.itime" class="myInput"></el-input>
              </el-form-item>

            </el-form>

            <el-form :size="size" :inline="true">
              <el-form-item label="包名">
                <el-input disabled v-model="view.pkgbnd" class="myInput"></el-input>
              </el-form-item>

              <el-form-item label="设备号">
                <el-input disabled v-model="view.devid" class="myInput"></el-input>
              </el-form-item>

              <el-form-item label="手机型号">
                <el-input disabled v-model="view.exmodel" class="myInput"></el-input>
              </el-form-item>

            </el-form>
          </fieldset>

          <fieldset>
            <legend><b>账号绑定信息</b></legend>
            <el-form :size="size" :inline="true">
              <el-form-item label="Facebook" v-if="typeof user.facebook != 'undefined'">
                <el-input disabled v-model="user.facebook" class="myInput"></el-input>
              </el-form-item>

              <el-form-item label="Gmail" v-if="typeof user.gmail != 'undefined'">
                <el-input disabled v-model="user.gmail" class="myInput"></el-input>
              </el-form-item>

              <el-form-item label="华为" v-if="typeof user.huawei != 'undefined'">
                <el-input disabled v-model="user.huawei" class="myInput"></el-input>
              </el-form-item>

            </el-form>
          </fieldset>

          <fieldset>
            <legend><b>Token</b></legend>
              <el-input
                v-model="token"
                type="textarea"
                :rows="5"
                disabled
              />
          </fieldset>

        </el-tab-pane>

        <el-tab-pane label="充值信息">

          <layout-filter :query="query" @search="searchPayment"  :loading="payloading">
            <el-form-item>
              <el-select v-model="query.pf" placeholder="请选择充值平台">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(payn, payk) in paypf" :key="payk" :label="payn" :value="payk" />
              </el-select>
            </el-form-item>
          </layout-filter>

          <table-data :loading="payloading" :column="payColumn" :data="payData"></table-data>
        </el-tab-pane>

        <el-tab-pane label="登录信息">

          <layout-filter :query="query" @search="searchLogin" :loading="loginloading"></layout-filter>
          <table-data :loading="loginloading" :column="loginColumn" :data="loginData"></table-data>

        </el-tab-pane>
      </el-tabs>

      <el-footer>
        <el-button type="primary" icon="el-icon-edit-outline" v-permission="['admin', '/user/edit']" @click="openDialog" :size="size">操作</el-button>
        <router-link class="joy-btn" to="/reg/index">
          <el-button icon="el-icon-c-scale-to-original" :size="size">列 表</el-button>
        </router-link>
      </el-footer>
    </el-form>

    <!--操作dialog-->
    <el-dialog title="操作" :visible="dialogFormVisible" :show-close="false" center>
      <el-form :model="form" :size="size" label-width="150px">

        <el-form-item label="绑定/解绑">
          <el-select v-model="form.opt" placeholder="请选择操作">
            <el-option label="绑定" value="bind"></el-option>
            <el-option label="解绑" value="unbind"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="第三方平台">
          <el-select v-model="form.type" placeholder="请选择第三方平台">
            <el-option label="Facebook" value="facebook"></el-option>
            <el-option label="Gmail" value="gmail"></el-option>
            <el-option label="华为" value="huawei"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="第三方账号" v-if="form.opt == 'bind'">
          <el-input v-model="form.value"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-popconfirm  @onConfirm="submit" title="确定要提交吗？" >
          <el-button type="primary" slot="reference">确 定</el-button>
        </el-popconfirm>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {regDetail, unbindBack, payIndex, loginIndex} from "@/api/reg";
  import {mapGetters} from "vuex";
  import TableData from '@/components/TableData'
  import LayoutFilter from '@/components/LayoutFilter'
  import permission from '@/directive/permission'

  export default {
    components: {
      TableData,
      LayoutFilter
    },
    directives: { permission },
    computed: {
      ...mapGetters(['size']),
      paypf() {
        return this.$store.state.filter.pay.pf
      },
      gameid() {
        return this.$route.query.gameid
      }
    },
    mounted() {
      this.query.gameid = this.gameid
      this.query.uid = this.$route.query.uid
      this.search(true)
    },
    data() {

      let query = {
        uid: '',
        gameid: '',
        pf: '',
        pkgbnd: [],
        begintime: true,
        endtime: true
      }
      query[this.$store.state.config.cPageKey] = 1
      query[this.$store.state.config.pSizeKey] = 100000  // 不分页，传个比较大的值

      return {
        dialogFormVisible: false,
        loading: false,
        token: '',
        user: {},
        view: {},
        form: {
          value: '',
          type: '',
          opt: '',
          ...this.$route.query
        },
        query: query,

        // 充值页
        payloading: false,
        payData: [],
        payColumn: [
          {
            key: 'instime',
            text: '订单号',
            template: (index, row) => {
              if (row.id == 'sum')
              {
                return '<span style="color: red;">' + row.pk + '<h3/>'
              } else {
                return row.gameid + '-' + row.id + '-' + index
              }
            }
          },{
            key: 'paysn',
            text: '官方订单号'
          }
          ,{
            key: 'extension',
            text: '区服id',
            width: '80',
            template: (index, row) => {
              if (!index) {
                return '';
              }
              return typeof index.sid  == 'undefined' ? '' : index.sid;
            }
          }
          , {
            key: 'extension',
            text: '角色信息',
            template: (index, row) => {
              if (!index) {
                return '';
              }
              let roleid = typeof index.roleid  == 'undefined' ? '' : index.roleid
              let rolename = typeof index.rolename  == 'undefined' ? '' : index.rolename
              if (rolename != '')
              {
                roleid += '（' + rolename + '）'
              }
              return roleid
            }
          }
          ,{
            key: 'money',
            text: '金额',
            width:'100'
          }
          ,{
            key: 'pf',
            text: '支付平台',
            width: '100',
            template: (index, row) => {
              return this.paypf[index] || index;
            }
          }
          ,{
            key: 'pkgbnd',
            text: '包名'
          }
          ,{
            key: 'utime',
            text: '支付时间'
          }
          ,{
            key: 'os',
            text: '系统',
            width: '100',
            template: (index, row) => {
              if (index == 0)
              {
                return '<span style="color: #00FF7F;">安卓</span>'
              }
              else if (index == 1)
              {
                return '<span style="color: #1E90FF;">苹果</span>'
              }
              else {
                return index
              }
            }
          }
          ,{
            key: 'osver',
            width: '100',
            text: '系统版本'
          }
          ,{
            key: 'sdkver',
            width: '100',
            text: 'SDK版本'
          }
          ,{
            key: 'exmodel',
            text: '手机品牌及型号'
          }
        ],

        // 登录页
        loginloading: false,
        loginData: [],
        loginColumn: [
          {
            key: 'itime',
            text: '登录时间'
          }
          ,{
            key: 'pkgbnd',
            text: '包名'
          }
          ,{
            key: 'devid',
            text: '设备ID'
          }
          ,{
            key: 'exmodel',
            text: '设备型号'
          }
          ,{
            key: 'os',
            text: '系统',
            width: '100',
            template: (index, row) => {
              if (index == 0)
              {
                return '<span style="color: #00FF7F;">安卓</span>'
              }
              else if (index == 1)
              {
                return '<span style="color: #1E90FF;">苹果</span>'
              }
              else {
                return index
              }
            }
          }
          ,{
            key: 'osver',
            width: '100',
            text: '系统版本'
          }
          ,{
            key: 'sdkver',
            width: '100',
            text: 'SDK版本'
          }
          ,{
            key: 'exmodel',
            text: '手机品牌及型号'
          }
          ,{
            key: 'ip',
            text: 'ip'
          }
        ]
      }
    },
    methods: {
      // 查充值数据
      searchPayment() {
        this.payloading = true
        const query = Object.assign({}, this.query, {pkgbnd: this.query.pkgbnd.join(',')})
        const {gameid} = query
        payIndex(query)
          .then(({code, msg, data}) => {
            if (!code )
            {
              this.$message.error(msg)
            } else {
              if (data.data)
              {
                for (const i in data.data)
                {
                  data.data[i].gameid = gameid
                }
              }
              this.payData = data.data || [];
            }
          })
          .finally(() => {
            this.payloading = false
          })
      },
      // 查登录数据
      searchLogin() {
        this.loginloading = true
        const query = Object.assign({}, this.query, {pkgbnd: this.query.pkgbnd.join(',')})
        const {gameid} = query
        loginIndex(query)
          .then(({code, msg, data}) => {
            if (!code)
            {
              this.$message.error(msg)
            } else {
              if (data.data)
              {
                for (const i in data.data)
                {
                  data.data[i].gameid = gameid
                }
              }
              this.loginData = data.data || [];
            }
          })
          .finally(() => {
            this.loginloading = false
          })
      },
      search(load) {
        if (load) {
          this.loading = true
        }
        regDetail(this.$route.query)
          .then(({code, msg, data}) => {
            if (!code) {
              this.$message.error(msg)
              return;
            }
            this.token = data.token
            this.user = data.user
            this.view = data.data
          })
          .finally(() => {
            if (load) {
              this.loading = false
            }
          })
      },
      submit() {
        this.loading = true
        let data = this.form
        data.id = this.view.uid
        unbindBack(data)
          .then(({code, msg}) => {
            this.$message({
              type: code ? 'success' : 'error',
              message: msg
            })
            if (code) {
              this.dialogFormVisible = false
              this.search(false)
            }
          })
          .catch(error => {
            this.$message.error(error)
          })
          .finally(() => {
            this.loading = false
          })
      },
      openDialog() {
        this.dialogFormVisible = true
      },
      // 标签页切换
      tabClick(tab) {
        const tabIndex = tab.index
        if (tabIndex == 1)
        {
          this.searchPayment()
        } else if (tabIndex == 2) {
          this.searchLogin()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  fieldset {
    border: 1px dotted #aaa;
    font-size: 0.8rem;
    color: #aaa;
    width: 80%;
    margin: 10px 0;
    padding: 20px;
    border-radius: 5px;
  }

  .myInput {
    width: 300px;
  }

  .dialog-footer {
    .el-button {
      margin: 0 10px;
    }
  }
</style>
