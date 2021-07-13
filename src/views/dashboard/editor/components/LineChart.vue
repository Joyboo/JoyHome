<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import { mapGetters } from 'vuex'
// require('echarts/theme/macarons') // echarts theme
import resize from '@/views/dashboard/admin/components/mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'LineChart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '270px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    },

    // 主标题
    title: {
      type: String,
      default: ''
    },
    // 鼠标十字准星左侧tooltip小数点精度
    /* precision: {
        type: Number,
        default: 0
      },*/
    // 自定义Y轴起始内容
    ystart: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line
    yend: {
      type: String,
      defualt: ''
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    ...mapGetters(['device']),
    isMobile() {
      return this.device === 'mobile'
    },
    theme() {
      return this.$store.state.settings.theme
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler: function(val) {
        this.setOptions(val)
      }
    },
    theme: function(newVal, oldVal) {
      this.setOptions(this.chartData)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      // this.chart = echarts.init(this.$el, 'macarons')
      this.chart = echarts.init(this.$el)
      this.setOptions(this.chartData)
    },
    setOptions({ week, last }) {
      const ystart = this.ystart
      const yend = this.yend

      this.chart.setOption({
        title: {
          text: this.title,
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          /* axisPointer: {
              type: 'cross',
              label: {
                precision: this.precision // 十字准星小数点精度
              }
            },*/
          // padding: [5, 10],
          // formatter: '{a}' + this.title + ' <br/>星期{b} : ' + ystart + '{c}' + yend
          // trigger: 'item',
          formatter(data) {
            const tip = []
            if (data.length) {
              for (const i in data) {
                const item = data[i]
                tip.push(item.seriesName + ': ' + ystart + item.value + yend)
              }
            }
            return tip.join('<br>')
          }
        },
        /* toolbox: {
            show: true,
            feature: {
              // dataView: {readOnly: false}, // 转换为数据视图
              // magicType: {type: ['line', 'bar']}, // 切换折线图或柱状图
              // restore: {}, // 还原
              // saveAsImage: {}  // 保存为图片
            }
          },*/
        legend: {
          bottom: '3px',
          data: ['上周' + this.title, '本周' + this.title]
        },
        xAxis: {
          type: 'category',
          // name: '星期',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: this.theme
            }
          },
          data: ['一', '二', '三', '四', '五', '六', '日']
        },
        grid: {
          top: '10%',
          left: this.isMobile ? '6%' : '2%',
          right: this.isMobile ? '15%' : '5%',
          bottom: '10%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          // name: 'Y',
          minorTick: {
            show: true
          },
          minorSplitLine: {
            show: true
          },
          splitNumber: 5, // Y轴刻度数，仅参考，实际会变动
          axisLabel: {
            formatter(data) {
              return ystart + data + yend
            }
          },
          axisLine: {
            lineStyle: {
              color: this.theme
            }
          }
        },
        series: [
          {
            name: '上周' + this.title,
            type: 'line',
            color: this.theme,
            // data: [1, 3, 9, 27, 81, 247, 2000]
            data: last
          },
          {
            name: '本周' + this.title,
            type: 'line',
            color: '#F56C6C',
            // data: [1, 2, 4, 8, 16]
            data: week
          }
        ]
      })
    }
  }
}
</script>
