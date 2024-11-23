import { IsIn, IsNumber } from "class-validator";

export class WsAction {
  @IsIn([1, 0])
  action: number;
}
