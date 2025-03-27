import { Link, useParams } from "react-router-dom";  
import PropTypes from "prop-types"; 
import useGlobalReducer from "../hooks/useGlobalReducer";  
import { useEffect, useState } from "react";
import { fetchResourceDetails } from "../services/swapi";

export const Single = props => {

  const { store } = useGlobalReducer()


  const { type, uid } = useParams()

  const [details, setDetails] = useState(null) 

  useEffect(
    () => {
      fetchResourceDetails(type, uid)
      .then(data=> {console.log(data)
      setDetails(data)
    }) 
    .catch(error=>{console.error("OH NO! TRAUMITA: ", error)})
    }, [type, uid])

  return (
    <div className="container text-center" id="details-container">
      <hr className="my-4" />  
      <h1 className="">{details?.name || "Se estan cargando los datos..."}</h1> 
      {/* {Las imagenes no funcionan de la api} */}
      <p>{details?.gender}</p>
      <p>{details?.cargo_capacity}</p>
      <p>{details?.manufacturer}</p>
      <p>{details?.max_atmosphering_speed}</p>
      <p>{details?.model}</p>
      <p>{details?.passengers}</p>
      <p>{details?.pilots}</p>
      <p>{details?.vehicle_class}</p>
      <p>{details?.birth_year}</p>
      <p>{details?.eye_color}</p>
      <p>{details?.hair_color}</p>
      <p>{details?.height}</p>
      <p>{details?.mass}</p>
      <p>{details?.skin_color}</p>
      <p>{details?.climate}</p>
      <p>{details?.diameter}</p>
      <p>{details?.gravity}</p>
      <p>{details?.orbital_period}</p>
      <p>{details?.population}</p>
      <p>{details?.rotation_period}</p>
      <p>{details?.surface_water}</p>
      <p>{details?.terrain}</p>
      <Link to="/">
      <span className="btn btn-primary btn-lg" href="#" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object
};
