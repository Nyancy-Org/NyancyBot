import type { CmdHandler, CmdTree, CmdFn } from "./types";
import { initConfig, sendSingleMsg, utils as u } from "./utils";

const UwU = "/test";
export const cmd: CmdTree = {
  [UwU]: {
    _: (sender, sendTo, sApi) => {
      sendSingleMsg(sendTo, sApi, `执行 /test 的逻辑`);
    },
    qwq: {
      _: (sender, sendTo, sApi) => sendSingleMsg(sendTo, sApi, "执行 /test qwq 的逻辑"),
      awa: (sender, sendTo, sApi) => sendSingleMsg(sendTo, sApi, "执行 /test qwq awa 的逻辑"),
    },
    reload: {
      _: (sender, sendTo, sApi) => {
        initConfig();
        sendSingleMsg(sendTo, sApi, `插件 ${u.name} 配置文件已重载~`);
      },
    },
  },
};

export const handleCommand = (sender: number, sendTo: number, sApi: string, input: string[]) => {
  if (!input || input[0] !== UwU) return;

  let current: CmdTree | CmdHandler | CmdFn = cmd;

  for (const part of input) {
    if (current[part]) {
      current = current[part];
    } else {
      sendSingleMsg(sendTo, sApi, `未知命令`);
      return;
    }
  }

  if (current._) {
    (current as CmdHandler)._(sender, sendTo, sApi); // 执行命令
  }
};
