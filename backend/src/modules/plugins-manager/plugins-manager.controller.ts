import { Controller, Get, Post, Body, Delete, Query } from "@nestjs/common";
import { PluginsManagerService } from "./plugins-manager.service";
import { PluginAutoLoad, PluginNameDto } from "./plugins-manager.dto";

@Controller("plugins")
export class PluginsManagerController {
  constructor(private readonly pluginsManagerService: PluginsManagerService) {}

  @Get()
  list() {
    return this.pluginsManagerService.list();
  }

  @Get("loaded")
  loadedList() {
    return this.pluginsManagerService.loadedList();
  }

  @Post("load")
  async loadPlugin(@Body() body: PluginNameDto) {
    const { name } = body;
    await this.pluginsManagerService.load(name);
    return {
      msg: `插件 ${name} 已加载`,
    };
  }

  @Post("reload")
  async reloadPlugin(@Body() body: PluginNameDto) {
    const { name } = body;
    await this.pluginsManagerService.disable(name);
    await this.pluginsManagerService.load(name);
    return { msg: `插件 ${name} 已重载` };
  }

  @Post("disable")
  async disablePlugin(@Body() body: PluginNameDto) {
    const { name } = body;
    await this.pluginsManagerService.disable(name);
    return { msg: `插件 ${name} 已禁用` };
  }

  @Post("toggle/enabled")
  async toggleEnabled(@Body() body: PluginNameDto) {
    const { name } = body;
    const status = await this.pluginsManagerService.toggleEnabled(name);
    return { msg: `插件 ${name} 已${status ? "启用" : "禁用"}` };
  }

  @Delete()
  async removePlugin(@Query() query: PluginNameDto) {
    const { name } = query;
    await this.pluginsManagerService.remove(name);
    return { msg: `插件 ${name} 已移除` };
  }

  @Post("initBasePacket")
  async initBasePacket() {
    this.pluginsManagerService.initBasePacket();
    return {
      msg: `插件基础包已设置`,
    };
  }

  // 自启动插件列表
  @Get("autoLoads")
  autoLoadList() {
    return this.pluginsManagerService.autoLoadList();
  }

  // 设置为自启动
  @Post("autoLoad")
  setAutoLoad(@Body() body: PluginAutoLoad) {
    const { name, enabled } = body;
    this.pluginsManagerService.setAutoLoad(name, enabled);
    return {
      msg: `设置成功`,
    };
  }
}
