<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-04-16 08:52:13
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-08-27 11:47:28
 * @ Description: 双人核对弹出层
 -->

<template>
  <el-dialog
    :title="title"
    class="double-check custom-dialog-mini"
    :visible.sync="dialogVisible"
    top="calc(200vh / 10.8)"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="calc(640% / 19.2)"
    :element-loading-text="$t('ireveMain.check')"
  >
    <div v-loading="btnLoading" class="wrapper">
      <p class="title" v-text="textValue.title">可使用指纹、工卡、人脸、虹膜核对</p>
      <p class="user-name">
        <el-input
          v-model="user"
          v-autofocus="focusStatus"
          :placeholder="$t('ireveLogin.pleaseEnterName')"
          @keyup.enter.native="focus"
          @focus="changeSelfStatus"
        />
      </p>
      <p class="password">
        <el-input
          v-model="password"
          v-autofocus="focusStatusPass"
          :placeholder="$t('ireveLogin.pleaseEnterPassWord')"
          type="password"
          @keyup.enter.native="confirm"
          @focus="changeFocusStatus"
        />
      </p>
      <p class="switch">
        <svg-icon icon-class="switch" />
        <span v-text="textValue.switchVlaue">切换人脸识别核对</span>
      </p>
    </div>
    <div slot="footer" class="footer">
      <div class="cancel" @click="cancel" v-text="$t('general.cancel')">取消</div>
      <div v-loading="btnLoading" class="confirm" @click="confirm" v-text="textValue.btnValue">核对</div>
    </div>
  </el-dialog>
</template>

<script>
// 导入其他文件比如：组件/工具js/第三方插件js/json文件/图片等等import 《组件名称》 from '《组件路径》';
import api from '../../api/api'

export default {
  name: 'DoubleCheck',
  components: {},
  props: {},
  data() {
    return {
      title: '', // 标题
      dialogVisible: false, // 是否显示
      user: '', // 用户名
      password: '', // 密码
      focusStatus: true, // 用户名光标
      focusStatusPass: false, // 密码光标
      onlyFingerPrint: false // 仅支持指纹
    }
  },
  computed: {
    // 是否显示
    doubleCheckVisible() {
      return this.$store.state.modules.doubleCheckVisible
    },
    // 核对的结果
    doubleCheckOnlyOnce() {
      return this.$store.state.modules.doubleCheckOnlyOnce
    },
    // 核对的结果
    doubleCheckResult() {
      return this.$store.state.modules.doubleCheckResult
    },
    // 参数
    params() {
      return this.$store.state.modules.params
    },
    // 底层数据
    UnderylingData() {
      return this.$store.state.core.UnderylingData
    },
    // loading
    btnLoading() {
      return this.$store.state.core.loading
    },
    // 科室ID
    depId() {
      return this.$store.state.modules.sDepartId
    },
    // 当前登录用户
    userInfo() {
      return this.$store.state.login.userInfo
    },
    // 文字描述
    textValue() {
      switch (this.doubleCheckVisible) {
        case 'shiftExchange':
          // 交接班
          return {
            title: '可使用指纹、工卡、人脸、虹膜进行交接班验证',
            switchVlaue: '切换人脸识别',
            btnValue: '验证'
          }
        case 'transfer':
          // 交接班
          return {
            title: '可使用指纹、工卡、人脸、虹膜进行转交验证',
            switchVlaue: '切换人脸识别',
            btnValue: '验证'
          }
        default:
          return {
            title: this.$t('ireveLogin.others'),
            switchVlaue: this.$t('ireveLogin.switch'),
            btnValue: this.$t('general.check')
          }
      }
    }
  },
  watch: {
    // 控制页面显示
    doubleCheckVisible(val) {
      if (val) {
        // 准备的打开页面
        // 核对标志更改为原始值
        this.$store.commit('modules/SET_CHECKRESULT', false)

        // 只核对一次
        // console.error(111111, String(this.params.get('CheckOnce')) === '1', this.doubleCheckOnlyOnce)
        if (String(this.params.get('CheckOnce')) === '1' && this.doubleCheckOnlyOnce) {
          // 判断上次的结果
          // 通知页面核对成功
          this.$nextTick(v => {
            this.$store.commit('modules/SET_CHECKRESULT', val)
          })

          // 控制这个关闭弹出层
          this.$store.commit('modules/SET_DOUBLECHECKVISIBLE', false)
        }

        // 仅支持指纹
        if (String(this.params.get('OnlyFingerPrint')) === '1') {
          // 输入框不允许输入，不处理其他上报
          this.onlyFingerPrint = true
        }
      } else {
        // 关闭 包括取消和成功的关闭
        this.clear()
      }

      this.dialogVisible = !!val
    },
    // 底层上报的数据信息
    UnderylingData(val, oldVal) {
      if (this.dialogVisible) {
        console.log('双人核对', val, oldVal)

        // 指纹等上报数据
        if (val.cmd === 'featureTouchService') {
          console.log('特征码数据', val.target[0].feature)
          const feature = val.target[0].feature
          if (val.operate === 'touchFinger') {
            // 指纹
            this.check({
              signature: feature
            })
          } else if (val.operate === 'touchRFID') {
            // RFID
            this.check({
              cardNo: feature
            })
          } else if (val.operate === 'touchFace') {
            // 人脸
            this.check({
              signature: feature
            })
          }
        }
      }
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
    // 密码框失去焦点
    // 焦点在第一个的时候 回车焦点进入第二个输入框
    focus() {
      this.focusStatusPass = true
      this.focusStatus = false
    },
    // 点击第二个输入框 让第一个的状态消失
    changeFocusStatus() {
      if (this.visible === 0) {
        this.visible = 2
      }
      this.focusStatus = false
      this.focusStatusPass = true
    },
    // 点击第一个输入框保持焦点
    changeSelfStatus() {
      this.focusStatus = true
      this.focusStatusPass = false

      if (!this.keyboardVisible) this.keyboardVisible = true
    },
    // 取消
    cancel() {
      this.$store.commit('modules/SET_DOUBLECHECKVISIBLE', false)
      // this.dialogVisible = false
    },
    // 清空状态信息
    clear() {
      this.user = ''
      this.password = ''
      this.focusStatus = true
      this.focusStatusPass = false

      // 如果键盘存在则关闭键盘
      this.$store.commit('SET_KEYBOARD', false)
    },
    // 确认
    confirm() {
      this.check({
        account: this.user,
        password: this.password
      })
    },
    // 核对
    check({ account, cardNo, password, signature }) {
      if (this.doubleCheckVisible === 'shiftExchange') {
        if (this.userInfo.sAccount === account) {
          this.$message.error('请输入其他人账号进行交接班')
          this.clear()
          return false
        }
      } else if (this.doubleCheckVisible === 'doubeCheck') {
        // TimeRound 双人核对是否允许同一个人核对的区间
        // 起始时间和截止时间相同表示允许同一个人双人核对, 默认配置表示不允许同一人进行双人核对
        const TimeRound = this.params.get('TimeRound')
        if (TimeRound && TimeRound.includes('-')) {
          const start = TimeRound.match(/(\S*)-/)[1]
          const end = TimeRound.match(/-(\S*)/)[1]

          const startTime = +new Date('2020 07 22 ' + start)
          const endTime = +new Date('2020 07 22 ' + end)

          // 相等允许同一人双人核对
          if (startTime !== endTime) {
            if (this.userInfo.sAccount === account) {
              this.$message.error(TimeRound + '时间段内不允许同一人进行双人核对')
              this.clear()
              return false
            }
          }
        }
      }

      this.$store.commit('SET_LOADING', true)

      api.doubleCheck({
        account,
        cardNo,
        deptId: this.depId,
        password,
        signature,
        terCode: globalVar.sZDID
      }).then(res => {
        // 成功
        if (res.result) {
          // 通知页面核对成功
          console.error(33, this.doubleCheckVisible)
          this.$store.commit('modules/SET_CHECKRESULT', this.doubleCheckVisible)

          // 提交数据信息部分模块可能需要使用例如交接班
          this.$store.commit('modules/SET_CHECKDATA', {
            account: account,
            cardNo: cardNo,
            deptId: this.depId,
            password: password,
            signature: signature,
            terCode: globalVar.sZDID
          })

          // 控制这个关闭弹出层
          this.$store.commit('modules/SET_DOUBLECHECKVISIBLE', false)

          // 核对成功保存下来第一次结果下次如果参数开着的并且这个值存在则直接成功
          this.$store.commit('modules/SET_CHECKONCE', true)
        } else {
          this.clear()
        }

        this.$store.commit('SET_LOADING', false)
      }).catch(v => {
        this.$store.commit('SET_LOADING', false)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .double-check {
    /deep/ .el-dialog {
      .el-dialog__header {
        display: none;
      }

      .el-dialog__body {
        width: 100%;
        height: 380px;
        position: relative;
        font-family: $font-family;

        .wrapper {
          position: absolute;
          left: 50%;
          top: 50px;
          transform: translateX(-50%);

          .title {
            color: rgba($title-color, 0.8);
            font-size: 28px;
            white-space: nowrap;
          }

          .user-name, .password {
            margin-top: 20px;
            width: 100%;
            display: flex;
            justify-content: center;

            .el-input {
              width: 480px;

              .el-input__inner {
                width: 100%;
                border-radius: 8px;
                border: 1px solid $border-color;
                height: 80px;
                line-height: 80px;
                padding-left: 30px;
                color: rgba($title-color, 0.6);
                font-size: 24px;
              }

              .el-input__inner::-webkit-input-placeholder {
                color: rgba($title-color, 0.6);
                font-size: 24px;
              }
            }
          }

          .switch {
            margin-top: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: $primary-color;
            font-size: 28px;
            cursor: pointer;

            .svg-icon {
              width: 46px;
              height: 46px;
            }
          }
        }
      }
    }
  }
</style>
