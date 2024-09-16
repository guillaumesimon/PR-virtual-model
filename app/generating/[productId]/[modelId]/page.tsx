'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import LoadingSpinner from '../../../components/LoadingSpinner'

const entertainingMessages = [
  "Mixing colors like a fashion DJ...",
  "Teaching AI the art of haute couture...",
  "Stitching pixels with digital thread...",
  "Consulting with virtual fashion gurus...",
  "Calculating the perfect outfit algorithm...",
  "Browsing through a galaxy of styles...",
  "Decoding the matrix of fashion trends...",
  "Summoning the spirits of fashion icons...",
  "Calibrating the quantum wardrobe...",
  "Navigating the multiverse of looks...",
]

export default function GeneratingPage() {
  const { productId, modelId } = useParams()
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % entertainingMessages.length)
    }, 5000) // Change message every 5 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const generateImage = async () => {
      const customization = JSON.parse(localStorage.getItem('customization') || '{}')

      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId,
            modelId,
            customization,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to generate image')
        }

        const data = await response.json()
        if (data.imageUrls && Array.isArray(data.imageUrls)) {
          localStorage.setItem('generatedImages', JSON.stringify(data.imageUrls))
          router.push(`/results/${productId}/${modelId}`)
        } else {
          throw new Error('Unexpected response format')
        }
      } catch (err) {
        console.error('Error generating image:', err)
        setError('Failed to generate image. Please try again.')
      } finally {
        setIsGenerating(false)
      }
    }

    generateImage()
  }, [productId, modelId, router])

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-xl sm:text-2xl mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 text-center">
      <h1 className="text-xl sm:text-2xl mb-4">Generating your virtual photoshooot</h1>
      {isGenerating && (
        <div className="mt-8">
          <LoadingSpinner />
          <p className="mt-4 text-lg font-medium animate-pulse">
            {entertainingMessages[messageIndex]}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            I am GPU poor so this process can take up to 2 min. Thanks for your patience!
          </p>
        </div>
      )}
    </div>
  )
}