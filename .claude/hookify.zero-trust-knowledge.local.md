---
name: enforce-zero-trust-knowledge
enabled: true
event: prompt
conditions:
  - field: user_prompt
    operator: regex_match
    pattern: (?i)\b(fantasy|roster|player|team|coach|trade|depth chart|injury|schedule|stats|coordinator|draft)\b
---

> [!CAUTION]
> **MANDATORY ZERO-TRUST KNOWLEDGE PROTOCOL REQUIRED**
> You are analyzing NFL players, teams, coaches, or fantasy football for Fantasy Quant. Because your training data is out of date (it is currently the 2026 season), you are **STRICTLY FORBIDDEN** from stating any proper noun, team role, or 2025/2026 historical event based on your internal memory. 
> 
> You MUST verify every single claim using the following methods:
> 1. For structured data (players/stats/rosters): Run `python scratch/verify_team_roster.py player "Player Name"` or `python scratch/verify_team_roster.py team "Team Name"`.
> 2. For unstructured data (coaches, play-callers, injuries, trades): Use the `search_web` tool.
> 
> **CITATION REQUIREMENT:** You must explicitly cite the source URL in a hidden comment `<!-- source: URL -->` next to the claim in any markdown file it writes. If you cannot find a definitive 2026 source, you must state "Status Unknown" rather than guessing.
