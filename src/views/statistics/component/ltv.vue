<template>

  <table-index :loading.sync="load" :data="data" :column="column" />

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
        key: 'gameid',
        sort: true,
        text: '游戏',
        template: (index, row) => {
          return this.gamelist[index] || index
        }
      }, {
        key: 'reg',
        sort: true,
        text: '新增账号',
        width: '120'
      }
    ]

    const ds = [1, 2, 3, 4, 5, 6, 7, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 120]
    for (const k in ds) {
      columnData.push({
        key: 'd' + ds[k],
        width: '70',
        text: ds[k] + '日',
        template: (data, rowObject) => {
          return data && rowObject.reg ? (data.sum / rowObject.reg).toFixed(2) : ''
        }
      })
    }

    return {
      column: columnData
    }
  },
  computed: {
    ...mapGetters(['size', 'gamelist']),
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
