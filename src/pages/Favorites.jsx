import React from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from './Cards';

export const Favorites = () => {
  const { store } = useGlobalReducer();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Favorites</h1>
      
      {store.favorites.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No favorites yet. Add some from the home page!
        </div>
      ) : (
        <div className="row">
          {store.favorites.map((favorite) => (
            <div key={favorite.uid} className="col-md-4 mb-3">
              <Card 
                item={favorite} 
                type={favorite.type}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};