<template>

  <table-index :size="size" :data="roidata" :column="column" :loading="loading"></table-index>

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
      roidata: {
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
          width: '100',
          sort: true,
          template: (data, rowObject) => {
            return ymd_to_date(data);
          }
        }
        , {
          key: 'gameid',
          text: '游戏',
          width: '100'
        }
        ,{
          key: 'cost',
          text: '成本',
          width: 80,
          sort: true
        }
        ,{
          key: 'reg',
          text: '注册'
        }
        ,{
          key: 'per',
          text: '注册单价',
          sorting: '',
          template: (data, rowObject) => {
            return data || 0;
          }
        }
        ,{
          key: 'sum',
          text: '回本金额',
          width: '100'
        }
        ,{
          key: 'money',
          text: '充值总额',
          width: '100',
        }
        ,{
          key: 'backrate',
          text: '回本率',
          template: (data, rowObject) => {
            return (data * 100).toFixed(2).replace('.00', '') + '%';
          }
        }
      ];

      const ds = [1,2,3,4,5,6,7,15,20,25,30,40,50,60,90,120,180];
      for(let k in ds)
      {
        columnData.push({
          key: 'd' + ds[k],
          text: ds[k] + '日',
          // width: '76',
          template: (data, rowObject) => {
            return rowObject.cost && typeof(data) != 'undefined' ? (data.sum * 100/rowObject.cost).toFixed(2) + '%': '';
          }
        });
      }
      return {
        column: columnData
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
