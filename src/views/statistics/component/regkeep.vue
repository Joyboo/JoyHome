<template>

  <table-index :size="size" :data="data" :column="column" :loading.sync="load" />

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
        template: (index, row) => {
          if (!index) {
            return '---'
          } else {
            return ymd_to_date(index)
          }
        }
      },
      {
        key: 'reg',
        text: '新增账号',
        sort: true,
        width: '120'
      }
    ]

    const ds = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 25, 30, 40, 50, 60]
    for (const k in ds) {
      columnData.push({
        key: 'd' + ds[k],
        text: k == 0 ? '次留' : (ds[k] + '日'),
        width: '70',
        template: (data, rowObject) => {
          return data && rowObject.reg && typeof (data) != 'undefined' ? (data.a * 100 / rowObject.reg).toFixed(2) + '%' : ''
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
