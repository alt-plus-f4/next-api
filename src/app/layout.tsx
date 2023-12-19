import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CirovBet - the winning place',
  description: 'You can lose only 100% of your money but you can win 1000%..',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={cn(
        'bg-white text-slate-900 antialiased light',
        inter.className
    )}>

      <body className='min-h-screen pt-12 bg-slate-50 antialiased'>
          <Navbar />

          <div className='container max-w-7xl mx-auto h-full pt-12 flex flex-col items-center'>
            {children}
          </div>

          {/* <Toaster/> */}
          
      </body>
    </html>
  )
}
