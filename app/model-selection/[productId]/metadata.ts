import { Metadata } from 'next'
import { productModels } from '../../utils/productModels'

export async function generateMetadata({ params }: { params: { productId: string } }): Promise<Metadata> {
  const product = productModels[params.productId]
  return {
    title: `Choose a Model for ${product?.name} | AI Model Try-on`,
    description: `Select a virtual model to try on ${product?.name}. Experience our AI-powered fashion try-on.`,
    openGraph: {
      title: `Choose a Model for ${product?.name} | AI Model Try-on`,
      description: `Select a virtual model to try on ${product?.name}. Experience our AI-powered fashion try-on.`,
      images: ['/images/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Choose a Model for ${product?.name} | AI Model Try-on`,
      description: `Select a virtual model to try on ${product?.name}. Experience our AI-powered fashion try-on.`,
      images: ['/images/og-image.jpg'],
    },
  }
}