import React, { useEffect } from 'react'
import { Textarea, Chat, Button } from '@components/common'
import { Header } from '@components/layout'
import { useRecoilValue } from 'recoil'
import { userState } from '@components/store/Auth/auth'
import { roomState } from '@components/store/Room/room'
import { useRef, useLayoutEffect } from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { db } from '../../firebase'
import Router from 'next/router'

interface ChatProp {
  message: string
  time: string
  name: string
}

const Index: NextPage = () => {
  const [chats, setChats] = React.useState<ChatProp[]>([])
  const [message, setMessage] = React.useState<string>('')
  const user = useRecoilValue(userState)
  const room = useRecoilValue(roomState)

  const placeholderMessage =
    typeof window !== 'undefined' && window.innerWidth > 768
      ? 'メッセージを入力 (Ctrl + Enter or ⌘ + Enter で送信)'
      : 'メッセージを入力してください'

  useEffect(() => {
    const unSub = db
      .collection('chats')
      .orderBy('time', 'asc')
      .onSnapshot((snapshot) => {
        // room_idがroom.room_idと一致していたらchatsに格納する
        const chats = snapshot.docs
          .map((doc) => doc.data())
          .filter((chat) => chat.room_id == room.room_id) as ChatProp[]
        setChats(chats)
      })
    return () => unSub()
  }, [])

  const insertChat = async () => {
    // '../api/chat' に チャット内容を POST する
    await axios.post('../api/chat', {
      message: message,
      name: user.name,
      time: new Date().toLocaleString(),
      room_id: room.room_id,
    })
  }

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
      insertChat()
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
    insertChat()
  }

  const leaveHandler = () => {
    console.log('leave')
    Router.push('/rooms')
  }

  return (
    <div>
      <div>
        <Header />
      </div>
      <main className="align-center mx-auto flex h-90v w-full flex-col items-center justify-center">
        <div className="m-3">
          <Button
            onClick={() => {
              leaveHandler()
            }}
          >
            Leave
          </Button>
        </div>
        <div className="flex h-80v w-full flex-col items-center justify-center rounded-xl bg-primary-2 md:w-4/5">
          <p className="mb-2 text-background-1">{room.title}</p>
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
              <Button size='small' onClick={buttonClickHandler}>送信</Button>
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

export default Index
