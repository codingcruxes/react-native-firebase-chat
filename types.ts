export type UserInfo = {
  uid: string;
  displayName: string;
  email: string;
  photoUrl: string;
};

export type Message = {
  id: string;
  text: string;
  senderId: string;
  photoUrl: string;
  username: string;
  time: string;
};
