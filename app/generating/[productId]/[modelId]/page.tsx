'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

type GeneratingPageProps = {
  params: { productId: string; modelId: string }
}

const entertainingTexts = [
  "🛠️ Tailoring the perfect fit just for you...",
  "🎨 Painting the scene as you imagined...",
  "✨ Adding a sprinkle of style magic...",
  "📸 Setting up the perfect shot...",
  "🌟 Almost there! Fashion greatness awaits..."
]

export default function GeneratingPage({ params }: GeneratingPageProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const router = useRouter()
  const hasFetched = useRef(false) // Add this line

  useEffect(() => {
    if (hasFetched.current) return // Prevent duplicate API calls
    hasFetched.current = true

    console.log('useEffect called in GeneratingPage');
    console.log('Starting generation process for product:', params.productId, 'and model:', params.modelId)

    const textInterval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % entertainingTexts.length)
    }, 3000)

    // Fetch customization data from localStorage
    const customization = JSON.parse(localStorage.getItem('customization') || '{}')

    const requestBody = {
      productId: params.productId,
      modelId: params.modelId,
      ...customization,
    }

    console.log('Sending request to API:', requestBody)

    // Call the API to generate images
    fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json()
      })
      .then(data => {
        console.log('Received data from API:', data)
        // Store the generated images in localStorage
        localStorage.setItem('generatedImages', JSON.stringify(data.images))
        // Navigate to the results page
        router.push(`/results/${params.productId}/${params.modelId}`)
      })
      .catch(error => {
        console.error('Error generating images:', error)
        // Handle error (e.g., show error message to user)
      })

    return () => {
      clearInterval(textInterval)
    }
  }, [params.productId, params.modelId, router])

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">🧵 Stitching Your Style Together...</h1>
      
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-8"></div>
      
      <p className="text-lg text-center mb-4">{entertainingTexts[currentTextIndex]}</p>
      
      <p className="text-sm text-gray-500 text-center">This may take a few moments. Please don&apos;t close the page.</p>
    </div>
  )
}