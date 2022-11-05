import React from 'react'
import { Textarea } from '@components/common'
import { Header } from '@components/layout'

export default function Home() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <main className="align-center mx-auto flex h-90v w-full flex-col items-center justify-center">
        <div className="flex h-80v w-full flex-col items-center rounded-xl bg-primary-2 lg:w-4/5">
          <div className="mt-7 h-3/5 w-9/10 rounded-3xl border-4 border-double border-primary-1 bg-background-1 "></div>
          <div className="h-1/5 w-9/10">
            <div className="inline-flex w-full items-center justify-center">
              <hr className="my-8 h-1 w-full rounded border-0 bg-background-1 dark:bg-gray-700" />
              <div className="absolute left-1/2 -translate-x-1/2 bg-primary-2 px-4 text-3xl dark:bg-gray-900">
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
