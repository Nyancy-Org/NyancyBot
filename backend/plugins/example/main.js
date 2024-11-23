class ExamplePlugin {
  name = "ExamplePlugin";

  axios() {}
  constructor(axiosInstance) {
    // 初始化插件
    this.axios = axiosInstance;
  }
  onEnable() {
    console.log(`${this.name} 已启用`);
  }

  onDisable() {
    console.log(`${this.name} 已禁用`);
  }

  handleMessage(message) {
    console.log(`${this.name} 收到消息：${message}`);
  }
}

module.exports = ExamplePlugin;
