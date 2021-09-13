<template>
  <el-row class="view-container">
    <!-- 有一个el-col-offset-1 -->
    <el-col
      v-for="(item, index) in cards"
      :key="index"
      v-bind="colSpan"
      style="margin-top: 2rem;"
      :offset="1"
    >
      <card-item v-bind="item" />
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import CardItem from '@/views/phpmyadmin/CardItem'
import { isArray } from '@/utils/validate'
import { getToken } from '@/utils/auth'

export default {
  name: 'phpmyadminindex',
  components: { CardItem },
  data() {
    return {
      token: getToken(),
      colSpan: {
        xs: { span: 22 },
        sm: { span: 22 },
        md: { span: 11 },
        lg: { span: 6 },
        xl: { span: 6 }
      },
      card: [] // <CardItem>[]
    }
  },
  computed: {
    ...mapGetters(['config', 'device']),
    pma() {
      const pma = this.config.pma
      if (!pma || !isArray(pma)) {
        return []
      }
      const list = pma.map((v, i) => {
        // class是js关键字，转一下
        v.className = v.class
        v.iconClass = 'phpmyadmin'
        v.fullUrl = v.url + '?_token=' + this.token
        return v
      })
      return list
    },
    cards() {
      const card = this.card
      return this.pma.concat(card)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
