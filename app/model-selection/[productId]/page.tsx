'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import LoadingSpinner from '../../components/LoadingSpinner'
import { ProductModel, getProduct } from '../../utils/productModels'
import { ModelInfo, getModels } from '../../utils/modelModels'

export default function ModelSelectionPage() {
  console.log('Rendering ModelSelectionPage')
  const { productId } = useParams()
  const router = useRouter()
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})
  const [product, setProduct] = useState<ProductModel | null>(null)
  const [models, setModels] = useState<ModelInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedProduct = getProduct(productId as string)
        const allModels = getModels()

        console.log('Selected product:', selectedProduct)
        console.log('Available models:', allModels)

        if (!selectedProduct) {
          console.error('Product not found')
          router.push('/') // Redirect to home page if product is not found
          return
        }

        setProduct(selectedProduct)
        setModels(allModels)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [productId, router])

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }))
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>
  }

  if (!product) {
    return <div className="text-center mt-8">Product not found. Redirecting...</div>
  }

  if (models.length === 0) {
    return <div className="text-center mt-8">No models found.</div>
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl sm:text-2xl mb-6 text-center">Choose a model for {product?.name}</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {models.map((model) => (
          <Link key={model.id} href={`/customization/${productId}/${model.id}`} className="block">
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                {!loadedImages[model.id] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LoadingSpinner />
                  </div>
                )}
                <Image
                  src={`/images/models/${model.id}.jpg`}
                  alt={model.name}
                  layout="fill"
                  objectFit="cover"
                  onLoad={() => handleImageLoad(model.id)}
                  style={{ opacity: loadedImages[model.id] ? 1 : 0 }}
                />
              </div>
            </div>
            <h2 className="text-sm sm:text-base p-2 text-center mt-2">{model.name}</h2>
          </Link>
        ))}
        
        {/* Custom Model Option */}
        <Link
          href={`/create-model?productId=${productId}`}
          className="block border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="relative aspect-square flex items-center justify-center bg-white">
            <div className="text-center">
              <p className="text-3xl mb-2 text-gray-400">+</p>
              <p className="text-sm text-gray-500">Create your own model</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}