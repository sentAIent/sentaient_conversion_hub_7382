import os
import json
from typing import TypedDict, Annotated, Sequence
import operator
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langgraph.graph import StateGraph, END


# Define the state for the LangGraph agent
class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    research_data: dict
    audit_results: dict
    final_report: str


def data_gatherer_node(state: AgentState):
    """Simulates fetching Alt-Data (e.g., from Crawlee/Reddit)"""
    print("Agent: Gathering data...")
    # Simulated data gathering
    data = {"sentiment_score": 0.85, "mentions": 1450, "trending": True}
    return {"research_data": data}


def quant_auditor_node(state: AgentState):
    """Simulates querying ClickHouse OHLCV anomalies"""
    print("Agent: Auditing data...")
    data = state.get("research_data", {})
    # Simulated audit
    audit = {"gips_compliant": True, "sharpe_estimate": 2.1}
    return {"audit_results": audit}


def synthesis_engine_node(state: AgentState):
    """Simulates writing the final institutional thesis"""
    print("Agent: Synthesizing thesis...")
    data = state.get("research_data", {})
    audit = state.get("audit_results", {})
    
    report = f"Institutional Thesis:\n- Sentiment: {'Bullish' if data.get('sentiment_score', 0) > 0.5 else 'Bearish'} (Score: {data.get('sentiment_score')})\n"
    report += f"- GIPS Compliant: {audit.get('gips_compliant')}\n"
    report += f"- Expected Sharpe: {audit.get('sharpe_estimate')}\n"
    report += "Recommendation: ALLOCATE."
    
    return {"final_report": report}

def build_research_graph():
    workflow = StateGraph(AgentState)
    
    # Add nodes
    workflow.add_node("gather_data", data_gatherer_node)
    workflow.add_node("audit_quant", quant_auditor_node)
    workflow.add_node("synthesize", synthesis_engine_node)
    
    # Define edges
    workflow.set_entry_point("gather_data")
    workflow.add_edge("gather_data", "audit_quant")
    workflow.add_edge("audit_quant", "synthesize")
    workflow.add_edge("synthesize", END)
    
    return workflow.compile()


def run_agent():
    app = build_research_graph()
    initial_state = {"messages": [HumanMessage(content="Analyze AAPL momentum strategy.")]}
    result = app.invoke(initial_state)
    print("\n=== Final Report ===")
    print(result.get("final_report"))

# Example usage
if __name__ == "__main__":
    run_agent()
