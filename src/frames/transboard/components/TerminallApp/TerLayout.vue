<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-26 15:42:55
 * @ Modified by: feixiang.wu
 * @ Modified time: 2021-03-12 13:30:14
 * @ Description: 终端层内部布局信息
 -->

<template>
  <div class="ter-layout-wrapper">
    <div
      v-if="layout.length > 0"
      :style="{ height: Math.floor(iFloorH / 3) === 0 ? '100%' : Math.floor(iFloorH / 3) * 100 + '%' }"
      :class="['ter-layout', type === 3 || type === 3.1 ? 'ter-layout-3' : '', iFloorH >= 4 && iFloorH <= 6 ? 'ter-layout-row' : '']"
    >
      <div
        v-for="(val, q) in iFloorH"
        :key="q"
        :style="styleObjHeight"
        class="ter-layout-line"
      >
        <template v-for="(item) in layout.slice(q * iFloorW, q * iFloorW + iFloorW)">
          <!-- iDismounted 0:非拆零格|1:拆零格 -->
          <div
            v-if="item.iDismounted === 0"
            :key="item.iCellId"
            :class="['layout',
                     activedIndex === item.iCellId ? 'active-layout' : '',
                     isGrayscale(item) ? 'grayscale' : '',
                     item.notEqual ? 'not-equal': '',
                     isCalibration(item) ? 'calibration' : '',
                     isDemarcation(item) ? 'demarcation' : '']"
            :style="styleObjWidth"
            @click="clickLayout(item)"
          >
            <div v-if="type !== 5 || (type === 5 && isDemarcation(item))" class="location num sub-font-family" v-text="item.sCellCode" />
            <div v-if="type === 5 && !isDemarcation(item)" class="demarcation-location num" v-text="item.sCellCode" />
            <!-- 药品信息 - 标定不需要显示 -->
            <div v-if="isShowItemInfo(item)" :class="['has', type === 4 && item.isM ? 'stock-count' : '']">
              <div
                v-for="(v, index) in item.stocInfoList"
                :key="index"
                class="drug"
              >
                <div class="number item">
                  <div class="left">
                    <span v-if="Number(v.iUniType) === 2" class="text mixed">混</span>
                    <span v-if="getControlStyle(0, item.iControlStyle)" class="text empty">空</span>
                  </div>
                  <div class="right">
                    <template v-for="(icon, m) in v.signIcons">
                      <span :key="m">
                        <img :src="base64Map ? base64Map.get(icon) : ''" class="icon" alt="">
                      </span>
                    </template>
                    <span v-if="Number(v.expireMonth) === 3">
                      <!-- <img :src="'./staticImg/' + Number(v.expireMonth) + '.png'" class="icon" alt=""> -->
                    </span>
                    <span v-if="Number(v.expireMonth) === 6">
                      <!-- <img :src="'./staticImg/' + Number(v.expireMonth) + '.png'" class="icon" alt=""> -->
                    </span>
                  </div>
                </div>
                <div class="goods item">
                  <span
                    :class="[
                      'text',
                      v.sDrugName && v.sDrugName.length > 14 ? 'text-26' : '']"
                    v-text="v.sDrugName"
                  />
                </div>
                <div class="specifications item">
                  <span class="text" v-text="v.sSpecs" />
                </div>
                <div class="left-bottom">
                  <!-- 管控显示上限和重量 -->
                  <div v-if="type === 0" class="limit item">
                    <div class="limit">
                      <span class="num">存放上限</span>
                      <span class="text" v-html="mergeStockInfo(item, v, 'iLimit')" />
                    </div>
                    <!-- <div class="store">
                      <span class="num">库存</span>
                      <span class="stock-wrapper" v-html="mergeStockInfo(item, v, 'iStocQuant')" />
                    </div> -->
                  </div>
                  <div v-if="type === 0" class="weight item">
                    <div class="weight">
                      <span class="text">标准重量</span>
                      <span class="num">{{ v.fMaxWeight }}g/{{ v.fMinWeight }}g</span>
                    </div>
                    <div v-if="!getControlStyle(0, item.iControlStyle)" class="packages">
                      <span class="text">包装数</span>
                      <span class="num" v-text="v.iPackageNum" />
                    </div>
                  </div>
                  <div class="stock-limit-wrapper">
                    <!-- 出入库显示库存和批号 -->
                    <div v-if="type === 3 || type === 3.1" class="item">
                      <div class="store">
                        <span class="desc">库存</span>
                        <span class="stock-wrapper" v-html="mergeStockInfo(item, v, 'iStocQuant')" />
                      </div>
                    </div>
                    <!-- 入库显示基数和批号 -->
                    <div v-if="type === 3.1" class="item">
                      <div class="store">
                        <span class="desc">基数</span>
                        <span class="stock-wrapper" v-html="mergeStockInfo(item, v, 'iUpper')" />
                      </div>
                    </div>
                  </div>
                  <!-- type 4 显示帐盘实盘信息 -->
                  <div class="account-wrapper">
                    <div v-if="type === 4" class="limit item account">
                      <div class="store">
                        <span class="text">帐盘</span>
                        <span class="stock-wrapper" v-html="mergeStockInfo(item, v, 'iAccount')" />
                      </div>
                    </div>
                    <div v-if="type === 4" class="limit item actual">
                      <div class="store">
                        <span class="text">实盘</span>
                        <span class="stock-wrapper" v-html="mergeStockInfo(item, v, 'iActual')" />
                      </div>
                    </div>
                  </div>
                  <div v-if="(type === 3 || type === 3.1 || type === 4) && v.stocInfoList && v.stocInfoList.length > 0" class="weight item batch">
                    <div v-for="(t, x) in v.stocInfoList" :key="x" class="batch">
                      <template v-if="String(params.get('DisEmptyBatch')) === '1'">
                        <!-- 显示空批号 -->
                        <span class="text">批号</span>
                        <span class="num">{{ t.sBatch }} ({{ t.dExpiry }})</span>
                      </template>
                      <template v-else>
                        <span class="text">批号</span>
                        <span v-if="t.sBatch" class="num">{{ t.sBatch }} ({{ t.dExpiry }})</span>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 没有维护药品并且是正常药盒 -->
            <div v-if="isShowAdd(item)" class="none">
              <svg-icon icon-class="add" />
              <span>添加</span>
            </div>
            <!-- 标定模块 -->
            <div v-if="type === 5" class="none demarcation">
              <svg-icon icon-class="demarcation-box" />
              <span>{{ isDemarcation ? '重新标定' : '标定' }}</span>
            </div>
            <!-- 退损单元无药品信息 -->
            <div v-if="isShowDestoryBack(item) " class="destory-back">
              <span class="title">退损单元</span>
              <span class="desc">仅限于破损的药品退药使用</span>
            </div>
            <!-- 退损单元无药品信息 -->
            <div v-if="isShowDestoryEmpty(item) " class="destory-empty">
              <span class="title">退药单元</span>
              <span class="desc">仅限于未使用过的药瓶退药使用</span>
            </div>
            <!-- 药品管控的蒙层 -->
            <div v-if="activedIndex === item.iCellId && type === 0" class="mask" @click.stop="disAppMask">
              <template v-if="getControlStyle(3, item.iControlStyle) || getControlStyle(4, item.iControlStyle)">
                <div class="icon-wrapper">
                  <div class="delete" @click.stop="Delete(item, 1)">
                    <svg-icon icon-class="delete1" />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="icon-wrapper">
                  <div class="refresh" @click.stop="Refresh(item)">
                    <svg-icon icon-class="refresh" />
                  </div>
                  <div class="delete" @click.stop="Delete(item)">
                    <svg-icon icon-class="delete1" />
                  </div>
                  <div class="modify" @click.stop="Modify(item)">
                    <svg-icon icon-class="editor" />
                  </div>
                </div>
              </template>
            </div>
            <!-- 校准的蒙层 -->
            <div v-if="activedIndex === item.iCellId && type === 1" class="mask mask-cali" @click.stop="disAppMask">
              <div class="icon-wrapper">
                <div class="larger-unit" @click.stop="clickUnit(item, 1)">
                  <span>大包装</span>
                </div>
                <div class="small-unit" @click.stop="clickUnit(item, 2)">
                  <span>小包装</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 整层显示的所有药格信息 -->
          <div
            v-if="(type === 3 || type === 3.1) && item.isWhole"
            :key="item.iCellId"
            class="layout layout-whole"
          >
            <div class="wrapper">
              <div v-if="item.terCellInfoList && item.terCellInfoList.length > 0" class="layer">
                <span class="num sub-font-family" v-text="item.iFloorIndex" />
                <span class="text">层</span>
              </div>
              <div class="content">
                <div
                  v-for="(v, index) in item.terCellInfoList"
                  :key="index"
                  :class="['layout-box', activedBoxIndex === v.iCellId + '-' + index ? 'active-layout-box' : '']"
                  @click="clickLayout(v, v.iCellId + '-' + index)"
                >
                  <template
                    v-for="(value, t) in v.stocInfoList"
                  >
                    <span :key="t" class="text" v-text="value.sDrugName" />
                  </template>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- 啥也没有的提示 -->
    <div v-if="layout.length === 0" class="ter-layout-none">
      <empty-template ref="EmptyTemplate" :info="layout">
        <template v-slot:icon>
          <div class="icon">
            <svg-icon icon-class="empty_layout" />
          </div>
        </template>
        <template v-slot:text>
          <div class="text">柜子未管控，请联系管理员哦~</div>
        </template>
      </empty-template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TerLayout',
  components: {},
  props: {
    // 布局数据
    layout: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 类型 区分在哪个模块
    // 0：管控 1校准 2TH 3出库 3.1入库 4盘点 5 标定
    type: {
      type: Number,
      default: 0
    },
    // 列
    iFloorW: {
      type: Number,
      default: 4
    },
    // 行
    iFloorH: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      activedIndex: -1, // 点击的格子
      activedBoxIndex: -1
    }
  },
  computed: {
    // 药盒样式信息
    styleObjWidth() {
      return {
        width: `calc(((100% - 14px * (${this.iFloorW - 1})) / ${this.iFloorW}))`
      }
    },
    styleObjHeight() {
      return {
        height: `calc(((100% - 14px * (${this.iFloorH - 1})) / ${this.iFloorH}))`
      }
    },
    // 参数
    params() {
      return this.$store.state.modules.params
    },
    base64Map() {
      return this.$store.state.modules.base64Map
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
    // 药盒属性iControlStyle 1:空瓶回收格|2:病区自备药|4:拆零属性|8:退损单元|16:退药单元
    // 判断是否是 退损单元 退药单元
    getControlStyle(type, iControlStyle) {
      // return true
      return this.$ireve.NBGetControlStyle(type, iControlStyle)
    },
    // 由于存在拆零盒子需要合并下显示品名
    sDrugName() {},
    // 合并显示库存信息
    mergeStockInfo(item, stocInfoList, type) {
      const iTerId = item.iTerId
      const sCellCode = item.sCellCode

      // 取出所有的符合的数据
      const data = this.layout.filter(v => v.iTerId === iTerId && v.sCellCode === sCellCode)

      let str = ''
      data.forEach(v => {
        // 计算库存值
        const iNum = v.stocInfoList.reduce((t, v) => {
          return t + (Number(v[type]) || 0)
        }, 0)
        const iPackageNum = stocInfoList.iPackageNum
        const iUniType = Number(stocInfoList.iUniType)

        // 由于4.0硬件结构不再支持拆零盒（由于混放算法的实现）
        if (iUniType === 2) {
          // 混放 计算大包装和小包装
          const largeUnitCount = Math.floor(iNum / iPackageNum)
          const smallUnitCount = iNum % iPackageNum

          str += `<span class="num">${largeUnitCount}</span>
          <span class="unit">${item.stocInfoList.length > 0 ? item.stocInfoList[0].sMaxUnit : ''}</span>
          <span class="num">${smallUnitCount}</span>
          <span class="unit">${item.stocInfoList.length > 0 ? item.stocInfoList[0].sMinUnit : ''}</span>`
        } else {
          str += `<span class="num">${iNum}</span>
          <span class="unit">${iUniType === 0 ? stocInfoList.sMaxUnit : stocInfoList.sMinUnit}</span>`
        }
      })

      return str
    },
    // 药品类型 iAttrSign
    // 0 双人核对 1空瓶回收 2处方打印 3手术核对忽略 4病区冲销忽略 5门诊取药标志 6 条码核对
    getiAttrSign(type, iAttrSign) {
      return this.$ireve.NBGetiAttrSign(type, iAttrSign)
    },
    // 药品警示标示 iCautionSign
    // 0 常规 1毒性 2麻醉 3高危 4精神 5外用 6看似 7听似 8多规 9急救 10精神二 11避光 12多剂型
    getiCautionSign(type, iCautionSign) {
      return this.$ireve.NBGetiCautionSign(type, iCautionSign)
    },
    // 点击格子
    clickLayout(item, iClick) {
      if (this.type === 0 || this.type === 1) {
        // 管控
        if (this.type === 0) {
          if (item.stocInfoList.length === 0) {
            // 退损或者退药打开蒙层
            if (this.getControlStyle(3, item.iControlStyle) || this.getControlStyle(4, item.iControlStyle)) {
              // 退损
              // 这里是打开蒙层
              this.activedIndex = item.iCellId
            } else {
              this.$emit('clickLayout', item)

              // 去掉可能存在的其他层
              this.activedIndex = -1
            }
          } else {
            // 这里是打开蒙层
            this.activedIndex = item.iCellId
          }
        } else if (this.type === 1) {
          // 查看混放标志
          if (item.stocInfoList.length !== 0) {
            const iUniType = Number(item.stocInfoList[0].iUniType)

            if (iUniType === 2) {
              // 这里是打开蒙层
              this.activedIndex = item.iCellId
            } else {
              // iUniType 0大包装 1小包装
              // 底层 1大包装 2小包装
              this.$emit('clickLayout', item, iUniType === 0 ? 1 : 2)
            }
          } else {
            this.$emit('clickLayout', item)
          }
        }
      } else if (this.type === 3 || this.type === 3.1) {
        // 出库入库
        this.activedBoxIndex = iClick
        this.activedIndex = item.iCellId
        this.$emit('clickLayout', item)
      } else {
        this.$emit('clickLayout', item)
      }
    },
    // 弹出层自己消失
    disAppMask() {
      this.activedIndex = -1
    },
    // 刷新数据
    Refresh(item) {
      console.log('刷新数据', item)
      this.$emit('refresh', item)
    },
    // 删除数据
    Delete(item, s) {
      this.activedIndex = -1
      this.$emit('delete', item, s)
    },
    // 修改数据
    Modify(item) {
      console.log('修改数据')
      this.$emit('modify', item)
    },
    // 是否是回收破损等待单元
    isGrayscale(item) {
      return ((this.getControlStyle(0, item.iControlStyle) || this.getControlStyle(3, item.iControlStyle) ||
          this.getControlStyle(4, item.iControlStyle)) && this.type !== 0)
    },
    // 校准
    isCalibration(item) {
      // eslint-disable-next-line no-self-compare
      return (item.iCalibration & 1 === 1) && this.type === 1
    },
    // 标定
    isDemarcation(item) {
      // eslint-disable-next-line no-self-compare
      return (item.iCalibration & 2 === 2) && this.type === 5
    },
    // 是否显示药品信息
    isShowItemInfo(item) {
      return this.type !== 5 && item.stocInfoList.length > 0 && !this.getControlStyle(3, item.iControlStyle) &&
            !this.getControlStyle(4, item.iControlStyle)
    },
    // 是否显示加号
    isShowAdd(item) {
      return this.type === 0 && item.stocInfoList.length === 0 &&
        !this.getControlStyle(3, item.iControlStyle) && !this.getControlStyle(4, item.iControlStyle)
    },
    // 显示退损单元
    isShowDestoryBack(item) {
      return this.type !== 5 && item.stocInfoList.length === 0 && this.getControlStyle(3, item.iControlStyle)
    },
    // 显示退药单元
    isShowDestoryEmpty(item) {
      return this.type !== 5 && item.stocInfoList.length === 0 && this.getControlStyle(4, item.iControlStyle)
    },
    // 校准的点击事件
    clickUnit(item, weightType) {
      this.$emit('clickLayout', item, weightType)
    }
  }
}
</script>

<style lang='scss' scoped>
  .ter-layout-wrapper {
    width: 100%;
    height: 100%;
    font-family: $font-family;
    overflow: scroll;

    .ter-layout {
      width: 100%;
      height: 100%;
      // display: flex;
      // justify-content: center;
      // align-items: flex-start;
      // flex-wrap: wrap;
      cursor: pointer;

      .ter-layout-line {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 100%;

        .layout {
          position: relative;
          border: 1px solid $border-color;
          background: $back-color;
          border-radius: 8px;
          overflow: scroll;

          // 位置信息
          .location {
            position: absolute;
            top: 16px;
            left: 20px;
            font-size: 24px;
            color: $title-color;
            z-index: 99;
          }

          .demarcation-location {
            position: absolute;
            top: 32px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 36px;
            color: $title-color;
            font-family: $reg-font-family;
          }

          .has {
            padding: 60px 20px 20px 20px;
            width: 100%;
            height: 100%;
            position: relative;

            .drug {
              // 0111 和 图片
              .number {
                font-size: 24px;
                color: black;
                position: absolute;
                top: 15px;
                left: 83px;
                width: calc(100% - 83px);
                overflow: scroll;
                display: flex;
                padding-right: 20px;
                justify-content: space-between;

                .left {
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;

                  > span + span {
                    margin-left: 6px;
                  }
                }

                .mixed {
                  font-size: 20px;
                  color: $correct-text-color;
                  background: rgba($correct-text-color, 0.06);
                  padding: 5px;
                  border-radius: 8px;
                  border: 1px solid $correct-text-color;
                  font-family: $bold-font-family;
                }

                .empty {
                  font-size: 20px;
                  color: rgba($title-color, 0.6);
                  background: rgba($title-color, 0.06);
                  padding: 5px;
                  border-radius: 8px;
                  border: 1px solid $title-color;
                  margin-left: 8px;
                  font-family: $bold-font-family;
                }

                .right {
                  display: flex;
                  justify-content: flex-start;
                  width: 80%;
                  margin-top: -2px;

                  span + span {
                    margin-left: 6px;
                  }

                  span {
                    img.icon {
                      width: 32px;
                      height: 32px;
                    }
                  }
                }
              }

              .goods {
                color: $title-color;
                font-size: 32px;
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                font-family: $bold-font-family;

                span {
                  display: inline-block;
                  width: 100%;
                  overflow: scroll;
                }

                .text-26 {
                  font-size: 26px;
                }
              }

              .specifications {
                color: rgba($title-color, 0.6);
                font-size: 20px;
                width: 100%;
                white-space: nowrap;
                margin-top: 16px;
              }

              .left-bottom {
                position: absolute;
                left: 20px;
                bottom: 20px;
                overflow: scroll;
                width: calc(100% - 40px);

                .stock-limit-wrapper {
                  display: flex;
                  justify-content: flex-start;

                  > .item {
                    color: rgba($title-color, 0.8);
                    font-size: 20px;

                    .store {
                      .desc {
                        white-space: nowrap;
                      }
                    }
                  }

                  > .item + .item {
                    margin-left: 60px;
                  }

                  // 库存
                  .store {
                    display: flex;
                    justify-content: flex-start;
                    align-items: baseline;

                    .stock-wrapper {
                      display: flex;
                      justify-content: flex-start;
                      align-items: baseline;

                      /deep/ span.num {
                        color: $primary-color;
                        font-size: 28px;
                        margin: 0 2px;
                        font-family: $reg-font-family;
                      }

                      /deep/ span.unit {
                        color: rgba($title-color, 0.8);
                        font-size: 20px;
                        font-family: $font-family;
                      }
                    }
                  }
                }

                > .limit {
                  margin-top: 30px;

                  // 存放上限
                  .limit {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;

                    .text {
                      display: flex;
                      justify-content: flex-start;
                      align-items: baseline;

                      /deep/ .num {
                        margin: 0 2px;
                        font-family: $sub-font-family;
                      }
                    }
                  }

                  div + div {
                    margin-top: 7px;
                  }
                }

                > .weight {
                  margin-top: 9px;

                  div + div {
                    margin-top: 9px;
                  }

                  > div {
                    .num {
                      font-family: $sub-font-family;
                    }
                  }
                }

                > .limit, .weight {
                  color: rgba($title-color, 0.6);
                  font-size: 20px;
                }

                // 帐盘实盘
                .account-wrapper {
                  display: flex;
                  justify-content: space-between;
                  width: 100%;

                  .account,
                  .actual {
                    .store {
                      white-space: nowrap;

                      span.text {
                        color: rgba($title-color, 0.8);
                        font-size: 20px;
                      }

                      .stock-wrapper {
                        margin-left: 2px;

                        /deep/ span.num {
                          color: $primary-color;
                          font-size: 38px;
                          font-family: $reg-font-family;
                          margin: 0 5px;
                        }

                        /deep/ span.unit {
                          // margin-left: 2px;
                          color: rgba($title-color, 0.8);
                          font-size: 20px;
                          font-family: $font-family;
                        }
                      }
                    }
                  }

                  .actual {
                    // margin-top: 8px;

                    .store {
                      .stock-wrapper {
                        /deep/ span.num {
                          color: $primary-color;
                          margin: 0 5px;
                        }
                      }
                    }
                  }
                }

                // 批号
                .batch {
                  max-height: 40px;
                  overflow: scroll;

                  .batch {
                    .num {
                      font-family: $sub-font-family;
                    }
                  }
                }
              }
            }
          }

          // 盘点过得
          .stock-count {
            background: rgba(#F0FFFC, 1);

            .drug {
              .left-bottom {
                // 帐盘实盘
                .account-wrapper {
                  .account,
                  .actual {
                    .store {
                      .stock-wrapper {

                        /deep/ span.num {
                          color: $title-color;
                        }
                      }
                    }
                  }

                  .actual {
                    .store {
                      .stock-wrapper {
                        /deep/ span.num {
                          color: $correct-text-color;
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          // 盘点过得 - error
          .stock-count-err {
            background: rgba(#FFF0F0, 1);

            .drug {
              .left-bottom {
                // 帐盘实盘
                .account-wrapper {
                  .actual {
                    .store {
                      .stock-wrapper {
                        /deep/ span.num {
                          color: $waring-text-color;
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          .none {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            // width: 190px;
            height: 76px;
            // border: 1px dashed $primary-color;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 15px 43px 15px 38px;
            white-space: nowrap;
            border: 1px dashed transparent;
            background: linear-gradient(white, white) padding-box,
            repeating-linear-gradient(-45deg, $primary-color 0, $primary-color 0.25em,$text-color 0,$text-color 0.75em);

            .svg-icon {
              width: 52px;
              height: 50px;
            }

            span {
              color: $primary-color;
              font-size: 32px;
            }
          }

          .demarcation {
            .svg-icon {
              width: 46px;
              height: 46px;
            }
          }

          .mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba($title-color, 0.6);
            font-size: 28px;

            .icon-wrapper {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              display: flex;
              justify-content: center;

              div.refresh, div.delete, div.modify {
                width: 80px;
                height: 80px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;

                .svg-icon {
                  width: 46px;
                  height: 46px;
                }
              }

              div.refresh {
                background: $waring-text-color;
              }

              div.delete {
                background: $warning-color;
              }

              div.modify {
                background: $warning-color;
              }

              > div + div {
                margin-left: 20px;
              }
            }
          }

          // 校准的蒙层
          .mask-cali {
            .icon-wrapper {
              > div {
                width: 110px;
                height: 110px;
                border-radius: 50%;
                cursor: pointer;
                text-align: center;
                line-height: 110px;

                span {
                  color: $text-color;
                  font-size: 28px;
                  font-family: $bold-font-family;
                }
              }

              .larger-unit {
                background: $warning-color;
              }

              .small-unit {
                margin-left: 30px;
                background: $correct-text-color;
              }
            }
          }

          .destory-back, .destory-empty {
            width: 100%;
            height: 100%;
            background: #F0FFFC;

            .title {
              position: absolute;
              top: 69px;
              left: 20px;
              color: $correct-text-color;
              font-size: 32px;;
            }

            .desc {
              position: absolute;
              top: 234px;
              left: 20px;
              color: rgba($title-color, 0.6);
              font-size: 20px;
            }
          }
        }

        .layout + .layout {
          margin-left: 14px;
        }

        // 盘点帐盘和实盘不一致
        .not-equal:not(.grayscale) {
          background: #FFF0F0;
          border: 2px solid $waring-text-color;
        }

        .grayscale {
          .destory-back, .destory-empty {
            background: #F2F3F4;
            color: rgba($title-color, 0.3);

            span, div {
              color: rgba($title-color, 0.3)!important;
            }
          }

          .location {
            color: rgba($title-color, 0.3)!important;
          }
        }

        // 已经标定
        .demarcation {
          background: #F0FFFC;

          .demarcation {
            border: 1px dashed transparent;
            background: linear-gradient(#F0FFFC, #F0FFFC) padding-box,
            repeating-linear-gradient(-45deg, $primary-color 0, $primary-color 0.25em,$text-color 0,$text-color 0.75em);
          }
        }

        .calibration {
          background: #F0FFFC;
        }

        .active-layout {
          background: #E3EAFF;
          border: 1px solid $primary-color;

          .has {
            .drug {
              .goods {
                color: $primary-color;
              }
            }
          }
        }
      }

      .ter-layout-line + .ter-layout-line {
        margin-top: 14px;
      }
    }

    .ter-layout-3 {
      width: 100%;
      height: 100%;
      // overflow: scroll;
      // display: block;
      // justify-content: center;
      // align-items: center;
      // flex-wrap: wrap;

      .ter-layout-line {
        .layout-whole:nth-child(1) {
          padding-top: 16px;
        }

        .layout-whole {
          width: 100%;
          // height: 100%;
          overflow: scroll;
          background: transparent;
          border: none;
          padding-left: 38px;

          .wrapper {
            .layer {
              font-size: 24px;
              color: rgba($title-color, 0.6);
              margin-bottom: 19px;

              .text {
                margin-left: 2px;
              }
            }

            .content {
              overflow: hidden;

              .layout-box {
                // padding: 22px 52px;
                width: 216px;
                height: 72px;
                line-height: 72px;
                text-align: center;
                border: 1px solid $border-color;
                color: $title-color;
                font-size: 28px;
                border-radius: 8px;
                float: left;
                background: $back-color;
                margin-right: 14px;
                margin-bottom: 14px;
                display: flex;
                justify-content: center;

                .text {
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  display: block;
                  width: 80%;
                }
              }

              .active-layout-box {
                background: #E3EAFF;
                color: $primary-color;
                border: 1px solid $primary-color;
              }
            }
          }
        }

        .layout-whole + .layout-whole {
          margin-left: 0;
        }
      }
    }

    .ter-layout-row {
      .weight {
        display: flex;
        justify-content: space-between;
        align-items: center;

        div + div {
          margin-top: 0;
        }

        > div {
          .num {
            font-family: $sub-font-family;
          }
        }
      }
    }

    .ter-layout-none {
      width: 100%;
      height: 100%;
    }
  }
</style>
