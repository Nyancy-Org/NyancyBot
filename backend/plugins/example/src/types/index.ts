export interface Logger {
  log: (args: any) => {};
  error: (args: any) => {};
  debug: (args: any) => {};
  warn: (args: any) => {};
}
