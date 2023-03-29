import Head from 'next/head'
import Link from 'next/link'

import { useSession, signOut, getSession } from 'next-auth/react'

import styles from '@/styles/Home.module.css'



export default function Home() {
  const { data: session } = useSession()


  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="next auth app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session ? User({ session }) : Guest()}
    </>
  )
}

// Guest
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className='text-4xl font-bold'>Guest Homepage</h3>

      <div className='flex justify-center'>
        <Link href={'/login'} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign In</Link>
      </div>
    </main>
  )
}

// Authorize User
function User({ session }) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className='text-4xl font-bold'>Authorize User Homepage</h3>

      <div className='details'>
        <h5>{session?.user?.name}</h5>
        <h5>{session?.user?.email}</h5>
      </div>

      <div className="flex justify-center">
        <button onClick={signOut} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign Out</button>
      </div>

      <div className='flex justify-center'>
        <Link href={'/profile'} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Profile Page</Link>
      </div>
    </main>
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}