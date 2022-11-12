import React from 'react'
import Head from 'next/head'
import { Button, Input } from '@components/common'
import { Header } from '@components/layout'
import Router from 'next/router'
import { useRecoilState } from 'recoil'
import { userState } from '@components/store/Auth/auth'
import { auth, db } from '../../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useAuthContext } from '@hooks/AuthContext'

export default function Home() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [retryPassword, setRetryPassword] = React.useState('')
  const [isShowCaution, setIsShowCaution] = React.useState(false)
  const [userDetail, setUserDtail] = useRecoilState(userState)
  const [isSignUp, setIsSignUp] = React.useState(true)
  const [nowSubmit, setNowSubmit] = React.useState(false)
  const { user } = useAuthContext()
  const isLogin = !!user
  const [isAlreadyLogin, setIsAlreadyLogin] = React.useState(false)

  const onSubmit = () => {
    if(isLogin) {
      setIsAlreadyLogin(true)
      return
    }

    if (password !== retryPassword) {
      setIsShowCaution(true)
      return
    } else if (
      name == '' ||
      email == '' ||
      password == '' ||
      retryPassword == ''
    ) {
      setIsShowCaution(true)
      return
    }
    setIsShowCaution(false)
    createUserWithEmailAndPassword(auth, email, password)
    setUserDtail({
      name: name,
      email: email,
      password: password,
    })
    const userRef = db.collection('users')
    userRef.add({
      name: name,
      email: email,
      password: password,
    })
    Router.push('/rooms')
    setNowSubmit(true)
  }

  const onLogin = () => {
    if(isLogin) {
      setIsAlreadyLogin(true)
      return
    }

    if (email == '' || password == '') {
      setIsShowCaution(true)
      return
    }
    const userRef = db.collection('users')
    userRef
      .where('email', '==', email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().password == password) {
            setIsShowCaution(false)
            signInWithEmailAndPassword(auth, email, password)
            setUserDtail({
              name: doc.data().name,
              email: doc.data().email,
              password: doc.data().password,
            })
            setNowSubmit(true)
            Router.push('/rooms')
          } else {
            setIsShowCaution(true)
            return
          }
        })
      })
  }

  const SingUp = (
    <div className="flex w-4/5 flex-col items-center rounded-xl bg-white p-5 md:w-3/5">
      <div className="ml-auto">
        <Button
          onClick={() => {
            setIsSignUp(false)
            setIsShowCaution(false)
          }}
        >
          ログイン
        </Button>
      </div>
      <p className="mb-5 text-3xl">新規登録</p>
      <div className="flex flex-col items-center justify-center gap-5">
        <Input onChange={(e) => setName(e.target.value)} placeholder="名前" />
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
        />
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
        />
        <Input
          type="password"
          onChange={(e) => setRetryPassword(e.target.value)}
          placeholder="パスワード（確認）"
        />
        {!nowSubmit ? (
          <Button onClick={onSubmit}>登録</Button>
        ) : (
          <Button>登録中</Button>
        )}
      </div>
      {isShowCaution && (
        <p className="text-red-500">入力内容に誤りがあります</p>
      )}
      {isAlreadyLogin && (
        <p className="text-red-500">すでにログインしています</p>
      )}
    </div>
  )

  const SingIn = (
    <div className="flex w-4/5 flex-col items-center rounded-xl bg-white p-5 md:w-3/5">
      <div className="ml-auto">
        <Button
          onClick={() => {
            setIsSignUp(true)
            setIsShowCaution(false)
          }}
        >
          新規登録
        </Button>
      </div>
      <p className="mb-5 text-3xl">ログイン</p>
      <div className="flex flex-col items-center justify-center gap-5">
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          type="password"
        />
        {!nowSubmit ? (
          <Button onClick={onLogin}>ログイン</Button>
        ) : (
          <Button>ログイン中</Button>
        )}
      </div>
      {isShowCaution && (
        <p className="text-red-500">入力内容に誤りがあります</p>
      )}
      {isAlreadyLogin && (
        <p className="text-red-500">すでにログインしています</p>
      )}
    </div>
  )

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
        {isSignUp ? SingUp : SingIn}
      </main>
    </div>
  )
}
