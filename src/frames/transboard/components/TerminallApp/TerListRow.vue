<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-05-26 13:42:25
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-12 13:30:24
 * @ Description: 终端列表
 -->

<template>
  <div class="ter-list-row">
    <template v-if="terListClone.length > 0" class="item-wrapper">
      <div
        v-for="(item, i) in terListClone"
        :key="item.iTerId"
        class="item"
        @click="applayerandLayout(item, i)"
      >
        <template v-if="item.group">
          <div
            v-for="(val, index) in item.group"
            :key="val.iTerId"
            class="inner-item"
            @click.stop="applayerandLayout(item, index)"
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
    </template>
    <div v-else class="item-wrapper-none">
      未维护终端设备信息，请先登录诺博统一管理平台进行维护或联系管理员
    </div>
  </div>
</template>

<script>
// 导入其他文件比如：组件/工具js/第三方插件js/json文件/图片等等import 《组件名称》 from '《组件路径》';

export default {
  name: 'TerListRow',
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
      console.log('整合数据之后', terList)
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
  .ter-list-row {
    // width: 1000%;
    height: 100%;
    font-family: $font-family;
    position: relative;
    background: linear-gradient(90deg, rgba($back-color, 0) 0%, rgba($back-color, 1) 100%);
    // box-shadow: 0px 2px 4px 0px rgba($shadow-color, 0.5);
    display: flex;
    justify-content: flex-start;

    .item {
      width: 222px;
      color: $title-color;
      cursor: pointer;
      display: flex;
      text-align: center;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;

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
        height: 316px;
        padding: 10px 29px;
        background: $back-color-gray;
        box-shadow: 0px 2px 4px 0px rgba($shadow-color, 0.5);
        border-radius: 8px;
        border: 2px solid $border-color;
        display: inline-block;

        img {
          width: 100%;
          height: 100%;
        }
      }

      span.ter-name {
        margin-top: 30px;
        font-size: 36px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        color: $title-color;
        font-family: $bold-font-family;
      }
    }

    .item + .item {
      margin-left: 80px;
    }

    .active-item {
      color: $primary-color;
    }

    .item-wrapper-none {
      color: $waring-text-color;
      font-size: 32px;
      width: 100%;
      font-family: $bold-font-family;
      text-align: center;
    }
  }
</style>
