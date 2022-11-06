interface Props {
  position: 'left' | 'right'
  message: string
  name: string
  time: string
  className?: string
}

export default function Chat(props: Props): JSX.Element {
  const namePosition =
    (props.position === 'left' ? 'mr-auto' : 'ml-auto') +
    ' text-primary-1 text-lg font-bold'
  const timePosition =
    (props.position === 'left' ? 'ml-auto' : 'mr-auto') +
    ' text-primary-1 text-sm'
  const messagePosition =
    (props.position === 'left' ? 'mr-auto' : 'ml-auto') +
    ' flex w-3/5 md:w-2/5 flex-col gap-1'
  return (
    <div className={messagePosition}>
      <p className={namePosition}>{props.name}</p>
      <div className="rounded-xl bg-primary-2 p-3">
        <p className="whitespace-pre-wrap break-words text-background-1">
          {props.message}
        </p>
      </div>
      <p className={timePosition}>{props.time}</p>
    </div>
  )
}
