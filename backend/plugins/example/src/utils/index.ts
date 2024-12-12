import type { AxiosInstance } from "axios";
import type { Config, Logger as Logger_, StorageSubsystem } from "@/types";

export const utils = {
  axios: {} as AxiosInstance,
  Logger: {} as Logger_,
  admin: [] as number[],
  storage: {} as StorageSubsystem,
  config: {} as Config,
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
