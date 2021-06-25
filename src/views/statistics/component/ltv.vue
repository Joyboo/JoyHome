<template>

    <table-index :loading="loading" :data="ltvdata" :height="height" :column="column"></table-index>

</template>

<script>
  import TableIndex from '@/components/TableData'
  import { mapGetters } from 'vuex'
  import {caclHeight, ymd_to_date} from '@/utils'
  import screenfull from "screenfull";

  export default {
    components: {
      TableIndex
    },
    computed: {
      ...mapGetters(['size', 'gamelist'])
    },
    props: {
      ltvdata: {
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
      ];

      const ds = [1,2,3,4,5,6,7,10,15,20,25,30,40,50,60,70,80,90,100,120];
      for(let k in ds)
      {
        columnData.push({
          key: 'd' + ds[k],
          width: '70',
          text: ds[k] + '日',
          template: (data, rowObject) => {
            return data && rowObject.reg ? (data.sum/rowObject.reg).toFixed(2) : '';
          }
        });
      }

      return {
        height: caclHeight(170),
        column: columnData,
      }
    },
    mounted() {
      screenfull.on('change', () => this.height = caclHeight(170));
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
