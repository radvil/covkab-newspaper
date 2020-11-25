import { Role } from './role';

export interface IUser {
  _id: string;
  name: string;
  nik: string;
  phone: string;
  role: Role;
  token?: string;
  password: string;
  confirmPassword: string;
  residence: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
}