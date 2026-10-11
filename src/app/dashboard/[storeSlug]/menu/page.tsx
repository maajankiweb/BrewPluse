'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Sparkles, Plus, Image as ImageIcon, Trash2, Edit3, X, Check, Search, Coffee, Utensils } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  cat: 'coffee' | 'tea' | 'bakes';
  price: number;
  desc?: string;
  color?: string;
  mod?: string;
  image?: string;
}

const DEFAULT_MENU_CATALOG: MenuItem[] = [
  { id: 'bp-flat-white', name: 'Flat White', cat: 'coffee', price: 180, desc: 'Double shot, steamed milk', color: '#BA7E52', mod: 'Oat milk', image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-cold-brew', name: 'Cold Brew', cat: 'coffee', price: 210, desc: '12-hour steep, over ice', color: '#442E25', mod: 'Sweet cream', image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-masala-chai', name: 'Masala Chai', cat: 'tea', price: 120, desc: 'Ginger, cardamom, milk tea', color: '#D39E3A', mod: 'Cardamom', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-butter-croissant', name: 'Butter Croissant', cat: 'bakes', price: 140, desc: 'Baked fresh each morning', color: '#E0AB75', mod: 'Warmed', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-espresso', name: 'Espresso Single', cat: 'coffee', price: 90, desc: 'Rich crema, intense extraction', color: '#2C1810', mod: 'Single shot', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-cappuccino', name: 'Cappuccino Foam', cat: 'coffee', price: 140, desc: 'Velvety foam, cocoa dusting', color: '#A06E4A', mod: 'Whole milk', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-caramel-macchiato', name: 'Caramel Macchiato', cat: 'coffee', price: 190, desc: 'Vanilla syrup, caramel drizzle', color: '#C78440', mod: 'Extra caramel', image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-blueberry-muffin', name: 'Blueberry Muffin', cat: 'bakes', price: 120, desc: 'Wild blueberries, crumble crust', color: '#795548', mod: 'Warmed', image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-paneer-sandwich', name: 'Paneer Tikka Sandwich', cat: 'bakes', price: 180, desc: 'Grilled sourdough, spiced paneer', color: '#B35422', mod: 'Toasted', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-green-tea', name: 'Green Tea Pot', cat: 'tea', price: 100, desc: 'Whole leaf organic blend', color: '#5B8A5A', mod: 'Honey', image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=400&q=80' }
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
  const [category, setCategory] = useState<'coffee' | 'tea' | 'bakes'>('coffee');
  const [price, setPrice] = useState<number | ''>('');
  const [desc, setDesc] = useState('');
  const [mod, setMod] = useState('');
  const [image, setImage] = useState('');
  const [savedToast, setSavedToast] = useState(false);

  // Load menu items
  useEffect(() => {
    try {
      const stored = localStorage.getItem('brewpluse::menu_items');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMenuItems(parsed);
          return;
        }
      }
    } catch (e) {}

    // Default catalog
    setMenuItems(DEFAULT_MENU_CATALOG);
    localStorage.setItem('brewpluse::menu_items', JSON.stringify(DEFAULT_MENU_CATALOG));
  }, []);

  const saveCatalogToStorage = (updated: MenuItem[]) => {
    setMenuItems(updated);
    try {
      localStorage.setItem('brewpluse::menu_items', JSON.stringify(updated));
      fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: updated })
      }).catch(() => {});
    } catch (e) {}

    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleOpenAddModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setName(item.name);
      setCategory(item.cat);
      setPrice(item.price);
      setDesc(item.desc || '');
      setMod(item.mod || '');
      setImage(item.image || '');
    } else {
      setEditingItem(null);
      setName('');
      setCategory('coffee');
      setPrice('');
      setDesc('');
      setMod('');
      setImage('');
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
          ? { ...item, name, cat: category, price: Number(price), desc, mod, image, color }
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
        color
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

          <button
            onClick={() => handleOpenAddModal()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#153326] hover:bg-[#0E2219] text-white text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Add New Dish &amp; Upload Photo</span>
          </button>
        </div>

        {/* Filters & Search Row (Mobile first) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-[#0E2018] p-3 sm:p-4 rounded-2xl border border-[#EAE8E4] dark:border-[#1E382E]">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {['all', 'coffee', 'tea', 'bakes'].map(cat => (
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
                  {item.mod && (
                    <span className="inline-block mt-1 text-[10px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md">
                      {item.mod}
                    </span>
                  )}
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
                      <option value="tea">Tea</option>
                      <option value="bakes">Bakes</option>
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

      </div>
    </DashboardShell>
  );
}
