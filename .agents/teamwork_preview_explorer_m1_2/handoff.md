# Handoff Report: IndicatorEngine.js & PriceSignalsHUD.jsx Technical Specifications

## 1. Observation
Direct observations from project specification files and workspace environment:
- **ORIGINAL_REQUEST.md** (`/Users/ute/Dev/sentaient_conversion_hub_7382-Website/.agents/ORIGINAL_REQUEST.md`, lines 12-14): "Support technical indicator overlays (SMA, EMA, Bollinger Bands) and price signals HUD (RSI, MACD)."
- **PROJECT.md** (`/Users/ute/Dev/sentaient_conversion_hub_7382-Website/PROJECT.md`, lines 54-56): Code layout specifies `src/components/charting/IndicatorEngine.js` and `src/components/charting/PriceSignalsHUD.jsx`.
- **SCOPE.md** (`/Users/ute/Dev/sentaient_conversion_hub_7382-Website/.agents/sub_orch_m1/SCOPE.md`, Feature 2): "Technical indicator overlays (SMA, EMA, Bollinger Bands) and price signals HUD (RSI, MACD)."
- **plan.md** (`/Users/ute/Dev/sentaient_conversion_hub_7382-Website/.agents/sub_orch_m1/plan.md`, line 9): Explorer 2 focus assigned to `IndicatorEngine.js` (SMA, EMA, Bollinger Bands, RSI, MACD formulas, precision, edge cases) and `PriceSignalsHUD.jsx`.
- **package.json** (`/Users/ute/Dev/sentaient_conversion_hub_7382-Website/package.json`): Uses React 18, Vite 5, Tailwind CSS, Lucide icons, Framer Motion.

---

## 2. Logic Chain
1. **Mathematical Accuracy & Series Compatibility**: Lightweight-Charts requires time-series arrays formatted as `{ time: timestamp, value: number | null }`. To maintain flawless synchronization with candlestick data across all 21 timeframe resamplings, indicator outputs must strictly match input array length and timestamps 1:1.
2. **Warm-up Period Alignment**: Indicators requiring lookback histories (e.g. 20-period SMA, 14-period RSI, 26-period slow EMA for MACD) cannot produce valid output values for initial bars. These indices MUST be padded with `{ time: candles[i].time, value: null }` rather than omitted, preserving index alignment.
3. **Algorithmic Efficiency ($O(N)$ Sliding Windows)**: Financial charting components recalculate indicators on resolution changes or streaming tick updates. Calculating SMA/EMA/RSI with sliding windows or recursive formulas guarantees $O(N)$ total time complexity per recalculation pass, preventing main-thread UI jank.
4. **HUD Component Integration**: `PriceSignalsHUD.jsx` operates as an overlay component on top of the Lightweight-Charts canvas. It provides instant visual feedback for current values, alerts on extreme conditions (RSI Overbought $\ge 70$, RSI Oversold $\le 30$), flags MACD bullish/bearish crossovers, and displays price interactions with Bollinger Bands.

---

## 3. Caveats
- **EMA Convergence Warm-Up**: EMA uses recursive smoothing initialized with an $N$-period SMA seed. While mathematically valid at index $N-1$, true precision convergence (within $< 0.1\%$ of infinite history) requires a warm-up buffer of at least $3 \times N$ candles.
- **RSI Wilder's Smoothing vs Standard EMA**: Wilder's smoothing multiplier is $\alpha = 1/N$ (equivalent to an EMA smoothing factor of $2N - 1$), NOT the standard EMA multiplier $2/(N+1)$. Standard financial platforms (TradingView) strictly use Wilder's smoothing for RSI.
- **Live Streaming Candle Updates**: When the latest tick updates the unclosed candle at index $N-1$, indicator functions should support updating the last bar efficiently without mutating historical arrays.

---

## 4. Conclusion & Detailed Technical Specifications

### A. Technical Specification for `IndicatorEngine.js`

#### Module Export Architecture
```javascript
// src/components/charting/IndicatorEngine.js

export function calculateSMA(candles, period = 20) { ... }
export function calculateEMA(candles, period = 12) { ... }
export function calculateBollingerBands(candles, period = 20, multiplier = 2.0) { ... }
export function calculateRSI(candles, period = 14) { ... }
export function calculateMACD(candles, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) { ... }
export function calculateAllIndicators(candles, config = {}) { ... }
```

---

#### 1. Simple Moving Average (SMA)
- **Formula**:
  $$SMA_t(N) = \frac{1}{N} \sum_{i=0}^{N-1} Close_{t-i}$$
- **Algorithm (Optimized Sliding Window)**:
  - For index $t < N - 1$: Output `{ time: candles[t].time, value: null }`.
  - For $t = N - 1$: Sum $Close_0 \dots Close_{N-1}$ and divide by $N$.
  - For $t \ge N$: $sum_t = sum_{t-1} + Close_t - Close_{t-N}$, then $SMA_t = \frac{sum_t}{N}$.
- **Lookback Period**: Default $N = 20$ (configurable: 50, 200).
- **Warm-up**: First $N - 1$ bars return `null`. Minimum required candles: $N$.

---

#### 2. Exponential Moving Average (EMA)
- **Formula**:
  $$\alpha = \frac{2}{N + 1}$$
  $$EMA_t(N) = Close_t \times \alpha + EMA_{t-1}(N) \times (1 - \alpha)$$
- **Initialization & Algorithm**:
  - Seed value at index $t = N - 1$:
    $$EMA_{N-1} = \frac{1}{N} \sum_{i=0}^{N-1} Close_i \quad (\text{SMA of first } N \text{ bars})$$
  - For $t < N - 1$: Output `{ time: candles[t].time, value: null }`.
  - For $t \ge N$: Recursive calculation using smoothing factor $\alpha$.
- **Warm-up Requirement**: Minimum $N$ candles for seed. For high precision, historical array should include at least $3 \times N$ candles.

---

#### 3. Bollinger Bands (BB)
- **Formula**:
  - **Middle Band ($MB_t$)**: $N$-period SMA of Close prices.
    $$MB_t = SMA_t(N)$$
  - **Standard Deviation ($\sigma_t$)**: Population standard deviation over $N$ window:
    $$\sigma_t = \sqrt{ \frac{1}{N} \sum_{i=0}^{N-1} (Close_{t-i} - MB_t)^2 }$$
  - **Upper Band ($UB_t$)**: $UB_t = MB_t + (K \times \sigma_t)$
  - **Lower Band ($LB_t$)**: $LB_t = MB_t - (K \times \sigma_t)$
- **Lookback & Multiplier**: Default $N = 20$, $K = 2.0$.
- **Return Format**:
  ```javascript
  {
    upper: Array<{ time, value }>,
    middle: Array<{ time, value }>,
    lower: Array<{ time, value }>
  }
  ```
- **Warm-up**: First $N-1$ bars return `value: null` for all 3 bands.

---

#### 4. Relative Strength Index (RSI) with Wilder's Smoothing
- **Formula**:
  Let $\Delta_t = Close_t - Close_{t-1}$ for $t \ge 1$.
  - Gain $G_t = \max(\Delta_t, 0)$
  - Loss $L_t = \max(-\Delta_t, 0)$
  - **Initial SMA Seed (at index $t = N$)**:
    $$AvgGain_N = \frac{1}{N} \sum_{i=1}^{N} G_i, \quad AvgLoss_N = \frac{1}{N} \sum_{i=1}^{N} L_i$$
  - **Wilder's Smoothing (for $t > N$)**:
    $$AvgGain_t = \frac{AvgGain_{t-1} \times (N - 1) + G_t}{N}$$
    $$AvgLoss_t = \frac{AvgLoss_{t-1} \times (N - 1) + L_t}{N}$$
  - **RSI Calculation**:
    $$RSI_t = \begin{cases}
      100 & \text{if } AvgLoss_t = 0 \\
      100 - \left(\frac{100}{1 + \frac{AvgGain_t}{AvgLoss_t}}\right) = 100 \times \frac{AvgGain_t}{AvgGain_t + AvgLoss_t} & \text{otherwise}
    \end{cases}$$
- **Lookback Period**: Default $N = 14$.
- **Warm-up Requirement**: Index $0 \dots N-1$ return `null`. First valid RSI value is at index $N$ (the 15th candle for $N=14$). Minimum required candles: $N + 1$ (15).

---

#### 5. Moving Average Convergence Divergence (MACD)
- **Parameters**: Fast Period = 12, Slow Period = 26, Signal Period = 9.
- **Algorithm**:
  1. Compute Fast EMA $EMA_{12}(t)$ and Slow EMA $EMA_{26}(t)$.
  2. Compute MACD Line for $t \ge 25$:
     $$MACD_t = EMA_{12}(t) - EMA_{26}(t)$$
  3. Compute Signal Line ($Signal_t$): 9-period EMA of $MACD$ line.
     - Initial Signal Seed at index $t = 25 + 8 = 33$:
       $$Signal_{33} = \frac{1}{9} \sum_{k=25}^{33} MACD_k$$
     - Subsequent $t > 33$: $Signal_t = MACD_t \times \frac{2}{9+1} + Signal_{t-1} \times \left(1 - \frac{2}{10}\right)$.
  4. Compute Histogram ($Hist_t$):
     $$Hist_t = MACD_t - Signal_t$$
- **Warm-up**: MACD line valid at index 25 (26th candle). Signal and Histogram valid at index 33 (34th candle). Indices $0 \dots 32$ return `null` for Signal and Histogram.
- **Histogram Color Map**:
  - `Hist > 0` & `Hist >= Hist[t-1]`: `#26a69a` (Bullish Expansion - Bright Green)
  - `Hist > 0` & `Hist < Hist[t-1]`: `#b2dfdb` (Bullish Contraction - Muted Green)
  - `Hist < 0` & `Hist <= Hist[t-1]`: `#ef5350` (Bearish Expansion - Bright Red)
  - `Hist < 0` & `Hist > Hist[t-1]`: `#ffcdd2` (Bearish Contraction - Muted Red)
- **Return Format**:
  ```javascript
  {
    macd: Array<{ time, value }>,
    signal: Array<{ time, value }>,
    histogram: Array<{ time, value, color }>
  }
  ```

---

#### 6. Summary of Lookback & Warm-up Requirements
| Indicator | Config Params | First Valid Index | Min Required Candles | Null Padding Indices |
|---|---|---|---|---|
| **SMA** | $N=20$ | $t = N - 1 = 19$ | $20$ | $0 \dots 18$ |
| **EMA** | $N=12$ | $t = N - 1 = 11$ | $12$ (36 recommended) | $0 \dots 10$ |
| **Bollinger Bands** | $N=20, K=2.0$ | $t = N - 1 = 19$ | $20$ | $0 \dots 18$ |
| **RSI** | $N=14$ | $t = N = 14$ | $15$ | $0 \dots 13$ |
| **MACD** | $12, 26, 9$ | MACD: $25$, Signal/Hist: $33$ | $34$ | MACD: $0 \dots 24$, Sig/Hist: $0 \dots 32$ |

---

### B. Technical Specification for `PriceSignalsHUD.jsx`

#### 1. Component Architecture & Props Specification
```typescript
interface PriceSignalsHUDProps {
  indicators: {
    sma?: Array<{ time: any, value: number | null }>;
    ema?: Array<{ time: any, value: number | null }>;
    bb?: {
      upper: Array<{ time: any, value: number | null }>;
      middle: Array<{ time: any, value: number | null }>;
      lower: Array<{ time: any, value: number | null }>;
    };
    rsi?: Array<{ time: any, value: number | null }>;
    macd?: {
      macd: Array<{ time: any, value: number | null }>;
      signal: Array<{ time: any, value: number | null }>;
      histogram: Array<{ time: any, value: number | null, color?: string }>;
    };
  };
  latestPrice?: number;
  hoverIndex?: number | null;
  config: {
    showSma: boolean;
    showEma: boolean;
    showBb: boolean;
    showRsi: boolean;
    showMacd: boolean;
  };
  onToggleIndicator?: (key: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}
```

---

#### 2. Indicator Legend Display Specifications
The HUD renders active indicator values for either the crosshair hovered bar or the latest candle:
- **SMA Pill**: `SMA(20): 142.50` (Blue accent dot `#2962FF`).
- **EMA Pill**: `EMA(12): 143.10` (Orange accent dot `#FF6D00`).
- **Bollinger Bands Pill**: `BB(20,2): U 146.20 | M 142.50 | L 138.80` (Purple `#8E24AA`).
- **RSI Pill**: `RSI(14): 68.4`
  - Normal ($30 < RSI < 70$): Neutral text pill (`text-slate-300`).
  - Overbought ($RSI \ge 70$): Red badge (`bg-red-500/20 text-red-400 border-red-500/40`).
  - Oversold ($RSI \le 30$): Green badge (`bg-emerald-500/20 text-emerald-400 border-emerald-500/40`).
- **MACD Pill**: `MACD: 1.25 | Sig: 0.95 | Hist: +0.30`
  - Color-coded text matching the current histogram bar state.

---

#### 3. Real-Time Signal & Alert Engine
`PriceSignalsHUD.jsx` evaluates the last 2 complete bars ($t-1$ and $t$) to trigger actionable signal badges:
1. **RSI Oversold Alert**:
   - Condition: $RSI_t \le 30$
   - UI Badge: `🟢 RSI OVERSOLD (X.X) - Bullish Reversal Area`
2. **RSI Overbought Alert**:
   - Condition: $RSI_t \ge 70$
   - UI Badge: `🔴 RSI OVERBOUGHT (X.X) - Bearish Reversal Area`
3. **MACD Bullish Crossover Alert**:
   - Condition: $MACD_{t-1} \le Signal_{t-1} \quad \text{AND} \quad MACD_t > Signal_t$
   - UI Badge: `🚀 MACD BULLISH CROSSOVER (Bullish Momentum)`
4. **MACD Bearish Crossover Alert**:
   - Condition: $MACD_{t-1} \ge Signal_{t-1} \quad \text{AND} \quad MACD_t < Signal_t$
   - UI Badge: `📉 MACD BEARISH CROSSOVER (Bearish Momentum)`
5. **Bollinger Lower Band Support Alert**:
   - Condition: $Low_t \le LowerBand_t$
   - UI Badge: `🛡️ Price touching Lower Bollinger Band`
6. **Bollinger Upper Band Breakout Alert**:
   - Condition: $High_t \ge UpperBand_t$
   - UI Badge: `⚡ Price touching Upper Bollinger Band`

---

#### 4. Visual Layout & Glassmorphic Overlay Styling
```jsx
// Floating Overlay HUD Container
<div className="absolute top-3 left-3 z-20 flex flex-col gap-2 max-w-md pointer-events-none select-none font-mono text-xs">
  {/* Header & Controls Panel */}
  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 shadow-xl pointer-events-auto">
    <div className="flex items-center gap-2 text-slate-200 font-semibold">
      <Activity className="w-4 h-4 text-cyan-400" />
      <span>Indicator Signals HUD</span>
    </div>
    {/* Indicator Toggle Buttons */}
  </div>

  {/* Active Indicator Values Grid */}
  <div className="grid grid-cols-1 gap-1.5 p-2.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 shadow-xl pointer-events-auto">
    {/* Indicator Pills */}
  </div>

  {/* Active Signal Badges */}
  {activeSignals.length > 0 && (
    <div className="flex flex-col gap-1 pointer-events-auto">
      {activeSignals.map(signal => (
        <div key={signal.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md border animate-pulse">
          {signal.label}
        </div>
      ))}
    </div>
  )}
</div>
```

---

## 5. Verification Method

To verify the mathematical correctness, edge cases, and layout compliance:

### Step 1: Unit & Precision Tests for `IndicatorEngine.js`
Run unit test suite covering indicator calculations:
```bash
npx vitest run tests/IndicatorEngine.test.js
```
Verify the following assertions in `tests/IndicatorEngine.test.js`:
1. **SMA**: Verify 20-period SMA on flat prices returns constant, array length matches input, first 19 elements are `null`.
2. **EMA**: Verify EMA initialization matches SMA of first $N$ elements, smoothing factor $\alpha = 2 / (N + 1)$.
3. **Bollinger Bands**: Verify $UB - MB == MB - LB$, standard deviation calculation matches population stddev formula.
4. **RSI**: Verify 14-period RSI on monotonically increasing prices returns 100, monotonically decreasing returns 0, Wilder's smoothing yields exact match against known reference dataset.
5. **MACD**: Verify signal line calculation matches 9-period EMA of MACD line, histogram matches $MACD - Signal$, first 33 bars of signal line are `null`.

### Step 2: Component Verification for `PriceSignalsHUD.jsx`
1. Render `PriceSignalsHUD` with mock indicator dataset containing crossover conditions.
2. Confirm active signals list displays correct `MACD BULLISH CROSSOVER` and `RSI OVERSOLD` badges.
3. Confirm toggle callbacks (`onToggleIndicator`) fire when user clicks indicator pills.
4. Verify non-blocking canvas clicks (`pointer-events-none` on container, `pointer-events-auto` on interactive pills).
