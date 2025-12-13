import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// API Configuration
// Create a .env file with: VITE_API_KEY=your-api-key-here
// Get a free key at: https://dashboard.apiverve.com
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = 'https://api.apiverve.com/v1/sentimentanalysis';

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sentimentHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sentimentHistory', JSON.stringify(history));
  }, [history]);

  // Analyze sentiment
  const analyzeSentiment = async () => {
    if (!text.trim()) return;

    if (!API_KEY) {
      setError('Add your API key to .env file (VITE_API_KEY=your-key)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({ text })
      });

      const data = await response.json();

      if (data.status === 'ok' && data.data) {
        const result = {
          id: Date.now(),
          text: text.slice(0, 100) + (text.length > 100 ? '...' : ''),
          sentiment: data.data.sentimentText || data.data.sentiment,
          score: data.data.comparative || 0,
          timestamp: new Date().toLocaleString()
        };

        setHistory(prev => [result, ...prev.slice(0, 49)]); // Keep last 50
        setText('');
      } else {
        setError(data.error || 'Failed to analyze sentiment');
      }
    } catch (err) {
      setError('API request failed. Check your API key.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate chart data from history
  const getChartData = () => {
    const counts = { positive: 0, negative: 0, neutral: 0 };

    history.forEach(item => {
      const sentiment = item.sentiment?.toLowerCase() || 'neutral';
      if (sentiment.includes('positive')) counts.positive++;
      else if (sentiment.includes('negative')) counts.negative++;
      else counts.neutral++;
    });

    return {
      labels: ['Positive', 'Negative', 'Neutral'],
      datasets: [{
        data: [counts.positive, counts.negative, counts.neutral],
        backgroundColor: ['#10b981', '#ef4444', '#6b7280'],
        borderWidth: 0
      }]
    };
  };

  // Get sentiment color
  const getSentimentColor = (sentiment) => {
    const s = sentiment?.toLowerCase() || '';
    if (s.includes('positive')) return '#10b981';
    if (s.includes('negative')) return '#ef4444';
    return '#6b7280';
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('sentimentHistory');
  };

  return (
    <div className="app">
      <header>
        <h1>Sentiment Dashboard</h1>
        <p className="subtitle">Analyze text sentiment with AI-powered insights</p>
      </header>

      <main>
        {/* Input Section */}
        <section className="input-section">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to analyze sentiment..."
            rows={4}
          />
          <button
            onClick={analyzeSentiment}
            disabled={loading || !text.trim()}
            className="analyze-btn"
          >
            {loading ? 'Analyzing...' : 'Analyze Sentiment'}
          </button>
          {error && <div className="error">{error}</div>}
        </section>

        {/* Dashboard Grid */}
        <div className="dashboard">
          {/* Chart Section */}
          <section className="chart-section">
            <h2>Sentiment Overview</h2>
            {history.length > 0 ? (
              <div className="chart-container">
                <Doughnut
                  data={getChartData()}
                  options={{
                    plugins: {
                      legend: { position: 'bottom' }
                    },
                    cutout: '60%'
                  }}
                />
              </div>
            ) : (
              <div className="empty-chart">
                <p>No data yet</p>
                <span>Analyze some text to see the chart</span>
              </div>
            )}
          </section>

          {/* Stats Section */}
          <section className="stats-section">
            <h2>Quick Stats</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-value">{history.length}</span>
                <span className="stat-label">Total Analyzed</span>
              </div>
              <div className="stat-card positive">
                <span className="stat-value">
                  {history.filter(h => h.sentiment?.toLowerCase().includes('positive')).length}
                </span>
                <span className="stat-label">Positive</span>
              </div>
              <div className="stat-card negative">
                <span className="stat-value">
                  {history.filter(h => h.sentiment?.toLowerCase().includes('negative')).length}
                </span>
                <span className="stat-label">Negative</span>
              </div>
              <div className="stat-card neutral">
                <span className="stat-value">
                  {history.filter(h => {
                    const s = h.sentiment?.toLowerCase() || '';
                    return !s.includes('positive') && !s.includes('negative');
                  }).length}
                </span>
                <span className="stat-label">Neutral</span>
              </div>
            </div>
          </section>
        </div>

        {/* History Section */}
        <section className="history-section">
          <div className="history-header">
            <h2>Analysis History</h2>
            {history.length > 0 && (
              <button onClick={clearHistory} className="clear-btn">
                Clear All
              </button>
            )}
          </div>

          {history.length > 0 ? (
            <div className="history-list">
              {history.map(item => (
                <div key={item.id} className="history-item">
                  <div
                    className="sentiment-badge"
                    style={{ backgroundColor: getSentimentColor(item.sentiment) }}
                  >
                    {item.sentiment}
                  </div>
                  <p className="history-text">{item.text}</p>
                  <span className="history-time">{item.timestamp}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-history">
              <p>No analysis history yet</p>
              <span>Start by analyzing some text above</span>
            </div>
          )}
        </section>
      </main>

      <footer>
        <p>
          Powered by{' '}
          <a href="https://apiverve.com/marketplace/sentimentanalysis?utm_source=github&utm_medium=tutorial&utm_campaign=sentiment-dashboard-react-tutorial"
             target="_blank"
             rel="noopener noreferrer">
            APIVerve Sentiment Analysis API
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
