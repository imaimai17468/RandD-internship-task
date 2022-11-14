import React, { useEffect } from 'react'
import { Room, Button, Modal, Input } from '@components/common'
import { Header } from '@components/layout'
import { NextPage } from 'next'
import { db, auth } from '../../firebase'
import { roomState } from '@components/store/Room/room'
import { userState } from '@components/store/Auth/auth'
import { useRecoilValue, useRecoilState } from 'recoil'
import { useAuthContext } from '@hooks/AuthContext'
import Router from 'next/router'
import { updatePassword } from 'firebase/auth'

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
  const [nowPassword, setNowPassword] = React.useState<string>('')
  const [newPassword, setNewPassword] = React.useState<string>('')
  const [reNewPassword, setReNewPassword] = React.useState<string>('')
  const [isSave, setIsSave] = React.useState<boolean>(false)
  const [changeContent, setChangeContent] = React.useState<string>('')
  const [isShowCaution, setIsShowCaution] = React.useState<boolean>(false)
  const [cautionContent, setCautionContent] = React.useState<string>('')

  useEffect(() => {}, [nowPassword, newPassword, reNewPassword])

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
    if (!isLogin) {
      setIsShowLoginModal(true)
      return
    }
    setIsShowLoginModal(false)

    if (nowPassword != userDetail.password) {
      setCautionContent('現在のパスワードが違います')
      setIsShowCaution(true)
      return
    } else if (newPassword != reNewPassword) {
      setCautionContent('新しいパスワードが一致しません')
      setIsShowCaution(true)
      return
    } else if (newPassword == '' || reNewPassword == '' || nowPassword == '') {
      setCautionContent('入力されていない項目があります')
      setIsShowCaution(true)
      return
    } else if (nowPassword == newPassword) {
      setCautionContent('現在のパスワードと同じです')
      setIsShowCaution(true)
      return
    }
    setIsShowCaution(false)

    db.collection('users')
      .doc(userDetail.id)
      .update({
        password: newPassword,
      })
      .then(() => {
        setChangeContent('パスワードを変更しました')
        setIsSave(true)
      })
      .catch((error) => {
        console.log(error)
      })

    setUserDetail({
      ...userDetail,
      password: newPassword,
    })

    if (auth.currentUser) {
      updatePassword(auth.currentUser, newPassword)
    }
  }

  return (
    <div>
      {!isLogin && isShowLoginModal && backToAuthPage}
      <div>
        <Header />
      </div>
      <main>
        <div className="mx-auto mt-8 flex w-full flex-col items-center justify-center rounded-xl bg-white md:w-4/5">
          <div className="flex w-4/5 flex-col justify-start gap-5 py-10 text-sm md:p-10 md:text-xl">
            <div className="grid grid-cols-2 items-center justify-items-center gap-2">
              <p>元のパスワード</p>
              <Input onChange={(e) => setNowPassword(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 items-center justify-items-center gap-4">
              <p>新しいパスワード</p>
              <Input type='password' onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 items-stretch justify-items-center gap-4">
              <p className="">再入力</p>
              <Input type='password' onChange={(e) => setReNewPassword(e.target.value)} />
            </div>
          </div>
          <div className="mb-3">
            <Button onClick={userChangeHanlder}>変更</Button>
          </div>
          {isSave && <p className="my-5 text-xl">{changeContent}</p>}
          {isShowCaution && (
            <p className="text-red my-5 text-xl">{cautionContent}</p>
          )}
        </div>
      </main>
    </div>
  )
}

export default Index
