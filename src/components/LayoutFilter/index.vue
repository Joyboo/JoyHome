<template>
  <div>
    <transition name="el-zoom-in-top" mode="in-out" :duration="duration" @afterLeave="afterLeave">
      <div v-show="show || !isMobile">
        <el-form :model="query" :size="size" :inline="true">

          <el-form-item v-if="cfg.showGame">
            <el-select v-model="query.gameid" filterable :multiple="cfg.showGame === 2" :collapse-tags="cfg.collapseGame" placeholder="游戏" clearable>
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

          <el-form-item v-if="cfg.showPackage">
            <el-select v-model="query.pkgbnd" filterable :multiple="cfg.showPackage === 2" :collapse-tags="cfg.collapsePackage" placeholder="包" clearable>
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

          <el-form-item v-if="cfg.ProxyRegion">
            <el-select v-model="query.ProxyRegion" style="width: 100px;" placeholder="地区" class="mySelect">
              <el-option v-for="(rn, rk) in region" :key="rk" :label="rn.name" :value="rk" />
            </el-select>
          </el-form-item>

          <el-form-item v-if="cfg.tzn">
            <el-select v-model="query.tzn" style="width: 80px;" placeholder="时区" class="mySelect" @change="chgTzn">
              <el-option v-for="(rn, rk) in region" :key="rk" :label="rn.tzn + '区'" :value="rn.tzn" />
            </el-select>
          </el-form-item>

          <el-form-item v-if="cfg.isBeginTime">
            <el-date-picker
              v-model="begin"
              :format="cfg.elFormat"
              :type="cfg.elType"
              placeholder="开始时间"
              value-format="timestamp"
              :style="{width: (cfg.elFormat.length - 2) + 'rem'}"
              :clearable="false"
            />
          </el-form-item>

          <el-form-item v-if="cfg.isEndTime">
            <el-date-picker
              v-model="end"
              :format="cfg.elFormat"
              :type="cfg.elType"
              placeholder="结束时间"
              value-format="timestamp"
              :style="{width: (cfg.elFormat.length - 2) + 'rem'}"
              :clearable="false"
            />
          </el-form-item>

          <!--快捷操作-->
          <el-form-item v-if="cfg.isBeginTime && cfg.isEndTime">
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

          <el-form-item v-if="cfg.nextbtn">
            <el-button type="primary" plain @click="fastdate(9)">前一天</el-button>
          </el-form-item>

          <el-form-item v-if="cfg.nextbtn">
            <el-button type="primary" plain @click="fastdate(10)">后一天</el-button>
          </el-form-item>

          <!--插槽位-->
          <slot />

          <el-form-item v-if="cfg.nsch">
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

import { mapGetters, mapState } from 'vuex'
import { beforeDay, parseTime } from '@/utils'
import { packageChildOption } from '@/api/package'

export default {
  name: 'LayoutFilter',
  props: {
    query: {
      required: true,
      type: Object,
      default() {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    // 自定义配置项，此对象会与defaultConfig合并为cfg，优先级高于defaultConfig
    layoutConfig: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      begin: '',
      end: '',
      packagelist: [],
      show: true,
      defaultConfig: {
        // 是否需要search查询按钮
        nsch: true,
        // 游戏，0-隐藏,1-单选,2-多选
        showGame: 0,
        // 游戏多选时是否折叠
        collapseGame: false,
        // 包，0-隐藏,1-单选, 2-多选
        showPackage: 0,
        // 包多选时是否折叠
        collapsePackage: false,
        // 显示地区下拉框
        ProxyRegion: false,
        // 显示时区下拉框
        tzn: false,
        // 显示开始时间
        isBeginTime: false,
        // 开始时间距离当前时间的天数
        beginDay: -14,
        // 显示结束时间
        isEndTime: false,
        // 结束时间距离当前时间的天数
        endDay: 0,
        // ElementUI日期组件显示的格式
        elFormat: 'yyyy-MM-dd',
        // ElementUI日期组件类型
        elType: 'date',
        // 最终赋值给query.begintime和endtime的格式, 值参考 parseTime format参数
        outFmt: '{y}-{m}-{d}',
        // 生命周期中获取数据
        firstLoading: true,
        // 显示前后一天按钮
        nextbtn: false
      }
    }
  },
  computed: {
    ...mapGetters([
      'size',
      'gamelist',
      'userinfo',
      'config',
      'device'
    ]),
    ...mapState({
      theme: state => state.settings.theme,
      duration: state => state.settings.duration
    }),
    cfg() {
      return Object.assign({}, this.defaultConfig, this.layoutConfig)
    },
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
    region() {
      return this.config.region_domain.region
    },
    // 管理员编辑页设置的默认选中游戏
    defaultGid() {
      if (typeof this.userinfo.extension.gid === 'undefined') {
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
        this.$set(this.query, 'begintime', parseTime(newVal, this.cfg.outFmt))
      }
    },
    end: function(newVal, oldVal) {
      if (!isNaN(newVal)) {
        this.$set(this.query, 'endtime', parseTime(newVal, this.cfg.outFmt))
      }
    }
  },
  created() {
    this.$bus.$on('changeFilterShow', this.setShowTimeout)

    // 时间
    if (this.cfg.isBeginTime) {
      this.begin = beforeDay(this.cfg.beginDay)
    }
    if (this.cfg.isEndTime) {
      this.end = beforeDay(this.cfg.endDay)
    }

    // 默认选中的游戏
    if (this.defaultGid != '') {
      switch (this.cfg.showGame) {
        case 1: // 单选
          if (this.query.gameid === '') {
            this.$set(this.query, 'gameid', this.defaultGid)
          }
          break
        case 2: // 多选
          if (this.query.gameid.indexOf(this.defaultGid) === -1) {
            const old = this.query.gameid
            old.push(this.defaultGid)
            this.$set(this.query, 'gameid', old)
          }
          break
        default:break
      }

      if (this.cfg.firstLoading) {
        // 等待侦听器执行完成
        setTimeout(() => this.search(), 500)
      }
    }
  },
  beforeDestroy() {
    this.$bus.$off('changeFilterShow')
  },
  methods: {
    changeGame(gameid) {
      // 不需要包信息
      if (this.cfg.showPackage === 0) {
        return
      }

      // 清空
      this.packagelist = []
      this.query.pkgbnd = this.cfg.showPackage === 2 ? [] : ''

      if (gameid.length == 0) {
        return
      }

      if (this.cfg.showGame === 2) {
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
        case 9: // 前一天
          this.begin -= 86400 * 1000
          this.end -= 86400 * 1000
          break
        case 10: // 后一天
          this.begin += 86400 * 1000
          this.end += 86400 * 1000
          break
        default: break
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
      this.$bus.$emit('setHeight')
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
