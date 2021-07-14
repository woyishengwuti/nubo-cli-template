## 说明

诺博Vue项目模板，适用于小型项目
药品线请使用其他模板

## 更改步骤
1. clone项目之后更改.env.*文件，修改后缀名为当前项目缩写，同时修改package.json中的开发环境和生产环境指令
2. 在src/frames/dashboard/layout/components/NavBar.vue中讲静态菜单（getMenus）修改成从后台接口获取的菜单数据
3. 各自的模块在各自文件夹下开发，防止影响其他模块，全局通用模块放在core下，此项目通用放在frames/dashboard下
4. 安装脚手架工具，在modules等模块文件夹下执行 nubo inims personalCenter 生成项目模块代码（修改其中的不合适地方）

### Compiles and hot-reloads for development

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev:m
npm run dev:m2
```

### Compiles and minifies for production
```
<!-- 无webpack-bundle-analyzer -->
npm run build:m
npm run build:m2

<!-- webpack-bundle-analyzer -->
npm run build:m:b
npm run build:m2:b
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint

```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
