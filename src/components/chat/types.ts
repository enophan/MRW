export interface ChatMessage {
  role: "user" | "assistant",
  content: string | undefined,
};

export interface SparkAPICredentials {
  APPID: string,
  APIKey: string,
  APISecret: string,
};

export interface UserData {
  id: string
}