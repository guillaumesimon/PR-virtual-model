import { NextResponse } from 'next/server';
import Replicate from "replicate";
import { productModels, ProductInfo } from '../../utils/productModels';
import { modelModels, ModelInfo } from '../../utils/modelModels';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  console.log('POST request received in generate route');
  
  try {
    const body = await req.json();
    console.log('Received request body:', body);

    const { productId, modelId, position, framing, setting } = body;

    console.log('Parsed request data:', { productId, modelId, position, framing, setting });

    const productInfo: ProductInfo | undefined = productModels[productId];
    const modelInfo: ModelInfo | undefined = modelModels[modelId];

    console.log('Product Info:', productInfo);
    console.log('Model Info:', modelInfo);

    if (!productInfo || !modelInfo) {
      console.error('Invalid product ID or model ID', { productId, modelId });
      return NextResponse.json({ error: 'Invalid product ID or model ID' }, { status: 400 });
    }

    try {
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

      console.log('Generated images:', output);

      return NextResponse.json({ images: output });
    } catch (error) {
      console.error('Error generating images:', error);
      return NextResponse.json({ error: 'Failed to generate images' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in POST /api/generate:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}