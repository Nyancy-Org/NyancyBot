import type { AxiosInstance } from "axios";
import type { MessageEvent } from "./types/event";
import { Logger } from "index";

class ExamplePlugin {
  readonly name = "ExamplePlugin";
  readonly version = "1.0.0";
  readonly description = "这是一个示例插件";
  readonly author = "Lazy";

  readonly 群聊白名单: number[] = [];
  readonly 群聊黑名单: number[] = [];

  readonly 私聊白名单: number[] = [];
  readonly 私聊黑名单: number[] = [];

  readonly 仅限管理员使用 = false;

  readonly 管理员: number[] = [];

  axios: AxiosInstance;
  Logger: Logger;
  constructor({
    axios, // axios 实例
    master, // 管理员 QQ 号 []
    Logger,
  }: {
    axios: AxiosInstance;
    master: number[];
    Logger: Logger;
  }) {
    // 初始化插件
    this.axios = axios;
    this.管理员 = master;
    this.Logger = Logger;
  }
  onEnable() {
    console.log(`${this.name} 已启用`);
  }

  onDisable() {
    console.log(`${this.name} 已禁用`);
  }

  handleMessage(msg: MessageEvent) {
    // console.log(`${this.name} 收到消息：${message}`);
    //判断群聊，私聊
    if (msg.message_type == "group") {
      //群聊

      if (this.仅限管理员使用) {
        if (this.管理员.indexOf(msg.sender.user_id) !== -1)
          return this.sendResult(msg.group_id, "群", "/send_group_msg", msg);
        else return;
      }

      if (this.群聊白名单.length > 0) {
        if (this.群聊白名单.indexOf(msg.group_id!) !== -1)
          return this.sendResult(msg.group_id, "群", "/send_group_msg", msg);
        else return;
      }

      if (this.群聊黑名单.length > 0 && this.群聊黑名单.indexOf(msg.group_id) !== -1) return;

      this.sendResult(msg.group_id, "群", "/send_group_msg", msg);
    } else if (msg.message_type == "private") {
      //私聊

      if (this.仅限管理员使用) {
        if (this.管理员.indexOf(msg.sender.user_id) !== -1)
          return this.sendResult(msg.sender.user_id, "私聊", "/send_private_msg", msg);
        else return;
      }

      if (this.私聊白名单.length > 0) {
        if (this.私聊白名单.indexOf(msg.sender.user_id) !== -1)
          return this.sendResult(msg.sender.user_id, "私聊", "/send_private_msg", msg);
        else return;
      }

      if (this.私聊黑名单.length > 0 && this.私聊黑名单.indexOf(msg.sender.user_id) !== -1) return;

      this.sendResult(msg.sender.user_id, "私聊", "/send_private_msg", msg);
    }
  }

  async sendResult(sendTo, msgType, sApi, msg: MessageEvent) {
    if (msg.message[0].type !== "text") return; //只处理文本消息
    const temp = msg.message[0].data.text.split(/[\n\s+,]/g).filter(Boolean);

    this.Logger.log(temp); // string[]
  }
}

module.exports = ExamplePlugin;
