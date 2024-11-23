import { Module } from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { SettingsController } from "./settings.controller";
import { PluginsManagerModule } from "../plugins-manager/plugins-manager.module";
import { WsClientModule } from "../ws-client/ws-client.module";

@Module({
  imports: [PluginsManagerModule, WsClientModule],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
