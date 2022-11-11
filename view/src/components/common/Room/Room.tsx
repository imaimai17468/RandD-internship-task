import Button from '../Button'
import Modal from '../Modal'
import { useRecoilState } from 'recoil'
import { roomState } from '@components/store/Room/room'
import Router from 'next/router'
import { db } from '../../../firebase'
import { useState } from 'react'

interface Props {
  title: string
  room_id: number
  description: string
  created_at: string
  className?: string
}

export default function Room(props: Props): JSX.Element {
  const [room, setRoom] = useRecoilState(roomState)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const buttonClickHandler = () => {
    // roomStateを更新する
    // titleとidを更新する
    setRoom({
      title: props.title,
      room_id: props.room_id,
    })
    Router.push('/chatroom')
  }

  const handleOpenDeleteModal = () => {
    setIsOpen(true)
  }

  const handleDeleteRoom = async (title: string) => {
    const roomRef = db.collection('rooms').where('title', '==', title)
    const snapshot = await roomRef.get()
    snapshot.forEach((doc) => {
      doc.ref.delete()
    })
  }

  return (
    <div className="mx-auto w-4/5 rounded-xl bg-primary-2">
      <div>
        {isOpen && (
          <Modal setisOpen={setIsOpen}>
            <div className="text-center">
              <p className="text-2xl font-bold">本当に削除しますか？</p>
              <div className="flex justify-center my-10 gap-5">
                <Button
                  outlined={true}
                  onClick={() => {
                    handleDeleteRoom(props.title)
                    setIsOpen(false)
                  }}
                >
                  削除する
                </Button>
                <Button outlined={true} onClick={() => setIsOpen(false)}>
                  キャンセル
                </Button>
              </div>
            </div>
          </ Modal>
        )}
      </div>
      <div className="p-5">
        <div className="flex flex-col items-center justify-center">
          <div className="flex w-full flex-row items-center justify-between gap-5">
            <p className="text-3xl text-background-1">{props.title}</p>
            <div className='flex flex-row gap-3'>
              <Button
                onClick={handleOpenDeleteModal}
                outlined={true}
              >
                ルームを削除
              </Button>
              <Button onClick={buttonClickHandler}>Enter</Button>
            </div>
          </div>
          <div className="inline-flex w-full items-center justify-center">
            <hr className="my-5 h-1 w-full rounded border-0 bg-background-1 dark:bg-gray-700" />
            <div className="absolute left-1/2 -translate-x-1/2 bg-primary-2 px-4 text-3xl dark:bg-gray-900">
              🦎
            </div>
          </div>
          <p className="mr-auto text-background-1">{props.description}</p>
          <p className="ml-auto text-background-1">{props.created_at}</p>
        </div>
      </div>
    </div>
  )
}
