'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import LoadingSpinner from '../../../components/LoadingSpinner'

const entertainingMessages = [
  "Mixing colors like a fashion DJ...",
  "Teaching AI the art of haute couture...",
  "Stitching pixels with digital thread...",
  "Consulting with virtual fashion gurus...",
  "Calculating the perfect outfit algorithm...",
  "Browsing through a galaxy of styles...",
  "Decoding the matrix of fashion trends...",
  "Summoning the spirits of fashion icons...",
  "Calibrating the quantum wardrobe...",
  "Navigating the multiverse of looks...",
]

export default function GeneratingPage() {
  const { productId, modelId } = useParams()
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % entertainingMessages.length)
    }, 5000) // Change message every 5 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const generateImage = async () => {
      const customization = JSON.parse(localStorage.getItem('customization') || '{}');
      const customModelString = localStorage.getItem('customModel');
      const customModel = customModelString ? JSON.parse(customModelString) : null;

      console.log('Generating image with:', { productId, modelId, customization, customModel });

      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId,
            modelId,
            customization,
            customModel,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate image');
        }

        const data = await response.json();
        if (data.imageUrls && Array.isArray(data.imageUrls)) {
          localStorage.setItem('generatedImages', JSON.stringify(data.imageUrls));
          router.push(`/results/${productId}/${modelId}`);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        console.error('Error generating image:', err);
        setError(err instanceof Error ? err.message : 'Failed to generate image. Please try again.');
      } finally {
        setIsGenerating(false);
      }
    };

    generateImage();
  }, [productId, modelId, router]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-xl sm:text-2xl mb-8 text-center">Error</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Oops! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.back()}
            className="bg-[#410CD9] text-white px-4 h-10 rounded-xl hover:bg-opacity-90"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl sm:text-2xl mb-8 text-center">Generating your virtual photoshoot</h1>
      {isGenerating && (
        <div className="mt-8 space-y-8">
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
          <p className="text-lg font-medium text-center animate-pulse">
            {entertainingMessages[messageIndex]}
          </p>
          <div className="bg-[#e8e1ff] p-4 rounded-lg">
            <p className="text-sm text-gray-700 text-center">
              I am GPU poor so this process can take up to 2 min. Thanks for your patience!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}