import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function BreweryDetail() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
      const data = await response.json();
      setBrewery(data);
    }
    fetchDetail();
  }, [id]);

  if (!brewery) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/">&larr; Back to Dashboard</Link>
      <h1>{brewery.name}</h1>
      <p><strong>Type:</strong> {brewery.brewery_type}</p>
      <p><strong>City:</strong> {brewery.city}</p>
      <p><strong>State:</strong> {brewery.state}</p>
      <p><strong>Phone:</strong> {brewery.phone}</p>
      <p><strong>Address:</strong> {brewery.street}, {brewery.city}, {brewery.state} {brewery.postal_code}</p>
      <p><strong>Website:</strong> <a href={brewery.website_url}>{brewery.website_url}</a></p>
    </div>
  );
}

export default BreweryDetail;
