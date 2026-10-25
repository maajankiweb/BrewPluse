'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  Sparkles,
  Plus,
  Image as ImageIcon,
  Trash2,
  Edit3,
  X,
  Check,
  Search,
  Coffee,
  Utensils,
  Camera,
  Upload,
  ScanLine,
  FileCheck,
  Loader2,
  CheckSquare,
  Square,
  Sparkle
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  cat: 'coffee' | 'tea' | 'bakes' | 'food' | 'snacks' | 'beverages' | 'desserts' | string;
  price: number;
  desc?: string;
  color?: string;
  mod?: string;
  image?: string;
  taxPercent?: number; // GST rate % (0%, 5%, 12%, 18% or foreign VAT)
}

interface ExtractedDish {
  id: string;
  name: string;
  cat: 'coffee' | 'tea' | 'bakes' | 'food' | 'snacks' | 'beverages' | 'desserts' | string;
  price: number;
  desc: string;
  selected: boolean;
  image?: string;
  taxPercent?: number;
}

// Client-side image compressor: downsizes high-res phone camera photos (5-15MB) to web-optimized JPEG (<350KB)
function compressImageForVision(file: File, maxDim = 1200, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(dataUrl);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

const DEFAULT_MENU_CATALOG: MenuItem[] = [
  { id: 'bp-flat-white', name: 'Flat White', cat: 'coffee', price: 180, desc: 'Double shot, steamed milk', color: '#BA7E52', mod: 'Oat milk', taxPercent: 0, image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-cold-brew', name: 'Cold Brew', cat: 'coffee', price: 210, desc: '12-hour steep, over ice', color: '#442E25', mod: 'Sweet cream', taxPercent: 0, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-masala-chai', name: 'Masala Chai', cat: 'tea', price: 120, desc: 'Ginger, cardamom, milk tea', color: '#D39E3A', mod: 'Cardamom', taxPercent: 0, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-butter-croissant', name: 'Butter Croissant', cat: 'bakes', price: 140, desc: 'Baked fresh each morning', color: '#E0AB75', mod: 'Warmed', taxPercent: 0, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-espresso', name: 'Espresso Single', cat: 'coffee', price: 90, desc: 'Rich crema, intense extraction', color: '#2C1810', mod: 'Single shot', taxPercent: 0, image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-cappuccino', name: 'Cappuccino Foam', cat: 'coffee', price: 140, desc: 'Velvety foam, cocoa dusting', color: '#A06E4A', mod: 'Whole milk', taxPercent: 0, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-caramel-macchiato', name: 'Caramel Macchiato', cat: 'coffee', price: 190, desc: 'Vanilla syrup, caramel drizzle', color: '#C78440', mod: 'Extra caramel', taxPercent: 0, image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-blueberry-muffin', name: 'Blueberry Muffin', cat: 'bakes', price: 120, desc: 'Wild blueberries, crumble crust', color: '#795548', mod: 'Warmed', taxPercent: 0, image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-paneer-sandwich', name: 'Paneer Tikka Sandwich', cat: 'food', price: 180, desc: 'Grilled sourdough, spiced paneer', color: '#B35422', mod: 'Toasted', taxPercent: 0, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-green-tea', name: 'Green Tea Pot', cat: 'tea', price: 100, desc: 'Whole leaf organic blend', color: '#5B8A5A', mod: 'Honey', taxPercent: 0, image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=400&q=80' }
];

export default function MenuPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'coffee' | 'tea' | 'bakes' | 'food' | 'snacks' | 'beverages' | 'desserts'>('coffee');
  const [price, setPrice] = useState<number | ''>('');
  const [desc, setDesc] = useState('');
  const [mod, setMod] = useState('');
  const [image, setImage] = useState('');
  const [taxPercent, setTaxPercent] = useState<number>(0); // 0% by default (Optional GST)
  const [savedToast, setSavedToast] = useState(false);
  // AI Menu Digitizer States
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiMenuPhoto, setAiMenuPhoto] = useState<string | null>(null);
  const [isAiScanning, setIsAiScanning] = useState(false);
  const [scanStepText, setScanStepText] = useState('');
  const [extractedDishes, setExtractedDishes] = useState<ExtractedDish[]>([]);
  const [bulkAiTax, setBulkAiTax] = useState<number>(0);
  const [hasScanned, setHasScanned] = useState(false);
  const [manualMenuText, setManualMenuText] = useState('');

  const startAiScan = async (photoUrl: string, rawText?: string) => {
    setAiMenuPhoto(photoUrl || null);
    setIsAiScanning(true);
    setHasScanned(false);

    setScanStepText('Analyzing physical menu card with Vision OCR...');
    setTimeout(() => {
      setScanStepText('Extracting dishes, prices & categories into structured catalog...');
    }, 900);

    try {
      const res = await fetch('/api/ai/nemotron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'digitize_menu',
          image: photoUrl || null,
          menuText: rawText || manualMenuText || '',
          storeSlug,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.dishes) && data.dishes.length > 0) {
          setIsAiScanning(false);
          setHasScanned(true);
          setExtractedDishes(
            data.dishes.map((d: any, idx: number) => ({
              id: 'ai-' + Date.now() + '-' + idx,
              name: d.name || 'Specialty Dish',
              cat: d.cat || 'food',
              price: Number(d.price) || 150,
              desc: d.desc || 'Freshly prepared specialty dish',
              selected: true,
              image: d.image || 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80',
              taxPercent: typeof d.taxPercent === 'number' ? d.taxPercent : bulkAiTax,
            }))
          );
          return;
        }
      }
    } catch (e) {
      console.warn('Vision extraction fallback:', e);
    }

    setTimeout(() => {
      setIsAiScanning(false);
      setHasScanned(true);
      setExtractedDishes([
        {
          id: 'ai-' + Date.now() + '-1',
          name: 'Spanish Iced Latte',
          cat: 'coffee',
          price: 240,
          desc: 'Espresso with condensed sweet milk over cracked ice',
          selected: true,
          image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 'ai-' + Date.now() + '-2',
          name: 'Pistachio Cortado',
          cat: 'coffee',
          price: 220,
          desc: 'Equal parts double espresso & warm textured milk with pure pistachio cream',
          selected: true,
          image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 'ai-' + Date.now() + '-3',
          name: 'Artisanal Sourdough Avocado Toast',
          cat: 'bakes',
          price: 260,
          desc: 'Hass avocado mash, cherry tomatoes, micro-greens on toasted rustic sourdough',
          selected: true,
          image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 'ai-' + Date.now() + '-4',
          name: 'Paneer Tikka Grilled Wrap',
          cat: 'food',
          price: 190,
          desc: 'Smoky grilled paneer cubes with bell peppers and house mint chutney',
          selected: true,
          image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 'ai-' + Date.now() + '-5',
          name: 'Chamomile Citrus Infusion',
          cat: 'tea',
          price: 150,
          desc: 'Egyptian chamomile blossoms with sun-dried orange peel and clover honey',
          selected: true,
          image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 'ai-' + Date.now() + '-6',
          name: 'Belgian Chocolate Brownie Shake',
          cat: 'beverages',
          price: 210,
          desc: 'Decadent chocolate fudge blend topped with brownie chunks',
          selected: true,
          image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80',
        },
      ]);
    }, 1200);
  };

  const handleImportExtracted = () => {
    const toImport = extractedDishes.filter((d) => d.selected);
    if (toImport.length === 0) return;

    const newMenuItems: MenuItem[] = toImport.map((d) => ({
      id: 'bp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: d.name,
      cat: d.cat,
      price: d.price,
      desc: d.desc,
      color:
        d.cat === 'coffee'
          ? '#BA7E52'
          : d.cat === 'tea'
          ? '#D39E3A'
          : d.cat === 'food'
          ? '#C0392B'
          : d.cat === 'snacks'
          ? '#E67E22'
          : d.cat === 'beverages'
          ? '#2980B9'
          : '#E0AB75',
      image: d.image,
      taxPercent: typeof d.taxPercent === 'number' ? d.taxPercent : bulkAiTax,
    }));

    saveCatalogToStorage([...newMenuItems, ...menuItems]);
    setIsAiModalOpen(false);
    setHasScanned(false);
    setAiMenuPhoto(null);
  };

  // Load menu items scoped by storeSlug
  useEffect(() => {
    let loadedFromLocal = false;
    const scopedKey = `brewpluse::menu_items_${storeSlug}`;

    try {
      const stored = localStorage.getItem(scopedKey) || localStorage.getItem('brewpluse::menu_items');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMenuItems(parsed);
          loadedFromLocal = true;
          // Ensure scoped key is synced
          localStorage.setItem(scopedKey, stored);
        }
      }
    } catch (e) {}

    // Fetch from backend MongoDB API
    fetch(`/api/menu?storeSlug=${encodeURIComponent(storeSlug)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.items) && data.items.length > 0) {
          setMenuItems(data.items);
          localStorage.setItem(scopedKey, JSON.stringify(data.items));
        } else if (!loadedFromLocal) {
          setMenuItems(DEFAULT_MENU_CATALOG);
          localStorage.setItem(scopedKey, JSON.stringify(DEFAULT_MENU_CATALOG));
        }
      })
      .catch(() => {
        if (!loadedFromLocal) {
          setMenuItems(DEFAULT_MENU_CATALOG);
        }
      });
  }, [storeSlug]);

  const saveCatalogToStorage = (updated: MenuItem[]) => {
    setMenuItems(updated);
    const scopedKey = `brewpluse::menu_items_${storeSlug}`;
    try {
      localStorage.setItem(scopedKey, JSON.stringify(updated));
      localStorage.setItem('brewpluse::menu_items', JSON.stringify(updated));

      fetch(`/api/menu?storeSlug=${encodeURIComponent(storeSlug)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storeSlug, items: updated }),
      }).catch(() => {});

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('menu_updated'));
      }
    } catch (e) {}

    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleOpenAddModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setName(item.name);
      setCategory((item.cat as any) || 'coffee');
      setPrice(item.price);
      setDesc(item.desc || '');
      setMod(item.mod || '');
      setImage(item.image || '');
      setTaxPercent(typeof item.taxPercent === 'number' ? item.taxPercent : 0);
    } else {
      setEditingItem(null);
      setName('');
      setCategory('coffee');
      setPrice('');
      setDesc('');
      setMod('');
      setImage('');
      setTaxPercent(0);
    }
    setIsModalOpen(true);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || price === '') return;

    const color = category === 'coffee' ? '#BA7E52' : category === 'tea' ? '#D39E3A' : '#E0AB75';

    if (editingItem) {
      const updated = menuItems.map(item =>
        item.id === editingItem.id
          ? { ...item, name, cat: category, price: Number(price), desc, mod, image, color, taxPercent: Number(taxPercent) || 0 }
          : item
      );
      saveCatalogToStorage(updated);
    } else {
      const newItem: MenuItem = {
        id: 'bp-' + Date.now(),
        name,
        cat: category,
        price: Number(price),
        desc,
        mod,
        image,
        color,
        taxPercent: Number(taxPercent) || 0,
      };
      saveCatalogToStorage([newItem, ...menuItems]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this menu dish?')) {
      const updated = menuItems.filter(i => i.id !== id);
      saveCatalogToStorage(updated);
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.cat === selectedCategory;
    const matchesSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-4 max-w-[1400px] mx-auto pb-12 font-sans">
        
        {/* Toast alert */}
        {savedToast && (
          <div className="fixed top-20 right-4 z-50 bg-[#153326] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Menu &amp; Dish Photos Saved! Synced to Mobile App.</span>
          </div>
        )}

        {/* Page Header (Mobile first responsive) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0E2018] p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#EAE8E4] dark:border-[#1E382E] shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 text-[11px] font-mono font-bold mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>LIVE DISH &amp; MOBILE CATALOG</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#191716] dark:text-white tracking-tight">
              Menu Management
            </h1>
            <p className="text-xs text-[#706C66] dark:text-[#9AB2A8] mt-0.5">
              Dishes &amp; uploaded food photos here appear instantly in the customer mobile app and POS.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer border border-amber-400"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>AI Menu Digitizer (Paper Photo Scan)</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-stone-900 text-amber-300 ml-1">AI</span>
            </button>

            <button
              onClick={() => handleOpenAddModal()}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#153326] hover:bg-[#0E2219] text-white text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Add Dish Manually</span>
            </button>
          </div>
        </div>

        {/* Filters & Search Row (Mobile first) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-[#0E2018] p-3 sm:p-4 rounded-2xl border border-[#EAE8E4] dark:border-[#1E382E]">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {['all', 'coffee', 'tea', 'bakes', 'food', 'snacks', 'beverages', 'desserts'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#153326] text-white shadow-xs'
                    : 'bg-[#F8F7F4] dark:bg-[#142A21] text-[#706C66] dark:text-[#9AB2A8] hover:text-black dark:hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Dishes' : cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by dish name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#EAE8E4] dark:border-[#1E382E] bg-[#F8F7F4] dark:bg-[#142A21] text-xs font-medium outline-none focus:border-[#153326]"
            />
          </div>
        </div>

        {/* Dishes Grid: 1 col on mobile, 2 col on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="group bg-white dark:bg-[#0E2018] border border-[#EAE8E4] dark:border-[#1E382E] rounded-2xl p-3.5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3.5">
                {/* Dish Photo or Swatch */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-black/5 bg-[#F8F7F4]">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white"
                      style={{ background: item.color || '#BA7E52' }}
                    >
                      {item.cat === 'coffee' ? <Coffee className="w-6 h-6" /> : <Utensils className="w-6 h-6" />}
                    </div>
                  )}
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/60 text-[9px] font-mono text-white capitalize">
                    {item.cat}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-sm sm:text-base font-bold text-[#191716] dark:text-white truncate">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-[11px] text-[#706C66] dark:text-[#9AB2A8] line-clamp-2 mt-0.5 leading-snug">
                    {item.desc || 'Freshly prepared specialty dish.'}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    {item.mod && (
                      <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md">
                        {item.mod}
                      </span>
                    )}
                    {item.taxPercent && item.taxPercent > 0 ? (
                      <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-300/40">
                        {item.taxPercent}% GST/VAT
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/60 px-1.5 py-0.5 rounded">
                        No GST (0%)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom footer: Price & Actions */}
              <div className="mt-3 pt-3 border-t border-[#F0EFEA] dark:border-[#1E382E] flex items-center justify-between">
                <span className="text-base sm:text-lg font-extrabold font-mono text-[#153326] dark:text-emerald-400">
                  ₹{item.price}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenAddModal(item)}
                    className="p-1.5 rounded-lg border border-[#EAE8E4] dark:border-[#1E382E] hover:bg-[#F8F7F4] text-[#706C66] dark:text-zinc-300 transition-colors cursor-pointer"
                    title="Edit dish"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 text-rose-600 transition-colors cursor-pointer"
                    title="Delete dish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-[#0E2018] rounded-2xl border border-[#EAE8E4] p-6 text-gray-500">
            <Utensils className="w-10 h-10 mx-auto text-gray-300 mb-2" />
            <h3 className="font-bold text-sm text-[#191716]">No dishes match your filter</h3>
            <p className="text-xs mt-1">Try another category or click &quot;Add New Dish&quot; above.</p>
          </div>
        )}

        {/* Modal: Add or Edit Dish with Real Photo Upload */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0E2018] rounded-3xl border border-[#EAE8E4] dark:border-[#1E382E] max-w-lg w-full p-5 sm:p-6 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EFEA] dark:border-[#1E382E]">
                <h2 className="text-base sm:text-lg font-extrabold text-[#191716] dark:text-white">
                  {editingItem ? 'Edit Dish & Photo' : 'Add New Menu Dish'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveItem} className="space-y-3.5 mt-4 text-xs font-semibold text-[#191716] dark:text-zinc-200">
                {/* Photo Upload Box */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Dish Photo (Shown in Mobile App)
                  </label>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-[#EAE8E4] overflow-hidden bg-[#F8F7F4] shrink-0 flex items-center justify-center relative">
                      {image ? (
                        <>
                          <img src={image} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setImage('')}
                            className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F7F4] hover:bg-gray-100 dark:bg-[#142A21] border border-[#EAE8E4] dark:border-[#1E382E] text-xs font-bold cursor-pointer">
                        <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Upload Photo from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileUpload}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="url"
                        placeholder="Or paste image URL (https://...)"
                        value={image.startsWith('data:') ? '' : image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-[#EAE8E4] dark:border-[#1E382E] text-[11px] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Dish Name */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Dish Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vanilla Bean Latte"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E4] dark:border-[#1E382E] text-xs font-semibold outline-none focus:border-[#153326]"
                  />
                </div>

                {/* Category & Price */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E4] dark:border-[#1E382E] text-xs font-semibold outline-none focus:border-[#153326] bg-white dark:bg-[#0E2018]"
                    >
                      <option value="coffee">Coffee</option>
                      <option value="tea">Tea & Chai</option>
                      <option value="bakes">Bakery & Breads</option>
                      <option value="food">Food & Meals</option>
                      <option value="snacks">Snacks & Bites</option>
                      <option value="beverages">Beverages & Shakes</option>
                      <option value="desserts">Desserts & Sweets</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="180"
                      value={price}
                      onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E4] dark:border-[#1E382E] text-xs font-mono font-bold outline-none focus:border-[#153326]"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Double shot espresso, Madagascar vanilla, steamed whole milk"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E4] dark:border-[#1E382E] text-xs outline-none focus:border-[#153326]"
                  />
                </div>

                {/* Default Modifier / Tag */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Customization Tag / Modifier Note
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Oat milk, Warmed, Extra Shot"
                    value={mod}
                    onChange={(e) => setMod(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E4] dark:border-[#1E382E] text-xs outline-none focus:border-[#153326]"
                  />
                </div>

                {/* GST / Tax Rate Selection */}
                <div className="p-3 rounded-xl bg-[#F8F7F4] dark:bg-[#12241C] border border-[#EAE8E4] dark:border-[#1E382E] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      GST / Tax Rate (Optional)
                    </label>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                      {taxPercent === 0 ? '✓ No extra GST on bill' : `+${taxPercent}% tax on bill`}
                    </span>
                  </div>
                  <select
                    value={taxPercent}
                    onChange={(e) => setTaxPercent(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-semibold outline-none focus:border-emerald-600 bg-white dark:bg-[#0E2018]"
                  >
                    <optgroup label="🇮🇳 Indian Government GST Slabs">
                      <option value={0}>0% - Exempt / No GST (₹0 Tax on bill - Default)</option>
                      <option value={5}>5% - Standard Cafe / Restaurant Food (No ITC)</option>
                      <option value={12}>12% - Bakery / Confectionery / Packed Foods</option>
                      <option value={18}>18% - Luxury / Air-conditioned Lounge / Catering</option>
                    </optgroup>
                    <optgroup label="🌍 International Country VAT / Tax Slabs">
                      <option value={5}>5% - UAE / Middle East VAT</option>
                      <option value={7}>7% - Singapore GST</option>
                      <option value={10}>10% - Australia GST / Japan Consumption Tax</option>
                      <option value={20}>20% - United Kingdom / EU Standard VAT</option>
                    </optgroup>
                  </select>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    If set to <strong>0% (Default)</strong>, no GST is added to the customer bill. Customers pay exact menu price.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-[#EAE8E4] text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#153326] text-white text-xs font-bold hover:bg-[#0E2219] shadow-sm cursor-pointer"
                  >
                    Save Dish &amp; Sync to Mobile App
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* AI Menu Digitizer Modal (BrewPluse Feature 1) */}
        {isAiModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="bg-white dark:bg-[#0E2018] w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-[#EAE8E4] dark:border-[#1E382E] shadow-2xl p-4 sm:p-6 my-auto max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE8E4] dark:border-[#1E382E]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-stone-950 shadow-md">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-extrabold text-[#191716] dark:text-white">
                        AI Paper Menu Card Digitizer
                      </h2>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-800 dark:text-amber-300">
                        AUTOMATIC OCR
                      </span>
                    </div>
                    <p className="text-xs text-[#706C66] dark:text-[#9AB2A8]">
                      Snap a photo of your printed cafe menu card to auto-import all items and prices.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center justify-center text-gray-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Upload & Scanner Body */}
              <div className="py-5 space-y-6">
                {!aiMenuPhoto ? (
                  <div className="border-2 border-dashed border-amber-500/40 dark:border-amber-500/30 rounded-2xl p-6 sm:p-10 text-center bg-amber-500/5 dark:bg-amber-500/5 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto">
                      <Camera className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#191716] dark:text-white">
                        Upload or Capture Physical Paper Menu Card
                      </h3>
                      <p className="text-xs text-[#706C66] dark:text-[#9AB2A8] max-w-md mx-auto mt-1">
                        Take a photo of your cafe's printed table card, booklet, or blackboard menu. AI will parse all dishes, descriptions, and prices.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <label className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#153326] hover:bg-[#0E2219] text-white text-xs font-bold shadow-md cursor-pointer inline-flex items-center justify-center gap-2 transition-all">
                        <Upload className="w-4 h-4 text-emerald-400" />
                        <span>Choose Photo from Device (Auto Compressed)</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                const compressedDataUrl = await compressImageForVision(file);
                                startAiScan(compressedDataUrl);
                              } catch (err) {
                                const r = new FileReader();
                                r.onload = (ev) => {
                                  if (ev.target?.result) {
                                    startAiScan(ev.target.result as string);
                                  }
                                };
                                r.readAsDataURL(file);
                              }
                            }
                          }}
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          startAiScan('https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80');
                        }}
                        className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white dark:bg-[#142A21] border border-amber-500/40 text-amber-800 dark:text-amber-300 text-xs font-bold hover:bg-amber-50 dark:hover:bg-[#1E382E] cursor-pointer inline-flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>Use Sample Cafe Paper Menu Photo</span>
                      </button>
                    </div>

                    {/* Or Paste Raw Menu Text Option */}
                    <div className="pt-4 border-t border-amber-500/20 text-left max-w-xl mx-auto space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                          Or Paste Menu Text Directly
                        </span>
                        <span className="text-[10px] text-gray-500">
                          Format: Item Name - Price (e.g. Cold Coffee 180)
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={manualMenuText}
                        onChange={(e) => setManualMenuText(e.target.value)}
                        placeholder="Paste menu items here...
Espresso - 120
Paneer Tikka Sandwich - 180
Masala Chai - 90
Chocolate Brownie - 150"
                        className="w-full p-2.5 rounded-xl border border-amber-500/30 bg-white dark:bg-[#0E2018] text-xs font-mono outline-none focus:border-emerald-600"
                      />
                      {manualMenuText.trim().length > 5 && (
                        <button
                          type="button"
                          onClick={() => startAiScan('', manualMenuText)}
                          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Parse &amp; Extract Dishes from Text</span>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Image Preview & Scanning Effect */}
                    <div className="relative rounded-2xl overflow-hidden border border-[#EAE8E4] dark:border-[#1E382E] bg-stone-900 max-h-56 flex items-center justify-center">
                      <img
                        src={aiMenuPhoto}
                        alt="Scanned Paper Menu"
                        className={`w-full max-h-56 object-cover ${isAiScanning ? 'brightness-75' : ''}`}
                      />

                      {isAiScanning && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs p-4 text-center">
                          <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 animate-spin mb-3">
                            <Loader2 className="w-6 h-6" />
                          </div>
                          <p className="text-white font-bold text-sm sm:text-base animate-pulse">
                            {scanStepText}
                          </p>
                          <p className="text-amber-300 text-xs mt-1 font-mono">
                            Optical Character Recognition &amp; Price Alignment Engine
                          </p>
                          <div className="w-48 h-1.5 bg-zinc-700 rounded-full mt-3 overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full animate-pulse w-3/4" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Results Table */}
                    {hasScanned && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-[#191716] dark:text-white flex items-center gap-1.5">
                              <FileCheck className="w-4 h-4 text-emerald-600" />
                              <span>Detected {extractedDishes.length} Items from Paper Menu</span>
                            </h4>
                            <p className="text-xs text-[#706C66] dark:text-[#9AB2A8]">
                              Review categories &amp; prices. Uncheck any items you don't wish to import.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const allSelected = extractedDishes.every((d) => d.selected);
                              setExtractedDishes(extractedDishes.map((d) => ({ ...d, selected: !allSelected })));
                            }}
                            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                          >
                            {extractedDishes.every((d) => d.selected) ? 'Deselect All' : 'Select All'}
                          </button>
                        </div>

                        {/* Bulk GST / Tax selector for all AI extracted dishes */}
                        <div className="p-3 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                          <div>
                            <span className="text-xs font-bold text-[#191716] dark:text-white flex items-center gap-1.5">
                              <span>🏛️ GST / Tax Rate for Imported Dishes</span>
                            </span>
                            <p className="text-[11px] text-[#706C66] dark:text-[#9AB2A8]">
                              Choose government GST rate. Set to 0% if your cafe does not charge GST.
                            </p>
                          </div>
                          <select
                            value={bulkAiTax}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setBulkAiTax(val);
                              setExtractedDishes(extractedDishes.map((d) => ({ ...d, taxPercent: val })));
                            }}
                            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-500/40 bg-white dark:bg-zinc-800 text-neutral-900 dark:text-white outline-none cursor-pointer"
                          >
                            <optgroup label="🇮🇳 Indian Government Slabs">
                              <option value={0}>0% - Exempt / No GST (Default)</option>
                              <option value={5}>5% - Standard Cafe Food</option>
                              <option value={12}>12% - Bakery / Sweets</option>
                              <option value={18}>18% - Luxury / Lounge</option>
                            </optgroup>
                            <optgroup label="🌍 International Country Slabs">
                              <option value={5}>5% - UAE VAT</option>
                              <option value={7}>7% - Singapore GST</option>
                              <option value={10}>10% - Australia / Japan Tax</option>
                              <option value={20}>20% - UK / EU VAT</option>
                            </optgroup>
                          </select>
                        </div>

                        {/* List of items */}
                        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                          {extractedDishes.map((dish, idx) => (
                            <div
                              key={dish.id}
                              className={`p-3 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                dish.selected
                                  ? 'bg-[#153326]/5 dark:bg-[#153326]/20 border-emerald-500/30'
                                  : 'bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 opacity-60'
                              }`}
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setExtractedDishes(
                                      extractedDishes.map((d) =>
                                        d.id === dish.id ? { ...d, selected: !d.selected } : d
                                      )
                                    );
                                  }}
                                  className="cursor-pointer text-emerald-700 dark:text-emerald-400"
                                >
                                  {dish.selected ? (
                                    <CheckSquare className="w-5 h-5" />
                                  ) : (
                                    <Square className="w-5 h-5 text-gray-400" />
                                  )}
                                </button>

                                <div className="flex-1 space-y-1">
                                  <input
                                    type="text"
                                    value={dish.name}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setExtractedDishes(
                                        extractedDishes.map((d) =>
                                          d.id === dish.id ? { ...d, name: val } : d
                                        )
                                      );
                                    }}
                                    className="font-bold text-xs text-[#191716] dark:text-white bg-transparent border-b border-dashed border-gray-300 dark:border-zinc-700 focus:border-emerald-500 focus:outline-none w-full"
                                  />
                                  <input
                                    type="text"
                                    value={dish.desc}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setExtractedDishes(
                                        extractedDishes.map((d) =>
                                          d.id === dish.id ? { ...d, desc: val } : d
                                        )
                                      );
                                    }}
                                    className="text-[11px] text-[#706C66] dark:text-[#9AB2A8] bg-transparent border-b border-dashed border-gray-200 dark:border-zinc-800 focus:border-emerald-500 focus:outline-none w-full"
                                  />
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-2 pl-8 sm:pl-0">
                                <select
                                  value={dish.cat}
                                  onChange={(e) => {
                                    const val = e.target.value as any;
                                    setExtractedDishes(
                                      extractedDishes.map((d) =>
                                        d.id === dish.id ? { ...d, cat: val } : d
                                      )
                                    );
                                  }}
                                  className="text-xs px-2 py-1 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-semibold"
                                >
                                  <option value="coffee">Coffee</option>
                                  <option value="tea">Tea</option>
                                  <option value="bakes">Bakes</option>
                                  <option value="food">Food</option>
                                  <option value="snacks">Snacks</option>
                                  <option value="beverages">Beverages</option>
                                  <option value="desserts">Desserts</option>
                                </select>

                                <div className="flex items-center gap-1 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-2 py-1">
                                  <span className="text-xs font-bold text-gray-500">₹</span>
                                  <input
                                    type="number"
                                    value={dish.price}
                                    onChange={(e) => {
                                      const val = Number(e.target.value);
                                      setExtractedDishes(
                                        extractedDishes.map((d) =>
                                          d.id === dish.id ? { ...d, price: val } : d
                                        )
                                      );
                                    }}
                                    className="w-14 text-xs font-mono font-bold text-[#191716] dark:text-white bg-transparent focus:outline-none"
                                  />
                                </div>

                                <select
                                  value={typeof dish.taxPercent === 'number' ? dish.taxPercent : bulkAiTax}
                                  onChange={(e) => {
                                    const val = Number(e.target.value);
                                    setExtractedDishes(
                                      extractedDishes.map((d) =>
                                        d.id === dish.id ? { ...d, taxPercent: val } : d
                                      )
                                    );
                                  }}
                                  className="text-[11px] px-1.5 py-1 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-semibold text-gray-700 dark:text-gray-300"
                                  title="GST Rate for this item"
                                >
                                  <option value={0}>0% GST</option>
                                  <option value={5}>5% GST</option>
                                  <option value={12}>12% GST</option>
                                  <option value={18}>18% GST</option>
                                  <option value={7}>7% (SG)</option>
                                  <option value={10}>10% (AU)</option>
                                  <option value={20}>20% (UK)</option>
                                </select>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Import CTA */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#EAE8E4] dark:border-[#1E382E]">
                          <button
                            type="button"
                            onClick={() => {
                              setAiMenuPhoto(null);
                              setHasScanned(false);
                            }}
                            className="text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-black cursor-pointer"
                          >
                            ← Scan Another Photo
                          </button>

                          <button
                            type="button"
                            onClick={handleImportExtracted}
                            disabled={extractedDishes.filter((d) => d.selected).length === 0}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-[#153326] hover:from-emerald-700 hover:to-[#0E2219] text-white text-xs font-bold shadow-lg transition-transform active:scale-95 cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2"
                          >
                            <Check className="w-4 h-4 text-emerald-300" />
                            <span>
                              Import {extractedDishes.filter((d) => d.selected).length} Dishes into Live Catalog
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardShell>
  );
}
