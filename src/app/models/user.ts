export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IToken {
  token: string;
}
