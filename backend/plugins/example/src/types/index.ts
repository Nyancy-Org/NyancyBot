export interface Logger {
  log: (args: any) => {};
  error: (args: any) => {};
  debug: (args: any) => {};
  warn: (args: any) => {};
}

export type CmdFn = (sendTo: number, sApi: string) => void;
export interface CmdHandler {
  _: (sendTo: number, sApi: string) => void;
  [key: string]: CmdHandler | CmdFn;
}

export interface CmdTree {
  [key: string]: CmdHandler | CmdTree;
}
