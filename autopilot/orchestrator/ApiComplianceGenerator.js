import { OdysseusConnector } from './OdysseusConnector.js';

/**
 * ApiComplianceGenerator
 * 
 * An AutoPilot orchestration agent that helps users automatically generate
 * strictly compliant Developer Portal applications (TikTok, Meta, X) based on
 * their app's URL or description.
 */
export class ApiComplianceGenerator {
    

    constructor() {
        this.odysseus = new OdysseusConnector();
    }

    /**
     * Generates a complete API Compliance Package for any given app URL or description.
     * 
     * @param appInput The URL or brief description of the user's application.
     * @param targetPlatform The API portal being applied for (e.g. TikTok, Meta, X).
     */
    async generateCompliancePackage(appInput, targetPlatform = 'TikTok') {
        console.log(`[ApiComplianceGenerator] Initiating research phase for app: ${appInput}`);
        
        // Step 1: Deep Research using Odysseus AI to understand the app
        const researchQuery = `Analyze the application at/described as: "${appInput}". Identify its core value proposition, target audience, primary features, and how it handles user data. Return a dense summary focusing on workflows that require social media APIs.`;
        const researchReport = await this.odysseus.performDeepResearch(researchQuery);

        console.log(`[ApiComplianceGenerator] Research complete. Generating compliance package for ${targetPlatform}...`);

        // Step 2: Generate the final compliance answers
        const systemPrompt = `You are an elite API Compliance and Legal Strategy Expert. Your job is to generate the exact copy-paste answers required to pass strict Developer Portal App Reviews for platforms like TikTok, Meta, and X.
Reviewers are looking for strict adherence to privacy, explicit user consent, and clear non-spam workflows. Be extremely professional, concise, and avoid marketing fluff.`;

        const userPrompt = `
Using the following research report about an application, generate the exact copy-paste answers required to pass the ${targetPlatform} Developer Portal App Review.

App Research Report:
${researchReport}

Generate the following sections formatted cleanly in Markdown, strictly adhering to these developer portal constraints (especially for TikTok):
1. **App Name**: Max 50 characters. Provide a clean, compliant app name.
2. **App Description**: Explain the primary purpose of the app. CRITICAL: THIS MUST BE UNDER 120 CHARACTERS. Count the characters carefully.
3. **App Category**: Suggest the most appropriate category (e.g., Marketing, Tools, Utilities).
4. **Detailed Scope & Product Justification**: Provide a clear, detailed explanation of how each product and scope (e.g., Login Kit, Share to TikTok, Content API) is utilized within the app to enrich the user experience. 
5. **Step-by-Step User Flow**: A numbered list showing the exact end-to-end user journey (from clicking the TikTok button to the final API action). Emphasize that actions are explicitly initiated by the user.
6. **Demo Video Script / Checklist**: Provide a brief checklist of exactly what the user must record in their demo video (e.g., showing the app opening, connecting the account, selecting the product, authorizing permissions, and the final result). Note that the video must be under 50 MB.
7. **Data Handling Summary**: A brief summary of how the app handles OAuth tokens and user data securely (AES-256, strictly no selling of data).
8. **Legal Links**: Explicitly list the URLs for the Privacy Policy and Terms of Service (extract these from the research report or provide standard placeholder paths like `/privacy` and `/terms`). These are strictly mandatory for submission.

Ensure the output is 100% ready to be directly copy-pasted into the ${targetPlatform} developer portal "Submit for Review" form by the user.
`;

        const compliancePackage = await this.odysseus.generateCompletion(systemPrompt, userPrompt);
        
        console.log(`[ApiComplianceGenerator] Package generated successfully.`);
        return compliancePackage;
    }
}
