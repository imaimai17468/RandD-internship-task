import type { NextApiRequest, NextApiResponse } from 'next'
const { cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const serviceAccount = require('../../firebase-test-serviceAccount.json') // 秘密鍵を取得
const admin = require('firebase-admin')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const COLLECTION_NAME = 'chats'
  // 初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    })
  }
  const db = getFirestore()

  if (req.method === 'POST') {
    const docRef = db.collection(COLLECTION_NAME).doc()
    const insertData = {
      time: req.body.time,
      message: req.body.message,
      name: req.body.name,
      room_id: req.body.room_id,
    }
    docRef.set(insertData)
  } else if (req.method === 'GET') {
    // データを取得する
    // 時間の降順で取得する
    const doc = await db
      .collection(COLLECTION_NAME)
      .orderBy('time', 'asc')
      .get()
    res.status(200).json(doc.docs.map((doc: any) => doc.data()))
  }
  res.status(200)
}
