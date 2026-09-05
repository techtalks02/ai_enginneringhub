import { DetailedLessonContent } from "../types";
import { lesson04_1 } from "./04-1-introduction-to-neural-networks";
import { lesson04_2 } from "./04-2-multi-layer-networks-and-forward-pa";
import { lesson04_3 } from "./04-3-backpropagation-from-scratch";
import { lesson04_4 } from "./04-4-activation-functions-relu-gelu-sigm";
import { lesson04_5 } from "./04-5-optimization-algorithms";
import { lesson04_6 } from "./04-6-convolutional-neural-networks";
import { lesson04_7 } from "./04-7-recurrent-neural-networks";
import { lesson04_8 } from "./04-8-attention-transformer-architecture";
import { lesson04_9 } from "./04-9-deep-learning-evaluations-and-model";
import { lesson04_10 } from "./04-10-end-to-end-deep-learning-pipeline";

export const module04Lessons: Record<string, DetailedLessonContent> = {
  "04-1": lesson04_1,
  "04-2": lesson04_2,
  "04-3": lesson04_3,
  "04-4": lesson04_4,
  "04-5": lesson04_5,
  "04-6": lesson04_6,
  "04-7": lesson04_7,
  "04-8": lesson04_8,
  "04-9": lesson04_9,
  "04-10": lesson04_10,
};

export {
  lesson04_1,
  lesson04_2,
  lesson04_3,
  lesson04_4,
  lesson04_5,
  lesson04_6,
  lesson04_7,
  lesson04_8,
  lesson04_9,
  lesson04_10,
};
