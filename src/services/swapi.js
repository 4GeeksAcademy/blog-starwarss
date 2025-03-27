const BASE_URL = 'https://www.swapi.tech/api';

// Mapeo de imágenes predeterminadas para diferentes tipos de recursos
const DEFAULT_IMAGES = {
  people: {
    '1': 'https://starwars-visualguide.com/assets/img/characters/1.jpg',
    default: 'https://starwars-visualguide.com/assets/img/characters/default.jpg'
  },
  vehicles: {
    '4': 'https://starwars-visualguide.com/assets/img/vehicles/4.jpg',
    default: 'https://starwars-visualguide.com/assets/img/vehicles/default.jpg'
  },
  planets: {
    '1': 'https://starwars-visualguide.com/assets/img/planets/1.jpg',
    default: 'https://starwars-visualguide.com/assets/img/planets/default.jpg'
  }
};

const addimage = (type, uid) => {
  if (type == "people"){
    return `https://github.com/tbone849/star-wars-guide/blob/master/build/assets/img/characters/${uid}.jpg?raw=true`
  }
  if (type == "planets"){
    return `https://github.com/tbone849/star-wars-guide/blob/master/build/assets/img/planets/${uid}.jpg?raw=true`
  }
  if (type == "vehicles"){
    return `https://github.com/tbone849/star-wars-guide/blob/master/build/assets/img/vehicles/${uid}.jpg?raw=true`
  }
}

export const fetchResources = async (resourceType) => {
  try {
    const response = await fetch(`${BASE_URL}/${resourceType}`);
    const data = await response.json();
    
    // Añadir URL de imagen a cada recurso
    const resourcesWithImages = data.results.map(resource => ({
      ...resource,
      imageUrl: addimage(resourceType, resource.uid)
    }));
    
    return resourcesWithImages;
  } catch (error) {
    console.error(`Error fetching ${resourceType}:`, error);
    return [];
  }
};

export const fetchResourceDetails = async (resourceType, uid) => {
  try {
    const response = await fetch(`${BASE_URL}/${resourceType}/${uid}`);
    const data = await response.json();
    
    // Añadir URL de imagen a los detalles
    const resourceWithImage = {
      ...data.result.properties,
      imageUrl: DEFAULT_IMAGES[resourceType][uid] || 
                DEFAULT_IMAGES[resourceType].default
    };
    
    return resourceWithImage;
  } catch (error) {
    console.error(`Error fetching ${resourceType} details:`, error);
    return null;
  }
};