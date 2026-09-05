import { DetailedLessonContent } from "../types";
import { lesson01_1 } from "./01-1-variables-types";
import { lesson01_2 } from "./01-2-control-flow";
import { lesson01_3 } from "./01-3-oop-python";
import { lesson01_4 } from "./01-4-lists";
import { lesson01_5 } from "./01-5-tuples";
import { lesson01_6 } from "./01-6-sets";
import { lesson01_7 } from "./01-7-dictionaries";
import { lesson01_8 } from "./01-8-error-handling";
import { lesson01_9 } from "./01-9-file-handling";
import { lesson01_10 } from "./01-10-numpy";
import { lesson01_11 } from "./01-11-pandas";

export const module01Lessons: Record<string, DetailedLessonContent> = {
  "01-1": lesson01_1,
  "01-2": lesson01_2,
  "01-3": lesson01_3,
  "01-4": lesson01_4,
  "01-5": lesson01_5,
  "01-6": lesson01_6,
  "01-7": lesson01_7,
  "01-8": lesson01_8,
  "01-9": lesson01_9,
  "01-10": lesson01_10,
  "01-11": lesson01_11,
};

export {
  lesson01_1,
  lesson01_2,
  lesson01_3,
  lesson01_4,
  lesson01_5,
  lesson01_6,
  lesson01_7,
  lesson01_8,
  lesson01_9,
  lesson01_10,
  lesson01_11,
};
