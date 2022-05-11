export enum Role {
  User = 'User',
  Admin = 'Admin'
}

export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  language: string;
  role: Role;
  userUrlImage: string;
  token?: string;
}
