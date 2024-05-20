import { Tag } from '../components/tag-input';

export type UserType = {
  id: string;
  username: string;
  anonNickname?: string;
  email: string;
  password: string;
  name: string;
  birthdate: string | Date;
  status: boolean;
  gender: string;
  about: string;
  photo: string;
  gallery: string[];
  tags: Tag[];
  createdAt: string;
  followers: string[];
  following: string[];
  settings?: settings;
  blocked?: Blocked[];
  location: LocationType;
  badges: Badges
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
export type LocationType = {
  city: string;
  country: string;
}
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
export type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: string;
};

export type Badges = {
  CONVERSATIONS: boolean;
  FOLLOWERS: boolean;
  LIKES: boolean;
  SUPER_MESSAGE: boolean;
}

export type GeneralType =
  | UserType
  | Strings
  | FriendType
  | PostType
  | CommentType
  | settings
  | Notifications
  | Blocked
  | Message;
