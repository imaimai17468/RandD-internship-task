import React from 'react'
import { Textarea, Chat, Button } from '@components/common'
import { Header } from '@components/layout'
import { useRecoilValue } from 'recoil'
import { userState } from '@components/store/Auth/auth'
import { useRef, useLayoutEffect } from 'react'

interface ChatProp {
  message: string
  time: string
  name: string
}

export default function Home() {
  const [chats, setChats] = React.useState<ChatProp[]>([])
  const [message, setMessage] = React.useState<string>('')
  const user = useRecoilValue(userState)
  // 画面サイズでplaceholderを変更する
  const placeholderMessage =
    window.innerWidth > 768
      ? 'メッセージを入力 (Ctrl + Enter or ⌘ + Enter で送信)'
      : 'メッセージを入力'

  const scrollBottomRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView()
  }, [chats])

  const keyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && message && (e.ctrlKey || e.metaKey)) {
      const newChat = {
        message: message,
        time: new Date().toLocaleString(),
        name: user.name,
      }
      setChats([...chats, newChat])
      setMessage('')
    }
  }

  const buttonClickHandler = () => {
    const newChat = {
      message: message,
      time: new Date().toLocaleString(),
      name: user.name,
    }
    setChats([...chats, newChat])
    setMessage('')
  }

  return (
    <div>
      <div>
        <Header />
      </div>
      <main className="align-center mx-auto flex h-90v w-full flex-col items-center justify-center">
        <div className="flex h-80v w-full flex-col items-center justify-center rounded-xl bg-primary-2 md:w-4/5">
          <div className="h-1/2 w-9/10 overflow-y-scroll rounded-3xl border-4 border-double border-primary-1 bg-background-1">
            <div className="h-95/100 mx-auto my-3 flex w-95/100 flex-col">
              {chats.map((chat) => {
                const position = chat.name === user.name ? 'right' : 'left'
                return (
                  <Chat
                    key={chat.time}
                    position={position}
                    message={chat.message}
                    time={chat.time}
                    name={chat.name}
                  />
                )
              })}
              <div ref={scrollBottomRef} />
            </div>
          </div>
          <div className="h-2/5 w-9/10">
            <div className="inline-flex w-full items-center justify-center">
              <hr className="my-5 h-1 w-full rounded border-0 bg-background-1 dark:bg-gray-700" />
              <div className="absolute left-1/2 -translate-x-1/2 bg-primary-2 px-4 text-3xl dark:bg-gray-900">
                🐸
              </div>
            </div>
            <div className="mb-2 flex flex-row items-center justify-between">
              <p className="font-bold text-background-1">{user.name}</p>
              <Button onClick={buttonClickHandler}>送信</Button>
            </div>
            <Textarea
              className="h-3/5 w-full rounded-xl bg-background-1 text-primary-1"
              placeholder={placeholderMessage}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={keyDownHandler}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
