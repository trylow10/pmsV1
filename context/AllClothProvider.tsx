// context/AllClothProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type Cloth = {
  id: number;
  name: string;
  // Add other fields as per your database schema
};

type ClothContextType = {
  data: Cloth[];
  setData: React.Dispatch<React.SetStateAction<Cloth[]>>;
};

const ClothContext = createContext<ClothContextType | undefined>(undefined);

export const AllClothProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<Cloth[]>([]);

  useEffect(() => {
    async function fetchCloths() {
      const response = await fetch('/api/cloths');
      const result = await response.json();
      setData(result);
    }

    fetchCloths();
  }, []);

  return (
    <ClothContext.Provider value={{ data, setData }}>
      {children}
    </ClothContext.Provider>
  );
};

export const useCloths = () => {
  const context = useContext(ClothContext);
  if (context === undefined) {
    throw new Error('useCloths must be used within an AllClothProvider');
  }
  return context;
};
