"use client"

import { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { signIn } from "next-auth/react"
import { Icons } from "./Icons";
import { useToast } from "./ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement>{}

const UserAuthForm: FC<UserAuthFormProps> = ({className, ...props}) => {

    const [isloading, setIsloading] = useState<boolean>(false)
    const { toast } = useToast();

    const loginWithGoogle = async () => {
        setIsloading(true)

        try{
            await signIn('google')
        } catch(error){
            toast({
                title: 'There was a problem.',
                description: 'There  was an error loggin in with Google',
                variant: 'destructive',
            })
        } finally{
            setIsloading(false)
        }

    }

    const loginWithGithub = async () => {
        setIsloading(true)

        try{
            await signIn('github')
        } catch(error){
            toast({
                title: 'There was a problem.',
                description: 'There  was an error loggin in with Github',
                variant: 'destructive',
            })
        } finally{
            setIsloading(false)
        }

    }

    return (
    <div className={cn('flex justify-center flex-col', className)} {...props}>
        <Button  onClick={loginWithGoogle} isLoading={isloading} size='sm' className="w-full flex-row my-5">
            {isloading ? null : <Icons.google className="h-4 w-4 mr-2"/>}
            Google
        </Button>
        <Button  onClick={loginWithGithub} isLoading={isloading} size='sm' className="w-full flex-row">
            {isloading ? null : <Icons.logo className="h-4 w-4 mr-2"/>}
            GitHub
        </Button>
    </div>
    )
}
export default UserAuthForm;