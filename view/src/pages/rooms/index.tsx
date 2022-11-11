import React, { useEffect } from 'react'
import { Room, Button, Modal } from '@components/common'
import { Header } from '@components/layout'
import axios from 'axios'
import { NextPage } from 'next'
import { db } from '../../firebase'
import { roomState } from '@components/store/Room/room'
import { useRecoilValue, useRecoilState } from 'recoil'

interface RoomProp {
  title: string
  description: string
  created_at: string
}

const Index: NextPage = () => {
  const [rooms, setRooms] = React.useState<RoomProp[]>([])
  const [title, setTitle] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [room, setRoom] = useRecoilState(roomState)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState<boolean>(false)

  useEffect(() => {
    setRoom({ room_id: '', title: '', description: '' })
  }, [])

  useEffect(() => {
    const unSub = db
      .collection('rooms')
      .orderBy('created_at', 'asc')
      .onSnapshot((snapshot) => {
        setRooms(
          snapshot.docs.map(
            (doc) =>
              ({
                title: doc.data().title,
                description: doc.data().description,
                created_at: doc.data().created_at,
              } as RoomProp),
          ),
        )
      })
    return () => unSub()
  }, [])

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleCreateRoom = async () => {
    const roomRef = db.collection('rooms').doc()
    await roomRef.set({
      title: title,
      description: description,
      created_at: new Date().toLocaleString(),
    })
    setRoom({ title: title, description: description, created_at: new Date().toLocaleDateString()})
    setIsOpen(false)
  }

  return (
    <div>
      <div>
        {isOpen && (
          <Modal setisOpen={setIsOpen}>
            <div className="flex flex-col items-center justify-center gap-5 my-5">
              <div className="w-4/5">
                <input
                  type="text"
                  placeholder="タイトル"
                  className="focus:border-transparent w-full rounded-lg border-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="w-4/5">
                <textarea
                  placeholder="説明"
                  className="focus:border-transparent w-full rounded-lg border-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="ml-auto">
                <Button
                  onClick={async () => {
                    await handleCreateRoom()
                  }}
                >
                  作成
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
      <div>
        <Header />
      </div>
      <main>
        <div className="mx-auto flex w-4/5 flex-row items-center justify-between">
          <p className="mt-8 text-4xl">ルーム一覧</p>
          <Button outlined={true} onClick={handleOpen}>
            ルーム作成
          </Button>
        </div>
        <div className="mt-10 flex flex-col gap-10">
          {rooms.map((room, index) => (
            <Room
              key={index}
              title={room.title}
              description={room.description}
              created_at={room.created_at}
              room_id={index}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Index
