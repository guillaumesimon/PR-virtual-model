import { NextResponse } from 'next/server';
import Replicate from "replicate";
import { productModels, ProductInfo } from '../../utils/productModels';
import { modelModels, ModelInfo } from '../../utils/modelModels';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  const body = await req.json();
  const { productId, modelId, customization, customModel } = body;
  const { position, framing, setting } = customization;

  console.log('Received request:', { productId, modelId, customization, customModel });
  console.log('REPLICATE_API_TOKEN:', process.env.REPLICATE_API_TOKEN ? 'Set' : 'Not set');

  try {
    const productInfo: ProductInfo = productModels[productId];

    if (!productInfo) {
      throw new Error('Invalid product ID');
    }

    console.log('Starting image generation with Replicate API');
    console.log(`Using product model: ${productInfo.model}`);

    let prompt: string;
    const replicateInput: Record<string, unknown> = {
      model: "dev",
      negative_prompt: "ugly, disfigured, low quality, blurry, nsfw, extra limbs, missing limbs, deformed hands, out of frame",
      width: 768,
      height: 768,
      num_outputs: 4,
      guidance_scale: 7.5,
      num_inference_steps: 50,
      scheduler: "K_EULER_ANCESTRAL",
    };

    if (customModel && 'gender' in customModel) {
      // Custom model scenario
      const { gender, hairColor, ethnicity } = customModel;
      prompt = `A ${framing} photo of a ${ethnicity} ${gender} model with ${hairColor} hair wearing ${productInfo.description} (${productInfo.triggerWord}). 
                The model is ${position} in a ${setting}. High-quality, professional fashion photography, trending on fashion blogs. Ensure a clear, front-facing view with a confident and elegant pose.`;
      
      console.log('Using custom model parameters:', { gender, hairColor, ethnicity });
    } else {
      // Existing model scenario
      const modelInfo: ModelInfo = modelModels[modelId];
      if (!modelInfo) {
        throw new Error('Invalid model ID');
      }
      
      prompt = `A ${framing} photo of ${modelInfo.description} wearing ${productInfo.description} (${productInfo.triggerWord}). 
                The model (${modelInfo.triggerWord}) is ${position} in a ${setting} and facing the camera. High-quality, professional fashion photography, trending on fashion blogs.Ensure a clear, front-facing view with a confident and elegant pose.`;
      
      replicateInput.extra_lora = modelInfo.model;
      replicateInput.extra_lora_scale = 1.5;
      
      console.log(`Using fashion model: ${modelInfo.model}`);
    }

    console.log('Generated prompt:', prompt);
    replicateInput.prompt = prompt;

    const output = await replicate.run(
      productInfo.model,
      { input: replicateInput }
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
    
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Error generating images', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}