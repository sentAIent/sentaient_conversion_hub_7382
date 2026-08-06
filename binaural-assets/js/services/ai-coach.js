/**
 * ai-coach.js
 * Implements the 4 "Awesome LLM Apps" integrations:
 * 1. Voice AI Agent (Focus Coach)
 * 2. Text-to-Podcast (Morning Briefing)
 * 3. Scope Creep / Burnout Detector
 * 4. RAG over Tasks (Chat Insights)
 */

class AICoachService {
    constructor() {
        this.geminiKey = localStorage.getItem('mindwave_gemini_key') || '';
        this.synth = window.speechSynthesis;
        this.lastBurnoutIntervention = 0;
    }

    setKey(key) {
        this.geminiKey = key;
        localStorage.setItem('mindwave_gemini_key', key);
    }

    getKey() {
        return this.geminiKey;
    }

    /**
     * 1. Voice AI Agent
     * Uses native Web Speech API to act as a calm, guiding focus coach.
     */
    speak(text) {
        if (!this.synth) return;
        
        // Cancel any ongoing speech
        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Try to find a good voice (preferably female/calm for mindfulness)
        const voices = this.synth.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Samantha') || v.name.includes('Google US English') || v.name.includes('Female'));
        
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        utterance.rate = 0.9; // Slightly slower for a calming effect
        utterance.pitch = 1.0;
        
        this.synth.speak(utterance);
    }

    /**
     * 2. Morning Briefing (Text-to-Podcast style)
     * Reads the user's tasks aloud to prepare them for the day.
     */
    async playMorningBriefing() {
        // We assume leantime is exposed globally or passed in
        if (!window.leantime) {
            this.speak("Leantime is not connected. Please connect your account first.");
            return;
        }

        const tickets = window.leantime.getCachedTickets();
        if (!tickets || tickets.length === 0) {
            this.speak("Good morning. Your agenda is completely clear today. Enjoy the peace.");
            return;
        }

        // Filter for "To Do" or "In Progress"
        const activeTickets = tickets.filter(t => t.status !== 'done');
        
        if (activeTickets.length === 0) {
            this.speak("Good morning. All your tasks are completed. Take some time to relax.");
            return;
        }

        // Construct the briefing
        let briefing = `Good morning. You have ${activeTickets.length} active tasks today. `;
        
        // Mention top 2 tasks
        briefing += `Your top priorities are: ${activeTickets[0].headline}. `;
        if (activeTickets.length > 1) {
            briefing += `And: ${activeTickets[1].headline}. `;
        }
        
        briefing += "I will start the binaural focus engine now. Let's get to work.";

        this.speak(briefing);
    }

    /**
     * 3. Burnout & Scope Creep Detector
     * Intercepts biometrics and task load to trigger an intervention.
     */
    checkBurnout(heartRate, activeTicketsCount) {
        // Only intervene once every 10 minutes max to avoid annoyance
        const now = Date.now();
        if (now - this.lastBurnoutIntervention < 10 * 60 * 1000) return null;

        // Logic: High HR (>80) + High Task Load (>5) = Burnout Risk
        if (heartRate > 80 && activeTicketsCount > 5) {
            this.lastBurnoutIntervention = now;
            const interventionMsg = "I notice your heart rate is elevated and your task list is quite heavy. I am switching your frequency to 528 hertz for healing and relaxation. Please take a deep breath.";
            this.speak(interventionMsg);
            
            return {
                action: 'force_intent',
                intent: 'healing'
            };
        }

        return null;
    }

    /**
     * 4. RAG / AI Insights (Chat)
     * Uses Gemini to answer questions based on the user's local context.
     */
    async askInsights(question, contextData) {
        if (!this.geminiKey) {
            return "Please provide a Gemini API Key in the AI Settings to unlock RAG Insights.";
        }

        const prompt = `
        You are MindWave's AI Focus Coach. 
        The user has provided their current Leantime tasks and biometric data as context.
        Be concise, helpful, and act as a productivity and wellness coach.
        
        Context Data:
        Tasks: ${JSON.stringify(contextData.tickets || [])}
        Current Heart Rate: ${contextData.heartRate || 'Unknown'} BPM
        
        User Question: ${question}
        `;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.geminiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            const data = await response.json();
            
            if (data.error) {
                console.error("Gemini Error:", data.error);
                return `API Error: ${data.error.message}`;
            }

            if (data.candidates && data.candidates[0].content.parts[0].text) {
                return data.candidates[0].content.parts[0].text;
            }

            return "I couldn't generate an insight right now.";

        } catch (error) {
            console.error("Fetch error:", error);
            return "Failed to connect to the AI service. Check your network or API key.";
        }
    }
}

// Ensure voices are loaded (Chrome quirk)
if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
}

export const aiCoach = new AICoachService();
window.aiCoach = aiCoach;
