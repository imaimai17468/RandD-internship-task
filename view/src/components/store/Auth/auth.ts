import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const userState = atom({
  key: 'user',
  default: {
    id: '',
    name: '',
    email: '',
    password: '',
  },
  effects_UNSTABLE: [persistAtom],
})
