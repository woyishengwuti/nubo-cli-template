<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-22 09:27:21
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-07-14 11:18:25
 * @ Description: 关机重启
 -->

<template>
  <el-drawer
    title=""
    :with-header="false"
    :visible.sync="dialogVisible"
    direction="btt"
    size="30.55%"
    custom-class="close-computer custom-drawer-mini"
  >
    <div class="container">
      <div class="close" @click="close" v-text="$t('ireveLogin.close')">关机</div>
      <div class="restart" @click="restart" v-text="$t('ireveLogin.restart')">重新启动</div>
      <div class="cancel" @click="cancel" v-text="$t('general.cancel')">取消</div>
    </div>
  </el-drawer>
</template>

<script>
// 导入其他文件比如：组件/工具js/第三方插件js/json文件/图片等等import 《组件名称》 from '《组件路径》';

export default {
  name: 'CloseComputer',
  components: {},
  props: {},
  data() {
    return {
      dialogVisible: false // 是否显示弹出层
    }
  },
  computed: {

  },
  watch: {

  },
  beforeCreate() {

  },
  created() {

  },
  beforeMount() {},
  mounted() {

  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    // 关机
    close() {
      this.$emit('close')
    },
    // 重启
    restart() {
      this.$emit('restart')
    },
    // 取消
    cancel() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='scss' scoped>
  /deep/ .close-computer {
    font-family: $font-family;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    background: #E9ECED;

    /deep/ .el-drawer__body {

      .container {
        display: flex;
        flex-direction: column;

        > div {
          height: 100px;
          line-height: 100px;
          background: $back-color;
          text-align: center;
          font-size: 36px;
          cursor: pointer;
        }

        .close {
          color: $waring-text-color;
          // border-bottom: 1px solid $border-color;
          padding: 0 30px;
          position: relative;

          &::before {
            content: "";
            position: absolute;
            left: 30px;
            bottom: 0;
            width: calc(100% - 60px);
            height: 1px;
            background: $border-color;
          }
        }

        .restart {
          color: $primary-color;
        }

        .cancel {
          margin-top: 30px;
          color: rgba($title-color, 0.6);
        }
      }
    }
  }
</style>
