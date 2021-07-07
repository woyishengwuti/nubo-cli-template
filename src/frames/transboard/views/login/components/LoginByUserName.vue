<!--
 * @ Author: feixiang.wu
 * @ Create Time: 2020-02-25 17:04:43
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-09-25 16:26:21
 * @ Description: 工号密码登录
 -->

<template>
  <div class="user">
    <div class="user-container">
      <el-row :class="focusStatus ? 'focus' : ''">
        <div class="icon">
          <svg-icon icon-class="User" />
        </div>
        <el-input
          ref="user"
          v-model="form.sUserCode"
          v-focus="focusStatus"
          type="text"
          spellcheck="false"
          :placeholder="$t('ireveLogin.pleaseEnterName')"
          @keyup.enter.native="focus"
          @focus="changeSelfStatus"
        />
      </el-row>
      <el-row :class="focusStatusPass ? 'focus' : ''">
        <div class="icon">
          <svg-icon icon-class="Password" />
        </div>
        <el-input
          ref="password"
          v-model="form.sPassword"
          v-focus="focusStatusPass"
          :type="visible == 2 ? 'password' : 'text'"
          :placeholder="$t('ireveLogin.pleaseEnterPassWord')"
          autocomplete="off"
          @focus="changeFocusStatus"
          @keyup.enter.native="clickToLogin"
        />
        <div v-if="visible == 1 && focusStatusPass" class="icon-pass" @click="show(2)">
          <svg-icon icon-class="visible" />
        </div>
        <div v-if="visible == 2 && focusStatusPass" class="icon-pass" @click="show(1)">
          <svg-icon icon-class="invisible" />
        </div>
        <div v-if="form.sPassword.length>0 && focusStatusPass" class="icon-clear" @click="clear">
          <svg-icon icon-class="clear" />
        </div>
      </el-row>
      <footer :class="[lang === 'en' ? 'item-footer' : '']">
        <el-button
          v-loading="isLogin"
          type="primary"
          :class="[
            'button', focusStatus || focusStatusPass ? 'focus' : 'no-focus',
            'user-btn', !hasFaceBtn ? 'user-btn-alone' : '']"
          @click="clickToLogin"
          v-text="$t('ireveLogin.login')"
        />
        <span v-if="hasFaceBtn">or</span>
        <el-button
          v-if="hasFaceBtn"
          v-loading="isLogin"
          class="face-btn"
          type="primary"
          @click="openCamera"
          v-text="$t('ireveLogin.face')"
        >人脸识别登录</el-button>
      </footer>
    </div>
  </div>
</template>

<script>
// import Keyboard from '@/components/keyboard/keyboard'

export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'UserNameLogin',
  components: {},
  directives: {
    focus: {
      // 当绑定元素插入到 DOM 中。
      inserted(el, { value }) {
        // 聚焦元素
        if (value) {
          el.querySelector('.el-input__inner').focus()
        }
      },
      update(el, { value }) {
        if (value) {
          el.querySelector('.el-input__inner').focus()
        }
      }
    }
  },
  props: {
    isLogin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        sUserCode: '',
        sPassword: ''
      },
      hasFaceBtn: true,
      focusStatus: true, // 用户名贯标
      focusStatusPass: false, // 密码光标
      keyboardVisible: false, // 是否显示键盘
      visible: 0 // 密码框 0 不显示   1 可见 2 不可见
    }
  },
  computed: {
    lang() {
      return this.$store.state.locale
    },
    // 确认事件
    globalEnter() {
      return this.$store.state.core.globalEnter
    }
  },
  watch: {
    globalEnter() {
      this.clickToLogin()
    }
  },
  beforeCreate() {

  },
  created() {},
  beforeMount() {},
  mounted() {
    // 点击事件
    window.onclick = e => {
      if (this.keyboardVisible && e.target.className === 'bg') {
        this.keyboardVisible = false
      }
    }
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {
    window.onclick = null
  },
  activated() {},
  methods: {
    // 清空密码框
    clear() {
      this.form.sPassword = ''
    },
    // 密码框可见切换
    show(val) {
      this.visible = val
    },
    // 密码框失去焦点
    // 焦点在第一个的时候 回车焦点进入第二个输入框
    focus() {
      this.focusStatusPass = true
      this.focusStatus = false
      // if (!this.keyboardVisible) this.keyboardVisible = true;
    },
    // 点击第二个输入框 让第一个的状态消失
    changeFocusStatus() {
      if (this.visible === 0) {
        this.visible = 2
      }
      this.focusStatus = false
      this.focusStatusPass = true
      // if (!this.keyboardVisible) this.keyboardVisible = true;
    },
    // 点击第一个输入框保持焦点
    changeSelfStatus() {
      this.focusStatus = true
      this.focusStatusPass = false

      if (!this.keyboardVisible) this.keyboardVisible = true
    },
    // 登录
    clickToLogin() {
      this.$emit('login', this.form)

      this.changeSelfStatus()
    },
    // 人脸识别
    openCamera() {
      this.$emit('openCamera')
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  font-family: $font-family;

  .user-container {
    overflow: hidden;

    .el-row {
      position: relative;
      width: 440px;
      height: 82px;
      line-height: 82px;
      border-radius: 8px;
      border: 1px solid $border-color;

      .icon {
        display: flex;
        position: absolute;
        top: 18px;
        left: 10px;
        color: transparent;

        .svg-icon {
          width: 46px;
          height: 46px;
        }
      }

      .icon-pass {
        display: flex;
        position: absolute;
        top: 18px;
        right: 20px;
        color: transparent;

        .svg-icon {
          width: 46px;
          height: 46px;
        }
      }

      .icon-clear {
        display: flex;
        position: absolute;
        top: 18px;
        right: 76px;
        color: transparent;

        .svg-icon {
          width: 46px;
          height: 46px;
        }
      }

      /deep/ .el-input {
        outline: none;
        font-size: 28px;
        color: #666;
        border: none;
        padding-left: 56px;
        background: transparent;

        .el-input__inner {
          border: none;
          padding: 0;
          border-radius: 0;
          font-size: 32px;
          color: rgba($title-color, 1);
          font-family: $reg-font-family;
          padding-left: 10px;
        }

        .el-input__clear {
          font-size: 25px;
        }

        .el-icon-view {
          margin-left: 38px;
        }

        .el-input__inner::-webkit-input-placeholder {
          font-family: $font-family;
          color: rgba($title-color, 0.6);
          font-size: 28px;
          text-align: left;
        }
      }
    }

    .el-row + .el-row {
      margin-top: 51px;
    }

    .focus {
      border-color: $primary-color;
    }

    footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 49px;

      > span {
        color: rgba($title-color, 0.6);
        font-size: 20px;
      }

      .el-button.user-btn {
        width: 159px;
        padding: 24px 55px;
        font-size: 24px;
        text-align: center;
        border-radius: 8px;
        font-family: $font-family;
        overflow: hidden;
      }

      .el-button.user-btn-alone {
        width: 440px;
        padding: 24px 196px;
        overflow: hidden;
      }

      .el-button.face-btn {
        width: 220px;
        padding: 24px 38px;
        font-size: 24px;
        text-align: center;
        border-radius: 8px;
        font-family: $font-family;
        background: #00A2B3;
        overflow: hidden;
      }

      .no-focus {
        background: $text-color;
        color: $primary-color ;
      }

      .focus {
        background: $primary-color;
        color: $text-color ;
      }
    }
  }
}
</style>
