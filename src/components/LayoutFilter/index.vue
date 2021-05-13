<template>
  <div>
    <el-form :model="query" :size="size" :inline="true">

      <!--传递query.gameid表示需要该下拉框，传递类型为字符串时表示为单选，为数组时表示为多选-->
      <el-form-item v-if="typeof query.gameid != 'undefined'">
        <el-select v-model="query.gameid" filterable :multiple="gameMul" placeholder="游戏" @change="changeGame">
          <el-option
            v-for="item in filtergamelist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
            <span class="selectSlotRight">id:{{ item.value }}</span>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="typeof query.pkgbnd != 'undefined'">
        <el-select v-model="query.pkgbnd" filterable :multiple="packageMul" placeholder="包">
          <el-option
            v-for="item in packagelist"
            :key="item.pkgbnd"
            :label="item.name"
            :value="item.pkgbnd"
          >
            <span style="float: left">{{ item.name }}</span>
            <span class="selectSlotRight">id:{{ item.id }}</span>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="typeof query.ProxyRegion != 'undefined'">
        <el-select style="width: 100px;" v-model="query.ProxyRegion" placeholder="地区">
          <el-option key="1" label="欧美洲" value="omz" />
          <el-option key="2" label="新加坡" value="xjp" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="typeof query.tzn != 'undefined'">
        <el-select style="width: 100px;" v-model="query.tzn" placeholder="地区">
          <el-option key="1" label="-5区" value="-5" />
          <el-option key="2" label="8区" value="8" />
        </el-select>
      </el-form-item>

      <!--默认是天的格式，也可以传递query.format自定义, 具体格式见:https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi-->
      <el-form-item v-if="isDate">
        <el-date-picker
          v-model="query.date"
          :format="format"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始"
          end-placeholder="结束"
          :default-value="query.date"
          value-format="timestamp"
          :picker-options="pickerOptions"
        />
      </el-form-item>

      <!--插槽位-->
      <slot />

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search">查询
        </el-button>
      </el-form-item>

      <slot name="after"></slot>

      <el-form-item v-if="showExport" style="float: right;">
        <el-button type="warning" icon="el-icon-download" clearable @click="exportcfg.show = !exportcfg.show">导出</el-button>
      </el-form-item>
    </el-form>

    <el-collapse-transition>
      <el-form v-show="exportcfg.show" :size="size" :inline="true">

        <el-form-item>
          <el-input v-model="exportcfg.filename" placeholder="导出文件名" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-select v-model="exportcfg.bookType" style="width: 100px">
            <el-option
              v-for="item in exportcfg.elist"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="success" icon="el-icon-download" @click="exportCurrPage">导出当前页</el-button>
        </el-form-item>

        <el-form-item v-if="exportUrl">
          <el-button type="warning" icon="el-icon-download" @click="exportAllPage">导出全部页</el-button>
        </el-form-item>

      </el-form>
    </el-collapse-transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import { packageChildOption } from '@/api/package'

export default {
  computed: {
    ...mapGetters([
      'size',
      'filtergamelist'
    ]),
    // 是否多选游戏
    gameMul() {
      return typeof this.query.gameid === 'object'
    },
    // 是否多选包
    packageMul() {
      return typeof this.query.gameid === 'object'
    },
    // 是否需要时间选择器
    isDate() {
      return typeof this.query.date !== 'undefined'
    },
    format() {
      typeof this.query.format === 'undefined' ? 'yyyy-MM-dd' : this.query.format
    }
  },
  mounted() {
    if (typeof this.query.gameid !== 'undefined') {
      this.$store.dispatch('filter/gameInfo')
    }
    /* if (typeof this.query.pkgbnd != 'undefined')
      {
        this.changeGame(this.query.gameid)
      }*/
  },
  props: {
    query: {
      // required: true,
      type: Object,
      default () {
        return {}
      }
    },

    /********** 是否需要导出按钮,如果不需要，则下方参数都无需传递 ***********/
    showExport: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: []
    },
    column: {
      type: Array,
      default: []
    },
    // 导出全部 url
    exportUrl: {}
  },
  data() {
    return {
      packagelist: [],
      exportcfg: {
        show: false,
        filename: '',
        bookType: 'xlsx', // 导出类型
        elist: ['xlsx', 'csv', 'txt']
      },
      // modelTimeRange: [new Date(), new Date()],
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const time = (new Date()).getTime()
              picker.$emit('pick', [time, time])
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const time = new Date()
              time.setTime(time.getTime() - 1000 * 86400)
              picker.$emit('pick', [time.getTime(), time.getTime()])
            }
          }, {
            text: '一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 1000 * 86400 * 7)
              picker.$emit('pick', [start.getTime(), end.getTime()])
            }
          }, {
            text: '本月',
            onClick(picker) {
              const time = new Date()
              const end = new Date()
              const start = new Date(time.getFullYear(), time.getMonth(), 1)
              picker.$emit('pick', [start.getTime(), end.getTime()])
            }
          }, {
            text: '上月',
            onClick(picker) {
              const time = new Date()
              // 这个月第一天减一天
              const end = new Date(time.getFullYear(), time.getMonth(), 1, 0, 0, 0).getTime() - 86400 * 1000
              const lastDate = new Date(end)
              const start = new Date(lastDate.getFullYear(), lastDate.getMonth(), 1, 0, 0, 0)
              picker.$emit('pick', [start.getTime(), end])
            }
          }, {
            text: '近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 1000 * 86400 * 30)
              picker.$emit('pick', [start.getTime(), end.getTime()])
            }
          }, {
            text: '近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 1000 * 86400 * 90)
              picker.$emit('pick', [start.getTime(), end.getTime()])
            }
          }]
      }
    }
  },
  methods: {
    changeGame(gameid) {
      // 不需要包信息
      if (typeof this.query.pkgbnd == 'undefined')
      {
        return;
      }

      if (gameid.length == 0) {
        // 清空
        this.packagelist = []
        this.query.pkgbnd = this.packageMul ? [] : ''
        return
      }

      if (this.gameMul) {
        gameid = gameid.join(',')
      }
      packageChildOption({ gameid: gameid }).then(resp => {
        this.packagelist = resp.data
      })
    },
    search() {
      this.$emit('search')
    },
    // 导出当前页
    exportCurrPage() {
      let tHeader = [], col = [], mydata = [];

      this.column.forEach((item, index) => {
        tHeader.push(item.text)
        col.push(item.key)
      })

      // 有定义template，则执行，获取执行后接过
      this.data.forEach((item, index) => {
        this.column.forEach((v, i) => {
          if (typeof v.template == 'function')
          {
            item[v.key] = v.template(item[v.key], item)
          }
        })
        mydata.push(item)
      })

      import('@/vendor/Export2Excel')
        .then(excel => {
          const data = this.formatJson(col, mydata)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.exportcfg.filename,
            autoWidth: true,
            bookType: this.exportcfg.bookType
          })
        })
        .catch(error => {
          console.log('error=>', error)
          this.$message.error('数据导出时发生错误!')
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    // 导出全部页
    exportAllPage() {
      let param = process.env.VUE_APP_BASE_API + '/admin' + this.exportUrl + '?'
      for (let i in this.query)
      {
        param += '&' + i + '=' + this.query[i]
      }
      param += '&filename=' + this.exportcfg.filename + '&suff=' + this.exportcfg.bookType

      let showth = [];
      this.column.forEach((item, index) => {
        showth.push(item.key + '=' + item.text)
      })
      if (showth.length <= 0)
      {
        return
      }
      param += '&showth=' + showth.join('|')
      window.open(param)
    }
  }
}
</script>

<style scoped>
  .selectSlotRight {
    float: right;
    color: #8492a6;
    font-size: 13px;
    position: relative;
    right:15px;
  }
</style>
