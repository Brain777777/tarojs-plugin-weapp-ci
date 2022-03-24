import { IPluginContext } from "@tarojs/service";
export declare type ProjectType = "miniProgram" | "miniGame" | "miniProgramPlugin" | "miniGamePlugin";
export declare type QrcodeType = "image" | "base64" | "terminal";
/** 微信小程序配置 */
export interface WeappConfig {
    /** 小程序/小游戏项目的 appid */
    appid: string;
    /** 私钥，在获取项目属性和上传时用于鉴权使用(必填) */
    privateKeyPath: string;
    /** 微信开发者工具安装路径 */
    devToolsInstallPath?: string;
    /** 上传的小程序的路径（默认 outputPath ） */
    projectPath?: string;
    /** 类型，默认miniProgram 小程序 */
    type?: ProjectType;
    /** 上传需要排除的目录 */
    ignores?: Array<string>;
}
export interface CIOptions {
    /** 微信小程序CI项目配置, */
    weapp?: WeappConfig;
    /** 发布版本号 */
    version: string;
    /** 版本发布描述 */
    desc: string;
    /** 指定使用哪一个 ci 机器人，可选值：1 ~ 30 */
    robot?: number;
    /** 返回二维码文件的格式 "image" 或 "base64"， 默认值 "terminal" 供调试用 */
    qrcodeFormat?: QrcodeType;
    /** 二维码文件保存路径 */
    qrcodeOutputDest?: string;
    /** 预览页面路径 */
    pagePath?: string;
    /** 预览页面路径启动参数 */
    searchQuery?: string;
    /** 默认值 1011，具体含义见场景值列表: https://developers.weixin.qq.com/miniprogram/dev/reference/scene-list.html */
    scene?: number;
}
export default abstract class BaseCI {
    /** taro 插件上下文 */
    protected ctx: IPluginContext;
    /** 传入的插件选项 */
    protected pluginOpts: CIOptions;
    /** 当前要发布的版本号 */
    protected version: string;
    /** 当前发布内容的描述 */
    protected desc: string;
    constructor(ctx: IPluginContext, pluginOpts: CIOptions);
    /** 初始化函数，会被构造函数调用 */
    protected abstract _init(): void;
    /** 打开小程序项目 */
    abstract open(): any;
    /** 上传小程序 */
    abstract upload(): any;
    /** 预览小程序 */
    abstract preview(): any;
}
