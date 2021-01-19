export interface User {
  _id: any;
  provider: string;
  googleId?: string;
  facebookId?: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  photo: string;
  sources: Array;
  joined: Date;
}
