import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from "@nestjs/common";
import * as WebSocket from "ws";
import { PluginsManagerService } from "../plugins-manager/plugins-manager.service";
import { config } from "src/utils/config";

@Injectable()
export class WsClientService implements OnModuleInit, OnModuleDestroy {
  private ws: WebSocket;
  private readonly NO_WS_ADDR_ERROR = "未配置 WebSocket 地址！";
  private status: boolean;
  constructor(private readonly pluginManager: PluginsManagerService) {}

  getStatus() {
    return this.status;
  }

  startWs() {
    if (!config.o.ws) throw new Error(this.NO_WS_ADDR_ERROR);
    if (this.ws) throw new Error("WebSocket 已经启动！");

    this.ws = new WebSocket(`${config.o.ws}?access_token=${config.o.key}`);

    this.ws.on("message", (evt: WebSocket.Data | any) => {
      const msg = JSON.parse(evt.toString());
      this.pluginManager.handleWebSocketMessage(msg); // 转发给插件
    });

    this.ws.on("open", () => {
      this.status = true;
      Logger.log("WebSocket 已连接");
    });

    this.ws.on("close", () => {
      this.status = false;
      this.ws = null;
      Logger.error("WebSocket 已断开");
    });
  }

  stop() {
    if (!this.ws) throw new Error("WebSocket 未启动！");
    this.ws.close();
    this.ws = null;
  }

  onModuleInit() {
    if (!config.o.ws) Logger.warn(this.NO_WS_ADDR_ERROR);
    else this.startWs();
  }

  onModuleDestroy() {
    if (this.ws) {
      this.ws.close(); // 关闭 WebSocket
    }
  }
}
