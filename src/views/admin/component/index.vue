<template>
    <div v-loading="load" class="view-container">
      <el-form ref="AdminForm" :rules="rules" :model="form" :size="size" label-width="15rem">
        <el-tabs type="border-card">
          <el-tab-pane label="管理员信息">

            <el-form-item  prop="username">
              <template slot="label">
                用户名 <i class="labeli">请输入手机号</i>
              </template>
              <el-input v-model="form.username" maxlength="11" minlength="11" show-word-limit clearable />
            </el-form-item>

            <el-form-item >
              <template slot="label">
                密码 <i v-if="isupd" class="labeli">如留空,则原密码保持不变</i>
              </template>
              <el-input type="password" v-model="form.password" clearable />
            </el-form-item>

            <el-form-item prop="password">
              <template slot="label">
                确认密码 <i v-if="isupd" class="labeli"></i>
              </template>
              <el-input type="password" v-model="password" clearable />
            </el-form-item>

            <el-form-item label="真实姓名">
              <el-input type="realname" v-model="form.realname" placeholder="请输入真实姓名" clearable />
            </el-form-item>

            <el-form-item label="状态">
              <el-radio-group v-model="form.extension.status">
                <el-radio label="0" border>锁定</el-radio>
                <el-radio label="1" border>正常</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item>
              <template slot="label">
                排序号 <i class="labeli">升序。越小排越前面</i>
              </template>
              <el-input-number v-model="form.sort" :min="1" :max="1000" />
            </el-form-item>

            <el-form-item label="默认游戏">
              <el-select v-model="form.extension.gid" filterable>
                <el-option
                  v-for="item in filtergamelist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="默认打开菜单">
              <menu-cascader :pid.sync="form.extension.nid" @setpid="setpid"></menu-cascader>
            </el-form-item>

          </el-tab-pane>

          <el-tab-pane label="栏目分配">

            <el-form-item label="网站角色" prop="rid">
              <el-select v-model="form.rid" filterable placeholder="请选择网站角色" >
                <el-option
                  v-for="item in rolelist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item class="myForm">
              <el-table
                ref="AdminMenuForm"
                :data="menuTable"
                row-key="id"
                :size="size"
                border
                :default-expand-all="true"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              >
                <!--复选框列-->
                <el-table-column type="selection" :selectable='checkboxSelect' width="55"></el-table-column>

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

          </el-tab-pane>

          <el-tab-pane label="游戏分配">

            <el-transfer
              v-model="form.extension.gameids"
              :titles="['全部游戏', '分配给TA']"
              filterable
              :button-texts="['取消', '选择']"
              :data="gametransfer"
            ></el-transfer>

          </el-tab-pane>

          <el-tab-pane label="报警分配">

            <el-form-item>
              <el-checkbox-group v-model="form.extension.ntcids">
                <el-checkbox :label="1">支付错误警报</el-checkbox>
                <br>
                <el-checkbox :label="2">创角、登录、支付异常预警</el-checkbox>
                <br>
                <el-checkbox :label="3">短信发送失败</el-checkbox>
                <br>
                <el-checkbox :label="4">cron程序出错</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

          </el-tab-pane>
        </el-tabs>

        <button-tpl index="/admin/index" @submit="submit"></button-tpl>
      </el-form>
    </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {validUsername} from "@/utils/validate";
  import {rolelist, roleEdit} from '@/api/role'
  import ButtonTpl from '@/components/ButtonTpl'
  import MenuCascader from '@/components/MenuCascader'
  import {menuIndex} from "@/api/menu";

  export default {
    components: {
      ButtonTpl,
      MenuCascader
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      form: {
        required: true,
        type: Object
      }
    },
    computed: {
      ...mapGetters(['size', 'filtergamelist', 'gamelist']),
      isupd() {
        return typeof this.form.id != 'undefined'
      },
      load: {
        get() {
          return this.loading
        },
        set(val) {
          this.$emit('loading', val)
        }
      },
      theme() {
        return this.$store.state.settings.theme
      }
    },
    async mounted() {
      try {
        this.load = true
        await this.$store.dispatch('filter/gameInfo')

        const {data} = await rolelist()
        for (let i in data) {
          this.rolelist.push({
            label: data[i],
            value: i
          })
        }

        const resp = await menuIndex()
        this.menuTable = resp.data

        // 游戏分配穿梭框
        this.gamelist.forEach((name, index) => {
          this.gametransfer.push({
            key: index,
            label: name,
            disabled: false
          })
        })

        this.load = false

      } catch (e) {
        console.error("mounted error=>", e)
      }
    },
    /* 侦听器 */
    watch: {
      // 这种侦听器写箭头函数时获取不到this.data ，见文档：https://cn.vuejs.org/v2/api/#watch
      'form.rid': {
        immediate: true, // 侦听开始后立即调用，用于编辑时立即触发角色权限选中
        handler: function (newVal, oldVal) {
          // console.log('watch handler ok', newVal, this.menuTable)

          if (newVal == '')
          {
            return;
          }

          // 获取该角色所有权限
          roleEdit('get', {id: newVal}).then(resp => {
            const {data} = resp
            const nids = data.data.nids
            const narr = nids.split(',')

            const checked = (list) => {
              list.forEach(item => {
                if (nids == '*' || narr.indexOf(item.id) >= 0)
                {
                  this.$refs.AdminMenuForm.toggleRowSelection(item, true)
                }
                // 有子元素，递归遍历子元素
                if (item.children)
                {
                  checked(item.children)
                }
              })
            }
            this.$refs.AdminMenuForm.clearSelection()
            checked(this.menuTable)
          })
        }
      }
    },
    data () {
      const _this = this;
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('用户名格式不正确'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        // 如果是修改，允许留空密码项，表示不修改密码
        if (this.isupd && this.password.length == 0)
        {
          callback()
        }
        else if (value.length < 6) {
          callback(new Error('长度必须大于6位'))
        } else if (_this.form.password != _this.password) {

          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      }

      return {
        // 确认密码
        password: '',
        rules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ trigger: 'blur', validator: validatePassword }],
          rid: [{ required: true, trigger: 'change', message: '请选择一个角色组' }]
        },
        rolelist: [],
        menuTable: [],
        multipleSelection: [], // 默认选中的菜单
        gametransfer: [], // 穿梭框的全部游戏
      }
    },
    methods: {
      submit() {
        this.$refs.AdminForm.validate((valid) => {
          if (!valid) {
            return false
          }
          if (typeof this.form.extension.nid === 'object') {
            // 级联选择器传递的是包含父节点的多级数组，取最后一个
            this.form.extension.nid = this.form.extension.nid[this.form.extension.nid.length - 1]
          }
          this.$emit('submit')
        });
      },
      // 禁用选择列
      checkboxSelect (row, rowIndex) {
        return false
      },
      setpid(pid) {
        this.form.extension.nid = pid
      }
    }
  }
</script>

<style lang="scss">
  /*
  此页面为全局CSS，去掉了scoped
  表格复选框，禁用列按钮背景色
  todo 应该调整为使用Vuex全局setting.theme变量，与全局主题色号一致
  */
  .myForm .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #1890ff!important;
    border-color: #1890ff!important;
  }

</style>
