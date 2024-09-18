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
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatedUrl, setAnimatedUrl] = useState<string | null>(null);
  const [animationError, setAnimationError] = useState<string | null>(null);

  useEffect(() => {
    const storedImages = localStorage.getItem('generatedImages');
    if (storedImages) {
      const parsedImages = JSON.parse(storedImages);
      setImage(parsedImages[Number(imageIndex)] || null);
    }
    setIsLoading(false);
  }, [imageIndex]);

  const handleAnimate = async () => {
    if (!image) return;
    setIsAnimating(true);
    setAnimationError(null);
    try {
      const response = await fetch('/api/animate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: image }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start animation process');
      }

      const data = await response.json();
      
      if (!data.animationId) {
        throw new Error('No animation ID returned');
      }

      // Start polling for the animation result
      pollAnimationResult(data.animationId);
    } catch (error) {
      console.error('Error animating image:', error);
      setAnimationError(error instanceof Error ? error.message : 'Failed to animate image. Please try again.');
      setIsAnimating(false);
    }
  };

  const pollAnimationResult = async (animationId: string) => {
    try {
      const response = await fetch(`/api/check-animation?id=${animationId}`);
      if (!response.ok) {
        throw new Error('Failed to check animation status');
      }
      const data = await response.json();
      if (data.status === 'completed') {
        setAnimatedUrl(data.videoUrl);
        setIsAnimating(false);
      } else if (data.status === 'processing') {
        // Continue polling after a delay
        setTimeout(() => pollAnimationResult(animationId), 5000);
      } else {
        throw new Error('Animation failed');
      }
    } catch (error) {
      console.error('Error checking animation status:', error);
      setAnimationError('Failed to retrieve animated image. Please try again.');
      setIsAnimating(false);
    }
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
        {animatedUrl ? (
          <video
            src={animatedUrl}
            autoPlay
            loop
            muted
            playsInline
            className="rounded-lg w-full h-full object-cover"
          />
        ) : (
          <Image
            src={image}
            alt="Generated image"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        )}
      </div>

      <div className="mt-6 flex flex-col items-center space-y-4">
        <button
          onClick={handleAnimate}
          disabled={isAnimating}
          className="bg-[#410CD9] text-white px-4 h-10 rounded-xl hover:bg-opacity-90 flex items-center justify-center disabled:opacity-50"
        >
          {isAnimating ? 'Animating...' : '🎬 Animate'}
        </button>
        {animationError && (
          <p className="text-red-500 text-sm">{animationError}</p>
        )}
      </div>
    </div>
  );
}