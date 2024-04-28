import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ApexCharts from 'apexcharts';
import 'apexcharts/dist/apexcharts.css';
import styles from './CandlestickChart.module.css';
import UserStocks from './UserStocks';

const fetchData = async (stockSymbol) => {
  const response = await axios.get(`https://mcsbt-integration1.ew.r.appspot.com/stock/${stockSymbol.toUpperCase()}`);
  return response.data;
};

const CandlestickChart = () => {
  const [data, setData] = useState(null);
  const [selectedStock, setSelectedStock] = useState('msft');
  const chartRef = useRef(null);

  useEffect(() => {
    fetchData(selectedStock).then(setData);
  }, [selectedStock]);

  useEffect(() => {
    if (data && chartRef.current) {
      const candlesticks = Object.entries(data["Time Series (Daily)"] || {}).map(([timestamp, values]) => ({
        x: new Date(timestamp),
        y: [parseFloat(values["1. open"]), parseFloat(values["2. high"]), parseFloat(values["3. low"]), parseFloat(values["4. close"])]
      }));

      const options = {
        series: [{
          name: selectedStock.toUpperCase(),
          type: 'candlestick',
          data: candlesticks
        }],
        chart: {
          type: 'candlestick',
          height: 350
        },
        title: {
          text: `${selectedStock.toUpperCase()} Daily Prices`,
          align: 'left'
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          title: {
            text: 'Price ($)'
          }
        }
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => chart.destroy();
    }
  }, [data]);

  const handleStockSelection = (event) => {
    setSelectedStock(event.target.value);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Wealthwise</h1>
      </header>
      <UserStocks userId="user1" /> {/* Add the UserStocks component here */}
      <select id="stock-select" name="stock" value={selectedStock} onChange={handleStockSelection}>
        <option value="AMD">AMD</option>
        <option value="TSLA">Tesla</option>
        <option value="HOOD">Robinhood</option>
        <option value="DIS">Disney</option>
        <option value="PEP">PepsiCo</option>
        <option value="UBER">Uber</option>
      </select>
      <div ref={chartRef}></div>
      <div className={styles.footer}>
        <p>WealthWise © 2024</p>
      </div>
    </div>
  );
};

export default CandlestickChart;
