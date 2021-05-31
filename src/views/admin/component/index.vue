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

            <!--todo 默认打开菜单需要依赖于注册过的路由，暂时注释掉-->
            <!--<el-form-item label="默认打开菜单">
              <menu-cascader :pid.sync="form.extension.newnid" @setpid="setpid"></menu-cascader>
            </el-form-item>-->

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
              <template slot="label">
                权限列表<i class="labeli cRed">权限列表仅作为展示数据</i>
              </template>

              <el-input
                placeholder="输入关键字进行过滤,可选 id，name，path"
                v-model="filterText">
              </el-input>

              <el-tree
                class="filter-tree"
                :data="menuTable"
                highlight-current
                show-checkbox
                default-expand-all
                node-key="id"
                :props="propsObj"
                :filter-node-method="filterNode"
                ref="roletree">
                <!--自定义节点内容-->
                <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{data.id}} - {{ data.title }}</span>
            <span class="myContet">
              {{data.path}}
            </span>
          </span>
              </el-tree>
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
        this.setChecked(this.form.rid)

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
          this.setChecked(newVal)
        }
      },
      filterText(val) {
        this.$refs.roletree.filter(val);
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
        // console.log('check password', _this.form.password, _this.password)
        // 如果是修改，允许留空密码项，表示不修改密码
        if (this.isupd && this.form.password.length == 0)
        {
          callback()
        }
        else if (value.length < 6) {
          callback(new Error('长度必须大于6位'))
        }
        else if (_this.form.password != _this.password) {

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
        propsObj: {
          disabled: function (data, node) {
            return false
          }
        },
        filterText: '',
      }
    },
    methods: {
      // 允许按id,title和path匹配
      filterNode(value, data) {
        if (!value) return true;
        return data.title.indexOf(value) !== -1 || data.path.indexOf(value) !== -1;
      },
      submit() {
        this.$refs.AdminForm.validate((valid) => {
          if (!valid) {
            return false
          }
          if (typeof this.form.extension.newnid === 'object') {
            // 级联选择器传递的是包含父节点的多级数组，取最后一个
            this.form.extension.newnid = this.form.extension.newnid[this.form.extension.newnid.length - 1]
          }
          this.$emit('submit')
        });
      },
      setpid(pid) {
        this.form.extension.newnid = pid
      },
      setChecked(rid) {
        if (!rid) {
          return
        }
        // 获取该角色所有权限
        roleEdit('get', {id: rid})
          .then(resp => {
            const {data} = resp
            // tp5 role模型已增加nids字段获取器,返回的是数组
            const nids = data.data.nids
            // console.log('nids ',rid, nids, data)
            this.$nextTick(() => {

              const admin = nids.indexOf('*') >= 0
              this.menuTable.forEach(item => {
                this.$refs.roletree.setChecked(item.id, admin, true)
              })

              if (!admin)
              {
                nids.forEach(item => {
                  // 使用setCheckedKeys会选中子全部子节点,这里使用setChecked遍历选中单个节点
                  this.$refs.roletree.setChecked(item, true)
                })
              }
            })
          })
          .catch(error => {})
      }
    }
  }
</script>

<style lang="scss" scoped>
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

  .myForm {
    width: 80%;
  }
</style>
