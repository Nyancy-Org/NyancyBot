import type { AxiosInstance } from "axios";
import type { Config as Config_, Logger as Logger_, StorageSubsystem } from "@/types";

// TODO: BUG,,,,
import { Config } from "../types";

export const utils = {
  name: "",
  axios: {} as AxiosInstance,
  Logger: {} as Logger_,
  admin: [] as number[],
  storage: {} as StorageSubsystem,
  config: {} as Config_,
};

export const sendSingleMsg = async (sendTo: number, sApi: string, text: string) => {
  const { axios, Logger } = utils;
  try {
    await axios.post(sApi, {
      user_id: sendTo,
      group_id: sendTo,
      message: [
        {
          type: "text",
          data: {
            text,
          },
        },
      ],
    });
  } catch (e: any) {
    Logger.error(`发送失败：${e.message}`);
  }
};

export const initConfig = () => {
  const u = utils;
  let config: Config;
  config = u.storage.load("plugins", Config, u.name);

  if (!config) {
    u.Logger.warn(`未检测到插件 ${u.name} 配置文件，正在尝试自动创建...`);
    config = new Config();
    u.storage.store("plugins", u.name, config);
  }
  u.config = config;
};

export const saveConfig = (_config: Config) => utils.storage.store("plugins", utils.name, _config);
