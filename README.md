# 🎵 LRCLIB API Wrapper

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.x-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Simple and powerful API wrapper for LRCLIB lyrics database**

[Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation) • [Examples](#-examples)

</div>

---

## ✨ Features

- 🔐 **API Key Authentication** - Secure access control
- 🎯 **Simple Query Format** - Easy to use search endpoint
- 🚀 **Fast Response** - Optimized performance
- 📝 **Synced Lyrics** - Get timestamped lyrics in LRC format
- ☁️ **Vercel Ready** - Deploy in seconds
- 🛡️ **Error Handling** - Comprehensive error responses

---

## 🚀 Installation

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/lrclib-api.git
cd lrclib-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Run locally**
```bash
npm start
```

4. **Run in development mode**
```bash
npm run dev
```

The server will start on `http://localhost:3000`

---

## 📚 Documentation

### Base URL
```
http://localhost:3000
```
or your deployed URL (e.g., `https://yourdomain.com`)

### Authentication

All API requests require an API key passed as a query parameter.

**Valid API Keys:**
- `apikey1`
- `apikey2`

**Note:** API keys are private and should not be shared publicly.

---

## 🔌 Endpoints

### 1. Search Lyrics

Search for song lyrics by track name and optionally artist name.

**Endpoint:** `GET /api/lr/search`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query (track name or "track - artist") |
| `apikey` | string | Yes | Your API key |

**Query Format:**
- Simple: `q=Bohemian Rhapsody`
- With Artist: `q=Bohemian Rhapsody - Queen`

**Example Request:**
```bash
GET /api/lr/search?q=Bohemian Rhapsody - Queen&apikey=yourapikey
```

**Success Response:**
```json
{
  "success": true,
  "query": "Bohemian Rhapsody - Queen",
  "results": [
    {
      "id": 123,
      "trackName": "Bohemian Rhapsody",
      "artistName": "Queen",
      "albumName": "A Night at the Opera",
      "duration": 354,
      "plainLyrics": "Is this the real life?\nIs this just fantasy?...",
      "syncedLyrics": "[00:00.00]Is this the real life?\n[00:03.50]Is this just fantasy?..."
    }
  ],
  "creator": "RiiCODE"
}
```

**Error Responses:**

**Missing Query Parameter (400):**
```json
{
  "success": false,
  "message": "Query parameter \"q\" is required",
  "creator": "RiiCODE"
}
```

**Missing API Key (401):**
```json
{
  "success": false,
  "message": "API key is required",
  "creator": "RiiCODE"
}
```

**Invalid API Key (403):**
```json
{
  "success": false,
  "message": "Invalid API key",
  "creator": "RiiCODE"
}
```

**Endpoint Not Found (404):**
```json
{
  "success": false,
  "message": "Endpoint not found",
  "creator": "RiiCODE"
}
```

**Server Error (500):**
```json
{
  "success": false,
  "message": "Internal server error",
  "creator": "RiiCODE"
}
```

---

### 2. Health Check

Check if the API is running properly.

**Endpoint:** `GET /health`

**No authentication required**

**Example Request:**
```bash
GET /health
```

**Success Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-29T10:30:00.000Z",
  "creator": "RiiCODE"
}
```

---

## 💡 Examples

### JavaScript (Fetch)

```javascript
const apiKey = 'yourapikey';
const query = 'Shape of You - Ed Sheeran';

fetch(`https://yourdomain.com/api/lr/search?q=${encodeURIComponent(query)}&apikey=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### Node.js (Axios)

```javascript
const axios = require('axios');

const searchLyrics = async (track, artist) => {
  try {
    const query = artist ? `${track} - ${artist}` : track;
    const response = await axios.get('https://yourdomain.com/api/lr/search', {
      params: {
        q: query,
        apikey: 'riicode'
      }
    });
    
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
};

searchLyrics('Perfect', 'Ed Sheeran');
```

### Python (Requests)

```python
import requests

def search_lyrics(track, artist=None, api_key='riicode'):
    query = f"{track} - {artist}" if artist else track
    
    url = 'https://yourdomain.com/api/lr/search'
    params = {
        'q': query,
        'apikey': api_key
    }
    
    response = requests.get(url, params=params)
    return response.json()

result = search_lyrics('Blinding Lights', 'The Weeknd')
print(result)
```

### cURL

```bash
curl -X GET "https://yourdomain.com/api/lr/search?q=Wonderwall%20-%20Oasis&apikey=yourapikey"
```

---

## 🚢 Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Deploy to Production**
```bash
vercel --prod
```

---

## 📁 Project Structure

```
lrclib-api/
├── index.js          # Main application file
├── package.json      # Dependencies and scripts
├── vercel.json       # Vercel configuration
└── README.md         # Documentation
```

---

## 🛠️ Technologies Used

- **Express.js** - Web framework
- **Axios** - HTTP client
- **Node.js** - Runtime environment
- **Vercel** - Deployment platform

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

<div align="center">

### Made with ❤️ by RiiCODE

**© 2025 RiiCODE. All rights reserved.**

[⬆ Back to Top](#-lrclib-api-wrapper)

</div>
