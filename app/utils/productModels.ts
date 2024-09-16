export type ProductInfo = {
  name: string;
  model: `${string}/${string}`;
  triggerWord: string;
  description: string;
};

export const productModels: Record<string, ProductInfo> = {
  "1": {
    name: 'APC blue fleece vest',
    model: 'guillaumesimon/apc-blue-jacket:8532b15bd9cef4b7e1adbc3216481179bd3f74a8590e2e0bf85c9cfb14260399',
    triggerWord: 'APCBLJCKT',
    description: 'A cozy, warm fleece vest featuring a deep blue color with a simple, fitted design. It has a full front zip, a high neckline for extra coverage, and two side pockets for convenienceA small APC logo is present on the chest'
  },
  "2": {
    name: 'Balzac top',
    model: 'guillaumesimon/balzac-top:cfd014c1acb8e17bbbe18443b2cadf64a34b80e8d4080bf5a82b33b6722b0f32',
    triggerWord: 'BLZCTOP',
    description: 'a long-sleeve, ribbed knit top featuring classic navy and white horizontal stripes. It has a unique square neckline that adds a modern twist to the traditional striped design'
  },
  "3": {
    name: 'Carhartt Jacket',
    model: 'guillaumesimon/carhart-green:f641d6445f2ce7aeff136bc8df7c12b43937689f613bfb395d0d41117e847c56',
    triggerWord: 'CHRTGRN',
    description: 'a Sycamore green puffer jacket from Carhartt featuring a subtle Carhartt logo on the chest. A padded puffer jacket in a Sycamore green color, designed for comfort and warmth. It features a minimalist design with clean lines and lightweight insulation,'
  },
  "4": {
    name: 'Claudie P. Dress',
    model: 'guillaumesimon/cool-cap-model',
    triggerWord: 'cool cap',
    description: 'A sleek baseball cap with an adjustable strap at the back'
  }
};