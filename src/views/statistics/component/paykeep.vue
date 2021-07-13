<template>

  <table-index :size="size" :data="data" :column="column" :loading="loading" />

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
        sort: true,
        fixed: 'left',
        template: (data, rowObject) => {
          if (!data) {
            return '---'
          } else {
            return ymd_to_date(data)
          }
        }
      },
      {
        key: 'fstcnt',
        text: '付费人数',
        width: '100',
        sort: true
      }
    ]

    const ds = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 25, 30, 40, 50, 60]
    for (const k in ds) {
      columnData.push({
        key: 'd' + ds[k],
        text: k == 0 ? '次留' : (ds[k] + '日'),
        width: '70',
        template: function(data, rowObject) {
          return data && rowObject.fstcnt && typeof (data) != 'undefined' ? (data * 100 / rowObject.fstcnt).toFixed(2) + '%' : ''
        }
      })
    }

    return {
      column: columnData
    }
  },
  computed: {
    ...mapGetters(['size'])
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
