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
            <el-table :data="bindData" :border="false" :size="size">
              <el-table-column align="center" prop="type" label="平台" />
              <el-table-column align="center" prop="value" label="绑定信息">
                <template slot-scope="{ row }">
                  <span v-if="row.value">
                    <span style="margin-right: 10px;">{{ row.value }}</span>
                    <el-tooltip content="复制" placement="bottom">
                      <i :style="{cursor: 'pointer', color: theme}" class="el-icon-copy-document" @click="clipboard(row.value, $event)" />
                    </el-tooltip>
                  </span>
                  <span v-else>
                    <el-row v-if="row.isupd">
                      <el-col :span="13">
                        <el-input v-model="row.updValue" autofocus class="edit-input" :size="size" />
                      </el-col>
                      <el-col :span="1" />
                      <el-col :span="10">
                        <el-button :size="size" type="warning" @click="cancelBind(row)">取消</el-button>
                        <el-button :size="size" type="success" @click="saveBind(row)">保存</el-button>
                      </el-col>
                    </el-row>
                    <span v-else class="danger">未绑定</span>
                  </span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button
                    v-if="!row.value"
                    v-permission="['admin', '/user/edit']"
                    :disabled="row.isupd"
                    type="text"
                    @click="row.isupd = true"
                  >绑定</el-button>
                  <el-button v-else v-permission="['admin', '/user/edit']" type="text" @click="doUnBind(row)">解绑</el-button>
                  <el-button type="text" :disabled="!row.value" @click="clearCache(row)">清除缓存</el-button>
                </template>
              </el-table-column>
            </el-table>
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
        <router-link class="joy-btn" to="/reg/index">
          <el-button icon="el-icon-c-scale-to-original" :size="size">列 表</el-button>
        </router-link>
      </el-footer>
    </el-form>

  </div>
</template>

<script>
import { regDetail, unbindBack, payIndex, loginIndex } from '@/api/reg'
import { mapGetters } from 'vuex'
import TableData from '@/components/TableData'
import LayoutFilter from '@/components/LayoutFilter'
import permission from '@/directive/permission'
import clipboard from '@/utils/clipboard'

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
      pkgbnd: []
    }
    query[this.$store.state.config.cPageKey] = 1
    query[this.$store.state.config.pSizeKey] = 100000 // 不分页，传个比较大的值

    return {
      loading: false,
      token: '',
      user: {}, // 废弃
      bindData: [],
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
            if (row.id === 'sum') {
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
            return typeof index.sid === 'undefined' ? '' : index.sid
          }
        },
        {
          key: 'extension',
          text: '角色信息',
          template: (index, row) => {
            if (!index) {
              return ''
            }
            let roleid = typeof index.roleid === 'undefined' ? '' : index.roleid
            const rolename = typeof index.rolename === 'undefined' ? '' : index.rolename
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
    paypf() {
      return this.$store.state.filter.pay.pf
    },
    gameid() {
      return this.$route.query.gameid
    },
    theme() {
      return this.$store.state.settings.theme
    },
    ...mapGetters(['size'])
  },
  mounted() {
    this.query.gameid = this.gameid
    this.query.uid = this.$route.query.uid
    this.search(true)
  },
  methods: {
    clipboard,
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
          // this.user = data.user
          const bindData = data.bind || []
          // 给每一个加上是否编辑中的字段
          this.bindData = bindData.map(v => {
            this.$set(v, 'isupd', false)
            this.$set(v, 'originValue', v.value) // 原值
            // 空值，row.value双向绑定，使用同一流程控制，如不使用新值会导致刚被修改状态就改变了
            this.$set(v, 'updValue', '')
            return v
          })
          this.view = data.data
        })
        .finally(() => {
          if (load) {
            this.loading = false
          }
        })
    },
    submit(data) {
      this.loading = true
      // const data = this.form
      // data.id = this.view.uid
      unbindBack(data)
        .then(({ code, msg }) => {
          this.$message({
            type: code ? 'success' : 'error',
            message: msg
          })
          if (code) {
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
    // 标签页切换
    tabClick(tab) {
      const tabIndex = tab.index
      if (tabIndex == 1) {
        this.searchPayment()
      } else if (tabIndex == 2) {
        this.searchLogin()
      }
    },
    // 绑定-取消
    cancelBind(row) {
      row.value = row.originValue
      row.updValue = ''
      row.isupd = false
    },
    // 绑定-提交
    saveBind(row) {
      // 提交成功后会重新执行search刷新row数据
      // row.originValue = row.value
      // row.updValue = ''
      // row.isupd = false
      const data = Object.assign({}, this.$route.query, {
        type: row.type,
        id: this.view.uid,
        value: row.updValue,
        opt: 'bind'
      })
      this.submit(data)
    },
    // 解除绑定
    doUnBind(row) {
      this.$confirm('确定要解绑吗')
        .then(() => {
          const data = Object.assign({}, this.$route.query, {
            type: row.type,
            id: this.view.uid,
            opt: 'unbind'
          })
          this.submit(data)
        })
        .catch(_ => {})
    },
    // 清除缓存
    clearCache(row) {
      const data = Object.assign({}, this.$route.query, {
        type: row.type,
        id: this.view.uid,
        opt: 'clear_cache'
      })
      this.submit(data)
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

</style>
