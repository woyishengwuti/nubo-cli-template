<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-07-09 15:29:06
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-09-29 14:45:36
 * @ Description: 门锁提示
 -->

<template>
  <el-dialog
    class="alarm-close-dialog custom-dialog-mini"
    :visible.sync="alarmVisible"
    top="calc(200vh / 10.8)"
    width="calc(640% / 19.2)"
    :before-close="handleClose"
  >
    <div class="wrapper">
      <svg-icon icon-class="alarm-close" />
      <div class="tips-wrap">
        <div class="tips" v-text="$t('ireveLogin.tips')">防盗告警</div>
        <div class="remove-ways" v-text="$t('ireveLogin.removeWays')">登录系统可解除告警！</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'AlarmCloseDialog',
  components: {},
  props: {

  },
  data() {
    return {
      alarmVisible: false
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
    // 关闭前的回调
    handleClose(done) {
      this.alarmVisible = false
    }
  }
}
</script>

<style lang='scss' scoped>
  .alarm-close-dialog {
    /deep/ .el-dialog {
      height: 480px;
      overflow: visible;

      .el-dialog__header {
        display: none;
      }

      .el-dialog__body {
        width: 100%;
        height: 100%;
        overflow: visible;

        .wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          position: relative;
          overflow: visible;

          .svg-icon {
            width: 640px;
            height: 314px;
            position: absolute;
            top: -54px;
          }

          .tips-wrap {
            position: absolute;
            top: 287px;

            .tips {
              font-size: 72px;
              font-family: $bold-font-family;
              color: $title-color;
            }

            .remove-ways {
              margin-top: 29px;
              font-size: 32px;
              color: $title-color;
            }
          }
        }
      }
    }
  }
</style>
