import Link from 'next/link'

export default function Header(): JSX.Element {
  return (
    <div className="h-16 w-full bg-primary-1">
      <div className="align-center mx-5 my-auto flex h-full flex-row items-center gap-10 p-0">
        <Link href="/">
          <p className=" lg:text-3xl text-xl text-text-main-white">imaimai chat</p>
        </Link>
        <div className="flex flex-row gap-5 text-xl text-text-main-white">
          {/* <p>HOME</p>
          <p>CHAT</p> */}
        </div>
      </div>
    </div>
  )
}
