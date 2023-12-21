'use client'

import { signIn } from "next-auth/react";


export default function SignIn() {
  return <button onClick={() => signIn("github")} className='sign-in-btn'>Sign In</button>;
}