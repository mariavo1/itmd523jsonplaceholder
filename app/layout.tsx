import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ITMD 523 JSONPlaceholder',
  description: 'This is my jsonplaceholder project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${inter.className} bg-sky-50`}>
        <div className='bg-pink-200 absolute top-[-9rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem]'></div>
        <div className='bg-purple-200 absolute top-[-1rem] -z-10 left-[-10rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem]'></div>
        {children}
      </body>
    </html>
  )
}
