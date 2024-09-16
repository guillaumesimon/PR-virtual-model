import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="AI Model Try-on Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <span className="text-xl font-bold">AI Model Try-on</span>
        </Link>
      </div>
    </header>
  )
}