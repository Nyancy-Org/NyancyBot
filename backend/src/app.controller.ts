import { Controller, Get, Res } from "@nestjs/common";
import { join } from "path";
import { Response } from "express";

@Controller()
export class AppController {
  @Get("") // 捕获所有未匹配的路由
  handleVueRoutes(@Res() res: Response) {
    res.sendFile(join(__dirname, "..", "public", "index.html")); // 返回 Vue 的入口文件
  }
}
