import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Table } from './table'

export const metadata: Metadata = {
  title: 'Home',
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const fetchPosts = async (pageParam: string) => {
  await new Promise((res) => setTimeout(res, 2000))

  const res = await fetch(
    `http://localhost:3000/posts?_page=${pageParam}&_per_page=5`,
  )
  return res.json()
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const pageParam = params.page as string
  const finalPageParam =
    pageParam && String(pageParam).length > 0 ? pageParam : '1'

  const promise = fetchPosts(finalPageParam)

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center space-y-4 p-5'>
      <h1 className='text-3xl font-bold'>Hello world!</h1>

      <Suspense
        fallback={
          <div className='animate-pulse text-5xl font-bold text-green-400'>
            Loading...
          </div>
        }
      >
        <Table postsPromise={promise} />
      </Suspense>
    </div>
  )
}
