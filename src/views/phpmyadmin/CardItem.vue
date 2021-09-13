<template>
  <el-card :body-style="{ padding: '0px', height: '150px' }">
    <!-- svg -->
    <svg-icon v-if="iconClass" :icon-class="iconClass" class-name="svgName" />
    <!-- image -->
    <div v-else-if="image" style="text-align: center">
      <img :src="require('@/assets/image/' + image)" class="imageName" alt="">
    </div>
    <!-- name -->
    <div v-else class="textName">{{ name }}</div>

    <div style="padding: 14px;">
      <span :class="[className, 'name']">{{ name }}</span>
      <div class="bottom clearfix">
        <span class="url">{{ url }}</span>

        <el-row :gutter="20">
          <el-col :span="6" :offset="18">
            <el-link :href="fullUrl || url" :underline="false" target="_blank" class="tolink">
              <el-button type="text" class="button">{{ $t('open') }}</el-button>
            </el-link>
          </el-col>
        </el-row>

      </div>
    </div>

  </el-card>
</template>

<script>
export default {
  name: 'CardItem',
  props: {
    name: {
      type: String,
      default: ''
    },
    iconClass: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    fullUrl: {
      type: [String],
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>

  $height: 150px;

  .name {
    height: 15px;
  }

  .url {
    font-size: 13px;
    color: #999;
    white-space: nowrap; // 强制不换行
    max-height: 15px;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .tolink {
    padding: 0;
    float: right;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .svgName {
    width: 100%;
    height: 100%;
  }

  .textName {
    text-align: center;
    height: $height;
    line-height: $height;
    font-size: 4rem;
    font-weight: 600;
  }

  .imageName {
    width: auto;
    height: $height;
  }
</style>
