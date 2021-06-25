<template>
  <div :class="className" :style="style" />
</template>

<script>
import echarts from 'echarts'
// require('echarts/theme/macarons') // echarts theme
import resize from '@/components/Charts/mixins/resize'

export default {
  mixins: [resize],
  computed: {
    style() {
      return {
        height: this.height,
        width: this.width,
        padding: this.padding
      }
    }
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },

    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '800px'
    },
    padding: {
      type: String,
      default: '100px 0'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    /*this.$nextTick(() => {
      this.initChart()
    })*/
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    data: function (newVal, oldVal) {
      this.initChart()
    }
  },
  methods: {
    initChart() {

      this.chart = echarts.init(this.$el, 'macarons')

      const legend = []
      this.data.forEach(item => {
        legend.push(item.name)
      })

      var option = {
        title: {
          text: this.title,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          bottom: 'bottom',
          data: legend
        },
        series: [
          {
            name: this.title,
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      this.chart.setOption(option)
    }
  }
}
</script>
