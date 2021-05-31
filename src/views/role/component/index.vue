<template>
  <div v-loading="load" class="view-container">
    <el-form ref="RoleForm" :model="form" :rules="rules" :size="size" label-width="15rem">
      <el-form-item label="角色名称" prop="name">
        <el-input class="myCol" v-model="form.name" placeholder="请输入角色名称" clearable />
      </el-form-item>

      <el-form-item label="角色描述">
        <el-input
          v-model="form.summary"
          type="textarea"
          :rows="3"
          class="myCol"
          clearable
          placeholder="请输入角色描述"
        />
      </el-form-item>

      <el-form-item label="权限列表">
        <el-input
          placeholder="输入关键字进行过滤,可选 id，name，path"
          class="myCol"
          v-model="filterText">
        </el-input>

        <el-tree
          class="filter-tree myCol"
          :data="menuTable"
          highlight-current
          show-checkbox
          default-expand-all
          node-key="id"
          :filter-node-method="filterNode"
          ref="tree">
          <!--自定义节点内容-->
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{data.id}} - {{ data.title }}</span>
            <span class="myContet">
              {{data.path}}
            </span>
          </span>
        </el-tree>
      </el-form-item>

      <button-tpl index="/role/index" @submit="submit" />
    </el-form>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import ButtonTpl from '@/components/ButtonTpl'
  import {menuIndex} from "@/api/menu";
  import {roleEdit} from "@/api/role";

  export default {
    components: {
      ButtonTpl
    },
    computed: {
      ...mapGetters(['size']),
      load: {
        get() {
          return this.loading
        },
        set(val) {
          this.$emit('setloading', val)
        }
      }
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      form: {
        type: Object,
        default: {}
      }
    },
    mounted() {
      this.load = true
      menuIndex()
        .then(resp => {
          const {data} = resp
          this.menuTable = data

          this.setCheckNodes()
        })
        .catch(error => {})
        .finally(() => {
          this.load = false
        })
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      'form.nids': {
        immediate: true,
        handler: function (newVal, oldVal) {
          this.setCheckNodes()
        }
      }
    },
    data() {
      return {
        filterText: '',
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入角色名称' }]
        },
        menuTable: []
      }
    },
    methods: {
      // 允许按id,title和path匹配
      filterNode(value, data) {
        if (!value) return true;
        return data.title.indexOf(value) !== -1 || data.path.indexOf(value) !== -1;
      },
      submit() {
        this.$refs.RoleForm.validate((valid) => {
          if (!valid) {
            return false
          }
          // 半选中状态为子节点有选中状态的节点，也需要授权
          const halt = this.$refs.tree.getHalfCheckedKeys() || []
          const checked = this.$refs.tree.getCheckedKeys() || []
          let nids = checked.concat(halt)
          this.form.nids = nids
          this.$emit('submit')
        })
      },
      // 设置默认选中节点（需要menuTable数据获取完成且编辑时需要this.form.nids数据获取完成）
      setCheckNodes() {
        this.$nextTick(() => {
          // console.log(this.$refs.tree, this.form.nids)
          if (this.form.nids.indexOf('*') >= 0)
          {
            this.menuTable.forEach(item => {
              this.$refs.tree.setChecked(item.id, true, true)
            })
          } else {
            this.form.nids.forEach(item => {
              // 使用setCheckedKeys会选中子全部子节点,这里使用setChecked遍历选中单个节点
              this.$refs.tree.setChecked(item, true)
            })
          }
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  .myCol {
    width: 50%;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;

    .myContet {
      width: 200px;
      text-align: left;
    }
  }
</style>
