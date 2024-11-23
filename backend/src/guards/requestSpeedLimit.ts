import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { getParamsByExecutionContext } from "src/utils";

@Injectable()
export class RequestSpeedLimitGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { session } = getParamsByExecutionContext(context);

    if (!session) return true;
    if (session) {
      // TODO: implement speed limit
    }

    return true;
  }
}
