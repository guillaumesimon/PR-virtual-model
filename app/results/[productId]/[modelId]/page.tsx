'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import LoadingSpinner from '../../../components/LoadingSpinner';

export default function ResultsPage() {
  const { productId, modelId } = useParams();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedImages = localStorage.getItem('generatedImages');
    if (storedImages) {
      const parsedImages = JSON.parse(storedImages);
      setImages(parsedImages);
    }
    setIsLoading(false);
  }, []);

  const handleImageClick = (index: number) => {
    router.push(`/photo-details/${productId}/${modelId}/${index}`);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
  }

  if (images.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-2xl mb-4">Oops! Our digital catwalk is empty!</h1>
        <p className="mb-4">Looks like our AI models took an unexpected coffee break. Let&apos;s get them back to work!</p>
        <button
          onClick={() => router.push(`/customization/${productId}/${modelId}`)}
          className="bg-[#410CD9] text-white px-4 h-10 rounded-xl hover:bg-opacity-90"
        >
          Wake up the models!
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl sm:text-2xl mb-6 text-center">Voilà! Your Virtual Vogue Spread</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image}
              alt={`Fabulous fashion creation ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => router.push(`/customization/${productId}/${modelId}`)}
          className="bg-[#410CD9] text-white px-4 h-10 rounded-xl hover:bg-opacity-90 w-full sm:w-auto"
        >
          Conjure more couture!
        </button>
      </div>
    </div>
  );
}