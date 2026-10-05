import React, { useState, useMemo } from 'react';
import { 
  BookOpen, HelpCircle, Layers, Sliders, ChevronDown, ChevronUp, Search, 
  Eye, Sparkles, Code, User, Smartphone, Building2, Terminal, Info, 
  MapPin, ShieldCheck, CheckCircle2, AlertTriangle, Cpu, Radio, ListCollapse
} from 'lucide-react';

export default function IcebreakerTutorial() {
  const [level, setLevel] = useState('beginner'); // beginner, intermediate, expert
  const [activeCategory, setActiveCategory] = useState('all'); // all, consumer, merchant, advanced
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    onboarding: true,
    feed: true,
    map: false,
    storefront: false,
    bounties: false,
    analytics: false,
    aether: false,
  });

  // Global expand/collapse controls
  const handleExpandAll = () => {
    setExpandedSections({
      onboarding: true,
      feed: true,
      map: true,
      storefront: true,
      bounties: true,
      analytics: true,
      aether: true,
    });
  };

  const handleCollapseAll = () => {
    setExpandedSections({
      onboarding: false,
      feed: false,
      map: false,
      storefront: false,
      bounties: false,
      analytics: false,
      aether: false,
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Highly-detailed data structure for the interactive tutorial
  const sectionsData = [
    {
      id: 'onboarding',
      title: 'Velvet Rope Onboarding & Referral System',
      category: 'consumer',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      overview: "An exclusive, FOMO-driven invitation funnel combined with gamified streak multipliers designed to maximize daily active usage (DAU).",
      screens: [
        { name: "Invite Entry Screen", desc: "A sleek, dark portal where guests must input a verified referral code to unlock registration." },
        { name: "Phone verification Popup", desc: "Two-factor SMS overlay confirming user identity and syncing local address book data." },
        { name: "Fire Premium Activation Banner", desc: "Glowing celebration card confirming 7 days of complimentary top-tier access." },
        { name: "Streak Progress Multiplier", desc: "A dashboard widget indicating consecutive login counts and active reward scaling." }
      ],
      beginner: {
        value: "Understand how to register, unlock premium features, and keep your daily streak alive.",
        steps: [
          "Enter your private Invite Code when first launching the app. This is mandatory to pass the velvet rope boundary.",
          "Check your profile header to confirm your 7-day complimentary 'Fire Premium' trial is active.",
          "Open the app once every 24 hours. Each consecutive day adds to your login streak, unlocking higher reward multipliers for your uploads."
        ],
        tips: "If you don't have an invite code, request one from a friend who is already active on the network. Each active member receives a set of invites to share."
      },
      intermediate: {
        value: "Optimize referral channels to claim permanent premium badges and multiplier bonuses.",
        steps: [
          "Locate your custom referral invite link and invite code in the 'Profile' tab.",
          "Share the code with close friends. When they register and perform their first location check-in, your streak points receive a massive boost.",
          "To keep your streak multiplier active: The server checks your last login timestamp. Logging in once per calendar day maintains your multiplier, which directly scales all cash payouts from UGC bounties."
        ],
        tips: "Referring 5 active members permanently unlocks 'Fire Premium' status, bypassing any future subscription fees or trial expiration limits."
      },
      expert: {
        value: "Technical specifications of registration gates, database constraints, and streak state-machines.",
        architecture: "The registration flow acts as a transactional gate. The API will refuse user creation without a validated, active referral code in the database. Daily streaks are calculated on the server side using the client's local timezone offset to prevent bypass exploits.",
        dbSchema: `// schema.prisma snippet
model User {
  id             String        @id @default(uuid())
  phone          String        @unique
  currentStreak  Int           @default(0)
  longestStreak  Int           @default(0)
  lastLoginDate  DateTime?
  isFirePremium  Boolean       @default(false)
  inviteCode     String?       @unique
  invitedById    String?
  invitedBy      User?         @relation("UserInvites", fields: [invitedById], references: [id])
  invitedUsers   User[]        @relation("UserInvites")
  createdAt      DateTime      @default(now())
}`,
        graphql: `# Sync user and update login streaks
mutation SyncUser($inviteCode: String!) {
  syncUser(inviteCode: $inviteCode) {
    id
    currentStreak
    longestStreak
    isFirePremium
    lastLoginDate
  }
}

# Fetch user invites list
query MyInvites {
  me {
    id
    inviteCode
    invitedUsers {
      id
      phone
      createdAt
    }
  }
}`
      }
    },
    {
      id: 'feed',
      title: 'TikTok-Style Hyperlocal Video Feed',
      category: 'consumer',
      icon: <Smartphone className="w-5 h-5 text-indigo-400" />,
      preview: { url: "/icebreaker_feed_mockup.jpg", title: "TikTok-Style Local Feed Interface Mockup", type: "mobile" },
      overview: "A location-aware short-form video feed showing unedited, real-time clips uploaded by creators physically present at local venues.",
      screens: [
        { name: "Vertical Video Explorer", desc: "Full-screen video player supporting paging gestures, autoplay, and swipe-up transitions." },
        { name: "UGC Upload Overlay", desc: "Vision Camera interface capturing short clips with automatic location tagging." },
        { name: "Overlay Engagement Buttons", desc: "Transparent overlay controls to like (double-tap), comment, bookmark, and share." },
        { name: "Loading Skeleton Cards", desc: "Pulsating wireframes loading video streams smoothly in low-bandwidth scenarios." }
      ],
      beginner: {
        value: "Browse nearby activities, double-tap to like, and create your own clips.",
        steps: [
          "Tap the 'Explore' tab at the bottom to launch the video feed.",
          "Swipe up to move to the next video, or swipe down to revisit previous clips.",
          "Double-tap anywhere on the video screen to show a glowing like animation and support the creator."
        ],
        tips: "All videos on the feed are strictly captured inside local venues, showing you what a venue looks like right now."
      },
      intermediate: {
        value: "Generate deep links for viral posts to boost profile discoverability and map positioning.",
        steps: [
          "Tap the 'Share' icon overlay on the right-hand menu of any video.",
          "This automatically generates a custom watermark deep link pointing directly to the item resource.",
          "Send the deep link (`icebreaker://v/[id]`) to friends. If they have the app installed, clicking it bypasses standard routing to launch the video directly."
        ],
        tips: "Videos with high deep-link click-through rates (CTR) are automatically boosted on the interactive map interface, showing up as hot venue recommendations."
      },
      expert: {
        value: "Video player engine, metadata compilation, and CDN caching pipeline.",
        architecture: "The feed relies on Expo Video for rendering streams. On Android and iOS, clips are pre-buffered ahead of viewport activation to ensure sub-100ms loading speeds. Video paths are served via an optimized AWS CloudFront CDN distribution.",
        dbSchema: `// Video / Post schema definitions
model Content {
  id        String   @id @default(uuid())
  type      String   // "video" or "text"
  mediaUrl  String?  // CloudFront CDN url
  textBody  String
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  venueId   String?
  venue     Venue?   @relation(fields: [venueId], references: [id])
  likes     Like[]
  createdAt DateTime @default(now())
}`,
        graphql: `# Fetch video feed based on geolocation coordinates
query ExploreFeed($latitude: Float!, $longitude: Float!) {
  exploreFeed(latitude: $latitude, longitude: $longitude) {
    id
    mediaUrl
    textBody
    user {
      id
      phone
    }
    venue {
      id
      name
    }
  }
}`
      }
    },
    {
      id: 'map',
      title: 'Interactive Geo-Swarm Map & Check-ins',
      category: 'consumer',
      icon: <Layers className="w-5 h-5 text-rose-400" />,
      preview: { url: "/icebreaker_map_mockup.jpg", title: "Interactive Swarms Map UI Mockup", type: "mobile" },
      overview: "A Mapbox-integrated visual canvas showing active hotspots, venue pins, and real-time check-in coordinates.",
      screens: [
        { name: "Hotspot Map View", desc: "Interactive map displaying glowing pulses where swarms or promotions are active." },
        { name: "Check-in Boundary Warning", desc: "Alert popup indicating if you are too far from a venue to complete validation." },
        { name: "QR Scanner Camera", desc: "A camera viewfinder window validating venue check-in via encrypted physical QR codes." },
        { name: "Swarm Progress Overlay", desc: "Floating panel showing the current count of checked-in users versus the swarm target." }
      ],
      beginner: {
        value: "Find interesting venues nearby, walk to them, and check in to verify your presence.",
        steps: [
          "Open the Map tab and look for glowing circles (Swarms) around venue pins.",
          "Walk within the physical boundary of the venue. The 'Check In' button will automatically highlight.",
          "Alternatively, tap the camera icon and scan the QR code printed at the venue's physical counter to check in."
        ],
        tips: "If the check-in button remains locked, ensure location services are enabled on your device and you are within 50 meters of the venue."
      },
      intermediate: {
        value: "Coordinate swarm group check-ins to activate venue discount codes.",
        steps: [
          "Swarms require at least 3 people checking in at the same venue within a 2-hour window.",
          "Keep an eye on the Swarm Progress meter. Once the target check-ins are reached, the merchant's high-tier discount voucher is unlocked for everyone.",
          "Use the chat interface to invite nearby users to join your active Swarm locations."
        ],
        tips: "Vouchers earned from Swarms stack automatically at the venue storefront during checkout."
      },
      expert: {
        value: "Geospatial indexing, boundary checks, and check-in validation.",
        architecture: "Geospatial queries use mathematical boundary equations (or PostGIS extensions in cloud environments) to compute target nodes within a specific radius. Check-ins require validation: either matching GPS coordinates to the venue's registered coordinates (within a 50-meter threshold) or scanning a signed QR code.",
        dbSchema: `// Check-in and Swarm database models
model CheckIn {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  venueId   String
  venue     Venue    @relation(fields: [venueId], references: [id])
  latitude  Float
  longitude Float
  createdAt DateTime @default(now())
}`,
        graphql: `# Fetch swarm campaigns within geographic boundary
query ActiveSwarmCampaigns($latitude: Float!, $longitude: Float!, $radiusKm: Float!) {
  activeSwarmCampaigns(latitude: $latitude, longitude: $longitude, radiusKm: $radiusKm) {
    id
    title
    targetCheckIns
    maxDiscount
    latitude
    longitude
    checkInsCount
  }
}

# Perform location-validated check-in
mutation CheckIn($venueId: ID!, $latitude: Float!, $longitude: Float!) {
  checkIn(venueId: $venueId, latitude: $latitude, longitude: $longitude) {
    id
    createdAt
  }
}`
      }
    },
    {
      id: 'storefront',
      title: 'Venue Storefront & Mobile Payments',
      category: 'consumer',
      icon: <Building2 className="w-5 h-5 text-emerald-400" />,
      overview: "A digital storefront builder for venues to showcase their products, linked to a secure Stripe card payment processor.",
      screens: [
        { name: "Storefront Menu Grid", desc: "A product list page displaying available menu items, apparel, or ticket packages." },
        { name: "Shopping Cart Panel", desc: "Slide-out card summary listing items, swarm discounts, tax, and subtotals." },
        { name: "Stripe Payment sheet", desc: "Native credit card entry overlay handling 3D Secure verification flows." },
        { name: "Order Confirmation Popup", desc: "Success card showing purchase receipts and fulfillment instructions." }
      ],
      beginner: {
        value: "Browse a venue's product list, add items to your cart, and buy securely.",
        steps: [
          "Tap on any venue pin on the map, then select 'Storefront'.",
          "Click on products (e.g., drinks, food, merchandise) to add them to your cart.",
          "Open your Cart, tap 'Pay with Card', and enter your details to complete the order."
        ],
        tips: "After payment, a digital ticket/receipt is generated in your Wallet. Show this to the staff at the venue counter to claim your items."
      },
      intermediate: {
        value: "Apply swarm vouchers to storefront purchases and manage checkout states.",
        steps: [
          "When you add items to the cart, the system automatically checks for active Swarm discount vouchers.",
          "If a Swarm discount is found, it is automatically deducted from the subtotal prior to calling the payment gateway.",
          "Payments are held in an escrow state by the backend until the venue staff marks your order as 'Completed' or 'Picked Up'."
        ],
        tips: "Storefront orders are fully integrated with Stripe. If a venue cancels your order, the escrow balance is refunded immediately."
      },
      expert: {
        value: "Stripe Payment Intent creations, webhook callbacks, and escrow states.",
        architecture: "Payments are processed via Stripe Connect. When an order is created, the backend initializes a Stripe PaymentIntent. The payment remains in the intent state until confirmed, after which it is logged as PENDING in the local database. Once the merchant fulfills the order, the funds are released.",
        dbSchema: `// Storefront product and Order status
model Product {
  id           String     @id @default(uuid())
  storefrontId String
  name         String
  price        Int        // in cents
  imageUrl     String?
}

model Order {
  id        String   @id @default(uuid())
  userId    String
  venueId   String
  amount    Int      // in cents
  status    String   // PENDING, PAID, FULFILLED, REFUNDED
  createdAt DateTime @default(now())
}`,
        graphql: `# Fetch venue storefront details
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
}

# Initialize payment intent session
mutation CreatePaymentIntent($products: [OrderItemInput!]!) {
  createPaymentIntent(products: $products) {
    clientSecret
    orderId
  }
}`
      }
    },
    {
      id: 'bounties',
      title: 'Creator UGC Bounties',
      category: 'merchant',
      icon: <Sparkles className="w-5 h-5 text-pink-400" />,
      overview: "Campaigns created by venues to fund content generation, automatically moderate uploads, and payout rewards to creators.",
      screens: [
        { name: "Active Bounties Board", desc: "List of reward campaigns showing payout amount, remaining budget, and video requirements." },
        { name: "Bounty Claim Wizard", desc: "Form where creators record or upload their short video proof of experience." },
        { name: "Merchant Review Queue", desc: "B2B panel showing pending video submissions alongside options to approve or reject." },
        { name: "Creator Wallet Payout Screen", desc: "Balance sheet displaying earned bounty payouts and options for instant cashouts." }
      ],
      beginner: {
        value: "Submit video proof of your venue visit to earn cash rewards.",
        steps: [
          "Tap on a venue map pin and select 'Active Bounties'.",
          "Read the requirements, then capture a video of your experience (e.g., ordering food, checking in).",
          "Tap 'Submit Proof' and upload your clip. Your claim will show as 'Pending Review'."
        ],
        tips: "Ensure the venue is clearly shown in your video. Low-quality or irrelevant clips will be rejected by the system."
      },
      intermediate: {
        value: "Leverage streak multipliers to maximize bounty yields and manage payouts.",
        steps: [
          "Before submitting, ensure your login streak is active. A streak multiplier scales the base reward of a bounty by up to 2x.",
          "Check the status of your claims in the 'Wallet' tab. Claims are usually reviewed by the merchant within 48 hours.",
          "Once approved, funds are added to your wallet balance. You can trigger an instant payout to your bank via Stripe Connect."
        ],
        tips: "Venues set maximum budgets on bounties. If a bounty pool is running low, prioritize uploading quickly before the campaign expires."
      },
      expert: {
        value: "AI content moderation, escrow budgets, and Stripe Connect routing.",
        architecture: "When a creator submits proof, the backend runs automated moderation. We call a Hugging Face API interface to analyze the upload for toxicity or inappropriate elements. Approved submissions are routed to the merchant queue. When the merchant confirms the claim, funds are moved from the escrow budget to the creator's Stripe account.",
        dbSchema: `// Bounties and claims schemas
model Bounty {
  id          String        @id @default(uuid())
  venueId     String
  title       String
  reward      Int           // in cents
  totalBudget Int           // in cents
  isActive    Boolean       @default(true)
  claims      BountyClaim[]
}

model BountyClaim {
  id        String   @id @default(uuid())
  bountyId  String
  userId    String
  contentId String
  status    String   // PENDING, APPROVED, REJECTED
  createdAt DateTime @default(now())
}`,
        graphql: `# Create a bounty campaign setup
mutation CreateBounty($title: String!, $reward: Int!, $totalBudget: Int!) {
  createBounty(title: $title, reward: $reward, totalBudget: $totalBudget) {
    id
    isActive
  }
}

# Submit bounty verification proof
mutation ClaimBounty($bountyId: ID!, $contentId: ID!) {
  claimBounty(bountyId: $bountyId, contentId: $contentId) {
    id
    status
  }
}`
      }
    },
    {
      id: 'analytics',
      title: 'Merchant Analytics & Settings Dashboard',
      category: 'merchant',
      icon: <BookOpen className="w-5 h-5 text-teal-400" />,
      preview: { url: "/icebreaker_merchant_mockup.jpg", title: "VenueIQ B2B Merchant Dashboard Mockup", type: "desktop" },
      overview: "The B2B interface where merchants configure venue settings, design storefront products, and monitor campaign performance metrics.",
      screens: [
        { name: "Analytics Dashboard Homepage", desc: "Aggregated charts showing total visitor impressions, storefront sales, and check-ins." },
        { name: "Storefront Product Editor", desc: "Forms to add, edit, or delete items on the venue menu list." },
        { name: "Campaign Setup Form", desc: "Form to configure Geo-Swarm variables, discount rates, and marketing budgets." },
        { name: "Capacity Settings Panel", desc: "Config screen where venues set maximum capacity targets for surge pricing calculations." }
      ],
      beginner: {
        value: "Manage your storefront and monitor customer visits.",
        steps: [
          "Open your B2B dashboard page on the web portal.",
          "Check the charts to see how many people visited your venue and purchased items today.",
          "Update your venue capacity settings in the 'Settings' tab to ensure accurate surge calculations."
        ],
        tips: "Review your active swarms to understand peak customer check-in hours."
      },
      intermediate: {
        value: "Configure automatic AI claim approvals and manage campaign budgets.",
        steps: [
          "Navigate to the 'Settings' tab and set the 'AI Verification Threshold'.",
          "If the AI confidence score of a creator's video upload exceeds this threshold, the bounty is auto-approved without manual review.",
          "Adjust your Geo-Swarm discount triggers. For slow business days, set a lower check-in requirement to draw crowds faster."
        ],
        tips: "Keep your AI auto-approve threshold around 85% to balance review efficiency and quality assurance."
      },
      expert: {
        value: "PostHog analytics integration, surge algorithm mechanics, and telemetry.",
        architecture: "Surge pricing targets are calculated dynamically based on checked-in users versus the registered maximum venue capacity. Impressions and storefront telemetry are compiled via Redis caching queues to prevent database write bottlenecks, then flushed to PostgreSQL at regular cron intervals.",
        dbSchema: `// Venue capacity database model snippet
model Venue {
  id                     String          @id @default(uuid())
  name                   String
  maxCapacity            Int             @default(100)
  aiAutoApproveThreshold Float           @default(85.0)
  bounties               Bounty[]
  checkIns               CheckIn[]
}`,
        graphql: `# Fetch B2B dashboard analytics data
query VenueAnalytics($venueId: ID!) {
  venueAnalytics(venueId: $venueId) {
    totalImpressions
    storefrontSales
    activeCheckIns
  }
}

# Update settings
mutation UpdateVenueSettings($maxCapacity: Int!, $aiThreshold: Float!) {
  updateVenueSettings(maxCapacity: $maxCapacity, aiAutoApproveThreshold: $aiThreshold) {
    id
    maxCapacity
    aiAutoApproveThreshold
  }
}`
      }
    },
    {
      id: 'aether',
      title: 'Aether P2P Offline Sync Network',
      category: 'advanced',
      icon: <Radio className="w-5 h-5 text-sky-400" />,
      overview: "A localized P2P database synchronization layer utilizing WebSockets and Bluetooth/Wi-Fi to share data in zero-signal zones.",
      screens: [
        { name: "P2P Connections status", desc: "Panel showing nearby connected devices, signal strength, and sync progress." },
        { name: "Offline Sync Progress Bar", desc: "A progress overlay displaying the sync completion percentage of local queued updates." },
        { name: "Localized Peer Finder Grid", desc: "Grid showing avatars of nearby peers discovered on the local offline channel." },
        { name: "Sync Resolution Dialog", desc: "Popup letting advanced users resolve conflicting data updates manually if required." }
      ],
      beginner: {
        value: "Stay connected, chat, and share details with nearby people even when offline.",
        steps: [
          "Open the 'Network' tab in the app.",
          "Verify that your Wi-Fi and Bluetooth are active to discover nearby peers.",
          "Start messaging or swap contact information directly without cellular signal."
        ],
        tips: "This feature activates automatically when the app detects zero network connectivity, keeping your profile active locally."
      },
      intermediate: {
        value: "Perform localized data handshakes and queue offline updates for later sync.",
        steps: [
          "All offline actions (likes, check-ins, messages) are queued locally inside your device cache.",
          "When you connect with a peer who has internet, your updates are synced through their connection.",
          "A multi-pass handshake verifies proximity before checking in, preventing location-spoofing during outages."
        ],
        tips: "You can set your device as a local 'Aether Hub' in settings to help route messages for others in crowded areas."
      },
      expert: {
        value: "WebSocket local server sync, conflict resolution algorithms, and offline storage queues.",
        architecture: "Aether establishes peer links using local WebSocket connections. Client databases use async storage queues. Conflicts are resolved using CRDTs (Conflict-free Replicated Data Types) prioritizing the latest timestamp. Upon internet reconnection, queued API mutations are processed sequentially with lock checks.",
        dbSchema: `// Local storage structure for queued mutations
interface LocalSyncQueue {
  id: string;
  mutation: string;
  variables: string; // JSON string
  timestamp: number;
  attempts: number;
}`,
        graphql: `# Subscription endpoint for peer communication sync
subscription OnPeerMessage($peerId: ID!) {
  onPeerMessage(peerId: $peerId) {
    id
    senderId
    body
    timestamp
  }
}`
      }
    }
  ];

  // Filtering logic
  const filteredSections = useMemo(() => {
    return sectionsData.filter(section => {
      const matchesSearch = searchQuery === '' || 
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.overview.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === 'all' || section.category === activeCategory || (activeCategory === 'advanced' && section.id === 'aether');
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-[#050508] text-gray-100 font-sans selection:bg-[#FF8C00] selection:text-white pb-12">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-orange-950/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Inline styles to guarantee custom, premium scrollbar rendering */}
      <style>
        {`
        /* Ensure a custom scrollbar is present, visible, and styled */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          display: block !important;
        }
        ::-webkit-scrollbar-track {
          background: #050508;
        }
        ::-webkit-scrollbar-thumb {
          background: #1a1a24;
          border-radius: 4px;
          border: 1px solid #050508;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #FF8C00;
          box-shadow: 0 0 8px #FF8C00;
        }
        /* Fade in animations for tabs */
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Sticky Header with Controls */}
      <header className="border-b border-gray-800/80 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/10">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                Icebreaker Interactive Tutorial
              </h1>
              <p className="text-xs text-gray-400">Complete multi-level user guide & tech specification</p>
            </div>
          </div>

          {/* Macro Level Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-950/80 rounded-xl border border-gray-800/60">
            <button
              onClick={() => setLevel('beginner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                level === 'beginner'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Beginner
            </button>
            <button
              onClick={() => setLevel('intermediate')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                level === 'intermediate'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Power User
            </button>
            <button
              onClick={() => setLevel('expert')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                level === 'expert'
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              Expert / Dev
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Intro Panel */}
        <section className="mb-8 p-6 rounded-2xl border border-gray-800/80 bg-gray-900/20 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF8C00]/5 rounded-full blur-[80px]" />
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold tracking-tight text-white mb-2 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-orange-500 animate-pulse" />
                Explore the Platform At Your Level
              </h2>
              <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
                Welcome to the Icebreaker directory. Use the level selectors at the top right to filter the depth of information. 
                <strong> Beginner</strong> covers basic values and simple instructions, 
                <strong> Power User</strong> explains optimal strategies and advanced configurations, and 
                <strong> Expert</strong> outlines our database models, code schemas, and GraphQL endpoint queries.
              </p>
            </div>
            
            {/* Legend/Info Badge */}
            <div className="p-3 bg-gray-950/60 border border-gray-800 rounded-xl flex items-center gap-2.5 text-xs text-gray-400">
              <Cpu className="w-4 h-4 text-orange-500" />
              <span>Current View Mode: <strong className="text-white uppercase">{level}</strong></span>
            </div>
          </div>
        </section>

        {/* Global Controls, Categories & Search */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-950/60 border border-gray-800/60 rounded-xl w-full lg:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === 'all' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              All Verticals
            </button>
            <button
              onClick={() => setActiveCategory('consumer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === 'consumer' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Consumer Features
            </button>
            <button
              onClick={() => setActiveCategory('merchant')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === 'merchant' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Merchant Tools
            </button>
            <button
              onClick={() => setActiveCategory('advanced')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === 'advanced' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Advanced / P2P
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </span>
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-950/80 border border-gray-850 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-white"
              />
            </div>

            {/* Expand / Collapse Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleExpandAll}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-gray-900/60 hover:bg-gray-800 border border-gray-800 transition-colors"
                title="Expand All"
              >
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Expand All</span>
              </button>
              <button
                onClick={handleCollapseAll}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-gray-900/60 hover:bg-gray-800 border border-gray-800 transition-colors"
                title="Collapse All"
              >
                <ListCollapse className="w-3.5 h-3.5" />
                <span>Collapse All</span>
              </button>
            </div>
          </div>

        </div>

        {/* Accordions */}
        <div className="space-y-6">
          {filteredSections.map((section) => {
            const isExpanded = expandedSections[section.id];
            return (
              <div 
                key={section.id} 
                className={`rounded-2xl border transition-all duration-300 ${
                  isExpanded 
                    ? 'border-gray-700/80 bg-gray-900/10 shadow-lg shadow-black/40' 
                    : 'border-gray-800/60 bg-gray-900/5 hover:border-gray-850 hover:bg-gray-900/10'
                }`}
              >
                {/* Header button */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-950/80 border border-gray-800/80 flex items-center justify-center shadow-inner">
                      {section.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] uppercase tracking-widest text-[#FF8C00] font-bold">
                          {section.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-700" />
                        <span className="text-[10px] text-gray-500 uppercase font-semibold">
                          ID: {section.id}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {section.title}
                      </h3>
                    </div>
                  </div>
                  <div>
                    {isExpanded ? (
                      <div className="p-1.5 rounded-lg bg-gray-950/40 border border-gray-800">
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      </div>
                    ) : (
                      <div className="p-1.5 rounded-lg bg-gray-950/40 border border-gray-800">
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                </button>

                {/* Content Panel */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-800/60">
                    
                    {/* Feature Overview */}
                    <div className="mb-6 flex gap-2.5 items-start bg-gray-950/40 border border-gray-850 p-4 rounded-xl text-xs text-gray-300 leading-relaxed">
                      <Info className="w-4 h-4 text-[#FF8C00] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Feature Overview: </strong>
                        {section.overview}
                      </div>
                    </div>

                    {/* View mode warning / info overlay */}
                    <div className="mb-6 flex items-center justify-between py-2 px-3 rounded-lg bg-gray-900/40 border border-gray-800 text-[10px] text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Cpu className="w-3 h-3 text-purple-400" />
                        <span>Displaying level: <strong className="text-white uppercase">{level}</strong></span>
                      </span>
                      <span>Adjust selected level in header toggle</span>
                    </div>

                    {/* Screen layout explanation (Visible on all levels for thoroughness) */}
                    <div className="mb-8">
                      <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-3 flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-orange-400" />
                        Screens & Modals Involved
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {section.screens.map((screen, idx) => (
                          <div key={idx} className="p-3 bg-gray-950/50 border border-gray-850 rounded-xl flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-gray-900 border border-gray-850 text-[10px] text-gray-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <div>
                              <strong className="text-sm text-gray-200 block mb-0.5">{screen.name}</strong>
                              <span className="text-xs text-gray-400">{screen.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Beginner Level Content */}
                    {level === 'beginner' && (
                      <div className="space-y-6 animate-fadeIn">
                        <div className="p-4 rounded-xl bg-orange-950/5 border border-orange-900/20">
                          <span className="text-[10px] uppercase tracking-wider text-orange-400 font-bold block mb-1">Value Proposition</span>
                          <p className="text-sm text-gray-200">{section.beginner.value}</p>
                        </div>
                        
                        <div>
                          <span className="text-xs uppercase tracking-wider text-white font-bold block mb-3 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                            Step-by-Step Instructions
                          </span>
                          <ol className="space-y-3">
                            {section.beginner.steps.map((step, idx) => (
                              <li key={idx} className="flex gap-3 text-sm text-gray-300">
                                <span className="text-[#FF8C00] font-bold">{idx + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-850 text-xs text-gray-400 leading-relaxed">
                          <strong className="text-white block mb-1">💡 Quick Tip:</strong> 
                          {section.beginner.tips}
                        </div>
                      </div>
                    )}

                    {level === 'intermediate' && (
                      <div className="space-y-6 animate-fadeIn">
                        <div className="p-4 rounded-xl bg-purple-950/5 border border-purple-900/20">
                          <span className="text-[10px] uppercase tracking-wider text-purple-400 font-bold block mb-1">Product Mechanics</span>
                          <p className="text-sm text-gray-200">{section.intermediate.value}</p>
                        </div>
                        
                        <div>
                          <span className="text-xs uppercase tracking-wider text-white font-bold block mb-3 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                            Advanced Workflow Actions
                          </span>
                          <ul className="space-y-3">
                            {section.intermediate.steps.map((step, idx) => (
                              <li key={idx} className="flex gap-3 text-sm text-gray-300">
                                <span className="text-purple-400 font-bold">•</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-850 text-xs text-gray-400 leading-relaxed">
                          <strong className="text-white block mb-1">🔥 Power Strategy:</strong> 
                          {section.intermediate.tips}
                        </div>
                      </div>
                    )}

                    {level === 'expert' && (
                      <div className="space-y-6 animate-fadeIn">
                        <div className="p-4 rounded-xl bg-teal-950/5 border border-teal-900/20">
                          <span className="text-[10px] uppercase tracking-wider text-teal-400 font-bold block mb-1">Technical Architecture Details</span>
                          <p className="text-sm text-gray-200">{section.expert.value}</p>
                        </div>

                        {section.expert.architecture && (
                          <div className="text-sm text-gray-300 leading-relaxed bg-gray-950/30 border border-gray-850 p-4 rounded-xl">
                            <strong className="text-white block mb-1">Implementation Overview:</strong>
                            {section.expert.architecture}
                          </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                          <div>
                            <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block mb-2 flex items-center gap-1.5">
                              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                              Prisma Database Model
                            </span>
                            <pre className="p-4 rounded-xl bg-gray-950 border border-gray-850 text-xs font-mono text-emerald-400 overflow-x-auto max-h-[350px] overflow-y-auto">
                              <code>{section.expert.dbSchema}</code>
                            </pre>
                          </div>
                          <div>
                            <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block mb-2 flex items-center gap-1.5">
                              <Terminal className="w-3.5 h-3.5 text-sky-400" />
                              GraphQL Queries & Mutations
                            </span>
                            <pre className="p-4 rounded-xl bg-gray-950 border border-gray-850 text-xs font-mono text-sky-400 overflow-x-auto max-h-[350px] overflow-y-auto">
                              <code>{section.expert.graphql}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visual Interface Preview */}
                    {section.preview && (
                      <div className={`mt-8 border border-gray-850/80 bg-gray-950/40 p-3 rounded-2xl mx-auto shadow-2xl relative overflow-hidden ${
                        section.preview.type === 'desktop' ? 'max-w-4xl' : 'max-w-xs'
                      }`}>
                        <span className="text-[10px] uppercase tracking-widest text-[#FF8C00] font-bold text-center block mb-2.5">
                          {section.preview.title}
                        </span>
                        <img 
                          src={section.preview.url} 
                          alt={section.preview.title} 
                          className="rounded-xl w-full object-cover shadow-2xl border border-gray-900"
                        />
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })}

          {filteredSections.length === 0 && (
            <div className="text-center py-16 border border-dashed border-gray-800 rounded-2xl bg-gray-900/5">
              <p className="text-gray-500 text-sm">No topics match your filters or search query.</p>
            </div>
          )}
        </div>

      </main>

      <footer className="max-w-6xl mx-auto px-6 py-12 mt-12 border-t border-gray-900/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p>&copy; 2026 sentAIent Ecosystem. All rights reserved.</p>
        <p>Built with Google Antigravity & Claude Code Plugin v2.0.0-rc.1</p>
      </footer>
    </div>
  );
}
