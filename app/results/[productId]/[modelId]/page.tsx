'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
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

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl sm:text-2xl mb-6 text-center">Here's Your Fabulous Look!</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {generatedImages.map((image, index) => (
          <div 
            key={index} 
            className="border rounded-lg p-2 hover:shadow-lg transition-shadow"
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
      
      <div className="mt-8 flex justify-center">
        <button 
          onClick={() => router.push(`/generating/${params.productId}/${params.modelId}`)}
          className="bg-[#410CD9] text-white px-4 h-10 rounded-xl hover:bg-opacity-90 w-full sm:w-auto"
        >
          Create New Virtual Try-ons
        </button>
      </div>
    </div>
  )
}