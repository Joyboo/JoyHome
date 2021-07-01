<template>

    <table-index :size="size" :data="data" :column="column" :loading="loading" :heji="true"></table-index>

</template>

<script>

  import TableIndex from '@/components/TableData'
  import { mapGetters } from 'vuex'
  import {ymd_to_date} from '@/utils'

  export default {
    components: {
      TableIndex
    },
    computed: {
      ...mapGetters(['size'])
    },
    props: {
      data: {
        required: true,
        type: Array,
        defualt: [],
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        column: [
          {
            key: 'ymd',
            text: '日期',
            sort: true,
            fixed: 'left',
            width: '100',
            template(index, row) {
              if (row.h === '--') {
                return '<div class="danger">页合计</div>'
              } else if (row.h === '-') {
                return '<div class="danger">总合计</div>'
              } else {
                return ymd_to_date(index)
              }
            }
          }, {
            key: 'reg',
            sort: true,
            text: '新增账号'
          }, {
            key: 'atv',
            sort: true,
            text: '激活设备'
          }, {
            key: 'login',
            sort: true,
            text: '活跃账号'
          }, {
            key: 'money',
            sort: true,
            text: '付费总额',
            tip: '美元'
          }, {
            key: 'nfs',
            text: '新增付费',
            tip: '新用户的充值（美元）'
          }, {
            key: 'persons',
            text: '付费账号'
          }, {
            key: 'nps',
            text: '新增付费账号',
            width: '150'
          }, {
            key: 'tas',
            text: '付费次数'
          }, {
            key: 'fftotal',
            text: '付费率',
            tip: '总付费人数/总登录人数'
          }, {
            key: 'ffl',
            text: '新增付费率',
            tip: '新增付费人数/注册数'
          }, {
            key: 'arpu',
            text: 'ARPU',
            tip: '总付费金额/总登录人数'
          }, {
            key: 'newArpu',
            text: '新增ARPU',
            tip: '新付费金额/新付费人数'
          }, {
            key: 'arppu',
            text: 'ARPPU',
            tip: '总付费金额/总付费人数'
          }, {
            key: 'newArppu',
            text: '新增ARPPU',
            tip: '新付费金额/新付费人数',
            width: '130'
          }
        ],
      }
    },
    methods: {
      setLoading(val) {
        this.$emit('setLoading', val)
      }
    }
  }
</script>

<style scoped>

</style>
