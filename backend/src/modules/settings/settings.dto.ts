import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

export class HttpConfig {
  constructor(init: Partial<HttpConfig>) {
    Object.assign(this, init);
  }

  @IsNumber()
  port: number;
}

export class OneBotConfig {
  constructor(init: Partial<OneBotConfig>) {
    Object.assign(this, init);
  }

  @IsString()
  http: string;

  @IsString()
  ws: string;

  @IsString()
  key: string;

  @IsArray()
  admin: number[];
}

export class PluginConfig {
  constructor(init: Partial<PluginConfig>) {
    Object.assign(this, init);
  }

  @IsString()
  entry: string;

  @IsArray()
  autoLoads: string[];
}

export class AppConfig {
  @ValidateNested()
  @Type(() => HttpConfig)
  http: HttpConfig = new HttpConfig({ port: 1241 });

  // oneBot 配置
  @ValidateNested() // 表示需要递归验证
  @Type(() => OneBotConfig) // 告诉 class-validator 嵌套的类型
  o: OneBotConfig = new OneBotConfig({
    http: "",
    ws: "",
    key: "",
    admin: [],
  });

  @ValidateNested()
  @Type(() => PluginConfig)
  plugin: PluginConfig = new PluginConfig({
    entry: "main.js",
    autoLoads: [],
  });
}
