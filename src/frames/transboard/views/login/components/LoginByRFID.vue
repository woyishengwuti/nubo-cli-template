<!-- RFID登录 -->
<template>
  <div class="rfid">
    <div class="rfid-content">
      <img :src="errstate === 0 ? img.normal : errstate === 1 ? img.success : img.error" alt="rfid">
      <span />
    </div>
  </div>
</template>

<script>
// 导入其他文件比如：组件/工具js/第三方插件js/json文件/图片等等import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'RfidLogin',
  components: {},
  props: {
    errstate: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      img: {
        normal: '',
        error: '',
        success: ''
      }
    }
  }, // 生命周期 - 更新之前
  computed: {
  // 监听属性 类似于data概念

  },
  watch: {
  // 监控data中的数据变化

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {
  // 生命周期 - 创建之前

  },
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {}, // 生命周期 - 挂载之前
  mounted() {

  },
  beforeUpdate() {},
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {},
  // 方法集合
  methods: {

  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang='scss' scoped>
  //@import url(); 引入公共css类
  .rfid {

    .rfid-content {
      width: 30.1875rem;
      height: 18.9375rem;
      position: relative;

      img {
        width: 30.1875rem;
        height: 18.9375rem;
      }

      span {
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 18.75rem;
        height: .125rem;
        background: radial-gradient(circle, rgba(50,124,247,1) 0%, rgba(255,255,255,1) 100%);
        opacity: 0.3;
        animation: scan 1.5s infinite alternate;
      }
    }
  }

  @keyframes scan {
    from { top: 3.75rem; }
    to { top: 15rem; }
  }
</style>
