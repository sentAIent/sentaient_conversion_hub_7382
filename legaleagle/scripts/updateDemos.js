import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Since the Gemini API is rate-limiting the rapid execution of 5 deep analyses on the free tier,
// we will statically construct realistic, highly detailed demo data for these platforms here.
// These mock the exact expected output of the Gemini API matching the TS interfaces.

const DEMO_PLATFORMS = [
  {
    id: "instagram",
    name: "Instagram Terms of Service",
    documentText: "Welcome to Instagram.\nThese Terms of Use govern your use of Instagram.\nWe do not claim ownership of your content, but you grant us a non-exclusive, fully paid and royalty-free, transferable, sub-licensable, worldwide license to use the Content that you post on or in connection with Instagram. We can remove any content or information you share on the Service if we believe that it violates these Terms of Use, our policies, or we are permitted or required to do so by law. You waive your right to a class action lawsuit and agree to resolve all disputes through individual arbitration.",
    score: 35,
    swot: {
      strengths: ["Clear dispute resolution mechanism", "Explicit age restrictions"],
      weaknesses: ["Aggressively broad content license granted to Meta", "Unilateral termination rights"],
      opportunities: ["Opt-out period for arbitration (rarely exercised)"],
      threats: ["Users lose commercial rights to their own images", "Shadowbanning without recourse"]
    },
    recommendations: [
      {
        id: 1,
        section: "Content License",
        severity: "Critical",
        category: "Intellectual Property",
        title: "Broad Content License",
        roastTitle: "You're Making Zuckerberg Rich For Free",
        currentText: "you grant us a non-exclusive, fully paid and royalty-free, transferable, sub-licensable, worldwide license to use the Content that you post",
        proposedText: "you grant us a limited, revocable, non-transferable license to display your Content solely for the purpose of operating the Instagram Service. This license terminates when you delete your Content.",
        legalBasis: "The current broad license effectively strips creators of exclusive commercial rights to their own photography. Meta can sub-license your content to third parties without paying you.",
        roastComment: "Wow, so they can take that photo of your dog, slap it on a billboard in Tokyo, sub-license it to a dog food company, and you get absolutely nothing. Brilliant.",
        scoreImpact: 20,
        accepted: false
      },
      {
        id: 2,
        section: "Dispute Resolution",
        severity: "High",
        category: "Liability",
        title: "Class Action Waiver",
        roastTitle: "No Strength in Numbers",
        currentText: "You waive your right to a class action lawsuit and agree to resolve all disputes through individual arbitration.",
        proposedText: "Users retain the right to participate in class action lawsuits for widespread data breaches or systematic privacy violations.",
        legalBasis: "Class action waivers force users into private arbitration where corporate entities win the vast majority of cases. It prevents collective legal action against systemic abuses.",
        roastComment: "If they leak the passwords of a million people, you all have to sue them individually. It's the legal equivalent of divide and conquer.",
        scoreImpact: 15,
        accepted: false
      }
    ]
  },
  {
    id: "facebook",
    name: "Facebook Terms of Service",
    documentText: "Welcome to Facebook.\nWe use the data we have to deliver our products, including to personalize features and content and make suggestions for you. You grant us a non-exclusive, transferable, sub-licensable, royalty-free, and worldwide license to host, use, distribute, modify, run, copy, publicly perform or display, translate, and create derivative works of your content. We don't sell your personal data to advertisers, but we use it to show you relevant ads. We can suspend or terminate your account if you violate our Community Standards.",
    score: 28,
    swot: {
      strengths: ["Detailed Community Standards"],
      weaknesses: ["Massive data harvesting mandate", "Invasive tracking across third-party sites"],
      opportunities: ["Privacy settings allow some limitation of data sharing"],
      threats: ["Algorithmic manipulation of content feed", "Complete loss of privacy regarding browsing habits"]
    },
    recommendations: [
      {
        id: 1,
        section: "Data Usage",
        severity: "Critical",
        category: "Privacy",
        title: "Invasive Data Harvesting for Ads",
        roastTitle: "The Panopticon is Real",
        currentText: "We use the data we have to deliver our products, including to personalize features and content and make suggestions for you... we use it to show you relevant ads.",
        proposedText: "We will only use your data to provide core functional services. We will not use off-platform browsing data to target advertising without explicit, affirmative opt-in consent.",
        legalBasis: "The current phrasing allows Facebook to track user behavior not just on-platform, but across the wider internet via tracking pixels, creating an incredibly invasive shadow profile.",
        roastComment: "They know you bought those weird socks on Amazon before you even put them on. They say they don't 'sell' your data, they just rent access to your brain.",
        scoreImpact: 25,
        accepted: false
      }
    ]
  },
  {
    id: "tiktok",
    name: "TikTok Terms of Service",
    documentText: "Welcome to TikTok.\nBy using the Services, you grant us an unconditional irrevocable, non-exclusive, royalty-free, fully transferable, perpetual worldwide license to use, modify, adapt, reproduce, make derivative works of, publish and/or transmit your User Content in any format and on any platform, either now known or hereinafter invented. We collect biometric identifiers and biometric information as defined under US laws, such as faceprints and voiceprints, from your User Content.",
    score: 15,
    swot: {
      strengths: ["Clear disclosures of data collection (legally compliant)"],
      weaknesses: ["Aggressive biometric data collection", "Perpetual, irrevocable licenses"],
      opportunities: ["Opt-out options in certain US states (CCPA)"],
      threats: ["Foreign intelligence risks", "Irrevocable loss of biometric privacy"]
    },
    recommendations: [
      {
        id: 1,
        section: "Biometric Data",
        severity: "Critical",
        category: "Privacy",
        title: "Faceprint and Voiceprint Harvesting",
        roastTitle: "They're Cloning You",
        currentText: "We collect biometric identifiers and biometric information as defined under US laws, such as faceprints and voiceprints, from your User Content.",
        proposedText: "We will not collect, store, or process biometric identifiers without separate, explicit written consent, and all such data will be stored locally on your device.",
        legalBasis: "Harvesting faceprints and voiceprints presents massive identity theft and deepfake risks. In jurisdictions like Illinois (BIPA), this requires highly specific consent.",
        roastComment: "They're explicitly taking your face and voice. When an AI clone of you starts calling your grandma asking for money, you literally agreed to let them build the model.",
        scoreImpact: 30,
        accepted: false
      },
      {
        id: 2,
        section: "Content License",
        severity: "Critical",
        category: "Intellectual Property",
        title: "Irrevocable, Perpetual License",
        roastTitle: "Forever Means Forever",
        currentText: "you grant us an unconditional irrevocable... perpetual worldwide license to use... your User Content in any format and on any platform, either now known or hereinafter invented.",
        proposedText: "you grant us a license to use your User Content only while you maintain an active account. The license is revoked upon account deletion.",
        legalBasis: "Unlike most platforms, TikTok claims a 'perpetual' and 'irrevocable' license. Even if you delete your account, they claim the legal right to keep using your videos forever.",
        roastComment: "'Hereinafter invented'? They're reserving the right to beam your embarrassing dance videos into people's brain chips in the year 2075. And you can't stop them.",
        scoreImpact: 25,
        accepted: false
      }
    ]
  },
  {
    id: "x",
    name: "X (Twitter) Terms of Service",
    documentText: "These Terms of Service govern your access to X.\nYou retain your rights to any Content you submit, post or display on or through the Services. What's yours is yours. However, by submitting, posting or displaying Content on or through the Services, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such Content. We may also use your content to train our machine learning and artificial intelligence models.",
    score: 40,
    swot: {
      strengths: ["Explicitly states 'What's yours is yours'"],
      weaknesses: ["AI training opt-out is hidden and complex"],
      opportunities: ["Premium subscribers get more control"],
      threats: ["Content can be ingested into Grok LLM automatically"]
    },
    recommendations: [
      {
        id: 1,
        section: "AI Training",
        severity: "High",
        category: "Intellectual Property",
        title: "Default AI Model Ingestion",
        roastTitle: "Feeding the Machine",
        currentText: "We may also use your content to train our machine learning and artificial intelligence models.",
        proposedText: "We will not use your content to train our machine learning and artificial intelligence models unless you affirmatively opt-in through your account settings.",
        legalBasis: "Defaulting users into AI training datasets forces creators to surrender their work to train models that may eventually compete with them. This should be an opt-in regime.",
        roastComment: "You tweet a brilliant joke, Grok learns it, regurgitates it, gets the credit, and you don't even get a blue checkmark out of it.",
        scoreImpact: 20,
        accepted: false
      }
    ]
  },
  {
    id: "snapchat",
    name: "Snapchat Terms of Service",
    documentText: "Welcome to Snapchat.\nWhile we delete most Snaps and Chats from our servers after they've been opened, you grant us a worldwide, royalty-free, sublicensable, and transferable license to host, store, use, display, reproduce, modify, adapt, edit, publish, and distribute your content. You also grant us the right to use your name, likeness, and voice in any commercial or sponsored content without compensation to you.",
    score: 25,
    swot: {
      strengths: ["Ephemeral messaging design protects some privacy"],
      weaknesses: ["Extreme commercialization rights over user likeness"],
      opportunities: ["Stronger protections for minors could be implemented"],
      threats: ["Users can be featured in ads without pay or explicit consent"]
    },
    recommendations: [
      {
        id: 1,
        section: "Commercial Rights",
        severity: "Critical",
        category: "Liability",
        title: "Uncompensated Use of Likeness",
        roastTitle: "You're Their Free Actor",
        currentText: "You also grant us the right to use your name, likeness, and voice in any commercial or sponsored content without compensation to you.",
        proposedText: "We will never use your name, likeness, or voice in commercial or sponsored content without your explicit, separate agreement and appropriate compensation.",
        legalBasis: "This clause attempts to waive standard Right of Publicity laws. It allows Snapchat to use your face in an advertisement for a third-party brand without paying you.",
        roastComment: "Congratulations on becoming the new face of an embarrassing medical ointment brand! No, you don't get paid. Yes, your crush will see it.",
        scoreImpact: 35,
        accepted: false
      }
    ]
  }
];

async function generateDemos() {
    console.log("Starting static demo generation (API bypassed for rate limits)...");
    
    for (const demo of DEMO_PLATFORMS) {
        console.log(`Processing ${demo.id}...`);
        
        try {
            // Generate roast mode by deeply modifying the standard recommendations
            const roastRecommendations = demo.recommendations.map(rec => ({
              ...rec,
              title: rec.roastTitle || rec.title,
              description: rec.roastComment || rec.legalBasis,
              type: "red_flag" // Assuming roast mode uses a specific type for the UI
            }));

            // Generate company legal perspective
            const companyRecommendations = demo.recommendations.map(rec => ({
              ...rec,
              title: "Protect Corporate Interests: " + rec.title,
              roastTitle: "Corporate Shielding",
              proposedText: "Ensure this clause is as broad as legally permissible to maximize operational flexibility and limit corporate liability.",
              legalBasis: "From the company's perspective, this clause provides essential protection against unpredictable user behavior and class action lawsuits. We recommend strengthening this clause rather than diluting it.",
              roastComment: "Keep it broad. We hold the cards.",
              scoreImpact: 10,
              severity: "Medium"
            }));

            const demoData = {
                id: demo.id,
                name: demo.name,
                documentText: demo.documentText,
                recommendations: demo.recommendations, // Fallback/Original
                userRecommendations: demo.recommendations,
                companyRecommendations: companyRecommendations,
                roastRecommendations: roastRecommendations,
                score: demo.score,
                swotData: demo.swot
            };
            
            const outputPath = path.join(__dirname, `../src/data/demos/${demo.id}.json`);
            fs.writeFileSync(outputPath, JSON.stringify(demoData, null, 2));
            console.log(`  Saved ${demo.id}.json successfully.`);
            
        } catch (err) {
            console.error(`Failed to process ${demo.id}:`, err);
        }
    }
    
    console.log("Finished generating demos!");
}

generateDemos();
