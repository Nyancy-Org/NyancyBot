import { Injectable } from "@nestjs/common";
import { PluginsManagerService } from "../plugins-manager/plugins-manager.service";
import { WsClientService } from "../ws-client/ws-client.service";
import { config, saveConfig } from "src/utils/config";
import { AppConfig } from "./settings.dto";
import * as _ from "lodash";

@Injectable()
export class SettingsService {
  constructor(
    private readonly pluginManager: PluginsManagerService,
    private readonly wsClient: WsClientService,
  ) {}
  list() {
    return {
      data: config,
    };
  }

  update(_config: AppConfig) {
    saveConfig(_config);
    Object.assign(config, _config);

    if (!_.isEqual(config.o, _config.o)) {
      // 更新 OneBot 信息后需要手动重载插件
      this.pluginManager.initBasePacket();
      this.wsClient.stop();
      this.wsClient.startWs();
    }

    return {
      msg: "更新成功",
    };
  }
}
