
import { User as NextAuthUser } from 'next-auth';

export interface User extends NextAuthUser {
  id: number;
  name: string;
  email: string;
  image: string;
}