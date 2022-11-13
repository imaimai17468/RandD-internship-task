import React from 'react'

interface Props {
  outlined?: boolean
  size?: 'small' | 'middle'
  children: React.ReactNode
  onClick?: () => void
}

export default function Button(props: Props): JSX.Element {
  const className =
    'rounded text-sm lg:text-lg' +
    (props.outlined
      ? ' border border-accent-1 text-accent-1 hover:bg-accent-1 hover:text-text-main-white font-bold'
      : ' border-none bg-accent-1 text-text-main-white hover:bg-accent-2') +
    (props.size === 'small' ? ' px-2 py-1' : ' px-4 py-2')

  return (
    <button type="button" className={className} onClick={props.onClick}>
      {props.children}
    </button>
  )
}
