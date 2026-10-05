import { StateGraph, END } from '@langchain/langgraph';

// Define the state for our conversion graph
const graphState = {
    messages: {
        value: (x, y) => x.concat(y),
        default: () => [],
    },
    leadData: {
        value: (x, y) => ({ ...x, ...y }),
        default: () => ({}),
    },
    memoryContext: {
        value: (x, y) => ({ ...x, ...y }),
        default: () => ({}),
    },
    actionRequired: {
        value: (x, y) => y,
        default: () => null,
    }
};

// Node: Extract context from Memory (Mem0)
const retrieveMemoryNode = async (state) => {
    console.log("[Graph] Retrieving Memory Context...");
    // Mock memory retrieval for now until Mem0 is fully wired
    return { memoryContext: { previousInteractions: 2, sentiment: 'positive' } };
};

// Node: Analyze the lead data
const analyzeLeadNode = async (state) => {
    console.log("[Graph] Analyzing Lead Data...", state.leadData);
    const score = Math.random() * 100;
    
    let action = 'none';
    if (score > 80) action = 'schedule_meeting';
    else if (score > 50) action = 'create_crm_contact';

    return { actionRequired: action };
};

// Node: Execute CRM Action (Twenty)
const executeCRMNode = async (state) => {
    console.log("[Graph] Executing CRM Action: Creating Contact in Twenty...");
    return { messages: [{ role: 'system', content: 'Contact created in Twenty CRM.' }] };
};

// Node: Execute Scheduling Action (Cal.com)
const executeSchedulingNode = async (state) => {
    console.log("[Graph] Executing Scheduling Action: Generating Cal.com link...");
    return { messages: [{ role: 'system', content: 'Cal.com link generated.' }] };
};

// Conditional Edge to route based on action required
const routeAction = (state) => {
    if (state.actionRequired === 'schedule_meeting') return 'executeScheduling';
    if (state.actionRequired === 'create_crm_contact') return 'executeCRM';
    return END;
};

// Build the LangGraph
export const createConversionGraph = () => {
    const workflow = new StateGraph({ channels: graphState })
        .addNode('retrieveMemory', retrieveMemoryNode)
        .addNode('analyzeLead', analyzeLeadNode)
        .addNode('executeCRM', executeCRMNode)
        .addNode('executeScheduling', executeSchedulingNode)
        
        .addEdge('retrieveMemory', 'analyzeLead')
        .addConditionalEdges('analyzeLead', routeAction, {
            executeScheduling: 'executeScheduling',
            executeCRM: 'executeCRM',
            [END]: END
        })
        .addEdge('executeCRM', END)
        .addEdge('executeScheduling', END);

    // Set entry point
    workflow.setEntryPoint('retrieveMemory');

    return workflow.compile();
};
