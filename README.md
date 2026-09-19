# Sentiment Dashboard | APIVerve Template

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB)](package.json)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF)](package.json)
[![APIVerve | Sentiment Analysis](https://img.shields.io/badge/APIVerve-Sentiment_Analysis-purple)](https://apiverve.com/marketplace/sentimentanalysis?utm_source=github&utm_medium=template&utm_campaign=sentiment-dashboard-react-tutorial)

Paste reviews, support tickets or messages and see whether each one reads positive, negative or neutral. The dashboard keeps a running chart and history in your browser.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fapiverve%2Fsentiment-dashboard-react-tutorial&project-name=sentiment-dashboard&repository-name=sentiment-dashboard&env=APIVERVE_API_KEY&envDescription=Your%20APIVerve%20API%20key.%20Free%20to%20create%2C%20no%20card%20needed.&envLink=https%3A%2F%2Fdashboard.apiverve.com%2Fsignup%3Fapi%3Dsentimentanalysis%26utm_source%3Dvercel%26utm_medium%3Dtemplate%26utm_campaign%3Dsentiment-dashboard-react-tutorial)

![Sentiment Dashboard charting five analyzed reviews](https://raw.githubusercontent.com/apiverve/sentiment-dashboard-react-tutorial/main/screenshot.png)

---

### Get your free API key

This template needs an APIVerve API key. **[Sign up free](https://dashboard.apiverve.com/signup?api=sentimentanalysis&utm_source=github&utm_medium=template&utm_campaign=sentiment-dashboard-react-tutorial)**, no credit card required.

---

## Deploy in one click

Click **Deploy with Vercel** above. Vercel copies this repo to your GitHub account, asks for your `APIVERVE_API_KEY`, and gives you a live URL about a minute later.

## Run it locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/apiverve/sentiment-dashboard-react-tutorial.git
   cd sentiment-dashboard-react-tutorial
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your API key**
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and set `APIVERVE_API_KEY`.

4. **Start it**
   ```bash
   npm run dev
   ```

5. **Open** `http://localhost:5173`

`npm run dev` serves the page and runs the `api/` functions together, the same way Vercel does, so you don't need the Vercel CLI.

## How it works

1. The page (`src/App.jsx`) calls `POST /api/sentiment`.
2. `api/sentiment.js` checks the input, then calls Sentiment Analysis. Your API key stays on the server and never reaches the browser.
3. The page shows the result.

```
├── api/sentiment.js     # Vercel function: checks input, calls APIVerve with your key
├── lib/apiverve.js      # Shared by api/: key check, rate limit, the APIVerve call
├── lib/dev-api.js       # Runs api/ locally under `npm run dev` (Vercel ignores it)
├── src/App.jsx          # The page (React)
├── vite.config.js
├── .env.example         # Copy to .env and add your key
└── package.json
```

### The API call

```javascript
const res = await fetch('https://api.apiverve.com/v1/sentimentanalysis', {
  method: 'POST',
  headers: { 'x-api-key': process.env.APIVERVE_API_KEY, 'Content-Type': 'application/json' },
  body: JSON.stringify({ text })
});
const { data } = await res.json();
// data.sentimentText → "very positive", data.comparative, data.isNegative
```

## Before you share your URL

Once deployed, anyone who finds your URL can use it on your API key. Each visitor can make 10 requests a minute, which is fine for a demo. The limit is kept in memory, so it isn't shared between serverless instances. For production:

- Put the page behind your own sign-in, or
- Move the limit to a shared store such as [Upstash Redis](https://upstash.com/), or
- Call the route only from your own backend.

## Ideas to extend it

- Score each new review or ticket as it comes in, and flag the negative ones
- Store results in a database instead of the browser, to chart trends over time
- Add [Keyword Extractor](https://apiverve.com/marketplace/keywordextractor?utm_source=github&utm_medium=template&utm_campaign=sentiment-dashboard-react-tutorial) to see what the negative messages are about

## API reference

- [Sentiment Analysis](https://apiverve.com/marketplace/sentimentanalysis?utm_source=github&utm_medium=template&utm_campaign=sentiment-dashboard-react-tutorial): `POST https://api.apiverve.com/v1/sentimentanalysis`
- [Full documentation](https://docs.apiverve.com?utm_source=github&utm_medium=template&utm_campaign=sentiment-dashboard-react-tutorial)

## Tech stack

- **React 18** and **Vite 5** for the page
- **Vercel Functions** in `api/` for the server side (Node.js 20+)
- Deploys to Vercel as-is: Vite builds the page, and each file in `api/` becomes a function

## License

MIT. See [LICENSE](LICENSE).
