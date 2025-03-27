import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";

export const EntityDetailView = () => {
  const [entityDetails, setEntityDetails] = useState(null);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { type, uid } = useParams();

  useEffect(() => {
    const fetchEntityDetails = async () => {
      try {
        // Obtener los detalles básicos
        const response = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch entity details');
        }
        
        const data = await response.json();
        setEntityDetails(data.result.properties);

        // Obtener la descripción
        const descriptionResponse = await fetch(data.result.properties.url);
        const descriptionData = await descriptionResponse.json();
    
        setDescription(descriptionData.result.description || "No description available");
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEntityDetails();
  }, [type, id]);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Image Column */}
        <div className="col-md-6">
          <img 
            src={`https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`}
            className="img-fluid rounded shadow"
            alt={entityDetails.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x600.png?text=No+Image+Available';
              e.target.classList.add('bg-secondary');
            }}
          />
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h2 className="card-title text-center">{entityDetails.name}</h2>
            </div>
            <div className="card-body">
              {/* Descripción */}
              {description && (
                <div className="mb-3">
                  <strong>Description:</strong>
                  <p>{description}</p>
                </div>
              )}

              {Object.entries(entityDetails).map(([key, value]) => (
                value && (
                  <div key={key} className="mb-2">
                    <strong className="text-capitalize">
                      {key.replace(/_/g, ' ')}:
                    </strong>{' '}
                    {value}
                  </div>
                )
              ))}
            </div>
            <div className="card-footer">
              <Link to={`/${type}`} className="btn btn-secondary w-100">
                Back to {type} List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};