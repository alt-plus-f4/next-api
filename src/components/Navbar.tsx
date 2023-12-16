import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./Button";
import { getServerSession } from "next-auth/next";
import UserAccountNav from "./UserAccountNav";
import { options } from "../app/api/auth/[...nextauth]/options"
import { toast } from "@/lib/use-toast";

const Navbar = async () => {

  const session = await getServerSession(options);

    return (
      <div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2'>
        <div className='container max-w-none h-full mx-auto px-8 flex items-center justify-between gap-2'>
          <Link href='/' className='flex gap-2 items-center'>
            <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' color="#FF5700" />
            <p className='hidden text-zinc-700 text-sm font-medium md:block'>Cirovbet</p>
          </Link>

          {session?.user ? (
            <UserAccountNav user={session.user}/>
          ): (<Link href="/sign-in" className={buttonVariants()}>Sign In</Link>)}

        </div>
      </div>
    )
  }
  
  export default Navbar