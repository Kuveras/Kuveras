import express from 'express';
import { fetchGoogleSheetData, invalidateAndRefresh } from '../services/sheetsService.js';

const router = express.Router();

// @desc    Get dynamic Google Sheet product images & mapping
// @route   GET /api/sheets/images
// @access  Public
router.get('/images', async (req, res) => {
  try {
    const forceRefresh = req.query.refresh === 'true' || req.query.refresh === '1';
    const data = forceRefresh ? await invalidateAndRefresh() : await fetchGoogleSheetData();
    res.json(data);
  } catch (error) {
    console.error('[SheetsAPI] Error fetching sheet images:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to synchronize with Google Sheets',
      error: error.message
    });
  }
});

// @desc    Force refresh Google Sheet cache
// @route   POST /api/sheets/refresh
// @access  Public
router.post('/refresh', async (req, res) => {
  try {
    const data = await invalidateAndRefresh();
    res.json({
      success: true,
      message: 'Google Sheets cache refreshed successfully',
      timestamp: data.timestamp,
      totalRows: data.totalRows,
      data
    });
  } catch (error) {
    console.error('[SheetsAPI] Error refreshing sheet cache:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to refresh Google Sheets cache',
      error: error.message
    });
  }
});

export default router;
