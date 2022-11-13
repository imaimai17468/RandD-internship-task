import React, { useEffect } from 'react'
import { Room, Button, Modal, Input } from '@components/common'
import { Header } from '@components/layout'
import { NextPage } from 'next'
import { db } from '../../firebase'
import { roomState } from '@components/store/Room/room'
import { userState } from '@components/store/Auth/auth'
import { useRecoilValue, useRecoilState } from 'recoil'
import { useAuthContext } from '@hooks/AuthContext'
import Router from 'next/router'

interface RoomProp {
  title: string
  description: string
  created_at: string
}

interface UserProp {
  email: string
  password: string
  name: string
}

const Index: NextPage = () => {
  const { user } = useAuthContext()
  const isLogin = !!user
  const [isShowLoginModal, setIsShowLoginModal] = React.useState<boolean>(false)
  const [userDetail, setUserDetail] = useRecoilState(userState)
  const [name, setName] = React.useState<string>(userDetail.name)
  const [email, setEmail] = React.useState<string>(userDetail.email)
  const [password, setPassword] = React.useState<string>(userDetail.password)
  const [isSave, setIsSave] = React.useState<boolean>(false)
  const [changeContent, setChangeContent] = React.useState<string>('')

  useEffect(() => {}, [name, email, password])

  const backToAuthPage = (
    <Modal noCloseButton={true}>
      <div className="flex flex-col items-center justify-center">
        <p className="text-center text-2xl font-bold">
          ログインまたは新規登録をしてください
        </p>
        <div className="my-4 flex justify-center">
          <Button
            onClick={() => {
              Router.push('/auth')
            }}
          >
            ログインまたは新規登録
          </Button>
        </div>
      </div>
    </Modal>
  )

  // ボタンが押されたらユーザー情報を更新
  const userChangeHanlder = () => {
    db.collection('users')
      .where('email', '==', email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection('users').doc(doc.id).update({
            name: name,
          })
        })
      })

    // 元の名前のチャットを更新
    db.collection('chats')
      .where('email', '==', email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection('chats').doc(doc.id).update({
            name: name,
          })
        })
      })

    setUserDetail({
      ...userDetail,
      name: name,
    })
    setChangeContent(`ユーザー名を${name}に変更しました`)
    setIsSave(true)
  }

  return (
    <div>
      {!isLogin && isShowLoginModal && backToAuthPage}
      <div>
        <Header />
      </div>
      <main>
        <div className="mx-auto mt-8 flex w-full flex-col items-center justify-center rounded-xl bg-white md:w-4/5">
          <div className="flex flex-col justify-start gap-5 py-10 text-lg md:p-10 md:text-2xl">
            <div className="flex flex-row items-center gap-4">
              <p>Name：</p>
              <Input
                value={name}
                className="w-1/2"
                onChange={(e) => setName(e.target.value)}
              />
              <Button onClick={userChangeHanlder}>変更</Button>
            </div>
            <div className="flex flex-row items-center gap-4">
              <p>Email：{userDetail.email}</p>
            </div>
          </div>
          {isSave && <p className="my-5 text-xl">{changeContent}</p>}
        </div>
      </main>
    </div>
  )
}

export default Index
