import type { CmdHandler, CmdTree, CmdFn } from "index";
import { sendSingleMsg } from "./utils";

const UwU = "/test";
export const cmd: CmdTree = {
  [UwU]: {
    _: (sendTo, sApi) => {
      sendSingleMsg(sendTo, sApi, `执行 /test 的逻辑`);
    },
    qwq: {
      _: (sendTo, sApi) => sendSingleMsg(sendTo, sApi, "执行 /test qwq 的逻辑"),
      awa: (sendTo, sApi) => sendSingleMsg(sendTo, sApi, "执行 /test qwq awa 的逻辑"),
    },
  },
};

export const handleCommand = (sendTo: number, sApi: string, input: string[]) => {
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
    (current as CmdHandler)._(sendTo, sApi); // 执行命令
  }
};
