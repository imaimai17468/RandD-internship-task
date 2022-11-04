import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Textarea } from '@components/common'
import { Header } from '@components/layout'

export default function Home() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <main className="align-center mx-auto flex h-90v w-4/5 flex-col items-center justify-center">
        <div className="h-80v w-4/5 rounded-xl bg-primary-2 flex flex-col items-center">
          <div className='h-3/5 w-9/10 bg-background-1 rounded-3xl mt-7 border-double border-4 border-primary-1 '>

          </div>
          <div className="h-1/5 w-9/10">
            <div className="inline-flex justify-center items-center w-full">
              <hr className="my-8 w-full h-1 bg-background-1 rounded border-0 dark:bg-gray-700" />
              <div className="absolute left-1/2 px-4 bg-primary-2 text-3xl -translate-x-1/2 dark:bg-gray-900">
                🐸
              </div>
            </div>
            <Textarea
              className="h-full w-full rounded-xl bg-background-1 text-primary-1"
              placeholder="メッセージを入力"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
