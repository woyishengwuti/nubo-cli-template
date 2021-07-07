<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-22 09:27:21
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-07-14 11:19:52
 * @ Description: 关机重启
 -->

<template>
  <el-dialog
    :title="$t('ireveLogin.tel')"
    :visible.sync="dialogVisible"
    top="calc(200vh / 10.8)"
    width="calc(640% / 19.2)"
    :close-on-click-modal="false"
    :show-close="false"
    :close-on-press-escape="false"
    class="contact-phone custom-dialog-mini"
  >
    <div class="container">
      <ul>
        <li
          v-for="(item, i) in userPhone"
          :key="i"
        >
          <p class="name">{{ item.name }}</p>
          <p class="tel">{{ item.code }}</p>
        </li>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer" @click="dialogVisible = false">
      <span v-text="$t('ireveLogin.ikonw')">知道了</span>
    </span>
  </el-dialog>
</template>

<script>
// 导入其他文件比如：组件/工具js/第三方插件js/json文件/图片等等import 《组件名称》 from '《组件路径》';

export default {
  name: 'ContactPhone',
  components: {},
  props: {
    userPhone: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
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

  }
}
</script>

<style lang='scss' scoped>
  .contact-phone {
    font-family: $font-family;
    border-radius: 16px;

    /deep/ .el-dialog {
      .el-dialog__header {
        text-align: center;
        padding: 36px 60px;

        .el-dialog__title {
          font-size: 36px;
          color: $logo-text-color;
          font-family: $bold-font-family;
        }
      }

      .el-dialog__body {
        height: calc(100% - 200px);
        overflow: scroll;
        padding-top: 15px;

        .container {
          width: 100%;
          // height: 100%;
          overflow: scroll;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;

          ul {
            li {
              font-size: 28px;

              .name {
                display: inline-block;
                width: 50%;
                color: rgba($title-color, 0.6);
                text-align: right;
              }

              .tel {
                display: inline-block;
                color: $title-color;
                font-family: $reg-font-family;
                margin-left: 20px;
                font-weight: 400;
                font-size: 30px;
              }
            }

            li + li {
              margin-top: 25px;
            }
          }

        }
        .container::-webkit-scrollbar{
          display: none;
        }
      }

      .el-dialog__footer {
        padding: 0;
        height: 100px;
        line-height: 100px;
        color: $primary-color;
        text-align: center;
        font-size: 36px;
        border-top: 1px solid $border-color;
        cursor: pointer;

        .dialog-footer {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
