import { ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export function getParamsByExecutionContext(ctx: ExecutionContext): {
  request: Request;
  session: any;
} {
  const request = ctx.switchToHttp().getRequest<Request>();
  const session = request.session;
  return {
    request,
    session,
  };
}
