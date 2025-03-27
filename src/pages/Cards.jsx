import React, { useState, useEffect } from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { fetchResourceDetails } from '../services/swapi';
import { Link} from 'react-router-dom';

export const Card = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();
  const [details, setDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      const resourceDetails = await fetchResourceDetails(type, item.uid);
      setDetails(resourceDetails);
    };

    loadDetails();
  }, [item, type]);

  useEffect(() => {
    const favoriteExists = store.favorites.some(fav => fav.uid === item.uid);
    setIsFavorite(favoriteExists);
  }, [store.favorites, item]);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({ 
        type: 'remove_favorite', 
        payload: { ...item, type } 
      });
    } else {
      dispatch({ 
        type: 'add_favorite', 
        payload: { ...item, type } 
      });
    }
  };

  return (
    <div className={`card m-2 card-hover-effect ${isFavorite ? 'border border-warning' : ''}`} style={{ minWidth: '250px', maxWidth: '300px' }}>
      {/* Imagen del recurso */}
      <img 
        src={item.imageUrl} 
        className="card-img-top" 
        alt={item.name}
        style={{ 
          height: '200px', 
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-warning glitch-text">{item.name}</h5>
        {details && (
          <p className="card-text text-muted flex-grow-1">
            {type === 'people' && `Gender: ${details.gender}`}
            {type === 'vehicles' && `Model: ${details.model}`}
            {type === 'planets' && `Terrain: ${details.terrain}`}
          </p>
        )}
        <div className="d-flex justify-content-between mt-auto">
          <Link to={`/${type}/${item.uid}`}>
          <button className="btn btn-outline-primary">Details</button>
          </Link>
          <button 
            className={`btn ${isFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={toggleFavorite}
          >
            {isFavorite ? '❤️' : '♡'}
          </button>
        </div>
      </div>
    </div>
  );
};