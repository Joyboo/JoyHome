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

    </el-form>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    }
  },
  data() {
    return {
      packagelist: [],
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
