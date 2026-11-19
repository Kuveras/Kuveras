import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { Product } from '../types';
import { PRODUCTS, applyDynamicProductImages } from '../data/products';

interface SheetSyncResponse {
  success: boolean;
  sheetId?: string;
  timestamp?: string;
  totalRows?: number;
  imagesByProductId?: Record<string, string[]>;
  imagesByProductName?: Record<string, string[]>;
}

interface ProductContextType {
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
  syncStatus: 'idle' | 'syncing' | 'synced' | 'error';
  lastSyncTime: Date | null;
  refreshSync: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Fallback Google Sheet CSV fetch directly in client (if backend is offline or static hosting)
async function fallbackClientFetch(): Promise<SheetSyncResponse | null> {
  try {
    const sheetId = '1AV81VlSFi2z22xGyzZ9x9HLPREip0G9LOBsSIwz4u5g';
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=0`;
    const res = await fetch(csvUrl);
    if (!res.ok) return null;
    const text = await res.text();
    
    // Parse CSV lines
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return null;

    const imagesByProductName: Record<string, string[]> = {};
    const imagesByProductId: Record<string, string[]> = {};

    const aliasMap: Record<string, string> = {
      'gulnaar pink necklace set': 'kuveras-2937',
      'padmashri rose necklace set': 'kuveras-sheet-02',
      'midnight noir necklace set': 'kuveras-sheet-03',
      'silver bloom long set': 'kuveras-sheet-04',
      'mint cascade choker set': 'kuveras-sheet-05',
      'emerald baguette set': 'kuveras-sheet-06',
      'sapphire cascade long set': 'kuveras-sheet-07',
      'blush petal choker set': 'kuveras-sheet-08',
      'mint net choker set': 'kuveras-sheet-09',
      'rajwadi ruby choker set': 'kuveras-sheet-10',
      'heritage kundan collar set': 'kuveras-sheet-11',
      'nilaya panna drop set': 'kuveras-sheet-12',
    };

    for (let i = 1; i < lines.length; i++) {
      // Simple parse: first column is photo, second is name
      const cols = lines[i].split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
      const photoUrl = cols[0];
      const name = cols[1];
      if (!photoUrl || !name) continue;

      const normName = name.toLowerCase();
      // If it's a drive file link or direct image link
      let imgList: string[] = [];
      const matchFileId = photoUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (matchFileId) {
        imgList = [`https://drive.google.com/thumbnail?id=${matchFileId[1]}&sz=w1600`];
      } else if (photoUrl.startsWith('http') && !photoUrl.includes('/folders/')) {
        imgList = [photoUrl];
      }

      if (imgList.length > 0) {
        imagesByProductName[normName] = imgList;
        if (aliasMap[normName]) {
          imagesByProductId[aliasMap[normName]] = imgList;
        }
      }
    }

    return {
      success: true,
      timestamp: new Date().toISOString(),
      imagesByProductId,
      imagesByProductName,
    };
  } catch {
    return null;
  }
}

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productsList, setProductsList] = useState<Product[]>([...PRODUCTS]);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  const syncImages = useCallback(async (forceRefresh = false) => {
    setSyncStatus('syncing');
    try {
      let data: SheetSyncResponse | null = null;

      // 1. Try backend sync endpoint
      try {
        const url = `/api/sheets/images${forceRefresh ? '?refresh=true' : ''}`;
        const res = await fetch(url);
        if (res.ok) {
          data = await res.json();
        }
      } catch {
        // Backend not reachable, fall back
      }

      // 2. Client fallback if backend is offline
      if (!data || !data.success) {
        data = await fallbackClientFetch();
      }

      if (data && (data.imagesByProductId || data.imagesByProductName)) {
        const byId = data.imagesByProductId || {};
        const byName = data.imagesByProductName || {};

        applyDynamicProductImages(byId, byName);
        // Trigger React re-render
        setProductsList([...PRODUCTS]);
        setSyncStatus('synced');
        setLastSyncTime(new Date());
      } else {
        setSyncStatus('synced'); // Default to synced with bundled photoshoot images
      }
    } catch (err) {
      console.warn('[ProductContext] Error syncing images from Google Sheets:', err);
      setSyncStatus('error');
    }
  }, []);

  // Initial synchronization on mount
  useEffect(() => {
    syncImages(false);

    // Auto-sync interval every 60 seconds so spreadsheet edits update live
    const interval = setInterval(() => {
      syncImages(false);
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [syncImages]);

  const refreshSync = useCallback(async () => {
    await syncImages(true);
  }, [syncImages]);

  const getProductById = useCallback(
    (id: string) => productsList.find((p) => p.id === id),
    [productsList]
  );

  const getProductBySlug = useCallback(
    (slug: string) => productsList.find((p) => p.slug === slug),
    [productsList]
  );

  const value = useMemo(
    () => ({
      products: productsList,
      getProductById,
      getProductBySlug,
      syncStatus,
      lastSyncTime,
      refreshSync,
    }),
    [productsList, getProductById, getProductBySlug, syncStatus, lastSyncTime, refreshSync]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    // Graceful fallback if used outside provider
    return {
      products: PRODUCTS,
      getProductById: (id: string) => PRODUCTS.find((p) => p.id === id),
      getProductBySlug: (slug: string) => PRODUCTS.find((p) => p.slug === slug),
      syncStatus: 'synced',
      lastSyncTime: null,
      refreshSync: async () => {},
    };
  }
  return context;
};
