<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-05-26 13:42:25
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-12 13:30:19
 * @ Description: 终端列表 抽屉柜: TerType_001 | 单元柜: TerType_002 | 保险柜:TerType_003 | 冷藏阴凉柜: TerType_004 |
   @ Description: RFID柜: TerType_005 | 标准框柜: TerType_006
 -->

<template>
  <div class="ter-list">
    <div v-if="terListClone.length > 0" class="item-wrapper">
      <div
        v-for="(item, i) in terListClone"
        :key="item.iTerId"
        :class="['item', item.iTerId === activedTerId && item.iFull === 0 ? 'active-item' : '']"
        @click="applayerandLayout(item, i)"
      >
        <template v-if="item.group">
          <div
            v-for="(val, index) in item.group"
            :key="val.iTerId"
            :class="['inner-item', val.iTerId === activedTerId ? item.iFull === 1 ? 'active-item active-item-up' : item.iFull === 2 ? 'active-item active-item-down' : '' : '']"
            @click.stop="applayerandLayout(val, index)"
          >
            <span class="img">
              <!-- <img :src="require('@transboard/assets/images/terminal.png')" alt="logo"> -->
            </span>
          </div>
        </template>
        <template v-else>
          <span class="img">
            <!-- <img :src="require('@transboard/assets/images/terminal.png')" alt="logo"> -->
          </span>
        </template>
        <span class="ter-name" :title="item.sTerDesc" v-text="item.sTerDesc" />
      </div>
    </div>
    <div v-else class="item-wrapper-none">
      未维护终端设备信息，请先登录诺博统一管理平台进行维护或联系管理员
    </div>
  </div>
</template>

<script>
// 导入其他文件比如：组件/工具js/第三方插件js/json文件/图片等等import 《组件名称》 from '《组件路径》';

export default {
  name: 'TerList',
  components: {},
  props: {
    // 大小类型
    size: {
      type: String,
      default: 'normal'
    },
    // 终端列表数据
    terList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 选中
    activedTerId: {
      type: [Number, String],
      default: -1
    }
  },
  data() {
    return {
      terListClone: []
    }
  },
  computed: {

  },
  watch: {
    terList(val) {
      const terList = JSON.parse(JSON.stringify(val))
      // 对于半柜类型的数据 需要找到
      // iFull 0全柜 1上半柜 2下半柜
      // iRelation 组合中的另外一个半柜
      console.log(val)
      for (let i = 0; i < terList.length; i++) {
        // 建立在存在的前提条件下
        if (Number(terList[i].iFull) !== 0) {
          for (let j = i + 1; j < terList.length; j++) {
            // 为了区分上下 需要处理下
            if (Number(terList[i].iFull) === 1 && Number(terList[j].iFull) === 2 && terList[i].iRelation === terList[j].iTerId) {
              // iRelation与iTerId相等表示是同一组的
              terList[i].group = [JSON.parse(JSON.stringify(terList[i])), JSON.parse(JSON.stringify(terList[j]))]

              // 名称
              terList[i].sTerDesc = terList[i].sTerDesc + '/' + terList[j].sTerDesc

              // 每删除一个 整体数组长度减一 这是J需要自减一保证下次循环在正确的位置
              terList.splice(j, 1)
              j--
            }
          }
        }
      }

      this.terListClone = terList
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
    // 选中终端显示层和布局信息
    applayerandLayout(item) {
      this.$emit('clickList', item)
    }
  }
}
</script>

<style lang='scss' scoped>
  .ter-list {
    width: 228px;
    height: 100%;
    font-family: $font-family;
    padding-top: 70px;
    background: linear-gradient(270deg, rgba($back-color-gray, 1) 0%, rgba($back-color-gray, 0) 100%);
    // box-shadow: 0px 2px 4px 0px rgba($shadow-color, 0.5);
    opacity: 0.87;
    // border-radius: 0px 20px 20px 0px;
    z-index: 99;

    .item-wrapper {
      width: 100%;
      height: 100%;
      overflow: scroll;

      .item {
        color: $title-color;
        cursor: pointer;
        display: flex;
        text-align: center;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .img {
          width: 128px;
          background: #F7F8F8;
          border-radius: 8px;
          border: 1px solid $border-color;
          padding: 14px 30px 6px 30px;

          img {
            width: 68px;
            height: 163px;
          }
        }

        span.ter-name {
          margin-top: 20px;
          font-size: 24px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 80%;
          color: rgba($title-color, 0.8);
          font-family: $bold-font-family;
        }

        .inner-item {
          background: #F7F8F8;
          border: 1px solid $border-color;

          .img {
            border: none;
            padding: 0;

            img {
              height: 74px;
              padding: 10px 29px;
            }
          }
        }

        .inner-item:nth-child(1) {
          border-radius: 8px 8px 0px 0px;
        }

        .inner-item:nth-child(2) {
          border-radius: 0px 0px 8px 8px;
        }

        .inner-item + .inner-item {
          margin-top: 6px;
        }

        .active-item-up.inner-item {
          border: 6px solid $primary-color;
        }

        .active-item-down.inner-item {
          border: 6px solid $primary-color;
        }
      }

      .item + .item {
        margin-top: 75px;
      }

      .active-item {
        color: $primary-color;

        .img {
          border: 6px solid $primary-color;
        }

        span.ter-name {
          color: $primary-color;
        }
      }
    }

    .item-wrapper-none {
      color: $waring-text-color;
      font-size: 32px;
      width: 100%;
      font-family: $bold-font-family;
      text-align: center;
      line-height: 1.2;
    }
  }
</style>
