'use client'

import Image from 'next/image'
import Link from 'next/link'
import { productModels } from './utils/productModels'

export default function HomePage() {
  console.log('Rendering HomePage')

  // Array of products using productModels
  const products = Object.entries(productModels).map(([id, product]) => ({
    id,
    name: product.name,
    image: `/images/products/product-${id}.jpg`
  }))

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl sm:text-2xl mb-6 text-center">Choose an item to try on virtually</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <Link key={product.id} href={`/model-selection/${product.id}`} className="block">
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <h2 className="text-sm sm:text-base p-2 text-center mt-2">{product.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}