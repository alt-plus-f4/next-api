'use client';

import { signIn } from "next-auth/react";

export default function Profile() {
    return <button onClick={() => signIn("github")} className='sign-in-btn'>Sign In</button>;
}