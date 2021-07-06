<template>
  <div class="dashboard-editor-container">

    <el-row :gutter="40" class="panel-group">

      <el-col :xs="24" :sm="24" :lg="6" class="card-panel-col">
        <div class="card-panel" v-loading="loading">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              本日营收
            </div>
            <div>
              <span class="us">$</span>
              <count-to :start-val="0" :end-val="revenue.today" :duration="2600" class="card-panel-num" />
              <i v-if="revenue.today > revenue.yesterday" class="el-icon-top success arrow" />
              <i v-else-if="revenue.today < revenue.yesterday" class="el-icon-bottom danger arrow" />
            </div>
            <div style="margin-top: 10px;font-size: 12px;">
              <span class="danger">对比昨天</span> $ <count-to :start-val="0" :end-val="revenue.yesterday" :duration="3000" />
            </div>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="6" class="card-panel-col">
        <div class="card-panel" v-loading="loading">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              本月营收
            </div>
            <div>
              <span class="us">$</span>
              <count-to :start-val="0" :end-val="revenue.month" :duration="2600" class="card-panel-num" />
              <i v-if="revenue.month > revenue.lastmonth" class="el-icon-top success arrow" />
              <i v-else-if="revenue.month < revenue.lastmonth" class="el-icon-bottom danger arrow" />
            </div>
            <div style="margin-top: 10px;font-size: 12px;">
              <span class="danger">对比上月</span> $ <count-to :start-val="0" :end-val="revenue.lastmonth" :duration="3000" />
            </div>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="6" class="card-panel-col">
        <div class="card-panel" style="line-height: 128px;text-align: center;">
          <el-select v-model="gameid" filterable placeholder="全部游戏" clearable>
            <el-option
              v-for="(_gname, _gid) in gamelist"
              :key="_gid"
              :label="_gname"
              :value="parseInt(_gid)"
            >
              {{ _gname }} (id:{{ _gid }})
            </el-option>
          </el-select>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="6" class="card-panel-col">
        <div class="card-panel" style="line-height: 128px;text-align: center;">
          <admin-card></admin-card>
        </div>
      </el-col>

    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8" class="mychart" v-for="(item, key) in chart" :key="key">
        <div class="chart-wrapper" v-loading="loading">
          <line-chart v-bind="item"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CountTo from 'vue-count-to'
  import LineChart from './components/LineChart'
  import {dashboard} from '@/api/dashboard'
  import AdminCard from "./components/AdminCard";

  export default {
    name: 'DashboardEditor',
    components: { LineChart, CountTo, AdminCard },
    computed: {
      ...mapGetters(['gamelist', 'device'])
    },
    watch: {
      gameid: {
        immediate: true, // 侦听开始后立即调用，用于编辑时立即触发角色权限选中
        handler: function (newVal, oldVal) {
          this.chgGame(newVal)
        }
      }
    },
    data() {
      const chart = {
        week: [],
        last: []
      }
      return {
        loading: false,

        gameid: '',
        revenue: {
          today: 0,
          yesterday: 0,
          month: 0,
          lastmonth: 0
        },
        chart: {
          reg: {
            title: '新增账号',
            precision: 0,
            ystart: '',
            yend: '',
            chartData: chart
          },
          dau: {
            title: 'DAU',
            precision: 0,
            ystart: '',
            yend: '',
            chartData: chart
          },
          money: {
            title: '付费',
            precision: 2,
            ystart: '$ ',
            yend: '',
            chartData: chart
          },
          ffl: {
            title: '付费率',
            yend: '%',
            ystart: '',
            precision: 2,
            chartData: chart
          },
          arppu: {
            title: 'ARPPU',
            ystart: '$ ',
            yend: '',
            precision: 2,
            chartData: chart
          },
          arpu: {
            title: 'ARPU',
            ystart: '$ ',
            yend: '',
            precision: 2,
            chartData: chart
          }
        }
      }
    },
    methods: {
      chgGame(val) {
        this.loading = true
        dashboard({gameid: val})
          .then(({code, msg, data}) => {
            if (code)
            {
              const {revenue, chart} = data
              this.revenue = revenue

              for (const i in chart)
              {
                this.chart[i].chartData = chart[i]
              }
            }
            else {
              this.$message.error(msg)
            }
          })
          .catch(error => {})
          .finally(_ => {
            this.loading = false
          })
      }
    }
  }
</script>

<style lang="scss" scoped>

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: calc(100vh - 84px);
    padding: 30px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }


    .mychart {
      padding: 10px!important;
      /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
    }

    .chart-wrapper {
      background-color: #fff;
    }
  }

  .panel-group {
    /*margin-top: 18px;*/

    /*美元符号*/
    .us {
      font-size: 25px;
    }

    /*上下方向箭头*/
    .arrow {
      font-size: 20px;
    }

    .card-panel-col {
      margin-bottom: 22px;
    }

    .card-panel {
      height: 128px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 24px 0 0 24px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 24px 50px 24px 24px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 25px;
        }
      }
    }
  }

</style>
