<template>
  <div class="view-container" v-loading="loading">
    <el-form :model="form" :size="size" label-width="15rem" :label-position="device === 'mobile' ? 'top' : 'right'">

      <el-tabs type="border-card" @tab-click="tabClick">
        <el-tab-pane label="普通录入">

          <el-form-item label="所属日期">
            <el-date-picker
              v-model="form.exptime"
              type="date"
              value-format="timestamp"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="所属游戏">
            <el-select v-model="form.gameid" @change="chgGame" filterable>
              <el-option
                v-for="item in filtergamelist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="所属包">
            <el-select v-model="form.pkgbnd" filterable>
              <el-option
                v-for="item in pkglist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item>
            <template slot="label">
              广告成本<i class="labeli">单位：美元</i>
            </template>
            <el-input type="text" v-model="form.cost" style="width: 50%" placeholder="" clearable />
          </el-form-item>

        </el-tab-pane>

        <el-tab-pane label="文件上传">
          <el-row>
            <el-col  :xs="{span: 22}" :sm="{span: 22}" :md="{span: 22}" :lg="{span: 10}" :xl="{span: 10}" class="UploadJoyboo">
              <el-upload
                class="upload-demo"
                drag
                action="joyboo"
                :http-request="uploadExcel"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <!--            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </el-col>
            <el-col  :xs="{span: 22}" :sm="{span: 22}" :md="{span: 22}" :lg="{span: 10}" :xl="{span: 10}">
              <fieldset>
                <legend><b>请使用下方模板文件为原型上传：</b></legend>
                <span>首行空出将被视为表头而不被导入。 </span><br>
                <span><b>A列</b>：包含年月日的任意格式日期值。</span><br>
                <span><b>B列</b>：所属游戏的id。</span><br>
                <span><b>C列</b>：所属包的id。</span><br>
                <span><b>D列</b>：广告成本。</span><br>
                <span>任意一列为空，该行将被忽略。</span><br>
                <el-button type="success" size="mini" @click="downloadTemplate"><svg-icon icon-class="excel" />&nbsp;点我下载模板</el-button>
              </fieldset>
            </el-col>
          </el-row>

        </el-tab-pane>
      </el-tabs>

      <button-tpl index="/expense/index" @submit="submit" ></button-tpl>
    </el-form>

    <table v-show="false" :id="dlId">
      <tr>
        <th>所属日期</th>
        <th>所属游戏id</th>
        <th>所属包id</th>
        <th>广告成本</th>
      </tr>
      <tr>
        <td>2021/03/25</td>
        <td>2</td>
        <td>com.wonderland.isleofgenesis</td>
        <td>8217</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import ButtonTpl from '@/components/ButtonTpl'
  import {packageindex} from '@/api/package'
  import {expenseAdd} from '@/api/expense'
  import {uploadJb} from "@/api/upload";
  import {export_table_to_excel_joyboo} from '@/vendor/Export2Excel'
  import {closeTab} from "@/utils";

  export default {
    name: 'expenseadd',
    components: {
      ButtonTpl
    },
    computed: {
      ...mapGetters(['size', 'filtergamelist', 'device'])
    },
    mounted() {
      this.$store.dispatch('filter/gameInfo')
    },
    data() {
      return {
        loading: false,
        form: {
          type: 0,
          exptime: '',
          gameid: '',
          pkgbnd: '',
          cost: '',
          file: ''
        },
        pkglist: [],
        dlId: 'downloadTemplateTable'
      }
    },
    methods: {
      submit() {
        this.loading = true
        expenseAdd(this.form)
          .then(({code, msg}) => {
            if (code)
            {
              this.$message.success(msg)
              closeTab()
            } else {
              this.$message.error(msg || 'add error')
            }
          })
          .catch(error => {
            this.$message.error(error)
          })
          .finally(() => {
            this.loading = false
          })
      },
      // tab切换事件
      tabClick(tab) {
        this.form.type = tab.index
      },
      // 选择了游戏，找到包
      chgGame(value) {
        this.pkglist = []
        this.form.pkgbnd = ''
        this.loading = true
        packageindex({gameid: value})
          .then(({code, msg, data}) => {
            if (!code)
            {
              return this.$message.error(msg)
            }
            for(let i in data.data)
            {
              let item = data.data[i]
              this.pkglist.push({
                label: item.name,
                value: item.pkgbnd
              })
            }
          })
          .finally(() => {
            this.loading = false
          })
      },
      downloadTemplate() {
        export_table_to_excel_joyboo({
          id: this.dlId,
          bookType: 'xlsx',
          filename: '广告消耗成本录入'
        })
      },
      uploadExcel(params) {
        uploadJb('/admin/expense/upload', params).then(({ status, data }) => {
          if (status == 200) {
            this.form.file = data
            this.$message.success('上传成功')
          } else {
            this.$message.error('上传失败了')
          }
        }).catch(error => {
          this.$message.error(error)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  fieldset {
    font-size: 0.8rem;
    color: #F56C6C;
    border: 1px dotted #FF3030;
  }

  .UploadJoyboo {
    text-align: center;
  }
</style>
