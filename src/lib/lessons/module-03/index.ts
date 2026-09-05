import { DetailedLessonContent } from "../types";
import { lesson03_1 } from "./03-1-what-is-machine-learning";
import { lesson03_2 } from "./03-2-linear-regression-from-scratch";
import { lesson03_3 } from "./03-3-logistic-regression-classification";
import { lesson03_4 } from "./03-4-decision-trees-and-random-forests";
import { lesson03_5 } from "./03-5-support-vector-machines";
import { lesson03_6 } from "./03-6-knn-distance-metrics";
import { lesson03_7 } from "./03-7-unsupervised-learning-k-means-hiera";
import { lesson03_8 } from "./03-8-feature-engineering-selection";
import { lesson03_9 } from "./03-9-model-evaluation-metrics";
import { lesson03_10 } from "./03-10-ensemble-methods-bagging-boosting-s";
import { lesson03_11 } from "./03-11-hyperparameter-tuning";
import { lesson03_12 } from "./03-12-ml-pipelines-experimental-tracking";

export const module03Lessons: Record<string, DetailedLessonContent> = {
  "03-1": lesson03_1,
  "03-2": lesson03_2,
  "03-3": lesson03_3,
  "03-4": lesson03_4,
  "03-5": lesson03_5,
  "03-6": lesson03_6,
  "03-7": lesson03_7,
  "03-8": lesson03_8,
  "03-9": lesson03_9,
  "03-10": lesson03_10,
  "03-11": lesson03_11,
  "03-12": lesson03_12,
};

export {
  lesson03_1,
  lesson03_2,
  lesson03_3,
  lesson03_4,
  lesson03_5,
  lesson03_6,
  lesson03_7,
  lesson03_8,
  lesson03_9,
  lesson03_10,
  lesson03_11,
  lesson03_12,
};
