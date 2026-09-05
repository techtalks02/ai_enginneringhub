import { DetailedLessonContent } from "../types";
import { lesson02_1 } from "./02-1-linear-algebra-intuition";
import { lesson02_2 } from "./02-2-vectors-matrices-operations";
import { lesson02_3 } from "./02-3-matrix-transformations";
import { lesson02_4 } from "./02-4-calculus-for-machine-learning";
import { lesson02_5 } from "./02-5-vectors-matrices-tensors";
import { lesson02_6 } from "./02-6-chain-rule-automatic-differentiatio";
import { lesson02_7 } from "./02-7-probability-distributions";
import { lesson02_8 } from "./02-8-bayes-theorem";
import { lesson02_9 } from "./02-9-statistics-for-data-science";
import { lesson02_10 } from "./02-10-optimization-algorithms";
import { lesson02_11 } from "./02-11-linear-systems";
import { lesson02_12 } from "./02-12-graph-theory-for-machine-learning";

export const module02Lessons: Record<string, DetailedLessonContent> = {
  "02-1": lesson02_1,
  "02-2": lesson02_2,
  "02-3": lesson02_3,
  "02-4": lesson02_4,
  "02-5": lesson02_5,
  "02-6": lesson02_6,
  "02-7": lesson02_7,
  "02-8": lesson02_8,
  "02-9": lesson02_9,
  "02-10": lesson02_10,
  "02-11": lesson02_11,
  "02-12": lesson02_12,
};

export {
  lesson02_1,
  lesson02_2,
  lesson02_3,
  lesson02_4,
  lesson02_5,
  lesson02_6,
  lesson02_7,
  lesson02_8,
  lesson02_9,
  lesson02_10,
  lesson02_11,
  lesson02_12,
};
