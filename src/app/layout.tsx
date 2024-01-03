import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CirovBet - The Winning Place',
  description: 'You can lose only 100% of your money but you can win 1000%..',
}

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode,
  authModal: React.ReactNode
}) {
  return (
    <html lang='en' className={cn(
        'bg-white text-slate-900 antialiased light',
        inter.className
    )}>

      <body className='min-h-screen pt-12 bg-slate-50 antialiased'>
        
          <Navbar />

          {authModal}
          {children}

          <Toaster />

		      <div className='footer'> Gamble irresponsibly </div>
      </body>
    </html>
  )
}
