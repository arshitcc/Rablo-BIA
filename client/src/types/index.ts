export interface IProduct {
  _id: string;
  name: string;
  price: number;
  isFeatured: boolean;
  rating: number;
  company: string;
  createadAt: Date;
  updatedAt: Date;
}

export interface IUser {
  _id: string;
  fullname: string;
  email: string;
  username: string;
  loginType: string;
  avatar: object;
  role: string;
  isEmailVerified: boolean;
}
