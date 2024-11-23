import { Module } from "@nestjs/common";
import { WsClientService } from "./ws-client.service";
import { PluginsManagerModule } from "../plugins-manager/plugins-manager.module";
import { WsClientController } from "./ws-client.controller";

@Module({
  imports: [PluginsManagerModule],
  providers: [WsClientService],
  controllers: [WsClientController],
  exports: [WsClientService],
})
export class WsClientModule {}
