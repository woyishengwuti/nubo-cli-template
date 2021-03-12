<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-07-10 13:58:52
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-12 13:32:01
 * @ Description: 正在进行消毒 disinfecting
 -->

<template>
  <el-dialog
    class="disinfecting-dialog custom-dialog-middle"
    :visible.sync="disinfectingVisible"
    top="calc(215vh / 10.8)"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="calc(1000% / 19.2)"
  >
    <div class="right-icon" @click="handleEnd">
      <svg-icon icon-class="dialog-title-close" />
    </div>
    <div class="wrapper">
      <div v-if="doing" class="doing">
        <div class="loading">
          <!-- <img src="~@modules2board/assets/images/disinfecting.gif" alt=""> -->
          <!-- <svg-icon class-name="disinfecting" icon-class="disinfecting" />
          <svg-icon class-name="disinfecting-inner-ring" icon-class="disinfecting-inner-ring" />
          <svg-icon class-name="disinfecting-outer-ring" icon-class="disinfecting-outer-ring" /> -->
        </div>
        <div class="tips">
          <div class="thing">正在紫外线消毒</div>
          <div class="time">
            <span>已消毒</span>
            <span class="num">{{ pastTime }}</span>
            <span>分钟，</span>
            <span>剩余</span>
            <span class="num left">{{ disinfectingTimeClone[0] }}</span>
            <span>小时</span>
            <span class="num left">{{ disinfectingTimeClone[1] }}</span>
            <span>分钟</span>
          </div>
        </div>
      </div>
      <div v-else class="finish">
        <div class="loading">
          <!-- <img src="~@modules2board/assets/images/disinfecting.gif" alt=""> -->
          <svg-icon class-name="disinfecting-finish" icon-class="disinfecting-finish" />
        </div>
        <div class="tips">
          <div class="thing">已消毒完毕</div>
          <div class="time">
            <span>等待</span>
            <span class="num">{{ iClose }}</span>
            <span>秒后自动退出消毒模式</span>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="footer">
      <div class="cancel" @click="handleEnd">结束消毒</div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DisinfectingDialog',
  components: {},
  props: {
    disinfectingVisible: {
      type: Boolean,
      default: false
    },
    disinfectingTime: {
      type: String,
      default: '00:00'
    }
  },
  data() {
    return {
      disinfectingTimeClone: '00:00', // 复制的时间
      pastTime: 0, // 消耗的
      disinfectingInterval: null, // 定时器
      doing: true, // 区分显示的是什么
      iCloseInterval: null, // 关闭倒计时
      iClose: 5
    }
  },
  computed: {

  },
  watch: {
    // 监听是否显示
    disinfectingVisible(val) {
      // 打开的时候开启定时器
      if (val) {
        // 显示正在进行
        this.doing = true
        this.disinfectingTimeClone = JSON.parse(JSON.stringify(this.disinfectingTime))
        this.disinfectingTimeClone = this.disinfectingTimeClone.split(':')

        if (this.disinfectingInterval) clearInterval(this.disinfectingInterval)
        this.disinfectingInterval = setInterval(v => {
          // 每一分钟加一
          this.pastTime++

          // 同时 this.disinfectingTimeClone 减小
          // 分钟
          // let minu = this.disinfectingTimeClone[1] * 60
          // 小时
          // let hour = this.disinfectingTimeClone[0]

          if (this.disinfectingTimeClone[1] - 1 <= 0) {
            this.disinfectingTimeClone[1] = 59

            if (this.disinfectingTimeClone[0] - 1 < 0) {
              // 都到0了
              this.doing = false

              if (this.disinfectingInterval) clearInterval(this.disinfectingInterval)

              // 进入倒计时
              this.closeInterval()
            } else {
              // 减小
              this.disinfectingTimeClone[0]--
            }
          } else {
            // 减小
            this.disinfectingTimeClone[1]--
          }
        }, 1000 * 60)
      } else {
        if (this.disinfectingInterval) clearInterval(this.disinfectingInterval)
      }
    }
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
    // 关闭倒计时
    closeInterval() {
      this.iClose = 5
      if (this.iCloseInterval) clearInterval(this.iCloseInterval)
      this.iCloseInterval = setInterval(v => {
        this.iClose--

        if (this.iClose <= 0) {
          if (this.iCloseInterval) clearInterval(this.iCloseInterval)
          this.handleEnd()
        }
      }, 1000)
    },
    // 结束消毒
    handleEnd() {
      if (this.disinfectingInterval) clearInterval(this.disinfectingInterval)
      this.$emit('close')
    }
  }
}
</script>

<style lang='scss' scoped>
  .disinfecting-dialog {
    /deep/ .el-dialog {
      position: relative;

      .el-dialog__header {
        display: none;
      }

      .right-icon {
        position: absolute;
        right: 30px;
        top: 27px;

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
          left: 50%;
          transform: translateX(-50%);

          .doing, .finish {
            width: 100%;
            height: 100%;

            .loading {
              width: 100%;
              // height: 100%;
              // padding-top: 28px;
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;

              .svg-icon {
                position: absolute;
                left: 558px;
                width: 82px;
                height: 82px;
                top: 55px;
              }

              // .disinfecting {
              //   width: 82px;
              //   height: 82px;
              //   top: 28px;
              // }

              // .disinfecting-inner-ring {
              //   color: red;
              //   width: 308px;
              //   height: 308px;
              //   top: 28px;
              // }

              // .disinfecting-outer-ring {
              //   color: red;
              //   width: 348px;
              //   height: 348px;
              //   top: 28px;
              // }
            }

            .tips {
              margin-top: 6px;
              width: 100%;
              text-align: center;
              font-size: 52px;
              font-family: $bold-font-family;
              color: $waring-text-color;
              position: absolute;
              top: 382px;

              .thing {
                color: $title-color;
                font-size: 72px;
                font-weight: 500;
                font-family: $bold-font-family;
              }

              .time {
                margin-top: 21px;
                color: rgba($title-color, 0.8);
                font-size: 32px;
                font-family: $font-family;
                display: flex;
                justify-content: center;

                span.num {
                  font-size: 34px;
                  font-family: $reg-font-family;
                  margin: 0 10px;
                }

                span.left {
                  color: $primary-color;
                }
              }
            }
          }
        }
      }

      .el-dialog__footer {
        .footer {
          .cancel {
            width: 100%;
          }
        }
      }
    }
  }
</style>
