import { sendSingleMsg } from "./utils";

const UwU = "/test";
export const cmd = {
  [UwU]: {
    _: () => console.log("执行 /test 的逻辑"),
    qwq: {
      _: () => console.log("执行 /test qwq 的逻辑"),
      awa: () => console.log("执行 /test qwq awa 的逻辑"),
    },
  },
};

export const handleCommand = (sendTo: number, sApi: string, input: string[]) => {
  if (!input || input[0] !== UwU) return;

  let current = cmd;

  for (const part of input) {
    if (current[part]) {
      current = current[part];
    } else {
      sendSingleMsg(sendTo, sApi, `未知命令`);
      return;
    }
  }

  if ((current as any)._) {
    (current as any)._(); // 执行命令
  }
};
