import React from 'react';
import '../styles/FoodCart.css';
const FoodCart = (props) => {
  return (
    <div className="food-card">
      <img src={props.image} alt={props.name} className="food-image" />
      <div className="food-content">
        <h3>{props.name}</h3>
        <p>Cuisine: {props.cuisine}</p>
        <a href={props.link} target="_blank" rel="noopener noreferrer" className="menu-button">
          View Menu
        </a>
      </div>
    </div>
  );
}

export default FoodCart;
