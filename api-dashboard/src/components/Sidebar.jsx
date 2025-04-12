import React from 'react';

function Sidebar() {
  return (
    <div style={{ width: '220px', padding: '1rem', background: '#f4f4f4', height: '100vh' }}>
      <h2>Dashboard Menu</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>Explore Breweries</li>
        <li>Statistics</li>
      </ul>
    </div>
  );
}

export default Sidebar;
