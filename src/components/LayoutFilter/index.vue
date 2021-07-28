<template>
  <div>
    <transition name="el-zoom-in-top" mode="in-out" :duration="duration" @afterLeave="afterLeave">
      <div v-show="show || !isMobile">
        <el-form :model="query" :size="size" :inline="true">

          <!--传递query.gameid表示需要该下拉框，传递类型为字符串时表示为单选，为数组时表示为多选-->
          <el-form-item v-if="typeof query.gameid != 'undefined'">
            <el-select v-model="query.gameid" filterable :multiple="gameMul" placeholder="游戏" clearable>
              <el-option
                v-for="(_gname, _gid) in gamelist"
                :key="_gid"
                :label="_gname"
                :value="parseInt(_gid)"
              >
                {{ _gname }} (id:{{ _gid }})
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="typeof query.pkgbnd != 'undefined'">
            <el-select v-model="query.pkgbnd" filterable :multiple="packageMul" placeholder="包" clearable>
              <el-option
                v-for="item in packagelist"
                :key="item.pkgbnd"
                :label="item.name"
                :value="item.pkgbnd"
              >
                {{ item.name }} (id:{{ item.id }})
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="typeof query.ProxyRegion != 'undefined'">
            <el-select v-model="query.ProxyRegion" style="width: 100px;" placeholder="地区" class="mySelect">
              <el-option v-for="(rn, rk) in region" :key="rk" :label="rn.name" :value="rk" />
            </el-select>
          </el-form-item>

          <el-form-item v-if="typeof query.tzn != 'undefined'">
            <el-select v-model="query.tzn" style="width: 80px;" placeholder="时区" class="mySelect" @change="chgTzn">
              <el-option v-for="(rn, rk) in region" :key="rk" :label="rn.tzn + '区'" :value="rn.tzn" />
            </el-select>
          </el-form-item>

          <el-form-item v-if="isBegin">
            <el-date-picker
              v-model="begin"
              :format="format"
              :type="query.datetype || 'date'"
              placeholder="开始时间"
              value-format="timestamp"
              :style="{width: (format.length -2) + 'rem'}"
              :clearable="false"
            />
          </el-form-item>

          <el-form-item v-if="isEnd">
            <el-date-picker
              v-model="end"
              :format="format"
              :type="query.datetype || 'date'"
              placeholder="结束时间"
              value-format="timestamp"
              :style="{width: (format.length -2) + 'rem'}"
              :clearable="false"
            />
          </el-form-item>

          <!--快捷操作-->
          <el-form-item v-if="isBegin && isEnd">
            <el-dropdown trigger="click">
              <div>
                <el-button icon="el-icon-date" />
              </div>
              <el-dropdown-menu slot="dropdown" :style="{padding: '0'}">
                <el-dropdown-item :style="{padding: '10px'}">
                  <el-button class="dateBtn" type="primary" @click="fastdate(8)">近一年</el-button>
                  <el-button class="dateBtn" type="primary" @click="fastdate(7)">近90天</el-button>
                  <el-button class="dateBtn" type="primary" @click="fastdate(6)">近30天</el-button>
                  <el-button class="dateBtn" type="primary" @click="fastdate(5)">近7天</el-button>
                  <el-button class="dateBtn" type="primary" @click="fastdate(4)">上月</el-button>
                  <el-button class="dateBtn" type="primary" @click="fastdate(3)">本月</el-button>
                  <el-button class="dateBtn" type="primary" @click="fastdate(2)">昨天</el-button>
                  <el-button class="dateBtn" type="primary" @click="fastdate(1)">今天</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>

          <!--插槽位-->
          <slot />

          <el-form-item v-if="nsch">
            <el-button :loading="load" type="primary" icon="el-icon-search" @click="search">查询
            </el-button>
          </el-form-item>

          <slot name="after" />

        </el-form>

      </div>
    </transition>

    <transition v-if="isMobile" name="el-fade-in-linear" mode="out-in" :duration="duration" @afterLeave="afterLeave">
      <div v-show="!show" style="margin-bottom: 15px;">
        <el-button type="primary" :size="size" @click="setShowTimeout(true)">
          <svg-icon icon-class="filter" /> 筛选
        </el-button>
      </div>
    </transition>

  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { packageChildOption } from '@/api/package'
import { beforeDay, parseTime } from '@/utils'

export default {
  name: 'LayoutFilter',
  props: {
    query: {
      // required: true,
      type: Object,
      default() {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    // need search
    nsch: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      begin: '',
      end: '',
      packagelist: [],
      show: true
    }
  },
  computed: {
    ...mapGetters([
      'size',
      'userinfo',
      'config',
      'device',
      'gamelist'
    ]),
    load: {
      get() {
        return this.loading
      },
      set(val) {
        this.$emit('update:loading', val)
      }
    },
    isMobile() {
      return this.device === 'mobile'
    },
    theme() {
      return this.$store.state.settings.theme
    },
    duration() {
      return this.$store.state.settings.duration
    },
    region() {
      return this.config.region_domain.region
    },
    // 是否多选游戏
    gameMul() {
      return typeof this.query.gameid === 'object'
    },
    // 是否多选包
    packageMul() {
      return typeof this.query.pkgbnd === 'object'
    },
    isBegin() {
      return typeof this.query.begintime != 'undefined'
    },
    isEnd() {
      return typeof this.query.endtime != 'undefined'
    },
    format() {
      return typeof this.query.format === 'undefined' ? 'yyyy-MM-dd' : this.query.format
    },
    // 最终赋值给begintime或endtime的格式,值参考 parseTime format参数
    outFmt() {
      return typeof this.query.outfmt === 'undefined' ? '{y}-{m}-{d}' : this.query.outfmt
    },
    // 管理员编辑页设置的默认选中游戏
    defaultGid() {
      if (typeof this.userinfo.extension.gid == 'undefined') {
        return ''
      }
      const gid = this.userinfo.extension.gid
      return gid == '' ? gid : parseInt(gid)
    }
  },
  watch: {
    // 侦听器替代onchange
    'query.gameid': {
      immediate: true,
      handler: function(newVal, oldVal) {
        this.changeGame(newVal)
      }
    },
    begin: function(newVal, oldVal) {
      if (!isNaN(newVal)) {
        this.$set(this.query, 'begintime', parseTime(newVal, this.outFmt))
      }
    },
    end: function(newVal, oldVal) {
      if (!isNaN(newVal)) {
        this.$set(this.query, 'endtime', parseTime(newVal, this.outFmt))
      }
    }
  },
  mounted() {
    // this.$bus.$on('changeFilterShow', this.setShowTimeout)

    // 时间
    if (this.isBegin) {
      this.begin = beforeDay(this.query.begintime)
    }
    if (this.isEnd) {
      // 可传true或者-N的天数
      const day = this.query.endtime === true ? 0 : this.query.endtime
      this.end = beforeDay(day)
    }

    // 默认选中的游戏
    if (this.defaultGid != '') {
      if (typeof this.query.gameid == 'object' && this.query.gameid.indexOf(this.defaultGid) < 0) {
        this.query.gameid.push(this.defaultGid)
      } else if (typeof this.query.gameid == 'string' && this.query.gameid == '') {
        this.query.gameid = this.defaultGid
      }

      // 等待侦听器执行完成
      setTimeout(() => this.search(), 500)
    }
  },
  beforeDestroy() {
    // this.$bus.$off('changeFilterShow')
  },
  methods: {
    changeGame(gameid) {
      // 不需要包信息
      if (typeof this.query.pkgbnd == 'undefined') {
        return
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
    fastdate(val) {
      const time = new Date()
      switch (val) {
        case 1: // 今天
          this.begin = this.end = beforeDay(0)
          break
        case 2: // 昨天
          this.begin = this.end = beforeDay(-1)
          break
        case 3: // 本月
          this.begin = (new Date(time.getFullYear(), time.getMonth(), 1)).getTime()
          this.end = beforeDay(0)
          break
        case 4: // 上月
          // 这个月第一天减一天
          this.end = new Date(time.getFullYear(), time.getMonth(), 1, 0, 0, 0).getTime() - 86400 * 1000
          var lastDate = new Date(this.end)
          var start4 = new Date(lastDate.getFullYear(), lastDate.getMonth(), 1, 0, 0, 0)
          this.begin = start4.getTime()
          break
        case 5: // 近7天
          this.begin = beforeDay(-7)
          this.end = beforeDay(0)
          break
        case 6: // 近30天
          this.begin = beforeDay(-30)
          this.end = beforeDay(0)
          break
        case 7: // 近90天
          this.begin = beforeDay(-90)
          this.end = beforeDay(0)
          break
        case 8: // 近一年
          var start8 = new Date(time.getFullYear() - 1, time.getMonth(), time.getDate(), time.getHours(), time.getMinutes(), time.getSeconds())
          this.begin = start8.getTime()
          this.end = beforeDay(0)
          break
      }
    },
    search() {
      this.setShowTimeout(false)
      this.$emit('search')
    },
    // 改变时区
    chgTzn(val) {
      this.$emit('chgTzn', val)
    },
    // 动画结束
    afterLeave() {
      // this.$bus.$emit('setHeight')
    },
    // 在动画时间结束后执行
    setShowTimeout(val) {
      setTimeout(() => {
        this.show = val
      }, this.duration)
    }
  }
}
</script>

<style lang="scss" scoped>
  .selectSlotRight {
    float: right;
    color: #8492a6;
    font-size: 13px;
    position: relative;
    right:15px;
  }

  .mySelect {
    width: 120px;
  }

  .dateBtn {
    margin: 5px;
  }
</style>
