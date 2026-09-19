import{r as n,j as e}from"./vendor-Dyybv8Jl.js";import{B as u,U as v,J as w,o as p,m as k,y as j,j as S,g as N,N as m,K as I,L as C,d as $}from"./main-DG9nszHu.js";import"./preload-helper-CS1eXPs2.js";function D(){const[a,o]=n.useState("beginner"),[l,h]=n.useState(""),[g,d]=n.useState({onboarding:!0,feed:!1,map:!1,storefront:!1,bounties:!1,analytics:!1,aether:!1}),x=()=>{d({onboarding:!0,feed:!0,map:!0,storefront:!0,bounties:!0,analytics:!0,aether:!0})},y=()=>{d({onboarding:!1,feed:!1,map:!1,storefront:!1,bounties:!1,analytics:!1,aether:!1})},b=t=>{d(r=>({...r,[t]:!r[t]}))},f=[{id:"onboarding",title:"Velvet Rope Onboarding & Referral System",category:"consumer",icon:e.jsx(m,{className:"w-5 h-5 text-amber-400"}),beginner:{value:"Join the exclusive community easily with an invite code.",steps:["Enter your private Invite Code when registering a new account.","Once inside, enjoy 7 days of complimentary Fire Premium access.","Keep your login streak active by opening the app daily to earn multipliers!"],tips:"If you don't have a code, request one from a friend who is already active on the platform."},intermediate:{value:"Leverage referral mechanics to unlock permanent rewards and streaks.",steps:["Share your custom Invite Code located inside your Profile tab.","When 3 of your contacts sync their address books and check in at a Swarm, the app automatically triggers a push notification alerting you to join them.","Maintain streaks: The app checks your `lastLoginDate`. Log in every 24 hours to increase your streak multiplier, directly scaling your bounty payout rewards."],tips:"Fire Premium status can be permanently unlocked by referring 5 active users."},expert:{value:"Deep architectural overview of onboarding constraints and streak state-machines.",dbSchema:`// schema.prisma snippet
model User {
  id             String        @id
  currentStreak  Int           @default(0)
  longestStreak  Int           @default(0)
  lastLoginDate  DateTime?
  isFirePremium  Boolean       @default(false)
  inviteCode     String?       @unique
  invitedById    String?
  invitedBy      User?         @relation("UserInvites", fields: [invitedById], references: [id])
  invitedUsers   User[]        @relation("UserInvites")
}`,graphql:`# Register / Sync User
mutation RegisterUser($inviteCode: String!) {
  registerUser(inviteCode: $inviteCode) {
    id
    isFirePremium
    currentStreak
  }
}

# Sync Contacts (FOMO alert endpoint)
mutation SyncContacts($phones: [String!]!) {
  syncContacts(phones: $phones) {
    id
    phone
  }
}`}},{id:"feed",title:"TikTok-Style Hyperlocal Video Feed",category:"consumer",icon:e.jsx(I,{className:"w-5 h-5 text-indigo-400"}),beginner:{value:"Explore your neighborhood through rich, short video clips.",steps:["Tap the 'Explore' tab in the app.","Swipe vertically to flip through videos posted by users directly at nearby venues.","Double-tap any video to send a glowing 'Like' to the creator."],tips:"The feed shows real, unedited clips of what places look like *right now*."},intermediate:{value:"Utilize deep linking to share viral moments and drive traffic.",steps:["Tap the 'Share' button overlay on any feed video.","The app generates a watermark deep link (`icebreaker://v/ID`).","Send the link to friends. When clicked, it automatically bypasses standard routing and deep-links directly into the video inside their Explore feed."],tips:"Shared videos that get clicked boost your user profile discoverability on the map."},expert:{value:"Video streaming and routing mechanics.",dbSchema:`// Video / Post schema
model Content {
  id        String   @id @default(uuid())
  type      String   // "video" or "text"
  mediaUrl  String?  // Video URL (mp4 stored in cloud)
  textBody  String
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  venueId   String?
  venue     Venue?   @relation(fields: [venueId], references: [id])
}`,graphql:`# Fetch video feed
query ExploreFeed($latitude: Float!, $longitude: Float!) {
  exploreFeed(latitude: $latitude, longitude: $longitude) {
    id
    type
    mediaUrl
    textBody
    user {
      id
      isFirePremium
    }
  }
}`}},{id:"map",title:"Interactive Geo-Swarm Map & Check-ins",category:"consumer",icon:e.jsx(C,{className:"w-5 h-5 text-rose-400"}),beginner:{value:"Locate active hotspots in your city and check in.",steps:["Navigate to the main Map screen.","Look for glowing pulse circles indicating active campaigns or swarms.","When you are within range of a venue, tap 'Check In' or scan the venue's QR code to verify your arrival."],tips:"Glowing nodes on the map represent places where discounts are currently active."},intermediate:{value:"Coordinate check-ins with others to trigger major group discounts.",steps:["A 'Swarm' triggers when multiple users check in at the same venue within a brief time frame.","Check in with at least 3 people to unlock the high-tier discount code set by the merchant.","Your check-in status automatically updates on the Map screen for others in the vicinity to see."],tips:"Watch for the 'Swarm Alert' push notification to find groups forming in real time."},expert:{value:"Geospatial queries, boundary calculations, and check-in validation.",dbSchema:`// CheckIn schema details
model CheckIn {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  venueId   String
  venue     Venue    @relation(fields: [venueId], references: [id])
  createdAt DateTime @default(now())
}`,graphql:`# Find active swarms within radius
query ActiveSwarmCampaigns($latitude: Float!, $longitude: Float!, $radiusKm: Float!) {
  activeSwarmCampaigns(latitude: $latitude, longitude: $longitude, radiusKm: $radiusKm) {
    id
    title
    targetCheckIns
    maxDiscount
    latitude
    longitude
  }
}

# Perform geospatial check-in
mutation CheckIn($venueId: ID!, $latitude: Float!, $longitude: Float!) {
  checkIn(venueId: $venueId, latitude: $latitude, longitude: $longitude) {
    id
    createdAt
  }
}`}},{id:"storefront",title:"Venue Storefront & Mobile Payments",category:"consumer",icon:e.jsx($,{className:"w-5 h-5 text-emerald-400"}),beginner:{value:"Order food, drinks, or merch directly from a venue profile.",steps:["Tap on any venue pin on the map to open its storefront profile.","Browse products listed (e.g., drinks, apparel) and click 'Add to Cart'.","Open your Cart and tap 'Checkout' to pay securely via credit card."],tips:"Keep your transaction confirmation screen open to show the venue staff when picking up your items."},intermediate:{value:"Automate checkout flows and stack discounts.",steps:["If you unlocked a Swarm discount earlier, it is automatically applied to your checkout subtotal.","Venues can dynamically update their digital storefront list in real time.","Checkout flows handle escrow states ensuring your money is held securely until the venue fulfills the order."],tips:"Check your 'Wallet' tab to review active vouchers or purchase history receipts."},expert:{value:"Stripe payments integration, order schemas, and storefront queries.",dbSchema:`// Storefront and Order schemas
model Storefront {
  id          String    @id @default(uuid())
  venueId     String    @unique
  name        String
  products    Product[]
}

model Order {
  id          String   @id @default(uuid())
  storefrontId String
  amount      Int      // in cents
  status      String   // PENDING, PAID, REFUNDED
}`,graphql:`# Query venue storefront
query VenueStorefront($venueId: ID!) {
  venueStorefront(venueId: $venueId) {
    id
    name
    products {
      id
      name
      price
      imageUrl
    }
  }
}`}},{id:"bounties",title:"Creator UGC Bounties",category:"merchant",icon:e.jsx(m,{className:"w-5 h-5 text-pink-400"}),beginner:{value:"Post video content for your favorite venues and get paid.",steps:["Select an active Bounty campaign at a nearby venue.","Record a video displaying your experience or purchasing a product.","Upload the video as proof in the app and tap 'Claim Bounty'."],tips:"Make sure your video is clear and displays the product or venue explicitly."},intermediate:{value:"Manage submissions, budgets, and track claims status.",steps:["Once submitted, your bounty goes into a 'Pending Review' state.","The venue owner reviews the video from their B2B Dashboard.","If approved, the reward budget is immediately deducted from the bounty's total pool, and payouts are routed directly to your creator wallet."],tips:"Maintain streak multipliers! A higher login streak boosts your payout reward by up to 2x."},expert:{value:"Escrow flows, review triggers, and Stripe Connect payouts.",dbSchema:`// Bounty & Claim schemas
model Bounty {
  id             String        @id @default(uuid())
  venueId        String
  title          String
  reward         Int           // in cents
  totalBudget    Int           // in cents
  isActive       Boolean       @default(false)
  claims         BountyClaim[]
}

model BountyClaim {
  id        String   @id @default(uuid())
  bountyId  String
  userId    String
  contentId String
  status    String   // PENDING, APPROVED, REJECTED
}`,graphql:`# Fund a new bounty (Stripe Checkout)
mutation CreateBountyCheckout($venueId: String!, $title: String!, $totalBudget: Int!) {
  createBountyCheckout(venueId: $venueId, title: $title, totalBudget: $totalBudget) # Returns Stripe session URL
}

# Review submission
mutation ReviewBountyClaim($claimId: ID!, $status: String!) {
  reviewBountyClaim(claimId: $claimId, status: $status)
}`}},{id:"analytics",title:"Merchant Analytics & Settings Dashboard",category:"merchant",icon:e.jsx(u,{className:"w-5 h-5 text-teal-400"}),beginner:{value:"Track your shop's performance and customer visits.",steps:["Open your B2B dashboard portal.","View customer counts, overall impressions, and storefront sales instantly.","Track details of active swarms taking place outside your shop."],tips:"Review your analytics daily to see which campaigns draw the most foot traffic."},intermediate:{value:"Optimize marketing budgets and campaign parameters.",steps:["Analyze customer conversion rates (impressions vs. check-ins).","Create and adjust Geo-Swarm targets to automatically trigger discount codes during slow business hours.","Review historical storefront sales data to adjust inventory levels."],tips:"Run multiple concurrent micro-bounties to see which target audiences provide higher engagement."},expert:{value:"Data collection endpoints, PostHog telemetry, and performance tracking.",dbSchema:`// Analytics metrics are calculated dynamically
VenueAnalytics {
  totalImpressions: Int
  storefrontSales: Int
  activeCheckIns: Int
}`,graphql:`# Query analytics dashboard metrics
query VenueAnalytics($venueId: ID!) {
  venueAnalytics(venueId: $venueId) {
    totalImpressions
    storefrontSales
  }
}`}},{id:"aether",title:"Aether P2P Offline Sync Network",category:"advanced",icon:e.jsx(p,{className:"w-5 h-5 text-sky-400"}),beginner:{value:"Stay connected and share profiles even when offline.",steps:["Open the 'Network' tab in the app.","Ensure your Wi-Fi and Bluetooth are active to connect with nearby users.","Send messages or swap digital contact cards directly without internet access."],tips:"Great for festivals, stadiums, or crowded areas with poor cellular service."},intermediate:{value:"Perform localized peer sharing and offline caching.",steps:["The app automatically caches data locally and queues mutations when offline.","As soon as you link with another peer or reconnect to the network, your actions sync.","Peer discovery uses localized multi-pass handshakes to verify check-in proximity."],tips:"Turn on 'Aether Sync' inside your advanced options to serve as a local offline relay."},expert:{value:"P2P local WebSocket syncing and distributed database architecture.",dbSchema:`// Local client-side sync queue schema
interface SyncQueueItem {
  id: string;
  mutation: string;
  variables: any;
  timestamp: number;
  retries: number;
}`,graphql:`# Aether synchronization query
subscription OnPeerMessage($peerId: ID!) {
  onPeerMessage(peerId: $peerId) {
    id
    senderId
    body
    timestamp
  }
}`}}],c=n.useMemo(()=>f.filter(t=>{const r=l.toLowerCase(),s=t.title.toLowerCase().includes(r),i=t.category.toLowerCase().includes(r);return s||i}),[l]);return e.jsxs("div",{className:"min-h-screen bg-[#07070a] text-gray-100 font-sans selection:bg-[#FF8C00] selection:text-white",children:[e.jsx("div",{className:"absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"}),e.jsx("div",{className:"absolute top-20 right-1/4 w-[400px] h-[400px] bg-orange-950/10 rounded-full blur-[120px] pointer-events-none"}),e.jsx("header",{className:"border-b border-gray-800/80 bg-gray-900/40 backdrop-blur-md sticky top-0 z-50",children:e.jsxs("div",{className:"max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/10",children:e.jsx(u,{className:"w-6 h-6 text-white"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent",children:"Icebreaker Interactive Tutorial"}),e.jsx("p",{className:"text-xs text-gray-400",children:"Complete multi-level user guide & tech specification"})]})]}),e.jsxs("div",{className:"flex items-center gap-1.5 p-1 bg-gray-950/80 rounded-xl border border-gray-800/60",children:[e.jsxs("button",{onClick:()=>o("beginner"),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${a==="beginner"?"bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md":"text-gray-400 hover:text-white"}`,children:[e.jsx(v,{className:"w-3.5 h-3.5"}),"Beginner"]}),e.jsxs("button",{onClick:()=>o("intermediate"),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${a==="intermediate"?"bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md":"text-gray-400 hover:text-white"}`,children:[e.jsx(w,{className:"w-3.5 h-3.5"}),"Power User"]}),e.jsxs("button",{onClick:()=>o("expert"),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${a==="expert"?"bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md":"text-gray-400 hover:text-white"}`,children:[e.jsx(p,{className:"w-3.5 h-3.5"}),"Expert / Dev"]})]})]})}),e.jsxs("main",{className:"max-w-6xl mx-auto px-6 py-10",children:[e.jsxs("section",{className:"mb-8 p-6 rounded-2xl border border-gray-800/80 bg-gray-900/20 backdrop-blur-sm relative overflow-hidden",children:[e.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-[#FF8C00]/5 rounded-full blur-[80px]"}),e.jsxs("h2",{className:"text-2xl font-semibold tracking-tight text-white mb-2 flex items-center gap-2",children:[e.jsx(k,{className:"w-6 h-6 text-orange-500"}),"Explore the Platform At Your Level"]}),e.jsxs("p",{className:"text-gray-400 text-sm max-w-3xl leading-relaxed",children:["Welcome to the Icebreaker directory. Use the level selectors at the top right to filter the depth of information.",e.jsx("strong",{children:" Beginner"})," covers basic values and simple instructions,",e.jsx("strong",{children:" Power User"})," explains optimal strategies and advanced configurations, and",e.jsx("strong",{children:" Expert"})," outlines our database models, code schemas, and GraphQL endpoint queries."]})]}),e.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-between gap-4 mb-6",children:[e.jsxs("div",{className:"relative w-full md:w-80",children:[e.jsx("span",{className:"absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none",children:e.jsx(j,{className:"w-4 h-4 text-gray-500"})}),e.jsx("input",{type:"text",placeholder:"Search topics or features...",value:l,onChange:t=>h(t.target.value),className:"w-full pl-10 pr-4 py-2 text-sm bg-gray-950/80 border border-gray-800 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-white"})]}),e.jsxs("div",{className:"flex items-center gap-2 w-full md:w-auto justify-end",children:[e.jsx("button",{onClick:x,className:"px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gray-900 hover:bg-gray-800 border border-gray-800 transition-colors",children:"Expand All"}),e.jsx("button",{onClick:y,className:"px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gray-900 hover:bg-gray-800 border border-gray-800 transition-colors",children:"Collapse All"})]})]}),e.jsxs("div",{className:"space-y-4",children:[c.map(t=>{const r=g[t.id];return e.jsxs("div",{className:`rounded-2xl border transition-all duration-300 ${r?"border-gray-700/80 bg-gray-900/10":"border-gray-800/60 bg-gray-900/5 hover:border-gray-800/80 hover:bg-gray-900/10"}`,children:[e.jsxs("button",{onClick:()=>b(t.id),className:"w-full px-6 py-5 flex items-center justify-between gap-4 text-left",children:[e.jsxs("div",{className:"flex items-center gap-3.5",children:[e.jsx("div",{className:"w-10 h-10 rounded-xl bg-gray-950/80 border border-gray-800 flex items-center justify-center shadow-inner",children:t.icon}),e.jsxs("div",{children:[e.jsx("span",{className:"text-xs uppercase tracking-widest text-[#FF8C00] font-semibold mb-0.5 block",children:t.category}),e.jsx("h3",{className:"text-base md:text-lg font-semibold text-white tracking-tight",children:t.title})]})]}),e.jsx("div",{children:r?e.jsx(S,{className:"w-5 h-5 text-gray-500"}):e.jsx(N,{className:"w-5 h-5 text-gray-500"})})]}),r&&e.jsxs("div",{className:"px-6 pb-6 pt-1 border-t border-gray-800/60",children:[a==="beginner"&&e.jsxs("div",{className:"space-y-4 animate-fadeIn",children:[e.jsxs("div",{className:"p-4 rounded-xl bg-orange-950/5 border border-orange-900/10",children:[e.jsx("span",{className:"text-xs uppercase tracking-wider text-orange-400 font-bold block mb-1",children:"Value Proposition"}),e.jsx("p",{className:"text-sm text-gray-200",children:t.beginner.value})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-xs uppercase tracking-wider text-gray-400 font-bold block mb-2",children:"Step-by-Step Instructions"}),e.jsx("ol",{className:"list-decimal list-inside space-y-2 text-sm text-gray-300",children:t.beginner.steps.map((s,i)=>e.jsx("li",{className:"pl-1",children:e.jsx("span",{className:"text-gray-400",children:s})},i))})]}),e.jsxs("div",{className:"p-3.5 rounded-xl bg-gray-950/40 border border-gray-800 text-xs text-gray-400",children:[e.jsx("strong",{children:"Quick Tip:"})," ",t.beginner.tips]})]}),a==="intermediate"&&e.jsxs("div",{className:"space-y-4 animate-fadeIn",children:[e.jsxs("div",{className:"p-4 rounded-xl bg-purple-950/5 border border-purple-900/10",children:[e.jsx("span",{className:"text-xs uppercase tracking-wider text-purple-400 font-bold block mb-1",children:"Product Mechanism"}),e.jsx("p",{className:"text-sm text-gray-200",children:t.intermediate.value})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-xs uppercase tracking-wider text-gray-400 font-bold block mb-2",children:"Advanced Workflow Steps"}),e.jsx("ul",{className:"list-disc list-inside space-y-2 text-sm text-gray-300",children:t.intermediate.steps.map((s,i)=>e.jsx("li",{className:"pl-1",children:e.jsx("span",{className:"text-gray-400",children:s})},i))})]}),e.jsxs("div",{className:"p-3.5 rounded-xl bg-gray-950/40 border border-gray-800 text-xs text-gray-400",children:[e.jsx("strong",{children:"Power Tip:"})," ",t.intermediate.tips]})]}),a==="expert"&&e.jsxs("div",{className:"space-y-4 animate-fadeIn",children:[e.jsxs("div",{className:"p-4 rounded-xl bg-teal-950/5 border border-teal-900/10",children:[e.jsx("span",{className:"text-xs uppercase tracking-wider text-teal-400 font-bold block mb-1",children:"Technical Implementation"}),e.jsx("p",{className:"text-sm text-gray-200",children:t.expert.value})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-xs uppercase tracking-wider text-gray-500 font-bold block mb-1.5",children:"Database Schema"}),e.jsx("pre",{className:"p-4 rounded-xl bg-gray-950 border border-gray-800 text-xs font-mono text-emerald-400 overflow-x-auto",children:e.jsx("code",{children:t.expert.dbSchema})})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-xs uppercase tracking-wider text-gray-500 font-bold block mb-1.5",children:"GraphQL Endpoints"}),e.jsx("pre",{className:"p-4 rounded-xl bg-gray-950 border border-gray-800 text-xs font-mono text-sky-400 overflow-x-auto",children:e.jsx("code",{children:t.expert.graphql})})]})]})]})]})]},t.id)}),c.length===0&&e.jsx("div",{className:"text-center py-12 border border-dashed border-gray-800 rounded-2xl bg-gray-900/5",children:e.jsx("p",{className:"text-gray-500 text-sm",children:"No topics match your search query."})})]})]}),e.jsxs("footer",{className:"max-w-6xl mx-auto px-6 py-12 mt-12 border-t border-gray-900/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500",children:[e.jsx("p",{children:"© 2026 sentAIent Ecosystem. All rights reserved."}),e.jsx("p",{children:"Built with Google Antigravity & Claude Code Plugin v2.0.0-rc.1"})]})]})}export{D as default};
