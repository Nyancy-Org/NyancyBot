import type { AxiosInstance } from "axios";
import type { Logger as Logger_ } from "@/types";

export const utils = {
  axios: {} as AxiosInstance,
  Logger: {} as Logger_,
  admin: [] as number[],
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
