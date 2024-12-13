import { Segment } from "./message";

export interface Sender {
  user_id: number; // 发送者 QQ 号
  nickname: string; // 发送者昵称
  sex: "male" | "female" | "unknown";
  age: number;
}

// 公共消息字段
export interface BaseMessage {
  self_id: number; // 收到事件的机器人 QQ 号
  user_id: number; // 发送者 QQ 号
  time: number; // 事件发生的时间戳
  message_id: number;
  real_id: number;
  message_seq: number;
  raw_message: string;
  font: number;
  message: Segment[];
  message_format: "array";
  post_type: "message" | "meta_event"; // 上报类型
}

// 群组消息
export interface GroupMessage extends BaseMessage {
  message_type: "group";
  group_id: number;
  sub_type: "normal" | "anonymous" | "notice"; // 消息子类型，普通消息/匿名消息/系统提示
  anonymous?: {
    // 匿名消息
    id: number; // 匿名用户ID
    name: string; // 匿名用户名称
    flag: string; // 匿名用户 flag，在调用禁言 API 时需要传入
  };
  sender: Sender & {
    card?: string; // 群名片／备注
    area: string; // 地区
    level: number; // 成员等级
    role: "owner" | "admin" | "member"; // 角色
    title: string; // 专属头衔
  };
}

// 私信消息
export interface SelfMessage extends BaseMessage {
  message_type: "private";
  sub_type: "friend";
  sender: Sender;
}

export type MessageEvent = GroupMessage | SelfMessage;
