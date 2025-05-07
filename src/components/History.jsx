import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const History = () => {
  const [typingHistory, setTypingHistory] = useState([]);
  const [timeRange, setTimeRange] = useState('all'); // 'all', 'week', 'month'

  useEffect(() => {
    // Get typing history from localStorage
    const history = JSON.parse(localStorage.getItem('typingHistory')) || [];
    
    // If no history exists, add some sample data for testing
    if (history.length === 0) {
      const sampleData = generateSampleData();
      localStorage.setItem('typingHistory', JSON.stringify(sampleData));
      setTypingHistory(sampleData);
    } else {
      setTypingHistory(history);
    }
  }, []);

  // Function to generate sample data for testing
  const generateSampleData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 0; i < 10; i++) {
      const date = new Date(now - i * 24 * 60 * 60 * 1000); // One test per day
      data.push({
        wpm: Math.floor(Math.random() * 40) + 40, // Random WPM between 40-80
        accuracy: Math.floor(Math.random() * 20) + 80, // Random accuracy between 80-100
        timeElapsed: 60,
        wordsTyped: Math.floor(Math.random() * 100) + 50, // Random words between 50-150
        timestamp: date.toISOString()
      });
    }
    
    return data;
  };

  const filterHistoryByTimeRange = (history) => {
    const now = new Date();
    switch (timeRange) {
      case 'week':
        return history.filter(test => 
          new Date(test.timestamp) > new Date(now - 7 * 24 * 60 * 60 * 1000)
        );
      case 'month':
        return history.filter(test => 
          new Date(test.timestamp) > new Date(now - 30 * 24 * 60 * 60 * 1000)
        );
      default:
        return history;
    }
  };

  const filteredHistory = filterHistoryByTimeRange(typingHistory);

  const progressChartData = {
    labels: filteredHistory.map((_, index) => `Test ${index + 1}`),
    datasets: [
      {
        label: 'WPM',
        data: filteredHistory.map(test => test.wpm),
        borderColor: '#6a11cb',
        backgroundColor: 'rgba(106, 17, 203, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Accuracy',
        data: filteredHistory.map(test => test.accuracy),
        borderColor: '#2575fc',
        backgroundColor: 'rgba(37, 117, 252, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const distributionChartData = {
    labels: ['0-20', '21-40', '41-60', '61-80', '81-100', '100+'],
    datasets: [
      {
        label: 'WPM Distribution',
        data: [
          filteredHistory.filter(test => test.wpm <= 20).length,
          filteredHistory.filter(test => test.wpm > 20 && test.wpm <= 40).length,
          filteredHistory.filter(test => test.wpm > 40 && test.wpm <= 60).length,
          filteredHistory.filter(test => test.wpm > 60 && test.wpm <= 80).length,
          filteredHistory.filter(test => test.wpm > 80 && test.wpm <= 100).length,
          filteredHistory.filter(test => test.wpm > 100).length
        ],
        backgroundColor: 'rgba(106, 17, 203, 0.6)',
        borderColor: '#6a11cb',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Typing Progress',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Score'
        }
      }
    }
  };

  const distributionOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'WPM Distribution',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Tests'
        }
      }
    }
  };

  const calculateStats = () => {
    if (filteredHistory.length === 0) return null;
    
    const wpmValues = filteredHistory.map(test => test.wpm);
    const accuracyValues = filteredHistory.map(test => test.accuracy);
    
    return {
      bestWpm: Math.max(...wpmValues),
      avgWpm: Math.round(wpmValues.reduce((a, b) => a + b, 0) / wpmValues.length),
      bestAccuracy: Math.max(...accuracyValues),
      avgAccuracy: Math.round(accuracyValues.reduce((a, b) => a + b, 0) / accuracyValues.length),
      totalTests: filteredHistory.length,
      totalWords: filteredHistory.reduce((acc, test) => acc + test.wordsTyped, 0)
    };
  };

  const stats = calculateStats();

  return (
    <div className="history-container">
      <h2>Typing History</h2>
      <div className="time-range-selector">
        <button 
          className={timeRange === 'all' ? 'active' : ''} 
          onClick={() => setTimeRange('all')}
        >
          All Time
        </button>
        <button 
          className={timeRange === 'month' ? 'active' : ''} 
          onClick={() => setTimeRange('month')}
        >
          Last Month
        </button>
        <button 
          className={timeRange === 'week' ? 'active' : ''} 
          onClick={() => setTimeRange('week')}
        >
          Last Week
        </button>
      </div>
      
      {filteredHistory.length > 0 ? (
        <div className="chart-container">
          <div className="chart-grid">
            <div className="chart-card">
              <Line data={progressChartData} options={chartOptions} />
            </div>
            <div className="chart-card">
              <Bar data={distributionChartData} options={distributionOptions} />
            </div>
          </div>

          <div className="history-stats">
            <div className="stat-card">
              <h3>Best WPM</h3>
              <p>{stats.bestWpm}</p>
            </div>
            <div className="stat-card">
              <h3>Average WPM</h3>
              <p>{stats.avgWpm}</p>
            </div>
            <div className="stat-card">
              <h3>Best Accuracy</h3>
              <p>{stats.bestAccuracy}%</p>
            </div>
            <div className="stat-card">
              <h3>Average Accuracy</h3>
              <p>{stats.avgAccuracy}%</p>
            </div>
            <div className="stat-card">
              <h3>Tests Completed</h3>
              <p>{stats.totalTests}</p>
            </div>
            <div className="stat-card">
              <h3>Total Words</h3>
              <p>{stats.totalWords}</p>
            </div>
          </div>

          <div className="recent-tests">
            <h3>Recent Tests</h3>
            <div className="test-list">
              {filteredHistory.slice(-5).reverse().map((test, index) => (
                <div key={index} className="test-item">
                  <div className="test-date">
                    {new Date(test.timestamp).toLocaleDateString()} at{' '}
                    {new Date(test.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="test-details">
                    <span className="wpm">{test.wpm} WPM</span>
                    <span className="accuracy">{test.accuracy}%</span>
                    <span className="words">{test.wordsTyped} words</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-history">
          <p>No typing history available for the selected time range. Complete some tests to see your progress!</p>
        </div>
      )}
    </div>
  );
};

export default History; 