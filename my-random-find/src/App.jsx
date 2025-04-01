import "./App.css";

import React, { useState, useEffect } from "react";

function App() {
  // State for all characters fetched from the API.
  const [allChars, setAllChars] = useState([]);
  // The currently displayed character.
  const [currentChar, setCurrentChar] = useState(null);
  // Ban list: an array of objects { attr: string, val: string }
  const [banList, setBanList] = useState([]);
  // List of discovered characters (history).
  const [discoveredList, setDiscoveredList] = useState([]);
  // Loading state for fetch requests.
  const [loading, setLoading] = useState(false);

  // Log ban list changes (optional)
  useEffect(() => {
    console.log("Current Ban List:", banList);
  }, [banList]);

  // Fetch the list of all characters on mount.
  useEffect(() => {
    async function fetchCharacters() {
      let results = [];
      try {
        // Fetch first 3 pages (~60 characters)
        for (let page = 1; page <= 3; page++) {
          const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
          const data = await res.json();
          if (data.results) {
            results = results.concat(data.results);
          }
        }
        setAllChars(results);
      } catch (err) {
        console.error("Error fetching characters:", err);
      }
    }
    fetchCharacters();
  }, []);

  // Check if a character should be banned based on banList.
  function isBanned(character) {
    return banList.some((ban) => {
      if (ban.attr === "location") {
        return character.location?.name === ban.val;
      } else {
        return character[ban.attr] === ban.val;
      }
    });
  }

  // Handle clicking the "Discover" button.
  async function handleDiscover() {
    if (!allChars.length) {
      alert("Characters are still loading or none fetched yet!");
      return;
    }

    setLoading(true);
    let attempts = 0;
    let chosen = null;

    // Attempt up to 30 times to pick a character not matching the ban list.
    while (attempts < 30) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      const candidate = allChars[randomIndex];
      if (!isBanned(candidate)) {
        chosen = candidate;
        break;
      }
      attempts++;
    }

    if (!chosen) {
      alert("All possible characters seem to be banned. Clear ban list or extend dataset!");
      setLoading(false);
      return;
    }

    setCurrentChar(chosen);
    // Also add to discovered history (prepend to show most recent first)
    setDiscoveredList([chosen, ...discoveredList]);
    setLoading(false);
  }

  // Toggle ban/unban for a given attribute and value.
  function toggleBan(attr, val) {
    const isAlreadyBanned = banList.some((item) => item.attr === attr && item.val === val);
    if (isAlreadyBanned) {
      setBanList(banList.filter((item) => !(item.attr === attr && item.val === val)));
    } else {
      setBanList([...banList, { attr, val }]);
    }
  }

  // Render the ban list as clickable chips.
  function renderBanList() {
    if (banList.length === 0) {
      return <p>No banned attributes yet.</p>;
    }
    return banList.map((ban, index) => (
      <span
        key={index}
        className="ban-chip"
        onClick={() => toggleBan(ban.attr, ban.val)}
      >
        {ban.attr} = {ban.val} &times;
      </span>
    ));
  }

  // Render current character details with buttons for banning attributes.
  function renderCurrentChar() {
    if (!currentChar) return null;
    return (
      <div style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem" }}>
        <img
          src={currentChar.image}
          alt={currentChar.name}
          style={{ maxWidth: "200px", marginBottom: "1rem" }}
        />
        <h2>{currentChar.name}</h2>

        {/* species button */}
        <button
          onClick={() => toggleBan("species", currentChar.species)}
          style={{ marginRight: "0.5rem" }}
        >
          Ban species: {currentChar.species}
        </button>

        {/* status button */}
        <button
          onClick={() => toggleBan("status", currentChar.status)}
          style={{ marginRight: "0.5rem" }}
        >
          Ban status: {currentChar.status}
        </button>

        {/* location button - note we store location name in ban */}
        <button
          onClick={() => toggleBan("location", currentChar.location?.name)}
        >
          Ban location: {currentChar.location?.name}
        </button>
      </div>
    );
  }


  // Render the list of discovered characters.
  function renderDiscoveredHistory() {
    if (discoveredList.length === 0) {
      return <p>No characters discovered yet.</p>;
    }
    return (
      <div className="history-container">
        <h3>Discovery History</h3>
        {discoveredList.map((char, index) => (
          <div key={index} className="history-item">
            <img src={char.image} alt={char.name} className="history-image" />
            <div className="history-details">
              <p className="name">{char.name}</p>
              <p>{char.species} | {char.status}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Rick and Morty Discovery</h1>
      <p>Explore random characters. Click on attribute buttons to ban/unban them!</p>
      <button className="discover-button" onClick={handleDiscover} disabled={loading || allChars.length === 0}>
        {loading ? "Loading..." : "Discover a Character"}
      </button>
      <h3>Ban List:</h3>
      <div className="ban-list">{renderBanList()}</div>
      {renderCurrentChar()}
      <hr />
      {renderDiscoveredHistory()}
    </div>
  );
}

export default App;
