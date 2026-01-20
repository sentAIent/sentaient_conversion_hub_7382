# Feedback Survey Analytics Guide

## How to Access Survey Results

### Firebase Console

1. Go to https://console.firebase.google.com
2. Select your project
3. Navigate to **Firestore Database**
4. Click on **feedback** collection
5. View all responses

---

## Key Metrics to Track

### 1. **Net Promoter Score (NPS)**

**Formula:** % Promoters (9-10) - % Detractors (0-6)

**Scoring:**
- **0-6**: Detractors (unhappy, will churn)
- **7-8**: Passives (satisfied but not enthusiastic)
- **9-10**: Promoters (will recommend, loyal)

**Benchmarks:**
- **Above 50**: Excellent (world-class)
- **30-50**: Good
- **10-30**: Needs improvement
- **Below 10**: Crisis - major issues

**Your Target:** >30 in first month, >50 by month 3

---

### 2. **Product-Market Fit Score**

Look for these signals in responses:

✅ **Strong PMF indicators:**
- Experience = "life_changing" or "very_helpful"
- NPS score = 9 or 10
- Emotional words: "calm", "peaceful", "focused"
- Long improvement suggestions (shows investment)

❌ **Weak PMF indicators:**
- Experience = "neutral" or "disappointing"
- NPS score ≤ 6
- Empty improvement field
- Comparing to competitors unfavorably

**Target:** 40%+ responses showing strong PMF signals

---

### 3. **Feature Value Hierarchy**

**Count responses for "best_feature":**

Example distribution (what you want to see):
1. Binaural Beats Technology: 35%
2. Visual Meditations: 25%
3. Ease of Use: 15%
4. Sleep Stories: 12%
5. Journey Program: 8%
6. Custom Mixes: 5%

**Action:** Double down on top 3, improve bottom 3

---

### 4. **Use Case Analysis**

**Primary use cases tell you positioning:**

If most users say "Better Sleep":
→ Market as **sleep app** (compete with Calm)

If most say "Focus & Productivity":
→ Market as **productivity tool** (compete with Brain.fm)

**Target:** One clear winning use case at >40%

---

### 5. **Emotional Resonance**

**Track "feelings" checkbox:**

Strong product = diverse positive emotions:
- Calm: Expected baseline
- Focused: Productivity signal
- Peaceful: Meditation signal
- Energized: Unique differentiator
- Happy: Emotional connection

**Red flag:** If no diversity (everyone just "calm")

---

### 6. **Competitive Intelligence**

**"competitors_used" reveals:**

- "none" = Untapped market (good!)
- "calm" = Stealing from leader (validate!)
- "multiple" = Serial app-hoppers (convert them!)

**Cross-reference with NPS:**
- Used Calm + NPS 9-10 = You're beating them!
- Used multiple + NPS 9-10 = You're the winner!

---

## Analyzing Results

### Week 1: Quick Pulse Check

**Questions to answer:**
1. Is anyone rating 9-10? (If yes, you have something)
2. What's the most common "best_feature"? (Double down)
3. Any strong negative feedback? (Fix immediately)

### Month 1: Pattern Recognition

**Look for:**
1. **Who loves it most?** (ICP = Ideal Customer Profile)
   - Sleep users with anxiety?
   - Productivity hackers?
   - Meditation practitioners?

2. **Why do they love it?**
   - Find patterns in improvement suggestions
   - What features do promoters use most?

3. **Why do detractors leave?**
   - Missing features?
   - Confusing UX?
   - Not working as expected?

---

## Action Plan Based on Results

### If NPS < 20:
🚨 **Red Alert** - Don't scale marketing yet
1. Fix critical bugs
2. Interview top 10 detractors
3. Implement top 3 improvement requests
4. Re-survey

### If NPS 20-40:
⚠️ **Yellow Flag** - You have something, but not there yet
1. Find your power users (NPS 9-10)
2. Interview them - what makes them love it?
3. Build more of what they love
4. Reduce friction points

### If NPS > 40:
✅ **Green Light** - Product-market fit achieved!
1. Scale marketing
2. Build features promoters request
3. Convert passives to promoters
4. Ignore detractors (not your market)

---

## Query Examples (Firestore)

### Get all NPS Promoters (9-10):
```javascript
db.collection('feedback')
  .where('nps_score', '>=', 9)
  .orderBy('createdAt', 'desc')
  .get();
```

### Get unhappy users (0-6):
```javascript
db.collection('feedback')
  .where('nps_score', '<=', 6)
  .orderBy('createdAt', 'desc')
  .get();
```

### Get life-changing experiences:
```javascript
db.collection('feedback')
  .where('experience', '==', 'life_changing')
  .get();
```

---

## Building a Simple Dashboard

### Option 1: Google Sheets Integration

1. Use Zapier/Make to connect Firestore → Google Sheets
2. Auto-populate each survey response
3. Create pivot tables for analysis
4. Build charts for visualization

### Option 2: Manual Export (Quick Start)

1. Go to Firestore console
2. Click on feedback collection
3. Copy data to spreadsheet
4. Analyze in Excel/Sheets

### Option 3: Custom Dashboard (Advanced)

Build a simple React page that:
- Shows NPS score over time
- Displays feature value pie chart
- Lists recent improvement suggestions
- Highlights promoters vs detractors

---

## Red Flags to Watch For

🚩 **Survey completion rate < 10%**
- Survey too long or boring
- Triggered at wrong time
- Not enough incentive

🚩 **All responses neutral (NPS 7-8)**
- Product is "meh" - not compelling
- Missing differentiation
- No emotional connection

🚩 **High variance in "best_feature"**
- Unfocused product
- Trying to be everything
- Need to pick a lane

🚩 **Improvement suggestions all say "mobile app"**
- Web-only is a dealbreaker
- Prioritize native apps ASAP

---

## What Success Looks Like

**Month 1:**
- 50+ responses
- NPS: 25-35
- 1-2 "life_changing" responses
- Clear top feature emerging

**Month 3:**
- 200+ responses
- NPS: 35-45
- 20%+ "life_changing"
- Consistent emotional words
- Improvement requests getting more advanced

**Month 6:**
- 500+ responses
- NPS: 45-60
- 40%+ "life_changing" or "very_helpful"
- Users suggesting premium features
- Competitors users switching to you

---

## Next Steps

1. **Set up weekly review:** Every Monday, check last week's surveys
2. **Interview promoters:** Talk to NPS 9-10 users monthly
3. **Fix top 3 complaints:** From each survey batch
4. **Celebrate wins:** Share positive feedback with team (if you have one)
5. **Iterate features:** Build what promoters want, ignore detractors

**Remember:** This survey tells you if you're building something people LOVE, not just like. If you're not seeing "life_changing" responses, you don't have product-market fit yet.
