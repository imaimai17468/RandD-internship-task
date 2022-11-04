import React from 'react'

interface Props {
  outlined?: boolean
  size?: 'small' | 'middle'
  children: React.ReactNode
  onClick?: () => void
}

export default function Button(props: Props): JSX.Element {
  return (
    <button
      type="button"
      className={`
        rounded
        ${props.size === 'middle' ? 'px-5 py-1' : 'px-3 py-1 text-sm'}
        ${
          props.outlined
            ? 'border border-accent-1 text-accent-1 hover:bg-accent-1 hover:text-text-main-white'
            : 'border-none bg-accent-1 text-text-main-white hover:bg-accent-2'
        }
      `}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
