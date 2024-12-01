import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import * as session from "express-session";
import { initConfig, config } from "./utils/config";
import { v4 } from "uuid";
import { AppModule } from "./app.module";
import { getLoggerService } from "./utils/logger";
import { GlobalResponseInterceptor } from "./interceptors/response.interceptor";
import { GlobalExceptionFilter } from "./interceptors/http-exception.filter";

import { RequestSpeedLimitGuard } from "./guards/requestSpeedLimit";

async function bootstrap() {
  console.log(`

███╗   ██╗██╗   ██╗ █████╗ ███╗   ██╗ ██████╗██╗   ██╗
████╗  ██║╚██╗ ██╔╝██╔══██╗████╗  ██║██╔════╝╚██╗ ██╔╝
██╔██╗ ██║ ╚████╔╝ ███████║██╔██╗ ██║██║      ╚████╔╝ 
██║╚██╗██║  ╚██╔╝  ██╔══██║██║╚██╗██║██║       ╚██╔╝  
██║ ╚████║   ██║   ██║  ██║██║ ╚████║╚██████╗   ██║   
╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝   ╚═╝   
  
  + Copyright (C) ${new Date().getFullYear()} Lazy All right reserved
  `);

  initConfig();

  const app = await NestFactory.create(AppModule, {
    logger: getLoggerService(),
  });

  app.use(
    session({
      secret: v4(),
      resave: false,
      cookie: {
        maxAge: 60 * 1000 * 60 * 240,
      },
      saveUninitialized: true,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动剔除 DTO 中未定义的字段，如 "test"
      forbidNonWhitelisted: true, // 如果有未定义的字段，抛出错误
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new GlobalResponseInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalGuards(new RequestSpeedLimitGuard());
  app.setGlobalPrefix("api");

  await app.listen(config.http.port);
  Logger.log(`服务已启动：${await app.getUrl()}`);
}
bootstrap();
