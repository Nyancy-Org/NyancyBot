import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MainModule } from "./modules/main/main.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { PluginsManagerModule } from "./modules/plugins-manager/plugins-manager.module";
import { WsClientModule } from "./modules/ws-client/ws-client.module";
import { SettingsModule } from "./modules/settings/settings.module";
import * as path from "path";
import { responseMiddleware } from "./middlewares/response";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), "public"),
      serveRoot: "/",
    }),
    MainModule,
    PluginsManagerModule,
    WsClientModule,
    SettingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(responseMiddleware).forRoutes("*");
  }
}
