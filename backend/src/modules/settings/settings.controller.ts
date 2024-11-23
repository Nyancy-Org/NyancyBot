import { Controller, Get, Body, Put } from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { AppConfig } from "./settings.dto";

@Controller("settings")
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  list() {
    return this.settingsService.list();
  }

  @Put()
  update(@Body() body: AppConfig) {
    return this.settingsService.update(body);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.settingsService.remove(+id);
  // }
}
