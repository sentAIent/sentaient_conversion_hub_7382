import { describe, it, expect, beforeAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { callGemini } from '../../src/services/geminiService';
import { analyzeDocument } from '../../src/services/analysisService';

// Path to our Golden Dataset
const GOLDEN_DATA_PATH = path.join(__dirname, 'golden_dataset.json');

// Interface for the Dataset
interface ExpectedRisk {
  concept: string;
  severity_min: 'Critical' | 'High' | 'Medium' | 'Low';
}

interface GoldenContract {
  id: string;
  contractType: string;
  perspective: string;
  text: string;
  expected_risks: ExpectedRisk[];
}

/**
 * The "Judge" function.
 * Uses a secondary prompt to evaluate if the AI's output successfully identified
 * the critical risks required by the Golden Dataset.
 */
async function evaluateRecall(recommendations: any[], expectedRisks: ExpectedRisk[]): Promise<{ pass: boolean, reasoning: string }> {
  // If there are no recommendations but there are expected risks, automatic fail
  if (recommendations.length === 0 && expectedRisks.length > 0) {
    return { pass: false, reasoning: 'No recommendations generated.' };
  }

  // Serialize the output to string
  const outputJsonStr = JSON.stringify(recommendations, null, 2);
  const expectedJsonStr = JSON.stringify(expectedRisks, null, 2);

  const judgePrompt = `
You are an expert Legal AI Judge. Your job is to evaluate if an AI's contract analysis successfully identified the expected critical risks.

EXPECTED RISKS:
${expectedJsonStr}

ACTUAL AI RECOMMENDATIONS:
${outputJsonStr}

Did the AI successfully identify ALL of the expected risks in its recommendations? It does not need to use the exact phrasing, but the core legal concept must be flagged with at least the requested severity.

Respond in JSON format:
{
  "pass": boolean,
  "reasoning": "string explaining what was missed or why it passed"
}
`;

  try {
    const response = await callGemini(
      judgePrompt,
      "You are a strict, objective evaluator of legal AI systems.",
      true // Expect JSON
    );

    return response as { pass: boolean, reasoning: string };
  } catch (error) {
    console.error("Judge Evaluation Failed", error);
    return { pass: false, reasoning: 'Judge failed to evaluate.' };
  }
}

describe('Eval-Driven Development: Accuracy Harness', () => {
  let dataset: GoldenContract[] = [];

  beforeAll(() => {
    // Check if API key is set
    if (!process.env.VITE_GEMINI_API_KEY) {
      console.warn("⚠️ VITE_GEMINI_API_KEY is not set. Evaluations may fail if Supabase Edge Functions aren't reachable locally.");
    }

    // Load dataset
    const rawData = fs.readFileSync(GOLDEN_DATA_PATH, 'utf-8');
    dataset = JSON.parse(rawData);
  });

  it('should load the golden dataset', () => {
    expect(dataset.length).toBeGreaterThan(0);
  });

  // Dynamically generate tests for each contract in the golden dataset
  dataset.forEach((contract) => {
    it(`should successfully analyze and catch risks for: ${contract.id}`, async () => {
      // 1. Run the target function (analyzeDocument)
      // Note: In an eval harness, we pass a dummy abort signal and dummy callbacks
      const abortController = new AbortController();
      const result = await analyzeDocument(
        contract.text,
        contract.perspective,
        ['Party A', 'Party B'],
        () => {}, // progress
        () => {}, // streaming recs
        'standard',
        contract.contractType,
        abortController.signal
      );

      // 2. Assert standard quality metrics
      expect(result.recommendations.length).toBeGreaterThan(0);
      expect(result.score).toBeDefined();

      // 3. Run the LLM-as-a-Judge to evaluate semantic recall
      const evalResult = await evaluateRecall(result.recommendations, contract.expected_risks);
      
      // Log reasoning if it fails
      if (!evalResult.pass) {
        console.error(`\n❌ EVAL FAILED for ${contract.id}: ${evalResult.reasoning}\n`);
      }

      // 4. Assert the judge passed the output
      expect(evalResult.pass).toBe(true);

    }, 60000); // 60s timeout for LLM calls
  });
});
