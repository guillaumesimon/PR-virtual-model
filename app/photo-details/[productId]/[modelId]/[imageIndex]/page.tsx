'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import LoadingSpinner from '../../../../components/LoadingSpinner';

export default function PhotoDetailsPage() {
  const { productId, modelId, imageIndex } = useParams();
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedImages = localStorage.getItem('generatedImages');
    if (storedImages) {
      const parsedImages = JSON.parse(storedImages);
      setImage(parsedImages[Number(imageIndex)] || null);
    }
    setIsLoading(false);
  }, [imageIndex]);

  const handleChangeBackground = () => {
    console.log('Change background clicked');
    // TODO: Implement change background functionality
  };

  const handleAnimate = () => {
    console.log('Animate clicked');
    // TODO: Implement animate functionality
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
  }

  if (!image) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-2xl mb-4">Image not found</h1>
        <button
          onClick={() => router.push(`/results/${productId}/${modelId}`)}
          className="bg-[#410CD9] text-white px-4 h-10 rounded-xl hover:bg-opacity-90"
        >
          Go back to results
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={image}
          alt="Generated image"
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handleChangeBackground}
          className="bg-[#410CD9] text-white px-4 h-10 rounded-xl hover:bg-opacity-90 flex items-center justify-center"
        >
          🎨 Change background
        </button>
        <button
          onClick={handleAnimate}
          className="bg-[#410CD9] text-white px-4 h-10 rounded-xl hover:bg-opacity-90 flex items-center justify-center"
        >
          🎬 Animate
        </button>
      </div>
    </div>
  );
}