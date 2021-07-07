<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-21 18:09:02
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-10-26 10:01:16
 * @ Description: 键盘
 -->

<template>
  <div v-if="showKeyBoard" class="key-board sub-font-family">
    <div class="keyboard letter-block-keyboard" @click.stop="clickKey('')">
      <div
        v-for="(items, index) in keyList"
        :key="index"
        class="keyboard-wrapper"
      >
        <div
          v-for="(item, i) in items"
          :key="i"
          :class="{
            'keyboard-item': true,
            slash: item.key === '/',
            tab: item.key === 'Tab',
            capslock: item.key === 'Caps',
            shift: item.key === 'Shift',
            space: item.key === 'Space',
            shifted: item.key === 'Shift' && hasShifted,
            capsed: item.key === 'Caps' && hasCapsed,
          }"
          :data-value="item.key"
          @click.stop="clickKey(item.key)"
        >
          <span v-if="item.key === 'Shift'" :data-value="item.key">
            <svg-icon class-name="keyboard-shift" icon-class="keyboard-shift" />
            <svg-icon class-name="keyboard-shift-over" icon-class="keyboard-shift-over" />
          </span>
          <span :data-value="item.key" class="text" v-text="item.value" />
        </div>
      </div>
    </div>
    <div class="keyboard digital-block-keyboard" @click.stop="clickKey('')">
      <div
        v-for="(items, index) in numKeyList"
        :key="index"
        :class="['keyboard-wrapper', 'keyboard-wrapper' + index]"
      >
        <div
          v-for="(item, i) in items"
          :key="i"
          :class="{
            'keyboard-item': true,
            delete: item.key === 'Delete',
            enter: item.key === 'Enter',
            zero: item.key === '0'
          }"
          :data-value="item.key"
          @click.stop="clickKey(item.key)"
        >
          <span v-if="item.key === 'Delete'">
            <svg-icon :data-value="item.key" class-name="keyboard-delete" icon-class="keyboard-delete" />
            <svg-icon :data-value="item.key" class-name="keyboard-delete-over" icon-class="keyboard-delete-over" />
          </span>
          <span :data-value="item.key" class="text" v-text="item.value" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeyBoard',
  components: {},
  props: {
    showKeyBoard: {
      type: Boolean,
      default: false
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
        { key: 'Tab', value: 'Tab' },
        { key: 'q', value: 'q' },
        { key: 'w', value: 'w' },
        { key: 'e', value: 'e' },
        { key: 'r', value: 'r' },
        { key: 't', value: 't' },
        { key: 'y', value: 'y' },
        { key: 'u', value: 'u' },
        { key: 'i', value: 'i' },
        { key: 'o', value: 'o' },
        { key: 'p', value: 'p' },
        { key: '*', value: '*' }
      ],
      [
        { key: 'Caps', value: 'Caps' },
        { key: 'a', value: 'a' },
        { key: 's', value: 's' },
        { key: 'd', value: 'd' },
        { key: 'f', value: 'f' },
        { key: 'g', value: 'g' },
        { key: 'h', value: 'h' },
        { key: 'j', value: 'j' },
        { key: 'k', value: 'k' },
        { key: 'l', value: 'l' },
        { key: '/', value: '/' }
      ],
      [
        { key: 'Shift', value: '大写' },
        { key: 'z', value: 'z' },
        { key: 'x', value: 'x' },
        { key: 'c', value: 'c' },
        { key: 'v', value: 'v' },
        { key: 'b', value: 'b' },
        { key: 'n', value: 'n' },
        { key: 'm', value: 'm' },
        { key: 'Space', value: '空格' }
      ]
    ]
    const shiftedKeyList = [
      [
        { key: 'Tab', value: 'Tab' },
        { key: 'q', value: 'Q' },
        { key: 'w', value: 'W' },
        { key: 'e', value: 'E' },
        { key: 'r', value: 'R' },
        { key: 't', value: 'T' },
        { key: 'y', value: 'Y' },
        { key: 'u', value: 'U' },
        { key: 'i', value: 'I' },
        { key: 'o', value: 'O' },
        { key: 'p', value: 'P' },
        { key: '*', value: '*' }
      ],
      [
        { key: 'Caps', value: 'Caps' },
        { key: 'a', value: 'A' },
        { key: 's', value: 'S' },
        { key: 'd', value: 'D' },
        { key: 'f', value: 'F' },
        { key: 'g', value: 'G' },
        { key: 'h', value: 'H' },
        { key: 'j', value: 'J' },
        { key: 'k', value: 'K' },
        { key: 'l', value: 'L' },
        { key: '/', value: '/' }
      ],
      [
        { key: 'Shift', value: '大写' },
        { key: 'z', value: 'Z' },
        { key: 'x', value: 'X' },
        { key: 'c', value: 'C' },
        { key: 'v', value: 'V' },
        { key: 'b', value: 'B' },
        { key: 'n', value: 'N' },
        { key: 'm', value: 'M' },
        { key: 'Space', value: '空格' }
      ]
    ]
    const capsedKeyList = [
      [
        { key: 'Tab', value: 'Tab' },
        { key: 'q', value: 'Q' },
        { key: 'w', value: 'W' },
        { key: 'e', value: 'E' },
        { key: 'r', value: 'R' },
        { key: 't', value: 'T' },
        { key: 'y', value: 'Y' },
        { key: 'u', value: 'U' },
        { key: 'i', value: 'I' },
        { key: 'o', value: 'O' },
        { key: 'p', value: 'P' },
        { key: '*', value: '*' }
      ],
      [
        { key: 'Caps', value: 'Caps' },
        { key: 'a', value: 'A' },
        { key: 's', value: 'S' },
        { key: 'd', value: 'D' },
        { key: 'f', value: 'F' },
        { key: 'g', value: 'G' },
        { key: 'h', value: 'H' },
        { key: 'j', value: 'J' },
        { key: 'k', value: 'K' },
        { key: 'l', value: 'L' },
        { key: '/', value: '/' }
      ],
      [
        { key: 'Shift', value: '大写' },
        { key: 'z', value: 'Z' },
        { key: 'x', value: 'X' },
        { key: 'c', value: 'C' },
        { key: 'v', value: 'V' },
        { key: 'b', value: 'B' },
        { key: 'n', value: 'N' },
        { key: 'm', value: 'M' },
        { key: 'Space', value: '空格' }
      ]
    ]

    const numKeyList = [
      [
        { key: '0', value: '0' },
        { key: 'point', value: '.' }
      ],
      [
        { key: '1', value: '1' },
        { key: '2', value: '2' },
        { key: '3', value: '3' },

        { key: '4', value: '4' },
        { key: '5', value: '5' },
        { key: '6', value: '6' },

        { key: '7', value: '7' },
        { key: '8', value: '8' },
        { key: '9', value: '9' }
      ],
      [
        { key: 'Delete', value: '删除' },
        { key: 'Enter', value: '确定' }
      ]
    ]

    this.keyList = this.normalKeyList = normalKeyList
    this.shiftedKeyList = shiftedKeyList
    this.capsedKeyList = capsedKeyList
    this.numKeyList = numKeyList
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    clickKey(key) {
      switch (key) {
        case 'Caps':
          this.hasCapsed = !this.hasCapsed
          this.keyList = this.hasCapsed ? this.capsedKeyList : this.normalKeyList
          break
        case 'Shift':
          this.hasShifted = !this.hasShifted
          this.keyList = this.hasShifted ? this.shiftedKeyList : this.normalKeyList
          break
        default:
          this.$emit('handleClick', key)
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.key-board {
  width: 100%;
  margin: 0;
  padding: 40px;
  height: 366px;
  list-style: none;
  user-select: none;
  position: fixed;
  bottom: 0;
  right: 0;
  background: rgba($title-color, 1);
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  z-index: 999999999;

  .keyboard + .keyboard {
    margin-left: 82px;
  }

  .keyboard-wrapper {
    z-index: 98;

    .keyboard-item {
      display: inline-block;
      width: 82px;
      height: 82px;
      line-height: 82px;
      font-size: 36px;
      text-align: center;
      background: $back-color;
      border: 1px solid $border-color;
      border-radius: 8px;
      white-space: nowrap;
      box-sizing: border-box;
      z-index: 99;
      cursor: pointer;

      &:hover {
        position: relative;
        background: $primary-color;
        color: $text-color;
        border: 1px solid $primary-color;

        .keyboard-shift-over, .keyboard-delete-over {
          display: inline-block!important;
        }

        .keyboard-shift, .keyboard-delete {
          display: none;
        }
      }

      span {
        font-family: $reg-font-family, $bold-font-family;
      }
    }
  }

  .letter-block-keyboard {
    width: calc(71% - 82px);

    .keyboard-wrapper {
      width: 100%;
      display: flex;
      justify-content: space-around;

      .keyboard-item + .keyboard-item {
        margin-left: 20px;
      }

      .tab {
        width: 102px;
      }

      .capslock, .capsed, .slash {
        width: 153px;
      }

      .shift, .space {
        font-size: 32px;
      }

      .shift {
        width: 204px;

        .keyboard-shift {
          color: $title-color;
        }

        .keyboard-shift-over {
          display: none;
        }

        .text {
          margin-left: 8px;
        }
      }

      .space {
        // padding: 25px 99px;
        width: 261px;
        margin: 0;
      }
    }

    .keyboard-wrapper + .keyboard-wrapper {
      margin-top: 20px;
    }
  }

  .digital-block-keyboard {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 31%;

    .keyboard-wrapper0
    , .keyboard-wrapper2 {
      display: flex;
      flex-direction: column;

      .keyboard-item + .keyboard-item {
        margin-top: 20px;
      }
    }

    .keyboard-wrapper1 {
      padding: 0 20px;
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 82px 82px 82px;
      grid-template-rows: 82px 82px 82px;
      grid-row-gap: 20px;
      grid-column-gap: 20px;

      .keyboard-item {
        // margin: 0 20px 20px 0;
      }

      .keyboard-item:nth-child(3n) {
        margin-right: 0;
      }
    }

    .zero {
      height: 184px;
      line-height: 184px;
    }

    .delete {
      font-size: 32px;
      width: 150px;

      .keyboard-delete {
        color: $title-color;
      }

      .keyboard-delete-over {
        display: none;
      }

      .text {
        margin-left: 8px;
      }
    }

    .enter {
      width: 150px;
      height: 184px;
      line-height: 184px;
      font-size: 32px;
      float: right;
    }
  }
}
</style>
