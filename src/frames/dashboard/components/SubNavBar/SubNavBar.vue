<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-06-28 09:10:11
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-09-15 14:01:06
 * @ Description: 模块标题栏目
 -->

<template>
  <div class="sub-nav-bar">
    <slot name="left">
      <div class="icon" @click="toSuperior">
        <svg-icon icon-class="back" />
        <span class="back">返回</span>
      </div>
    </slot>
    <slot name="middle">
      <div class="content">
        <div class="tabs">
          <div
            v-for="(item, i) in baseSrcInfos"
            :key="i"
            :class="['tab', activeTab === item.sSrcCode ? 'active-tab' : '']"
            @click="emitTab(item)"
          >
            <span v-text="item.sSrcName" />
          </div>
        </div>
      </div>
    </slot>
    <slot name="right">
      <div class="logout" @click="Logout">
        <svg-icon icon-class="logout-nav" />
        <span class="logout">退出</span>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'SubNavBar',
  components: {},
  props: {},
  data() {
    return {

    }
  },
  computed: {
    // 标题
    title() {
      return this.$store.getters['modules/getTitle']
    },
    // 选中的资源数据
    activeTab() {
      return this.$store.getters['modules/getSrcCode']
    },
    // 各个模块的tab分栏，根据资源信息显示tab分栏
    baseSrcInfos() {
      const baseSrcInfos = this.$store.getters['modules/getBaseSrcInfost'] || []
      const baseSrcInfo = baseSrcInfos.filter(v => Number(v.iType) === 2)

      return baseSrcInfo
    },
    // 是否可以切换tab
    isSwitchTab() {
      return this.$store.getters['modules/getSwitchTab']
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
    // 返回上一级
    toSuperior() {
      this.$router.go(-1)
    },
    // tab点击事件
    emitTab(item) {
      this.$store.commit('modules/SET_SCRCODE', item.sSrcCode)
    },
    // tab点击事件
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 退出
    Logout() {
      this.$store.commit('modules/SET_LOGOUT', {})
    }
  }
}
</script>

<style lang='scss' scoped>
  .sub-nav-bar {
    width: 100%;
    padding: 0 30px 0 28px;
    font-family: $font-family;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    position: relative;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2);
    background: $title-color;
    color: $text-color;

    .icon {
      cursor: pointer;
      display: flex;
      align-items: center;

      .svg-icon {
        color: $text-color;
        width: 46px;
        height: 46px;
      }

      .back {
        color: $text-color;
        margin-left: 2px;
        font-size: 32px;
        font-family: $bold-font-family;
      }
    }

    .sub-nav-title {
      font-size: 32px;
      color: $text-color;
      font-weight: 500;
      font-family: $bold-font-family;
    }

    .content {
      .tabs {
        display: flex;
        justify-content: center;
        border-radius: 24px;
        overflow: hidden;
        cursor: pointer;
        background: rgba($primary-color, 0.3);

        .tab {
          padding: 10px 44px;
          color: $text-color;
          font-size: 28px;
          white-space: nowrap;
          z-index: 9;

          span {
            font-family: $bold-font-family;
          }
        }

        .active-tab {
          background: $primary-color;
          border-radius: 24px;
        }
      }
    }

    .logout {
      cursor: pointer;
      display: flex;
      align-items: center;

      .svg-icon {
        color: $text-color;
        width: 46px;
        height: 46px;
      }

      span.logout {
        color: $text-color;
        margin-left: 2px;
        font-size: 32px;
        font-family: $bold-font-family;
      }
    }
  }
</style>
