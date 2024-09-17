'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CreateModel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');

  const [gender, setGender] = useState('female');
  const [hairColor, setHairColor] = useState('blonde');
  const [ethnicity, setEthnicity] = useState('caucasian');

  const handleContinue = () => {
    const customModel = { gender, hairColor, ethnicity };
    console.log('Custom model created:', customModel);
    router.push(`/customization/${productId}/custom?customModel=${encodeURIComponent(JSON.stringify(customModel))}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl sm:text-2xl mb-8 text-center">Create Custom Model</h1>
      <form className="space-y-8">
        <div className="space-y-2">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender:</label>
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
          <label htmlFor="hairColor" className="block text-sm font-medium text-gray-700">Hair Color:</label>
          <select
            id="hairColor"
            value={hairColor}
            onChange={(e) => setHairColor(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="blonde">Blonde</option>
            <option value="brown">Brown</option>
            <option value="black">Black</option>
            <option value="red">Red</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="ethnicity" className="block text-sm font-medium text-gray-700">Ethnicity:</label>
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
            className="bg-[#410CD9] text-white px-4 h-10 rounded-xl hover:bg-opacity-90 w-full sm:w-auto"
          >
            Continue to Customization
          </button>
        </div>
      </form>
    </div>
  );
}