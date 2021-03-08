<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-05-26 13:42:25
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-09-29 10:19:58
 * @ Description: 终端层数据
 -->

<template>
  <div class="ter-layer">
    <div v-if="layer.length > 0" class="ter-layer-wrapper">
      <div
        v-for="(item, i) in layer"
        :key="item.iFloorId"
        :class="['layer', activedFloorId === item.iFloorId ? 'active-layer' : '']"
        :style="{ height: (100 / layer.length) + '%', lineHeight: (100 / layer.length) + '%' }"
        @click="appLayout(item, i)"
      >
        <div v-if="item.iFloorId !== 'whole'" class="layer-box">
          <span class="num sub-font-family" v-text="item.iFloorIndex" />
          <span class="text">层</span>
          <span v-auto="item.iSingleType" class="icon-auto" style="display: none">
            <svg-icon icon-class="auto-ter" />
          </span>
          <span v-auto="item.sTypeCode === 'TerType_004'" class="icon-auto" style="display: none">
            <svg-icon icon-class="cold-storage" />
          </span>
          <span v-auto="item.sTypeCode === 'TerType_006'" class="icon-auto" style="display: none">
            <svg-icon icon-class="normal" />
          </span>
        </div>
        <div v-else class="layer-box">
          <span class="whole">整柜</span>
        </div>
        <div v-if="!unLockedLayer.includes(item.sPostalAddress) && item.iFloorId !== 'whole'" class="locked" />
        <svg-icon
          v-if="!unLockedLayer.includes(item.sPostalAddress) && item.iFloorId !== 'whole'"
          icon-class="locked"
          class-name="icon-locked"
        />
      </div>
    </div>
    <div class="ter-layer-none">
      <!-- 未维护终端层信息，请先登录诺博统一管理平台进行维护或联系管理员 -->
    </div>
  </div>
</template>

<script>
// 导入其他文件比如：组件/工具js/第三方插件js/json文件/图片等等import 《组件名称》 from '《组件路径》';

export default {
  name: 'TerLayer',
  components: {},
  props: {
    // 大小类型
    size: {
      type: String,
      default: 'normal'
    },
    // 终端层数据
    layer: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 选中
    activedFloorId: {
      type: [Number, String],
      default: -1
    }
  },
  data() {
    return {

    }
  },
  computed: {
    // 未关闭锁
    unLockedLayer() {
      return this.$store.state.modules.unLockedLayer
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
    // 选中终端显示层和布局信息
    appLayout(item) {
      this.$emit('clickLayer', item)
    }
  }
}
</script>

<style lang='scss' scoped>
.ter-layer {
  width: 100%;
  height: 100%;
  overflow: scroll;
  background: linear-gradient(270deg, rgba($back-color-gray, 1) 0%, rgba($back-color-gray, 0) 100%);
  // box-shadow: 0px 2px 4px 0px rgba($shadow-color, 0.5);
  opacity: 0.87;
  font-family: $font-family;
  border-radius: 18px 0 0 18px;

  .ter-layer-wrapper {
    height: 100%;

    .layer {
      width: 100%;
      text-align: center;
      cursor: pointer;
      background: $back-color;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      border-right: 2px solid $primary-color;

      .layer-box {
        display: flex;
        justify-content: center;
        align-items: baseline;

        .num {
          color: $primary-color;
          font-size: 52px;
          font-family: $reg-font-family;
          margin-left: 4px;
        }

        .text {
          font-size: 24px;
          color: rgba($title-color, 0.8);
          margin-left: 4px;
        }

        .icon-auto {
          display: inline-block;
          margin-left: 4px;

          .svg-icon {
            color: $correct-text-color;
            width: 32px;
            height: 34px;
            margin-bottom: -2px;
          }
        }

        .whole {
          color: $primary-color;
          font-size: 36px;
          font-family: $font-family;
        }
      }

      .locked {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 0;
				height: 0;
				border: 21px solid rgba($primary-color, 0.7);
				border-left-color: transparent;
        border-top-color: transparent;
      }

      .icon-locked {
        position: absolute;
        right: 4px;
        bottom: 4px;
        width: 18px;
        height: 18px;
        color: $text-color;
      }
    }

    .active-layer {
      background: $primary-color;
      color: $text-color;
      border-right: none;

      .layer-box {
        .num, .text, .whole {
          color: $text-color;
        }

        .icon-auto {
          .svg-icon {
            color: $text-color;
          }
        }
      }

      .locaked {
        border: 28px solid rgba($back-color, 0.7);
        border-left-color: transparent;
        border-top-color: transparent;
      }

      .svg-icon {
        color: $primary-color;
      }
    }

    .active-layer::before {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border: 13px solid rgba($light-bg-color, 1);
      border-left-color: transparent;
      border-top-color: transparent;
      border-bottom-color: transparent;
      z-index: 99;
    }

    .layer + .layer {
      border-top: 1px solid #E9ECED;
    }
  }

  .ter-layer-none {
    color: $waring-text-color;
    font-size: 32px;
    width: 100%;
    font-family: $bold-font-family;
    text-align: center;
    line-height: 1.2;
  }
}
</style>
