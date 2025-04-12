import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

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

  const totalBreweries = breweries.length;
  const uniqueCities = new Set(breweries.map(b => b.city)).size;

  const typeCounts = breweries.reduce((acc, b) => {
    acc[b.brewery_type] = (acc[b.brewery_type] || 0) + 1;
    return acc;
  }, {});

  const radarData = Object.entries(typeCounts).map(([type, count]) => ({ type, value: count }));
  const maxValue = Math.max(...radarData.map(d => d.value));
  const normalizedRadarData = radarData.map(d => ({ type: d.type, intensity: Math.round((d.value / maxValue) * 100) }));

  const yearData = [
    { year: '2016', count: 5 },
    { year: '2017', count: 8 },
    { year: '2018', count: 15 },
    { year: '2019', count: 22 },
    { year: '2020', count: 10 },
    { year: '2021', count: 13 },
  ];

  const filtered = breweries.filter(b =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (typeFilter === 'All' || b.brewery_type === typeFilter)
  );

  return (
    <div>
      <h1>Brewery Explorer 🍺</h1>

      <div className="search-bar">
        <input
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="All">All Types</option>
          <option value="micro">Micro</option>
          <option value="nano">Nano</option>
          <option value="regional">Regional</option>
          <option value="brewpub">Brewpub</option>
          <option value="large">Large</option>
        </select>
      </div>

      <div className="summary">
        <strong>Total Breweries:</strong> {totalBreweries} <br />
        <strong>Unique Cities:</strong> {uniqueCities}
      </div>

      <div className="chart-container">
        <h3>Breweries Opened by Year</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={yearData}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#82ca9d" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3>Normalized Brewery Type Intensity</h3>
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart outerRadius={120} data={normalizedRadarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="type" />
            <PolarRadiusAxis />
            <Radar name="Intensity" dataKey="intensity" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="card-grid">
        {filtered.map(b => (
          <div key={b.id} className="card">
            <Link to={`/brewery/${b.id}`}>
              <h2>{b.name}</h2>
            </Link>
            <p>Type: {b.brewery_type}</p>
            <p>City: {b.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BreweryDashboard;
