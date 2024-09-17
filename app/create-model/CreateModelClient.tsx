'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CreateModelClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [productId, setProductId] = useState<string | null>(null);

  const [gender, setGender] = useState('female');
  const [hairColor, setHairColor] = useState('blonde');
  const [ethnicity, setEthnicity] = useState('caucasian');

  useEffect(() => {
    const id = searchParams.get('productId');
    setProductId(id);
  }, [searchParams]);

  const handleContinue = () => {
    if (!productId) {
      console.error('No product ID found');
      return;
    }
    const customModel = { gender, hairColor, ethnicity };
    console.log('Fabulous custom model created:', customModel);
    router.push(`/customization/${productId}/custom?customModel=${encodeURIComponent(JSON.stringify(customModel))}`);
  };

  if (!productId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl sm:text-2xl mb-8 text-center">Craft Your Dream Model</h1>
      <p className="text-center mb-6 text-gray-600">Time to play fashion god! Let&apos;s create a model that&apos;s as unique as your style.</p>
      <form className="space-y-8">
        <div className="space-y-2">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Pick Your Model&apos;s Swagger</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="hairColor" className="block text-sm font-medium text-gray-700">Crown Your Model with Fabulous Locks</label>
          <select
            id="hairColor"
            value={hairColor}
            onChange={(e) => setHairColor(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="blonde">Sun-Kissed Blonde</option>
            <option value="brown">Rich Chocolate Brown</option>
            <option value="black">Midnight Black</option>
            <option value="red">Fiery Red</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="ethnicity" className="block text-sm font-medium text-gray-700">Choose Your Model&apos;s Heritage</label>
          <select
            id="ethnicity"
            value={ethnicity}
            onChange={(e) => setEthnicity(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="caucasian">Caucasian</option>
            <option value="african">African</option>
            <option value="asian">Asian</option>
            <option value="hispanic">Hispanic</option>
          </select>
        </div>
        <div className="flex justify-center pt-4">
          <button
            onClick={handleContinue}
            type="button"
            className="bg-[#410CD9] text-white px-6 py-3 rounded-xl hover:bg-opacity-90 w-full sm:w-auto text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Here we go!
          </button>
        </div>
      </form>
    </div>
  );
}