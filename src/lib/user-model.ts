
import { User as NextAuthUser } from 'next-auth';

export interface User extends NextAuthUser {
  id: string;
  name: string;
  email: string;
  image: string;
}