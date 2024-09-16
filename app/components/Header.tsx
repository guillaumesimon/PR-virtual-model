'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()

  // Check if the current page is the homepage
  const isHomePage = pathname === '/'

  // Function to handle the back button click
  const handleBack = () => {
    router.back()
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {!isHomePage && (
          <button onClick={handleBack} className="text-gray-600 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <Link href="/" className="flex items-center mx-auto">
          <Image
            src="/images/logo.png"
            alt="AI Model Try-on Logo"
            width={40}
            height={40}
          />
        </Link>
        {/* Empty div to balance the layout when the back button is not shown */}
        {!isHomePage && <div className="w-6"></div>}
      </div>
    </header>
  )
}