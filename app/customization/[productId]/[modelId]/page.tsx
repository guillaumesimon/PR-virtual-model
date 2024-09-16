'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type CustomizationPageProps = {
  params: { productId: string; modelId: string }
}

export default function CustomizationPage({ params }: CustomizationPageProps) {
  console.log('Rendering CustomizationPage for product:', params.productId, 'and model:', params.modelId)

  const [position, setPosition] = useState('')
  const [framing, setFraming] = useState('')
  const [setting, setSetting] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const customization = { position, framing, setting }
    localStorage.setItem('customization', JSON.stringify(customization))
    router.push(`/generating/${params.productId}/${params.modelId}`)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl sm:text-2xl mb-6 text-center">Customize your virtual Photoshoot</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">Select Model Position</label>
          <select
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Choose a position</option>
            <option value="Standing">Standing</option>
            <option value="Sitting">Sitting</option>
            <option value="Walking">Walking</option>
            <option value="Posing">Posing</option>
            <option value="Dancing">Dancing</option>
          </select>
        </div>

        <div>
          <label htmlFor="framing" className="block text-sm font-medium text-gray-700">Select Framing</label>
          <select
            id="framing"
            value={framing}
            onChange={(e) => setFraming(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Choose framing</option>
            <option value="Close-up">Close-up</option>
            <option value="Half-body">Half-body</option>
            <option value="Full-body">Full-body</option>
            <option value="Wide Shot">Wide Shot</option>
          </select>
        </div>

        <div>
          <label htmlFor="setting" className="block text-sm font-medium text-gray-700">Describe the Setting</label>
          <input
            type="text"
            id="setting"
            value={setting}
            onChange={(e) => setSetting(e.target.value)}
            placeholder="E.g., beach at sunset, urban street, cozy indoor"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
          >
            Generate My Look
          </button>
        </div>
      </form>
    </div>
  )
}