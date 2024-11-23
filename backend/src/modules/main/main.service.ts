import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { NyaResponse } from "src/types";

@Injectable()
export class MainService {
  indexGet(): NyaResponse<any> {
    return {
      code: 233,
      msg: "哇哦？",
      data: [
        {
          id: 1,
          name: "Lazy",
          info: "Author",
        },
      ],
    };
  }
  indexPost() {
    return {
      code: 500,
      msg: "嗯哼？",
      data: [
        {
          id: 1,
          name: "Lazy",
          info: "Author",
        },
      ],
    };
  }
  indexAll() {
    throw new HttpException(
      {
        msg: "fuck",
      },
      HttpStatus.METHOD_NOT_ALLOWED,
    );
  }
}

