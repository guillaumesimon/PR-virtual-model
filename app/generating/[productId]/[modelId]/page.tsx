'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import LoadingSpinner from '../../../components/LoadingSpinner'

export default function GeneratingPage() {
  const { productId, modelId } = useParams()
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      <h1 className="text-xl sm:text-2xl mb-4">Generating Your Look</h1>
      {isGenerating && (
        <div className="mt-8">
          <LoadingSpinner />
          <p className="mt-4">Please wait while we create your personalized image...</p>
        </div>
      )}
    </div>
  )
}