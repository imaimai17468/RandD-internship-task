import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const roomState = atom({
  key: 'room',
  default: {
    id: 1,
    title: 'Room 1',
  },
  effects_UNSTABLE: [persistAtom],
})
