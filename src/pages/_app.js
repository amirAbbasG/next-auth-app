import { Poppins } from "@next/font/google"
import { SessionProvider } from "next-auth/react"

import '@/styles/globals.css'


const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: "300"
})

export default function App({ Component, pageProps }) {
  return (
    <main className={`${poppins.variable} font-sans`}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  )
}
