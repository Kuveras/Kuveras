import fs from 'fs';
import path from 'path';

const SHEET_ID = process.env.GOOGLE_SHEETS_ID || '1AV81VlSFi2z22xGyzZ9x9HLPREip0G9LOBsSIwz4u5g';
const SHEET_GID = process.env.GOOGLE_SHEETS_GID || '0';

// Known alias map for spreadsheet products to KUVERAS product IDs / names
const ALIAS_MAP = {
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
  // Verified aliases and direct ID mapping
  'kuveras-2937': 'kuveras-2937',
  'kuveras-sheet-02': 'kuveras-sheet-02',
  'kuveras-sheet-03': 'kuveras-sheet-03',
  'kuveras-sheet-04': 'kuveras-sheet-04',
  'kuveras-sheet-05': 'kuveras-sheet-05',
  'kuveras-sheet-06': 'kuveras-sheet-06',
  'kuveras-sheet-07': 'kuveras-sheet-07',
  'kuveras-sheet-08': 'kuveras-sheet-08',
  'kuveras-sheet-09': 'kuveras-sheet-09',
  'kuveras-sheet-10': 'kuveras-sheet-10',
  'kuveras-sheet-11': 'kuveras-sheet-11',
  'kuveras-sheet-12': 'kuveras-sheet-12',
  'rosé elegance cz set': 'kuveras-2937',
  'rose elegance cz set': 'kuveras-2937'
};

// In-memory cache
let cachedData = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 45 * 1000; // 45 seconds

// Helper to extract Drive folder ID
function extractDriveFolderId(url) {
  if (!url) return null;
  const match = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

// Helper to extract Drive file ID
function extractDriveFileId(url) {
  if (!url) return null;
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];
  return null;
}

// Fetch images inside a Google Drive folder
async function fetchDriveFolderImages(folderId) {
  try {
    const url = `https://drive.google.com/embeddedfolderview?id=${folderId}#list`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) {
      console.warn(`[SheetsSync] Failed to fetch folder ${folderId}, status: ${res.status}`);
      return [];
    }
    const html = await res.text();
    const entries = [];
    const entryRegex = /id="entry-([a-zA-Z0-9_-]+)"[\s\S]*?<div class="flip-entry-title">([^<]+)<\/div>/g;
    let match;
    while ((match = entryRegex.exec(html)) !== null) {
      const fileId = match[1];
      const fileName = match[2].trim();
      entries.push({
        fileId,
        fileName,
        // High resolution direct Google CDN URL
        url: `https://lh3.googleusercontent.com/d/${fileId}`,
        // Thumbnail URL with auto-scaling
        thumbnailUrl: `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`
      });
    }
    return entries;
  } catch (error) {
    console.error(`[SheetsSync] Error fetching folder images for ${folderId}:`, error.message);
    return [];
  }
}

// Parse CSV with quotes handling
function parseCSV(text) {
  const rows = [];
  let currentRow = [];
  let currentCell = '';
  let insideQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentRow.push(currentCell.trim());
      if (currentRow.some((c) => c.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }
  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    rows.push(currentRow);
  }
  return rows;
}

/**
 * Fetch and parse data from the Google Spreadsheet
 */
export async function fetchGoogleSheetData(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && cachedData && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedData;
  }

  console.log(`[SheetsSync] Fetching Google Sheet: ${SHEET_ID} (forceRefresh=${forceRefresh})...`);

  // Fetch CSV export
  const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;
  const response = await fetch(csvUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });

  if (!response.ok) {
    throw new Error(`Google Sheets fetch failed with HTTP ${response.status}: ${response.statusText}`);
  }

  const csvText = await response.text();
  const rows = parseCSV(csvText);
  if (rows.length < 2) {
    throw new Error('Google Sheet returned empty or header-only data');
  }

  const rawHeaders = rows[0].map((h) => h.toUpperCase().trim());
  const photoColIdx = rawHeaders.findIndex((h) => h.includes('PHOTO') || h.includes('IMAGE'));
  const nameColIdx = rawHeaders.findIndex((h) => h.includes('NAME') || h.includes('PRODUCT') || h.includes('TITLE'));
  const idColIdx = rawHeaders.findIndex((h) => h === 'PRODUCT ID' || h === 'ID' || h === 'SKU');
  const priceColIdx = rawHeaders.findIndex((h) => h.includes('PRICE'));
  const shortDescColIdx = rawHeaders.findIndex((h) => h.includes('SHORT'));
  const longDescColIdx = rawHeaders.findIndex((h) => h.includes('LONG') || h.includes('DESCRIPTION'));

  const parsedItems = [];
  const imagesByProductId = {};
  const imagesByProductName = {};

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const photoUploads = photoColIdx >= 0 ? row[photoColIdx] || '' : '';
    const productName = nameColIdx >= 0 ? row[nameColIdx] || '' : '';
    const productId = idColIdx >= 0 ? row[idColIdx] || '' : '';
    const priceStr = priceColIdx >= 0 ? row[priceColIdx] || '' : '';
    const shortDesc = shortDescColIdx >= 0 ? row[shortDescColIdx] || '' : '';
    const longDesc = longDescColIdx >= 0 ? row[longDescColIdx] || '' : '';

    if (!photoUploads && !productName) continue;

    let imageUrls = [];

    // Check if it's a Google Drive folder link
    const folderId = extractDriveFolderId(photoUploads);
    if (folderId) {
      const folderFiles = await fetchDriveFolderImages(folderId);
      imageUrls = folderFiles.map((f) => f.thumbnailUrl);
    } else {
      // Check if it's a single Google Drive file link
      const singleFileId = extractDriveFileId(photoUploads);
      if (singleFileId) {
        imageUrls = [`https://drive.google.com/thumbnail?id=${singleFileId}&sz=w1600`];
      } else if (photoUploads) {
        // Direct URLs (split by newline, comma, or semicolon)
        const parts = photoUploads.split(/[\n,;]+/).map((u) => u.trim()).filter((u) => u.startsWith('http'));
        imageUrls = parts.length > 0 ? parts : [photoUploads.trim()];
      }
    }

    if (imageUrls.length === 0) {
      continue;
    }

    const cleanName = productName.trim();
    const normalizedName = cleanName.toLowerCase();

    // Determine target product ID
    let targetId = productId.trim();
    if (!targetId && ALIAS_MAP[normalizedName]) {
      targetId = ALIAS_MAP[normalizedName];
    }

    if (targetId) {
      imagesByProductId[targetId] = imageUrls;
    }
    if (normalizedName) {
      imagesByProductName[normalizedName] = imageUrls;
    }

    parsedItems.push({
      rowIndex: i,
      productName: cleanName,
      productId: targetId || productId || null,
      price: priceStr,
      shortDescription: shortDesc,
      longDescription: longDesc,
      photoSource: photoUploads,
      images: imageUrls,
    });
  }

  cachedData = {
    success: true,
    sheetId: SHEET_ID,
    timestamp: new Date().toISOString(),
    totalRows: parsedItems.length,
    items: parsedItems,
    imagesByProductId,
    imagesByProductName,
  };

  lastFetchTime = now;
  console.log(`[SheetsSync] Successfully parsed ${parsedItems.length} products with ${Object.keys(imagesByProductId).length} ID mappings.`);
  return cachedData;
}

/**
 * Invalidate cache and trigger fresh synchronization
 */
export async function invalidateAndRefresh() {
  return await fetchGoogleSheetData(true);
}
