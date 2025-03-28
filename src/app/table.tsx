'use client'

import { Button } from '@/components/ui/button'
import { parseAsInteger, useQueryState } from 'nuqs'
import { use } from 'react'

type Props = {
  postsPromise: Promise<any>
}

type Post = {
  data: {
    id: string
    title: string
    views: number
  }[]
}

export const Table = ({ postsPromise }: Props) => {
  const { data: posts }: Post = use(postsPromise)
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({
      shallow: false,
    }),
  )

  return (
    <div className='flex h-screen w-full max-w-2xl flex-col items-center justify-center gap-8'>
      <ul className='flex w-full flex-col gap-3'>
        {posts.map((post) => (
          <li
            className='flex items-center justify-between gap-2 border-b border-b-border'
            key={post.id}
          >
            <span className='text-lg font-bold'>{post.title}</span>
            <span className='text-sm font-medium'>{post.views} views</span>
          </li>
        ))}
      </ul>

      <span className='text-lg text-red-400'>Page: {page}</span>

      <Button className='w-full' onClick={() => setPage((p) => p + 1)}>
        Next
      </Button>
    </div>
  )
}
