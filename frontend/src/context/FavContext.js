import React, { createContext, useContext, useReducer } from "react";

const FavContext = createContext();

export const useFavContext = () => useContext(FavContext);

export const FavProvider = ({ children }) => {
  const [favorites, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "TOGGLE_FAV":
        return state.includes(action.payload)
          ? state.filter((id) => id !== action.payload)
          : [...state, action.payload];
      default:
        return state;
    }
  }, []);

  return (
    <FavContext.Provider value={{ favorites, dispatch }}>
      {children}
    </FavContext.Provider>
  );
};

