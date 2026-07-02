# Agent Behavioral Rules

1. **SURGICAL EDITS ONLY:** You are strictly forbidden from replacing large, contiguous blocks of code (>10 lines) if you are only modifying a few lines within that block.
2. **USE MULTI-REPLACE:** You must use the `multi_replace_file_content` tool to make targeted, isolated edits to individual lines or small chunks, preserving all intermediate code.
3. **NO BLIND EDITS:** You must use `view_file` to read the exact line numbers and current code state immediately before executing any file replacement. Do not rely on context memory.
