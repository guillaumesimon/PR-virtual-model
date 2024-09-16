'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { productModels } from '../../utils/productModels'
import { modelModels } from '../../utils/modelModels'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function ModelSelectionPage() {
  console.log('Rendering ModelSelectionPage')
  const { productId } = useParams()
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})

  const product = productModels[productId as string]
  const models = Object.entries(modelModels)

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }))
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl sm:text-2xl mb-6 text-center">Choose a model for {product?.name}</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {models.map(([id, model]) => (
          <Link key={id} href={`/customization/${productId}/${id}`} className="block">
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                {!loadedImages[id] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LoadingSpinner />
                  </div>
                )}
                <Image
                  src={`/images/models/${id}.jpg`}
                  alt={model.name}
                  layout="fill"
                  objectFit="cover"
                  onLoad={() => handleImageLoad(id)}
                  style={{ opacity: loadedImages[id] ? 1 : 0 }}
                />
              </div>
            </div>
            <h2 className="text-sm sm:text-base p-2 text-center mt-2">{model.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}