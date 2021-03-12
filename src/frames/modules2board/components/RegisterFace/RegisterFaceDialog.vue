<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-09-28 16:10:06
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-12 13:30:09
 * @ Description: 人脸注册和人脸识别登录
 -->

<template>
  <el-dialog
    class="register-face-dialog custom-dialog-middle"
    :visible.sync="visible"
    top="calc(60vh / 10.8)"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="calc(1000% / 19.2)"
  >
    <div class="right-icon" @click="handleEnd">
      <svg-icon icon-class="dialog-title-close" />
    </div>
    <div class="wrapper">
      <template v-if="istate === 0">
        <div class="camera" />
        <div class="tips">*请正脸面对设备摄像头，确保人脸在识别区域范围内</div>
      </template>
      <template v-if="istate === 1">
        <div class="camera" />
        <div class="doing">
          <div class="first">正在采集人脸..</div>
          <div class="second">请正脸面对设备摄像头，确保人脸在识别区域范围内</div>
        </div>
      </template>
      <template v-if="istate === 2">
        <div class="camera-success">
          <!-- <img :src="require('../../assets/images/registered.png')" alt=""> -->
          <svg-icon icon-class="disinfecting-finish" />
        </div>
        <div class="success">
          <div class="first">采集人脸成功！</div>
          <div v-if="similar" class="second">注意：该人脸特征与{{ similar }}用户相似度过高！</div>
        </div>
      </template>
      <template v-if="istate === 3">
        <div class="camera-failure">
          <!-- <img :src="require('../../assets/images/registered.png')" alt=""> -->
          <svg-icon icon-class="error" />
        </div>
        <div class="failure">
          <div class="first">采集人脸失败，请重试！</div>
          <div class="second">请正脸面对设备摄像头，确保人脸在识别区域范围内</div>
        </div>
      </template>
    </div>
    <div slot="footer" class="footer">
      <div v-if="istate === 0" class="cancel" @click="handleEnd">取消</div>
      <div
        v-if="istate === 0 || istate === 2 || istate === 3"
        class="confirm"
        @click="handleStart"
      >{{ istate === 2 ? '确定' : istate === 3 ? '重新识别' : '开始识别' }}</div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'RegisterFaceDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    // 0 打开未识别， 1开始识别 2，识别出结果，3 失败
    istate: {
      type: Number,
      default: 0
    },
    similar: {
      type: String,
      default: ''
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
    // 开始识别
    handleStart() {
      this.$emit('start')
    },
    // 关闭
    handleEnd() {
      this.$emit('close')
    }
  }
}
</script>

<style lang='scss' scoped>
  .register-face-dialog {
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
        height: calc(100% - 100px);
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
            color: $correct-text-color;
            font-size: 32px;
            font-family: $font-family;
            position: absolute;
            bottom: 37px;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
          }

          .doing {
            position: absolute;
            bottom: -38px;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;

            .first {
              color: $primary-color;
              font-size: 48px;
              font-family: $font-family;
              white-space: nowrap;
              text-align: center;
            }

            .second {
              color: rgba($title-color, 0.8);
              font-size: 28px;
              font-family: $font-family;
              margin-top: 23px;
              white-space: nowrap;
            }
          }

          .camera-success, .camera-failure {
            position: absolute;
            top: 160px;
            left: 50%;
            transform: translateX(-50%);

            img {
              width: 194px;
              height: 194px;
            }

            .svg-icon {
              width: 72px;
              height: 72px;
              position: absolute;
              top: -49px;
              right: -36px;
            }
          }

          .success {
            position: absolute;
            bottom: 125px;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;

            .first {
              color: $correct-text-color;
              font-size: 48px;
              font-family: $font-family;
              white-space: nowrap;
              text-align: center;
            }

            .second {
              color: rgba($title-color, 0.8);
              font-size: 28px;
              font-family: $font-family;
              margin-top: 38px;
              white-space: nowrap;
            }
          }

          .failure {
            position: absolute;
            bottom: 125px;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;

            .first {
              color: $waring-text-color;
              font-size: 48px;
              font-family: $font-family;
              white-space: nowrap;
              text-align: center;
            }

            .second {
              color: rgba($title-color, 0.8);
              font-size: 28px;
              font-family: $font-family;
              margin-top: 38px;
              white-space: nowrap;
            }
          }
        }
      }

      .el-dialog__footer {
        .footer {
          > div {
            width: 100%;
          }
        }
      }
    }
  }
</style>
