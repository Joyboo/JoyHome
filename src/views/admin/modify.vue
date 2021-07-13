<template>
  <div class="view-container">
    <el-form ref="ModifyForm" v-loading="loading" :rules="rules" :model="form" :size="size" label-width="15rem" :label-position="device === 'mobile' ? 'top' : 'right'">
      <el-form-item prop="username">
        <template slot="label">
          用户名 <i class="labeli">请输入手机号</i>
        </template>
        <el-input v-model="form.username" maxlength="11" minlength="11" show-word-limit clearable />
      </el-form-item>

      <el-form-item>
        <template slot="label">
          旧密码 <i class="labeli">如留空,则原密码保持不变</i>
        </template>
        <el-input v-model="form.__password" type="password" autocomplete="new-password" clearable />
      </el-form-item>

      <el-form-item>
        <template slot="label">
          新密码 <i class="labeli">如想修改,请先填写旧密码</i>
        </template>
        <el-input v-model="form.password" type="password" autocomplete="new-password" clearable />
      </el-form-item>

      <el-form-item prop="password">
        <template slot="label">
          确认新密码 <i class="labeli" />
        </template>
        <el-input v-model="password" type="password" autocomplete="new-password" clearable />
      </el-form-item>

      <el-form-item label="真实姓名">
        <el-input v-model="form.realname" type="text" placeholder="请输入真实姓名" clearable />
      </el-form-item>

      <el-form-item label="默认游戏">
        <el-select v-model="form.extension.gid" filterable>
          <el-option
            v-for="(_gname, _gid) in gamelist"
            :key="_gid"
            :label="_gname"
            :value="parseInt(_gid)"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="默认打开菜单">
        <menu-cascader :pid.sync="form.extension.newnid" :uid="userinfo.id" />
      </el-form-item>

      <el-footer>
        <el-button class="joy-btn" :size="size" type="primary" @click="submit">提 交</el-button>
      </el-footer>
    </el-form>
  </div>
</template>

<script>
import MenuCascader from '@/components/MenuCascader'
import { adminModify } from '@/api/admin'
import { mapGetters } from 'vuex'
import { validUsername } from '@/utils/validate'
import { copyTo } from '@/utils'

export default {
  name: 'mofidy',
  components: {
    MenuCascader
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
      if (this.form.__password == '') {
        callback()
      } else if (value.length < 6) {
        callback(new Error('长度必须大于6位'))
      } else if (_this.form.password != _this.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }

    return {
      loading: false,
      rules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ trigger: 'blur', validator: validatePassword }]
      },
      password: '',
      form: {
        username: '',
        password: '',
        __password: '', // 旧密码
        realname: '',
        extension: {
          newnid: 0,
          nid: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters(['size', 'userinfo', 'device', 'gamelist'])
  },
  async mounted() {
    this.loading = true
    try {
      const { code, msg, data } = await adminModify('get')
      if (!code) {
        return this.$message.error(msg)
      }
      this.form = copyTo(this.form, data.data)
    } catch (e) {
      this.$message.error(e)
    }
    this.loading = false
  },
  methods: {
    submit() {
      this.$refs.ModifyForm.validate((valid) => {
        if (!valid) {
          return false
        }
        this.loading = true
        adminModify('post', this.form)
          .then(({ code, msg, data }) => {
            if (!code) {
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
      })
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
