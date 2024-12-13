import { Logger } from "@nestjs/common";
import { AppConfig } from "src/modules/settings/settings.dto";
import StorageSystem from "src/services/system_storage";

let config: AppConfig | null = null;
export function initConfig() {
  config = StorageSystem.load("AppConfig", AppConfig, "config");
  if (!config) {
    Logger.warn("未检测到配置文件，正在尝试自动创建...");
    config = new AppConfig();
    StorageSystem.store("AppConfig", "config", config);

    // TODO: 在前端配置
    Logger.warn("配置文件创建成功，请配置 data/AppConfig/config.json 文件并重新启动程序");
    process.exit(0);
  }
}

export function saveConfig(_config: AppConfig) {
  StorageSystem.store("AppConfig", "config", _config);
  config = _config;
}

export { config, AppConfig };
