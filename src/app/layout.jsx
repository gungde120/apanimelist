import { Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Apanime',
  description: 'My First Next.js App :)',
  icons: {
    icon: '/icon.png', // /public path
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-color-primary` } suppressContentEditableWarning={true}>
        <Navbar />
        <div className='mx-auto p-4 lg:max-w-5xl bg-color-white border border-color-accent border-t-0 border-b-0 min-h-screen'>
          {children}
        </div>
        <footer className='p-3 bg-color-white flex items-center justify-center text-xs border border-t-1 border-b-0 border-l-0 border-r-0 border-color-accent'>2024 - Simple Next.js app by 
        <a className='hover:font-bold transition-all' href='https://linktr.ee/alphasvara' target="_blank">&nbsp;Alphasvara</a> </footer>
      </body>
    </html>
  )
}
