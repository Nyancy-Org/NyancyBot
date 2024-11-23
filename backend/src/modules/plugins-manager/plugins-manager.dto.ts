import { IsBoolean, IsString } from "class-validator";

export class PluginAutoLoad {
  @IsString()
  name: string;

  @IsBoolean()
  enabled: boolean;
}

export class PluginNameDto {
  @IsString()
  name: string;
}
