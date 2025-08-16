import PaiementForm from "@/components/utils/paiment_form/PaiementForm";
import { useState, type ChangeEvent } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaMoneyBillAlt,
} from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

interface Tarif {
  service: string;
  price: string | number;
}

interface FormulaireCommandeProps {
  service: Tarif;
}

export default function FormulaireCommande({
  service,
}: FormulaireCommandeProps) {
  // États locaux pour chaque champ
  const [nomComplet, setNomComplet] = useState("");
  const [telephone, setTelephone] = useState("");
  const [location, setLocation] = useState("");
  const [paiement, setPaiement] = useState("");

  // Gestion du changement de valeur
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "nomComplet") setNomComplet(value);
    if (name === "telephone") setTelephone(value);
    if (name === "location") setLocation(value);
  };

  return (
    <div className="space-y-4">
      {/* Section Service et Prix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service
          </label>
          <input
            value={service.service}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix (FCFA)
          </label>
          <div className="relative">
            <FaMoneyBillAlt className="absolute top-3 left-3 text-gray-400" />
            <input
              value={service.price.toString()}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded pl-10 pr-4 py-2"
            />
          </div>
        </div>
      </div>

      {/* Nom complet */}
      <div className="relative">
        <FaUser className="absolute top-3 left-3 text-gray-400" />
        <input
          name="nomComplet"
          type="text"
          placeholder="Nom complet"
          value={nomComplet}
          onChange={handleChange}
          className="w-full border rounded pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Téléphone */}
      <div className="relative">
        <FaPhoneAlt className="absolute top-3 left-3 text-gray-400" />
        <input
          name="telephone"
          type="tel"
          placeholder="Téléphone"
          value={telephone}
          onChange={handleChange}
          className="w-full border rounded pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Lieu */}
      <div className="relative">
        <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
        <select
          name="location"
          value={location}
          onChange={handleChange}
          className={`w-full border rounded pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none bg-white ${
            !location ? "text-gray-400" : "text-gray-800"
          }`}
        >
          <option value="" disabled hidden>
            Lieu de départ
          </option>
          <option value="universite">Université</option>
          <option value="ville">Ville</option>
          <option value="marche">Marché</option>
        </select>
        <FiChevronDown className="absolute top-3 right-3 text-gray-400 pointer-events-none" />
      </div>

      {/* Paiement */}
      <PaiementForm paiement={paiement} setPaiement={setPaiement} />
    </div>
  );
}
