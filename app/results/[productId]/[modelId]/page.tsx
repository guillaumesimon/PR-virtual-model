'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '../../../components/LoadingSpinner'

type ResultsPageProps = {
  params: { productId: string; modelId: string }
}

export default function ResultsPage({ params }: ResultsPageProps) {
  console.log('Rendering ResultsPage for product:', params.productId, 'and model:', params.modelId)
  const router = useRouter()
  const [imagesLoaded, setImagesLoaded] = useState(Array(4).fill(false))
  const [generatedImages, setGeneratedImages] = useState<string[]>([])

  useEffect(() => {
    const images = JSON.parse(localStorage.getItem('generatedImages') || '[]')
    setGeneratedImages(images)
  }, [])

  const handleImageClick = (imageIndex: number) => {
    console.log('Image clicked:', imageIndex)
    router.push(`/photo-details/${params.productId}/${params.modelId}/${imageIndex}`)
  }

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">🎉 Here&apos;s Your Fabulous Look!</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {generatedImages.map((image, index) => (
          <div 
            key={index} 
            className="border rounded-lg p-2 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleImageClick(index)}
          >
            <div className="relative aspect-square">
              {!imagesLoaded[index] && <LoadingSpinner />}
              <Image
                src={image}
                alt={`Generated outfit ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className={`rounded ${imagesLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => handleImageLoad(index)}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
        <Link href={`/customization/${params.productId}/${params.modelId}`} className="text-blue-500 hover:underline mb-4 sm:mb-0">
          &larr; Back to Customization
        </Link>
        <button 
          onClick={() => router.push(`/generating/${params.productId}/${params.modelId}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
        >
          🔄 Create New Virtual Try-ons
        </button>
      </div>
      
      <p className="mt-4 text-center text-base sm:text-lg">Tap an image to see it up close!</p>
    </div>
  )
}