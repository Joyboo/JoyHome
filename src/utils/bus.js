/*
import Vue from 'vue'

// 官方文档： https://cn.vuejs.org/v2/guide/migration.html#dispatch-%E5%92%8C-broadcast-%E6%9B%BF%E6%8D%A2

export default new Vue()
*/

import Bus from 'vue';

const install = function (Vue) {
  Vue.prototype.$bus = new Bus();
}

export default { install };
