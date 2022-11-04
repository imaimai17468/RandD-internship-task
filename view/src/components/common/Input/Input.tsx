import React from 'react'

interface Props {
  className?: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input(props: Props): JSX.Element {
  const style = props.className + ' border border-accent-1 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-accent-2 focus:border-transparent'

  return (
    <input
      className={style}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  )
}
