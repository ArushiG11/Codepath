import React, { useEffect, useState } from 'react';

function BreweryDashboard() {
  const [breweries, setBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  useEffect(() => {
    async function fetchBreweries() {
      const response = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=50');
      const data = await response.json();
      setBreweries(data);
    }
    fetchBreweries();
  }, []);

  // Summary Stats
  const totalBreweries = breweries.length;
  const uniqueCities = new Set(breweries.map(b => b.city)).size;
  const typeCounts = breweries.reduce((acc, b) => {
    acc[b.brewery_type] = (acc[b.brewery_type] || 0) + 1;
    return acc;
  }, {});

  // Filters
  const filtered = breweries.filter(b =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (typeFilter === 'All' || b.brewery_type === typeFilter)
  );

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Brewery Explorer 🍺</h1>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <input
          placeholder='Search by name'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value='All'>All Types</option>
          <option value='micro'>Micro</option>
          <option value='nano'>Nano</option>
          <option value='regional'>Regional</option>
          <option value='brewpub'>Brewpub</option>
          <option value='large'>Large</option>
        </select>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <strong>Total Breweries:</strong> {totalBreweries} <br />
        <strong>Unique Cities:</strong> {uniqueCities} <br />
        <strong>Type Counts:</strong> {JSON.stringify(typeCounts)}
      </div>

      <div style={{ marginTop: '2rem' }}>
        {filtered.map(b => (
          <div key={b.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h2>{b.name}</h2>
            <p>Type: {b.brewery_type}</p>
            <p>City: {b.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BreweryDashboard;
