export type UserType = {
  id: string;
  email: string;
  password: string;
  username: string;
  photo: string;
  about: string;
  createdAt: string;

  friends?: UserType[];
  posts?: PostType[];
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

