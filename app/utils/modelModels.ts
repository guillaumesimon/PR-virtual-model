export type ModelInfo = {
  name: string;
  model: string;
  triggerWord: string;
  description: string;
};

export const modelModels: Record<string, ModelInfo> = {
  "1": {
    name: 'Camille',
    model: 'guillaumesimon/camille-sezane',
    triggerWord: 'Camsimon',
    description: 'A young woman with medium-length light brown hair and a fringe styled casually in a natural way. She has an oval face with fair skin, expressive eyes, medium-full lips, and a softly defined jawline, giving her a balanced and engaging appearance.'
  },
  "2": {
    name: 'Kenza',
    model: 'guillaumesimon/kenza',
    triggerWord: 'KNZMDL',
    description: 'A 20 years old woman of South Asian ethnicity, with long, thick black hair with a natural texture that frames her face elegantly. She has sharp facial features, including high cheekbones, full lips, and a warm complexion, which give her a striking and confident appearance. Her morphology is slender and toned, with a tall and lean figure'
  },
  "3": {
    name: 'Model 3',
    model: 'guillaumesimon/model3-finetune:latest',
    triggerWord: 'MODEL3',
    description: 'A stylish woman with shoulder-length blonde hair and a chic, urban style'
  },
  "4": {
    name: 'Model 4',
    model: 'guillaumesimon/model4-finetune:latest',
    triggerWord: 'MODEL4',
    description: 'A diverse model with curly hair and a warm, friendly smile'
  }
};