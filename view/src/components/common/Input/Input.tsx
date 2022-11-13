import React from 'react'

interface Props {
  type?: string
  className?: string
  placeholder?: string
  required?: boolean
  minLength?: number
  disabled?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit?: (e: React.FormEvent<HTMLInputElement>) => void
}

export default function Input(props: Props): JSX.Element {
  const style =
    props.className +
    ' border border-accent-1 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-accent-2 focus:border-transparent'
  const type = props.type ? props.type : 'text'

  return (
    <input
      type={type}
      value={props.value}
      className={style}
      placeholder={props.placeholder}
      required={props.required}
      minLength={props.minLength}
      onChange={props.onChange}
      onSubmit={props.onSubmit}
      disabled={props.disabled}
    />
  )
}
