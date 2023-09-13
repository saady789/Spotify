import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import Sidebar from './components/Sidebar'
const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Enjoy your favourite songs on My spotify ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className='h-screen w-full bg-black flex'>
        <div className='h-full w-1/5  md:flex-col lg:flex-col'> <Sidebar /> </div>
          <div className='h-full w-4/5 ml-4 m-2'>{children}</div>
         

        </div>
       
        </body>
    </html>
  )
}
