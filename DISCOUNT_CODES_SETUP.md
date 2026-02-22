# Stripe Discount Codes Setup Guide

## Overview

MindWave includes a discount code system with 4 tiers:
- **10% Off**: Beta testers & early access
- **20% Off**: Extended beta & supporters  
- **50% Off**: Friends & family
- **100% Off**: Team members & employees

---

## Discount Codes

### 10% Off
- `ELEVATE10` - Promo 10% Off
- `BETA10` - Beta Tester (Legacy)
- `EARLYBIRD` - Early Access (Legacy)

### 15% Off
- `FREQUENCY15` - Promo 15% Off

### 20% Off
- `HARMONY20` - Promo 20% Off
- `BETA20` - Beta Supporter (Legacy)
- `FRIEND20` - Friend Discount (Legacy)

### 25% Off
- `CLARITY25` - Promo 25% Off

### 30% Off
- `RESONANCE30` - Promo 30% Off

### 40% Off
- `PRESENCE40` - Promo 40% Off

### 50% Off
- `ZEN50` - Promo 50% Off
- `FAMILY50` - Friends & Family (Legacy)
- `VIP50` - VIP Access (Legacy)

### 100% Off
- `NIRVANA100` - Promo 100% Off
- `TEAM100` - Team Member (Legacy)
- `STAFF` - Staff (Legacy)
- `FOUNDER` - Founder Circle (Legacy)

---

## Setting Up in Stripe

### Step 1: Create Coupons in Stripe Dashboard

1. **Go to Stripe Dashboard** → **Products** → **Coupons**
2. **Click "Create coupon"** for each code

#### For 10% Off Codes (BETA10, EARLYBIRD):

```
ID: BETA10 (must match exactly)
Type: Percentage discount
Discount: 10%
Duration: Forever (or "Once" for one-time use)
Applies to: Specific products (select Yogi Monthly, Yogi Annual, Buddha Monthly, Buddha Annual)
```

Repeat for `EARLYBIRD`

#### For 20% Off Codes (BETA20, FRIEND20):

```
ID: BETA20
Type: Percentage discount
Discount: 20%
Duration: Forever
Applies to: Specific products
```

#### For 50% Off Codes (FAMILY50, VIP50):

```
ID: FAMILY50
Type: Percentage discount
Discount: 50%
Duration: Forever
Applies to: Specific products
```

#### For 100% Off Codes (TEAM100, STAFF, FOUNDER):

```
ID: TEAM100
Type: Percentage discount
Discount: 100%
Duration: Forever
Applies to: Specific products
Max redemptions: (set limit, e.g., 10 for team members)
```

> [!IMPORTANT]
> The coupon **ID must match exactly** the code in `discount-codes.js`. IDs are case-sensitive in Stripe.

---

## Step 2: Test Discount Codes

### In Test Mode:

1. Create test coupons with same IDs
2. Open pricing modal in app
3. Click "Have a discount code?"
4. Enter code (e.g., `BETA10`)
5. Click "Apply"
6. Verify:
   - ✅ Price updates with strikethrough
   - ✅ Discount badge shows
   - ✅ Checkout redirects to Stripe with discount applied

### Test Checkout URL:

You should see this parameter in the Stripe URL:
```
&discounts[0][coupon]=BETA10
```

---

## Step 3: Analytics & Tracking

### Discount usage is tracked in:

1. **Firestore** → `discount_usage` collection
   - Code, tier, user ID, timestamp

2. **Google Analytics** → Custom event
   - Event: `feature_use`
   - Parameters: `discount_applied_{CODE}_{TIER}`

### View usage in Firestore:

```javascript
db.collection('discount_usage')
  .where('code', '==', 'BETA10')
  .get()
  .then(snapshot => {
    console.log(`BETA10 used ${snapshot.size} times`);
  });
```

---

## Step 4: Managing Discount Codes

### Add New Code:

1. **Edit** `discount-codes.js`
2. **Add to** `DISCOUNT_CODES` object:

```javascript
'NEWCODE': { discount: 15, type: 'custom', description: 'Custom Offer' }
```

3. **Create coupon** in Stripe with ID `NEWCODE`
4. **Deploy** updated code

### Remove/Expire Code:

**Option A: Delete from code**
- Remove from `DISCOUNT_CODES` object
- Code will become invalid immediately

**Option B: Expire in Stripe**
- Go to Stripe Dashboard → Coupons → Find coupon
- Click "..." → "Archive"
- Code will fail at checkout but still validate in app

**Best Practice:** Do both for clean removal

---

## Step 5: Discount Code Strategy

### When to Use Each Tier:

**10% Off** (`BETA10`, `EARLYBIRD`)
- Initial launch period
- Early adopters
- Product Hunt launch
- Newsletter subscribers

**20% Off** (`BETA20`, `FRIEND20`)
- Extended beta period
- Referrals from existing users
- Small influencer partnerships
- Feedback providers

**50% Off** (`FAMILY50`, `VIP50`)
- Close personal network
- High-value beta testers
- Strategic partnerships
- Content creators (case studies)

**100% Off** (`TEAM100`, `STAFF`, `FOUNDER`)
- Employees
- Co-founders
- Key advisors
- Critical alpha testers

> [!TIP]
> **Set redemption limits** on 50% and 100% codes to prevent abuse

---

## Step 6: Communicating Discount Codes

### Email Template:

```
Subject: Your MindWave Early Access Code 🎁

Hey [Name],

Thanks for being an early supporter! Here's your exclusive discount code:

🎟️ Code: BETA10
💰 Discount: 10% off any plan
⏰ Valid: Forever

Get started: https://mindwave.app/pricing

Just enter your code at checkout!

- The MindWave Team
```

### For Special Codes:

```
Subject: Welcome to the MindWave Team! 

Your team access code: TEAM100 (100% off)

This gives you free access to all premium features.

Important: This code is for internal use only. 
Do not share publicly.
```

---

## Step 7: Troubleshooting

### Code Not Working:

1. **Check Stripe coupon ID** matches exactly
2. **Verify coupon is active** (not archived)
3. **Check redemption limit** hasn't been reached
4. **Ensure coupon applies to product** (Yogi/Buddha tiers)

### Discount Not Appearing at Checkout:

1. **Check Stripe logs** for errors
2. **Verify webhook** is receiving discount metadata
3. **Test in Stripe test mode** first

### Analytics Not Tracking:

1. **Check Firestore security rules** allow writes
2. **Verify GA4** measurement ID is correct
3. **Check browser console** for errors

---

## Revenue Impact

### With Discount Codes:

Assuming 30% of users use codes:

**Scenario:** 1,000 Yogi Monthly subscribers

| Code Usage | Users | Revenue/mo | Impact |
|------------|-------|------------|--------|
| No code (70%) | 700 | $9,800 | Baseline |
| 10% off (20%) | 200 | $2,520 | -$280 |
| 20% off (8%) | 80 | $896 | -$224 |
| 50% off (2%) | 20 | $140 | -$140 |
| **Total** | 1,000 | **$13,356** | **-$644/mo** |

**Net:** $13,356 vs $14,000 = **95.4% of full price**

**Worth it?** YES - Discounts drive signups and word-of-mouth.

---

## Best Practices

✅ **DO:**
- Set redemption limits on high-discount codes
- Track usage via analytics
- Expire codes after launch periods
- Use different codes for different campaigns
- Make IDs memorable and relevant

❌ **DON'T:**
- Share 100% codes publicly
- Create too many active codes (confusing)
- Offer permanent 50%+ discounts to everyone
- Forget to update Stripe when changing codes
- Use the same code across multiple campaigns

---

## Next: Deploy to Production

Once codes are set up in Stripe test mode and working:

1. **Create production coupons** with same IDs
2. **Deploy updated code** to production
3. **Test one code** end-to-end in production
4. **Share codes** with respective groups
5. **Monitor usage** in Firestore & GA4

**You're ready to offer discounts! 🎉**
