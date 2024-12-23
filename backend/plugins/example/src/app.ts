import type { AxiosInstance } from "axios";
import type { MessageEvent } from "./types/event";
import type { Config, Logger as Logger_, StorageSubsystem } from "./types";
import { initConfig, saveConfig as _saveConfig, utils as u } from "./utils";
import { handleCommand } from "./commands";
import { ConfigTranslate } from "./types/const";

class ExamplePlugin {
  readonly name = "ExamplePlugin";
  readonly version = "1.0.0";
  readonly description = "这是一个示例插件";
  readonly author = "Lazy";
  readonly 系统管理员: number[] = [];

  axios: AxiosInstance;
  Logger: Logger_;
  storage: StorageSubsystem;
  constructor({
    axios, // axios 实例
    master, // 管理员 QQ 号 []
    Logger: Logger_,
    storage,
  }: {
    axios: AxiosInstance;
    master: number[];
    Logger: Logger_;
    storage: StorageSubsystem;
  }) {
    // 初始化插件
    this.axios = u.axios = axios;
    this.系统管理员 = u.admin = master;
    this.Logger = u.Logger = Logger_;
    this.storage = u.storage = storage;
    u.name = this.name;
  }

  onEnable() {
    this.Logger.log(`${this.name} 已启用`);
    initConfig();
  }

  onDisable() {
    this.Logger.log(`${this.name} 已禁用`);
  }

  handleMessage(msg: MessageEvent) {
    // console.log(`${this.name} 收到消息：${message}`);
    //判断群聊，私聊
    if (msg.message_type == "group") {
      //群聊

      if (u.config.仅限管理员使用) {
        if (
          this.系统管理员.indexOf(msg.sender.user_id) !== -1 ||
          u.config.管理员.indexOf(msg.sender.user_id) !== -1
        )
          return this.sendResult(msg.sender.user_id, msg.group_id, "群", "/send_group_msg", msg);
        else return;
      }

      if (u.config.群聊白名单.length > 0) {
        if (u.config.群聊白名单.indexOf(msg.group_id!) !== -1)
          return this.sendResult(msg.sender.user_id, msg.group_id, "群", "/send_group_msg", msg);
        else return;
      }

      if (u.config.群聊黑名单.length > 0 && u.config.群聊黑名单.indexOf(msg.group_id) !== -1)
        return;

      this.sendResult(msg.sender.user_id, msg.group_id, "群", "/send_group_msg", msg);
    } else if (msg.message_type == "private") {
      //私聊

      if (u.config.仅限管理员使用) {
        if (
          this.系统管理员.indexOf(msg.sender.user_id) !== -1 ||
          u.config.管理员.indexOf(msg.sender.user_id) !== -1
        )
          return this.sendResult(
            msg.sender.user_id,
            msg.sender.user_id,
            "私聊",
            "/send_private_msg",
            msg,
          );
        else return;
      }

      if (u.config.私聊白名单.length > 0) {
        if (u.config.私聊白名单.indexOf(msg.sender.user_id) !== -1)
          return this.sendResult(
            msg.sender.user_id,
            msg.sender.user_id,
            "私聊",
            "/send_private_msg",
            msg,
          );
        else return;
      }

      if (u.config.私聊黑名单.length > 0 && u.config.私聊黑名单.indexOf(msg.sender.user_id) !== -1)
        return;

      this.sendResult(msg.sender.user_id, msg.sender.user_id, "私聊", "/send_private_msg", msg);
    }
  }

  async sendResult(
    sender: number,
    sendTo: number,
    msgType: string,
    sApi: string,
    msg: MessageEvent,
  ) {
    if (msg.message[0].type !== "text") return; //只处理文本消息
    const temp = msg.message[0].data.text.split(/[\n\s+,]/g).filter(Boolean); // string[]
    // const sender = `[${msg.sender.nickname}] (${msg.sender.user_id})`;
    // this.Logger.log(`[${msgType}] ${sendTo} ${sender}：${temp}`);
    handleCommand(sender, sendTo, sApi, temp);
  }

  getConfig() {
    return Object.entries(u.config).map(([key, value]) => ({
      name: key,
      note: ConfigTranslate[key] ?? key,
      value: value,
    }));
  }

  saveConfig(_config: Config) {
    _saveConfig(_config);
  }
}

module.exports = ExamplePlugin;
