import Button from '../Button/Button'

interface Props {
  children: React.ReactNode
  setisOpen: React.Dispatch<React.SetStateAction<boolean>>
  setShowCaution?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Modal(props: Props): JSX.Element {
  return (
    <div className="fixed top-0 left-0 z-50 h-full w-full bg-black bg-opacity-50">
      <div className="fixed top-1/2 left-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white md:w-3/5">
        <div className="flex h-full flex-col items-center">
          <div className="mt-10 flex w-4/5 justify-start">
            <Button
              outlined={true}
              onClick={() => {
                props.setisOpen(false)
                if (props.setShowCaution) {
                  props.setShowCaution(false)
                }
              }}
            >
              閉じる
            </Button>
          </div>
          <div className="w-4/5">{props.children}</div>
        </div>
      </div>
    </div>
  )
}
