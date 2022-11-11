import Link from 'next/link'
import { userState } from '@components/store/Auth/auth'
import { useRecoilValue, useRecoilState } from 'recoil'
import { Button } from '@components/common'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase'
import Router from 'next/router'
import { useEffect } from 'react'

export default function Header(): JSX.Element {
  const [user, setUser] = useRecoilState(userState)

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

  return (
    <div className="h-16 w-full bg-primary-1">
      <div className="align-center mx-5 my-auto flex h-full flex-row items-center gap-10 p-0">
        <Link href="/">
          <p className=" text-xl text-text-main-white lg:text-3xl">
            imaimai chat
          </p>
        </Link>
        <div className="ml-auto flex flex-row gap-5 text-xl text-text-main-white">
          {user.name == '' ? (
            <Link href="/auth">
              <p className="text-sm text-text-main-white lg:text-xl">
                ログイン / 新規登録
              </p>
            </Link>
          ) : (
            <div className="flex flex-row items-center gap-3">
              <Button onClick={handleSignOut}>ログアウト</Button>
              <p>{user.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
