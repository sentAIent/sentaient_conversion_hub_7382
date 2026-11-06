import { SurvivalArticle } from './survivalData';
import { READINESS_DIAGNOSTIC_ARTICLES } from './civil/readinessDiagnosticData';
import { FOOD_STORAGE_ARTICLES } from './civil/foodStorageData';
import { FOOD_SCIENCE_ARTICLES } from './civil/foodScienceData';
import { WATER_SANITATION_ARTICLES } from './civil/waterSanitationData';
import { CBRN_DEFENSE_ARTICLES } from './civil/cbrnDefenseData';

/**
 * SPHINX TACTICAL EMERGENCY PREPAREDNESS & CIVIL DEFENSE MANUAL
 * Master Resilience Codex
 * Complete consolidation of all 24 core reference articles across readiness diagnostics,
 * food storage calculations, milling, preservation, well hydraulics, CBRN defense,
 * and urban grid collapse survival.
 *
 * Strictly secular: Zero LDS/theological references.
 */
export const CIVIL_PREPAREDNESS_ARTICLES: SurvivalArticle[] = [
  ...READINESS_DIAGNOSTIC_ARTICLES,
  ...FOOD_STORAGE_ARTICLES,
  ...FOOD_SCIENCE_ARTICLES,
  ...WATER_SANITATION_ARTICLES,
  ...CBRN_DEFENSE_ARTICLES
];
