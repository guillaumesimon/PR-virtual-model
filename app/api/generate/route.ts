import { NextResponse } from 'next/server';
import Replicate from "replicate";
import { productModels, ProductInfo } from '../../utils/productModels';
import { modelModels, ModelInfo } from '../../utils/modelModels';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  const body = await req.json();
  const { productId, modelId, customization } = body;
  const { position, framing, setting } = customization;

  console.log('Received request:', { productId, modelId, customization });
  console.log('REPLICATE_API_TOKEN:', process.env.REPLICATE_API_TOKEN ? 'Set' : 'Not set');

  try {
    const productInfo: ProductInfo = productModels[productId];
    const modelInfo: ModelInfo = modelModels[modelId];

    if (!productInfo || !modelInfo) {
      throw new Error('Invalid product or model ID');
    }

    console.log('Starting image generation with Replicate API');
    console.log(`Using product model: ${productInfo.model}`);
    console.log(`Using fashion model: ${modelInfo.model}`);

    // Construct a detailed prompt using all available information
    const prompt = `A ${framing} photo of ${modelInfo.description} wearing ${productInfo.description} (${productInfo.triggerWord}). 
                    The model (${modelInfo.triggerWord}) is ${position} in a ${setting}. 
                    High-quality, professional fashion photography, trending on fashion blogs.`;

    console.log('Generated prompt:', prompt);

    const output = await replicate.run(
      productInfo.model,
      {
        input: {
          model: "dev",
          prompt: prompt,
          negative_prompt: "ugly, disfigured, low quality, blurry, nsfw, extra limbs, missing limbs, deformed hands, out of frame",
          width: 768,
          height: 768,
          num_outputs: 4,
          guidance_scale: 7.5,
          num_inference_steps: 50,
          scheduler: "K_EULER_ANCESTRAL",
          extra_lora: modelInfo.model,
          extra_lora_scale: 1.5,
        }
      }
    );

    console.log('Replicate output:', output);
    
    // Check if output is an array and has at least one element
    if (Array.isArray(output) && output.length > 0) {
      return NextResponse.json({ imageUrls: output });
    } else {
      console.error('Unexpected output format:', output);
      return NextResponse.json({ error: 'Unexpected output format' }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error('Error generating images:', error);
    
    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Error generating images', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}