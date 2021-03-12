<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-07-09 15:29:06
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-12 13:30:02
 * @ Description: 门锁提示
 -->

<template>
  <el-dialog
    class="unlock-ter-dialog custom-dialog-middle"
    :visible.sync="UnlockTimeVisible"
    top="calc(60vh / 10.8)"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="calc(1000% / 19.2)"
    :before-close="handleClose"
  >
    <div class="wrapper">
      <div class="tips">请关闭柜门/抽屉 !</div>
      <div v-if="UnlockTimeTer.length > 0" class="item-wrapper">
        <div
          v-for="(item) in UnlockTimeTer"
          :key="item.iTerId"
          class="item"
        >
          <template>
            <span class="img">
              <!-- <img :src="require('@modules2board/assets/images/terminal.png')" alt="logo"> -->
            </span>
          </template>
          <span class="ter-name" :title="item.sTerDesc" v-text="item.sTerDesc" />
          <div class="layer">{{ unlockLayer(item) }}</div>
        </div>
      </div>
    </div>
    <div slot="footer" class="footer">
      <div class="cancel" @click="handleClose" v-text="$t('general.notips')">不在提醒</div>
    </div>
  </el-dialog>
</template>

<script>
// 导入其他文件比如：组件/工具js/第三方插件js/json文件/图片等等import 《组件名称》 from '《组件路径》';

export default {
  name: 'UnlockTer',
  components: {},
  props: {

  },
  data() {
    return {
      UnlockTimeVisible: false,
      UnlockTimeTer: []
    }
  },
  computed: {
    // 未关闭锁
    unLockedLayer() {
      return this.$store.state.modules.unLockedLayer
    },
    // 层信息
    layers() {
      return this.$store.state.core.layers
    }

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
    // 显示几层未关闭
    unlockLayer(item) {
      console.log(item)
      // 终端id
      const iTerId = item.iTerId

      // 此终端对应的层信息
      const layer = this.layers.filter(v => v.iTerId === iTerId)

      // 找出其中未关闭的层信息
      return layer.reduce((t, v) => {
        return this.unLockedLayer.includes(v.sPostalAddress) ? t + '、' + v.iFloorIndex + '层' : t
      }, '')
    },
    // 关闭前的回调
    handleClose(done) {
      this.UnlockTimeVisible = false
      this.UnlockTimeTer = []
    }
  }
}
</script>

<style lang='scss' scoped>
  .unlock-ter-dialog {
    /deep/ .el-dialog {
      // .el-dialog__header {
      //   display: none;
      // }

      .el-dialog__body {
        // width: 100%;
        // height: 380px;
        position: relative;
        font-family: $font-family;

        .wrapper {
          padding: 0 70px;

          .tips {
            width: 100%;
            text-align: center;
            font-size: 52px;
            font-family: $bold-font-family;
            color: $waring-text-color;
          }

          .item-wrapper {
            width: 100%;
            overflow: scroll;
            display: flex;
            justify-content: flex-start;
            margin-top: 86px;

            .item {
              width: 100px;
              color: $title-color;
              cursor: pointer;
              display: flex;
              text-align: center;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              .inner-item {
                span.img {
                  height: 158px;
                  padding: 10px 29px;
                }
              }

              .inner-item  + .inner-item {
                margin-top: 6px;
              }

              span.img {
                width: 100%;
                height: 142px;
                padding: 11px 23px 5px 23px;
                background: #F7F8F8;
                // box-shadow: 0px 2px 4px 0px rgba($shadow-color, 0.5);
                border-radius: 9px;
                border: 1px solid $border-color;
                display: inline-block;

                img {
                  width: 100%;
                  height: 100%;
                }
              }

              span.ter-name {
                margin-top: 30px;
                font-size: 32px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                width: 100%;
                color: $title-color;
              }

              div.layer {
                width: 150%;
                margin-top: 14px;
                font-size: 24px;
                color: rgba($title-color, 0.8);
              }
            }

            .item + .item {
              margin-left: 110px;
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
