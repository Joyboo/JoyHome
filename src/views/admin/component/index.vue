<template>
    <div v-loading="loading" class="view-container">
      <el-form ref="AdminForm" :rules="rules" :model="form" :size="size" label-width="15rem">
        <el-tabs type="border-card">
          <el-tab-pane label="管理员信息">

            <el-form-item  prop="username">
              <template slot="label">
                用户名 <i class="labeli">请输入手机号</i>
              </template>
              <el-input v-model="form.username" maxlength="11" minlength="11" show-word-limit clearable />
            </el-form-item>

            <el-form-item  prop="password">
              <template slot="label">
                密码 <i v-if="typeof form.id != 'undefined'" class="labeli">如留空,则原密码保持不变</i>
              </template>
              <el-input type="password" v-model="form.password" clearable />
            </el-form-item>

            <el-form-item>
              <template slot="label">
                确认密码 <i v-if="typeof form.id != 'undefined'" class="labeli"></i>
              </template>
              <el-input type="password" v-model="password" clearable />
            </el-form-item>

          </el-tab-pane>

          <el-tab-pane label="栏目分配">
          </el-tab-pane>

          <el-tab-pane label="游戏分配">
          </el-tab-pane>

          <el-tab-pane label="报警分配">
          </el-tab-pane>
        </el-tabs>

        <button-tpl index="/admin/index" @submit="submit"></button-tpl>
      </el-form>
    </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {validUsername} from "@/utils/validate";
  import ButtonTpl from '@/components/ButtonTpl'

  export default {
    components: {
      ButtonTpl,
    },
    computed: {
      ...mapGetters(['size'])
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      }/*,
      form: {
        required: true,
        type: Object
      }*/
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
        console.log('value=>', value, _this.password)
        if (value.length < 6) {
          callback(new Error('长度必须大于6位'))
        } else {
          if (value != _this.password) {
            callback(new Error('两次输入的密码不一致'))
          } else {
            callback()
          }
        }
      }

      return {
        // 确认密码
        password: '',
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        }
      }
    },
    methods: {
      submit() {
        console.log('submit begin')
        this.$refs.AdminForm.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
