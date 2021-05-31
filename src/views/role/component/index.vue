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

      <el-form-item>
        <el-table
          ref="AdminMenuForm"
          :data="menuTable"
          row-key="id"
          :size="size"
          border
          :default-expand-all="true"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          @select="selectChange"
          @select-all="selectAllChange"
          @selection-change="selectionChangeHandler"
        >
          <!--复选框列-->
          <el-table-column align="center" type="selection" width="55"></el-table-column>

          <el-table-column align="left" prop="title" label="菜单名" />

          <el-table-column align="left" prop="name" label="name" />

          <el-table-column prop="path" label="path" />

          <el-table-column prop="component" label="组件" />

          <el-table-column prop="icon" align="center" label="图标" width="80">
            <template slot-scope="scope">
              <i :class="scope.row.icon" />
            </template>
          </el-table-column>

          <el-table-column width="80" align="center" prop="hidden" label="是否隐藏">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.hidden == '1'" />
            </template>
          </el-table-column>

          <el-table-column width="80" align="center" prop="sort" label="排序" />
        </el-table>
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
    async mounted() {
      this.load = true
      const resp = await menuIndex()
      this.menuTable = resp.data

      // 进入时需要默认选中， todo 这里很容易卡死
      if (this.form.nids.length > 0)
      {
        const choose = this.form.nids
        const checked = (list) => {
          list.forEach(item => {
            if (choose.indexOf('*') >= 0 || choose.indexOf(item.id) >= 0)
            {
              this.$nextTick(()=> {
                this.$refs.AdminMenuForm.toggleRowSelection(item, true)
              })
            }
            // 有子元素，递归遍历子元素
            if (item.children)
            {
              checked(item.children)
            }
          })
        }
        setTimeout(() => checked(this.menuTable), 1000)
      }
      this.load = false
    },
    data() {
      return {
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入角色名称' }]
        },
        menuTable: []
      }
    },
    methods: {
      submit() {
        this.$refs.RoleForm.validate((valid) => {
          if (!valid) {
            return false
          }
          this.$emit('submit')
        })

      },
      /**
       * 树形表格多选
       * @param selection
       * @param row
       */
      selectChange(selection, row) {
        // 如果selection中存在row代表是选中，否则是取消选中
        const findRow = val => {
          return val.id === row.id
        }
        if (selection.find(findRow)) {
          if (row.children) {
            row.children.forEach(val => {
              this.$refs.AdminMenuForm.toggleRowSelection(val, true)
              selection.push(val)
              if (val.children) {
                this.selectChange(selection, val)
              }
            })
          }
        } else {
          let index = this.form.nids.indexOf(row.id)
          if (index >= 0)
          {
            this.form.nids.splice(index, 1)
          }
          this.$refs.AdminMenuForm.toggleRowSelection(selection, row)
        }
      },
      selectAllChange(selection) {
        // 如果选中的数目与请求到的数目相同就选中子节点，否则就清空选中
        if (selection && selection.length === this.menuTable.length) {
          selection.forEach(val => {
            this.selectChange(selection, val)
          })
        } else {
          this.form.nids = [];
          this.$refs.AdminMenuForm.clearSelection()
        }
      },
      selectionChangeHandler(val) {
        val.forEach(item => {
          // 没有的就追加进去
          if (typeof item.id != 'undefined'
            && this.form.nids.indexOf(item.id) < 0
            && this.form.nids.indexOf('*') < 0)
          {
            this.form.nids.push(item.id)
          }
        })
        // console.log('nids=>', this.form.nids)
      }
    }
  }

</script>

<style scoped>
  .myCol {
    width: 50%;
  }
</style>
