# Sentiment Dashboard | APIVerve API Tutorial

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![React](https://img.shields.io/badge/React-18-61dafb)](src/App.jsx)
[![Chart.js](https://img.shields.io/badge/Chart.js-4-ff6384)](package.json)
[![APIVerve | Sentiment Analysis](https://img.shields.io/badge/APIVerve-Sentiment_Analysis-purple)](https://apiverve.com/marketplace/sentimentanalysis?utm_source=github&utm_medium=tutorial&utm_campaign=sentiment-dashboard-react-tutorial)

A beautiful, interactive sentiment analysis dashboard built with React and Chart.js. Analyze text sentiment in real-time and visualize trends with charts.

![Screenshot](https://raw.githubusercontent.com/apiverve/sentiment-dashboard-react-tutorial/main/screenshot.jpg)

---

### Get Your Free API Key

This tutorial requires an APIVerve API key. **[Sign up free](https://dashboard.apiverve.com?utm_source=github&utm_medium=tutorial&utm_campaign=sentiment-dashboard-react-tutorial)** - no credit card required.

---

## Features

- Real-time sentiment analysis (positive, negative, neutral)
- Interactive doughnut chart visualization
- Analysis history with localStorage persistence
- Quick stats dashboard
- Dark mode UI with modern design
- Copy-to-clipboard functionality
- Responsive layout for all devices

## Quick Start

1. **Clone this repository**
   ```bash
   git clone https://github.com/apiverve/sentiment-dashboard-react-tutorial.git
   cd sentiment-dashboard-react-tutorial
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your API key**

   Open `.env` and add your API key:
   ```
   VITE_API_KEY=your-api-key-here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**

   Navigate to `http://localhost:5173`

## Project Structure

```
sentiment-dashboard-react-tutorial/
├── src/
│   ├── App.jsx          # Main component with API logic
│   ├── App.css          # Styling
│   └── main.jsx         # React entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── .env                 # Environment variables (add your API key)
├── screenshot.jpg       # Preview image
├── LICENSE              # MIT license
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## How It Works

1. **User enters text** - Type or paste text to analyze
2. **API request** - Sends text to APIVerve Sentiment Analysis
3. **Response processing** - Extracts sentiment and score
4. **Visualization** - Updates chart and stats in real-time
5. **History storage** - Saves results to localStorage

### The API Call

```javascript
const response = await fetch(API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  },
  body: JSON.stringify({ text })
});
```

## API Reference

**Endpoint:** `POST https://api.apiverve.com/v1/sentimentanalysis`

**Headers:**

| Header | Value |
|--------|-------|
| `Content-Type` | `application/json` |
| `x-api-key` | Your API key |

**Request Body:**

```json
{
  "text": "I love this product! It's amazing."
}
```

**Example Response:**

```json
{
  "status": "ok",
  "error": null,
  "data": {
    "comparative": 0.25,
    "sentimentText": "positive",
    "sentiment": 3
  }
}
```

## Use Cases

Sentiment analysis is powerful for:

- **Customer Feedback** - Analyze reviews and support tickets
- **Social Media Monitoring** - Track brand sentiment
- **Content Moderation** - Detect negative or toxic content
- **Market Research** - Understand public opinion
- **Survey Analysis** - Process open-ended responses
- **Competitive Analysis** - Compare brand perception

## Customization Ideas

- Add sentiment trends over time with line charts
- Export analysis history to CSV
- Add batch analysis for multiple texts
- Integrate with Twitter/X API for live monitoring
- Add word cloud visualization
- Support multiple languages

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Chart.js** - Data visualization
- **react-chartjs-2** - React wrapper for Chart.js

## Related APIs

Explore more APIs at [APIVerve](https://apiverve.com/marketplace?utm_source=github&utm_medium=tutorial&utm_campaign=sentiment-dashboard-react-tutorial):

- [Text Summarizer](https://apiverve.com/marketplace/textsummarizer?utm_source=github&utm_medium=tutorial&utm_campaign=sentiment-dashboard-react-tutorial) - Summarize long texts
- [Language Detector](https://apiverve.com/marketplace/languagedetector?utm_source=github&utm_medium=tutorial&utm_campaign=sentiment-dashboard-react-tutorial) - Detect text language
- [Keyword Extractor](https://apiverve.com/marketplace/keywordextractor?utm_source=github&utm_medium=tutorial&utm_campaign=sentiment-dashboard-react-tutorial) - Extract keywords from text

## Free Plan Note

This tutorial works with the free APIVerve plan. Some APIs may have:
- **Locked fields**: Premium response fields return `null` on free plans
- **Ignored parameters**: Some optional parameters require a paid plan

The API response includes a `premium` object when limitations apply. [Upgrade anytime](https://dashboard.apiverve.com/plans) to unlock all features.

## License

MIT - see [LICENSE](LICENSE)

## Links

- [Get API Key](https://dashboard.apiverve.com?utm_source=github&utm_medium=tutorial&utm_campaign=sentiment-dashboard-react-tutorial) - Sign up free
- [APIVerve Marketplace](https://apiverve.com/marketplace?utm_source=github&utm_medium=tutorial&utm_campaign=sentiment-dashboard-react-tutorial) - Browse 300+ APIs
- [Sentiment Analysis API](https://apiverve.com/marketplace/sentimentanalysis?utm_source=github&utm_medium=tutorial&utm_campaign=sentiment-dashboard-react-tutorial) - API details
