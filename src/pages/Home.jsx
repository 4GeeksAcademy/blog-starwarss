import React, { useEffect } from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { fetchResources } from '../services/swapi';
import { Card } from './Cards';

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const loadSWAPIData = async () => {
      const characters = await fetchResources('people');
      const vehicles = await fetchResources('vehicles');
      const planets = await fetchResources('planets');

      dispatch({ type: 'set_characters', payload: characters });
      dispatch({ type: 'set_vehicles', payload: vehicles });
      dispatch({ type: 'set_planets', payload: planets });
    };

    loadSWAPIData();
  }, []);

  const renderSection = (title, items, type) => (
    <div className="mb-5">
      <h2 className="text-warning mb-4 glitch-text">{title}</h2>
      <div className="d-flex overflow-auto pb-3">
        {items.map((item) => (
          <Card 
            key={item.uid} 
            item={item}
            type={type}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mt-5 pt-5">
      <div className="text-center mb-5">
        <h1 className="display-4 text-warning glitch-text">
          Star Wars Blog
        </h1>
        <p className="lead text-muted">
          Explore characters, vehicles, and planets from a galaxy far, far away...
        </p>
      </div>
      
      {renderSection('Characters', store.characters, 'people')}
      {renderSection('Vehicles', store.vehicles, 'vehicles')}
      {renderSection('Planets', store.planets, 'planets')}
    </div>
  );
};