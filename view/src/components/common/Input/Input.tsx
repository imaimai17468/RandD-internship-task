import React from 'react'

interface Props {
  className?: string
  placeholder?: string
  required?: boolean
  minLength?: number
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit?: (e: React.FormEvent<HTMLInputElement>) => void
}

export default function Input(props: Props): JSX.Element {
  const style = props.className + ' border border-accent-1 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-accent-2 focus:border-transparent'

  return (
    <input
      type='text'
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
