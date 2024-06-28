export type ChatMessage = {
  id: string;
  createdAt: string; // Date yerine string
  recipientId: string;
  senderId: string;
  text: string;
  documents?: string[];
};

export type Message = {
  id: string;
  text: string;
  createdAt: string;
};

export type ChatParticipant = {
  id: string;
  userName: string;
  anonNick: string;
  profileImage: string;
};

export type ChatDocument = {
  messages: {[messageId: string]: ChatMessage};
  participants: ChatParticipant[];
};

export type ChatState = {
  [chatId: string]: ChatDocument;
};
