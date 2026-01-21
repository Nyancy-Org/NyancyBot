export class Config {
  群聊白名单: number[] = [];
  群聊黑名单: number[] = [];

  私聊白名单: number[] = [];
  私聊黑名单: number[] = [];

  仅限管理员使用: boolean = true;

  管理员: number[] = [];
}

export interface Logger {
  log: (args: any) => {};
  error: (args: any) => {};
  debug: (args: any) => {};
  warn: (args: any) => {};
}

export type CmdFn = (sender: number, sendTo: number, sApi: string, ...args: string[]) => void;
export interface CmdHandler {
  _: CmdFn;
  [key: string]: CmdHandler | CmdFn;
}

export interface CmdTree {
  [key: string]: CmdHandler | CmdTree;
}

export interface StorageSubsystem {
  // 静态只读属性，存储数据路径
  readonly DATA_PATH: string;

  // 私有方法：检查文件名是否合法
  checkFileName(name: string): boolean;

  // 写入文件
  writeFile(name: string, data: string): void;

  // 读取文件
  readFile(name: string): string;

  // 读取目录
  readDir(dirName: string): string[];

  // 删除文件
  deleteFile(name: string): void;

  // 检查文件是否存在
  fileExists(name: string): boolean;

  // 存储对象到文件
  store(category: string, uuid: string, object: any): void;

  // 深拷贝属性的受保护方法
  defineAttr(target: any, object: any): any;

  // 从文件加载对象
  load(category: string, instance: any, uuid: string): any;

  // 列出特定类别的所有标识符
  list(category: string): string[];

  // 删除特定类别和标识符的对象
  delete(category: string, uuid: string): void;
}
