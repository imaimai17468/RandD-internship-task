import React, { useEffect } from 'react'
import { Room } from '@components/common'
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

  return (
    <div>
      <div>
        <Header />
      </div>
      <main>
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
