/*
SPOTIFY LYRICS API
USING LRCLIB 

CREATOR : RIICODE
DATE : 29/12/25

ENJOY TO USE

*/
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const VALID_API_KEYS = ['apikey1', 'apikey2'];

const validateApiKey = (req, res, next) => {
  const apiKey = req.query.apikey;

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'API key is required',
      creator: 'RiiCODE'
    });
  }

  if (!VALID_API_KEYS.includes(apiKey)) {
    return res.status(403).json({
      success: false,
      message: 'Invalid API key',
      creator: 'RiiCODE'
    });
  }

  next();
};

app.get('/api/lr/search', validateApiKey, async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Query parameter "q" is required',
        creator: 'RiiCODE'
      });
    }

    const parts = query.split('-').map(p => p.trim());
    const trackName = parts[0];
    const artistName = parts[1] || '';

    const lrclibUrl = 'https://lrclib.net/api/search';
    const params = {
      track_name: trackName
    };

    if (artistName) {
      params.artist_name = artistName;
    }

    const response = await axios.get(lrclibUrl, { params });

    res.json({
      success: true,
      creator: 'RiiCODE',
      query: query,
      results: response.data
    });

  } catch (error) {
    console.error('Error:', error.message);

    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: 'Error from LRCLIB API',
        error: error.response.data,
        creator: 'RiiCODE'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      creator: 'RiiCODE'
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    creator: 'RiiCODE'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    creator: 'RiiCODE'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/api/lr/search?q=Bohemian Rhapsody - Queen&apikey=riicode`);
});

module.exports = app;
