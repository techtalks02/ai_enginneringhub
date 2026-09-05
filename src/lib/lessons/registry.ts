import { ModuleData, Lesson } from "@/components/landing/curriculum";
import { DetailedLessonContent } from "./types";
import { generateMediumGradeContent } from "./knowledge-engine";
import { module10Lessons } from "./module-10";
import { module11Lessons } from "./module-11";
import { module12Lessons } from "./module-12";
import { module13Lessons } from "./module-13";
import { module14Lessons } from "./module-14";
import { module15Lessons } from "./module-15";
import { module16Lessons } from "./module-16";
import { module17Lessons } from "./module-17";
import { module18Lessons } from "./module-18";
import { module19Lessons } from "./module-19";
import { module20Lessons } from "./module-20";
import { module21Lessons } from "./module-21";
import { module22Lessons } from "./module-22";
import { module23Lessons } from "./module-23";
import { module24Lessons } from "./module-24";
import { module25Lessons } from "./module-25";
import { module26Lessons } from "./module-26";
import { module27Lessons } from "./module-27";
import { module28Lessons } from "./module-28";
import { module29Lessons } from "./module-29";
import { module30Lessons } from "./module-30";
import { module01Lessons } from "./module-01";
import { module02Lessons } from "./module-02";
import { module03Lessons } from "./module-03";
import { module04Lessons } from "./module-04";
import { module05Lessons } from "./module-05";
import { module06Lessons } from "./module-06";
import { module07Lessons } from "./module-07";
import { module08Lessons } from "./module-08";
import { module09Lessons } from "./module-09";

// Complete static registry of all individual lessons across all 30 modules
export const LESSON_REGISTRY: Record<string, DetailedLessonContent> = {
  ...module10Lessons,
  ...module11Lessons,
  ...module12Lessons,
  ...module13Lessons,
  ...module14Lessons,
  ...module15Lessons,
  ...module16Lessons,
  ...module17Lessons,
  ...module18Lessons,
  ...module19Lessons,
  ...module20Lessons,
  ...module21Lessons,
  ...module22Lessons,
  ...module23Lessons,
  ...module24Lessons,
  ...module25Lessons,
  ...module26Lessons,
  ...module27Lessons,
  ...module28Lessons,
  ...module29Lessons,
  ...module30Lessons,
  ...module01Lessons,
  ...module02Lessons,
  ...module03Lessons,
  ...module04Lessons,
  ...module05Lessons,
  ...module06Lessons,
  ...module07Lessons,
  ...module08Lessons,
  ...module09Lessons,
};

/**
 * Resolves lesson content into a deeply technical, Medium / GeeksforGeeks grade article.
 * Validates whether the static registry entry has deep custom content; if it was generic boilerplate,
 * dynamically enhances it using the domain-intelligent knowledge engine.
 */
export function resolveLessonContent(
  module: ModuleData,
  lesson: Lesson
): DetailedLessonContent {
  const exactStatic = LESSON_REGISTRY[lesson.id];

  // If the static lesson contains rich customized subtopics and deep content (e.g. module-01 custom lessons or updated files), check quality
  if (
    exactStatic &&
    exactStatic.subtopics &&
    exactStatic.subtopics.length >= 2 &&
    !exactStatic.concept.paragraphs[0].includes("In high-performance AI systems, understanding") &&
    !exactStatic.concept.paragraphs[0].includes("In modern AI engineering systems,")
  ) {
    return exactStatic;
  }

  // Generate authoritative, domain-intelligent article content
  return generateMediumGradeContent(module, lesson);
}
