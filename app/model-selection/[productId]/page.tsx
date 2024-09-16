'use client'

import Image from 'next/image'
import Link from 'next/link'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useState } from 'react'

type ModelSelectionPageProps = {
  params: { productId: string }
}

export default function ModelSelectionPage({ params }: ModelSelectionPageProps) {
  console.log('Rendering ModelSelectionPage for product:', params.productId)
  const [imagesLoaded, setImagesLoaded] = useState(Array(4).fill(false))

  const models = [
    { id: 1, name: 'Model 1', image: '/images/models/model-1.jpg' },
    { id: 2, name: 'Model 2', image: '/images/models/model-2.jpg' },
    { id: 3, name: 'Model 3', image: '/images/models/model-3.jpg' },
    { id: 4, name: 'Model 4', image: '/images/models/model-4.jpg' },
  ]

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">👗 Pick a Model to Rock Your Look!</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {models.map((model, index) => (
          <Link key={model.id} href={`/customization/${params.productId}/${model.id}`} className="block">
            <div className="border rounded-lg p-3 hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                {!imagesLoaded[index] && <LoadingSpinner />}
                <Image
                  src={model.image}
                  alt={model.name}
                  layout="fill"
                  objectFit="cover"
                  className={`rounded ${imagesLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => handleImageLoad(index)}
                />
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-center mt-2">{model.name}</h2>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-blue-500 hover:underline mb-4 sm:mb-0">
          &larr; Back to Products
        </Link>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto">
          ➕ Create a Model
        </button>
      </div>
      
      <p className="mt-4 text-center text-base sm:text-lg">Choose a model who'll make your style shine!</p>
    </div>
  )
}