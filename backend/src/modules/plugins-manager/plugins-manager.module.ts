import { Module } from "@nestjs/common";
import { PluginsManagerService } from "./plugins-manager.service";
import { PluginsManagerController } from "./plugins-manager.controller";

@Module({
  controllers: [PluginsManagerController],
  providers: [PluginsManagerService],
  exports: [PluginsManagerService],
})
export class PluginsManagerModule {}
