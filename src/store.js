export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    favorites: [], // Nuevo array para favoritos
    characters: [], // Para almacenar personajes de SWAPI
    vehicles: [],   // Para almacenar vehículos de SWAPI
    planets: []     // Para almacenar planetas de SWAPI
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':
      const { id, color } = action.payload
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    
    case 'set_characters':
      return {
        ...store,
        characters: action.payload
      };
    
    case 'set_vehicles':
      return {
        ...store,
        vehicles: action.payload
      };
    
    case 'set_planets':
      return {
        ...store,
        planets: action.payload
      };
    
    case 'add_favorite':
      // Evitar duplicados
      if (!store.favorites.some(fav => fav.uid === action.payload.uid)) {
        return {
          ...store,
          favorites: [...store.favorites, action.payload]
        };
      }
      return store;
    
    case 'remove_favorite':
      return {
        ...store,
        favorites: store.favorites.filter(fav => fav.uid !== action.payload.uid)
      };
    
    default:
      throw Error('Unknown action.');
  }    
}

