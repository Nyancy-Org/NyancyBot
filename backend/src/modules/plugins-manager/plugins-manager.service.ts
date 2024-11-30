import { Injectable, OnModuleDestroy, Logger } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import * as fs from "fs-extra";
import * as path from "path";
import { config, saveConfig } from "src/utils/config";

@Injectable()
export class PluginsManagerService implements OnModuleDestroy {
  private plugins: Map<string, any> = new Map(); // 存储插件实例
  private readonly pluginsDir = path.resolve(process.cwd(), "plugins");
  private readonly entryFile: string;
  _axios: AxiosInstance;

  constructor() {
    this.entryFile = config.plugin.entry;
    if (!fs.existsSync(this.pluginsDir)) fs.mkdirSync(this.pluginsDir);
    this.initBasePacket();
    this.autoLoads();
  }

  initBasePacket() {
    this._axios = axios.create({
      baseURL: config.o.http,
      headers: {
        Authorization: "Bearer " + config.o.key,
      },
    });
    Logger.log("初始化基础包：" + JSON.stringify(config.o));
  }

  list() {
    const all = fs.readdirSync(this.pluginsDir).filter((i) => {
      const itemPath = path.join(this.pluginsDir, i);
      return (
        fs.statSync(itemPath).isDirectory() && fs.existsSync(path.join(itemPath, this.entryFile))
      );
    });

    const loaded = Array.from(this.plugins.keys());

    const autoLoads = config.plugin.autoLoads;

    return {
      data: all.map((i) => {
        return {
          name: i,
          enabled: loaded.includes(i),
          autoLoad: autoLoads.includes(i),
        };
      }),
    };
  }

  async load(plugin: string) {
    const pluginFolderPath = path.join(this.pluginsDir, plugin);
    const pluginPath = path.join(pluginFolderPath, this.entryFile);

    if (!fs.existsSync(pluginPath)) throw new Error(`插件 ${plugin} 不存在`);
    if (this.plugins.has(plugin)) throw new Error(`插件 ${plugin} 已经加载`);

    const pluginModule = await import(pluginPath); // 动态加载插件
    const PluginClass = pluginModule?.default || pluginModule;

    if (typeof PluginClass !== "function") {
      this.clearCache(plugin);
      throw new Error(`${plugin} 无效的插件😅🤜🏼 导出不合法`);
    }

    const pluginInstance = new PluginClass(this._axios); // 创建插件实例
    if (
      typeof pluginInstance.onEnable !== "function" ||
      typeof pluginInstance.onDisable !== "function"
    ) {
      throw new Error(`${plugin} 无效的插件😅🤜🏼 缺少必要的方法 (onEnable/onDisable)`);
    }
    this.plugins.set(plugin, pluginInstance);

    if (typeof pluginInstance.onEnable === "function") {
      pluginInstance.onEnable(); // 调用插件的启用方法
    }
  }

  async disable(pluginName: string) {
    const pluginInstance = this.plugins.get(pluginName);
    if (!pluginInstance) throw new Error(`插件 ${pluginName} 未加载`);
    if (typeof pluginInstance.onDisable === "function") {
      pluginInstance.onDisable(); // 调用插件的禁用方法
    }
    this.plugins.delete(pluginName);

    this.clearCache(pluginName);
  }

  async toggleEnabled(name: string) {
    if (this.plugins.has(name)) {
      await this.disable(name);
      return false;
    } else {
      await this.load(name);
      return true;
    }
  }

  // 可能删不掉，没权限？
  async remove(pluginName: string) {
    try {
      await this.disable(pluginName); // 先禁用插件
    } catch {}
    const pluginPath = path.join(this.pluginsDir, pluginName);
    if (!fs.existsSync(pluginPath)) throw new Error(`插件 ${pluginName} 不存在`);

    if (fs.existsSync(pluginPath)) {
      fs.unlinkSync(pluginPath); // 删除插件文件
    }
  }

  // 已加载的插件
  loadedList() {
    return {
      data: Array.from(this.plugins.keys()),
    };
  }

  // 自启动列表
  autoLoadList() {
    return {
      data: config.plugin.autoLoads,
    };
  }

  // 设置为自启动
  setAutoLoad(name: string, enable: boolean) {
    const autoLoads = config.plugin.autoLoads;
    const includes = autoLoads.includes(name);
    if (includes) {
      if (enable) throw new Error(`插件 ${name} 已经是自启动`);
      else autoLoads.splice(autoLoads.indexOf(name), 1);
    } else {
      if (enable) {
        autoLoads.push(name);
      } else throw new Error(`插件 ${name} 不是自启动`);
    }

    saveConfig(config);
  }

  // 自启动插件
  private async autoLoads() {
    const ps = config.plugin.autoLoads;
    Logger.warn("==========================");
    Logger.warn(`自启动插件： ${ps.length} 个`);
    Logger.warn("==========================");
    if (ps) {
      ps.forEach(async (p, i) => {
        Logger.log(`正在加载第 ${i + 1} 个插件: ${p}`);
        await this.load(p);
      });
    }
  }

  // 清除缓存
  private clearCache(pluginName: string) {
    const pluginFolderPath = path.join(this.pluginsDir, pluginName);
    const pluginPath = path.join(pluginFolderPath, this.entryFile);
    delete require.cache[require.resolve(pluginPath)];
  }

  handleWebSocketMessage(message: any) {
    this.plugins.forEach((plugin) => {
      if (typeof plugin.handleMessage === "function") {
        plugin.handleMessage(message);
      }
    });
  }

  onModuleDestroy() {
    this.plugins.forEach((_, pluginName) => this.disable(pluginName)); // 停止所有插件
  }
}
