export interface Text {
  type: "text";
  data: {
    text: string;
  };
}

// QQ 表情
export interface Face {
  type: "face";
  data: {
    id: string;
  };
}

// 图片
export interface Image {
  type: "image";
  data: {
    type?: "flash"; // 闪照
    file?: string;
    url?: string;
    cache?: 0 | 1;
    proxy?: 0 | 1; // 是否通过代理下载文件
    timeout?: any; // 下载超时时间
  };
}

// 语音
export interface Record {
  type: "record";
  data: {
    file?: string;
    url?: string;
    magic?: 0 | 1; // 是否变声
    cache?: 0 | 1;
    proxy?: 0 | 1; // 是否通过代理下载文件
    timeout?: any; // 下载超时时间
  };
}

// 短视频
export interface Video {
  type: "video";
  data: {
    file?: string;
    url?: string;
    cache?: 0 | 1;
    proxy?: 0 | 1; // 是否通过代理下载文件
    timeout?: any; // 下载超时时间
  };
}

// 音乐
export interface Music {
  type: "music";
  data: {
    type: "qq" | "163" | "xm" | "custom";
    id: string; // 歌曲 ID
    // type 为 custom 时必填
    url?: string; // 点击后跳转目标 URL
    audio?: string; // 音乐 URL
    title?: string; // 音乐标题
    content?: string; // 发送时可选，音乐描述
    image?: string; // 发送时可选，音乐封面 URL
  };
}

// @某人
export interface At {
  type: "at";
  data: {
    qq: string | "all";
  };
}

// 猜拳魔法表情
export interface Rps {
  type: "rps";
  data: {};
}

// 掷骰子魔法表情
export interface Dice {
  type: "dice";
  data: {};
}

// 窗口抖动（戳一戳最基本类型）
export interface Shake {
  type: "shake";
  data: {};
}

// 戳一戳
export interface Poke {
  type: "poke";
  data: {
    // 自己看
    // https://github.com/mamoe/mirai/blob/f5eefae7ecee84d18a66afce3f89b89fe1584b78/mirai-core/src/commonMain/kotlin/net.mamoe.mirai/message/data/HummerMessage.kt#
    id: string;
    type: string;
    name?: string;
  };
}

// 匿名发消息
export interface Anonymous {
  type: "anonymous";
  data: {
    [key: string]: any;
  };
}

// 链接分享
export interface Share {
  type: "share";
  data: {
    url: string; // 分享链接
    title: string; // 标题
    content?: string; // 发送时可选，内容描述
    image?: string; // 发送时可选，图片 URL
  };
}

// 推荐好友
export interface FriendRec {
  type: "contact";
  data: {
    type: "qq";
    id: string; // 被推荐人的 QQ 号
  };
}

// 推荐群
export interface GroupRec {
  type: "contact";
  data: {
    type: "group";
    id: string; // 被推荐群的群号
  };
}

// 位置
export interface Location {
  type: "location";
  data: {
    lat: number; // 纬度
    lng: number; // 经度
    title?: string; // 发送时可选，位置名称
    content?: string; // 发送时可选，位置详情
  };
}

// 回复
export interface Reply {
  type: "reply";
  data: {
    id: string; // 回复时引用的 message_id
  };
}

// 合并转发
export interface Forward {
  type: "forward";
  data: {
    id: string; // 合并转发 ID，需通过 get_forward_msg API 获取具体内容
  };
}

// 合并转发节点
export interface ForwardNode {
  type: "node";
  data: {
    id: string; // 要转发的消息 ID
    [key: string]: any;
  };
}

// XML 消息
export interface Xml {
  type: "xml";
  data: {
    data: string;
  };
}

// JSON 消息
export interface Json {
  type: "json";
  data: {
    data: string;
  };
}

export type Segment =
  | Text
  | Face
  | Image
  | Record
  | Video
  | Music
  | At
  | Rps
  | Dice
  | Shake
  | Poke
  | Anonymous
  | Share
  | FriendRec
  | GroupRec
  | Location
  | Reply
  | Forward
  | ForwardNode
  | Xml
  | Json;
