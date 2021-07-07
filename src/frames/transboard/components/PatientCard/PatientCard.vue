<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-07-02 09:59:44
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-08-11 18:19:19
 * @ Description: 病人卡支持单选和多选
 -->

<template>
  <div class="patient-card">
    <!-- colorType: 1 蓝色病人卡为有待取医嘱，2 绿色病人卡为无待取医嘱，3 黄色病人卡为已转出病人但有待取医嘱 -->
    <div
      v-for="(item, i) in patientCard"
      :key="i"
      :class="['patient',
               selectedIDs.includes(item.iPatientId) && multiSelect ? 'selectd' : '',
               item.colorType === 1
                 ? 'patient-to-take' : item.colorType === 2
                   ? 'patient-none-take' : item.colorType === 3
                     ? 'patient-roll-out' : '']"
      @click="selectdPatient(item)"
    >
      <div class="top">
        <div class="patient-name">
          <span class="bed">{{ item.sBedNum }}</span>
          <div class="name">
            {{ item.sPatientName }}
          </div>
        </div>
        <div class="patient-num">
          {{ item.sHospitalNo }}
        </div>
        <div class="diagn">
          {{ item.sAdmiDiagn }}
        </div>
      </div>
      <div class="bottom">
        <span>{{ $Moment(item.dAdmission).format('YYYY-MM-DD HH:mm') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// 导入其他文件比如：组件/工具js/第三方插件js/json文件/图片等等import 《组件名称》 from '《组件路径》';

export default {
  name: 'PatientCard',
  components: {},
  props: {
    // 多选
    multiSelect: {
      type: Boolean,
      default: false
    },
    // 数据
    patientCard: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 复选选中的数据
    selectedPatient: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  computed: {
    selectedIDs() {
      return this.selectedPatient.map(v => v.iPatientId)
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
    // 选中
    selectdPatient(item) {
      this.$emit('handledClickPatient', item)
    }
  }
}
</script>

<style lang='scss' scoped>
  .patient-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;

    .patient {
      width: 356px;
      height: 190px;
      margin-right: 20px;
      margin-bottom: 20px;
      background: $back-color;
      border-radius: 8px;
      padding: 0 20px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      border: 1px solid transparent;

      .top {
        height: calc(100% - 40px);
        border-bottom: 1px solid $border-color;

        .patient-name {
          display: flex;
          justify-content: flex-start;
          align-items: baseline;
          padding-top: 18px;

          .bed {
            font-family: $reg-font-family;
            font-size: 48px;
          }

          .name {
            font-family: $bold-font-family;
            font-size: 36px;
            margin-left: 20px;
          }
        }

        .patient-num {
          margin-top: 2px;
          color:rgba($title-color, 0.6);
          font-size: 24px;
          font-family: $reg-font-family;
        }

        .diagn {
          margin-top: 9px;
          color:rgba($title-color, 0.6);
          font-size: 18px;
          font-family: $font-family;
        }
      }

      .bottom {
        height: 40px;
        line-height: 40px;
        text-align: left;

        span {
          color: rgba($title-color, 0.6);
          font-size: 18px;
          font-family: $sub-font-family;
        }
      }
    }

    .selectd {
      border: 1px solid red;
    }

    .patient:nth-child(5n) {
      margin-right: 0;
      margin-bottom: 0;
    }

    // 有医嘱
    .patient-to-take {
      .top {
        .patient-name {
          .bed {
            color: $primary-color;
          }

          .name {
            color: $primary-color;
          }
        }
      }

      &::before {
        position: absolute;
        content: '';
        top: 0;
        right: 0;
        width: 10px;
        height: 80px;
        border-bottom-left-radius: 8px;
        background: $primary-color;
      }
    }

    // 无医嘱
    .patient-none-take {
      .top {
        .patient-name {
          .bed {
            color: rgba($title-color, 0.6);
          }

          .name {
            color: rgba($title-color, 0.6);
          }
        }
      }
    }

    // 转出
    .patient-roll-out {
      .top {
        .patient-name {
          .bed {
            color: #F4B263;
          }

          .name {
            color: #F4B263;
          }
        }
      }

      &::before {
        position: absolute;
        content: '';
        top: 0;
        right: 0;
        width: 10px;
        height: 80px;
        border-bottom-left-radius: 8px;
        background: #F4B263;
      }
    }
  }
</style>
