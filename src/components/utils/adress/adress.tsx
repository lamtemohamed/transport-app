import React, { useEffect, useState } from "react";

type AdressProps = {
  adress: string;
  setAdress: (value: string) => void;
};

export const Adress = ({ adress, setAdress }: AdressProps) => {
  const [selectedAdress, setSelectedAdress] = useState(adress);
  useEffect(() => {
    setSelectedAdress(adress);
  }, [adress]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedAdress(value);
    setAdress?.(value);
  };

  return (
    <>
      {/* Sélecteur d'adresse */}
      <select
        value={selectedAdress}
        onChange={handleChange}
        className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="" hidden>
          Mettez votre adress(optionel)
        </option>
        <option value="adress-choice">
          Adresse (cliquer pour entrer une adress)
        </option>
      </select>

      {/* Formulaire qui s'affiche seulement si "adress-choice" est choisi */}
      {selectedAdress === "adress-choice" && (
        <div className="mt-4 p-4 border rounded-lg shadow-md bg-gray-50 space-y-3">
          <input
            type="text"
            placeholder="Nom de la rue"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Ville"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Code postal"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      )}
    </>
  );
};
