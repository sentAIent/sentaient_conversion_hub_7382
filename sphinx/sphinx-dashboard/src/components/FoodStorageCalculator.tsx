"use client";
import React, { useState, useEffect, useMemo } from 'react';
import {
  Calculator, Check, Copy, Download, RefreshCw, Search,
  ShieldCheck, AlertCircle, Plus, Minus, CheckSquare, Square,
  Printer, ArrowRight
} from 'lucide-react';

interface StorageItem {
  id: string;
  name: string;
  category: string;
  baseAmountPerAdult3Mo: number;
  baseAmountPerAdult1Yr: number;
  unit: string;
  packageNote?: string;
}

export const MASTER_STORAGE_ITEMS: StorageItem[] = [
  // 1. WATER
  { id: 'water-drinking', name: 'Potable Drinking Water (2-week minimum hydration)', category: 'Emergency Water', baseAmountPerAdult3Mo: 14, baseAmountPerAdult1Yr: 56, unit: 'gallons', packageNote: '4x 24ct cases of 16.9oz bottles or 55-gal drums' },
  { id: 'water-hygiene', name: 'Sanitation & Cooking Water', category: 'Emergency Water', baseAmountPerAdult3Mo: 28, baseAmountPerAdult1Yr: 112, unit: 'gallons', packageNote: 'Stored in food-grade barrels' },

  // 2. GRAINS
  { id: 'grain-wheat', name: 'Hard Wheat Berries (Red or White)', category: 'Grains & Flours', baseAmountPerAdult3Mo: 25, baseAmountPerAdult1Yr: 150, unit: 'lbs', packageNote: '4x #10 cans or 5-gal bucket with Mylar' },
  { id: 'grain-flour', name: 'All-Purpose White Flour', category: 'Grains & Flours', baseAmountPerAdult3Mo: 15, baseAmountPerAdult1Yr: 60, unit: 'lbs', packageNote: '3x #10 cans sealed with O2 absorbers' },
  { id: 'grain-rice', name: 'White Rice (Enriched)', category: 'Grains & Flours', baseAmountPerAdult3Mo: 10, baseAmountPerAdult1Yr: 100, unit: 'lbs', packageNote: '2x #10 cans or 5-gal bucket' },
  { id: 'grain-oats', name: 'Rolled Oats (Quick or Thick Cut)', category: 'Grains & Flours', baseAmountPerAdult3Mo: 5, baseAmountPerAdult1Yr: 40, unit: 'lbs', packageNote: '2x #10 cans' },
  { id: 'grain-pasta', name: 'Macaroni & Spaghetti Pastas', category: 'Grains & Flours', baseAmountPerAdult3Mo: 8, baseAmountPerAdult1Yr: 30, unit: 'lbs', packageNote: '2x #10 cans' },
  { id: 'grain-cornmeal', name: 'Cornmeal / Masa Harina / Dent Corn', category: 'Grains & Flours', baseAmountPerAdult3Mo: 2, baseAmountPerAdult1Yr: 15, unit: 'lbs', packageNote: 'Airtight container' },
  { id: 'grain-pancake', name: 'Pancake & Waffle Mix', category: 'Grains & Flours', baseAmountPerAdult3Mo: 2, baseAmountPerAdult1Yr: 8, unit: 'lbs', packageNote: 'Sealed pouches' },

  // 3. SUGARS & SWEETENERS
  { id: 'sugar-white', name: 'Granulated Pure Cane Sugar', category: 'Sugars & Sweeteners', baseAmountPerAdult3Mo: 10, baseAmountPerAdult1Yr: 40, unit: 'lbs', packageNote: '2x #10 cans (do NOT use O2 absorbers)' },
  { id: 'sugar-brown', name: 'Brown Sugar (Light or Dark)', category: 'Sugars & Sweeteners', baseAmountPerAdult3Mo: 2, baseAmountPerAdult1Yr: 10, unit: 'lbs', packageNote: 'Airtight jar with desiccant' },
  { id: 'sugar-honey', name: 'Pure 100% Raw Bee Honey', category: 'Sugars & Sweeteners', baseAmountPerAdult3Mo: 2, baseAmountPerAdult1Yr: 15, unit: 'lbs', packageNote: 'Airtight glass jars / 5-gal pails' },
  { id: 'sugar-jam', name: 'Fruit Jams & Jellies', category: 'Sugars & Sweeteners', baseAmountPerAdult3Mo: 32, baseAmountPerAdult1Yr: 128, unit: 'oz', packageNote: 'Canned jars' },
  { id: 'sugar-pancake-syrup', name: 'Pancake / Maple Syrup', category: 'Sugars & Sweeteners', baseAmountPerAdult3Mo: 32, baseAmountPerAdult1Yr: 128, unit: 'oz', packageNote: 'Bottles' },

  // 4. DAIRY
  { id: 'dairy-dry-milk', name: 'Nonfat Dry Milk Powder (Vitamins A & D)', category: 'Dairy Products', baseAmountPerAdult3Mo: 4, baseAmountPerAdult1Yr: 16, unit: 'lbs', packageNote: '1x #10 can or Mylar with O2 absorber' },
  { id: 'dairy-evaporated', name: 'Evaporated Canned Milk', category: 'Dairy Products', baseAmountPerAdult3Mo: 12, baseAmountPerAdult1Yr: 48, unit: 'oz', packageNote: 'Rotate every 6 months' },
  { id: 'dairy-cheese-powder', name: 'Dehydrated Cheddar Cheese Powder', category: 'Dairy Products', baseAmountPerAdult3Mo: 1, baseAmountPerAdult1Yr: 5, unit: 'lbs', packageNote: 'Sealed tin can' },

  // 5. OILS & FATS
  { id: 'fat-cooking-oil', name: 'Vegetable / Canola / Olive Cooking Oil', category: 'Fats & Oils', baseAmountPerAdult3Mo: 3, baseAmountPerAdult1Yr: 15, unit: 'lbs', packageNote: 'Amber glass jugs / sealed tins' },
  { id: 'fat-shortening', name: 'Solid Vegetable Shortening (Crisco)', category: 'Fats & Oils', baseAmountPerAdult3Mo: 1, baseAmountPerAdult1Yr: 6, unit: 'lbs', packageNote: 'Sealed metal cans' },
  { id: 'fat-peanut-butter', name: 'Peanut / Almond Butter', category: 'Fats & Oils', baseAmountPerAdult3Mo: 32, baseAmountPerAdult1Yr: 128, unit: 'oz', packageNote: 'Airtight jars' },
  { id: 'fat-canned-butter', name: 'Shelf-Stable Canned Butter / Ghee', category: 'Fats & Oils', baseAmountPerAdult3Mo: 12, baseAmountPerAdult1Yr: 48, unit: 'oz', packageNote: 'Red Feather / Pure Ghee' },

  // 6. MEATS & PROTEINS
  { id: 'meat-canned-chicken', name: 'Canned Chicken / Turkey Breast', category: 'Meats & Proteins', baseAmountPerAdult3Mo: 12, baseAmountPerAdult1Yr: 48, unit: 'cans', packageNote: '12-oz cans' },
  { id: 'meat-canned-beef', name: 'Canned Beef / Pork / Spam', category: 'Meats & Proteins', baseAmountPerAdult3Mo: 12, baseAmountPerAdult1Yr: 48, unit: 'cans', packageNote: '12-oz cans' },
  { id: 'meat-tuna', name: 'Canned Tuna / Salmon in Oil', category: 'Meats & Proteins', baseAmountPerAdult3Mo: 12, baseAmountPerAdult1Yr: 48, unit: 'cans', packageNote: '6-oz cans' },
  { id: 'meat-tvp', name: 'Textured Vegetable Protein (TVP)', category: 'Meats & Proteins', baseAmountPerAdult3Mo: 2.5, baseAmountPerAdult1Yr: 10, unit: 'lbs', packageNote: 'Mylar pouch or #10 can' },

  // 7. BEANS & LEGUMES
  { id: 'legume-dry-beans', name: 'Dry Pinto, Black & Navy Beans', category: 'Beans & Legumes', baseAmountPerAdult3Mo: 5, baseAmountPerAdult1Yr: 45, unit: 'lbs', packageNote: '1x #10 can or 5-gal bucket' },
  { id: 'legume-lentils', name: 'Dry Lentils & Split Peas (Fast-Cooking)', category: 'Beans & Legumes', baseAmountPerAdult3Mo: 3, baseAmountPerAdult1Yr: 15, unit: 'lbs', packageNote: 'Cooks in 20 min without presoak' },
  { id: 'legume-canned-beans', name: 'Assorted Canned Beans (Kidney, Chili, Black)', category: 'Beans & Legumes', baseAmountPerAdult3Mo: 12, baseAmountPerAdult1Yr: 48, unit: 'cans', packageNote: '15-oz cans ready to eat' },

  // 8. FRUITS & VEGETABLES
  { id: 'produce-potatoes', name: 'Dehydrated Instant Potato Flakes', category: 'Fruits & Vegetables', baseAmountPerAdult3Mo: 4, baseAmountPerAdult1Yr: 20, unit: 'lbs', packageNote: '2x #10 cans' },
  { id: 'produce-canned-veg', name: 'Canned Vegetables (Corn, Green Beans, Peas)', category: 'Fruits & Vegetables', baseAmountPerAdult3Mo: 12, baseAmountPerAdult1Yr: 48, unit: 'cans', packageNote: '15-oz cans' },
  { id: 'produce-canned-fruit', name: 'Canned Fruits (Peaches, Pears, Applesauce)', category: 'Fruits & Vegetables', baseAmountPerAdult3Mo: 12, baseAmountPerAdult1Yr: 48, unit: 'cans', packageNote: '15-oz cans' },
  { id: 'produce-tomatoes', name: 'Canned Tomatoes / Sauce / Paste', category: 'Fruits & Vegetables', baseAmountPerAdult3Mo: 18, baseAmountPerAdult1Yr: 72, unit: 'cans', packageNote: 'Essential for grain/bean flavoring' },
  { id: 'produce-dried-fruit', name: 'Raisins, Dried Apples, Apricots', category: 'Fruits & Vegetables', baseAmountPerAdult3Mo: 2, baseAmountPerAdult1Yr: 10, unit: 'lbs', packageNote: 'Sealed pouches' },

  // 9. BAKING ITEMS & SPICES
  { id: 'bake-salt', name: 'Pure Canning / Non-Iodized Salt', category: 'Baking & Spices', baseAmountPerAdult3Mo: 2, baseAmountPerAdult1Yr: 8, unit: 'lbs', packageNote: 'Indefinite shelf life if bone-dry' },
  { id: 'bake-baking-powder', name: 'Double-Acting Baking Powder', category: 'Baking & Spices', baseAmountPerAdult3Mo: 5, baseAmountPerAdult1Yr: 20, unit: 'oz', packageNote: 'Check potency with water fizz test' },
  { id: 'bake-baking-soda', name: 'Baking Soda (Sodium Bicarbonate)', category: 'Baking & Spices', baseAmountPerAdult3Mo: 4, baseAmountPerAdult1Yr: 16, unit: 'oz', packageNote: 'Airtight container' },
  { id: 'bake-yeast', name: 'Active Dry Baking Yeast', category: 'Baking & Spices', baseAmountPerAdult3Mo: 4, baseAmountPerAdult1Yr: 16, unit: 'oz', packageNote: 'Vacuum foil brick / freeze' },
  { id: 'bake-powdered-eggs', name: 'Whole Powdered Eggs', category: 'Baking & Spices', baseAmountPerAdult3Mo: 1, baseAmountPerAdult1Yr: 4, unit: 'lbs', packageNote: '#10 can' },
  { id: 'bake-bouillon', name: 'Beef & Chicken Bouillon Granules', category: 'Baking & Spices', baseAmountPerAdult3Mo: 4, baseAmountPerAdult1Yr: 16, unit: 'oz', packageNote: 'Prevents appetite fatigue' },
  { id: 'bake-spices', name: 'Assorted Spices (Pepper, Garlic, Onion, Chili)', category: 'Baking & Spices', baseAmountPerAdult3Mo: 8, baseAmountPerAdult1Yr: 32, unit: 'oz', packageNote: 'Dark glass bottles' },

  // 10. BEVERAGES & SNACKS
  { id: 'bev-fruit-drink', name: 'Fruit Drink Powder / Tang', category: 'Beverages & Snacks', baseAmountPerAdult3Mo: 1.5, baseAmountPerAdult1Yr: 6, unit: 'lbs', packageNote: 'Vitamin C fortified' },
  { id: 'bev-cocoa', name: 'Hot Cocoa Powder Mix', category: 'Beverages & Snacks', baseAmountPerAdult3Mo: 1.5, baseAmountPerAdult1Yr: 6, unit: 'lbs', packageNote: 'Psychological morale booster' },
  { id: 'snack-food-bars', name: 'Lifeboat Emergency Food Bars (USCG SOLAS)', category: 'Beverages & Snacks', baseAmountPerAdult3Mo: 24, baseAmountPerAdult1Yr: 96, unit: 'bars', packageNote: 'Mainstay / Datrex 5-yr heat-proof' },
  { id: 'snack-crackers', name: 'Sealed Saltine / Pilot Bread Crackers', category: 'Beverages & Snacks', baseAmountPerAdult3Mo: 3, baseAmountPerAdult1Yr: 12, unit: 'boxes', packageNote: 'Sealed tin or Mylar' },

  // 11. VITAMINS & MEDICAL
  { id: 'med-multivitamins', name: 'Daily High-Potency Multivitamins', category: 'Vitamins & Health', baseAmountPerAdult3Mo: 90, baseAmountPerAdult1Yr: 365, unit: 'tablets', packageNote: 'Prevents nutritional deficiencies' },
  { id: 'med-vitamin-c', name: 'Ascorbic Acid / Vitamin C Crystals', category: 'Vitamins & Health', baseAmountPerAdult3Mo: 100, baseAmountPerAdult1Yr: 400, unit: 'grams', packageNote: 'Dough conditioner & scurvy shield' },
  { id: 'med-prescriptions', name: 'Prescription Medication Reserve', category: 'Vitamins & Health', baseAmountPerAdult3Mo: 90, baseAmountPerAdult1Yr: 365, unit: 'daily doses', packageNote: 'Rotate with pharmacy refills' },

  // 12. SANITATION & CLEANING
  { id: 'san-bleach', name: 'Plain Liquid Bleach (5.25% - 6% NaOCl)', category: 'Sanitation & Cleaning', baseAmountPerAdult3Mo: 1, baseAmountPerAdult1Yr: 4, unit: 'gallons', packageNote: 'Water purification & disinfectant' },
  { id: 'san-toilet-paper', name: 'Toilet Paper Rolls', category: 'Sanitation & Cleaning', baseAmountPerAdult3Mo: 16, baseAmountPerAdult1Yr: 64, unit: 'rolls', packageNote: 'Store in airtight plastic buckets' },
  { id: 'san-soap', name: 'Antibacterial Bar / Liquid Hand Soap', category: 'Sanitation & Cleaning', baseAmountPerAdult3Mo: 3, baseAmountPerAdult1Yr: 12, unit: 'bars', packageNote: 'Prevents infectious dysentery' },
  { id: 'san-heavy-bags', name: 'Heavy Contractor Garbage Bags (39-gal, 3-mil)', category: 'Sanitation & Cleaning', baseAmountPerAdult3Mo: 25, baseAmountPerAdult1Yr: 100, unit: 'bags', packageNote: 'Bucket latrine liners & waste' },
  { id: 'san-plates-cups', name: 'Paper Plates, Bowls & Disposable Cutlery', category: 'Sanitation & Cleaning', baseAmountPerAdult3Mo: 90, baseAmountPerAdult1Yr: 365, unit: 'sets', packageNote: 'Conserves cooking water' }
];

export function FoodStorageCalculator() {
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(2);
  const [timeframe, setTimeframe] = useState<'3mo' | '1yr'>('3mo');
  const [laborers, setLaborers] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [inventory, setInventory] = useState<Record<string, { have: number; checked: boolean }>>({});
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Load saved inventory from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem('sphinx_food_storage_inventory_v1');
      if (saved) {
        setInventory(JSON.parse(saved));
      }
      const savedConfig = localStorage.getItem('sphinx_food_storage_config_v1');
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        if (parsed.adults) setAdults(parsed.adults);
        if (parsed.children) setChildren(parsed.children);
        if (parsed.timeframe) setTimeframe(parsed.timeframe);
        if (parsed.laborers) setLaborers(parsed.laborers);
      }
    } catch (e) {
      console.error('Failed to load storage inventory', e);
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('sphinx_food_storage_inventory_v1', JSON.stringify(inventory));
      localStorage.setItem(
        'sphinx_food_storage_config_v1',
        JSON.stringify({ adults, children, timeframe, laborers })
      );
    } catch (e) {
      console.error('Failed to persist storage inventory', e);
    }
  }, [inventory, adults, children, timeframe, laborers]);

  // Aggregate demographic factor
  // Base Adult = 1.0, Child average = 0.60, Laborer premium = +0.35
  const demographicFactor = useMemo(() => {
    const adultVal = Math.max(1, adults);
    const childVal = Math.max(0, children) * 0.6;
    const laborVal = Math.max(0, laborers) * 0.35;
    return adultVal + childVal + laborVal;
  }, [adults, children, laborers]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    MASTER_STORAGE_ITEMS.forEach((item) => set.add(item.category));
    return Array.from(set);
  }, []);

  // Filtered Items
  const filteredItems = useMemo(() => {
    const q = searchFilter.toLowerCase().trim();
    return MASTER_STORAGE_ITEMS.filter((item) => {
      if (selectedCat !== 'all' && item.category !== selectedCat) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.packageNote && item.packageNote.toLowerCase().includes(q))
      );
    });
  }, [selectedCat, searchFilter]);

  // Update item have quantity
  const handleUpdateHave = (id: string, delta: number) => {
    setInventory((prev) => {
      const current = prev[id] || { have: 0, checked: false };
      const nextHave = Math.max(0, Math.round((current.have + delta) * 10) / 10);
      return {
        ...prev,
        [id]: { ...current, have: nextHave }
      };
    });
  };

  // Toggle item completed check
  const handleToggleCheck = (id: string) => {
    setInventory((prev) => {
      const current = prev[id] || { have: 0, checked: false };
      return {
        ...prev,
        [id]: { ...current, checked: !current.checked }
      };
    });
  };

  // Calculate overall preparedness metrics
  const stats = useMemo(() => {
    let totalTargetUnits = 0;
    let totalStockedUnits = 0;
    let checkedCount = 0;

    MASTER_STORAGE_ITEMS.forEach((item) => {
      const baseAmt = timeframe === '3mo' ? item.baseAmountPerAdult3Mo : item.baseAmountPerAdult1Yr;
      const needed = Math.ceil(baseAmt * demographicFactor);
      totalTargetUnits += needed;

      const record = inventory[item.id] || { have: 0, checked: false };
      totalStockedUnits += Math.min(needed, record.have);
      if (record.checked || record.have >= needed) checkedCount++;
    });

    const percent = totalTargetUnits > 0 ? Math.round((totalStockedUnits / totalTargetUnits) * 100) : 0;
    return {
      totalItems: MASTER_STORAGE_ITEMS.length,
      checkedCount,
      percent: Math.min(100, Math.max(0, percent))
    };
  }, [demographicFactor, timeframe, inventory]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Category', 'Item Name', 'Recommended Target', 'Unit', 'Currently Have', 'Status', 'Packaging Notes'];
    const rows = MASTER_STORAGE_ITEMS.map((item) => {
      const baseAmt = timeframe === '3mo' ? item.baseAmountPerAdult3Mo : item.baseAmountPerAdult1Yr;
      const needed = Math.ceil(baseAmt * demographicFactor);
      const record = inventory[item.id] || { have: 0, checked: false };
      const status = record.checked || record.have >= needed ? 'COMPLETE' : `${needed - record.have} DEFICIT`;
      return [
        `"${item.category}"`,
        `"${item.name}"`,
        needed,
        `"${item.unit}"`,
        record.have,
        `"${status}"`,
        `"${item.packageNote || ''}"`
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    navigator.clipboard.writeText(csvContent);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="space-y-5 text-gray-200">
      
      {/* Top Banner & Household Sizing Card */}
      <div className="bg-gradient-to-r from-slate-900/90 via-cyan-950/70 to-slate-900/90 border border-cyan-800/80 rounded-2xl p-4 sm:p-5 shadow-[0_0_25px_rgba(8,145,178,0.2)] space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-500/80 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
              <Calculator size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-base tracking-wide flex items-center gap-2">
                <span>CIVIL DEFENSE FOOD STORAGE & READINESS CALCULATOR</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-cyan-950 text-cyan-300 border border-cyan-600/50">
                  {timeframe === '3mo' ? '3-MONTH RESERVE' : '1-YEAR SUPPLY'}
                </span>
              </h3>
              <p className="text-xs text-gray-400">
                Demographic caloric multiplier: ~2,300 kcal/adult/day baseline with demographic scaling
              </p>
            </div>
          </div>

          {/* Timeframe Selector Buttons */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-black/60 p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setTimeframe('3mo')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                timeframe === '3mo'
                  ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              3-Month Staged Plan
            </button>
            <button
              type="button"
              onClick={() => setTimeframe('1yr')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                timeframe === '1yr'
                  ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              1-Year Strategic Reserve
            </button>
          </div>
        </div>

        {/* Demographic Controls & Multiplier Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          
          {/* Adults */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-2.5 space-y-1.5">
            <span className="text-gray-400 font-medium text-[11px]">Adults (1.0x Cal):</span>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
              >
                <Minus size={13} />
              </button>
              <span className="font-bold text-base text-cyan-300 font-mono">{adults}</span>
              <button
                type="button"
                onClick={() => setAdults(adults + 1)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
              >
                <Plus size={13} />
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-2.5 space-y-1.5">
            <span className="text-gray-400 font-medium text-[11px]">Children (0.6x Cal):</span>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
              >
                <Minus size={13} />
              </button>
              <span className="font-bold text-base text-cyan-300 font-mono">{children}</span>
              <button
                type="button"
                onClick={() => setChildren(children + 1)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
              >
                <Plus size={13} />
              </button>
            </div>
          </div>

          {/* Manual Laborers */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-2.5 space-y-1.5">
            <span className="text-gray-400 font-medium text-[11px]">Laborers (+0.35x):</span>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setLaborers(Math.max(0, laborers - 1))}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
              >
                <Minus size={13} />
              </button>
              <span className="font-bold text-base text-amber-300 font-mono">{laborers}</span>
              <button
                type="button"
                onClick={() => setLaborers(laborers + 1)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
              >
                <Plus size={13} />
              </button>
            </div>
          </div>

          {/* Total Scale Factor */}
          <div className="bg-cyan-950/40 border border-cyan-700/60 rounded-xl p-2.5 flex flex-col justify-center text-center">
            <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Equivalent Adults</span>
            <span className="font-extrabold text-lg text-cyan-200 font-mono">
              {demographicFactor.toFixed(2)}x
            </span>
          </div>
        </div>

        {/* Readiness Meter */}
        <div className="bg-black/50 border border-white/10 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:flex-1 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300 font-semibold flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Household Preparedness Status:</span>
              </span>
              <span className="font-bold font-mono text-cyan-300">{stats.percent}% Stocked</span>
            </div>
            <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-400 transition-all duration-300"
                style={{ width: `${stats.percent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              data-testid="btn-export-storage-csv"
              onClick={handleExportCSV}
              className="py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors"
              title="Copy CSV to clipboard for Excel / Google Sheets"
            >
              {copiedNotification ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copiedNotification ? 'CSV COPIED!' : 'EXPORT CSV'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Category Pills */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between text-xs">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search items (e.g., wheat, bleach, tuna, salt, formula)..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setSelectedCat('all')}
            className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap font-medium ${
              selectedCat === 'all'
                ? 'bg-cyan-600 text-white font-bold'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            All Categories ({MASTER_STORAGE_ITEMS.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap font-medium ${
                selectedCat === cat
                  ? 'bg-cyan-600 text-white font-bold'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items Table List */}
      <div className="space-y-2">
        {filteredItems.map((item) => {
          const baseAmt = timeframe === '3mo' ? item.baseAmountPerAdult3Mo : item.baseAmountPerAdult1Yr;
          const needed = Math.ceil(baseAmt * demographicFactor);
          const record = inventory[item.id] || { have: 0, checked: false };
          const isSatisfied = record.checked || record.have >= needed;

          return (
            <div
              key={item.id}
              className={`p-3 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isSatisfied
                  ? 'bg-emerald-950/20 border-emerald-800/40'
                  : 'bg-black/40 border-white/10 hover:border-cyan-800/60'
              }`}
            >
              {/* Left Info Column */}
              <div className="flex items-start gap-2.5 flex-1">
                <button
                  type="button"
                  onClick={() => handleToggleCheck(item.id)}
                  className="mt-0.5 text-gray-400 hover:text-cyan-300 transition-colors"
                >
                  {isSatisfied ? (
                    <CheckSquare size={16} className="text-emerald-400" />
                  ) : (
                    <Square size={16} />
                  )}
                </button>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-xs">{item.name}</span>
                    <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      {item.category}
                    </span>
                  </div>
                  {item.packageNote && (
                    <p className="text-[11px] text-gray-400">
                      Standard pack: {item.packageNote}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Targets & Have Inputs */}
              <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-mono">
                {/* Target Needed */}
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 block uppercase">Target</span>
                  <span className="font-bold text-white">
                    {needed} {item.unit}
                  </span>
                </div>

                {/* Have Quantity Controller */}
                <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => handleUpdateHave(item.id, -1)}
                    className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300"
                  >
                    <Minus size={11} />
                  </button>
                  <input
                    type="number"
                    value={record.have}
                    onChange={(e) => {
                      const val = Math.max(0, parseFloat(e.target.value) || 0);
                      setInventory((prev) => ({
                        ...prev,
                        [item.id]: { ...(prev[item.id] || { checked: false }), have: val }
                      }));
                    }}
                    className="w-14 bg-transparent text-center font-bold text-xs text-cyan-300 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleUpdateHave(item.id, 1)}
                    className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300"
                  >
                    <Plus size={11} />
                  </button>
                </div>

                {/* Status Indicator Chip */}
                <div className="w-20 text-center">
                  {isSatisfied ? (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded-md border border-emerald-700/60 block">
                      STOCKED
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-1 rounded-md border border-amber-700/60 block">
                      -{Math.max(0, needed - record.have)} {item.unit}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
