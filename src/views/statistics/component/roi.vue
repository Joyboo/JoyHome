<template>

  <table-index :size="size" :data="data" :column="column" :heji="true" :loading.sync="load" />

</template>

<script>

import TableIndex from '@/components/TableData'
import { mapGetters } from 'vuex'
import { ymd_to_date } from '@/utils'

export default {
  components: {
    TableIndex
  },
  props: {
    data: {
      required: true,
      type: Array,
      defualt: []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const columnData = [
      {
        key: 'ymd',
        text: '日期',
        width: '100',
        fixed: 'left',
        sort: true,
        template(index, row) {
          if (row.h === '--') {
            return '<div class="danger">页合计</div>'
          } else if (row.h === '-') {
            return '<div class="danger">总合计</div>'
          } else {
            return ymd_to_date(index)
          }
        }
      },
      {
        key: 'gameid',
        text: '游戏',
        width: '100'
      },
      {
        key: 'cost',
        text: '成本',
        width: 80,
        sort: true
      },
      {
        key: 'reg',
        text: '注册'
      },
      {
        key: 'per',
        text: '注册单价',
        sorting: '',
        template: (data, rowObject) => {
          return data || 0
        }
      },
      {
        key: 'sum',
        text: '回本金额',
        tip: '当天新玩家至今的总充值',
        width: '100'
      },
      {
        key: 'm',
        text: '新充值',
        tip: '当天新玩家的总充值',
        width: '100',
        template: (index, row) => {
          return index || 0
        }
      },
      {
        key: 'money',
        text: '充值总额',
        tip: '当天的所有玩家总充值',
        width: '100'
      },
      {
        key: 'tcb',
        text: '投产比',
        tip: '当天的所有玩家总充值/当天的成本',
        width: '100',
        template: (data, rowObject) => {
          return rowObject.cost ? (rowObject.money * 100 / rowObject.cost).toFixed(2).replace('.00', '') + '%' : '-'
        }
      },
      {
        key: 'backrate',
        text: '回本率',
        width: '70',
        tip: '当天新玩家至今的总充值/当天的成本',
        template: (data, rowObject) => {
          return (data * 100).toFixed(2).replace('.00', '') + '%'
        }
      }
    ]

    const ds = [1, 2, 3, 4, 5, 6, 7, 15, 20, 25, 30, 40, 50, 60, 90, 120, 180]
    for (const k in ds) {
      columnData.push({
        key: 'd' + ds[k],
        text: ds[k] + '日',
        width: '70',
        template: (data, rowObject) => {
          return rowObject.cost && typeof (data) != 'undefined' ? (data.sum * 100 / rowObject.cost).toFixed(2) + '%' : ''
        }
      })
    }
    return {
      column: columnData
    }
  },
  computed: {
    ...mapGetters(['size']),
    load: {
      get() {
        return this.loading
      },
      set(val) {
        this.$emit('update:loading', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
