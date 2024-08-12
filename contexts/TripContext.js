import React, { createContext, useState, useContext } from 'react';

// Create a Context
const TripContext = createContext();

// Create a provider component
export const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState({ place: '', coordinates: null });

  return (
    <TripContext.Provider value={{ tripData, setTripData }}>
      {children}
    </TripContext.Provider>
  );
};

// Custom hook to use the TripContext
export const useTrip = () => {
  return useContext(TripContext);
};
