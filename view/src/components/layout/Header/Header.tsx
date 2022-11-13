import Link from 'next/link'
import { userState } from '@components/store/Auth/auth'
import { useRecoilValue, useRecoilState } from 'recoil'
import { Button } from '@components/common'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase'
import Router from 'next/router'
import { useEffect, useState } from 'react'

export default function Header(): JSX.Element {
  const [user, setUser] = useRecoilState(userState)
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const initValue = {
    id: -1,
    name: '',
    email: '',
  }

  const handleSignOut = () => {
    setUser(initValue)
    signOut(auth)
    Router.push('/')
  }

  const isNotLoginHeader = (
    <Link href="/auth">
      <p className="text-sm text-text-main-white lg:text-xl">
        ログイン / 新規登録
      </p>
    </Link>
  )

  const openMenuHandler = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  const menu = (
    <div className="absolute top-16 right-5 flex h-20v w-1/3 flex-col items-center justify-center gap-5 rounded-lg bg-white shadow-lg md:w-1/6">
      {/* ホバーすると影がつく背景が白色のボタン */}
      <button className="h-1/3 w-3/5 rounded-lg hover:shadow-lg">
        <p className="mt-2 text-lg text-black">マイページ</p>
      </button>
      <Button onClick={handleSignOut}>ログアウト</Button>
    </div>
  )

  const isLoginHeader = (
    <div className="ml-auto flex w-1/2 flex-row items-center justify-center md:w-1/5">
      <button
        onClick={openMenuHandler}
        className="group flex h-full w-full flex-row items-center justify-center gap-3 rounded-lg hover:bg-primary-2"
      >
        <p className="text-sm md:text-xl">{user.name}</p>
        <p className="text-xl text-white transition duration-300 group-hover:rotate-180">
          🐸
        </p>
      </button>
      {isOpenMenu && menu}
    </div>
  )

  return (
    <div className="h-16 w-full bg-primary-1">
      <div className="align-center mx-5 flex h-full flex-row items-center justify-between gap-10 p-0">
        <Link href="/">
          <p className=" text-md text-text-main-white md:text-3xl">
            imaimai chat
          </p>
        </Link>
        <div className="flex h-full flex-1 flex-row gap-5 text-xl text-text-main-white">
          {user.name == '' ? isNotLoginHeader : isLoginHeader}
        </div>
      </div>
    </div>
  )
}
