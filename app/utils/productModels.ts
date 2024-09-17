export type ProductInfo = {
  id: string;
  name: string;
  model: `${string}/${string}`;
  triggerWord: string;
  description: string;
};

export const productModels: Record<string, ProductInfo> = {
  "1": {
    id: "1",
    name: 'APC blue fleece vest',
    model: 'guillaumesimon/apc-blue-jacket:8532b15bd9cef4b7e1adbc3216481179bd3f74a8590e2e0bf85c9cfb14260399',
    triggerWord: 'APCBLJCKT',
    description: 'A cozy, warm fleece vest featuring a deep blue color with a simple, fitted design. It has a full front zip, a high neckline for extra coverage, and two side pockets for convenienceA small APC logo is present on the chest'
  },
  "2": {
    id: "2",
    name: 'Sezane Jacket',
    model: 'guillaumesimon/szn-betty:2dde94ce59e26dc188f352ce34f5822e5cdce7f31987ac2c4f8042819713062a',
    triggerWord: 'BettySZN',
    description: 'a chic, button-up cardigan featuring a soft brown knit fabric. It is detailed with a scalloped white trim along the collar, pocket flaps, and cuffs.The cardigan has a structured design with two front pockets.'
  },
  "3": {
    id: "3",
    name: 'Carhartt Jacket',
    model: 'guillaumesimon/carhart-green:f641d6445f2ce7aeff136bc8df7c12b43937689f613bfb395d0d41117e847c56',
    triggerWord: 'CHRTGRN',
    description: 'a Sycamore green puffer jacket from Carhartt featuring a subtle Carhartt logo on the chest. A padded puffer jacket in a Sycamore green color, designed for comfort and warmth. It features a minimalist design with clean lines and lightweight insulation,'
  },
  "4": {
    id: "4",
    name: 'Claudie P. Dress',
    model: 'guillaumesimon/claudiedress:f1880212ea8ce9459442a2f7d2034454ed6750c04da0acca962cf1f82507328c',
    triggerWord: 'CLDPRLTPRDCT',
    description: 'a cream-colored, ribbed-knit, long-sleeved maxi dress with an asymmetrical draped neckline that extends into a scarf-like detail. It is form-fitting and designed with a vertical rib pattern throughout, paired with a high neck'
  }
};

export type ProductModel = ProductInfo;

export function getProduct(productId: string): ProductModel | undefined {
  return productModels[productId];
}

export function getAllProducts(): ProductModel[] {
  return Object.values(productModels);
}