import { FC } from 'react'
import { User } from '@prisma/client'
import { AvatarProps } from '@radix-ui/react-avatar'
import { Icons } from '@/components/Icons'
import { Avatar, AvatarFallback } from '@/components/Avatar'
import Image from 'next/image'

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'image' | 'name'>
}

const UserAvatar : FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className='relative aspect-square h-full w-full'>
          <Image
            fill
            src={user.image}
            alt='profile picture'
            referrerPolicy='no-referrer'
            sizes='100%'
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user?.name}</span>
          <Icons.user className='h-4 w-4' />
        </AvatarFallback>
      )}
    </Avatar>
  )
}

export default UserAvatar;