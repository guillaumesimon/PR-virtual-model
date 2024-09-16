export type ProductInfo = {
  name: string;
  model: `${string}/${string}`;
  triggerWord: string;
  description: string;
};

export const productModels: Record<string, ProductInfo> = {
  "1": {
    name: 'APC blue fleece vest',
    model: 'guillaumesimon/classic-tee-model',
    triggerWord: 'classic tee',
    description: 'A cozy, warm fleece vest featuring a deep blue color with a simple, fitted design. It has a full front zip, a high neckline for extra coverage, and two side pockets for convenienceA small APC logo is present on the chest'
  },
  "2": {
    name: 'Stylish Jacket',
    model: 'guillaumesimon/stylish-jacket-model',
    triggerWord: 'stylish jacket',
    description: 'A trendy leather jacket with a modern cut and silver zippers'
  },
  "3": {
    name: 'Carhartt Jacket',
    model: 'guillaumesimon/carhart-green:f641d6445f2ce7aeff136bc8df7c12b43937689f613bfb395d0d41117e847c56',
    triggerWord: 'CHRTGRN',
    description: 'A durable, green Carhartt work jacket with multiple pockets'
  },
  "4": {
    name: 'Cool Cap',
    model: 'guillaumesimon/cool-cap-model',
    triggerWord: 'cool cap',
    description: 'A sleek baseball cap with an adjustable strap at the back'
  }
};