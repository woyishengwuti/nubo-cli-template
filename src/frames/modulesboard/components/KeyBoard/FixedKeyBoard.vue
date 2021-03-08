<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-21 18:09:02
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-08-28 10:58:08
 * @ Description: 键盘
 -->

<template>
  <div class="key-board sub-font-family">
    <div class="keyboard" @click.stop="clickKey('')">
      <div
        v-for="(items, index) in keyList"
        :key="index"
        class="keyboard-wrapper"
      >
        <div
          v-for="(item, i) in items"
          :key="i"
          :class="{
            'fixed-keyboard': true,
            'fixed-keyboard-default': type === 'default',
            'fixed-keyboard-mini': type === 'mini',
            delete: item.key === 'Delete',
            space: item.key === 'Space',
            disabled: disabledKey.includes(item.key) || disabledKey.includes(item.key.toLowerCase())
          }"
          :data-value="item.key"
          @click.stop="clickKey(item.key)"
        >
          <span v-if="item.key === 'Shift'" :data-value="item.key">
            <svg-icon icon-class="shift" />
          </span>
          <span :data-value="item.key" class="text" v-text="item.value" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入其他文件比如：组件/工具js/第三方插件js/json文件/图片等等import 《组件名称》 from '《组件路径》';

export default {
  name: 'FixedKeyBoard',
  components: {},
  props: {
    // 不能点击的键
    disabledKey: {
      type: Array,
      default: () => {
        return []
      }
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      keyList: [],
      normalKeyList: [],
      numKeyList: [], // 数字键
      shiftedKeyList: [],
      capsedKeyList: [],
      hasShifted: false,
      hasCapsed: false
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    const normalKeyList = [
      [
        { key: 'a', value: 'A' },
        { key: 'b', value: 'B' },
        { key: 'c', value: 'C' },
        { key: 'd', value: 'D' },
        { key: 'e', value: 'E' }
      ],
      [
        { key: 'f', value: 'F' },
        { key: 'g', value: 'G' },
        { key: 'h', value: 'H' },
        { key: 'i', value: 'I' },
        { key: 'j', value: 'J' }
      ],
      [
        { key: 'k', value: 'K' },
        { key: 'l', value: 'L' },
        { key: 'm', value: 'M' },
        { key: 'n', value: 'N' },
        { key: 'o', value: 'O' }
      ],
      [
        { key: 'p', value: 'P' },
        { key: 'q', value: 'Q' },
        { key: 'r', value: 'R' },
        { key: 's', value: 'S' },
        { key: 't', value: 'T' }
      ],
      [
        { key: 'u', value: 'U' },
        { key: 'v', value: 'V' },
        { key: 'w', value: 'W' },
        { key: 'x', value: 'X' },
        { key: 'y', value: 'Y' }
      ],
      [
        { key: 'z', value: 'Z' },
        { key: 'Space', value: '空格' },
        { key: 'Delete', value: '回删' }
      ]
    ]

    this.keyList = this.normalKeyList = normalKeyList
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    clickKey(key) {
      this.$emit('handleClick', key.toLocaleUpperCase())
    }
  }
}
</script>

<style lang="scss" scoped>
.key-board {
  width: 100%;
  margin: 0;
  height: 100%;
  list-style: none;
  user-select: none;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  z-index: 999999999;
  font-family: $reg-font-family;

  .keyboard-wrapper {
    display: flex;
    white-space: nowrap;

    .fixed-keyboard {
      display: inline-block;
      line-height: 108px;
      font-size: 48px;
      text-align: center;
      background: #F4F9FC;
      border: 1px solid $border-color;
      border-radius: 6px;
      white-space: nowrap;
      box-sizing: border-box;
      z-index: 99;
      cursor: pointer;

      .text {
        font-family: $reg-font-family;
      }

      &:hover {
        position: relative;
        background: $primary-color;
        color: $text-color;
        border: 1px solid $primary-color;
      }
    }

    .fixed-keyboard-default {
      width: 100px;
      height: 108px;
    }

    .fixed-keyboard-mini {
      width: 100px;
      height: 100px;
    }

    .fixed-keyboard + .fixed-keyboard {
      margin-left: 10px;
    }

    .delete, .space {
      width: 210px;
      font-size: 36px;
      font-family: $bold-font-family;
    }
  }

  .keyboard-wrapper + .keyboard-wrapper {
    margin-top: 10px;
  }
}
</style>
