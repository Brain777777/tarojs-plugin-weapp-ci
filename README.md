# tarojs-plugin-weapp-ci

> Taro 微信小程序端构建后支持CI（持续集成）的插件， 支持构建完毕后自动打开小程序开发工具、上传作为体验版、生成预览二维码，此插件为 fork @tarojs/plugin-mini-ci 的微信小程序版本，感谢 [Taro](https://github.com/NervJS/taro) 团队多年来的不断维护。

## 使用

### 安装

在现有项目中使用可以通过 `npm` 进行安装
```
npm i tarojs-plugin-weapp-ci -D
```

当然，你也可以通过 `yarn` 或 `pnpm` 进行安装
```
yarn add -D tarojs-plugin-weapp-ci

pnpm add  tarojs-plugin-weapp-ci -D
```

### 使用插件
`/config/index.js`

```js
// 示例, 如果你使用 `vs code` 作为开发工具， 你还可以使用注释的语法引入插件包含的声明文件，可获得类似于typescript的友好提示
/**
 * @typedef { import("tarojs-plugin-weapp-ci").CIOptions } CIOptions
 * @type {CIOptions}
 */
const CIPluginOpt = {
    weapp: {
        appid: "微信小程戏appid",
        privateKeyPath: "密钥文件相对项目根目录的相对路径，例如 key/private.appid.key"
    },
    // 版本号
    version: "1.0.0",
    // 版本发布描述
    desc: "版本描述"
}
const config = {
  plugins: [
    [ "tarojs-plugin-weapp-ci", CIPluginOpt ]
  ]
}
```

### 配置命令

`package.json` 的 `scripts` 字段使用命令参数

```json
{
    "scripts": {
            //  构建完后自动 “打开开发者工具”
           "build:weapp": "taro build --type weapp --open",
            //  构建完后自动“上传代码作为体验版”
           "build:weapp:upload": "taro build --type weapp --upload",
            //  构建完后自动 “上传代码作为开发版并生成预览二维码”     
           "build:weapp:preview": "taro build --type weapp --preview"
    }
}
```
由上面的示例可知，插件为taro cli命令扩展了3个选项：

- --open
打开开发者工具，类似于网页开发中自动打开谷歌浏览器
- --upload
上传代码作为体验版
- --preview
上传代码作为开发版并生成预览二维码

此3个选项在一条命令里不能同时使用

## API



### 微信小程序CI配置
| 参数 | 类型 | 说明 |
| :--- | :--- | :--- |
| appid | string | 小程序/小游戏项目的 appid |
| privateKeyPath | string | 私钥文件在项目中的相对路径，在获取项目属性和上传时用于鉴权使用|
| devToolsInstallPath | string | 微信开发者工具安装路径，如果你安装微信开发者工具时选的默认路径，则不需要传入此参数 |
| projectPath | string | 上传的小程序的路径（默认取的 outputPath ） |
| ignores | string[] | 上传需要排除的目录(选填) |
| robot | number | 指定使用哪一个 ci 机器人，可选值：1 ~ 30 |
| qrcodeFormat | string | 二维码文件的格式 "image" 或 "base64"， 默认值 "terminal" 供调试用  |
| qrcodeOutputDest | string | 二维码文件保存路径 |
| pagePath | string | 预览页面路径 |
| searchQuery | string | 预览页面路径启动参数 |
| scene | number | 默认值 1011，具体含义见场景值列表: https://developers.weixin.qq.com/miniprogram/dev/reference/scene-list.html| 

官方CI文档[点这里](https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html)