import Button from '../Button/Button'

interface Props {
  children: React.ReactNode
  setisOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Modal(props: Props): JSX.Element {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50'>
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-3/5 w-4/5 bg-white rounded-lg'>
        <div className='flex flex-col items-center h-full'>
        <div className='w-4/5 flex justify-start mt-10'>
          <Button outlined={true} onClick={() => props.setisOpen(false)}>
            閉じる
          </Button>
          </div>
          <div className='w-4/5'>{props.children}</div>
        </div>
      </div>
    </div>
  )
}