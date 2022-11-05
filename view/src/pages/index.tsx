import React from 'react'
import Head from 'next/head'
import { Button, Input } from '@components/common'
import { Header } from '@components/layout'
import Router from 'next/router'

export default function Home() {
  const [name, setName] = React.useState('')
  const [isShowCaution, setIsShowCaution] = React.useState(false)

  const buttonClickHandler = () => {
    if (!name) {
      setIsShowCaution(true)
      return
    } else {
      Router.push('/chatroom')
    }
  }

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  return (
    <div>
      <Head>
        <title>imaimai chat</title>
        <meta name="description" content="this chat generated by imaimai" />
        <link rel="icon" href="/frog.PNG" />
      </Head>
      <div>
        <Header />
      </div>
      <main className="align-center mx-auto flex h-90v w-4/5 flex-col items-center justify-center">
        <h1 className="my-5 text-xl lg:text-5xl">
          ようこそ、いまいまいチャットへ
        </h1>
        <div className="my-2 flex flex-col items-center justify-center gap-5 lg:my-5">
          <p className="text-md lg:text-2xl">名前を入力して始める</p>
          <div className="flex flex-row gap-5">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className='flex flex-row flex-wrap gap-5 justify-center '>
                <Input
                  placeholder="name"
                  required={true}
                  minLength={1}
                  onChange={nameChangeHandler}
                />
                <Button
                  outlined={true}
                  size={'middle'}
                  onClick={buttonClickHandler}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
          <div>
            {isShowCaution && (
              <p className="text-accent-2">名前を入力してください</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
