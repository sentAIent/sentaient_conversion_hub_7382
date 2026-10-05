// Disabled @xenova/transformers to prevent WebGL/WASM out-of-memory crashes on some devices.
class SemanticNavigator {
    constructor() {
        this.isReady = true;
        this.isLoading = false;
        
        this.targets = [
            "hero", "services", "portfolio", "about", "pricing", "contact"
        ];
    }

    async init() {
        return Promise.resolve();
    }

    async getDestination(userInput) {
        // Fallback to simple keyword matching since local AI is disabled
        const text = userInput.toLowerCase();
        for (const target of this.targets) {
            if (text.includes(target)) {
                return { target, confidence: 0.9 };
            }
        }
        
        // Additional keyword mappings
        if (text.includes("work") || text.includes("projects")) return { target: "portfolio", confidence: 0.8 };
        if (text.includes("cost") || text.includes("plans")) return { target: "pricing", confidence: 0.8 };
        if (text.includes("reach") || text.includes("email") || text.includes("support")) return { target: "contact", confidence: 0.8 };
        
        return { target: null, confidence: 0 };
    }
}

export const semanticNavigator = new SemanticNavigator();
