export type UserType = {
  id: string;
  username: string;
  email: string;
  password: string;
  name: string;
  birthdate: string;
  gender: string;
  about: string;
  photo: string;
  gallery: string[];
  tags: string[];
  createdAt: string;
  followers: string[];
  following: string[];
  settings: settings;
  blocked: Blocked[];
};
export type Strings = {
  [key: string]: string;
};
export type FriendType = {
  id: string;
  username: string;
  about: string;
  createdAt: string;
};
export type PostType = {
  id: string;
  text: string;
  photo: string;
  date: string;
  user: UserType;
  likes: UserType[];
  comments: CommentType[];
};
export type CommentType = {
  id: string;
  text: string;
  date: string;
  user: UserType;
};
export type settings = {
  lastSeen: boolean;
  notifications: Notifications;
  showShuffle: boolean;
  help: string;
};
export type Notifications = {
  information: boolean;
  audio: boolean;
  text: boolean;
  video: boolean;
  photo: boolean;
  story: boolean;
};
export type Blocked = {
  username: string;
  userId: string;
};
