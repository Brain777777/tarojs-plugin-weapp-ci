import { IPluginContext } from "@tarojs/service";
import * as minimist from "minimist";
import { CIOptions } from "./BaseCi";
import WeappCI from "./WeappCI";

export { CIOptions } from "./BaseCi";
export default (ctx: IPluginContext, pluginOpts: CIOptions) => {
  const onBuildDone = ctx.onBuildComplete || ctx.onBuildFinish;

  ctx.addPluginOptsSchema((joi) => {
    return joi
      .object()
      .keys({
        /** 微信小程序上传配置 */
        weapp: joi.object({
          appid: joi.string().required(),
          privateKeyPath: joi.string().required(),
          projectPath: joi.string(),
          type: joi
            .string()
            .valid(
              "miniProgram",
              "miniProgramPlugin",
              "miniGame",
              "miniGamePlugin"
            ),
          ignores: joi.array().items(joi.string().required()),
        }),
        version: joi.string(),
        desc: joi.string(),
        robot: joi.number(),
        qrcodeFormat: joi.string().valid("image", "base64", "terminal"),
        qrcodeOutputDest: joi.string(),
        pagePath: joi.string(),
        searchQuery: joi.string(),
        scene: joi.number(),
      })
      .required();
  });

  onBuildDone(async () => {
    const args = minimist(process.argv.slice(2), {
      boolean: ["open", "upload", "preview"],
    });
    const { printLog, processTypeEnum } = ctx.helper;
    const platform = ctx.runOpts.options.platform;
    let ci;
    switch (platform) {
      case "weapp":
        ci = new WeappCI(ctx, pluginOpts);
        break;
      default:
        break;
    }
    if (!ci) {
      printLog(processTypeEnum.WARNING, `"插件暂时不支持 "${platform}" 平台`);
      return;
    }
    switch (true) {
      case args.open:
        ci.open();
        break;
      case args.upload:
        ci.upload();
        break;
      case args.preview:
        ci.preview();
        break;
      default:
        break;
    }
  });
};
