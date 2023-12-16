"use client"

import { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { signIn } from "next-auth/react"
import { Icons } from "./Icons";
import { useToast } from "@/lib/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement>{
    
}
 
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

    return (
    <div className={cn('flex justify-center', className)} {...props}>
        <Button  onClick={loginWithGoogle} isLoading={isloading} size='sm' className="w-full">
            {isloading ? null : <Icons.google className="h-4 w-4 mr-2"/>}
            Google
        </Button>
    </div>
    )
}
 
export default UserAuthForm;