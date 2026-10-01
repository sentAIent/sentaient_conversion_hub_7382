# Context — Contango Quant Project Orchestrator

## Overview
Contango Quant is a hybrid Logical Information Machines and TradingView platform for quantitative and fundamental analysis, autonomous strategy execution, user KYC profiling, social leaderboards, and a peer-to-peer strategy marketplace.

## Key Requirements & Acceptance Criteria
- R1: Dynamic Charting & Analytical Gateway (21 timeframes, overlays SMA/EMA/BB, RSI/MACD HUD, trendline drawing, synced side-by-side split screen with locked time scale).
- R2: KYC Profile & Financial Statement Analyzer (Onboarding wizard for qualitative/quantitative risk/horizon/objectives, parsed financial statement file scanner generating portfolio allocation & thesis).
- R3: Leaderboard & P2P Strategy Marketplace (Social leaderboard by paper/live ROI, P2P strategy subscription marketplace with mock checkout).
- R4: Automated Trade Execution Engine (Alpaca Paper Trading API integration + fallback mock broker, real-time WebSocket tick broadcasts).
- R5: Database Persistence & Security Hardening (Supabase/PostgreSQL schema for profiles, KYC vectors, drawings, trade entries; rate limiting, Helmet, query depth boundaries).

## Target Workspace
/Users/ute/Dev/sentaient_conversion_hub_7382-Website
