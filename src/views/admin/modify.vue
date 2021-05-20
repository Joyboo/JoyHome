<template>
  <div class="view-container">
    <el-form ref="ModifyForm" :rules="rules" :model="form" :size="size" v-loading="loading" label-width="15rem">
      <el-form-item  prop="username">
        <template slot="label">
          用户名 <i class="labeli">请输入手机号</i>
        </template>
        <el-input v-model="form.username" maxlength="11" minlength="11" show-word-limit clearable />
      </el-form-item>

      <el-form-item>
        <template slot="label">
          旧密码 <i class="labeli">如留空,则原密码保持不变</i>
        </template>
        <el-input type="password" v-model="form.__password" clearable />
      </el-form-item>

      <el-form-item >
        <template slot="label">
          新密码 <i class="labeli">如想修改,请先填写旧密码</i>
        </template>
        <el-input type="password" v-model="form.password" clearable />
      </el-form-item>

      <el-form-item prop="password">
        <template slot="label">
          确认新密码 <i class="labeli"></i>
        </template>
        <el-input type="password" v-model="password" clearable />
      </el-form-item>

      <el-form-item label="真实姓名">
        <el-input type="realname" v-model="form.realname" placeholder="请输入真实姓名" clearable />
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

      <el-footer>
        <el-button class="joy-btn" :size="size" type="primary" @click="submit">提 交</el-button>
      </el-footer>
    </el-form>
  </div>
</template>

<script>
  import MenuCascader from '@/components/MenuCascader'
  import {adminModify} from '@/api/admin'
  import {mapGetters} from "vuex";
  import {validUsername} from "@/utils/validate";

  export default {
    name: "mofidy",
    components: {
      MenuCascader
    },
    computed: {
      ...mapGetters(['size', 'filtergamelist']),
    },
    mounted() {
      this.loading = true
      adminModify('get')
        .then(resp => {
          const {code, msg, data} = resp
          for (let i in data.data)
          {
            // 追加，不要覆盖
            this.form[i] = data.data[i]
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    data() {
      const _this = this
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('用户名格式不正确'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        // console.log('check password ', this.password, this.form.password, this.form.__password)
        // 与管理员编辑页不同的是，这里旧密码留空表示不修改密码
        if (this.form.__password == '')
        {
          callback()
        }
        else if (value.length < 6) {
          callback(new Error('长度必须大于6位'))
        }
        else if (_this.form.password != _this.password) {

          callback(new Error('两次输入的密码不一致'))
        }
        else {
          callback()
        }
      }

      return {
        loading: false,
        rules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ trigger: 'blur', validator: validatePassword }],
        },
        password: '',
        form: {
          username: '',
          password: '',
          __password: '', // 旧密码
          realname: '',
          extension: {
            nid: 0
          }
        }
      }
    },
    methods: {
      setpid(pid) {
        this.form.extension.nid = pid
      },
      submit() {
        this.$refs.ModifyForm.validate((valid) => {
          if (!valid) {
            return false
          }
          this.loading = true
          adminModify('post', this.form)
            .then(resp => {
              const {code, msg, data} = resp
              if (!code)
              {
                this.$message.error(msg || 'Modify Error')
              } else {
                this.$message.success(msg || 'Success')
              }
            })
            .catch(error => {
              this.$message.error(error)
            })
            .finally(() => {
              this.loading = false
            })
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-footer {
    text-align: center;
    margin: 30px 10px;

    .joy-btn {
      margin: 0 10px;
    }
  }
</style>
