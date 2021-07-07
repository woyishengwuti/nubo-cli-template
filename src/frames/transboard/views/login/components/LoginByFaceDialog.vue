<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-12-02 09:12:59
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-12-02 09:22:19
 * @ Description: 人脸登录
 -->

<template>
  <el-dialog
    class="login-by-face-dialog custom-dialog-middle"
    :visible.sync="visible"
    top="calc(120vh / 10.8)"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="calc(1000% / 19.2)"
  >
    <div class="right-icon" @click="handleEnd">
      <svg-icon icon-class="dialog-title-close" />
    </div>
    <div class="wrapper">
      <template>
        <div class="camera" />
        <div class="tips">人脸核对，请正面对着镜头…</div>
      </template>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'LoginByFaceDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

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
    // 关闭
    handleEnd() {
      this.$emit('handleEnd')
    }
  }
}
</script>

<style lang='scss' scoped>
  .login-by-face-dialog {
    /deep/ .el-dialog {
      position: relative;
      height: 798px;

      .el-dialog__header {
        display: none;
      }

      .right-icon {
        position: absolute;
        right: 30px;
        top: 27px;
        z-index: 9999;

        .svg-icon {
          width: 46px;
          height: 46px;
        }
      }

      .el-dialog__body {
        width: 100%;
        height: calc(100%);
        position: relative;
        font-family: $font-family;

        .wrapper {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);

          .camera {
            width: 659px;
            height: 494px;
            position: absolute;
            top: 70px;
            left: 50%;
            transform: translateX(-50%);
          }

          .tips {
            color: rgba($title-color, 1);
            font-size: 32px;
            font-family: $font-family;
            position: absolute;
            bottom: 82px;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
