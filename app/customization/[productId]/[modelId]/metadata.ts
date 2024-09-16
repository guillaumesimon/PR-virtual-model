import { Metadata } from 'next'
import { productModels } from '../../../utils/productModels'
import { modelModels } from '../../../utils/modelModels'

export async function generateMetadata({ params }: { params: { productId: string, modelId: string } }): Promise<Metadata> {
  const product = productModels[params.productId]
  const model = modelModels[params.modelId]
  return {
    title: `Customize Your Virtual Photoshoot | AI Model Try-on`,
    description: `Customize your virtual photoshoot with ${model?.name} wearing ${product?.name}. Create your perfect AI-generated fashion look.`,
    openGraph: {
      title: `Customize Your Virtual Photoshoot | AI Model Try-on`,
      description: `Customize your virtual photoshoot with ${model?.name} wearing ${product?.name}. Create your perfect AI-generated fashion look.`,
      images: ['/images/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Customize Your Virtual Photoshoot | AI Model Try-on`,
      description: `Customize your virtual photoshoot with ${model?.name} wearing ${product?.name}. Create your perfect AI-generated fashion look.`,
      images: ['/images/og-image.jpg'],
    },
  }
}