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
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { useAuthContext } from '@hooks/AuthContext'
import GoogleButton from 'react-google-button'

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
  const [cautionContent, setCautionContent] = React.useState('')

  const onSubmit = () => {
    if (isLogin) {
      setCautionContent('すでにログインしています')
      setIsShowCaution(true)
      return
    }

    if (password !== retryPassword) {
      setCautionContent('パスワードが一致しません')
      setIsShowCaution(true)
      return
    } else if (
      name == '' ||
      email == '' ||
      password == '' ||
      retryPassword == ''
    ) {
      setCautionContent('入力されていない項目があります')
      setIsShowCaution(true)
      return
    }

    // すでに登録されてる名前かメールアドレスかを確認
    db.collection('users')
      .where('email', '==', email)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          setCautionContent('すでに登録されているメールアドレスです')
          setIsShowCaution(true)
          return
        } else {
          setIsShowCaution(false)
          createUserWithEmailAndPassword(auth, email, password)
          // firestoreにユーザー情報を保存
          // idは自動生成される
          db.collection('users').add({
            name: name,
            email: email,
            password: password,
          })
          // recoilのuserStateを更新
          // firestoreから取得したidをuserStateに保存
          db.collection('users')
            .where('email', '==', email)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                setUserDtail({
                  id: doc.id,
                  name: name,
                  email: email,
                  password: password,
                })
              })
            })
          Router.push('/rooms')
          setNowSubmit(true)
        }
      })
  }

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    // dbにユーザー情報を保存
    // すでに登録済みの場合は保存しない
    const userRef = db.collection('users')
    const snapshot = await userRef.where('email', '==', user.email).get()
    if (snapshot.empty) {
      userRef.add({
        name: user.displayName,
        email: user.email,
        password: '',
      })
    }

    // recoilのuserStateを更新
    // firestoreから取得したidをuserStateに保存
    db.collection('users')
      .where('email', '==', user.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserDtail({
            id: doc.id,
            name: user.displayName,
            email: user.email,
            password: '',
          })
        })
      })

    Router.push('/rooms')
  }

  const onLogin = () => {
    if (isLogin) {
      setCautionContent('すでにログインしています')
      setIsShowCaution(true)
      return
    }

    if (email == '' || password == '') {
      setCautionContent('入力されていない項目があります')
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
              id: doc.id,
              name: doc.data().name,
              email: doc.data().email,
              password: doc.data().password,
            })
            setNowSubmit(true)
            Router.push('/rooms')
          } else {
            setCautionContent('パスワードが間違っています')
            setIsShowCaution(true)
            return
          }
        })
      })
  }

  const SingUp = (
    <div className="flex w-full flex-col items-center rounded-xl bg-white p-5 md:w-4/5 md:w-3/5">
      <div className="ml-auto mb-5">
        <Button
          onClick={() => {
            setIsSignUp(false)
            setIsShowCaution(false)
          }}
          outlined={true}
        >
          ログインへ
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
      {isShowCaution && <p className="mt-3 text-red-500">{cautionContent}</p>}
      <div className="my-5 flex w-4/5 flex-col items-center gap-4">
        <div className="flex w-full items-center">
          <div className="mr-3 flex-grow border-t border-primary-1"></div>
          <p className="text-gray-500">または</p>
          <div className="ml-3 flex-grow border-t border-primary-1"></div>
        </div>
        <div>
          <GoogleButton onClick={signInWithGoogle} />
        </div>
      </div>
    </div>
  )

  const SingIn = (
    <div className="flex w-full flex-col items-center rounded-xl bg-white p-5 md:w-4/5 md:w-3/5">
      <div className="ml-auto mb-5">
        <Button
          onClick={() => {
            setIsSignUp(true)
            setIsShowCaution(false)
          }}
          outlined={true}
        >
          新規登録へ
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
      {isShowCaution && <p className="mt-3 text-red-500">{cautionContent}</p>}
      <div className="my-5 flex w-4/5 flex-col items-center gap-4">
        <div className="flex w-full items-center">
          <div className="mr-3 flex-grow border-t border-primary-1"></div>
          <p className="text-gray-500">または</p>
          <div className="ml-3 flex-grow border-t border-primary-1"></div>
        </div>
        <div>
          <GoogleButton onClick={signInWithGoogle} />
        </div>
      </div>
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
