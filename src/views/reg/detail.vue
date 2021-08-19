<template>
  <div v-loading="loading" class="view-container">
    <el-form :size="size">
      <el-tabs type="border-card" @tab-click="tabClick">
        <el-tab-pane label="基本信息">

          <fieldset>
            <legend><b>基础信息</b></legend>
            <el-form :size="size" :inline="true">
              <el-form-item label="ID">
                <el-input v-model="view.uid" disabled class="myInput" />
              </el-form-item>

              <el-form-item label="用户名">
                <el-input v-model="view.username" disabled class="myInput" />
              </el-form-item>

              <el-form-item label="注册时间">
                <el-input v-model="view.itime" disabled class="myInput" />
              </el-form-item>

            </el-form>

            <el-form :size="size" :inline="true">
              <el-form-item label="包名">
                <el-input v-model="view.pkgbnd" disabled class="myInput" />
              </el-form-item>

              <el-form-item label="设备号">
                <el-input v-model="view.devid" disabled class="myInput" />
              </el-form-item>

              <el-form-item label="手机型号">
                <el-input v-model="view.exmodel" disabled class="myInput" />
              </el-form-item>

            </el-form>
          </fieldset>

          <fieldset>
            <legend><b>账号绑定信息</b></legend>
            <el-form :size="size" :inline="true">
              <el-form-item v-if="typeof user.facebook != 'undefined'" label="Facebook">
                <el-input v-model="user.facebook" disabled class="myInput" />
              </el-form-item>

              <el-form-item v-if="typeof user.gmail != 'undefined'" label="Gmail">
                <el-input v-model="user.gmail" disabled class="myInput" />
              </el-form-item>

              <el-form-item v-if="typeof user.huawei != 'undefined'" label="华为">
                <el-input v-model="user.huawei" disabled class="myInput" />
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

          <layout-filter :query="query" :loading.sync="payloading" :layout-config="layoutConfig" @search="searchPayment">
            <el-form-item>
              <el-select v-model="query.pf" placeholder="请选择充值平台">
                <el-option label="全部" value="" />
                <el-option v-for="(payn, payk) in paypf" :key="payk" :label="payn" :value="payk" />
              </el-select>
            </el-form-item>
          </layout-filter>

          <table-data :loading.sync="payloading" :column="payColumn" :data="payData" />
        </el-tab-pane>

        <el-tab-pane label="登录信息">

          <layout-filter :query="query" :loading.sync="loginloading" :layout-config="layoutConfig" @search="searchLogin" />
          <table-data :loading.sync="loginloading" :column="loginColumn" :data="loginData" />

        </el-tab-pane>
      </el-tabs>

      <el-footer>
        <el-button v-permission="['admin', '/user/edit']" type="primary" icon="el-icon-edit-outline" :size="size" @click="openDialog">操作</el-button>
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
            <el-option label="绑定" value="bind" />
            <el-option label="解绑" value="unbind" />
          </el-select>
        </el-form-item>

        <el-form-item label="第三方平台">
          <el-select v-model="form.type" placeholder="请选择第三方平台">
            <el-option label="Facebook" value="facebook" />
            <el-option label="Gmail" value="gmail" />
            <el-option label="华为" value="huawei" />
          </el-select>
        </el-form-item>

        <el-form-item v-if="form.opt == 'bind'" label="第三方账号">
          <el-input v-model="form.value" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-popconfirm title="确定要提交吗？" @onConfirm="submit">
          <el-button slot="reference" type="primary">确 定</el-button>
        </el-popconfirm>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regDetail, unbindBack, payIndex, loginIndex } from '@/api/reg'
import { mapGetters } from 'vuex'
import TableData from '@/components/TableData'
import LayoutFilter from '@/components/LayoutFilter'
import permission from '@/directive/permission'

export default {
  components: {
    TableData,
    LayoutFilter
  },
  directives: { permission },
  data() {
    const query = {
      uid: '',
      gameid: '',
      pf: '',
      pkgbnd: [],
      begintime: true,
      endtime: true
    }
    query[this.$store.state.config.cPageKey] = 1
    query[this.$store.state.config.pSizeKey] = 100000 // 不分页，传个比较大的值

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

      layoutConfig: {
        isBeginTime: true,
        isEndTime: true,
        showGame: 1,
        showPackage: 2
      },

      // 充值页
      payloading: false,
      payData: [],
      payColumn: [
        {
          key: 'instime',
          text: '订单号',
          template: (index, row) => {
            if (row.id == 'sum') {
              return '<span style="color: red;">' + row.pk + '<h3/>'
            } else {
              return row.gameid + '-' + row.id + '-' + index
            }
          }
        }, {
          key: 'paysn',
          text: '官方订单号'
        },
        {
          key: 'extension',
          text: '区服id',
          width: '80',
          template: (index, row) => {
            if (!index) {
              return ''
            }
            return typeof index.sid == 'undefined' ? '' : index.sid
          }
        },
        {
          key: 'extension',
          text: '角色信息',
          template: (index, row) => {
            if (!index) {
              return ''
            }
            let roleid = typeof index.roleid == 'undefined' ? '' : index.roleid
            const rolename = typeof index.rolename == 'undefined' ? '' : index.rolename
            if (rolename != '') {
              roleid += '（' + rolename + '）'
            }
            return roleid
          }
        },
        {
          key: 'money',
          text: '金额',
          width: '100'
        },
        {
          key: 'pf',
          text: '支付平台',
          width: '100',
          template: (index, row) => {
            return this.paypf[index] || index
          }
        },
        {
          key: 'pkgbnd',
          text: '包名'
        },
        {
          key: 'utime',
          text: '支付时间'
        },
        {
          key: 'os',
          text: '系统',
          width: '100',
          template: (index, row) => {
            if (index == 0) {
              return '<span style="color: #00FF7F;">安卓</span>'
            } else if (index == 1) {
              return '<span style="color: #1E90FF;">苹果</span>'
            } else {
              return index
            }
          }
        },
        {
          key: 'osver',
          width: '100',
          text: '系统版本'
        },
        {
          key: 'sdkver',
          width: '100',
          text: 'SDK版本'
        },
        {
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
        },
        {
          key: 'pkgbnd',
          text: '包名'
        },
        {
          key: 'devid',
          text: '设备ID'
        },
        {
          key: 'exmodel',
          text: '设备型号'
        },
        {
          key: 'os',
          text: '系统',
          width: '100',
          template: (index, row) => {
            if (index == 0) {
              return '<span style="color: #00FF7F;">安卓</span>'
            } else if (index == 1) {
              return '<span style="color: #1E90FF;">苹果</span>'
            } else {
              return index
            }
          }
        },
        {
          key: 'osver',
          width: '100',
          text: '系统版本'
        },
        {
          key: 'sdkver',
          width: '100',
          text: 'SDK版本'
        },
        {
          key: 'exmodel',
          text: '手机品牌及型号'
        },
        {
          key: 'ip',
          text: 'ip'
        }
      ]
    }
  },
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
  methods: {
    // 查充值数据
    searchPayment() {
      this.payloading = true
      const query = Object.assign({}, this.query, { pkgbnd: this.query.pkgbnd.join(',') })
      const { gameid } = query
      payIndex(query)
        .then(({ code, msg, data }) => {
          if (!code) {
            this.$message.error(msg)
          } else {
            if (data.data) {
              for (const i in data.data) {
                data.data[i].gameid = gameid
              }
            }
            this.payData = data.data || []
          }
        })
        .finally(() => {
          this.payloading = false
        })
    },
    // 查登录数据
    searchLogin() {
      this.loginloading = true
      const query = Object.assign({}, this.query, { pkgbnd: this.query.pkgbnd.join(',') })
      const { gameid } = query
      loginIndex(query)
        .then(({ code, msg, data }) => {
          if (!code) {
            this.$message.error(msg)
          } else {
            if (data.data) {
              for (const i in data.data) {
                data.data[i].gameid = gameid
              }
            }
            this.loginData = data.data || []
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
        .then(({ code, msg, data }) => {
          if (!code) {
            this.$message.error(msg)
            return
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
      const data = this.form
      data.id = this.view.uid
      unbindBack(data)
        .then(({ code, msg }) => {
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
      if (tabIndex == 1) {
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
