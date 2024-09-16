export type ModelInfo = {
  name: string;
  model: string;
  triggerWord: string;
  description: string;
};

export const modelModels: Record<string, ModelInfo> = {
  "1": {
    name: 'Model 1',
    model: 'guillaumesimon/camille-sezane',
    triggerWord: 'Camsimon',
    description: 'A young woman with long, wavy brown hair and a natural, fresh-faced look'
  },
  "2": {
    name: 'Model 2',
    model: 'guillaumesimon/model2-finetune:latest',
    triggerWord: 'KNZMDL',
    description: 'A tall, athletic man with short dark hair and a confident stance'
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