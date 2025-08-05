

import axios from 'axios';

const statusDiv = document.getElementById('status');

const fetchData = async () => {
  if (statusDiv) statusDiv.textContent = 'Loading...';
  try {
    // Use CoinGecko v3 API for markets data
    const result = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    const cryptos = result.data;
    renderTable(cryptos);
    if (statusDiv) statusDiv.textContent = '';
  } catch (error) {
    if (statusDiv) statusDiv.textContent = 'Error fetching data.';
    console.error('Error fetching data:', error);
  }
};

function renderTable(cryptos) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  if (!cryptos || cryptos.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="5">No data available</td>';
    tbody.appendChild(tr);
    return;
  }
  cryptos.forEach((crypto, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${crypto.name}</td>
      <td>${crypto.symbol.toUpperCase()}</td>
      <td>$${crypto.current_price ? Number(crypto.current_price).toLocaleString() : 'N/A'}</td>
      <td class="${crypto.price_change_percentage_24h > 0 ? 'positive' : 'negative'}">${crypto.price_change_percentage_24h ? crypto.price_change_percentage_24h.toFixed(2) : '0.00'}%</td>
    `;
    tbody.appendChild(tr);
  });
}

fetchData();