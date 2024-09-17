export type ModelInfo = {
  name: string;
  model: string;
  triggerWord: string;
  description: string;
};

export const modelModels: Record<string, ModelInfo> = {
  "1": {
    name: 'Camille',
    model: 'guillaumesimon/camille-sezane:8532b15bd9cef4b7e1adbc3216481179bd3f74a8590e2e0bf85c9cfb14260399',
    triggerWord: 'Camsimon',
    description: 'A young woman with long, wavy brown hair and a natural, fresh-faced look'
  },
  "2": {
    name: 'Emilia',
    model: 'guillaumesimon/emilia2',
    triggerWord: 'EMLAMDL',
    description: 'A 30 years old young woman with long, straight dark hair.'
  },
  "3": {
    name: 'Emily',
    model: 'guillaumesimon/emrato',
    triggerWord: 'EMRTO',
    description: 'a woman with long, straight dark brown hair, a medium to light complexion.'
  },
  "4": {
    name: 'Valentin',
    model: 'guillaumesimon/valentin',
    triggerWord: 'VLTNMDL',
    description: 'A black man with short hair and a warm, friendly smile'
  }
};