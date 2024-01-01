import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./Button";
import { getServerSession } from "next-auth/next";
import UserAccountNav from "./UserAccountNav";
import SignIn from "./SignIn";

const Navbar = async () => {

  const session = await getServerSession();
  const balance = 10.00;

    return (
      <div className='fixed top-0 inset-x-0 h-fit z-[10] py-2 nav-col'>
        <div className='container max-w-none h-full mx-auto px-8 flex items-center justify-between gap-2'>
          <Link href='/' className='flex gap-2 items-center'>
            <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' color="#FF5700" />
            <p className='hidden text-sm font-medium md:block'>Cirovbet</p>
          </Link>

          {/** User BALANCE HERE */}

          {session?.user ? (
          <div className="profile-corner">
            <Link href="/balance" className="profile-balance-link">${balance.toFixed(2)}</Link>
            <UserAccountNav user={session.user}/>
          </div>
          ): (<Link href='/sign-in' className='sign-in-btn'> Sign In</Link>)}

        </div>
      </div>
    )
  }
  export default Navbar