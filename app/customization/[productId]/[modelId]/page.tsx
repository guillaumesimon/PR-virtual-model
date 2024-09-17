'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ProductInfo, getProduct } from '../../../utils/productModels';
import { ModelInfo, getModel } from '../../../utils/modelModels';

// Define setting suggestions
const settingSuggestions = [
  "Studio shot with minimal background",
  "Rooftop in Paris",
  "Deep blue neon light in Studio",
  "Sunny beach at golden hour",
  "Urban street with graffiti wall"
];

export default function CustomizationPage() {
  console.log('Rendering CustomizationPage');

  const router = useRouter();
  const { productId, modelId } = useParams();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [model, setModel] = useState<ModelInfo | null>(null);
  const [customModel, setCustomModel] = useState<any | null>(null);
  const [pose, setPose] = useState('');
  const [setting, setSetting] = useState('');
  const [framing, setFraming] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data for product:', productId, 'and model:', modelId);
      const fetchedProduct = getProduct(productId as string);
      setProduct(fetchedProduct || null);

      if (modelId === 'custom') {
        const customModelParam = searchParams.get('customModel');
        if (customModelParam) {
          const parsedCustomModel = JSON.parse(decodeURIComponent(customModelParam));
          setCustomModel(parsedCustomModel);
          console.log('Set custom model:', parsedCustomModel);
        } else {
          console.log('No custom model found in search params');
        }
      } else {
        const fetchedModel = getModel(modelId as string);
        setModel(fetchedModel || null);
      }
    };

    fetchData();
  }, [productId, modelId, searchParams]);

  const handleGenerateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Generating image with customization:', { pose, setting, framing });

    if (!product) {
      console.error('No product selected');
      return;
    }

    // Prepare the customization data
    const customizationData = {
      position: pose,
      setting,
      framing,
    };

    // Store customization in localStorage
    localStorage.setItem('customization', JSON.stringify(customizationData));

    // Store custom model in localStorage if it exists
    if (customModel) {
      localStorage.setItem('customModel', JSON.stringify(customModel));
    } else {
      localStorage.removeItem('customModel');
    }

    console.log('Navigating to generating page');

    // Navigate to the generating page
    router.push(`/generating/${productId}/${modelId}`);
  };

  const handleSettingSuggestionClick = (suggestion: string) => {
    setSetting(suggestion);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl sm:text-2xl mb-8 text-center">Customize your virtual Photoshoot</h1>
      
      <form onSubmit={handleGenerateImage} className="space-y-8">
        <div className="space-y-2">
          <label htmlFor="pose" className="block text-sm font-medium text-gray-700">Select Model Position</label>
          <select
            id="pose"
            value={pose}
            onChange={(e) => setPose(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Choose a position</option>
            <option value="Standing">Standing</option>
            <option value="Sitting">Sitting</option>
            <option value="Walking">Walking</option>
            <option value="Posing">Posing</option>
            <option value="Dancing">Dancing</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="framing" className="block text-sm font-medium text-gray-700">Select Framing</label>
          <select
            id="framing"
            value={framing}
            onChange={(e) => setFraming(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Choose framing</option>
            <option value="Close-up">Close-up</option>
            <option value="Half-body">Half-body</option>
            <option value="Full-body">Full-body</option>
            <option value="Wide Shot">Wide Shot</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="setting" className="block text-sm font-medium text-gray-700">Describe the Setting</label>
          <input
            type="text"
            id="setting"
            value={setting}
            onChange={(e) => setSetting(e.target.value)}
            placeholder="E.g., beach at sunset, urban street, cozy indoor"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {settingSuggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSettingSuggestionClick(suggestion)}
                className="px-3 py-1 bg-[#e8e1ff] text-xs rounded-full hover:bg-opacity-80 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-[#410CD9] text-white px-4 h-10 rounded-xl hover:bg-opacity-90 w-full sm:w-auto"
          >
            Generate My Look
          </button>
        </div>
      </form>
    </div>
  );
}