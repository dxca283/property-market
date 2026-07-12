export interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  unread: number;
  time: string;
}