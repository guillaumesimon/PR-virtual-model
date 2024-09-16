import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Model Try-on | Virtual Fashion Experience',
  description: 'Experience the future of fashion with our AI-powered virtual try-on. Choose from a variety of styles and see them on realistic models.',
  openGraph: {
    title: 'AI Model Try-on | Virtual Fashion Experience',
    description: 'Experience the future of fashion with our AI-powered virtual try-on.',
    images: ['/images/og-image.jpg'], // Make sure to add an appropriate image in your public folder
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Model Try-on | Virtual Fashion Experience',
    description: 'Experience the future of fashion with our AI-powered virtual try-on.',
    images: ['/images/og-image.jpg'], // Same image as OpenGraph
  },
}