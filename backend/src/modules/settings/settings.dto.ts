import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

export class OneBotConfig {
  constructor(c?: { http: string; ws: string; key: string; admin: number[] }) {
    if (!c) return;
    const { http, ws, key, admin } = c;
    this.http = http;
    this.ws = ws;
    this.key = key;
    this.admin = admin;
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
  constructor(c?: { entry: string; autoLoads: string[] }) {
    if (!c) return;
    const { entry, autoLoads } = c;
    this.entry = entry;
    this.autoLoads = autoLoads;
  }
  @IsString()
  entry: string;

  @IsArray()
  autoLoads: string[];
}

export class AppConfig {
  @IsNumber()
  httpPort: number = 1241;

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
