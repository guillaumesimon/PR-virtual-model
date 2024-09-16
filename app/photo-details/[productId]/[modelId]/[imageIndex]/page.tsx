'use client'

import Image from 'next/image'
import Link from 'next/link'

type PhotoDetailsPageProps = {
  params: { productId: string; modelId: string; imageIndex: string }
}

export default function PhotoDetailsPage({ params }: PhotoDetailsPageProps) {
  console.log('Rendering PhotoDetailsPage for product:', params.productId, 'model:', params.modelId, 'image:', params.imageIndex)

  // Simulated generated image (replace with actual API call result later)
  const imageSrc = `/images/generated${parseInt(params.imageIndex) + 1}.jpg`

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">😍 Looking Good!</h1>
      
      <div className="mb-6">
        <Image
          src={imageSrc}
          alt={`Generated outfit detail`}
          width={600}
          height={600}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
      
      <p className="text-center text-lg mb-6">Coming soon: Save, share, and shop this look!</p>
      
      <div className="flex justify-center">
        <Link 
          href={`/results/${params.productId}/${params.modelId}`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          &larr; Back to Results
        </Link>
      </div>
    </div>
  )
}