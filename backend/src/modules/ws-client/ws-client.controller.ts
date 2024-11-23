import { Controller, Get, Post, Body, Delete, Query } from "@nestjs/common";
import { WsClientService } from "./ws-client.service";
import { WsAction } from "./ws-client.dto";

@Controller("ws")
export class WsClientController {
  constructor(private readonly wsClientService: WsClientService) {}

  @Get()
  getStatus() {
    const s = this.wsClientService.getStatus();
    return {
      msg: s ? "已连接" : "未连接",
      data: {
        status: s,
      },
    };
  }

  @Post("action")
  sendMessage(@Body() body: WsAction) {
    if (body.action) this.wsClientService.startWs();
    else this.wsClientService.stop();
    return {};
  }
}
