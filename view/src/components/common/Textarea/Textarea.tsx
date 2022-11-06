interface Props {
  className?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

export default function Textarea(props: Props): JSX.Element {
  const style =
    props.className +
    ' border border-primary-1 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent'
  return (
    <textarea
      className={style}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
    />
  )
}
